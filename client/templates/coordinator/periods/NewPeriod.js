Template.NewPeriod.events({
	// Closes new group mode when closing
	'click .close': function() {
		Session.set('newPeriod', 0);
	},
	'click button[type="submit"]': function(event, template) {
		Session.set('newPeriod', 0);
	}
});