import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
dotenv.config();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors()); app.use(express.json());
app.post('/api/login', async (req,res)=>{ const {username,password}=req.body; if(!username||!password) return res.status(400).json({error:'Eksik'}); const user= await prisma.user.findUnique({where:{username}}); if(!user) return res.status(401).json({error:'Geçersiz'}); const ok=bcrypt.compareSync(password,user.password); if(!ok) return res.status(401).json({error:'Geçersiz'}); const token=jwt.sign({id:user.id,role:user.role,name:user.name}, process.env.JWT_SECRET||'devsecret',{expiresIn:'8h'}); res.json({token,user:{id:user.id,username:user.username,role:user.role,name:user.name,email:user.email}}); });
function auth(req,res,next){ const h=req.headers.authorization; if(!h) return res.status(401).json({error:'No token'}); const token=h.split(' ')[1]; try{ req.user=jwt.verify(token, process.env.JWT_SECRET||'devsecret'); next(); }catch(e){ return res.status(401).json({error:'Invalid token'});} }
app.get('/api/shipments', auth, async (req,res)=>{ const items = await prisma.shipment.findMany({orderBy:{createdAt:'desc'}}); res.json(items); });
app.post('/api/shipments', auth, async (req,res)=>{ const b=req.body; const item = await prisma.shipment.create({data:{shipmentNo:b.shipmentNo||'AUTO',mode:b.mode||'Karayolu',customer:b.customer||'',origin:b.origin||'',destination:b.destination||'',status:b.status||'Yolda',profit:Number(b.profit)||0}}); res.status(201).json(item); });
app.put('/api/shipments/:id', auth, async (req,res)=>{ const id=Number(req.params.id); const item = await prisma.shipment.update({where:{id}, data:req.body}); res.json(item); });
app.get('/api/invoices', auth, async (req,res)=>{ const inv= await prisma.invoice.findMany({orderBy:{createdAt:'desc'}}); res.json(inv); });
app.post('/api/invoices', auth, async (req,res)=>{ const b=req.body; const inv = await prisma.invoice.create({data:{invoiceNo:b.invoiceNo||'INV-AUTO',shipmentId:b.shipmentId?Number(b.shipmentId):null,amount:Number(b.amount)||0,currency:b.currency||'EUR'}}); res.status(201).json(inv); });
app.get('/api/export/accounting.csv', auth, async (req,res)=>{ const inv= await prisma.invoice.findMany(); const lines=['invoice_no,shipment_id,amount,currency,issue_date']; for(const i of inv){ const issue = i.issueDate ? i.issueDate.toISOString() : i.createdAt.toISOString(); lines.push(`${i.invoiceNo},${i.shipmentId||''},${i.amount},${i.currency},${issue}`); } res.setHeader('Content-Type','text/csv'); res.setHeader('Content-Disposition','attachment; filename="accounting_export.csv"'); res.send(lines.join('\n')); });
const clientDist = path.join(__dirname, 'client', 'dist'); if(fs.existsSync(clientDist)){ app.use(express.static(clientDist)); app.get('*',(req,res)=>res.sendFile(path.join(clientDist,'index.html'))); }
const PORT = process.env.PORT || 4000; app.listen(PORT, ()=> console.log('Listening on',PORT));