const sentences = {
  catalogQuery: `SELECT
    c.table_name,
    c.column_name,
    c.data_type,
    CASE
      WHEN column_name IN (
        SELECT column_name
        FROM information_schema.constraint_column_usage
        WHERE constraint_name IN (
          SELECT constraint_name
          FROM information_schema.table_constraints
          WHERE constraint_type = 'FOREIGN KEY'
        )
      ) THEN 'foreign'
      ELSE 'normal'
    END AS constraint_type
  FROM
    information_schema.columns c
  WHERE
    table_schema = 'public'
`,
  insertLog:
    'INSERT INTO log (log_time, type, obj, method, msg) VALUES ($1, $2, $3, $4, $5)',
  createLogTable: `CREATE TABLE IF NOT EXISTS log ( 
      id_log SERIAL PRIMARY KEY,
      log_time VARCHAR(200) NOT NULL,
      type VARCHAR(20) NOT NULL,
      obj VARCHAR(200) NOT NULL,
      method VARCHAR(200) NOT NULL,
      msg VARCHAR(500))`,
};

export default sentences;
