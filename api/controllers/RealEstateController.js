/**
 * RealEstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    requestAppraisal: function (req, res) {
        var name = req.param("name");
        var MortID = req.param("MortID");
        var MlsID = req.param("MlsID");

        RealEstate.create({
            fullName: name, 
            MlsID : MlsID,
            MortID : MortID
        })
            .exec(function (err) {
                if (err) {
                    var errCode = err.code;
                    if (errCode == "E_UNIQUE") {
                        res.send({ error: "MortID or MlsID already exist", status: "fail" });
                    }  else {
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
            });
    },


};

