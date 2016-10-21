Template.Home.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('selfUser'); // Subscribes to user
	});
});

Template.Home.helpers({
	hasProfile: () => {
		return Meteor.user().extendedProfile;
	},
	coordinatorHome: () => {
		FlowRouter.go('groups');
	},
	instructorHome: () => {
		FlowRouter.go('/usuario/:id', {id: Meteor.userId()});
	},
	studentHome: () => {
		FlowRouter.go('/usuario/:id', {id: Meteor.userId()});
	}
});