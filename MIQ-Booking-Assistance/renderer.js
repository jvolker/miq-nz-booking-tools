const { ipcRenderer } = require('electron')

const monthSelect = document.getElementById('months');
const accessibilityRoomYes = document.getElementById('accessibilityRoom_yes');
const accessibilityRoomNo = document.getElementById('accessibilityRoom_no');
const roomType = document.getElementById('roomType');

let date = new Date();
date.setMonth(date.getMonth() + 2);
monthSelect.value = date.getMonth();
sendSettings();

ipcRenderer.on('status', function (evt, status) {
    document.getElementById('status').innerText = status.message;
});

ipcRenderer.on('status-count', function (evt, status) {
    document.getElementById('status-count').innerText = status.message;
});

monthSelect.addEventListener('change', sendSettings)
accessibilityRoomYes.addEventListener('change', sendSettings)
accessibilityRoomNo.addEventListener('change', sendSettings)
roomType.addEventListener('change', sendSettings)

function sendSettings(){
    ipcRenderer.send('settings', {month: monthSelect.value, accessibilityRequirement: accessibilityRoomYes.checked, roomType: roomType.value});
}
