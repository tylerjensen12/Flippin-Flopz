const {tricks} = require('./data.js')

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
    seed: (req, res) => {
        sequelize.query(`
        create table tricks (
            trick_id serial primary key, 
            trick_name varchar(50), 
            trick_gif varchar
        )`
        )}
}