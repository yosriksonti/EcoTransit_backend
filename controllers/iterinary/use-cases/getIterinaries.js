module.exports = function makeGetIterinaries(db, errors, utils) {
    return async function getIterinaries(req, res) {

            let stations = await db.Station.find()
            let fromStations = stations.filter((station) => {
                return utils.calculateDistance(station.lan, station.lat, req.query.fromLan, req.query.fromLat) < 1  
            })
            let toStations = stations.filter((station) => {
                return utils.calculateDistance(station.lan, station.lat, req.query.toLan, req.query.toLat) < 1
            })
            console.log("FROM",fromStations)
            console.log("TO",toStations)
            let result = await db.Iterinary.find({})
            .populate({
                path: 'iterinaryExpeditions',
                populate: {
                    path: 'expedition'
                }
            })
            .populate('fromStation')
            .populate('toStation')
            let found = []
            fromStations.map((fromStation) => {
                toStations.map((toStation) => {
                    let matches = result.filter((iterinary) => {
                        let matchesFrom = iterinary.iterinaryExpeditions.filter((iterinaryExpeditionFrom,indexFrom) =>
                            {
                                if(iterinaryExpeditionFrom.expedition.fromStation == fromStation.id ) {
                                    let matchesTo = []
                                    for(let indexTo = indexFrom; indexTo < iterinary.iterinaryExpeditions.length; indexTo++ ) {
                                        let iterinaryExpeditionTo = iterinary.iterinaryExpeditions[indexTo];
                                        if (
                                            iterinaryExpeditionTo.expedition.toStation == toStation.id && indexFrom <= indexTo
                                        ) {
                                            matchesTo.push(iterinaryExpeditionTo)
                                        }
                                    }
                                    return matchesTo.length > 0
                                }
                            }
                        )
                        console.log("MATCH",matchesFrom)
                        
                        return matchesFrom.length > 0
                    });
                    found = [...found, ...matches]
                })
            
            })
            res.json(found);
    };
};
