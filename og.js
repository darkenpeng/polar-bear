const ogs = require('open-graph-scraper');
const { url } = require("../my-bot/commands/notion.js")
const { endPoint } = require('../config.json');
const notion = require('../my-bot/commands/notion.js');
// const options = { url: 'http://ogp.me/' };
function og(url) {
    console.log("잘 긁어옴!" + url)
}
// notion에서 가져온 url로 값 받아오기as

// og("https://twinstae.github.s/");
module.exports = {
    og

    // ogs(options)
    //     .then((data) => {
    //         const { error, result, response } = data;
    //         console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
    //         console.log('result:', result); // This contains all of the Open Graph results
    //         console.log('response:', response); // This contains the HTML of page
    //     })

    

}