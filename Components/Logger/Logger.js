


import db from '../Database/Database.js';

class Logger{
  constructor(dbModule){
    this.dbModule= dbModule;
    this.dbModule.executeQuery("createLogTable");
  }

  log = (object, method, message) =>{
    try{

      const currentDate = new Date();
      const date = currentDate.toDateString();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      const values = [date + ' ' + hour + ':' + minute + ':' + second, 'log', object, method, message];
      this.dbModule.executeQuery("insertLog", values);
    }catch(e){
      console.log("ERROR EN LOGGER");
    }
  }


}

const logger = new Logger(db);
export default logger;