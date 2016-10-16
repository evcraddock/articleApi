import http from 'http'
import { env, mongo, port, ip } from './config'
import mongoose from './config/mongoose'
import express from './config/express'
import routes from './routes'

const app = express(routes)
const server = http.createServer(app)

mongoose.connect(mongo.uri)

app.set('port', process.env.PORT || 9000);

setImmediate(() => {
  server.listen(app.get('port'), () => {
    console.log('Express server listening on port: ' + app.get('port'))
  })
})

export default app
