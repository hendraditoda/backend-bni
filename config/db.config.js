// DATABASE SETUP
module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'root',
  DB: 'backend-bni',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
