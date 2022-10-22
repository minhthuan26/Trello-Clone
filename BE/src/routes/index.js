const authRouter = require('./auth')
const userRouter = require('./user')

function Route(app){
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    // app.use('/', (req, res) => {
    //     return res.status(200).send('<h1>This is Trello Clone by group2@opensource-2022</h1>')
    // })
}

module.exports = Route