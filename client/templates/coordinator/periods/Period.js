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
	'click .fa-trash': function() {
		Meteor.call('deletePeriod', this._id);
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