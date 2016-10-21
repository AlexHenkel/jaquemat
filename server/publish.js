var _ = require('lodash');

////////////////////////
///  Tests
////////////////////////

Meteor.publish('testsInGroup', function (group) {
    return Tests.find({group: group});
});

Meteor.publish('singleTest', function (id) {
    return Tests.find(id);
});

Meteor.publish('currentTestsOfUser', function(id) {
    let periods = [], groups = [];

    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });

    Groups.find({period: {$in: periods}, students: id}).map(function (group) {
        groups.push(group._id);
    });

    return Tests.find({group: {$in: groups}});
});

////////////////////////
///  Periods
////////////////////////

Meteor.publish('periods', function () {
    return Periods.find();
});

Meteor.publish('periodOfUser', function (id) {
    let period = Meteor.users.findOne(id).extendedProfile.period;
    return Periods.find(period);
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

Meteor.publish('currentGroupsOfUser', function(id) {
    let periods = [];
    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });
    if (Roles.userIsInRole(id, 'student')) {
        return Groups.find({period: {$in: periods}, students: id});
    }
    else if (Roles.userIsInRole(id, 'instructor')) {
        return Groups.find({period: {$in: periods}, instructors: id});
    }
});

Meteor.publish('currentGradesOfUser', function(id) {
    let periods = [], groups = [], tests = [];

    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });

    Groups.find({period: {$in: periods}, students: id}).map(function (group) {
        groups.push(group._id);
    });

    Tests.find({group: {$in: groups}}).map(function (test) {
        tests.push(test._id);
    });

    return Grades.find({test: {$in: tests}, student: id});
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

Meteor.publish('currentForumsOfUser', function(id) {
    let periods = [], groups = [];
    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });
    if (Roles.userIsInRole(id, 'student')) {
        Groups.find({period: {$in: periods}, students: id}).map(function (group) {
            groups.push(group._id);
        });
    } else if (Roles.userIsInRole(id, 'student')) {
        Groups.find({period: {$in: periods}, instructors: id}).map(function (group) {
            groups.push(group._id);
        });
    }

    return Forums.find({groups: {$in: groups}});
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

Meteor.publish('schoolOfUser', function (id) {
    let school = Meteor.users.findOne(id).extendedProfile.school;
    return Schools.find(school);
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

Meteor.publish('currentAttendancesOfUser', function(id) {
    let periods = [], groups = [];

    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });

    Groups.find({period: {$in: periods}, students: id}).map(function (group) {
        groups.push(group._id);
    });

    return Attendances.find({group: {$in: groups}, students: id});
});

////////////////////////
///  Users
////////////////////////

Meteor.publish('user', function (id) {
    return Meteor.users.find({_id: id},
        {fields: {services: 1, extendedProfile: 1, roles: 1}});
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
    return Meteor.users.find({_id: {$in: Groups.findOne(id).students}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('instructorsInGroup', function (id) {
    return Meteor.users.find({_id: {$in: Groups.findOne(id).instructors}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
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
    Groups.find({_id: { $in: Forums.findOne(forumId).groups}}).map(function (group) {
        users = _.concat(users, group.instructors);
        users = _.concat(users, group.students);
    });
    return Meteor.users.find({_id: {$in: users}},
        {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('currentUsersForInstructor', function () {
    let periods = [], users = [];

    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });

    Groups.find({period: {$in: periods}, instructors: this.userId}).map(function (group) {
        users = _.concat(users, group.students);
    });

    return Meteor.users.find({_id: {$in: users}}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});

Meteor.publish('currentUsersForPrincipal', function () {
    let user = Meteor.users.findOne(this.userId);
    let periods = [];

    Periods.find({status: 'current'}).map(function (period) {
        periods.push(period._id);
    });

    return Meteor.users.find({"extendedProfile.period": {$in: periods}, 
                                "extendedProfile.school": user.extendedProfile.school,
                                roles: 'student'}, {fields: {services: 1, extendedProfile: 1, roles: 1}});
});



