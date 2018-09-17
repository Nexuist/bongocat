const bongo = require("./handler").bongo;

bongo({ queryStringParameters: { filter: "mp4" } }, {}, (err, res) => {
  console.log(err);
  console.log(res);
});
