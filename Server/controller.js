const path = require('path')
const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, "../Public/Welcome.html"))
    },

    style: (req, res) => {
        res.sendFile(path.join(__dirname, "../Public/styles.css"))
    },

    js: (req, res) => {
        res.sendFile(path.join(__dirname, "../Public/index.js"))
    },

    // axios: (req, res) => {
    //     res.sendFile(path.join(__dirname, "../node_modules/axios/dist/axios.min.js"))
    // },

    seed: (req, res) => {
        sequelize.query(`
        create table tricks (
            trick_id serial primary key, 
            trick_name varchar(50), 
            trick_gif varchar
        )`
        )}
}