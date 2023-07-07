import * as express from 'express';
import connection from "./db/connection"
import * as dotenv from "dotenv";
import * as cors from 'cors';
import routes from './routes'

dotenv.config();

const app = express()

connection();

app.use(express.json())
app.use(cors());
app.use(express.static('images'));

app.use(routes)

app.listen(3001, () => {
    console.log("Server is running")
})