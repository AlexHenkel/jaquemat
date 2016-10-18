Template.SingleGroup.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
    	self.subscribe('singleGroup', id);
        self.subscribe('studentsInGroup', id);
    	self.subscribe('instructorsInGroup', id);
    	self.subscribe('attendancesInGroup', id);
    });
});

Template.SingleGroup.helpers({
	updateGroupId: function(){
		return this._id;
	}
});

Template.SingleGroup.events({
	'click .edit': function(event, template) {
		Session.set('editGroup', 1); // Open form to add groups
	},
	'click .attendance': function(event, template) {
		Session.set('takeAttendance', 1); // Open form to add groups
	}
});