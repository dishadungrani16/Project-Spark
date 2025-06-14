import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * @openapi
 * /api/events:
 *   get:
 *     summary: Fetch WES events and process them
 *     description: Retrieves events from the WES system and returns processed performance metrics
 *     responses:
 *       200:
 *         description: Successfully retrieved and processed events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                   throughput:
 *                     type: number
 *                   accuracy:
 *                     type: number
 *                   idleTime:
 *                     type: number
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch sample data from JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const events = response.data;

    // Process events into performance metrics
    const performanceData = events.map((event: any, index: number) => ({
      timestamp: new Date(Date.now() - (events.length - index) * 60000).toISOString(),
      throughput: Math.floor(Math.random() * 100) + 50, // Random throughput between 50-150
      accuracy: Math.floor(Math.random() * 20) + 80, // Random accuracy between 80-100
      idleTime: Math.floor(Math.random() * 30), // Random idle time between 0-30
    }));

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(performanceData);
  } catch (error) {
    console.error('Error processing events:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 