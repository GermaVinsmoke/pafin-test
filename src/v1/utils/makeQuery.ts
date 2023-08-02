import pg from "pg";
import logger from "../../../logger";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

async function makeQuery(query: string, params?: any[]) {
  const client = await pool.connect();

  try {
    const res = await client.query(query, params);
    return res;
  } catch (e) {
    logger.error(e);
  } finally {
    client.release();
  }
}

export default makeQuery;
