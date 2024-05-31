import express, { Request, Response } from 'express';
import cors from 'cors';
import { allRouters } from './app/routes';
import { errorHandler } from './app/middlewares/errorHandler';
const app = express();

// parser middleware
app.use(cors())
app.use(express.json());

app.use(allRouters)

app.all("/", (req: Request, res: Response)=>{
  res.status(200).json({
    message: "welcome"
  })
})

app.all("*", (req: Request, res: Response)=>{
  res.status(404).json({
    success: false,
    message: "Route not Found!"
  })
})

app.use(errorHandler)

export default app;