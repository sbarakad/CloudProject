
module.exports = function(log, server) {
    var timestamp = new Date().getTime();
    Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
        if(err){
            return res.status(500).send({error:'Logging Error'});
        }
        // return res.status(500).send({ error: req_err });
    });
}