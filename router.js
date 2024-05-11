import puppeteer from "puppeteer";
import express,{Router,json} from "express";
export const router = Router();
router.use(express.json());
async function  pp(n1="",n2=""){
    const browser =  await puppeteer.launch({
        headless:true,
        defaultViewport:{
            width:1902,
            height:1080
        },args:["--window-size=1920,1080"]
    })
    const page = await browser.newPage();
    await page.goto("https://www.google.com.mx/maps")
    await page.waitForSelector("#searchboxinput")
    await new Promise(resolve => setTimeout(async () => {
        await page.type("#searchboxinput", n1);
        resolve();
      }, 1000));
    
      await page.click("#searchbox-searchbutton")
      await page.waitForSelector(".g88MCb")
      await new Promise(resolve=>setTimeout(async()=>{
           await page.click(".g88MCb");
           resolve();
      },500))
       await page.waitForSelector(".tactile-searchbox-input")
      await new Promise(resolve=>setTimeout(async()=>{
        
        await page.type(".tactile-searchbox-input",n2);
        resolve();
   },1500))
   await page.click(".j9zajd")
   await page.waitForSelector(".ivN21e div")
   let contenido = await page.$eval('.ivN21e div', div => div.textContent);
   contenido = parseInt(contenido)
   return contenido
}
router.get("/buscar",async(req,res)=>{
  
  res.header('Access-Control-Allow-Origin', `*`); // Permite a todos los dominios
  res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    const { n1, n2 } = req.query;
    console.log(typeof n1, typeof n2);
    if (n1 && n2) {
      let c;
      await pp(n1, n2).then(e => {
        console.log(e,"45");
        c = e;
      });
      console.log(c);
      res.send({ number: c});
    } else {
      res.send("hola");
    }
})

router.get("/",(req,res)=>{
  res.header('Access-Control-Allow-Origin', `*`); // Permite a todos los dominios
  res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send({todo:"bien"})
})