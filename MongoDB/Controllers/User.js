const User = require('../Models/User');

const saveUser = async (user) => {
    let newUser = new User(user);
    newUser = await newUser.save();
    return newUser.toObject();
}

const findUserById = async (id) => {
    const resp = await User.findOne({_id: id}).exec();
    if (resp) {
        return resp.toObject();
    }
}

const findUserByIdAndSystemId = async (id, systemId) => {
    const resp = await User.findOne({_id: id, systemId: systemId}).exec();
    if (resp) {
        return resp.toObject();
    }
}

const updateUserJwtToken = async (_id, jwtToken) => {
    await User.updateOne({_id: _id}, {jwtToken: jwtToken});
}

const updateUserCode = async (_id, code) => {
    await User.updateOne({_id: _id}, {code: code});
}

const updateUserAccessTokenRefreshTokenExpiresIn = async (userId, accessToken, refreshToken, expiresIn) => {
    return User.updateOne({_id: userId}, {accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn, tokenInsertDate: new Date()});
}

module.exports = {
    findUserById, updateUserCode, saveUser, updateUserAccessTokenRefreshTokenExpiresIn, updateUserJwtToken, findUserByIdAndSystemId
}