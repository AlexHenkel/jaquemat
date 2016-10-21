Template.UsersForInstructors.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('currentUsersForInstructor');
	});
});

Template.UsersForInstructors.helpers({
	isShown: function() {
		let user = Meteor.users.findOne(this._id);
		if (this._id !== Meteor.userId()) {
			return user.extendedProfile;
		}
		return false;
	}
});