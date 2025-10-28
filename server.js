import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.sql.*;
import java.util.UUID;

public class Server {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/create-shipment", new ShipmentHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Sunucu 8080 portunda çalışıyor...");
    }

    static class ShipmentHandler implements HttpHandler {
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equals(exchange.getRequestMethod())) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody()));
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    requestBody.append(line);
                }

                // Basit JSON parse (manuel)
                String body = requestBody.toString();
                String sender = extractValue(body, "sender");
                String receiver = extractValue(body, "receiver");
                String origin = extractValue(body, "origin");
                String destination = extractValue(body, "destination");
                String tracking = UUID.randomUUID().toString();

                try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/shipmentdb", "user", "pass")) {
                    String sql = "INSERT INTO shipments (sender_name, receiver_name, origin_country, destination_country, tracking_number) VALUES (?, ?, ?, ?, ?)";
                    PreparedStatement stmt = conn.prepareStatement(sql);
                    stmt.setString(1, sender);
                    stmt.setString(2, receiver);
                    stmt.setString(3, origin);
                    stmt.setString(4, destination);
                    stmt.setString(5, tracking);
                    stmt.executeUpdate();
                } catch (SQLException e) {
                    e.printStackTrace();
                }

                String response = "{\"tracking_number\": \"" + tracking + "\"}";
                exchange.getResponseHeaders().add("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }

        private String extractValue(String json, String key) {
            String pattern = "\"" + key + "\":\"";
            int start = json.indexOf(pattern) + pattern.length();
            int end = json.indexOf("\"", start);
            return json.substring(start, end);
        }
    }
}
