const BotErrorBehaviour = require("./BotErrorBehaviour");
const PromptSequence = require("./PromptSequence");

const BotErrorDetails =
{
    errorBehaviour: BotErrorBehaviour.ReturnControlToScriptThroughErrorBranch,
    errorPromptSequence: PromptSequence,
    systemErrorMessage: "",
}
module.exports = BotErrorDetails