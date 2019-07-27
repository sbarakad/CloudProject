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
                        res.send({ error: "MortID already exist", status: "fail" });
                    }  else {
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
            });
    },
    // SHOW DATABASE OF COMPANY.
    getREDB:function(req,res){
      RealEstate.find({}).exec(function(err,rec){
        if(err){
            res.send(500,{error:'Database Error'});
        }
       res.view('pages/realEstate/listRE',{recList:rec})
      });
    },

    fetchAppraisals: function (req, res) {

        RealEstate.find({})
            .exec(function (err,Appraisals) {
                if (err) {
                    return res.send({error:err});
                } else {
                    res.send(Appraisals);
                }
            });
    },


    appraiserSignUp: function (req, res) {
        var email = req.param("email");
        var password = req.param("password");

        Appraiser.create({
            email : email,
            password : password
        })
            .exec(function (err) {
                if (err) {
                    var errCode = err.code;
                    if (errCode == "E_UNIQUE") {
                        res.send({ error: "Email already exist", status: "fail" });
                    }  else {
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
            });
    },


    appraiserLogin: function (req, res) {
        var email = req.param("email");
        var password = req.param("password");

        Appraiser.findOne({ email: email })
            .exec(function (err, appraiser) {
                if (err) {
                    res.send(err);
                } else {
                    if (!appraiser) {
                        res.send({ status: "unauthentic", error: "Appraiser is not registered" })
                    } else {
                        if (password == appraiser.password) {
                            res.send({ status: "authentic" })
                        } else {
                            res.send({ status: "unauthentic", error: "Email-Password combination does not exist" })
                        }
                    }
                }
            })
    },

    

};

