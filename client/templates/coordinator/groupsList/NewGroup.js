Template.NewGroup.events({
	// Closes new group mode when closing
	'click .fa-close': function() {
		Session.set('newGroup', 0);
	},
	'click button[type="submit"]': function(event, template) {
		Session.set('newGroup', 0);
	}
});