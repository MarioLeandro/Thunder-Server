import mongoose from "mongoose";

async function main() {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustersd.qb2xyaw.mongodb.net/?retryWrites=true&w=majority`, {dbName: 'Thunder'})
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

export default main;