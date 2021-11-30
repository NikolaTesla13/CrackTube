const util = require("util");
const exec = util.promisify(require("child_process").exec);

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
  copyFiles();
}

async function copyFiles() {
  const { stdout, stderr } = await exec("copy dist\\index.js prod ");
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
  copyMoreFiles();
}

async function copyMoreFiles() {
  const { stdout, stderr } = await exec("copy dist\\index.js.map prod");
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
  copyEvenMoreFiles();
}

async function copyEvenMoreFiles() {
  const { stdout, stderr } = await exec("copy public\\index.html prod");
  if (stderr) {
    console.log("Error copying the files: " + stderr);
    return;
  }
  console.log(stdout);
}

build();
