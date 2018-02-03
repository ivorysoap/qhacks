/**
 * @fileoverview The interface object for working with the database
 * @author astral.cai@queensu.ca (Astral Cai)
 */

"use strict";

const config = require('../config/config');
const Sequelize = require('sequelize');
const tables = require('../config/tables');
const _ = require('underscore');
const lit = require('../config/literals');

/**
 * The interface object for working with the database.
 */
class DatabaseManager {
    /**
     * The constructor initializes a database connection using Sequelize
     */
    constructor() {
        this.connection_ = new Sequelize(config.db_config[lit.DB_DATABASE],
            config.db_config[lit.DB_USERNAME], config.db_config[lit.DB_PASSWORD], {
                host: config.db_config[lit.DB_HOST],
                port: config.db_config[lit.DB_PORT],
                pool: {
                    max: config.db_config[lit.DB_CONNECTION_LIMIT]
                },
                dialect: 'mysql',
                operatorsAliases: false
            });
        this.models_ = {};
        let con = this.connection_;
        _.each(tables, (value, key, obj) => {
            let table = obj[key];
            this.models_[table.table_name] = con.define(table.table_name, table.fields, {timestamps: false});
        });
        _.each(tables, (value, key, obj) => {
            if ('associations' in value) {
                obj[key].associations(this.models_);
            }
        });
    }

    /**
     * updates the schema of the database.
     * @returns {Promise}
     */
    sync() {
        return this.connection_.sync();
    }
}

module.exports = DatabaseManager;