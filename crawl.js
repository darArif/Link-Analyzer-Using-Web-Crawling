const {JSDOM} = require('jsdom');

const url = require('node:url');

const fetch = require('node-fetch');

function normaliseURL(passedURL) {
    const urlObj = url.parse(passedURL);
    const fullPath = `${urlObj.host}${urlObj.path}`;
    if(fullPath.length > 0 && fullPath.slice(-1) === '/') {
        return fullPath.slice(0, -1);
    }
    return fullPath;
};

module.exports = function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = url.parse(baseURL);

    const currentURLObj = url.parse(currentURL);

    if(baseURLObj.host === currentURLObj.host) {

        let normalisedURL = normaliseURL(currentURL);

        if(pages[normalisedURL] == undefined) {

            pages[normalisedURL] = 1;

            console.log(`Crawling ${normalisedURL}`);

            const fetchPromise = fetch(currentURL);

            fetchPromise.then((Response) => {
                if(!Response.ok) {
                    throw new Error(`HTTP Error: ${Response.status}`);
                }
                if(!(Response.headers.get('content-type').includes('text/html'))) {
                    throw new Error(`Content Type Error: ${Response.headers.get('content-type')}`);
                } 
                return Response.text();
            })
            .then((Response)=> {
                const dom = new JSDOM(Response);
                console.log(Response);
                const unNormalisedURLs = dom.window.document.body.getElementsByTagName('a');
                console.log(new Array(...unNormalisedURLs));
                console.log('After unnormalised arrays');
                for(let i=0; i<unNormalisedURLs.length; i++) {
                    console.log(`Entered ${i}th loop`);
                    crawlPage(baseURL, unNormalisedURLs[i].getAttribute('href'), pages);
                    console.log(`After ${i}th recursive call`);
                }
            })
            .catch((error) => {
                console.error(`Could not load ${currentURL}: ${error}`);
            });
            return pages;
        }
        pages.normalisedURL += 1;
        return pages;
        
    }
    return pages;
}        



