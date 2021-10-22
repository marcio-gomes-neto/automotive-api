import  express  from "express";
import router from "./config/router";

const app = express();

app.use(express.json());

app.use('/api', router)


app.listen(3000, () => {
  console.log('Server On!');
});
