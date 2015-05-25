'use scrict';

app.factory('Auth', function(FIREBASEURL, $firebaseAuth, $firebase) {

  var ref = new Firebase(FIREBASEURL);
  var auth = $firebaseAuth(ref);

  var Auth = {

    user: {},

    createProfile: function(uid, user) {
      var profile = {
        name: user.name,
        email: user.email
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(uid, profile);
    },

    login: function(user) {
      return auth.$authWithPassword(
        { email: user.email,
          password: user.password });
    },
    register: function(user) {
      return auth.$createUser(
        { email: user.email,
          password: user.password}).then(function() {
          return Auth.login(user);
        }).then(function(data) {
          return Auth.createProfile(data.uid, user);
        });
    },
    logout: function(user) {
      return auth.$unauth();
    },
    changePassword: function(user) {
      return auth.$changePassword(
        { email: user.email,
          oldPassword: user.oldpass,
          newPassword: user.newpass });
    },
    signedIn: function() {
      return Auth.user && Auth.user.provider;
    },
  };

  auth.$onAuth(function(authData) {
    if(authData) {
      angular.copy(authData, Auth.user);
      Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
    } else {
      if (Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();
      }

      angular.copy({}, Auth.user);
    }
  });




  return Auth;
});
