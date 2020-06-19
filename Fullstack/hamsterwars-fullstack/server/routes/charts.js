const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const hamstersRef = db.collection("hamsters");

router.get("/top", async (req, res) => {
    try {
        const topFiveHamstersArray = [];

        const snapShot = await hamstersRef
            .orderBy("wins", "desc")
            .limit(5)
            .get();
        snapShot.forEach(doc => {
            topFiveHamstersArray.push(doc.data());
        });
        res.send(topFiveHamstersArray);
    } catch (err) {
        console.error(err);
    }
});

router.get("/bottom", async (req, res) => {
    try {
        const bottomFiveHamstersArray = [];

        const snapShot = await hamstersRef
            .orderBy("defeats", "desc")
            .limit(5)
            .get();
        snapShot.forEach(doc => {
            bottomFiveHamstersArray.push(doc.data());
        });
        res.send(bottomFiveHamstersArray);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;