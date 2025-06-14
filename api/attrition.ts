import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

interface AttritionRisk {
  employeeId: string;
  name: string;
  riskScore: number;
  factors: string[];
  lastUpdated: string;
}

/**
 * @openapi
 * /api/attrition:
 *   get:
 *     summary: Get attrition risk analysis
 *     description: Retrieve analysis of employee attrition risks based on performance metrics
 *     responses:
 *       200:
 *         description: Successfully retrieved attrition risks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employeeId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   riskScore:
 *                     type: number
 *                   factors:
 *                     type: array
 *                     items:
 *                       type: string
 *                   lastUpdated:
 *                     type: string
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch sample data from JSONPlaceholder
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    // Generate sample attrition risks
    const attritionRisks: AttritionRisk[] = users.map((user: any) => {
      const riskScore = Math.floor(Math.random() * 100);
      const factors = [];

      if (riskScore > 70) {
        factors.push('High error rate');
        factors.push('Frequent absences');
        factors.push('Low performance metrics');
      } else if (riskScore > 40) {
        factors.push('Moderate performance decline');
        factors.push('Occasional tardiness');
      } else {
        factors.push('Stable performance');
        factors.push('Good attendance');
      }

      return {
        employeeId: `emp-${user.id}`,
        name: user.name,
        riskScore,
        factors,
        lastUpdated: new Date().toISOString()
      };
    });

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(attritionRisks);
  } catch (error) {
    console.error('Error analyzing attrition risks:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 