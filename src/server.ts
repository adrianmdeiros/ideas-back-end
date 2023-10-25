import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(port, () => {
    console.clear()
    console.log("Server is running on port 3000 🚀")
})