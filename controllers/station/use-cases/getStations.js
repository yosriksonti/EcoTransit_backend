module.exports = function makeGetStations(db, E, utils) {
    return async function getStations(req, res) {
        const result = await db.Station
        .find({})
        .populate('outExpeditions')
        .populate('inExpeditions')
        .populate('outIterinaries')
        .populate('inIterinaries')
        res.json(result)
    }
}