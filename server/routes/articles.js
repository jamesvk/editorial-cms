import express from 'express';
import Article from '../models/Article.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// All article routes require a valid JWT
router.use(protect);

// GET /api/articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ updatedAt: -1 });
    res.json(articles);
  } catch {
    res.status(500).json({ message: 'Server error fetching articles' });
  }
});

// GET /api/articles/:id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch {
    res.status(500).json({ message: 'Server error fetching article' });
  }
});

// POST /api/articles
router.post('/', async (req, res) => {
  try {
    const { headline, deck, author, category, status, publishAt, tags, body } = req.body;
    const article = await Article.create({
      headline,
      deck,
      author,
      category,
      status,
      publishAt,
      tags,
      body,
      createdBy: req.user._id,
    });
    res.status(201).json(article);
  } catch {
    res.status(500).json({ message: 'Server error creating article' });
  }
});

// PUT /api/articles/:id
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const { headline, deck, author, category, status, publishAt, tags, body } = req.body;
    article.headline = headline ?? article.headline;
    article.deck = deck ?? article.deck;
    article.author = author ?? article.author;
    article.category = category ?? article.category;
    article.status = status ?? article.status;
    article.publishAt = publishAt ?? article.publishAt;
    article.tags = tags ?? article.tags;
    article.body = body ?? article.body;

    const updated = await article.save();
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Server error updating article' });
  }
});

// DELETE /api/articles/:id
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted' });
  } catch {
    res.status(500).json({ message: 'Server error deleting article' });
  }
});

export default router;
