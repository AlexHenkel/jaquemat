////////////////////////
///  Tests
////////////////////////

Meteor.publish('testsInGroup', function (group) {
    return Tests.find({group: group});
});

Meteor.publish('singleTest', function (id) {
    return Tests.find(id);
});

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
///  Grades
////////////////////////

Meteor.publish('gradesInTest', function (testId) {
    return Grades.find({test: testId});
});

Meteor.publish('gradesInGroup', function (group) {
    let tests = [];
    Tests.find({group: group}).map(function (test) {
        tests.push(test._id);
    });
    return Grades.find({test: {$in: tests}});
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

Meteor.publish('currentForums', function () {
    let periodsArr = Periods.find({status: { $in: ['current', 'pending']}}).map(function (period) {
        return period._id;
    });
    return Forums.find({period: {$in: periodsArr}});
});

Meteor.publish('forumsInGroup', function (group) {
    return Forums.find({groups: group});
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
///  Attendances
////////////////////////

Meteor.publish('attendancesInGroup', function (group) {
    return Attendances.find({group: group});
});

Meteor.publish('singleAttendance', function (id) {
    return Attendances.find(id);
});

////////////////////////
///  Users
////////////////////////

Meteor.publish('user', function (id) {
    return Meteor.users.find({_id: id},
        {fields: {services: 1, extendedProfile: 1}});
});

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
    let group = Groups.findOne(id);
    let userArray = [];
    if(group.students) {
        userArray = _.concat(userArray, group.students);
    }
    return Meteor.users.find({_id: {$in: userArray}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('instructorsInGroup', function (id) {
    let group = Groups.findOne(id);
    let userArray = [];
    if(group.instructors) {
        userArray = _.concat(userArray, group.instructors);
    }
    return Meteor.users.find({_id: {$in: userArray}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('students', function() {
    return Meteor.users.find({roles: "student"});
});

Meteor.publish('instructors', function() {
    return Meteor.users.find({roles: "instructor"});
});

Meteor.publish('studentsInPeriod', function(period) {
    return Meteor.users.find({ $and: [{roles: "student"}, {"extendedProfile.period": period}]});
});

Meteor.publish('instructorsInPeriod', function(period) {
    return Meteor.users.find({ $and: [{roles: "instructor"}, {"extendedProfile.period": period}]});
});

Meteor.publish('studentsInGroupOfAttendance', function(attendanceId) {
    let groupId = Attendances.findOne(attendanceId).group;
    let studentsArr = Groups.findOne(groupId).students; 
    return Meteor.users.find({ _id: {$in: studentsArr }});
});

Meteor.publish('instructorsInGroupOfAttendance', function(attendanceId) {
    let groupId = Attendances.findOne(attendanceId).group;
    let instructorsArr = Groups.findOne(groupId).instructors; 
    return Meteor.users.find({_id :{ $in: instructorsArr }});
});

Meteor.publish('studentsInGroupOfTest', function(testId) {
    let groupId = Tests.findOne(testId).group;
    let studentsArr = Groups.findOne(groupId).students; 
    return Meteor.users.find({ _id: {$in: studentsArr }});
});

Meteor.publish('usersInForum', function (forumId) {
    let users = [];
    // Add all coordinators
    Meteor.users.find({roles: "coordinator"}).map(function (user) {
        users.push(user._id);
    });
    // Add instructors in forum
    let groups = Forums.findOne(forumId).groups;
    Groups.find({_id: { $in: groups}}).map(function (group) {
        if (group.instructors) {
            users = _.concat(users, group.instructors);
        }
        if (group.students) {
            users = _.concat(users, group.students);
        }
    });
    return Meteor.users.find({_id: {$in: users}},
        {fields: {services: 1, extendedProfile: 1, roles: 1}});
});



