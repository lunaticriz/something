const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use("/university", require("./insert"));
app.use("/course", require("./course"));

app.listen(port, () =>
  console.log(`Application is running on http://127.0.0.1:${port}`)
);
