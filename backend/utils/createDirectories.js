const fs = require("fs");
const path = require("path");

const createDirectories = () => {
  const directories = ["uploads", "uploads/profiles"];

  directories.forEach((dir) => {
    const fullPath = path.join(__dirname, "../", dir);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Directory created: ${fullPath}`);
    } else {
      console.log(`Directory alredy exists: ${fullPath}`);
    }
  });
};

module.exports = createDirectories;