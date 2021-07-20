const { ipcRenderer } = require('electron')

const findAnyDateYes = document.getElementById('findAnyDate_yes');
const findAnyDateNo = document.getElementById('findAnyDate_no');
const dateButton = document.getElementById('date-button');
const monthButton = document.getElementById('month-button');
const dateList = document.getElementById('date-list');
const clearButton = document.getElementById('clear-button');
const dateInput = document.getElementById('date-input');
const dateDiv = document.getElementById('date-div');
const resetButton = document.getElementById('reset-button');
const refreshTime = document.getElementById('refresh');

dateDiv.style.display = "none";

let dates = [];

let date = new Date();
date.setMonth(date.getMonth() + 2);
sendSettings();

ipcRenderer.on('status', function (evt, status) {
    document.getElementById('status').innerText = status.message;
    resetButton.disabled = true;
});

ipcRenderer.on('status-count', function (evt, status) {
    document.getElementById('status-count').innerText = status.message;
    resetButton.disabled = true;
});

ipcRenderer.on('available', function (evt, message) {
    resetButton.disabled = false;
});

dateButton.addEventListener('click', () => {
    if(dateInput.value && dates.indexOf(dateInput.value) === -1){
        dates.push(dateInput.value);
    }
    updateDateUI();
    sendSettings();
})

monthButton.addEventListener('click', () => {
    if(dateInput.value && dates.indexOf(dateInput.value.substring(0, 7)) === -1){
        dates.push(dateInput.value.substring(0, 7));
    }
    updateDateUI();
    sendSettings();
})

clearButton.addEventListener('click', () => {
    dates = [];
    updateDateUI();
    sendSettings();
})

findAnyDateYes.addEventListener('change', () => {
    dateDiv.style.display = "none";
    sendSettings();
})

findAnyDateNo.addEventListener('change', () => {
    dateDiv.style.display = "";
    sendSettings();
})

resetButton.addEventListener('click', () => {
    sendSettings(true);
})

refreshTime.addEventListener('change', () => {
    sendSettings();
})

function updateDateUI() {
    dateList.innerHTML = "";
    dates.forEach(d => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(d));
        dateList.appendChild(li);
    })
}

function sendSettings(reset = false){
    ipcRenderer.send(
        'settings',
        {
            dates: dates,
            findAnyDate: findAnyDateYes.checked,
            reset: reset,
            refreshTime: refreshTime.value
        });
}
