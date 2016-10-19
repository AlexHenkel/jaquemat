Template.ManageForums.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('currentForums'); // Subscribe to forums
        self.subscribe('currentPeriods'); // Subscribe to periods
    });
});

Template.ManageForums.helpers({
	forumsInPeriod: (id) => {
		return Forums.find({period: id});
	}
});