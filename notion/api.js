const { endPoint, bearerToken } = require('../config.json');
const fetch = require('node-fetch');
var myHeaders = new fetch.Headers();
myHeaders.append("Notion-Version", "2021-05-13");
myHeaders.append("Authorization", bearerToken);

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
};


const getDBSchema = () => fetch(endPoint, requestOptions).then(response => response.json());
// 함수 2번
module.exports = {
    //식별자가 똑같으면 걍 이렇게 써도 됌. 
    getDBSchema
}