const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
		ssl: {rejectUnauthorized: false},
	},
  define: {
    timestamps: true,
    // undescored: true
  }
}