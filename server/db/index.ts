import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/todo`)
        console.log(`MongoDB Connected Successfully || ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log(`\nMongoDB Connection Error !!!! ${err}`)
        process.exit(1)
    }
}

export default connectDB