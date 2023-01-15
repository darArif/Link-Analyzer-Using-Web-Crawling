const {JSDOM} = require('jsdom');

const url = require('node:url');

const fetch = require('node-fetch');

const path = require('path');

function normaliseURL(passedURL) {
    const urlObj = url.parse(passedURL);
    const fullPath = `${urlObj.host}${urlObj.path}`;
    if(fullPath.length > 0 && fullPath.slice(-1) === '/') {
        return fullPath.slice(0, -1);
    }
    return fullPath;
};

module.exports = async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = url.parse(baseURL);
    
    const currentURLObj = url.parse(currentURL);

    if(baseURL === currentURL || currentURLObj.host === null) {

        const newURLObj = url.parse(`${baseURL}${currentURLObj.pathname}`);
        //console.log(newURLObj);
        let normalisedURL = normaliseURL(newURLObj.href);

        if(pages[normalisedURL] == undefined) {

            pages[normalisedURL] = 1;

            

            const fetchPromise = fetch(newURLObj.href);

            console.log(`Crawling ${newURLObj.href}`);

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
                const unNormalisedURLs = dom.window.document.body.getElementsByTagName('a');
                
                for(let i=0; i<unNormalisedURLs.length; i++) {
                   
                    console.log(unNormalisedURLs[i].getAttribute('href'));
                    //console.log(url.parse(unNormalisedURLs[i].getAttribute('href')));
                    crawlPage(baseURL, unNormalisedURLs[i].getAttribute('href'), pages);
                    
                }
            })
            .catch((error) => {
                console.error(`Could not load ${newURLObj.href}: ${error}`);
            });
            return pages;
        }
        pages.normalisedURL += 1;
        return pages;
        
    }
    return pages;
}        



