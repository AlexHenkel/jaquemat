Template.CurrentForumsUser.onCreated(function(){
	var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
        self.subscribe('currentForumsOfUser', id);
    });
});