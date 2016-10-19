Template.SendMessage.events({
	'click .send-message': function (event) {
		event.preventDefault();
		$(".error-message").html("");
		// Verify if message is long enough
		if ($("#message-body").val().length > 5 && $("#message-body").val().length <= 500) {
			let id = FlowRouter.getParam("id");
			// Send message
			Meteor.call('sendMessage', id, $("#message-body").val());
			$("#message-body").val(""); // Clean message
		}
		else {
			// Feedback that it was not sent
			$(".error-message").html("El mensaje debe tener más de 5 caracteres, intenta de nuevo.");
		}
	}
});