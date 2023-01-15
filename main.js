const crawlPage = require('./crawl');
function main() {
    if(process.argv.length === 2) {
        console.error('No Base URL Passed!\nExiting...');
        return;
    } else if(process.argv.length > 3) {
        console.error('More Than One URL Passed!\nExiting...');
        return;
    } 
    console.log('Crawling started!...');
    const pages = {};
    const pagesReport = crawlPage(process.argv[2], process.argv[2], pages);
    setTimeout(()=>{
        pagesReport.then((Response)=>{
            console.log(`\n\nThe Link Report is as follows:`);
            console.log(Response);
            console.log('\nCrawling Complete!');
        })
        
    }, 10000);
    // pagesReport.then((Response)=>{
    //     console.log(pages);
    //     console.log('Crawling Complete!');
    // })
    
}

main();

