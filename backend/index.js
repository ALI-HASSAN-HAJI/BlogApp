import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import cors from 'cors';




const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4001;
const mongoUrl = 'mongodb+srv://Alii:47803105018@cluster0.l3hoqin.mongodb.net/BlogApp?retryWrites=true&w=majority'

mongoose
.connect(mongoUrl)
.then(() => console.log("The Mongo database is connected successfully....."))
.catch(console.error);

app.use('/users', userRoutes);
app.use('/blog', blogRoutes);


app.listen(PORT, () => {
    console.log("The Server is listening: " + PORT);
})