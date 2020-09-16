const https = require('https');
var cheerio = require('cheerio');

const SITE_URL = 'https://www.google.com';
https.get(SITE_URL, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        const page = cheerio.load(data, {xmlMode: false});
        const scriptPaths = Array
            .from(page('script'))
            .map(script => script.attribs.src)
            .filter(Boolean);


        console.log(scriptPaths);

        scriptPaths.forEach(path => {
            const fullUrl = path.startsWith('/') ? `${SITE_URL}${path}` : path ;
            https.get(fullUrl, pathResponse => {
                let pathData = ''
                pathResponse.on('data', chunk => pathData += chunk);
                pathResponse.on('end', () => {
                    console.log('#######')
                    console.log(fullUrl);
                    console.log(
                        (new TextEncoder().encode(pathData)).length
                    )
                    console.log(
                        ((new TextEncoder().encode(pathData)).length / 1474560).toFixed(2)
                    )
                    console.log('#######')
                })
            })
        })
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
