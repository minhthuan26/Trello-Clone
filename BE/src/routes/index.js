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
    app.use('/', (req, res) => {
        return res.status(200).send('<h1>This is Trello Clone by group2@opensource-2022</h1>')
    })


}

module.exports = Route