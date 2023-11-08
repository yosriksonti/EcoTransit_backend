module.exports = function makeGetExpeditions(db,errors,utils) {
    return async function getExpeditions(req, res) {
        const result = await db.Expedition
        .find(req.query.from || req.query.to 
            ? {$or: [ { fromStation: req.query.from }, { toStation: req.query.to } ]} 
            : {}
        )
        .populate('fromStation')
        .populate('toStation')
        res.json(result)
    }
}