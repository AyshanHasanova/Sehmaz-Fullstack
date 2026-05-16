import Article from '../models/Article.js';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().select('title slug category order').sort('order');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Xəta baş verdi" });
    }
};

export const getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) return res.status(404).json({ message: "Məqalə tapılmadı" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: "Server xətası" });
    }
};