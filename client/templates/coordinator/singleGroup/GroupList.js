Template.GroupList.helpers({
	countAttendanceStudents: function () {
		return Attendances.find({students: this._id}).count();
	},
	countAttendanceInstructors: function () {
		return Attendances.find({instructors: this._id}).count();
	},
	getGrade: function(testId, studentId) {
		return Grades.findOne({test: testId, student: studentId}).grade;
	}
});