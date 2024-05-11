import {router} from "./router.js"
import express,{json} from "express";
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.set("new site","polar");
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
app.use("/p",router)
const port = process.env.PORT ?? 3000;

app.listen(port,()=>{
    console.log(`el servidor esta en el http://localhost:${port}/p`);
})