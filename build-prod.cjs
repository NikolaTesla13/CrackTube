const util = require("util");
const exec = util.promisify(require("child_process").exec);
const isWin = process.platform === "win32";

async function build() {
  const { stdout, stderr } = await exec("npm run build");
  if (stderr) {
    console.log("Error while building the project: " + stderr);
    return;
  }
  console.log(stdout);
  createProdFolder();
}

async function createProdFolder() {
  const { stdout, stderr } = await exec("mkdir prod");
  if (stderr) {
    console.log("Error while creating the folder: " + stderr);
    return;
  }
  console.log(stdout);
  fetchFeed();
}

async function fetchFeed() {
  const { stdout, stderr } = await exec("node fetch-yt.cjs");
  if (stderr) {
    console.log("Error getting the feed: " + stderr);
    return;
  }
  console.log(stdout);
  copyFiles();
}

async function copyFiles() {
  const { stdout, stderr } = await exec(
    isWin ? "copy dist\\index.js prod " : "cp dist/index.js prod/index.js"
  );
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
  copyMoreFiles();
}

async function copyMoreFiles() {
  const { stdout, stderr } = await exec(
    isWin
      ? "copy dist\\index.js.map prod"
      : "cp dist/index.js.map prod/index.js.map"
  );
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
  copyEvenMoreFiles();
}

async function copyEvenMoreFiles() {
  const { stdout, stderr } = await exec(
    isWin
      ? "copy public\\index.html prod"
      : "cp public/index.html prod/index.html"
  );
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
}

build();
