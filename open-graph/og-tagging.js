import { getSourceRules, getTypeRules } from "./og.spec";

class Tagger {
  constructor(getSourceRules, getTypeRules) {
    this.getSourceRules = getSourceRules;
    this.getTypeRules = getTypeRules;
  }

  getSource(input) {
    return (
      this.getSourceRules.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result || ""
    );
  }

  getType(input) {
    return (
      this.getTypeRules.find((rule) => input.ogUrl[rule.method](rule.value))
        ?.result ?? ""
    );
  }

  tagging(input) {
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

const tagger = new Tagger(getSourceRules, getTypeRules);
export default tagger;
