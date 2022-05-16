import { readFileSync } from "fs";
import fetch from "node-fetch";
import { access, readFile, writeFile } from "fs/promises";
//import { constants } from 'fs';
import createPageRequestBody from "./create-page-request-body.js";
const configJson = readFileSync("./config.json");
const config = JSON.parse(configJson);
const SCHEMA_PATH = "./";
const FILE_NAME = "db-schema.json";

const { endPoint, bearerToken } = config;
const myHeaders = new fetch.Headers();
myHeaders.append("Notion-Version", "2021-05-13");
myHeaders.append("Authorization", bearerToken);

//json문자열로 전송된 것을 객체로 리턴하는역할
const getDBSchema = async () => {
  // 백업이 있으면...

  try {
    await access(SCHEMA_PATH + FILE_NAME);
    //console.log('can access');
    const json = await readFile(SCHEMA_PATH + FILE_NAME, { encoding: "utf-8" });
    // buffer = 01010만있는 바이트로 이루어진 배열과비슷한 존재(?), encoding안해주면 타입이 Promise<buffer>였다가 Promise<string>됌
    // 파일에서 읽어온 json 문자열을... 객체로 변환해서 리턴한다
    return JSON.parse(json);
  } catch {
    //console.error('cannot access');
    //fetch 가 반환하는 Response는...
    // .text() => Promise<string> body를 그대로 반환
    // .json() => body를 JSON.parse해서 반환

    const result = await fetch(endPoint, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }).then((response) => response.json());
    const data = JSON.stringify(result);
    // result 에 들어 있는 객체를... json 문자열로 저장한다...
    await writeFile(SCHEMA_PATH + FILE_NAME, data, { encoding: "utf-8" });
    return result; // 객체는 그대로 리턴해준다
  }
  // 백업을 읽어서 리턴한다...
  // 존재한다?
  // 백업이 없으면... API에서 데이터를 가져온다
  // 이렇든 저렇든 데이터를 리턴한다
};

const createPage = (rowData) => {
  // notion에 rowData를 잘 가공해서 넣어달라고 요청을 보낸다!'

  // notion이 요구하는 데이터 양식으로 변환

  const createHeader = new fetch.Headers();
  createHeader.append("Notion-Version", "2022-02-22");
  createHeader.append("Authorization", bearerToken);
  createHeader.append("Content-Type", "application/json");

  const body = createPageRequestBody(rowData);
  // notion api http 요청
  return fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: createHeader,
    redirect: "follow",
    body: JSON.stringify(body),
  });
};

export default {
  //식별자가 똑같으면 걍 이렇게 써도 됌.
  getDBSchema,
  createPage,
};

await createPage({
  title: "백엔드 하드 트레이닝 4월 26일",
  description: "좋은 자료임",
  type: "강의",
  link: "https://youtu.be/1GmxQegwjw4",
  source: "유튜브",
  tags: ["백엔드"],
})
  .then((res) => res.text())
  .then((body) => console.log(body));
