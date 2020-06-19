const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const doesCollectionExist = require("./doesCollectionExist");

const serverPort = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.static(__dirname + "/../build"));
app.use(express.json());

doesCollectionExist("hamsters");
doesCollectionExist("games");

const assetsRoute = require("./routes/assets");
app.use("/api/assets", assetsRoute);

const chartsRoute = require("./routes/charts");
app.use("/api/charts", chartsRoute);

const gamesRoute = require("./routes/games");
app.use("/api/games", gamesRoute);

const hamstersRoute = require("./routes/hamsters");
app.use("/api/hamsters", hamstersRoute);

const statsRoute = require("./routes/stats");
app.use("/api/stats", statsRoute);

app.listen(serverPort, () =>
    console.log(`Server up and running on port ${serverPort}`)
);