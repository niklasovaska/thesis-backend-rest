import { AppDataSource } from './data-source'
import * as express from 'express'
import * as dotenv from 'dotenv'
import { albumRouter } from './routes/album.routes'
dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT
app.use('/api/v1', albumRouter)

async function main() {
    try {
        await AppDataSource.initialize()
        console.log('Connected to database')

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
        
    } catch (error) {   
        console.log('Error initializing database connection')
    }   
}

main()