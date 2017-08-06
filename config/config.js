const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const env = process.env.NODE_ENV || 'development'

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'rate-comparison'
        },
        port: process.env.PORT || 3000,
        apiSearch: 'https://api-staging-2.yamsafer.me/api/v3/search',
        databaseURL: "https://yamsaferstaging.firebaseio.com",
        elastic: {
            host: 'elastic-staging.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        }
    },
    staging: {
        root: rootPath,
        app: {
            name: 'rate-comparison'
        },
        port: process.env.PORT || 3000,
        apiSearch: 'https://api-staging.yamsafer.me/api/v3/search',
        elastic: {
            host: 'elastic-staging.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        }
    },
    production: {
        root: rootPath,
        app: {
            name: 'rate-comparison'
        },
        port: process.env.PORT || 3000,
        apiSearch: 'https://api.yamsafer.me/api/v3/search',
        elastic: {
            host: 'elastic.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        }
    }
};

module.exports = config[env]
