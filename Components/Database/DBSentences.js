let sentences = {
  
    catalogQuery: ` SELECT table_name, column_name, data_type  FROM information_schema.columns WHERE table_schema = 'public'`,
    insertLog: 'INSERT INTO log (log_time, type, obj, method, msg) VALUES ($1, $2, $3, $4, $5)',
    createLogTable: `CREATE TABLE IF NOT EXISTS log ( 
      id_log SERIAL PRIMARY KEY,
      log_time VARCHAR(200) NOT NULL,
      type VARCHAR(20) NOT NULL,
      obj VARCHAR(200) NOT NULL,
      method VARCHAR(200) NOT NULL,
      msg VARCHAR(500))`,
  
  }

  export default sentences;