/* eslint-disable no-unused-vars */
import path from 'path'
import _ from 'lodash'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && !process.env.CI) {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../../.env')
  })
}

var MONGODB_URI;
if(process.env.VCAP_SERVICES == null) {
  MONGODB_URI = 'mongodb://localhost:27017';
}
else {
  var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
  MONGODB_URI = vcap_services['mlab'][0].credentials.uri;
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '../../'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: MONGODB_URI,
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: MONGODB_URI,
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: MONGODB_URI
    }
  }
}

export default _.merge(config.all, config[config.all.env])
