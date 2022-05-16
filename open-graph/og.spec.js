import { describe, it, expect } from "vitest";
import { ogScraper } from "./og.js";

// function isEven(n){
//   if(n===null) return null;
//   return n % 2 === 0;
// }
// //TODO 빈문자열이 들어오면 '기타'태그로 
// it('2 => even', ()=>{
//   expect(isEven(2)).toBe(true);
// })

// input 위에 있는 거
// output { tag, type, source, name, link, description }

// 수도코드 (?)
// url은 어차피 예외가 생긴다.
// 로직 추가하기 쉽게 만들자 !

// LISP , clojure
// (reduce + [1,2,3,4]) // s-expression s-표현식(symbolic-expression)

// 일단은 파일로 분리하기 애매하니까 걍 냅둠...
// 추상화 비슷한 정도로 해야 한다 = 이거 용어로 어떻게 말하나요??

// 계층, 어니언, 역할 => 응집도( 비슷한 (수준의) 것들은 모여 있어야 한다 ) / 결합도 ()

// domain model => 돈을 벌어주는 코드!
// tagging logic => 순수 함수 input => output, 의존성이 없다! 부수효과도 없다!

// persistence => 노션... / file / db / ...


const getSourceRules = [
  { "method": "includes", "value": "youtube", "result": "유튜브" },
  { "method": "includes", "value": "youtu.be", "result": "유튜브" },
  { "method": "includes", "value": "inflearn", "result": "인프런" },
  { "method": "includes", "value": "tistory", "result": "티스토리" },
  { "method": "includes", "value": "udemy", "result": "유데미" },
  { "method": "includes", "value": "velog", "result": "벨로그" },
  { "method": "includes", "value": "twitter", "result": "트위터" },
  { "method": "includes", "value": "techblog", "result": "테크-블로그" },
  { "method": "includes", "value": "hfe-developers.kakaoent", "result": "테크-블로그" },
  { "method": "includes", "value": "github", "result": "깃허브" }
]




// db에 뭐가 들어 있다, 파일에 뭐가 쓰여 있다, 돔에 뭐가 그려져 있다
// 어떤 상태에서 시작하지? 선행조건 given, init, setup
// 어떤 입력값이 들어오는 거지?, 부수효과를 일으키고, when, do,
// assertion, then
// 어떤 출력을 반환해야 하지?
// 이게 끝나면 어떤 상태가 되야하지? 후행조건 
// return getSourceRules.find(rule => input.ogUrl[rule.method](rule.value))?.result || "";
// og 로 긁어온 결과... 입력으로 받아서 input

const getTypeRules = [
  { "method": "includes", "value": "youtube", "result": "영상" },
  { "method": "includes", "value": "youtu.be", "result": "영상" },
  { "method": "includes", "value": "inflearn", "result": "강의" },
  { "method": "includes", "value": "tistory", "result": "블로그" },
  { "method": "includes", "value": "udemy", "result": "강의" },
  { "method": "includes", "value": "velog", "result": "블로그" },
  { "method": "includes", "value": "twitter", "result": "SNS" },
  { "method": "includes", "value": "techblog", "result": "블로그" },
  { "method": "includes", "value": "fe-developers.kakaoent", "result": "블로그" },
  { "method": "includes", "value": "github", "result": "깃허브" }
];



describe ("ogScraper", ()=> {

  const fireshipUrl = "https://www.youtube.com/watch?v=G1rOthIU-uo";

  const fireshipOgResult = {
    ogSiteName: 'YouTube',
    ogUrl: 'https://www.youtube.com/watch?v=G1rOthIU-uo',
    ogTitle: 'Redis in 100 Seconds',
    ogDescription: 'Use the special link https://redis.info/fireship (or code: MATRIX200) to try Redis Enterprise Cloud to get a $200 credit, become part of a weekly raffle, and...',
    alIosAppStoreId: '544007664',
    alIosAppName: 'YouTube',
    alIosUrl: 'vnd.youtube://www.youtube.com/watch?v=G1rOthIU-uo&feature=applinks',
    alAndroidUrl: 'vnd.youtube://www.youtube.com/watch?v=G1rOthIU-uo&feature=applinks',
    alWebUrl: 'http://www.youtube.com/watch?v=G1rOthIU-uo&feature=applinks',
    ogType: 'video.other',
    ogLocale: 'ko-KR',
    ogDate: '2021-07-08',
    favicon: 'https://www.youtube.com/s/desktop/b3b81e9c/img/favicon.ico',
    charset: 'utf8',
    requestUrl: 'https://www.youtube.com/watch?v=G1rOthIU-uo',
    success: true
  };

  const inflearnOgResult = {
    ogUrl: 'https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8',
    ogType: 'website',
    ogTitle: '[무료] 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 - 인프런 | 강의',
    ogDescription: '스프링 입문자가 예제를 만들어가면서 스프링 웹 애플리케이션 개발 전반을 빠르게 학습할 수 있습니다.,  - 강의 소개 | 인프런...',
    ogSiteName: '인프런',
    ogLocale: 'ko-KR',
    twitterCard: 'summary',
    twitterTitle: '[무료] 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 - 인프런 | 강의',
    twitterDescription: '스프링 입문자가 예제를 만들어가면서 스프링 웹 애플리케이션 개발 전반을 빠르게 학습할 수 있습니다.,  - 강의 소개 | 인프런...',
    twitterUrl: 'https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8',
    twitterSite: '@inflearn',
    twitterCreator: '@inflearn',
    ogImage: {
      url: 'https://cdn.inflearn.com/public/courses/325630/cover/56f635a3-3a44-4096-a16b-453ea1696b1a/325630-eng.png',
      width: null,
      height: null,
      type: 'png'
    },
    twitterImage: {
      url: 'https://cdn.inflearn.com/public/courses/325630/cover/56f635a3-3a44-4096-a16b-453ea1696b1a/325630-eng.png',
      width: null,
      height: null,
      alt: null
    },
    favicon: '/favicon.ico',
    charset: 'utf8',
    requestUrl: 'https://www.inflearn.com/course/스프링-입문-스프링부트',
    success: true
  }
  
  
  // it("if request to youtube, then return og result", async ()=>{
  //   const result = await ogScraper(fireshipUrl);
  //   expect(result).toStrictEqual(input)
  // })

  it("if request to youtube, then return og result", async ()=>{
    const inflearnUrl = "https://www.inflearn.com/course/스프링-입문-스프링부트"
    const result = await ogScraper(inflearnUrl);
    console.log(result);
    expect(result).toStrictEqual(inflearnOgResult);
  });
  
  
  it("input og result then return expected tagging result", ()=>{

    const output = {
      tag : ["Redis"],
      type : "영상",
      source : "유튜브",  
      title : 'Redis in 100 Seconds',
      link : 'https://www.youtube.com/watch?v=G1rOthIU-uo',
      description : 'Use the special link https://redis.info/fireship (or code: MATRIX200) to try Redis Enterprise Cloud to get a $200 credit, become part of a weekly raffle, and...'
    }
    expect(tagging(fireshipOgResult)).toStrictEqual(output);
  })
  
  it("input inflearnOgResult then return expected tagging result", ()=>{

    const output = {
      tag : ["Spring"],
      type : "강의",
      source : "인프런",  
      title : '[무료] 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 - 인프런 | 강의',
      link : 'https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8',
      description : '스프링 입문자가 예제를 만들어가면서 스프링 웹 애플리케이션 개발 전반을 빠르게 학습할 수 있습니다.,  - 강의 소개 | 인프런...'
    }
    expect(tagging(inflearnOgResult)).toStrictEqual(output);
  })
})


describe("getSource", ()=> {
  [
    ["https://youtu.be/Fg00LN30Ezg", "유튜브"],
    ["https://www.youtube.com/watch?v=2to3IQFhZVo", "유튜브"],
    ["https://twitter.com/kms_bernard/status/1501189203685609476?s=20&t=JLMv72TBRQnb-KOUMxApBg", "트위터"],
    ["https://github.com/baeharam/Must-Know-About-Frontend", "깃허브"],
    ["https://www.inflearn.com/course", "인프런"],
    ["https://velog.io/@joosing/", "벨로그"],
    ["https://jojoldu.tistory.com/137", "티스토리"],
    ["https://techblog.woowahan.com/2527/", "테크-블로그"],
    ["https://fe-developers.kakaoent.com/2021/211022-react-children-tip/", "테크-블로그"],
    ["https://www.w3schools.com/colors/colors_picker.asp", ""],
    ["https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html", ""],
    ["https://www.dafont.com/", ""]
  ].forEach(([ogUrl, expected]) => {
    it(`if input is ${ogUrl} then getSource return ${expected}`, ()=>{
      expect(getSource({ ogUrl })).toBe(expected);
    })
  })
})

describe.only("getType", ()=> {
  [
    ["https://youtu.be/Fg00LN30Ezg", "영상"],
    ["https://www.youtube.com/watch?v=2to3IQFhZVo", "영상"],
    ["https://twitter.com/kms_bernard/status/1501189203685609476?s=20&t=JLMv72TBRQnb-KOUMxApBg", "SNS"],
    ["https://github.com/baeharam/Must-Know-About-Frontend", "깃허브"],
    ["https://www.inflearn.com/course", "강의"],
    ["https://velog.io/@joosing/", "블로그"],
    ["https://jojoldu.tistory.com/137", "블로그"],
    ["https://techblog.woowahan.com/2527/", "블로그"],
    ["https://fe-developers.kakaoent.com/2021/211022-react-children-tip/", "블로그"],
    ["https://www.w3schools.com/colors/colors_picker.asp", ""],
    ["https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html", ""],
    ["https://www.dafont.com/", ""]
  ].forEach(([ogUrl, expected]) => {
    it(`if input is ${ogUrl} then getType return ${expected}`, ()=>{
      expect(getType({ ogUrl })).toBe(expected);
    })
  })
})


  // 노션에 넣을... 각 컬럼별 태깅을 어떻게 했는지? 그 결과를 반환
  // ???

  // 이렇게 태깅된 결과를 입력으로 받아서

  // 노션에 request로 보내는 양식으로 출력하기를 기대하는


//태깅로직 psudo
// ogUrl: 'https://www.youtube.com/watch?v=G1rOthIU-uo'
// ogUrl을 배열로 쪼갠다 split('.')
// 1번 인덱스의 값을 tagging의 value로 지정해준다
// 접근잘못했나?