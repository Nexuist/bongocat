"use strict";
const AWS = require("aws-sdk");
const bongocats = 63;

// https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let dynamo = new AWS.DynamoDB({
  region: "us-east-1",
  maxRetries: 5
});

module.exports.bongo = async (event, context, callback) => {
  let bongocat = null;
  if (event.queryStringParameters && event.queryStringParameters.filter) {
    // Filter through media types and return a random one
    let filteredBongocats = await dynamo
      .scan({
        ExpressionAttributeNames: {
          "#t": "type"
        },
        ExpressionAttributeValues: {
          ":f": { S: event.queryStringParameters.filter }
        },
        FilterExpression: "#t <> :f",
        TableName: "Bongocat"
      })
      .promise();
    if (filteredBongocats.Count == 0) {
      return callback(null, {
        statusCode: 400,
        body: "Not Found"
      });
    }
    bongocat =
      filteredBongocats.Items[
        randomIntFromInterval(0, filteredBongocats.Count - 1)
      ];
  } else {
    // Get a random one
    // TODO: update bongocats var automatically using DescribeTable
    bongocat = await dynamo
      .getItem({
        Key: {
          id: {
            N: `${randomIntFromInterval(0, bongocats)}`
          }
        },
        TableName: "Bongocat"
      })
      .promise();
    bongocat = bongocat.Item;
  }
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(bongocat)
  };

  return callback(null, response);
};
