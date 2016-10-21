Template.InfoPeriodUser.onCreated(function() {
	this.firstPeriod = new ReactiveVar("");
	this.attendanceCurrentPeriod = new ReactiveVar("");
	this.averageCurrentPeriod = new ReactiveVar("");
});

Template.InfoPeriodUser.onRendered(function() {
	let self = this;
	let id = FlowRouter.getParam("id");

	Meteor.call('firstPeriod', id, function(error, result) {
		self.firstPeriod.set(result);
	});

	Meteor.call('attendanceCurrentPeriod', id, function(error, result) {
		self.attendanceCurrentPeriod.set(result);
	});

	Meteor.call('averageCurrentPeriod', id, function(error, result) {
		self.averageCurrentPeriod.set(result);
	});
})

Template.InfoPeriodUser.helpers({
	firstPeriod: function () {
		return Template.instance().firstPeriod.get();
	},
	attendanceCurrentPeriod: function () {
		return Template.instance().attendanceCurrentPeriod.get();
	},
	averageCurrentPeriod: function() {
		return Template.instance().averageCurrentPeriod.get();
	}
});