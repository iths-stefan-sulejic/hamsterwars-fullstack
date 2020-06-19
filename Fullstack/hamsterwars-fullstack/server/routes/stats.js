const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const hamstersRef = db.collection("hamsters");

router.get("/total", async (req, res) => {
    try {
        let totalGames = 0;
        const snapShot = await hamstersRef.get();

        snapShot.forEach(doc => {
            totalGames += doc.data().games;
        });
        res.send([totalGames]);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;