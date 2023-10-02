const express = require("express");
const { json } = express;
require("dotenv").config();
const dialogflow = require("@google-cloud/dialogflow");
const Creds = JSON.parse(process.env.Credentials);
const projectId = Creds.project_id;
const config = {
  credentials: {
    private_key: Creds["private_key"],
    client_email: Creds["client_email"],
  },
};
const sessionClient = new dialogflow.SessionsClient(config);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return {
    response: result,
    
  };
};
module.exports = {
  detectIntent,
  sessionClient,
  config,
};
