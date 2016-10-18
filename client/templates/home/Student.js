Template.StudentForm.helpers({
	options: function () {
		return Schools.find().map(function(school) {
                return {label: school.name, value: school._id};
            });
	}
});