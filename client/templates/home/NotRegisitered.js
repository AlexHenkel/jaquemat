Template.NotRegistered.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('schools'); // Subscribes to schools
	});
	this.userType = new ReactiveVar("student");
});

Template.NotRegistered.helpers({
	name: () => {
		return Meteor.user().services.facebook.name;
	},
	email: () => {
		return Meteor.user().services.facebook.email;
	},
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
		$(".form-group").each(function() { // Reset form
			$(this).removeClass('has-error');
		});
		$(".error-message").html("");

		// Verify missing fields
		let missing = false;
		$("input:not(.js-universeSelectizeInput)").each(function() {
			if ($(this).val() === "") {
				$(this).parents('.form-group').addClass('has-error');
				missing = true;
			}
		});

		$("select").each(function() {
			if (!$(this).val()) {
				$(this).parents('.form-group').addClass('has-error');
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