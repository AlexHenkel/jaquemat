Template.AttendanceList.events({
	'click .delete': function (event) {
		Meteor.call('deleteAttendance', $(event.target).attr('data-id'));
	}
});