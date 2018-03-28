(function(){

  //Inicializa Firebase
  const config = {
    apiKey: "AIzaSyDCpQm9J9l2mFTbbVhDgdgB9afsXXK4BB0",
    authDomain: "etapa-dos.firebaseapp.com",
    databaseURL: "https://etapa-dos.firebaseio.com",
    projectId: "etapa-dos",
    storageBucket: "",
    messagingSenderId: "972318477878"
  };
  firebase.initializeApp(config);

  //Obtener elementos

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const sgnEmail = document.getElementById('sgnEmail');
  const sgnPassword = document.getElementById('sgnPassword');
  //Evento boton Sign in
  btnLogin.addEventListener('click', e =>{

    //Obtener Email y Pass
    const email = txtEmail.value;
    const password = txtPassword.value;
    // Para guardar la promese 
    const auth = firebase.auth();

    //Sign in
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch(e => {
       $('#txtModal').text('El correo o contraseña son incorrectos');
        $('#ModFail').modal('show');
      });
  });

  //Evento boton Sign up
  btnSignup.addEventListener('click', e =>{

    //Obtener Email y Pass
    const sgnemail = sgnEmail.value;
    const sgnpassword = sgnPassword.value;
    //Verificar Formato de Email
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(sgnemail)){
        $('#txtModal').text('El formato de correo electrónico es incorrecto, favor de verificar');
        $('#ModFail').modal('show');
        return false;
    }else if(sgnpassword.length<6){
      $('#txtModal').text('La contraseña debe tener minimo 6 caracteres');
      $('#ModFail').modal('show');
      return false;
    }
    // Para guardar la promese 
    const auth = firebase.auth();

    //Sign up
    const promise = auth.createUserWithEmailAndPassword(sgnemail,sgnpassword);
    promise.catch(e => {
       $('#txtModal').text('El correo o contraseña son incorrectos');
        $('#ModFail').modal('show');
      }
    );
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  //Listener en tiempo real del estado actual
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      //Ocultar boton Logout 
      console.log('logueado');
      $('#login').css("display", "none");
      $('#logout').css("display", "block");
  }else{
      console.log('No logueado');
      //Esconder boton Login
      $('#logout').css("display", "none");
      $('#login').css("display", "block");
    }
  });

}());