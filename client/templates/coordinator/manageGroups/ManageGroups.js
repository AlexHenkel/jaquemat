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
	},
	currentPeriods: () => {
		return Periods.find({status: 'current'}, {sort: {start_date: -1}}); // Get periods
	},
	futurePeriods: () => {
		return Periods.find({status: 'pending'}, {sort: {start_date: -1}}); // Get periods
	}
});