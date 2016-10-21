Groups = new Mongo.Collection('groups');

Groups.allow({
    insert: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator']);
    },
    update: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator']);
    },
    remove: function (userId, doc) {
        // just admins can delete
        return Roles.userIsInRole(userId, ['coordinator']);
    }
});

GroupsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del grupo"
    },
    period: {
        type: String,
        label: "Periodo",
        autoform: {
            type: "universe-select",
            options: function () { // Get all destinations in specific format (label, value)
                return Periods.find({status: { $in: ['current', 'pending']}}).map(function(period) {
                    return {label: period.name, value: period._id};
                });
            }
        }
    },
    instructors: {
        type: [String],
        label: "Instructores del grupo",
        autoform: {
            type: "universe-select",
            options: function () { // Get all destinations in specific format (label, value)
                return Meteor.users.find({roles: 'instructor'}).map(function(user) {
                    return {label: user.extendedProfile.name, value: user._id};
                });
            },
            multiple: true,
            create: false
        },
        optional: true,
        defaultValue: []
    },
    students: {
        type: [String],
        label: "Alumnos del grupo",
        autoform: {
            type: "universe-select",
            options: function () { // Get all destinations in specific format (label, value)
                return Meteor.users.find({roles: 'student'}).map(function(user) {
                    return {label: user.extendedProfile.name, value: user._id};
                });
            },
            multiple: true,
            create: false
        },
        optional: true,
        defaultValue: []
    },
});

Groups.attachSchema(GroupsSchema);