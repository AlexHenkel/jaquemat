Template.SingleGroup.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
    	self.subscribe('singleGroup', id);
        self.subscribe('studentsInGroup', id);
        self.subscribe('instructorsInGroup', id);
    });
    this.editMode = new ReactiveVar(0);
});

Template.SingleGroup.helpers({
	updateGroupId: function(){
		return this._id;
	},
	editMode: function() {
		return Template.instance().editMode.get();
	}
});

Template.SingleGroup.events({
	'click .edit': function(event, template) {
		Session.set('editGroup', 1); // Open form to add groups
	}
});