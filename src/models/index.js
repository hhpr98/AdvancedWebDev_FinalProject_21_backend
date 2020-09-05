import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configs from "../database/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configs[env];
const db = {};
const sequelize = config.use_env_variable
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);


fs.readdirSync(__dirname)
  .filter(
    file =>
      // eslint-disable-next-line implicit-arrow-linebreak
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    // https://github.com/sequelize/sequelize/issues/7934#issuecomment-648463751
    // Error version : 6.2.0
    // Error code : Cannot read property 'create'/'findAll'...... of undefined
    // const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    // sequelize[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.User = sequelize.import(__dirname + "/models/user.js");

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

export default db;

/*
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users")(sequelize, Sequelize);
db.Employees = require("./employees")(sequelize, Sequelize);

export default db;
*/