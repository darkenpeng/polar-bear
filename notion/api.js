import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import { access, readFile, writeFile } from 'fs/promises';
//import { constants } from 'fs';

const configJson = readFileSync("./config.json");
const config = JSON.parse(configJson);
const SCHEMA_PATH = './' 
const FILE_NAME = 'db-schema.json'


const { endPoint, bearerToken } = config;
const myHeaders = new fetch.Headers();
myHeaders.append("Notion-Version", "2021-05-13");
myHeaders.append("Authorization", bearerToken);

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
}; 
//json문자열로 전송된 것을 객체로 리턴하는역할
const getDBSchema = async () => {
    // 백업이 있으면...

    try {
        await access(SCHEMA_PATH+FILE_NAME);
        //console.log('can access');
        const json = await readFile(SCHEMA_PATH+FILE_NAME,{ encoding: 'utf-8'});
        // buffer = 01010만있는 바이트로 이루어진 배열과비슷한 존재(?), encoding안해주면 타입이 Promise<buffer>였다가 Promise<string>됌
        // 파일에서 읽어온 json 문자열을... 객체로 변환해서 리턴한다
        return JSON.parse(json);

      } catch {
        //console.error('cannot access');
          //fetch 가 반환하는 Response는...
          // .text() => Promise<string> body를 그대로 반환
          // .json() => body를 JSON.parse해서 반환
        const result = await fetch(endPoint, requestOptions).then(response => response.json());
        const data = JSON.stringify(result);
        // result 에 들어 있는 객체를... json 문자열로 저장한다...
        await writeFile(SCHEMA_PATH+FILE_NAME,data,{ encoding: 'utf-8'});
        return result // 객체는 그대로 리턴해준다
      }
    // 백업을 읽어서 리턴한다...
    // 존재한다?
    // 백업이 없으면... API에서 데이터를 가져온다
    
    // 이렇든 저렇든 데이터를 리턴한다

   
}

export default {
    //식별자가 똑같으면 걍 이렇게 써도 됌. 
    getDBSchema
}