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
	console: function(i) {
		console.log(i);
	}
});

Template.Forum.events({
	'click .fa-trash': function() {
		Meteor.call('deleteForum', this._id);
	},
	'click .fa-pencil': function(event, template) {
		template.editMode.set(!template.editMode.get());
	},
	'click button[type="submit"]': function(event, template) {
		template.editMode.set(0);
	}, 
	'click .fa-close': function(event, template) {
		template.editMode.set(0);
	}
});