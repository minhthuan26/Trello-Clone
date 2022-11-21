const authRouter = require('./auth')
const userRouter = require('./user')
const boardRouter = require('./boardRoute')
const columnRouter = require('./columnRoute')
const cardRouter = require('./cardRoute')


function Route(app){
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/boards', boardRouter)
    app.use('/api/v1/columns', columnRouter)
    app.use('/api/v1/cards', cardRouter)
}

module.exports = Route