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
        result.budget = profile.budget.map(budget => ({
            ...budget,
            completed: intToBoolean(budget.completed)
        }));
    }
    return result;
}

function budgetToBody(budget) {
    return {
        ...budget,
        completed: intToBoolean(budget.completed),
    };
}