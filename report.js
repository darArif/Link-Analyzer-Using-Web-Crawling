const pages = require('./main.js'); 

function sortReportObjToArray(pages) {
    return ( Object.entries(pages).sort((a, b) => b[1]-a[1]) );
}

module.exports = function printReport(pages) {
    console.log('\nReport is starting:\n');
    const sortedReportArray = sortReportObjToArray(pages);
    for(linkItem of sortedReportArray) {
        console.log(`${linkItem[0]}: ${linkItem[1]}\n`);
    }
}