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
        var trainInfo = $("#info");


        var newName = $("<td>");
        var newDestination = $("<td>");
        var newTime = $("<td>");
        var newRate = $("<td>");
        var nextTime = $("<td>");

        trainInfo.append(newName);
        trainInfo.append(newDestination);
        trainInfo.append(newTime);
        trainInfo.append(newRate);
        trainInfo.append(nextTime);

        newName.text(sv.name);
        newDestination.text(sv.destination);
        newTime.text(sv.time);
        newRate.text(sv.rate);
        nextTime.text(sv.nextTime);


        var tFrequency = 20;

        // Time is 3:30 AM
        var firstTime = "05:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    }

}, function (errorObject) {

    console.log("Errors handled: " + errorObject.code);

});

$("#reset").on("click", function () {
    $("#info").empty();
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


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Assumptions
// var tFrequency = 20;

// // Time is 3:30 AM
// var firstTime = "05:30";

// First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));