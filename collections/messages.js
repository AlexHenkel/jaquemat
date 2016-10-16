Messages = new Mongo.Collection('messages');

Messages.allow({
    insert: function(userId, doc) {
        // just admins can update
       return doc.sender === userId;
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

MessagesSchema = new SimpleSchema({
    body: {
        type: String
    },
    sender: {
        type: String
    },
    sender_name: {
        type: String
    },
    created_at: {
        type: Date,
    },
    owner: {
        type: String
    }
});

Messages.attachSchema(MessagesSchema);