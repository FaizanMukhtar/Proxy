const BotExchangeBranch = require("./BotExchangeBranch");
const PromptSequence = require("./PromptSequence");
const IntentInfo = require("./IntentInfo");
const PromptBehaviours = require("./PromptBehaviours");
const BotErrorDetails = require("./BotErrorDetails");

const CustomExchangeResponse_V1 =
{
    branchName: BotExchangeBranch.ReturnControlToScript,
    nextPromptSequence: PromptSequence,
    intentInfo: IntentInfo,
    nextPromptBehaviors: PromptBehaviours,
    customPayload: {},
    errorDetails: BotErrorDetails,
    botSessionState: {},
}
module.exports = CustomExchangeResponse_V1