const authRouter = require('./auth')

function Route(app){
    app.use('/', (req, res) => {
        return res.status(200).send('<h1>This is Trello Clone by group2@opensource-2022</h1>')
    })
    app.use('/api/v1/auth', authRouter)
}

module.exports = Route