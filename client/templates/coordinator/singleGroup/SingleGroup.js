Template.SingleGroup.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
    	self.subscribe('singleGroup', id);
        self.subscribe('studentsInGroup', id);
        self.subscribe('instructorsInGroup', id);
    });
});