var _ = require('lodash');

Template.registerHelper('isInRole', (role) => {
	return Roles.userIsInRole(Meteor.userId(), role);
});

Template.registerHelper('instructorRole', () => {
	return ["coordinator", "instructor"];
});

Template.registerHelper('studentRole', () => {
	return ["coordinator", "student"];
});

Template.registerHelper('notCoordinatorRoles', () => {
	return ["instructor", "student", "principal"];
});

Template.registerHelper('currentUserInRole', (role) => {
	let id = FlowRouter.getParam("id");
	return Roles.userIsInRole(id, role);
});

Template.registerHelper('authorizedToEditProfile', () => {
	let id = FlowRouter.getParam("id");
	return Meteor.userId() === id || Roles.userIsInRole(Meteor.userId(), 'coordinator');
});

Template.registerHelper('instructorStudentRole', () => {
	return ["coordinator", "instructor", "student"];
});

Template.registerHelper('principalRole', () => {
	return ["coordinator", "principal"];
});

Template.registerHelper('allRoles', () => {
	return ["coordinator", "instructor", "student", "principal"];
});

Template.registerHelper('humanDate', (date) => {
	return moment(date).calendar();
});

Template.registerHelper('calendarDate', (date) => {
	return moment(date).format("DD/MM/YYYY");
});

Template.registerHelper('prettyStatus', (status) => {
	let statusList = {
		student: "Beneficiario",
		coordinator: "Coordinador",
		instructor: "Instructor",
		principal: "Director"
	}
	return statusList[status];
});

Template.registerHelper('inArray', (item, array) => {
	return _.indexOf(array, item) + 1;
});

Template.registerHelper('periodName', (id) => {
	return Periods.findOne(id).name; // Get periods
});

Template.registerHelper('groupName', (id) => {
	let group = Groups.findOne(id);
	if (group) {
		return group.name;
	}
});

Template.registerHelper('currentPeriods', (id) => {
	return Periods.find({status: 'current'}, {sort: {start_date: -1}}); // Get current periods
});

Template.registerHelper('futurePeriods', (id) => {
	return Periods.find({status: 'pending'}, {sort: {start_date: -1}}); // Get pending periods
});

//////////////////////////////////
///  STATICS
//////////////////////////////////

//////////////////////////////////
///  SINGLE ELEMENTS
/////////////////////////////////

//// USERS
Template.registerHelper('editUser', () => {
	let id = FlowRouter.getParam("id");
	return Meteor.users.findOne(id);
});

Template.registerHelper('selfUser', () => {
	return Meteor.users.findOne(Meteor.userId()); // Get self user
});

//////////

Template.registerHelper('attendance', () => {
	return Attendances.findOne(); // Get group
});

Template.registerHelper('group', () => {
	return Groups.findOne(); // Get group
});

Template.registerHelper('forum', () => {
	return Forums.findOne(); // Get forum
});

Template.registerHelper('grade', () => {
	return Grades.findOne(); // Get grade
});

Template.registerHelper('period', () => {
	return Periods.findOne(); // Get period
});

Template.registerHelper('test', () => {
	return Tests.findOne(); // Get test
});

Template.registerHelper('school', () => {
	return School.findOne(); // Get school
});

//////////////////////////////////
///  ALL ELEMENTS
/////////////////////////////////

Template.registerHelper('attendances', () => {
	return Attendances.find(); // Get group
});

Template.registerHelper('users', () => {
	return Meteor.users.find(); // Get users
});

Template.registerHelper('students', () => {
	return Meteor.users.find({roles: 'student'}); // Get students
});

Template.registerHelper('instructors', () => {
	return Meteor.users.find({roles: 'instructor'}); // Get instructor
});

Template.registerHelper('groups', () => {
	return Groups.find(); // Get groups
});

Template.registerHelper('forums', () => {
	return Forums.find(); // Get forums
});

Template.registerHelper('grades', () => {
	return Grades.find(); // Get grades
});

Template.registerHelper('messages', () => {
	return Messages.find({}, {sort: {created_at: -1}}); // Get messages
});

Template.registerHelper('periods', () => {
	return Periods.find({}, {sort: {start_date: -1}}); // Get periods
});

Template.registerHelper('tests', () => {
	return Tests.find(); // Get tests
});

Template.registerHelper('schools', () => {
	return Schools.find(); // Get schools
});