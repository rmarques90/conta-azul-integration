const systemWithoutFields = () => {
    return {
        name: true,
        token: true,
        url: true,
        clientId: true,
        clientSecret: true,
        callbackUrl: true,
        redirectUrlAfterAuth: true
    }
}

const systemWithoutClientInfo = () => {
    return {
        _id: true,
        name: true,
        token: true,
        url: true
    }
}

const systemWithFieldsFromSection = (section) => {
    return {
        name: true,
        fieldBinds: {
            [section]: true
        }
    }
}

module.exports = {
    systemWithoutFields, systemWithFieldsFromSection, systemWithoutClientInfo
}