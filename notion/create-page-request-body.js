
export default ({
  title,
  description,
  type,
  link,
  source,
  tags
}) => ({
  parent: {
    database_id: "eb8194b161cf4bfe8f9920d8a4f3b68a", // 데이터베이스 아이디
  },
  properties: {
    이름: {
      title: [
        {
          text: {
            content: title, // 페이지 제목
          },
        },
      ],
    },
    설명: {
      rich_text: [
        {
          text: {
            content: description, // 설명
          },
        },
      ],
    },
    종류: {
      select: {
        name: type, // 종류
      },
    },
    링크: {
      url: link, // url
    },
    출처: {
      select: {
        name: source, // 출처
      },
    },
    태그: {
      "multi_select": tags.map((tag)=> ({name : tag}))
    }
  }
})

// input  ["JS", "React"]
//object를 만든다.
//object의 key를 name으로 만들어준다.
//object의 value를 배열의 element로 맞춰줌



// output
// [
//   {
//     "name": "JS"
//   },
//   {
//     "name": "React"
//   }
// ]