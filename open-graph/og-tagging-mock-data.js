
 const mockSource = [
  ["https://youtu.be/Fg00LN30Ezg", "유튜브"],
  ["https://www.youtube.com/watch?v=2to3IQFhZVo", "유튜브"],
  [
    "https://twitter.com/kms_bernard/status/1501189203685609476?s=20&t=JLMv72TBRQnb-KOUMxApBg",
    "트위터",
  ],
  ["https://github.com/baeharam/Must-Know-About-Frontend", "깃허브"],
  ["https://www.inflearn.com/course", "인프런"],
  ["https://velog.io/@joosing/", "벨로그"],
  ["https://jojoldu.tistory.com/137", "티스토리"],
  ["https://techblog.woowahan.com/2527/", "테크-블로그"],
  [
    "https://fe-developers.kakaoent.com/2021/211022-react-children-tip/",
    "테크-블로그",
  ],
  ["https://www.w3schools.com/colors/colors_picker.asp", ""],
  ["https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html", ""],
  ["https://www.dafont.com/", ""],
];

 const mockType = [
  ["https://youtu.be/Fg00LN30Ezg", "영상"],
  ["https://www.youtube.com/watch?v=2to3IQFhZVo", "영상"],
  [
    "https://twitter.com/kms_bernard/status/1501189203685609476?s=20&t=JLMv72TBRQnb-KOUMxApBg",
    "SNS",
  ],
  ["https://github.com/baeharam/Must-Know-About-Frontend", "깃허브"],
  ["https://www.inflearn.com/course", "강의"],
  ["https://velog.io/@joosing/", "블로그"],
  ["https://jojoldu.tistory.com/137", "블로그"],
  ["https://techblog.woowahan.com/2527/", "블로그"],
  [
    "https://fe-developers.kakaoent.com/2021/211022-react-children-tip/",
    "블로그",
  ],
  ["https://www.w3schools.com/colors/colors_picker.asp", ""],
  ["https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html", ""],
  ["https://www.dafont.com/", ""],
];



const taggingOutputYoutube = {
  tag: ["Redis"],
  type: "영상",
  source: "유튜브",
  title: "Redis in 100 Seconds",
  link: "https://www.youtube.com/watch?v=G1rOthIU-uo",
  description:
    "Use the special link https://redis.info/fireship (or code: MATRIX200) to try Redis Enterprise Cloud to get a $200 credit, become part of a weekly raffle, and...",
};


const taggingOutputInflearn = {
  tag: ["Spring"],
  type: "강의",
  source: "인프런",
  title:
    "[무료] 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 - 인프런 | 강의",
  link: "https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8",
  description:
    "스프링 입문자가 예제를 만들어가면서 스프링 웹 애플리케이션 개발 전반을 빠르게 학습할 수 있습니다.,  - 강의 소개 | 인프런...",
};

export {mockSource, mockType, taggingOutputInflearn, taggingOutputYoutube }