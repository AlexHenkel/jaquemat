Template.GradeTest.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
        self.subscribe('studentsInGroupOfTest', id);
    	self.subscribe('singleTest', id);
    	self.subscribe('gradesInTest', id);
    });
});

Template.GradeTest.helpers({
	grade: function (id) {
		let testId = FlowRouter.getParam("id");
		if (Grades.findOne({student: id, test: testId})) {
			return Grades.findOne({student: id, test: testId}).grade;
		}
	}
});

Template.GradeTest.events({
	'click button[type="submit"]': function(event, template) {
		event.preventDefault();
		$("input").each(function() { // Reset form
			$(this).removeClass('invalid');
		});
		$(".error-message").html("");

		// Verify missing fields
		let missing = false;
		$("input").each(function() {
			if ($(this).val() === "" || parseInt($(this).val()) < 0 || parseInt($(this).val()) > 100 ) {
				$(this).addClass('invalid');
				missing = true;
			}
		});

		if (missing) {
			$(".error-message").html("Todos los campos son obligatorios. Solo calificaciones de 0 a 100");
			return false;
		}
		else {
			// Add students
			let students = [];
			$("#studentsTable input").each(function() {
				let grade = {};
				grade._id = $(this).attr("id");
				grade.grade = $(this).val();
				students.push(grade);
			});
			// console.log(students);
			let testId = FlowRouter.getParam("id");
			Meteor.call('gradeTest', testId, students);
		}
	}
});