Template.ManageGroups.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('currentGroups'); // Subscribe to groups
        self.subscribe('currentPeriods'); // Subscribe to periods
    });
});

Template.ManageGroups.helpers({
	groupsInPeriod: (id) => {
		return Groups.find({period: id});
	}
});