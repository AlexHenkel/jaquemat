Template.SingleForum.onCreated(function () {
    var self = this;
    self.autorun(function() {
    	let id = FlowRouter.getParam("id");
        self.subscribe('singleForum', id); // Subscribe to self forum
        self.subscribe('groupsInForum', id); // Subscribe to groups in forum
        self.subscribe('selfUser');
    });
});

Template.SingleForum.helpers({
	userInForum: function () {
		if (Roles.userIsInRole(Meteor.userId(), 'coordinator')) {
			return true;
		}
		else if (Roles.userIsInRole(Meteor.userId(), 'instructor')) {
			return Groups.find({instructors: Meteor.userId()}).count();;
		}
		else if (Roles.userIsInRole(Meteor.userId(), 'student')) {
			return Groups.find({students: Meteor.userId()}).count();
		}
		return false;
	}
});