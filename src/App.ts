import express from "express";
import router from "./config/router";

const app = express();
const defaultRoute = express.Router()

app.use(express.json());



app.use('/', 
  defaultRoute.get("/", (req, res) => {
    res.status(200).json({api: "acess /api-docs to get all informations about the APIrest"})
  })
)

app.use('/api', router)

export default app
