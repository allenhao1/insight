Router.route('/', {
  name: 'home',
  action: function() {
    ReactLayout.render(App, {
      content: <TasksList />
    });
  }
});

Router.route('/login', {
  name: 'login',
  action: function() {
    ReactLayout.render(App, {
      content: <Login />
    });
  }
});

Router.route('/register', {
  name: 'register',
  action: function() {
    ReactLayout.render(App, {
      content: <Register />
    });
  }
});


Router.notFound = {
  action: function() {
   Router.go('home');
  }
};
