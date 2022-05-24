import { sourceRules, typeRules, tagRules } from "./og-rules.js";

class Tagger {
  constructor(sourceRules, typeRules, tagRules) {
    this.sourceRules = sourceRules;
    this.typeRules = typeRules;
    this.tagRules = tagRules

  }

  getSource(input) {
    return (
      this.sourceRules.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result || "null"
    );
  }

  getType(input) {
    return (
      this.typeRules.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result ?? "null"
    );
  }

  getTag(input) {
    return this.tagRules.filter((rule)=> input.ogDescription.toLowerCase()[rule.method](rule.value))
      .map((rule)=> rule.result);
  }

  fromOgToRowData(input) {
    return {
      tags: this.getTag(input),
      //여기 this 왜 쓰는지 모르겠는데 왠지 이거 써야 에러가 없어질 것 같음...
      type: this.getType(input),
      source: this.getSource(input),
      title: input.ogTitle,
      link: input.ogUrl,
      description: input.ogDescription,
    };
  }
}

const tagger = new Tagger(sourceRules, typeRules, tagRules);
export default tagger;

