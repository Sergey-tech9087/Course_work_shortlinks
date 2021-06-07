const express = require('express')
const config = require('config')
const mogoose = require('mongoose')


const app = express()
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mogoose.connect(config.get('mongoLink'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (error) {
        console.log('Server error', error.message)
        process.exit(1)
    }
}

start()


