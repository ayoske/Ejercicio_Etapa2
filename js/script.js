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
    promise.catch(e => $('#ModFail').modal());
  });

  //Evento boton Sign up
  btnSignup.addEventListener('click', e =>{

    //Obtener Email y Pass
    const sgnemail = sgnEmail.value;
    const sgnpassword = sgnPassword.value;
    //Verificar Formato de Email
    // Para guardar la promese 
    const auth = firebase.auth();

    //Sign up
    const promise = auth.createUserWithEmailAndPassword(sgnemail,sgnpassword);
    promise.catch(e => console.log(e.messege));
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
      // btnLogin.classList.remove('hide');
    }else{
      console.log('No logueado');
      //Esconder boton Login
      // btnLogout.classList.add(hide);
    }
  });

}());