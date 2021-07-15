# MIQ Booking Assistance

## Electron application (currently in progress)

**Features**  
This is an electron application that runs the same script below to check for MIQ spots.

*This is the recommended way for most people and doesn't require any coding skills*

**Install**
1. Install [Node.js](https://nodejs.org/en/download/)
2. Open a command-line window and navigate to the `MIQ-Booking-Assistance` folder and run `npm i` to install all dependencies.
3. `npm run make` will build the electron application, it outputs it in `out` folder.

**Usage**  
Register a booking using your regular browser (Firefox, Chrome, etc.) before starting this process.

1. Run the application that was built in `out`
2. Log in.
3. Click on the `View` button of your booking slot.
4. Click on the `Secure your allocation` button.
5. Change your preference for room type, month etc. from the settings window that also opens
6. Wait to hear a beep when dates become available. Keep the window at maximum size.
7. Quickly book your spot (select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot) on the same page. Alternatively, refresh the page to turn off the alarm.

# Command-line script 

**Features**  
This is a script based on [Puppeteer](https://github.com/puppeteer/puppeteer) that opens a browser window and continuously refreshes the ‘Secure your allocation’ page and beeps when new dates become available. It defaults to "Double" room option and "No" for the disability question. This is designed to save precious seconds when trying to book a spot. All manual input required is to select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot.

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