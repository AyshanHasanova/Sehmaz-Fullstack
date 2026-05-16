// import express from "express";
// import dotenv from "dotenv";

// import cors from "cors";
// import { connectDatabase } from "./config/dbConnect.js";
// import stockRoutes from './routes/stockRoutes.js';
// import articleRoutes from './routes/articleRoutes.js'


// dotenv.config({ path: "config/config.env" }); 

// const app = express();

// connectDatabase();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Marşrutlar
// app.use('/api/stocks', stockRoutes);
// app.use('/api/articles', articleRoutes);


// app.get("/", (req, res) => {
//     res.send("SEHMAZ Backend API işləyir!");
// });

// // Xəta idarəetməsi
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode).json({
//         success: false,
//         message: err.message || "Server daxili xətası"
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`SERVER ${PORT} portunda və ${process.env.NODE_ENV} mühitində işə düşdü.`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // HTTP Server üçün əlavə olundu
import { Server } from "socket.io";   // Socket.io üçün əlavə olundu

import { connectDatabase } from "./config/dbConnect.js";
import stockRoutes from './routes/stockRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { initFinnhubWebSocket } from './services/finnhubService.js'; // Finnhub WebSocket servisi import olundu

// Konfiqurasiya yüklənir
dotenv.config({ path: "config/config.env" }); 

const app = express();

// 1. Express-i HTTP serverə bükürük
const httpServer = createServer(app);

// 2. Socket.io-nu HTTP server üzərindən başladırıq
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

// Verilənlər bazası bağlantısı
connectDatabase();

// Middleware-lər
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Marşrutlar (REST API Endpoints)
app.use('/api/stocks', stockRoutes);
app.use('/api/articles', articleRoutes);

app.get("/", (req, res) => {
    res.send("SEHMAZ Backend API işləyir!");
});

// Socket.io istifadəçi bağlantısı testi
io.on('connection', (socket) => {
    console.log(`İstifadəçi SEHMAZ-a bağlandı: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`İstifadəçi SEHMAZ-dan ayrıldı: ${socket.id}`);
    });
});

// 3. Finnhub Canlı məlumat axınını başladırıq və Socket.io instansını ötürürük
initFinnhubWebSocket(io);

// Xəta idarəetməsi (Error Handling)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Server daxili xətası"
    });
});

// 4. DIQQƏT: app.listen yox, mütləq httpServer.listen yazırıq!
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`SERVER ${PORT} portunda və ${process.env.NODE_ENV || 'development'} mühitində CANLI rejimdə işə düşdü. 🔥`);
});