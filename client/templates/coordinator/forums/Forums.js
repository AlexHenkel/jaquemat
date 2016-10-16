Template.Forums.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('forums'); // Subscribe to forums
        self.subscribe('currentGroups'); // Subscribe to groups
    });
});

Template.Forums.events({
	'click .new-forum': function(event, template) {
		Session.set('newForum', 1); // Open form to add forums
	}
});