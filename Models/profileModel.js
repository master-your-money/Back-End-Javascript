const db = require('../Data/dbConfig.js');
const helpers = require('../Models/helpers');

module.exports = {
    getProfiles,
    addProfile,
    updateProfile,
    delProfile,
    ProfilesWithBudgets,
};

function getProfiles(id) {
    let query = db('profiles');
    if(id) {
        query.where('profiles', id).first();

        const promises = [query, this.ProfilesWithBudgets(id)];

        return Promise.all(promises).then(function(results) {
            let [profile, budget] = results;

            if(profile) {
                profile.budget = budget;

                return helpers.profileToBody(profile);
            } else {
                return null;
            }
        });
    }

    return query.then(profiles => {
        return profiles.map(profile => helpers.profileToBody(profile));
    });

}

function addProfile(profile) {
    return db('profiles')
        .insert(profile)
        .then(([id]) => this.getProfiles(id));
}

function updateProfile(id, refresh) {
    return db('profiles')
        .where('id', id)
        .update(refresh)
        .then(i => (i > 0 ? this.getProfiles(id): null));

}

function delProfile(id) {
    return db('projects')
        .where('id', id)
        .del();
}

function ProfilesWithBudgets(profileID) {
    return db('budget')
        .where('profile_id', profileID)
        .then(bu => bu.map(budget => helpers.budgetToBody(budget)));

}