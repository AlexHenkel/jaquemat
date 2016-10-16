Schools = new Mongo.Collection('schools');

Schools.allow({
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

SchoolsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre de la escuela"
    }
});

Schools.attachSchema(SchoolsSchema);