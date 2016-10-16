Template.registerHelper('isInRole', (role) => {
	return Roles.userIsInRole(Meteor.userId(), role);
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
	return Periods.find(); // Get periods
});

Template.registerHelper('tests', () => {
	return Tests.find(); // Get tests
});

Template.registerHelper('schools', () => {
	return Schools.find(); // Get schools
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
	return School.find(); // Get school
});

Template.registerHelper('periodName', (id) => {
	return Periods.findOne(id).name; // Get periods
});

Template.registerHelper('groupName', (id) => {
	return Groups.findOne(id).name; // Get periods
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