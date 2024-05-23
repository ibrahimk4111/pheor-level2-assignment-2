import express, { Request, Response } from 'express';
import { allRouters } from './app/routes';
const app = express();

// parser middleware
app.use(express.json());

app.use(allRouters)

app.all("/", (req: Request, res: Response)=>{
  res.status(200).json({
    message: "welcome"
  })
})

app.all("*", (req: Request, res: Response)=>{
  res.status(404).json({
    message: "Route not Found!"
  })
})

export default app;