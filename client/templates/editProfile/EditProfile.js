Template.EditProfile.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('schools'); // Subscribes to schools
		self.subscribe('user', id); // Subscribe to current user
	});
});