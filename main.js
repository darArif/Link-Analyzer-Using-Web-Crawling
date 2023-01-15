const crawlPage = require('./crawl');

const printReport = require('./report.js');

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
    const ReportPromise = crawlPage(process.argv[2], process.argv[2], pages);
    setTimeout(()=>{
        ReportPromise.then((Response)=>{
           printReport(pages);
        })
    }, 10000);

    module.exports = pages;
}

main();

