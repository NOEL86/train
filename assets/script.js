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
var destination = "";
var time = "";
var rate = "";
var nextTime = "";
$("#button").on("click", function (event) {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    rate = $("#rate").val().trim();
    nextTime = $("#nextTime").val().trim();

    $(".form-control").val("");

    database.ref().push({
        name: name,
        destination: destination,
        time: firebase.database.ServerValue.TIMESTAMP,
        rate: rate,
        nextTime: nextTime
    });
})

database.ref().on("child_added", function (snapshot) {

    var sv = snapshot.val();

    getInfo();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.rate);
    console.log(sv.nextTime);

    function getInfo() {
        var trainTimes = $("#data-holder");

        var newRow = $("<tr>");
        var newName = $("<td>");
        var newDestination = $("<td>");
        var newTime = $("<td>");
        var newRate = $("<td>");
        var newMinutesAway = $("<td>");

        trainTimes.append(newRow);
        newRow.append(newName);
        newRow.append(newDestination);
        newRow.append(newTime);
        newRow.append(newRate);
        newRow.append(newMinutesAway);

        newName.text(sv.name);
        newDestination.text(sv.destination);
        newTime.text(sv.time);
        newRate.text(sv.rate);
        newMinutesAway.text(sv.newMinutesAway);

    }

}, function (errorObject) {

    console.log("Errors handled: " + errorObject.code);
});