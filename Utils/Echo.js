const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
const userInputType = require("../Models/UserInputType");

module.exports = async (req, res) => {
    let BE_Response = CustomExchangeResponse_V1;
    BE_Response.nextPromptBehaviors = null;
    let userInput = req.body.userInput;
    let prompts = [PromptDefinition];
    if (req.body.userInputType == userInputType.AUTOMATED_TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        BE_Response.intentInfo.intent = "Welcome";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
        prompts[0].audioFilePath="";
        prompts[0].base64EncodedG711ulawWithWavHeader="";
        prompts[0].mediaSpecificObject="";
        prompts[0].textToSpeech="";
    }
    else if (req.body.userInputType == userInputType.TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        BE_Response.intentInfo.intent = "Text";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
        prompts[0].audioFilePath="";
        prompts[0].base64EncodedG711ulawWithWavHeader="";
        prompts[0].mediaSpecificObject="";
        prompts[0].textToSpeech="";
    }
    else if (req.body.userInputType == userInputType.DTMF_AS_TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        prompts[0].transcript = userInput;
        prompts[0].audioFilePath="";
        prompts[0].base64EncodedG711ulawWithWavHeader="";
        prompts[0].mediaSpecificObject="";
        prompts[0].textToSpeech="";
    }
    else if (req.body.userInputType == userInputType.BASE64_ENCODED_G711_ULAW_WAV_FILE) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        if (req.body.userInputType != "") {
            prompts[0].base64EncodedG711ulawWithWavHeader = req.body.base64wavFile;
            prompts[0].transcript = "";
            prompts[0].audioFilePath="";
            prompts[0].mediaSpecificObject="";
            prompts[0].textToSpeech="";
        }
        else {
            prompts[0].transcript = "Not Found"
            prompts[0].audioFilePath="";
            prompts[0].base64EncodedG711ulawWithWavHeader="";
            prompts[0].mediaSpecificObject="";
            prompts[0].textToSpeech="";
        }
    }
    else if (req.body.userInputType == userInputType.NO_INPUT) {
        BE_Response.branchName = BotExchangeBranch.ReturnControlToScript
        BE_Response.intentInfo.intent = "Text";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
        prompts[0].audioFilePath="";
        prompts[0].base64EncodedG711ulawWithWavHeader="";
        prompts[0].mediaSpecificObject="";
        prompts[0].textToSpeech="";
    }
    BE_Response.nextPromptSequence.prompts = prompts;
    console.log("hi",BE_Response.nextPromptSequence)
    console.log("hello",prompts);
    return BE_Response;
}