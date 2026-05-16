import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; 
import { Server } from "socket.io";   

import { connectDatabase } from "./config/dbConnect.js";
import stockRoutes from './routes/stockRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { initFinnhubWebSocket } from './services/finnhubService.js'; 

// Konfiqurasiya yüklənir
dotenv.config({ path: "config/config.env" }); 

const app = express();
const httpServer = createServer(app);

// 1. EXPRESS ÜÇÜN CORS: Gələn bütün Vercel preview linklərinə tam icazə verir
app.use(cors({
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. SOCKET.IO ÜÇÜN CORS: Eyni şəkildə bütün bağlantılara icazə verir
const io = new Server(httpServer, {
    cors: {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

// Verilənlər bazası bağlantısı
connectDatabase();

// Middleware-lər (CORS-dan sonra gəlməlidir)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Marşrutlar (REST API Endpoints)
app.use('/api/stocks', stockRoutes);
app.use('/api/articles', articleRoutes);

app.get("/", (req, res) => {
    res.send("<h1>SEHMAZ Backend API işləyir! 🚀</h1>");
});

// Socket.io istifadəçi bağlantısı testi
io.on('connection', (socket) => {
    console.log(`İstifadəçi SEHMAZ-a bağlandı: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`İstifadəçi SEHMAZ-dan ayrıldı: ${socket.id}`);
    });
});

initFinnhubWebSocket(io);

// Xəta idarəetməsi (Error Handling)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Server daxili xətası"
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`SERVER ${PORT} portunda və ${process.env.NODE_ENV || 'production'} mühitində CANLI rejimdə işə düşdü. 🔥`);
});