/**
 * MbrServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Logger = require('../../assets/custom/LoggerService');
var crypto = require('crypto');
var assert = require('assert');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'cloudComputing';

module.exports = {

    mbrAddUser: function (req, res) {

        Logger("call: mbrAddUser", "MbrServiceController.mbrAddUser");

        var name = req.param("name");
        var email = req.param("email");
        var password = req.param("password");

        var cipher = crypto.createCipher(algorithm, key);  
        var password = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
        var address = req.param("address");
        var phoneNumber = req.param("phoneNumber");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var mortgageValue = req.param("mortgageValue");
        var mlsID = req.param("mlsID"); // property ID

        MbrUser.create({
            Name: name,
            Email: email,
            Password: password,
            Address: address,
            Phone_Number: phoneNumber,
            Tenure: tenure,
            Salary: salary,
            Status: "Waiting for employee response",
            MortgageValue: mortgageValue,
            MlsID: mlsID
        })
            .exec(function (err) {
                if (err) {
                    var errCode = err.code;
                    if (errCode == "E_UNIQUE") {
                        var log = "Error in Creating user";
                        var timestamp = new Date().getTime();
                        var server = "MBR";
                        Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                            if(err){
                                return res.status(500).send({error:'Logging Error'});
                            }
                            return res.status(500).send({ error: req_err });
                        });
                        res.send({ error: "User already exist", status: "fail" });
                    }  else {
                        // Logger(message, "MbrServiceController.mbrAddUser");
                        res.send({ error: err, status: "fail" });
                        var log = "Error in Creating user in else case";
                        var timestamp = new Date().getTime();
                        var server = "MBR";
                        Logger.create({time:timestamp,log:log,server:server}).exec(function(err){
                            if(err){
                                return res.status(500).send({error:'Logging Error'});
                            }
                            return res.status(500).send({ error: req_err });
                        });
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
            });
    },
    // SHOW DATABASE OF MBR.
    getMBRDB:function(req,res){
      MbrUser.find({}).exec(function(err,rec){

        if(err){
            res.send(500,{error:'Database Error'});
        }
      res.view('pages/mbr/listMBR',{recList:rec})
      });
    },

    mbrLogin: function (req, res) {

        Logger("call: mbrLogin", "MbrServiceController.mbrLogin");

        var email = req.param("email");
        var password = req.param("password");



        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MbrServiceController.mbrLogin");
                    res.send(err);
                } else {
                    if (!user) {
                        Logger("Email is not registered", "MbrServiceController.mbrLogin");
                        res.send({ status: "unauthentic", error: "Email is not registered" })
                    } else {
                        console.log(user.Password);
                        var decipher = crypto.createDecipher(algorithm, key);
                        var decrypted = decipher.update(user.Password, 'hex', 'utf8') + decipher.final('utf8');
                        // console.log(decrypted)

                        if (password == decrypted) {
                            res.send({ status: "authentic" })
                        } else {
                            Logger("Email-Password combination does not exist", "MbrServiceController.mbrLogin");
                            res.send({ status: "unauthentic", error: "Email-Password combination does not exist" })
                        }
                    }
                }

            })
    },

    mbrStatus: function (req, res) {

        Logger("call: mbrStatus", "MBR");

        var email = req.param("email");

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MBR");
                    res.send(err);
                } else {
                    res.send(user)
                }
            })
    },

    confirmEmploymentStatus: function (req, res) {

        Logger("call: confirmEmploymentStatus", "MBR");

        var name = req.param("name");
        var email = req.param("email");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var id = req.param("id");

        MbrUser.findOne({ id: id })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MBR");
                    res.send(err);
                } else {
                    if (!user) {
                        Logger("Invalid id", "MBR");
                        return res.send({ status: "fail", error: "Invalid id" })
                    }
                    if (name == user.Name && email == user.Email && tenure == user.Tenure && salary == user.Salary) {
                        MbrUser.update({ id: id }).set({
                            Status: "Application Accepted"
                        }).exec(function (err) {
                            if (err) {
                                Logger(err, "MBR");
                                res.send(err);
                            }
                        })
                    } else {
                        MbrUser.update({ id: id }).set({
                            Status: "Employee detail did not match, send again"
                        }).exec(function (err) {
                            if (err) {
                                res.send(err);
                            }
                        })
                    }
                    res.send({ status: "success" })
                }
            })
    },

    mbrConfirmInsuranceAvailability: function(req, res) {

        Logger("call: mbrConfirmInsuranceAvailability", "MBR");

        var mortId = req.param("MortId");
        var mlsID = req.param("MlsID");
        var isInsurable = req.param("isInsurable");
        var insuredValue = req.param("insuredValue");
        var deductable = req.param("deductable");
        var applicantName = req.param("applicantName");

        MbrUser.findOne({ id: mortId })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MBR");
                    res.send(err);
                } else {
                    if (!user || user.MlsID != mlsID || user.Name != applicantName) {
                        return res.send({ status: "fail", error: "Invalid mortgage ID, or property ID MlsID, or user name." })
                    }
                    if (isInsurable) {
                        MbrUser.update({ id: mortId }).set({
                            IsInsurable: true,
                            InsuredValue: insuredValue,
                            Deductable: deductable
                        }).exec(function (err) {
                            if (err) {
                                Logger(err, "MBR");
                                res.send(err);
                            }
                        })
                    } else {
                        MbrUser.update({ id: mortId }).set({
                            IsInsurable: false
                        }).exec(function (err) {
                            if (err) {
                                Logger(err, "MBR");
                                res.send(err);
                            }
                        })
                    }
                    res.send({ status: "success" })
                }
            })
    }
};

