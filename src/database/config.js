import dotenv from "dotenv";
dotenv.config();
module.exports =
{
  "development": {
    use_env_variable: true,
    "url": "mysql://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_DATABASENAME,
    "dialect": "mysql",
    "dialectOptions": {
      "useUTC": false //for reading from database
    },
    "timezone": "+07:00" //for writing to database
  },
  "local": {
    use_env_variable: true,
    "url": "mysql://" + process.env.DBLOCAL_USERNAME + ":" + process.env.DBLOCAL_PASSWORD + "@" + process.env.DBLOCAL_HOST + ":" + process.env.DBLOCAL_PORT + "/" + process.env.DBLOCAL_DATABASENAME,
    "dialect": "mysql",
    "dialectOptions": {
      "useUTC": false //for reading from database
    },
    "timezone": "+07:00" //for writing to database
  },
  "dev2": {
    use_env_variable: true,
    "url": "mysql://" + process.env.DBDEV2_USERNAME + ":" + process.env.DBDEV2_PASSWORD + "@" + process.env.DBDEV2_HOST + ":" + process.env.DBDEV2_PORT + "/" + process.env.DBDEV2_DATABASENAME,
    "dialect": "mysql",
    "dialectOptions": {
      "useUTC": false //for reading from database
    },
    "timezone": "+07:00" //for writing to database
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}