const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

const discoverData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://youtube.com", {
    waitUntil: "networkidle2",
  });
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.evaluate(() => {
    window.scrollBy(0, 2000);
  });
  await page.waitForNetworkIdle();
  const content = await page.content();
  const $ = cheerio.load(content);

  let data = [];
  const numberOfVideos = 12;

  for (let i = 0; i < numberOfVideos; i++) {
    data.push({
      title: "",
      thumbnail: "",
      id: "",
    });
  }

  $("#video-title").each((index, element) => {
    if (index >= numberOfVideos) return;
    data[index].title = $(element).text().trim();
  });

  $("#thumbnail #img").each((index, element) => {
    if (index > numberOfVideos) return;
    if (parseInt($(element).attr("width")) >= 100) {
      data[index - 1].thumbnail = $(element).attr("src");
    }
  });

  $("#thumbnail").each((index, element) => {
    if (index > numberOfVideos || data[index - 1] == undefined) return;
    data[index - 1].id = $(element).attr("href").substring(9);
  });

  await fs.writeFileSync("public/feed.js", JSON.stringify({ data: data }));
  await fs.writeFileSync("prod/feed.js", JSON.stringify({ data: data }));

  await browser.close();
};

discoverData();
