Forums = new Mongo.Collection('forums');

Forums.allow({
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

ForumsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del foro"
    },
    groups: {
        type: [String],
        label: "Grupos del foro",
        autoform: {
            type: "universe-select",
            options: function () { // Get all destinations in specific format (label, value)
                return Groups.find({}).map(function(group) {
                    return {label: group.name, value: group._id};
                });
            },
            multiple: true,
            create: false
        }
    }
});

Forums.attachSchema(ForumsSchema);