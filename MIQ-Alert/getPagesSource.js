var secondsToRefresh = 5;

var availableDates = document.getElementsByClassName("has-event");
// var unavailableDates = document.getElementsByClassName("is-disabled");

// console.log(availableDates)
// console.log(unavailableDates)

if (availableDates.length > 0) {
    console.log("available date found")
    chrome.runtime.sendMessage({action: "foundDates"});
}
else {
    console.log("no avaiable dates found")
    setTimeout(function(){ 
        location.reload();
    }, secondsToRefresh * 1000);
    // console.log(unavailableDates)
}