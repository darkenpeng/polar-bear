import { describe, it, expect } from "vitest";
//import tagger from "./og-tagging.js";
import { ogScraper } from "./og.js";
import {fireshipUrl, fireshipOgResult, inflearnUrl, inflearnOgResult} from './og-mock-data.js'
// 아니 이것도 분리해야할것같은데? ogScraper가 가장 상위고 그다음 tagging result에 대한 테스트가
// 아 !!!!!!!!!!!!!! 과거의 나!!!!!!!!!! 

describe("ogScraper", () => {
  it("if request to inflearn, then return inflearn og result", async () => {
    const result = await ogScraper(inflearnUrl);
    expect(result).toMatchSnapshot();
  });

  it("if request to youtube, then return youtue og result", async () => {
    const result = await ogScraper(fireshipUrl);
    expect(result).toMatchSnapshot();
  });
});
