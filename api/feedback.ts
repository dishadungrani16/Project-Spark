import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface FeedbackAnalysis {
  themes: {
    name: string;
    count: number;
    sentiment: number;
    examples: string[];
  }[];
  moraleScore: number;
  timestamp: string;
}

/**
 * @openapi
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     description: Submit user feedback for analysis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *   get:
 *     summary: Get feedback analysis
 *     description: Retrieve analyzed feedback themes and morale scores
 *     responses:
 *       200:
 *         description: Successfully retrieved feedback analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 themes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       count:
 *                         type: number
 *                       sentiment:
 *                         type: number
 *                       examples:
 *                         type: array
 *                         items:
 *                           type: string
 *                 moraleScore:
 *                   type: number
 *                 timestamp:
 *                   type: string
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    try {
      const { message, rating } = req.body;
      
      // In a real application, we would store this in a database
      // For now, we'll just return a success response
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing feedback:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      // Fetch sample comments from JSONPlaceholder
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
      const comments = response.data;

      // Generate sample themes and analysis
      const themes = [
        {
          name: 'Work Environment',
          count: Math.floor(Math.random() * 20) + 10,
          sentiment: Math.random() * 2 - 1, // -1 to 1
          examples: comments.slice(0, 3).map((c: any) => c.body)
        },
        {
          name: 'Process Efficiency',
          count: Math.floor(Math.random() * 20) + 10,
          sentiment: Math.random() * 2 - 1,
          examples: comments.slice(3, 6).map((c: any) => c.body)
        },
        {
          name: 'Team Support',
          count: Math.floor(Math.random() * 20) + 10,
          sentiment: Math.random() * 2 - 1,
          examples: comments.slice(6, 9).map((c: any) => c.body)
        }
      ];

      const analysis: FeedbackAnalysis = {
        themes,
        moraleScore: Math.floor(Math.random() * 40) + 60, // 60-100
        timestamp: new Date().toISOString()
      };

      return res.status(200).json(analysis);
    } catch (error) {
      console.error('Error analyzing feedback:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 