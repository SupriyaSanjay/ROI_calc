#ROI_calc
Supriya Sanjay
9.8.17
~~~~~~~~~~~~~~~~~~~~~~~Overview~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Venue is categorized under one of the 5 larger verticals. 

-----General (1)-----				
Arena, Conference Center/Expo
Casino
Fair, Attraction, Rodeo
K-12
Comedy, Mixed Use Venue
Museum, Tours
Other
Professional Sports

----Live Music (2)---
Live Music
Night Club, Promoter

----Performing Arts (3)--
Performing Arts 

---Festival (4)---
Festival

---University (5)--
University 

Depending on larger vertical , different aspects of the ROI are displayed. 
This is because varying venues are concerned with different factors that
could contribute to ROI, such as donations or social media.  
-----------
General: All
Performing Arts: All
University: Ticket Sales, Online Sales, Automation, Email marketing, Social Media
Festival: Ticket Sales, Online Sales, Social Media, Email Marketing, Festival extras
Live Music: Ticket Sales, Online Sales, Email Marketing, Social Media 
-----------

ROI calculations for each of the above categories is calculated based on
data taken from Vendini members. The numbers from all categories are then 
summed and displayed as the total. 

 
~~~~~~~~~~Sources of data used in specific functions~~~~~~~~~~~~~~~~~
Ticket Sales: 16% increase in revenue seen over 4 years in Thalian Hall

Automation: Hours saved (parameter) is standardized to 10, Thalian Hall
saw box office hours cut by more than 10 hours/weekly 

Social Media: Monetary values of shares and likes on Facebook and Twitter
for Music/Concerts and Performing Arts Venues. Data from Hubspot. Music/Concert
applies to General, Live Music, and Festival. Performing Arts applies to only
Performing Arts venues. 

Marketing: Email Marketing numbers taken from Mailchimp and Constant Contact websites.
TPY used to roughly determine # of records --> price of email marketing solution.

Donations: Donations numbers taken from Bloomerang's website. TPY used to determine
# of records ---> price of solution. 

Online Sales: Online tickets are sold with a 1.25 fee. 

~~~~~~~~~~~~~~~Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~
Calculate: Driver for initial Calculate button. Returns labeled input.
Inputs data into labeled array, parses type and assigns to one of 5 larger
verticals (General, Live Music, University, Festival, Performing Arts). 
Then calculates ROI and displays total.

set_data: Takes input, puts in labeled array. Checks to make sure all 
fields are filled, unformats numbers in currency form. 

calculate_breakdown: Takes the labeled input. Calls
helper functions and passes in rates/stats for calculations. Only 
calls functions based off types. Totals the ROIs. 

display_total: Displays total ROI, disappears the other factors. 

The helper functions take certain parameters such as TPY, ticket price, 
or rates specific to member statistics. The functions then do specific 
calculations and return the amount of money saved or increase in ROI 
that the specific factor would have.

display_rest: Driver for Break it down button. Calls Calculate() 
to get the labeled input, then parses it and calls specific display
functions. 

Display functions: All have an array of element_IDs, which hold the
IDs for all possible factors of the ROI breakdown. Each function 
loops through and prints only the necessary factors for each type. 