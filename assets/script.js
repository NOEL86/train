// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRXyx-MrSn2AmjlexafGO1MVk9ML1KhGM",
    authDomain: "employee-data-81bdb.firebaseapp.com",
    databaseURL: "https://employee-data-81bdb.firebaseio.com",
    projectId: "employee-data-81bdb",
    storageBucket: "",
    messagingSenderId: "243746681603"
};

firebase.initializeApp(config);


var database = firebase.database();
var name = "";
var role = "";
var date = "";
var rate = "";