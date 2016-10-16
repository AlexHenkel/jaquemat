Accounts.onLogin(function() {
    FlowRouter.go('home');
});

////////////////////////////
///  Public routes
////////////////////////////
FlowRouter.route('/', {
    name: 'home',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('MainLayout', { main: 'Home' });
        }
        else {
            FlowRouter.go("login");
        }
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Login' });
    }
});

////////////////////////////
///  Coordinator routes
////////////////////////////
FlowRouter.route('/grupos', {
    name: 'groups',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Groups' });
    }
});

FlowRouter.route('/periodos', {
    name: 'periods',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Periods' });
    }
});

FlowRouter.route('/foros', {
    name: 'forums',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Forums' });
    }
});

FlowRouter.route('/usuarios', {
    name: 'users',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Users' });
    }
});


////////////////////////////
///  Common routes
////////////////////////////
FlowRouter.route('/foro/:id', {
    name: 'single-forum',
    action() {
        BlazeLayout.render('MainLayout', { main: 'SingleForum' });
    }
});

FlowRouter.route('/grupo/:id', {
    name: 'single-group',
    action() {
        BlazeLayout.render('MainLayout', { main: 'SingleGroup' });
    }
});