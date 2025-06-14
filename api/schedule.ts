import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface Schedule {
  id: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  zone: string;
  role: string;
  predictedWorkload: number;
}

/**
 * @openapi
 * /api/schedule:
 *   get:
 *     summary: Get predictive schedule
 *     description: Retrieve optimized work schedules based on predicted workload
 *     responses:
 *       200:
 *         description: Successfully retrieved schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   employeeId:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                   endTime:
 *                     type: string
 *                   zone:
 *                     type: string
 *                   role:
 *                     type: string
 *                   predictedWorkload:
 *                     type: number
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch sample data from JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    // Generate sample schedules
    const schedules: Schedule[] = users.map((user: any, index: number) => {
      const startTime = new Date();
      startTime.setHours(8 + Math.floor(index / 3), 0, 0); // Stagger start times
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 8);

      const zones = ['Picking', 'Packing', 'Shipping', 'Receiving'];
      const roles = ['Picker', 'Packer', 'Sorter', 'Receiver'];

      return {
        id: `schedule-${index}`,
        employeeId: `emp-${user.id}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        zone: zones[Math.floor(Math.random() * zones.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        predictedWorkload: Math.floor(Math.random() * 50) + 50 // 50-100
      };
    });

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(schedules);
  } catch (error) {
    console.error('Error generating schedule:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 