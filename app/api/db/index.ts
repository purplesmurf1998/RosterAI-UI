import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '2tXHycRfyQ3H1Dml',
  host: 'rashly-esteemed-diamondback.data-1.use1.tembo.io',
  port: 5432,
  database: 'postgres',
});

export const query = async (sql: string, params: any[]): Promise<QueryResult> => {
  const client = await pool.connect();
  try {
    return client.query(sql, params);
  } finally {
    client.release();
  }
}