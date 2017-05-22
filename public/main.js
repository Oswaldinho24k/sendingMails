function addUserTDB(){
  return firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
    subscribedToMailingList: true,
    email: firebase.auth().currentUser.email
  });
}
//Login/SignIn To the app via Google
  function logInGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      addUserTDB();

      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  function LogInFb(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    addUserTDB();
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
  }
  function logOut() {
		firebase.auth().signOut().then(function() {
      $('#loggedOut').show();
      $('#loggedIn').hide();
  	});
  }

  function addFriend(){
    var datafriends = firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/friends');
    var fmail = $('#fmail').val();

    datafriends.push({
      email: fmail,
      invited:true,
      status:'en espera'
    });
    $('#fmail').val('');
    console.log(datafriends);
  }
  
