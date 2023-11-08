module.exports = function makeCreateExpedition(db, E, utils) {
    return async function createExpedition(req, res) {
        const expedition = new db.Expedition({
            reference : req.body.reference,
            fromStation : req.body.fromStationId,
            toStation :  req.body.toStationId,
            duration : Number(req.body.duration),
        })
        const result = await expedition.save()
        res.json(result)
    }
}