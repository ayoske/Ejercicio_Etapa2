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
    }else if(sgnpassword.length<8 || sgnpassword.length>16){
      $('#txtModal').text('La contraseña debe tener minimo 8 caracteres y maximo 16 caracteres');
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

  //Listener en tiempo real del estado actual
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      //Ocultar boton Logout 
      console.log('logueado');
      $('#login').css("display", "none");
      $( ".container" ).append( "<div id='logout'></div>" );
      $( "#logout" ).append( "<div class='col-md-6'><h1>Panel de Administración</h1></div><div class='col-md-offset-4 col-md-2'><button id='btnLogout' class='btn left'>CERRAR SESIÓN</button></div>");
      const btnLogout = document.getElementById('btnLogout');
      btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        email = "";
        password="";
      });
  }else{
      console.log('No logueado');
      //Esconder boton Login
      $( "#logout" ).remove();
      $('#login').css("display", "block");
    }
  });

}());