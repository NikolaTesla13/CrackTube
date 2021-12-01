exports.handler = async function (event, context) {
  const YouTube = require("youtube-sr").default;
  const results = await YouTube.search("fireship", { limit: 3 });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: results }),
  };
};
