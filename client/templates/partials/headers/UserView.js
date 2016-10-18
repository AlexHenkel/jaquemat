Template.UserView.onCreated(function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('selfUser'); // Subscribe to self info
    });
});