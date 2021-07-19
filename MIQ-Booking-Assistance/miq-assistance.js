// MIQ BOOKING ASSISTANCE

// CHANGE DATES TO WHAT YOU ARE LOOKING FOR
let myDates = ['2021-8-5', '2021-8-10', '2021-9'];

// DON'T CARE ABOUT A SPECIFIC DATE? SET THIS TO TRUE
let findAnyDate = true;

let accessibilityRequirement = false; // change to "true" if you have accessibility requirement
let roomType = 'twin'; // double or twin

// --------------
// OPTIONAL: PREFILL LOGIN

// You will have to login to your MIQ account in the browser window. You probably best login manually at the start.
// But if you like you can prefill credentials instead. To do this you have to change the option to "login", run the script and login. Afterwards you need to switch back to "login-done" and restart the script.
const step = "login-done"; // options: "login", "login-done"

// edit the variables below to suit your requirements
const email = 'YOUR_EMAIL_ADDRESS';
const password = 'YOUR_PASSWORD';

// --------------
// OPTIONAL: How many seconds to refresh the page. 
// Don't decrease this further to prevent 403 errors: https://github.com/jvolker/miq-nz-booking-tools/issues/8
const secondsTillRefresh = 5;

// --------------

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let reset = false;
let checkedCount = 0;
let electronWindow;

// Enter some dates to simulate the MIQ website having availability, e.g. '2021-10-1'
// It allows three checks before the injecting the date
let testDates = [];

const service = {
    start: start
}

function start(window, ipcMain) {
    initElectron(ipcMain, window)

    puppeteer.use(StealthPlugin());

    (async () => {
        const browser = await puppeteer.launch({
            defaultViewport: null,
            headless: false,
            devtools: false,
            // isMobile: true,
            // hasTouch: true,
            args: [`--window-size=1920,1080`]
        });

        // Use current page
        const page = (await browser.pages())[0];

        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36');

        console.log('Welcome to the MIQ Booking Assistance!')
        updateElectronStatus('status', 'A new browser window should appear. Please navigate to "Secure your allocation" page.');
        console.log('A new browser window should appear. Please navigate to "Secure your allocation" page.')

        if (step === "login") await login(page)
        if (!page.url().includes('MIQ-DEFAULT-EVENT/accommodation')) {
            await page.goto('https://allocation.miq.govt.nz/portal/dashboard');
            while (true) {
                await page.waitForTimeout(300);
                if (page.url().includes('/event/MIQ-DEFAULT-EVENT/accommodation')) {
                    break
                }
            }
        }
        updateElectronStatus('status', 'Found "Secure your allocation" page! Wait for beep sound, then select date and continue booking.')
        console.log('Found "Secure your allocation" page! Wait for beep sound, then select date and continue booking.')
        while (true) {
            await prepareAndCheckPage(page)
            while(true) {
                // Found date availability
                // Wait for the reset button to be pressed.
                updateElectronAvailable();
                await page.waitForTimeout(300);
                if (page.url().includes('/event/MIQ-DEFAULT-EVENT/accommodation') && reset) {
                    reset = false;
                    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                    break;
                }
            }

        }



    })();
}

async function login(page) {
    // this is not in use at the moment but might be used to prefill credentials

    await page.goto('https://allocation.miq.govt.nz/portal/login');

    await page.$eval('#username ', (el, email) => { el.value = email }, email); // replace YOUR_EMAIL_ADDRESS with your email address
    await page.$eval('#password ', (el, password) => { el.value = password }, password); // replace YOUR_PASSWORD with your password address

    await page.waitForNavigation({ waitUntil: ["networkidle0", "domcontentloaded"], timeout: 0})
}

async function prepareAndCheckPage(page) {
    //accessibility requirement
    await page.waitForSelector('#form_rooms_0_accessibilityRequirement_1');
    page.$eval('#form_rooms_0_accessibilityRequirement_' + (accessibilityRequirement ? 0 : 1), elem => {
        elem.checked = true;
    });

    page.$eval('#form_rooms_0_room', (elem, roomType) => {
        switch (roomType){
            case 'twin':
                elem.value = 'Twin share';
                break;
            default:
                elem.value = 'Double';
        }
    }, roomType);

    await page.waitForSelector('.flatpickr-input');

    if (await findAvailability(page)) {
        const status = "AVAILABLE! Found at: " + new Date().toLocaleString();
        console.log(status)
        updateElectronStatus('status-count', status);
        testDates = [];
    } else {
        // Remove the previous log message if we have checked before and we are running in node.
        if (process.stdout.moveCursor && checkedCount){
            process.stdout.moveCursor(0, -1) // up one line
            process.stdout.clearLine(1) // from cursor to end
        }

        const status = 'Checked MIQ: ' + ++checkedCount + ' times, last checked at: ' + new Date().toLocaleString();
        console.log(status);
        updateElectronStatus('status-count', status);
        await page.waitForTimeout(secondsTillRefresh * 1000);
        await page.reload({waitUntil: ["networkidle0", "domcontentloaded"]});
        await prepareAndCheckPage(page)
    }
}

async function findAvailability(page) {
    return await page.evaluate((myDates, testDates, findAnyDate, checkedCount) => {
        const calendarElem = document.getElementById('accommodation-calendar');
        const fp = calendarElem._flatpickr;
        if (testDates && testDates.length > 0 && checkedCount > 2) {
            fp.config.enable = testDates;
            calendarElem.setAttribute('data-arrival-dates', testDates.join("_"));
        }
        calendarElem.scrollIntoView();

        const dataArrivalDates = calendarElem.getAttribute('data-arrival-dates');
        const availableDates = dataArrivalDates.split('_');
        const matchingDates = availableDates.filter(d => myDates.indexOf(d) !== -1);
        const myMonths = [...new Set(myDates.filter(d => d.split('-').length === 2).map(d => d.split('-')[1]))].sort();
        const matchingMonths = availableDates.filter(d => myMonths.indexOf(d.split('-')[1]))
        if (matchingDates.length > 0 || matchingMonths.length > 1 || (findAnyDate && availableDates[0])) {
            const month = (findAnyDate ? availableDates[0] : matchingDates[0]).split('-')[1] - 1;
            fp.changeMonth(month, false)
            beep()
            return true;
        }

        return false;

        function beep() {
            var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
            snd.loop = true;
            snd.play();
        }
    }, myDates, testDates, findAnyDate, checkedCount)
}

function initElectron(ipcMain, window) {
    electronWindow = window;
    if (!ipcMain) return;
    ipcMain.on('settings', (ev, settings) => {
        myDates = settings.dates;
        accessibilityRequirement = settings.accessibilityRequirement;
        roomType = settings.roomType;
        findAnyDate = settings.findAnyDate;

        if (settings.reset) {
            reset = true;
        }
    });
}

function updateElectronStatus(channel, message) {
    if (!electronWindow) return;
    electronWindow.webContents.send(channel, { message: message })
}

function updateElectronAvailable() {
    if (!electronWindow) return;
    electronWindow.webContents.send('available', { available: true })
}

module.exports = service;