import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL üçün: "sehmler-nedir" [cite: 149]
  category: { 
    type: String, 
    enum: ['Əsaslar', 'Texniki analiz', 'Risk idarəsi', 'Termin lüğəti'], // [cite: 153]
    required: true 
  },
  body: { type: String, required: true }, // Markdown mətni [cite: 149]
  order: { type: Number, default: 0 }, // Siyahıda görünmə sırası [cite: 149]
  createdAt: { type: Date, default: Date.now } // [cite: 149]
});

const Article = mongoose.model('Article', articleSchema);
export default Article;