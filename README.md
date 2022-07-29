# discord-bot
open-graph-scraper로 구현한 디스코드 봇
## polar-bear 폴더구조
```
|-- README.md
|-- commands
|   |-- help.js
|   |-- notion.js
|   `-- ping.js
|-- config.json
|-- db-schema.json
|-- deploy-commands.js
|-- index.js
|-- notion
|   |-- api.js
|   |-- create-page-request-body.js
|-- open-graph
|   |-- __snapshots__
|   |   `-- og.spec.js.snap
|   |-- og-mock-data.js
|   |-- og-rules.js
|   |-- og-tagging-mock-data.js
|   |-- og-tagging.js
|   |-- og-tagging.spec.js
|   |-- og.js
|   `-- og.spec.js
|-- package-lock.json
|-- package.json
`-- polar-bear.png
```
## polar-bear 실행
**root path**
```
$ ./my-bot
```
**test command**
```
$ npm start
```


## 데이터 파이프라인
<img width="784" alt="image" src="https://user-images.githubusercontent.com/91370858/181772371-4a212e08-f650-4079-ae03-a65f1eff0caf.png">

## polar-bear 기능설명
디스코드 채팅으로 URL을 입력하면 태그가 자동으로 생성되어 notion database에 row 추가
미리 cache해둔 DB 스키마를 통해 POST 요청하는 방식으로 구현

## 기술스택
> - node.js
> - discord.js
> - open-graph-scraper
> - vitest

## 

## 
노션 페이지(https://acute-spectrum-201.notion.site/6d0112d07af248bea4356f5597f4c161)

