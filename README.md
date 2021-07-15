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

## MIQ Booking Assistance

*This is the recommended way for most people and doesn't require any coding skills*

**Features**  
This script/app opens a browser window and continuously refreshes the ‘Secure your allocation’ page and beeps when new dates become available. It prefills the form to save precious seconds when trying to book a spot. All manual input required is to select the available date, tick the reCAPTCHA and click ‘Next’ to secure your spot.

[read more](https://github.com/jvolker/miq-nz-booking-tools/blob/master/MIQ-Booking-Assistance/README.md)

## MIQ Alert

*This is a different approach. It doesn't offer as many features and is therefore not used by as many people. No coding skills required.*

**Features**  
This is a Chrome browser extension that continuously refreshes the MIQ portal home page and beeps when new dates become available.

[Download](https://github.com/jvolker/miq-nz-booking-tools/releases/latest)

[read more](https://github.com/jvolker/miq-nz-booking-tools/blob/master/MIQ-Alert/README.md)
## FAQ

> I'm lost.

This project lives on Github a place where a lot of open-source projects are stored. On Github you can download the code of a project using the large and green `Code` button on the top (then click `Download ZIP`). Once you downloaded the code follow the guides from the top. If you have questions use the `Issues` section on the top.

_If anyone would like to create a screencast video with a walkthrough, I will be very happy to add it to this document._

> I have another question not answered here yet.

If you have questions, feel free to use the `Issues` section (select at the top of this page). Asking publicly will help others with a similar question and you might get help from more people.

> I’m getting a ‘502 Bad Gateway Error’. What should I do? 

This wil happen after the website has refreshed many times. Please wait 5-10 minutes and reactivate the plug in.

> How much time to I have to book a spot?

It seems less than 10 seconds. This might vary though.

**MIQ booking assistance only:**
> What if I require other options to be selected from ‘Double’ room and ‘No’ for the disability question? 

These settings are hardcoded. You can change them in the `index.js` script.
