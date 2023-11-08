module.exports = function makeCreateStation(db, E, utils) {
    return async function createStation(req, res) {
            const station = new db.Station({
                lan : Number(req.body.lan),
                lat : Number(req.body.lat),
                reference : req.body.reference
            })
            const result = await station.save()
            res.json(result)
    }
}