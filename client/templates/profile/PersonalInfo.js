var _ = require('lodash');

Template.PersonalInfo.onCreated(function () {
	var self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam("id");
		self.subscribe('periods'); // Subscribe to period of user
		self.subscribe('schools'); // Subscribe to school of user
	});
});

Template.PersonalInfo.helpers({
	properties: function () {
		let arr = [];
		let id = FlowRouter.getParam("id");
		console.log(_.difference(_.keys(Meteor.users.findOne(id).extendedProfile), ['name','type', 'profile_picture']));
		return _.difference(_.keys(Meteor.users.findOne(id).extendedProfile), ['name','type', 'profile_picture']);
	},
	prettyProperty: function(value) {
		let properties = {
			email: "Email",
			age: "Edad",
			school: "Escuela",
			curp: "CURP",
			school_year: "Año Escolar",
			program: "Programa deseado",
			school_id: "Matrícula",
			major: "Carrera",
			area: "Área deseada",
			semester: "Semestre",
			period: "Periodo Inscrito"
		}

		return properties[value];
	},
	propertyValue: function(property) {
		let id = FlowRouter.getParam("id");
		let value = Meteor.users.findOne(id).extendedProfile[property];
		if (property === 'school_year') {
			let schoolYears = {
				first: "1ro",
				second: "2do",
				third: "3ro"
			}
			return schoolYears[value];
		}
		else if (property === 'program') {
			let programs = {
				olympiad: "Olimpiada",
				regularization: "Regularización",
				both: "Cualquiera"
			}
			return programs[value];
		}
		else if (property === 'area') {
			let areas = {
				math: "Matemáticas",
				physics: "Física",
				both: "Cualquiera"
			}
			return areas[value];
		}
		else if (property === 'school') {
			return Schools.findOne(value).name;
		}
		else if (property === 'period') {
			return Periods.findOne(value).name;
		}
		else {
			return value;
		}
	}
});