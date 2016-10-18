Template.EditGroup.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let period = Groups.findOne().period;
        self.subscribe('studentsInPeriod', period);
        self.subscribe('instructorsInPeriod', period);
    });
});

Template.EditGroup.helpers({
	updateGroupId: function(){
		return FlowRouter.getParam("id");
	}
});

Template.EditGroup.events({
	'click .close': function() {
		Session.set('editGroup', 0);
	},
	'click button[type="submit"]': function(event, template) {
		Session.set('editGroup', 0);
	}
});