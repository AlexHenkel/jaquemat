Template.NewSchool.events({
	// Closes new group mode when closing
	'click .close': function() {
		Session.set('newSchool', 0);
	},
	'click button[type="submit"]': function(event, template) {
		Session.set('newSchool', 0);
	}
});