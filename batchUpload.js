const AWS = require("aws-sdk");

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

let mp4 = [
  "https://i.imgur.com/eVGzskW.mp4",
  "https://i.imgur.com/fawN7bm.mp4",
  "https://i.imgur.com/gbQp49o.mp4",
  "https://i.imgur.com/FpDValF.mp4",
  "https://i.imgur.com/GjZZzNE.mp4",
  "https://i.imgur.com/XVor8TW.mp4",
  "https://i.imgur.com/HFu3atN.mp4",
  "https://i.imgur.com/KMCPasU.mp4",
  "https://i.imgur.com/FouQmbK.mp4",
  "https://i.imgur.com/XvaYgwO.mp4",
  "https://i.imgur.com/djVzdMh.mp4",
  "https://i.imgur.com/FGCy2rc.mp4",
  "https://i.imgur.com/bXV8dq5.mp4",
  "https://i.imgur.com/FASLq0h.mp4",
  "https://video.twimg.com/ext_tw_video/1039242832798613504/pu/vid/1280x720/uM_XbG8pENWYRxVi.mp4",
  "https://i.imgur.com/4p3Vdvf.mp4",
  "https://i.imgur.com/SKAHoC5.mp4"
];

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
