Template.Periods.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('periods'); // Subscribe to forums
    });
});

Template.Periods.events({
	'click .new-period': function(event, template) {
		Session.set('newPeriod', 1); // Open form to add forums
	}
});