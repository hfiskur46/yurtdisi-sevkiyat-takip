import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const pwAdmin = bcrypt.hashSync('admin123', 10);
  const pwLoj = bcrypt.hashSync('12345', 10);
  const pwPaz = bcrypt.hashSync('12345', 10);
  await prisma.user.upsert({ where: { username: 'admin' }, update: {}, create: { username:'admin', password:pwAdmin, name:'Admin', role:'admin', email:'admin@example.com' } });
  await prisma.user.upsert({ where: { username: 'lojistik' }, update: {}, create: { username:'lojistik', password:pwLoj, name:'Lojistik Kullanıcısı', role:'lojistik', email:'lojistik@example.com' } });
  await prisma.user.upsert({ where: { username: 'pazarlama' }, update: {}, create: { username:'pazarlama', password:pwPaz, name:'Pazarlama Uzmanı', role:'pazarlama', email:'pazarlama@example.com' } });
  await prisma.shipment.createMany({ data: [
    { shipmentNo:'TRK-001', mode:'Karayolu', customer:'ABC Lojistik', origin:'Istanbul', destination:'Sofia', status:'Yolda', profit:1200 },
    { shipmentNo:'TRK-002', mode:'Denizyolu', customer:'XYZ Dış Tic.', origin:'Izmir', destination:'Burgas', status:'Teslim', profit:-350 }
  ] });
  console.log('Seed completed');
  process.exit(0);
}
main().catch(e=>{ console.error(e); process.exit(1); });