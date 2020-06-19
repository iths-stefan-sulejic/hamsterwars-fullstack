const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const gamesRef = db.collection("games");
const hamstersRef = db.collection("hamsters");

router.post("/played", async (req, res) => {
    try {
        const snapShot = await gamesRef.get();
        snapShot.forEach(doc => {
            const game = doc.data();

            game.id = parseInt(req.body.id);
            game.timeStamp = new Date().toLocaleString();
            game.contestants[0].id = parseInt(req.body.contestants[0].id);
            game.contestants[0].name = req.body.contestants[0].name;
            game.contestants[0].imgName = req.body.contestants[0].imgName;
            game.contestants[0].favFood = req.body.contestants[0].favFood;
            game.contestants[0].loves = req.body.contestants[0].loves;
            if (parseInt(req.body.contestants[0].wins) > 0) {
                game.contestants[0].wins++;
            }
            if (parseInt(req.body.contestants[0].defeats) > 0) {
                game.contestants[0].defeats++;
            }
            game.contestants[0].games++;
            game.contestants[1].id = parseInt(req.body.contestants[1].id);
            game.contestants[1].name = req.body.contestants[1].name;
            game.contestants[1].imgName = req.body.contestants[1].imgName;
            game.contestants[1].favFood = req.body.contestants[1].favFood;
            game.contestants[1].loves = req.body.contestants[1].loves;
            if (parseInt(req.body.contestants[1].wins) > 0) {
                game.contestants[1].wins++;
            }
            if (parseInt(req.body.contestants[1].defeats) > 0) {
                game.contestants[1].defeats++;
            }
            game.contestants[1].games++;
            game.winner = req.body.winner;
            gamesRef
                .doc(doc.id)
                .set(game)
                .then(res.send({ msg: `Game ${req.body.id} added` }));
        });
    } catch (err) {
        console.error(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const totalGamesPlayedArray = [];

        const snapShot = await hamstersRef.where("games", ">", 0).get();
        snapShot.forEach(doc => {
            totalGamesPlayedArray.push(doc.data());
        });
        res.send({ gamesPlayed: totalGamesPlayedArray });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;