import { mockSource, mockType } from "./og.tagging-mock-data.js";

class Tagger {
  constructor(mockSource, mockType) {
    this.mockSource = mockSource;
    this.mockType = mockType;
  }

  getSource(input) {
    return (
      this.mockSource.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result || ""
    );
  }

  getType(input) {
    return (
      this.mockType.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result ?? ""
    );
  }

  getKeyword(input) {
    return {
      tag: ["Redis"],
      type: getType(input),
      source: getSource(input),
      title: input.ogTitle,
      link: input.ogUrl,
      description: input.ogDescription,
    };
  }
}

const tagger = new Tagger(mockSource, mockType);
export default tagger;