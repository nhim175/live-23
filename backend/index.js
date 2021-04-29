const express = require("express");
const cors = require("cors");

const { getUsers } = require("./services/user");

const port = 3001;

const app = express();
app.use(cors());

app.get("/users", (req, res, next) => {
  const { lat, lng } = req.query;
  res.json(getUsers({ lat, lng, distanceInKm: 3 }));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
