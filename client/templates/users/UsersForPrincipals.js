Template.UsersForPrincipal.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('currentUsersForPrincipal');
	});
});

Template.UsersForPrincipal.helpers({
	isShown: function() {
		let user = Meteor.users.findOne(this._id);
		if (this._id !== Meteor.userId()) {
			return user.extendedProfile;
		}
		return false;
	}
});