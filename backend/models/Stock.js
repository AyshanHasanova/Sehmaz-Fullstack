import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  currentPrice: Number,
  highPrice: Number,
  lowPrice: Number,
  openPrice: Number,
  previousClose: Number,
  lastUpdated: { type: Date, default: Date.now } // Cache vaxtını yoxlamaq üçün
});

export default mongoose.model("Stock", stockSchema);