const router = require('express').Router(),
    TodoModel = require('../config/todoSchema.js');

router.get("/", (req,res) => res.json("TODO"));
router.use((req,res,next) => {
    let {ea} = req.query;
    if(ea == null || typeof ea !== Number) ea = 10;
    if(ea > 100) ea = 100;
    req.query.ea = ea;
    return next();
});
router.get("/all", async (req,res) => {
    const {ea} = req.query;
    return await TodoModel.findAll({ea}).then(data => res.json(data)).catch(_ => res.json("ERROR"));
});

router.post('/add', async (req,res) => {
    const {data} = req.body;
    if(data == null) return res.json([]);
    if(typeof data != "string") res.json([]);
    return await TodoModel.insertMany({data})
        .then( e => res.json(e))
        .catch(err => res.json(err));
});

router.post('/update', async (req,res) => {
    const {id, update} = req.body;
    return await TodoModel.updateMany({"_id":id}, {"data":update})
        .then(e => res.json(e))
        .catch(_ => res.json([]));
});

router.post('/delete', async (req,res) => {
    const {id} = req.body;
    return await TodoModel.remove({"_id":id})
        .then(e => res.json(e))
        .catch(_ => res.json([]));
});

module.exports = router;