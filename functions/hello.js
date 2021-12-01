exports.handler = async function (event, context) {
  const YouTube = require("youtube-sr").default;
  const results = await YouTube.search("fireship", { limit: 12 });
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      title: results[i].title,
      thumbnail: results[i].thumbnail.url,
      id: results[i].id,
    });
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ data: data }),
  };
};
