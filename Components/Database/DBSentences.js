const sentences = {
  catalogQuery: `SELECT
  c.table_name,
  c.column_name,
  c.data_type,
  CASE
      WHEN COUNT(kcu.constraint_name) = 2 THEN 'ambas'
      ELSE COALESCE(MAX(CASE WHEN tc.constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY') THEN tc.constraint_type END), 'ninguna')
  END AS constraint_type,
  (c.column_default LIKE 'nextval%') AS is_serial
  FROM
    information_schema.columns c
  LEFT JOIN
    information_schema.key_column_usage kcu
  ON
    c.table_schema = kcu.table_schema AND
    c.table_name = kcu.table_name AND
    c.column_name = kcu.column_name
  LEFT JOIN
    information_schema.table_constraints tc
  ON
    kcu.table_schema = tc.table_schema AND
    kcu.table_name = tc.table_name AND
    kcu.constraint_name = tc.constraint_name
  WHERE
    c.table_schema = 'public'
  GROUP BY
    c.table_name,
    c.column_name,
    c.data_type,
    (c.column_default LIKE 'nextval%'),
    c.ordinal_position
  ORDER BY
    c.table_name,
    c.ordinal_position;
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
  getTableRows: (tableName) => `SELECT * FROM ${tableName}`,
};

export default sentences;
