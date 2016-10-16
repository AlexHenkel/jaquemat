Template.NewForum.events({
	// Closes new group mode when closing
	'click .fa-close': function() {
		Session.set('newForum', 0);
	},
	'click button[type="submit"]': function(event, template) {
		Session.set('newForum', 0);
	}
});