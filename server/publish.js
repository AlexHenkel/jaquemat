////////////////////////
///  Periods
////////////////////////

Meteor.publish('periods', function () {
    return Periods.find();
});

Meteor.publish('currentPeriods', function () {
    return Periods.find({status: { $in: ['current', 'pending']}});
});

////////////////////////
///  Groups
////////////////////////

Meteor.publish('groups', function () {
    return Groups.find();
});

Meteor.publish('currentGroups', function () {
    let periodsArr = Periods.find({status: { $in: ['current', 'pending']}}).map(function (period) {
        return period._id;
    });
    return Groups.find({period: {$in: periodsArr}});
});

Meteor.publish('groupsInForum', function (id) {
	let forumGroups = Forums.findOne(id).groups;
    return Groups.find({_id: {$in: forumGroups}});
});

Meteor.publish('singleGroup', function (id) {
    return Groups.find(id);
});

////////////////////////
///  Forums
////////////////////////

Meteor.publish('forums', function () {
    return Forums.find();
});

Meteor.publish('singleForum', function (id) {
    return Forums.find(id);
});

////////////////////////
///  Messages
////////////////////////
Meteor.publish('messagesInForum', function (id) {
    return Messages.find({owner: id});
});

////////////////////////
///  Schools
////////////////////////

Meteor.publish('schools', function () {
    return Schools.find();
});

////////////////////////
///  Users
////////////////////////

Meteor.publish('selfUser', function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {services: 1, extendedProfile: 1}});
});

Meteor.publish('usersData', function () {
    return Meteor.users.find({}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('approvedUsersData', function () {
    return Meteor.users.find({ extendedProfile: { $exists: true, $ne: null } }, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('studentsInGroup', function (id) {
    let userArray = Groups.findOne(id).students;
    if(userArray) {
        return Meteor.users.find({_id: {$in: userArray}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
    }
});

Meteor.publish('instructorsInGroup', function (id) {
    let userArray = Groups.findOne(id).instructors;
    if (userArray) {
        return Meteor.users.find({_id: {$in: userArray}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
    }
});