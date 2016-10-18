Template.Groups.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('groups'); // Subscribe to groups
        self.subscribe('periods'); // Subscribe to groups
    });
});

Template.Groups.events({
	'click .btn-add': function(event, template) {
		Session.set('newGroup', 1); // Open form to add groups
	}
});