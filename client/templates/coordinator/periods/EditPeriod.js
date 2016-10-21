Template.EditPeriod.onRendered(function() {
	let date = $("[name='start_date']").val();
	$("[name='start_date']").val(moment(parseInt(date)).format("DD/MM/YYYY"));

	date = $("[name='end_date']").val();
	$("[name='end_date']").val(moment(parseInt(date)).format("DD/MM/YYYY"));
});

Template.EditPeriod.helpers({
	updatePeriodId: function(){
		return this._id;
	},
});