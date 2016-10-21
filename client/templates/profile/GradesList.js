Template.GradesList.onCreated(function(){
	var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
        self.subscribe('currentGroupsOfUser', id);
        self.subscribe('currentAttendancesOfUser', id);
        self.subscribe('currentTestsOfUser', id);
        self.subscribe('currentGradesOfUser', id);
    });
});

Template.GradesList.helpers({
	countAttendanceStudents: function (groupId) {
		return Attendances.find({group: groupId}).count();
	},
	getGrade: function(testId) {
		return Grades.findOne({test: this._id}).grade;
	},
	testsOfGroup: function(groupId) {
		return Tests.find({group: groupId});
	}
});