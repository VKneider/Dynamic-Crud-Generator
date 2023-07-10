import pkg from 'pg';
import sentences from './DBSentences.js';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config({ path: './.env' });

class Database {
  constructor(config) {
    this.sentences = sentences;
    this.pool = new Pool(config);
  }

  executeQuery = async (query, props) => {
    try {
      const res = await this.pool.query(this.sentences[query], props);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  getCnn = async () => {
    try {
      return await this.pool.connect();
    } catch (e) {
      console.log(e);
    }
  };

  returnCnn = async (cli) => {
    try {
      await cli.release();
    } catch (e) {
      console.log(e);
    }
  };
}

const db = new Database({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

export default db;
