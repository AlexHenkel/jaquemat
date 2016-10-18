Template.TakeAttendance.onRendered(function(){
	$("#date").datetimepicker({
		timepicker: false,
        format:'DD/MM/YYYY',
        minDate: 0
	});
});

Template.TakeAttendance.events({
	'click .close': function() {
		Session.set('takeAttendance', 0);
	},
	'click button[type="submit"]': function(event, template) {
		event.preventDefault();
		$(".error-message").html("");

		if ($("input[name='date']").val() === "") {
			$(".error-message").html("La fecha es obligatoria");
			return false;
		}

		// Add instructors
		let instructors = [];
		$("#instructorsTable input:checked").each(function() {
			instructors.push($(this).attr("id"))
		});

		// Add students
		let students = [];
		$("#studentsTable input:checked").each(function() {
			students.push($(this).attr("id"))
		});

		console.log($("input[name='date']").val());
		let groupId = FlowRouter.getParam("id");
		Meteor.call('takeAttendance', $("input[name='date']").val(), groupId, instructors, students);
		Session.set('takeAttendance', 0);
	}
});