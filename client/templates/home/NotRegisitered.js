Template.NotRegistered.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('schools'); // Subscribes to schools
		self.subscribe('selfUser'); // Subscribe to self info
	});
	this.userType = new ReactiveVar("student");
});

Template.NotRegistered.helpers({
	typeMatch: (type) => {
		return Template.instance().userType.get() === type;
	},
	currentType: () => {
		return Template.instance().userType.get();
	}
});

Template.NotRegistered.events({
	'change input[name="type"]': function(){
		Template.instance().userType.set($("input[name='type']:checked").val());
	},
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
				missing = true;
			}
		});

		$("select").each(function() {
			if (!$(this).val()) {
				// $(this).parents('.form-group').addClass('has-error');
				missing = true;
			}
		});

		if (missing) {
			$(".error-message").html("Todos los campos son obligatorios");
			return false;
		}
		else {
			let profile = sanitizeRegisterForm();
			Meteor.call('registerUser', profile);
		}
	}
});