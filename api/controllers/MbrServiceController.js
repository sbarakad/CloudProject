/**
 * MbrServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    mbrAddUser: function (req, res) {
        var name = req.param("name");
        var email = req.param("email");
        var password = req.param("password");
        var address = req.param("address");
        var phoneNumber = req.param("phoneNumber");
        var tenure = req.param("tenure");
        var salary = req.param("salary");

        // res.locals.layout = 'layouts/mbr/layout.ejs';

        MbrUser.create({
            Name: name, Email: email,
            Password: password,
            Address: address,
            Phone_Number: phoneNumber,
            Tenure: tenure,
            Salary: salary,
            Status: "Waiting for employee response"
        })
            .exec(function (err) {
                if (err) {
                    var errCode = err.code;
                    if (errCode == "E_UNIQUE") {
                        res.send({ error: "User already exist", status: "fail" });
                    }  else {
                        res.send({ error: message, status: "fail" });
                    }
                } else {
                    res.send({ status: "Success" });
                }
            });
    },

    mbrLogin: function (req, res) {
        var email = req.param("email");
        var password = req.param("password");

        // res.locals.layout = 'layouts/mbr/layout.ejs';

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    if (!user) {
                        res.send({ status: "unauthentic", error: "Email is not registered" })
                    } else {
                        if (password == user.Password) {
                            res.send({ status: "authentic" })
                        } else {
                            res.send({ status: "unauthentic", error: "Email-Password combination does not exist" })
                        }
                    }
                }

            })
    },

    mbrStatus: function (req, res) {
        var email = req.param("email");

        // res.locals.layout = 'layouts/mbr/layout.ejs';

        MbrUser.findOne({ Email: email })
            .exec(function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(user)
                }
            })
    },

    mbrVerify: function (req, res) {
        var name = req.param("name");
        var email = req.param("email");
        var tenure = req.param("tenure");
        var salary = req.param("salary");
        var id = req.param("id");

        // res.locals.layout = 'layouts/mbr/layout.ejs';

        MbrUser.findOne({ id: id })
            .exec(function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    if (!user) {
                        return res.send({ status: "fail", error: "Invalid id" })
                    }
                    if (name == user.Name && email == user.Email && tenure == user.Tenure && salary == user.Salary) {
                        MbrUser.update({ id: id }).set({
                            Status: "Application Accepted"
                        }).exec(function (err) {
                            if (err) {
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
    }
};

