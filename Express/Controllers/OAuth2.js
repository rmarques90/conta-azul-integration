const {getUserById} = require("./User");
const {updateUserCode} = require("../../MongoDB/Controllers/User");

const saveUserTokenAfterApproval = async (id, code) => {
    try {
        let user = await getUserById(id);
        if (user) {
            await updateUserCode(user._id, code);
        }
        return true;
    } catch (e) {
        console.error('Error updating user code')
    }
}

module.exports = {
    saveUserTokenAfterApproval
}