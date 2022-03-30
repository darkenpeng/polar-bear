import { readFileSync } from 'fs';
const configJson = readFileSync("./config.json");
const config = JSON.parse(configJson);

const { endPoint, bearerToken } = config;

import fetch from 'node-fetch';
var myHeaders = new fetch.Headers();
myHeaders.append("Notion-Version", "2021-05-13");
myHeaders.append("Authorizatiㄴon", bearerToken);

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
};


const getDBSchema = () =>
fetch(endPoint, requestOptions)
.then(response => response.json());
// 함수 2번
export default {
    //식별자가 똑같으면 걍 이렇게 써도 됌. 
    getDBSchema
}