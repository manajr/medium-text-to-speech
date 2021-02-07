const cheerio = require('cheerio');

const Scrapy = async (content) => {
    let orderedText = [];
    //console.log(content)
    const $ = cheerio.load(content);
    
    const tag = { "h1": [], "h2": [], "p": [] };
    $('section > div > div').each((i, elem) => {

        $(elem).find('h1').each((i, e) => {
            tag.h1.push($(e).text());
        })

        $(elem).find('h2').each((i, e) => {
            tag.h2.push($(e).text());
        })

        $(elem).find('p').each((i, e) => {
            tag.p.push($(e).text());
        })
    })
    const textSelector = $('section > div > div > p, h1, h2')
    textSelector.each((i, e) => {
        orderedText.push($(e).text())
    })

    const createOrderedObject = (i, current, tag) => {
        const entries = new Map
        switch(tag){
            case 'h1':
                entries.set(i, {'h1': current})
                 return Object.fromEntries(entries)
            case 'h2':
                entries.set(i, {'h2': current})
                return Object.fromEntries(entries)
            case 'p':
                entries.set(i, {'p': current})
                return Object.fromEntries(entries)
        }
    }
    let j = 0;
    const order = orderedText.reduce((prev, current) => {
        j++
        if(tag.h1.includes(current)){
            const newObject = createOrderedObject(j, current, 'h1')
            return Object.assign({...prev}, newObject)
        }
        else if (tag.h2.includes(current)){
            const newObject = createOrderedObject(j, current, 'h2')
            return Object.assign({...prev}, newObject)
        }
        else if (tag.p.includes(current)){
            const newObject = createOrderedObject(j, current, 'p')
            return Object.assign({...prev}, newObject)
        }
        else return prev
    }, {})
    return order
}

module.exports = Scrapy;