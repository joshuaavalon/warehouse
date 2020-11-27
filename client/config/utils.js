const path = require("path");
const fs = require("fs");

const resolvePath = relativePath => path.resolve(__dirname, "..", relativePath);

const exist = path => fs.existsSync(path);

module.exports = {
  resolvePath,
  exist
};
