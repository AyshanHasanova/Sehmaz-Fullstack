import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { connectDatabase } from "./config/dbConnect.js";
import stockRoutes from './routes/stockRoutes.js';


dotenv.config({ path: "config/config.env" }); 

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors());

// Marşrutlar
app.use('/api/stocks', stockRoutes);

app.get("/", (req, res) => {
    res.send("SEHMAZ Backend API işləyir!");
});

// Xəta idarəetməsi
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Server daxili xətası"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER ${PORT} portunda və ${process.env.NODE_ENV} mühitində işə düşdü.`);
});