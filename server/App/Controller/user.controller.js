const asyncHandler = require('../Middlewares/aync');
const User = require("../Models/User.Model");
const errorResponse = require('../Utils/errorResponse');

module.exports.getUser = asyncHandler(
    (req, res, next) => {
        let userId;
        if (req.params.id) {
            userId = req.params.id;
            User.findById(userId, function(err, model) {
                if (err || !model)
                    return next(new errorResponse(`Users id ${userId}  is not available at the moment`, 400));
                res.status(200).json({
                    sucess: true,
                    data: model,
                    msg: `Show User ${model}`,
                });
            })
        } else {
            return next(new errorResponse(`Users id can't be empty`, 400));
        }
    }
)


module.exports.createUser = asyncHandler(
    (req, res, next) => {
        User.create(req.body, function(err, model) {

            if (err || !model)
                return next(new errorResponse(`Not able to create User ${req.body.username}`, 400));
            res.status(200).json({
                sucess: true,
                data: model,
                msg: `User ${model.username} created Sucessfully`,
            });
        });
    }
)

module.exports.getUsers = asyncHandler(
    (req, res, next) => {
        User.find({}, function(err, users) {
            var userMap = {};
            if (!users || err)
                return next(new errorResponse(`Not able to fetch Users`, 400));
            users.forEach(function(user) {
                userMap[user._id] = user;
            });
            res.status(200).json({
                sucess: true,
                data: userMap,
                msg: `All Users added`,
            });
        });
    }
)



module.exports.updateUser = asyncHandler(
    (req, res, next) => {
        let userId;
        if (req.params.id) {
            userId = req.params.id;
            User.findByIdAndUpdate(userId, req.body, {
                new: true,
                runValidators: true,
            }, function(err, model) {
                if (err || !model)
                    return next(new errorResponse(`Not able to update User ${userId}`, 400));
                res.status(200).json({
                    sucess: true,
                    data: model,
                    msg: `User ${model.username}`,
                });
            });
        } else {
            return next(new errorResponse(`Users id can't be empty`, 400));
        }
    });

module.exports.DeleteUser = asyncHandler(
    (req, res, next) => {
        let userId;
        if (req.params.id) {
            userId = req.params.id;
            User.findById(req.params.id, function(err, model) {
                if (err || !model)
                    return next(new errorResponse(`Not able to delete User ${req.params.id}`, 400));
                model.remove();
                res.status(200).json({
                    sucess: false,
                    data: model,
                    msg: `User ${model.username} deleted`,
                });
            });
        } else {
            return next(new errorResponse(`Users id can't be empty`, 400));
        }
    });