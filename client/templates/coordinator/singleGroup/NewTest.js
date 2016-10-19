Template.NewTest.events({
	'click #submit': function(event) {
		event.preventDefault();
		$("input").each(function() { // Reset form
			$(this).removeClass('invalid');
		});
		$(".error-message").html("");

		// Verify missing fields
		let missing = false;
		$("input").each(function() {
			if ($(this).val() === "") {
				$(this).addClass('invalid');
				missing = true;
			}
		});

		if (missing) {
			$(".error-message").html("Todos los campos son obligatorios");
			return false;
		}
		else {
			let groupId = FlowRouter.getParam("id");
			Meteor.call('insertTest', groupId, $("#name").val(), $("#short_name").val());
			Session.set('newTest', 0);
		}
	}
});