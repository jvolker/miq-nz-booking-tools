# New Zealand MIQ (Managed Isolation and Quarantine) Tools

These tools were designed to make it easier to book a spot in New Zealand Managed Isolation and Quarantine. This should mainly help you save your precious time and not have to manually refresh the website until you find one of the rare spots.

**HELP OTHERS:**  
These tools will give you an advantage in booking a spot on New Zealand MIQ over other people not using tools like this one. Please keep in mind that your advantage in using this tool will make it harder for others, not using a helper tool, to get a spot. Please help others to get started with these tools, so everyone gets an equal chance. 

There are several media reports on the existence of multiple similar tools, but when these tools were created none of them seemed to be published publicly. Hopefully, by publishing, it's going to be fairer for everyone. 

Of course, hopefully, MIQ changes their website and implements and queue. Then these scripts would become obsolete and no one will have to bother with this.

## Disclaimer

Before using this software, make sure you are not violating the terms of service of the MIQ website. And know you are using this software at your own risk. 

## Contributions

These tools are only a quick attempt to create some remedy. They are by far, not finished or perfect. Also, in case MIQ changes their website, they might break any time too. 

Please use the issue section to help each other using this or discuss improvements. Of course, pull requests are welcome too.

## 1. MIQ Alert

**Features**  
This is a Chrome browser extension that continuously refreshes the MIQ portal home page and beeps when new dates become available.

*This is easier to use. No coding skills required.*

**Install**
1. Open this URL in Chrome: `chrome://extensions/`.
2. Activate `Developer Mode` on this page.
3. Click `Load Unpacked` choose the MIQ-Alert folder to add the extension.

**Usage**
1. Open the MIQ portal: `https://allocation.miq.govt.nz/portal/`.
2. (Click puzzle icon to see all extensions in top-right corner.)
3. Click on the yellow circle in the top-right corner.
4. Wait to hear a beep when dates become available. Keep the window at maximum size, don’t switch to another window.
5. Quickly book your spot using a separate browser (Firefox, Safari, Edge, …) where you are logged in already.

## 2. MIQ Booking Assistance

**Features**  
This is a script based on [Puppeteer](https://github.com/puppeteer/puppeteer) that opens a browser window and continuously refreshes the ‘Secure your allocation’ page and beeps when new dates become available. It defaults to "Double" room option and "No" for the disability question. This is designed to save precious seconds when trying to book a spot. All manual input required is to select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot.

*This is more unfinished and probably requires some coding skills.*

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

*These defaults can be changed in the code (line 48 and 58). Customization is limited to those options at this stage but can be achieved by extending the script.*

## FAQ

> I’m getting a ‘502 Bad Gateway Error’. What should I do? 

This wil happen after the website has refreshed many times. Please wait 5-10 minutes and reactivate the plug in.

> How much time to I have to book a spot?

It seems less than 10 seconds. This might vary though.

**MIQ booking assistance only:**
> What if I require other options to be selected from ‘Double’ room and ‘No’ for the disability question? 

These settings are hardcoded. You can change them in the `index.js` script.
