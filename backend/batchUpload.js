// This is a playground file that helps upload various types of media to the bongocat database in bulk.
// Don't expect it to actually work in any sort of reproducible way as it's more one time use than anything.
const AWS = require("aws-sdk");
const fs = require("fs");

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

let counter = 91;
let fil = fs.readFileSync("../wahaha.txt", "utf8").split("\n");

(async () => {
  for (var i = 0; i < fil.length; i++) {
    let vid = fil[i];
    let id = vid.substring(vid.indexOf("?v=") + 3);
    let obj = {
      id: {
        N: `${counter}`
      },
      original: {
        S: fil[i]
      },
      src: {
        S: `https://youtube.com/embed/${id}`
      },
      submitter: {
        S: "nexuist"
      },
      type: {
        S: "yt"
      }
    };
    console.log(obj);
    await dynamo
      .putItem({
        Item: obj,
        TableName: "Bongocat"
      })
      .promise();
    counter += 1;
  }
})();
