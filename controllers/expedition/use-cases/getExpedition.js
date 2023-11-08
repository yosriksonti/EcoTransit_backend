module.exports = function makeGetExpedition(db, E, utils) {
    return async function getExpedition(req, res) {
        const result = await db.Expedition
        .findById(req.params.id)
        .populate('fromStation')
        .populate('toStation')
        res.json(result)
    }
}