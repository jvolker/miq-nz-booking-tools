var secondsToRefresh = 5;

var availableDates = document.getElementsByClassName("has-event");
// var unavailableDates = document.getElementsByClassName("is-disabled");

// console.log(availableDates)
// console.log(unavailableDates)

if(Notification && Notification.permission !== "denied") {    
    Notification.requestPermission();
}

if (availableDates.length > 0) {
    console.log("available date found");
    if (Notification && Notification.permission === 'granted') {
        setTimeout(function(){
            const notifTitle = 'Available MIQ dates found!';
            const timestamp = new Date().toLocaleString('en-NZ', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric',
                minute: 'numeric'
           });
            const notifBody = `Available MIQ dates found! \nQuickly check the booking calendar and proceed as usual.\n\n[Checked at ${timestamp}]`;
            const options = {
                body: notifBody
            };
                    new Notification(notifTitle, options);
        }, 1000);
    }
    chrome.runtime.sendMessage({action: "foundDates"});
}
else {
    console.log("no avaiable dates found")
    setTimeout(function(){ 
        location.reload();
    }, secondsToRefresh * 1000);
    // console.log(unavailableDates)
}