/**
 * MbrServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Logger = require('../../assets/custom/LoggerService');

module.exports = {
    
    mbrAddUser: function (req, res) {

        Logger("call: mbrAddUser", "MbrServiceController.mbrAddUser");

        var name = req.param("name");
        var email = req.param("email");
        var password = req.param("password");
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
                        // Logger("User with email " + email + " already exist", "MbrServiceController.mbrAddUser");
                        res.send({ error: "User already exist", status: "fail" });
                    }  else {
                        // Logger(message, "MbrServiceController.mbrAddUser");
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
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
                        if (password == user.Password) {
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

        Logger("call: mbrStatus", "MbrServiceController.mbrStatus");

        var email = req.param("email");

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MbrServiceController.mbrStatus");
                    res.send(err);
                } else {
                    res.send(user)
                }
            })
    },

    confirmEmploymentStatus: function (req, res) {

        Logger("call: confirmEmploymentStatus", "MbrServiceController.confirmEmploymentStatus");

        var name = req.param("name");
        var email = req.param("email");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var id = req.param("id");

        MbrUser.findOne({ id: id })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MbrServiceController.confirmEmploymentStatus");
                    res.send(err);
                } else {
                    if (!user) {
                        Logger("Invalid id", "MbrServiceController.confirmEmploymentStatus");
                        return res.send({ status: "fail", error: "Invalid id" })
                    }
                    if (name == user.Name && email == user.Email && tenure == user.Tenure && salary == user.Salary) {
                        MbrUser.update({ id: id }).set({
                            Status: "Application Accepted"
                        }).exec(function (err) {
                            if (err) {
                                Logger(err, "MbrServiceController.confirmEmploymentStatus");
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

        Logger("call: mbrConfirmInsuranceAvailability", "MbrServiceController.mbrConfirmInsuranceAvailability");

        var mortId = req.param("MortId");
        var mlsID = req.param("MlsID");
        var isInsurable = req.param("isInsurable");
        var insuredValue = req.param("insuredValue");
        var deductable = req.param("deductable");
        var applicantName = req.param("applicantName");

        MbrUser.findOne({ id: mortId })
            .exec(function (err, user) {
                if (err) {
                    Logger(err, "MbrServiceController.mbrConfirmInsuranceAvailability");
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
                                Logger(err, "MbrServiceController.mbrConfirmInsuranceAvailability");
                                res.send(err);
                            }
                        })
                    } else {
                        MbrUser.update({ id: mortId }).set({
                            IsInsurable: false
                        }).exec(function (err) {
                            if (err) {
                                Logger(err, "MbrServiceController.mbrConfirmInsuranceAvailability");
                                res.send(err);
                            }
                        })
                    }
                    res.send({ status: "success" })
                }
            })
    }
};

