const {updateJwtToken} = require("../../MongoDB/Controllers/Admin");
const {generateAdminToken} = require("../../Utils/jwt");
const {getAdminByLoginAndPassword} = require("../../MongoDB/Controllers/Admin");

/**
 * Check if the login exists in database and return the user
 * @param {String} login
 * @param {String} password
 * @returns {String}
 */
const doLoginAdmin = async (login, password) => {
    if (!login || !password) {
        console.debug('login or password are invalid...');
        return null;
    }
    let admin = await getAdminByLoginAndPassword(login, password);
    if (admin && !admin.jwtToken) {
        let tokenGenerated = await generateAdminToken(admin);
        await updateJwtToken(admin._id, tokenGenerated);
        admin.jwtToken = tokenGenerated;
    }
    return admin.jwtToken;
}

module.exports = {
    doLoginAdmin
}