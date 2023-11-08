module.exports = function makeCreateIterinary(db, E, utils) {
    return async function createIterinary(req, res) {
        let expeditions = []
        if(req.body.expeditions) {
            expeditions = JSON.parse(req.body.expeditions)
        }
        let iterinary = new db.Iterinary({
            fromStation : req.body.fromStationId,
            toStation : req.body.toStationId,
            leaveTime : new Date(req.body.leaveTime),
            arriveTime : new Date(req.body.arriveTime),
            bus : req.body.bus,
        })
        let result = await iterinary.save()
        for(let expedition of expeditions) {
            console.log("EXP",expedition)
            let exp = new db.IterinaryExpedition({
                iterinary : result.id,
                expedition : expedition.id,
                leaveTime : new Date(expedition.leaveTime),
                arriveTime : new Date(expedition.arriveTime),
            })
            let res = await exp.save()
            await db.Iterinary.findByIdAndUpdate(result.id, {
                $push : {
                    iterinaryExpeditions : res.id
                }
            })
            console.log("RES",res)
        }
        result = await db.Iterinary
        .findById(result.id)
        .populate('fromStation')
        .populate('toStation')
        .populate('iterinaryExpeditions')
        res.json(result)
    }
}