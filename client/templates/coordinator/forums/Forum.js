Template.Forum.onCreated(function() {
  this.editMode = new ReactiveVar(0);
});


Template.Forum.helpers({
	updateForumId: function(){
		return this._id;
	},
	editMode: function() {
		return Template.instance().editMode.get();
	},
	groupName: function(id) {
		return Groups.findOne(id).name;
	}
});

Template.Forum.events({
	'click .delete': function() {
		Meteor.call('deleteForum', this._id);
	},
	'click .edit': function(event, template) {
		template.editMode.set(!template.editMode.get());
	},
	'click button[type="submit"]': function(event, template) {
		template.editMode.set(0);
	}, 
	'click .close': function(event, template) {
		template.editMode.set(0);
	}
});