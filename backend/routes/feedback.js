const express = require('express');
const { promisePool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validateFeedback } = require('../middleware/validation');

const router = express.Router();

// POST /api/feedback - Submit feedback (Public)
router.post('/', validateFeedback, async (req, res) => {
  try {
    const { name, email, product_name, rating, comment } = req.body;

    const query = `
      INSERT INTO feedback (name, email, product_name, rating, comment) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await promisePool.execute(query, [
      name,
      email || null,
      product_name || null,
      rating,
      comment
    ]);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: {
        id: result.insertId,
        name,
        email: email || null,
        product_name: product_name || null,
        rating,
        comment
      }
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/feedback - Get all feedback (Admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get total count
    const [countResult] = await promisePool.execute('SELECT COUNT(*) as total FROM feedback');
    const total = countResult[0].total;

    // Get feedback with pagination
    const query = `
  SELECT id, name, email, product_name, rating, comment, created_at 
  FROM feedback 
  ORDER BY created_at DESC 
  LIMIT ${limit} OFFSET ${offset}
`;

const [rows] = await promisePool.query(query); // use `.query()` instead of `.execute()`


    res.json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: {
        feedback: rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE /api/feedback/:id - Delete specific feedback (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    if (isNaN(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feedback ID'
      });
    }

    // Check if feedback exists
    const [existing] = await promisePool.execute('SELECT id FROM feedback WHERE id = ?', [feedbackId]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Delete feedback
    await promisePool.execute('DELETE FROM feedback WHERE id = ?', [feedbackId]);

    res.json({
      success: true,
      message: 'Feedback deleted successfully',
      data: {
        deleted_id: feedbackId
      }
    });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/feedback/:id - Get specific feedback (Admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const feedbackId = parseInt(req.params.id);

    if (isNaN(feedbackId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feedback ID'
      });
    }

    const query = `
  SELECT id, name, email, product_name, rating, comment, created_at 
  FROM feedback 
  ORDER BY created_at DESC 
  LIMIT ${limit} OFFSET ${offset}
`;

const [rows] = await promisePool.query(query); // use `.query()` instead of `.execute()`


    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: rows[0]
    });

  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;