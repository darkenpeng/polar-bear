const fetch = require("node-fetch");

const baseUrl = "https://postman-echo.com/post";

const obj1 = { id: 1, name: "one" };
const obj2 = { id: 2, name: "two" };
const obj3 = { id: 3, name: "three" };

const options1 = {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json, text/plain, */*",
  },
  body: JSON.stringify(obj1),
};

const options2 = {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json, text/plain, */*",
  },
  body: JSON.stringify(obj2),
};

const options3 = {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json, text/plain, */*",
  },
  body: JSON.stringify(obj3),
};

const createUser = (url, options) => {
  return options.map((option) => fetch(url, option));
};

(async () => {
  const promises = createUser(baseUrl, [options1, options2, options3]);

  try {
    const rc = await Promise.all(promises);
    console.log(rc);
  } catch (e) {
    console.log("Caught error: ", e);
  }
})();