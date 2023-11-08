module.exports = function makeGetStation(db, E, utils) {
    return async function getStation(req, res) {
        const result = await db.Station
        .findById(req.params.id)
        .populate('outExpeditions')
        .populate('inExpeditions')
        .populate('outIterinaries')
        .populate('inIterinaries')
        res.json(result)
    }
}