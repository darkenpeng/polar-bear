import { describe, it, expect } from "vitest";
import { ogScraper } from "./og";

function isEven(n){
  if(n===null) return null;
  return n % 2 === 0;
}

describe("tagging", ()=> {
  [
    [0, true],
    [3, false],
    [4, true],
    [123456789, false],
    [-276, true],
    [-1, false],
    [null, null]
  ].forEach(([input, expected]) => {
    it(`if input is ${input} then isEven return ${expected}`, ()=>{
      expect(isEven(input)).toBe(expected);
    })
  })
})

  //
  // db에 뭐가 들어 있다, 파일에 뭐가 쓰여 있다, 돔에 뭐가 그려져 있다
  // 어떤 상태에서 시작하지? 선행조건 given, init, setup
  // 어떤 입력값이 들어오는 거지?, 부수효과를 일으키고, when, do,
  // assertion, then
  // 어떤 출력을 반환해야 하지?
  // 이게 끝나면 어떤 상태가 되야하지? 후행조건 

  // og 로 긁어온 결과... 입력으로 받아서 input
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
  })
  // input 위에 있는 거
  // output { tag, type, source, name, link, description }

  const getSource = (input) => {
    if(input.ogUrl.includes("youtube")){
      return "유튜브";
    }
    if(input.ogUrl.includes("inflearn")){
      return "인프런";
    }
    if(input.ogUrl.includes('udemy')){
      return "유데미";
    }

    return "";
  }
  const getType = (input) => {
    if(input.ogUrl.includes("inflearn")){
      return "강좌";
    }

    return "";
  }
  const tagging = (input) => {
    return {
      tag : ["Redis"],
      type : getType(input),
      source : getSource(input),  
      title : input.ogTitle,
      link : input.ogUrl,
      description : input.ogDescription
    };
  }
  
  
  it("input og result then return expected tagging result", ()=>{

    const output = {
      tag : ["Redis"],
      type : "",
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
      type : "강좌",
      source : "인프런",  
      title : '[무료] 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 - 인프런 | 강의',
      link : 'https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8',
      description : '스프링 입문자가 예제를 만들어가면서 스프링 웹 애플리케이션 개발 전반을 빠르게 학습할 수 있습니다.,  - 강의 소개 | 인프런...'
    }
    expect(tagging(inflearnOgResult)).toStrictEqual(output);
  })
})



  // 노션에 넣을... 각 컬럼별 태깅을 어떻게 했는지? 그 결과를 반환
  // ???

  // 이렇게 태깅된 결과를 입력으로 받아서

  // 노션에 request로 보내는 양식으로 출력하기를 기대하는



