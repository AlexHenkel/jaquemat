Template.GetMessages.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('messagesInForum', id); // Subscribes to Messages of current forum
	});
});

Template.GetMessages.helpers({
	senderImage: function (senderId) {
		return Meteor.users.findOne(senderId).extendedProfile.profile_picture;
	},
	senderStatus: function (senderId) {
		let status = Meteor.users.findOne(senderId).extendedProfile.type;
		let statusList = {
			student: "Beneficiario",
			coordinator: "Coordinador",
			instructor: "Instructor",
			principal: "Director"
		}
		return statusList[status];
	}
});

Template.GetMessages.events({
	'click .delete': function() {
		Meteor.call('deleteMessage', this._id);
	}
})