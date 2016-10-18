Template.GroupList.helpers({
	countAttendanceStudents: function () {
		console.log(this._id);
		return Attendances.find({students: this._id}).count();
	},
	countAttendanceInstructors: function () {
		return Attendances.find({instructors: this._id}).count();
	}
});