# MIQ Booking Assistance

[![Sponsoring][sponsor-badge]][sponsor-url]

## App

*This is the recommended way for most people and doesn't require any coding skills*

**Features**  
This is an electron application that runs the same script below to check for MIQ spots.

**Usage**  
Register a booking using your regular browser (Firefox, Chrome, etc.) before starting this process.

1. [Download](https://github.com/monagjr/miq-nz-booking-tools/releases/latest) the application
2. Log in.
3. Click on the `View` button of your booking slot.
4. Click on the `Secure your allocation` button.
6. Wait for the beep sound (make sure your speakers are not muted)
7. Quickly book your spot (confirm the selected date is what you want, tick the reCAPTCHA and click ‘Next’ to secure your spot) on the same page. Alternatively, refresh the page to turn off the alarm.

---

**Development/Builds**
1. Install [Node.js](https://nodejs.org/en/download/)
2. Open a command-line window and navigate to the `MIQ-Booking-Assistance` folder and run `npm i` to install all dependencies.
3. `npm run make` will build the electron application, it outputs it in `out` folder.

## Command-line script 

**Features**  
This is a script based on [Puppeteer](https://github.com/puppeteer/puppeteer) that opens a browser window and continuously refreshes the ‘Secure your allocation’ page and beeps when new dates become available.This is designed to save precious seconds when trying to book a spot. All manual input required is to select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot.

*This is allows all kinds of customizations but requires coding skills.*

**Install**
1. Install [Node.js](https://nodejs.org/en/download/)
2. Open a command-line window and navigate to the `MIQ-Booking-Assistance` folder and run `npm i` to install all dependencies.

**Usage**  
Register a booking using your regular browser (Firefox, Chrome, etc.) before starting this process. 

1. run `npm start` to start the script. 
2. Log in.
3. Click on the `View` button of your booking slot.
4. Click on the `Secure your allocation` button.
5. The script automatically preselects "No" for the disability question. It finds availabilities only in the month selected in the code. 
6. Wait to hear a beep when dates become available. Keep the window at maximum size.
7. Quickly book your spot (select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot) on the same page. Alternatively, refresh the page to turn off the alarm. 
8. You can close the script/window by pressing CTRL + C on the command line.

*These defaults can be changed at the top of the file `miq-assistance.js` under `MIQ-Booking-Assistance` folder. Customization is limited to those options at this stage but can be achieved by extending the script.*

[sponsor-badge]: https://img.shields.io/badge/-Support%20this!-blue?style=flat-square
[sponsor-url]: https://www.buymeacoffee.com/mojr
