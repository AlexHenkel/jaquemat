Meteor.methods({
	////////////////////////
	///  Groups
	////////////////////////

	// Deletes group
	deleteGroup: function(id) {
		Groups.remove(id);
	},

	////////////////////////
	///  Messages
	////////////////////////

	// Deletes message
	deleteMessage: function(id) {
		Messages.remove(id);
	},
	// Change this method to use Facebook info
	sendMessage: function(forumId, body) {
		if(this.userId) {
			let user = Meteor.users.findOne(this.userId);
			Messages.insert({
				body: body, 
				sender: this.userId, 
				sender_name: user.profile.first_name, 
				// sender_name: user.services.facebook.name
				created_at: Date.now(),
				owner: forumId
			});
		}
	},

	////////////////////////
	///  Schools
	////////////////////////

	// Deletes group
	deleteSchool: function(id) {
		School.remove(id);
	},

	////////////////////////
	///  Forums
	////////////////////////

	// Deletes group
	deleteForum: function(id) {
		Forums.remove(id);
	},

	////////////////////////
	///  Periods
	////////////////////////

	// Deletes group
	deletePeriod: function(id) {
		Periods.remove(id);
	},

	////////////////////////
	///  Users
	////////////////////////

	// Deletes group
	registerUser: function(profile) {
		Meteor.users.update({_id: this.userId}, { $set: { extendedProfile : profile}});
	},

	// Deletes group
	toggleUser: function(id) {
		let user = Meteor.users.findOne({_id: id});
		if (Roles.userIsInRole(id, user.extendedProfile.type)) {
			Roles.removeUsersFromRoles(id, user.extendedProfile.type);
		}
		else {
			Roles.addUsersToRoles(id, user.extendedProfile.type);
		}
	},

	// Deletes group
	deleteUse: function(id) {
		Meteor.users.remove(id);
	},
});