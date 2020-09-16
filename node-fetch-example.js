const fetch = require('node-fetch');

(async () => {
    const response = await fetch('https://floppy-bundle.netlify.app/static/js/2.7c8eb996.chunk.js');
    const body = await response.text();

    console.log((new TextEncoder().encode(body)).length);

    console.log(body);
})();
