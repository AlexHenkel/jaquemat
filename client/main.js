Template.registerHelper('isInRole', (role) => {
	return Roles.userIsInRole(Meteor.userId(), role);
});

Template.registerHelper('instructorRole', () => {
	return ["coordinator", "instructor"];
});

Template.registerHelper('allRoles', () => {
	return ["coordinator", "instructor", "student", "principal"];
});

Template.registerHelper('humanDate', (date) => {
	return moment(date).calendar();
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

Template.registerHelper('periodName', (id) => {
	return Periods.findOne(id).name; // Get periods
});

Template.registerHelper('groupName', (id) => {
	let group = Groups.findOne(id);
	if (group) {
		return group.name;
	}
});

//////////////////////////////////
///  ALL ELEMENTS
/////////////////////////////////

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
	return Periods.find(); // Get periods
});

Template.registerHelper('tests', () => {
	return Tests.find(); // Get tests
});

Template.registerHelper('schools', () => {
	return Schools.find(); // Get schools
});