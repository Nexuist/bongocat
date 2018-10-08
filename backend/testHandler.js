const bongo = require("./handler").bongo;

bongo({ queryStringParameters: { filter: "mp4" } }, {}, (err, res) => {
  console.error(err);
  console.log(res);
});
