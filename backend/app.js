import express from 'express';
import { PORT } from './config/env.js';
import  userRouter  from './routes/user.routes.js'
import  authRouter from './routes/auth.routes.js'
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import bookRouter from './routes/book.routes.js'


const app = express();


//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



//in-built express middlewares
app.use(express.json());    // Ensure JSON parsing is enabled
app.use(express.urlencoded({extended : false}));  //to handle html form data
app.use(cookieParser());  //read cookies from incoming reqs adn store user data

//router-level middleware because it handles requests at a specific route path.
app.use('/api/v1/auth' ,authRouter );
app.use('/api/v1/users' ,userRouter );
app.use('/api/v1/books' , bookRouter );


//Middlewares
app.use(errorMiddleware);  //custom

app.get('/' , (req,res)=> {
res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT , async () =>{
    console.log(`Gulumulu is running on http://localhost:${PORT}`);
    await connectToDatabase();
  
})

export default app;