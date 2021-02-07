const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const Scrapy = require('./utils/scrap')

const urlEncodedParser = bodyParser.urlencoded({ extended: true })
const URL = 'https://medium.com/swlh/my-software-engineer-roadmap-2fb0c02b8a08';

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    let textInObject;
/* Puppeteer */
    puppeteer.launch().then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(URL);
        const response = await page.evaluate(() => document.body.innerHTML);

        textInObject = await Scrapy(response);

        await browser.close();
        res.send(textInObject)
    })
})
//app.use(cors());
//app.use(express.json())

app.post('/', async (req, res) => {
   const url = req.body.data
   let textInObject;
   /* Puppeteer */
    puppeteer.launch().then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(url);
        const response = await page.evaluate(() => document.body.innerHTML);

        textInObject = await Scrapy(response);

        await browser.close();
        res.send(textInObject)
    })
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})