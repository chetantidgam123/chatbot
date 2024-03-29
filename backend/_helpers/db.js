const tedious = require('tedious');
const { Sequelize, DataTypes } = require('sequelize');

const { dbName, dbConfig } = require('config.json');

module.exports = db = { initialize };

initialize();
async function initialize() {
    const dialect = 'postgres';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // connect to db
    console.log('dbName', dbName);
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });
    db.sequelize = sequelize;
    try {
        await sequelize.authenticate()
        console.log('connected')
        // return ('connected')
    } catch (error) {
        console.error('failed')
        // return ('failed')
    }
    // init models and add them to the exported db object
    db.Template = require('../api/model/msg_template')(sequelize);
    db.Keyword = require('../api/model/keywords')(sequelize);

    // sync all models with database
    // await sequelize.sync({ alter: true });

}