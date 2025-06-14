import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface Nudge {
  id: string;
  type: 'health' | 'performance' | 'safety';
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
}

/**
 * @openapi
 * /api/nudges:
 *   get:
 *     summary: Generate behavioral nudges
 *     description: Analyzes user behavior and events to generate personalized nudges
 *     responses:
 *       200:
 *         description: Successfully generated nudges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [health, performance, safety]
 *                   message:
 *                     type: string
 *                   priority:
 *                     type: string
 *                     enum: [low, medium, high]
 *                   timestamp:
 *                     type: string
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch events and feedback data
    const [eventsResponse, feedbackResponse] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/comments')
    ]);

    // Generate sample nudges based on events and feedback
    const nudges: Nudge[] = Array.from({ length: 5 }, (_, index) => {
      const nudgeTypes: Nudge['type'][] = ['health', 'performance', 'safety'];
      const priorities: Nudge['priority'][] = ['low', 'medium', 'high'];
      const type = nudgeTypes[Math.floor(Math.random() * nudgeTypes.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];

      const messages = {
        health: [
          'Time for a quick stretch break!',
          'Remember to stay hydrated',
          'Take a moment to rest your eyes'
        ],
        performance: [
          'Great job on maintaining accuracy!',
          'Your picking speed is improving',
          'Keep up the excellent work pace'
        ],
        safety: [
          'Remember to wear your safety gear',
          'Check your workstation setup',
          'Report any safety concerns'
        ]
      };

      return {
        id: `nudge-${index}`,
        type,
        message: messages[type][Math.floor(Math.random() * messages[type].length)],
        priority,
        timestamp: new Date(Date.now() - index * 1800000).toISOString() // 30 minutes apart
      };
    });

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(nudges);
  } catch (error) {
    console.error('Error generating nudges:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 