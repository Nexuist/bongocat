const AWS = require("aws-sdk");

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

let mp4 = [];

var yt = [];
// if (vid.startsWith("https://youtu.be")) {
//       id = vid.substring(vid.lastIndexOf("/") + 1);
//     } else {
//       id = vid.substring(vid.lastIndexOf("=") + 1);
//     }
let counter = 47;

(async () => {
  for (i in mp4) {
    let vid = mp4[i];
    let id = null;

    let obj = {
      id: {
        N: `${counter}`
      },
      original: {
        S: "https://imgur.com/gallery/IBmTlIV"
      },
      src: {
        S: vid
      },
      submitter: {
        S: "nexuist"
      },
      type: {
        S: "mp4"
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
