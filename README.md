#ROI_calc

~~~~~~~~~~~~~~~~~~~~~~~Overview~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Inputs are read into the labeled_inputs array, where indices are:
["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage", "Email_marketing"] by 
set_data() and the final array is returned.

The types are then parsed and categorized into 5 larger categories. The
mapping is as such: 
-----General-----				
Arena, Conference Center/Expo
Casino
Fair, Attraction, Rodeo
K-12
Comedy, Mixed Use Venue
Museum, Tours
Other
Professional Sports

----Live Music---
Live Music
Night Club, Promoter

---Festival---
Festival

---University--
University 

According to the type, the calculate breakdown function is called
and the corresponding display function. 

The different display functions are used for different types of
venues. Since varying venues are concerned with different factors that
could contribute to ROI, such as donations or social media. Thus, the 
different functions specify which factors should be printed and which 
should not. 

The helper functions take certain parameters such as TPY, ticket price, 
or rates specific to member statistics. The functions then do specific 
calculations and return the amount of money saved or increase in ROI 
that the specific factor would have. 

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

