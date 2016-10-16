Template.GetMessages.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('messagesInForum', id); // Subscribes to Messages of current forum
	});
});

Template.GetMessages.events({
	'click .fa-trash': function() {
		Meteor.call('deleteMessage', this._id);
	}
})