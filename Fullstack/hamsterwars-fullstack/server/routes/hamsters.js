const { db } = require("./../firebase");
const { Router } = require("express");
const uuid = require("uuid");

const router = new Router();

const hamstersRef = db.collection("hamsters");

router.get('/random', async (request, response) => {
    let hamsters = [];

    let snapShot = await db.collection('hamsters').get()

    snapShot.forEach(hamster => {
        hamsters.push(hamster.data());
    })
    let randomHamster = Math.floor(Math.random()*snapShot._size);

    response.send(hamsters[randomHamster])
    console.log('GET /api/hamsters/random skickar till frontend:', hamsters[randomHamster])
})

router.get("/", async (req, res) => {
    try {
        const hamstersArray = [];
        const snapShot = await hamstersRef.get();
        snapShot.forEach(doc => {
            hamstersArray.push(doc.data());
        });
        res.send(hamstersArray);
    } catch (err) {
        console.error(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const snapShot = await hamstersRef
            .where("id", "==", parseInt(req.params.id))
            .get();
        snapShot.forEach(doc => {
            res.send({ SpecificHamster: doc.data() });
        });
    } catch (err) {
        console.error(err);
    }
});

router.put("/:id/result", async (req, res) => {
    try {
        const snapShot = await hamstersRef
            .where("id", "==", parseInt(req.params.id))
            .get();
        snapShot.forEach(doc => {
            const hamster = doc.data();

            if (parseInt(req.body.wins) > 0) {
                hamster.wins++;
            }
            if (parseInt(req.body.defeats) > 0) {
                hamster.defeats++;
            }
            hamster.games++;
            hamstersRef
                .doc(doc.id)
                .set(hamster)
                .then(
                    res.send({
                        msg: `Hamster ${converter.toWords(
                            req.params.id
                        )}´s game stats updated`,
                    })
                )
                .catch(err => {
                    throw err;
                });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const snapShot = await hamstersRef.get();
        let data = {
            id: snapShot._size + 1,
            name: req.body.name,
            imgName: req.body.imgName,
            favFood: req.body.favFood,
            loves: req.body.loves,
            games: 0,
            wins: 0,
            defeats: 0,
            age: req.body.age,
        };

        hamstersRef
            .doc(uuid.v4())
            .set(data)
            .then(res.send({ msg: `Hamster ${data.id} added` }));
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;