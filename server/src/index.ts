import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic DB setup (lazy connection for now)
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'campusnav',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: 5432,
});

app.get('/', (req: Request, res: Response) => {
  res.send('CampusNav Backend is Running!');
});

app.get('/health', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ status: 'ok', db: 'connected', time: result.rows[0].now });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
