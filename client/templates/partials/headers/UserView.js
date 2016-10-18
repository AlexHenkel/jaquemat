Template.UserView.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('selfUser'); // Subscribe to self info
    });
});

Template.UserView.helpers({
	name: function () {
		return Meteor.user().extendedProfile.name;
	},
	email: function () {
		return Meteor.user().extendedProfile.email;
	},
	profile_picture: function () {
		return Meteor.user().extendedProfile.profile_picture;
	}
});