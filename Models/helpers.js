module.exports = {
    intToBoolean,
    booleanToint,
    profileToBody,
    budgetToBody
};

function intToBoolean(int) {
    return int === 1 ? true : false;
}

function booleanToint(bool) {
    return bool === true ? 1 : 0;
}

function profileToBody(profile) {
    const result = {
        ...profile,
        completed: intToBoolean(profile.completed),
    };

    if (profile.budget) {
        result.budget = profile.budget.map(bu => ({
            ...bu,
            completed: intToBoolean(bu.completed)
        }));
    }
    return result;
}

function budgetToBody(bu) {
    return {
        ...bu,
        completed: intToBoolean(bu.completed),
    };
}