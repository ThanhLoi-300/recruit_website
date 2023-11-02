const UserRouter = require('./UserRouter')
const JobRouter = require('./JobRouter')
const ApplyRouter = require('./ApplyRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter),
    app.use('/api/job', JobRouter)
    app.use('/api/apply', ApplyRouter)

}

module.exports = routes
