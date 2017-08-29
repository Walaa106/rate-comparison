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
        api: {
            url: 'https://api-staging-3.yamsafer.me/'
        },
        databaseURL: "https://yamsaferstaging.firebaseio.com",
        elastic: {
            host: 'elastic-staging.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        },
        analytics: {
            host: 'elastic-staging.yamsafer.me:9200',
            index: 'analytics',
            type: 'weekly_rates'
        }
    },
    staging: {
        root: rootPath,
        app: {
            name: 'rate-comparison'
        },
        port: process.env.PORT || 3000,
        api: {
            url: 'https://api-staging-3.yamsafer.me/'
        },
        elastic: {
            host: 'elastic-staging.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        },
        analytics: {
            host: 'elastic-staging.yamsafer.me:9200',
            index: 'analytics',
            type: 'weekly_rates'
        }
    },
    production: {
        root: rootPath,
        app: {
            name: 'rate-comparison'
        },
        port: process.env.PORT || 3000,
        api: {
            url: 'https://api.yamsafer.me/'
        },
        elastic: {
            host: 'elastic.yamsafer.me:9200',
            type: 'property',
            index: 'properties'
        },
        analytics: {
            host: 'elastic-staging.yamsafer.me:9200',
            index: 'analytics',
            type: 'weekly_rates'
        }
    }
};

module.exports = config[env]