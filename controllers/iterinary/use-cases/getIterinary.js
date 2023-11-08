module.exports = function makeGetIterinay(db, E, utils) {
    return async function getIterinary(req, res) {
        let iterinary = await db.Iterinary
        .findById(req.params.id)
        .populate('fromStation')
        .populate('toStation')
        .populate({
            path: 'iterinaryExpeditions',
            populate: {
                path: 'expedition',
                populate : [
                    {
                        path: 'fromStation'
                    },
                    {
                        path: 'toStation'
                    }
                ]
            }
        });

        let fromStation = iterinary.fromStation
        iterinary.iterinaryExpeditions.map((iterinary) => {
            if(utils.calculateDistance(iterinary.expedition.fromStation.lan, iterinary.expedition.fromStation.lat, req.query.fromLan, req.query.fromLat) 
            <  utils.calculateDistance(fromStation.lan, fromStation.lat, req.query.fromLan, req.query.fromLat) ) {
                fromStation = iterinary.expedition.fromStation
            }
        })

        let toStation = iterinary.toStation
        iterinary.iterinaryExpeditions.map((iterinary) => {
            if(utils.calculateDistance(iterinary.expedition.toStation.lan, iterinary.expedition.toStation.lat, req.query.toLan, req.query.toLat) 
            <  utils.calculateDistance(toStation.lan, toStation.lat, req.query.toLan, req.query.toLat) ) {
                toStation = iterinary.expedition.toStation
            }
        })
        res.json({iterinary,fromStation,toStation})
    }
}