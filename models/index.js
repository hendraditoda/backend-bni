/* eslint-disable */
/* eslint-disable no-unused-expressions */
const dbConfig = require('../config/db.config.js');
const { Op } = require('sequelize');
// eslint-disable-next-line no-unused-vars
const pg = require('pg');

const Sequelize = require('sequelize');
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  dialectModule: require('pg'),

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.client = client;

// MODELS
db.users = require('./user.model.js')(client, Sequelize);
db.mutualfund = require('./mutualfund.model.js')(client, Sequelize);
// db.games = require('./game.model.js')(client, Sequelize);
// db.scores = require('./score.model.js')(client, Sequelize);
// db.videos = require('./video.model.js')(client, Sequelize);

// ASSOCIATIONS
// USER-SCORE
// db.users.hasMany(db.scores, { foreignKey: 'userId', onDelete: 'CASCADE' });
// db.scores.belongsTo(db.users, { foreignKey: 'userId', onDelete: 'CASCADE' });

// GAME-SCORE
// db.games.hasMany(db.scores, { foreignKey: 'gameId', onDelete: 'CASCADE' });
// db.scores.belongsTo(db.games, { foreignKey: 'gameId', onDelete: 'CASCADE' });

// USER-VIDEO
// db.users.hasMany(db.videos, { foreignKey: 'userId', onDelete: 'CASCADE' });
// db.videos.belongsTo(db.users, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = db;
