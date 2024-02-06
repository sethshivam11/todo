import connectDB from "./db";
import app from "./app"

const port = process.env.PORT || 3000

connectDB()
    .then(() => app.listen(port, () => console.log(`App is running on port ${port}`)))
    .catch(err => console.log(`MongoDB connection error! \n${err}`))