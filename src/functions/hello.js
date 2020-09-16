const fetch =  require("node-fetch");
const cheerio = require('cheerio')

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const URL = JSON.parse(event.body).url;

    const siteHTML = await fetch(URL).then(res => res.text());
    const $ = cheerio.load(siteHTML);
    const scriptLocations = Array.from($('script'))
        .filter(script => script.attribs.src !== undefined)
        .map(script => script.attribs.src);

    console.log(scriptLocations);

    const fullScripts = await Promise.all(scriptLocations.map(async location => {
        const rawJS = await fetch(
            location.indexOf('http') != -1 ? location : `${URL}/${location}`
        ).then(res => res.text());
        return rawJS
    }));

    const result = fullScripts.map(script => {
        return {
            size: (new TextEncoder().encode(script).length)
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};
