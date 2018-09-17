const AWS = require("aws-sdk");

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

var vids = [
  "https://www.youtube.com/watch?v=5RsOkhR6KBc",
  "https://www.youtube.com/watch?v=ldtpXBlh3tk",
  "https://youtu.be/I7KeH3BDRck",
  "https://www.youtube.com/watch?v=HaV2gOBwUPM",
  "https://youtu.be/HM_gmycasfw",
  "https://youtu.be/5aC4akD6RUk",
  "https://youtu.be/yWaZ_abH5Z4",
  "https://youtu.be/HaV2gOBwUPM",
  "https://youtu.be/I7KeH3BDRck",
  "https://youtu.be/GG-DkBiu_2o",
  "https://www.youtube.com/watch?v=7GuSaJxo5S0",
  "https://www.youtube.com/watch?v=dMA8PswEosY",
  "https://www.youtube.com/watch?v=bSAVJHRtGz0",
  "https://youtu.be/_S4PBMMq5yw",
  "https://www.youtube.com/watch?v=7GuSaJxo5S0ls",
  "https://www.youtube.com/watch?v=eAnRryw-jFY",
  "https://www.youtube.com/watch?v=ldtpXBlh3tk",
  "https://www.youtube.com/watch?v=YTCZYC_Ivwc",
  "https://www.youtube.com/watch?v=7GuSaJxo5S0",
  "https://youtu.be/I7KeH3BDRck",
  "https://www.youtube.com/watch?v=HaV2gOBwUPM",
  "https://youtu.be/HM_gmycasfw",
  "https://www.youtube.com/watch?v=GG-DkBiu_2o",
  "https://youtu.be/bLme5d8COG8",
  "https://youtu.be/tvJJb265TaY",
  "https://youtu.be/5z4ZTgrHGTI"
];

let counter = 21;

(async () => {
  for (i in vids) {
    let vid = vids[i];
    let id = null;
    if (vid.startsWith("https://youtu.be")) {
      id = vid.substring(vid.lastIndexOf("/") + 1);
    } else {
      id = vid.substring(vid.lastIndexOf("=") + 1);
    }
    let obj = {
      id: {
        N: `${counter}`
      },
      original: {
        S: vid
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
    await dynamo
      .putItem({
        Item: obj,
        TableName: "Bongocat"
      })
      .promise();
    counter += 1;
  }
})();
