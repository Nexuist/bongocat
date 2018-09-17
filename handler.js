"use strict";
const AWS = require("aws-sdk");
const bongocats = 6;

// https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

module.exports.bongo = async (event, context, callback) => {
  let bongocat = await dynamo
    .getItem({
      Key: {
        id: {
          N: `${randomIntFromInterval(0, bongocats)}`
        }
      },
      TableName: "Bongocat"
    })
    .promise();
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(bongocat.Item)
  };

  return callback(null, response);
};
