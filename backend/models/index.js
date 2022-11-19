const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.orders = require("./order.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.additionalPhrases = require("./additionalPhrase.model.js")(sequelize, Sequelize);
db.letters = require('./letter.model.js')(sequelize, Sequelize);

module.exports = db;