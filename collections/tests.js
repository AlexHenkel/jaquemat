Tests = new Mongo.Collection('tests');

Tests.allow({
    insert: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    update: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    remove: function (userId, doc) {
        // just admins can delete
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    }
});

TestsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del examen"
    },
    short_name: {
        type: String,
        label: "Nombre corto del examen"
    },
    group: {
        type: String
    }
});

Tests.attachSchema(TestsSchema);