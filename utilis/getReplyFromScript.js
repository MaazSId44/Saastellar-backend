const staticReplies = require("./staticReplies");

function getReplyFromScript(userText) {
  const lowerText = userText.toLowerCase();

  for (const question in staticReplies) {
    if (lowerText.includes(question)) {
      return staticReplies[question];
    }
  }
  return "I'm sorry, could you please repeat that?";
}

module.exports = getReplyFromScript;
