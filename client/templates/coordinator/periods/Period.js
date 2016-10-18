Template.Period.onCreated(function() {
  this.editMode = new ReactiveVar(0);
});


Template.Period.helpers({
	updatePeriodId: function(){
		return this._id;
	},
	editMode: function() {
		return Template.instance().editMode.get();
	}
});

Template.Period.events({
	'click .delete': function() {
		Meteor.call('deletePeriod', this._id);
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