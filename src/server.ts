import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import { errorMiddleware } from './middleware/error'


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('API do sistema projif.'))

app.use(express.json())
app.use(cors())
app.use(routes)

app.use(errorMiddleware)

app.listen(port, () => {
    console.clear()
    console.log(`Server is running on port ${port} 🚀`)
})