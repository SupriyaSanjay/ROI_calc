function Calculate() {

				/************Main*************/
				var labeled_input = new Array();
				labeled_input = set_data(); // Set data

				// Live Music
				if ((labeled_input["Type"] == "Night Club, Promoter") || (labeled_input["Type"] == "Live Music")) {
					labeled_input["Type"] = 2;
					calculate_breakdown(labeled_input);
					display_live(labeled_input);
				}
				// University 
				else if (labeled_input["Type"] == "University") { 
					// dont change type because univ doesn't print social media 
					// social media() is only function that uses type
					calculate_breakdown(labeled_input); 
					display_univ(labeled_input);
				}
				// Festival
				else if (labeled_input["Type"] == "Festival") {
					labeled_input["Type"] = 4;
					calculate_breakdown(labeled_input);
					display_fest(labeled_input);
				}
				// Performing Arts 
				else if (labeled_input["Type"] == "Performing_Arts") {
					labeled_input["Type"] = 3;
					calculate_breakdown(labeled_input);
					display_all(labeled_input);
				}
				// General
				else {
					labeled_input["Type"] = 1;
					calculate_breakdown(labeled_input);
					display_all(labeled_input);
				}

				/***********Display Functions for All Venue Types ************/

				// Display_all: For General and PA venues, displays all fields. 
				function display_all(labeled_input) {
					// Holds all possible fields 
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Email-marketing","automation","donations","Social-Media"];

					// loop through all fields and print them
					for (var i = 0; i < 7; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						final_ROI.style.display = 'block';
						// Checks if email marketing option was 'none'
						if (i == 3 && labeled_input["Email_marketing"] == "None") {
							final_ROI.style.display = 'none';
						}	
					}			
				}
				//Display_Univ: For Universities, displays only select fields 
				function display_univ() {
					// Holds all fields, displays only first 4 
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","automation","Email-marketing","donations","Social-Media"];
					
					for (var i = 0; i < 7; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						if (i < 4) {
							final_ROI.style.display = 'block';
						}
						// Checks if email marketing option was 'none'
						else if (i == 3 && labeled_input["Email_marketing"] == "None") { 
							final_ROI.style.display = 'none';
						}
						else {
							final_ROI.style.display = 'none';	
						}
					}							
				}
				// Display_fest: For Festivals, displays only select fields 
				function display_fest() {
					// Holds all fields, displays only first 5
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Social-Media", "Email-marketing", "donations","automation"];
					
					for (var i = 0; i < 7; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						if (i < 5) {
							final_ROI.style.display = 'block';
							// Checks if email marketing option was 'none'
							if (i == 4 && labeled_input["Email_marketing"] == "None") {
								final_ROI.style.display = 'none';
							}
						}
						else {
							final_ROI.style.display = 'none';	
						}	
					}
				}
				// Display_live: For live music venues, displays only select fields
				function display_live() {
					// Holds all fields, only displays first 4
					var element_ID = ["Total-ROI","Ticket-Sales","Social-Media","Email-marketing","donations","automation","Online-Sales"];
					
					for (var i = 0; i < 7; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						if (i < 4) {
							final_ROI.style.display = 'block';
							// Checks if email marketing option was 'none'
							if (i == 3 && labeled_input["Email_marketing"] == "None") {
							final_ROI.style.display = 'none';
							}
						}
						else {
							final_ROI.style.display = 'none';	
						}
					}
				}
				// Get data inputted and put in a labeled input array.
				function set_data() {
					// Array of fields that will be used as labels
					var num_fields = 6;
					var fields = ["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage", "Email_marketing"];
					var input = new Array()
					// Loop through document, get inputs and put in labeled array 
					for (i = 0; i < num_fields; i++) {
						var field_input = document.getElementById("Revenue")
						if (i > 0 && i < 4) {
							input[fields[i]] = accounting.unformat(field_input.elements[i].value);
						}
						else {
							input[fields[i]] = field_input.elements[i].value;	
						}				
					}
					return input;
				}
				/*******************************************************/
				
				// Calculate_breakdown: Fill in ROI_breakdown array with values, call helpers.
				function calculate_breakdown(labeled_input) {

					ROI_breakdown = new Array(); // Holds separate aspects of ROI breakdown 
					var Total_ROI = 0.0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = accounting.formatMoney(ROI_breakdown["Ticket_Sales"]);
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
					document.getElementById("Automation").textContent = accounting.formatMoney(ROI_breakdown["Automation"]);
					Total_ROI += ROI_breakdown["Automation"];


					ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
					document.getElementById("Social_Media").textContent = accounting.formatMoney(ROI_breakdown["Social_Media"]);
					Total_ROI += ROI_breakdown["Social_Media"];

					ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .80);
					document.getElementById("Online_Sales").textContent = accounting.formatMoney(ROI_breakdown["Online_Sales"]);
					Total_ROI += ROI_breakdown["Online_Sales"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = accounting.formatMoney(ROI_breakdown["Email_marketing"]);
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Donations"] = donations(labeled_input["TPY"]);
					document.getElementById("Donations").textContent = accounting.formatMoney(ROI_breakdown["Donations"]);
					Total_ROI += ROI_breakdown["Donations"];

					ROI_breakdown["Total"] = accounting.formatMoney(Total_ROI);
					document.getElementById("Total_ROI").textContent = ROI_breakdown["Total"];
				}

				/************* Helper functions to calculate ROI ***********/

				// Helper function: Calculates ROI from ticket sales
				function ticket_sales(orig_ROI) {
					return .16 * orig_ROI;
				}
				// Helper function: Calculates hours saved from automation
				function automation(wage, hrs_saved) {
					return hrs_saved * wage * 52; 
				}
				// Helper function: Calculates ROI from social media
				function social_media(TPY, type) {
					if ((type == 2) || (type == 1) || (type == 4)) {
						return (TPY * (4.49 + 2.29));
					}
					else if (type == 3) {
						return (TPY * (4.01 + 0.72));
					}
				}
				// Helper function: Calculates ROI from online sales, because of fee
				function online_sales(TPY, TPrice, rate){
					//tickets sold online have acceptable fee of $6.03
					return (rate * TPY) * (TPrice + 6.03);
				}
				// Helper function: Calculates money saved from email marketing manager
				function marketing(email_marketing, TPY){
					// 1 = Mailchimp 2 = Constant contact 3 = None """
					if (email_marketing == "Mailchimp") {
						if (TPY > 15000) {
					 		return 12 * 199.0;
						}
						else {
							return 12 * 10.0;
						}
					} 
					else if (email_marketing == "Constant Contact") {
						if (TPY <= 5000) {
							return 12 * 95.0;
						}
						else { 
							return 12 * 125.0;
						}
					}
					else {
						return 0;
					}
				}
				// Helper functions: Calculates money saved from donations manager 
				function donations(TPY){
					if (TPY <= 2000) { 
						return 12 * 99.0;
					}
					else if (2000 < TPY <= 5000) {
						return 12 * 199.0;
					}
					else if (5000 < TPY <= 15000) {
						return 12 * 299.0;
					}
					else {
						return 12 * 399.0;
					}
				}
		}