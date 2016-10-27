Template.Users.onCreated(function () {
	var self = this;
	self.autorun(function() {
		self.subscribe('usersData');
	});
});

Template.Users.helpers({
	isActive: function(){
		let user = Meteor.users.findOne({_id: this._id});
		return Roles.userIsInRole(user._id, ['instructor', 'coordinator', 'student', 'principal']);
	},
	hasProfile: function() {
		let user = Meteor.users.findOne({_id: this._id});
		return user.extendedProfile;
	}
 });

Template.Users.events({
	'click .toggle-user': function(event, template) {
		Meteor.call('toggleUser', this._id);
	},
	'click .fa-trash': function(event, template) {
		Meteor.call('deleteUser', this._id);
	}
});