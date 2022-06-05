import ogs from 'open-graph-scraper';
// const { Options } = require('discord.js');
// const options = { url: 'http://ogp.me/' };


export const ogScraper = (url) => {
    const options = {
      url,
      downloadLimit: 100000000
    };
    
    return ogs(options)
      .then((data) => {
        const { error, result, response } = data;
        // console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
        // console.log('result:', result); // This contains all of the Open Graph results
        return result;
        // console.log('response:', response); // This contains the HTML of page
      }).catch( e => {
        throw Error('open-graph-error : ' + e.message )
      })//에러를 받는 함수
}
