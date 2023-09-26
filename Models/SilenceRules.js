const PromptSequence = require("./PromptSequence")

const SilenceRules =
{
    engageComfortSequence: false,
    botResponseDelayTolerance: 0,
    comfortPromptSequence: PromptSequence,
    millisecondsToWaitForUserResponse: 0,
}
module.exports = SilenceRules