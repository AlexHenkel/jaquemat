Template.Profile.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('user', id); // Subscribe to current user
		self.subscribe('currentGroupsOfUser', id); // Subscribe to users
		self.subscribe('currentForumsOfUser', id);
	});
});