Template.SingleAttendance.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
        self.subscribe('studentsInGroupOfAttendance', id);
    	self.subscribe('instructorsInGroupOfAttendance', id);
    	self.subscribe('singleAttendance', id);
    });
});


Template.SingleAttendance.onRendered(function(){
	$("#date").datetimepicker({
		timepicker: false,
        format:'DD/MM/YYYY',
        minDate: 0
	});
});

Template.SingleAttendance.events({
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

		let attendanceId = FlowRouter.getParam("id");
		Meteor.call('updateAttendance', attendanceId, $("input[name='date']").val(), instructors, students);
	}
});