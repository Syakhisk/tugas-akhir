const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000); // get current Unix timestamp
  const filename = `lorem-ipsum_${timestamp}.txt`;

  if (fs.existsSync(filename)) {
    const contents = fs.readFileSync(filename, "utf8");
    res.send(contents);
  } else {
    const content =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit felis ac magna dapibus, vel commodo urna posuere. Maecenas pharetra commodo enim, nec suscipit mauris aliquam vel.";
    fs.writeFileSync(filePath, content);
    res.send(content);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
