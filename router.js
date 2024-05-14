import puppeteer from "puppeteer";
import express,{Router,json} from "express";
export const router = Router();
router.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
async function pp(n1="",n2=""){
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        "--disable-features=BlockInsecurePrivateNetworkRequests"
    ]
  });
   
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36");
  // Habilitar la interceptación de solicitudes
  await page.setRequestInterception(true);
  
  // Escuchar el evento 'request'
  page.on('response', async (response) => {
    const headers = response.headers();
    headers['access-control-allow-origin'] = '*';
    headers['access-control-allow-credentials'] = 'true';

    response.headers = () => {
        return headers;
    };
});


  await page.goto("https://www.google.com.mx/maps");
  await page.waitForSelector("#searchboxinput");
  await new Promise(resolve => setTimeout(async () => {
    await page.type("#searchboxinput", n1);
    resolve();
  }, 1000));
  await new Promise(resolve => setTimeout(async () => {
    await page.click(".mL3xi")
    resolve();
  }, 1000));
    await page.waitForSelector(".g88MCb.S9kvJb")
    await page.click(".g88MCb.S9kvJb")
    await new Promise(resolve => setTimeout(async () => {
      await page.type(".tactile-searchbox-input",n2)
      resolve();
    }, 1000));
    await new Promise(resolve => setTimeout(async () => {
      await page.click(".j9zajd")
      resolve();
    }, 1000));
    await page.waitForSelector(".ivN21e")
    const contenido = await page.$eval('.ivN21e div', div => div.textContent);
    browser.close();
    return parseInt(contenido)
}

router.get("/buscar",async(req,res)=>{
  
  res.header('Access-Control-Allow-Origin', `*`); // Permite a todos los dominios
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    const { n1, n2 } = req.query;
    console.log(typeof n1, typeof n2);
    if (n1 && n2) {
      let c;
     
        
      await pp(n1, n2).then(e => {
        c = e;
      });
     
             
    
      
      res.send({number:c});
    } else {
      res.send("hola");
    }
})

router.get("/",(req,res)=>{
  res.header('Access-Control-Allow-Origin', `*`); // Permite a todos los dominios
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send({todo:"bien :) xd"})
})