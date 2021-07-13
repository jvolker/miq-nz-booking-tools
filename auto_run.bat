rem you can only run this batch file if you have installed the dependencies all ready.  See below for the line to uncomment if you have not installed dependencies
echo on
rem In the line below, set the path to the location of your "MIQ-Booking-Assistance" folder that you downloaded
cd "C:\Users\MrBeenjammin\Documents\GitHub\miq-nz-booking-tools\MIQ-Booking-Assistance" 
rem uncomment the next line (by deleting the "rem" text) if you have not installed depedencies.  Comment the line after (add "rem" at the start of the line "npm start").  You will need to undo these changes and re-run the batch file once the dependencies are installed.
rem npm i
npm start
pause