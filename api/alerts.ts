import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface Alert {
  id: string;
  type: 'idle' | 'error' | 'performance';
  message: string;
  severity: 'low' | 'medium' | 'high';
  videoUrl?: string;
  timestamp: string;
}

/**
 * @openapi
 * /api/alerts:
 *   get:
 *     summary: Generate AI-driven alerts
 *     description: Analyzes event data to generate contextual alerts and coaching messages
 *     responses:
 *       200:
 *         description: Successfully generated alerts
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
 *                     enum: [idle, error, performance]
 *                   message:
 *                     type: string
 *                   severity:
 *                     type: string
 *                     enum: [low, medium, high]
 *                   videoUrl:
 *                     type: string
 *                   timestamp:
 *                     type: string
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch events data
    const eventsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const events = eventsResponse.data;

    // Generate sample alerts based on events
    const alerts: Alert[] = events.slice(0, 5).map((event: any, index: number) => {
      const alertTypes: Alert['type'][] = ['idle', 'error', 'performance'];
      const severities: Alert['severity'][] = ['low', 'medium', 'high'];
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];

      const messages = {
        idle: [
          'Consider taking a short break to maintain focus',
          'Time for a quick stretch to prevent fatigue',
          'Remember to stay hydrated during your shift'
        ],
        error: [
          'Check the item scanning process',
          'Verify the packaging requirements',
          'Review the quality checklist'
        ],
        performance: [
          'Great job on maintaining high accuracy!',
          'Your throughput is above average',
          'Keep up the excellent work pace'
        ]
      };

      return {
        id: `alert-${index}`,
        type,
        message: messages[type][Math.floor(Math.random() * messages[type].length)],
        severity,
        videoUrl: severity === 'high' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : undefined,
        timestamp: new Date(Date.now() - index * 300000).toISOString() // 5 minutes apart
      };
    });

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(alerts);
  } catch (error) {
    console.error('Error generating alerts:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 