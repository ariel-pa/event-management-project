const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require('./src/database/models/index')

/* CONFIGURATION */
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/storage", express.static("src/storage"));

const PORT = process.env.PORT || 3000;

/**
 * API REST
 */
app.use("/api", require("./src/routes"));

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    })

function main() {
    try {
        app.listen(PORT);
        console.log(`Server on port ${PORT}`);
    } catch (error) {
        console.error('', error);
    }
}
main();