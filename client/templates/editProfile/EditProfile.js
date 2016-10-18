Template.EditProfile.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('user', id); // Subscribe to current user
	});
});

Template.EditProfile.events({
	'click #submitRegister': function(event) {
		event.preventDefault();
		$("input").each(function() { // Reset form
			$(this).removeClass('invalid');
		});
		$(".error-message").html("");

		// Verify missing fields
		let missing = false;
		$("input:not(.js-universeSelectizeInput)").each(function() {
			if ($(this).val() === "") {
				$(this).addClass('invalid');
				console.log($(this).html());
				missing = true;
			}
		});

		if (missing) {
			$(".error-message").html("Todos los campos son obligatorios");
			return false;
		}
		else {
			let profile = sanitizeRegisterForm();
			Meteor.call('updateUser', profile);
		}
	}
});