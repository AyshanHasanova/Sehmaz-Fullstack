import mongoose from "mongoose";

const candleSchema = new mongoose.Schema({
  symbol: { 
    type: String, 
    required: true, 
    unique: true, // Eyni simvoldan iki dənə olmasın
    uppercase: true 
  },
  data: { 
    type: Object, // Finnhub-dan gələn {c:[], h:[], ...} obyektini tam saxlamaq üçün
    required: true 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Candle", candleSchema);