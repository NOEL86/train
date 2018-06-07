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
var tMinutesTillTrain = 0;


$("#button").on("click", function (event) {
    event.preventDefault();

    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    rate = $("#rate").val().trim();

    $(".form-control").val("");

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        rate: rate,
        tMinutesTillTrain: tMinutesTillTrain
    });

})


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var sv = childSnapshot.val();
    var newName = (sv.name);
    var newDestination = (sv.destination);
    var newTime = (sv.time);
    var newRate = (sv.rate);

    // Time is...
    // var firstTime = "05:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(newTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted); //changed currentTime from newTime

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newRate;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = newRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);

    var trainArrival = nextTrain.format("hh:mm");
    console.log(trainArrival);

    console.log(newName);
    console.log(newDestination);
    console.log(newRate);

    $("#data-holder").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newRate + "</td><td>" + trainArrival + "</td><td>"
        + tMinutesTillTrain + "</td></tr>");



}, function (errorObject) {

    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function () {
    $("td").empty();
})

// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away

