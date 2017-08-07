function Calculate() {

				var labeled_input = new Array();
				labeled_input = set_data(); // Set data
				venue_type = parse_input(labeled_input); // Parse types of venues
				if (venue_type == "Live_Music") {
					display_live();
				}
				else if (venue_type == "University") {
					display_univ();
				}
				else if (venue_type == "Festival") {
					display_fest();
				}
				else if (venue_type == "General") {
					display_all();
				}

				function display_all() {
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Email-marketing","automation","donations","Social-Media"];
					for (var i = 0; i < 7; i++) {

						var final_ROI = document.getElementById(element_ID[i]);
						if (final_ROI.style.display == 'none') {
							final_ROI.style.display = 'block';
						}
						else {
							final_ROI.style.display = 'none';
						}	
					}			
				}

				function display_univ() {
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","automation"];
					for (var i = 0; i < 4; i++) {

						var final_ROI = document.getElementById(element_ID[i]);
						if (final_ROI.style.display == 'none') {
							final_ROI.style.display = 'block';
						}
						else {
							final_ROI.style.display = 'none';
						}	
					}
				}

				function display_fest() {
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Social-Media", "Email-marketing"];
					for (var i = 0; i < 5; i++) {

						var final_ROI = document.getElementById(element_ID[i]);
						if (final_ROI.style.display == 'none') {
							final_ROI.style.display = 'block';
						}
						else {
							final_ROI.style.display = 'none';
						}	
					}
				}

				function display_live() {

					var element_ID = ["Total-ROI","Ticket-Sales","Social-Media","Email-marketing"];
					for (var i = 0; i < 4; i++) {

						var final_ROI = document.getElementById(element_ID[i]);
						if (final_ROI.style.display == 'none') {
							final_ROI.style.display = 'block';
						}
						else {
							final_ROI.style.display = 'none';
						}	
					}
				}

				// Get data inputted and put in a labeled input array.
				function set_data() {

					var num_fields = 6;
					var fields = ["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage", "Email_marketing"];
					var input = new Array()

					for (i = 0; i < num_fields; i++) {
						input[fields[i]] = document.getElementById("Revenue").elements[i].value;
					}

					return input;
				}

				//Parses inputs for type of venue
				function parse_input(labeled_input) {

					if ((labeled_input["Type"] == "Night Club, Promoter") || (labeled_input["Type"] == "Live Music")) {

						labeled_input["Type"] = 2;
						Live_Music(labeled_input);
						return "Live_Music";

					}
					else if (labeled_input["Type"] == "Performing Arts") {

						labeled_input["Type"] = 3;
						Performing_Arts(labeled_input);
						return "Performing_Arts";
					}
					else if (labeled_input["Type"] == "Festival") {

						labeled_input["Type"] = 4;
						Festival(labeled_input);
						return "Festival";
					}
					else if (labeled_input["Type"] == "University") {

						labeled_input["Type"] = 5;
						University(labeled_input);
						return "University";
					}
					else {

						labeled_input["Type"] = 1;
						General(labeled_input);	
						return "General";					
					}
				}
				
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

					//tickets sold online sell for 6.3% higher 
					return (rate * TPY) * (TPrice * .063);

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

				// General: Fill in ROI_breakdown array with values, call helpers.
				function General(labeled_input) {

					ROI_breakdown = new Array();
					var Total_ROI = 0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = ROI_breakdown["Ticket_Sales"];
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
					document.getElementById("Automation").textContent = ROI_breakdown["Automation"];
					Total_ROI += ROI_breakdown["Automation"];


					ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
					document.getElementById("Social_Media").textContent = ROI_breakdown["Social_Media"];
					Total_ROI += ROI_breakdown["Social_Media"];

					ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .80);
					document.getElementById("Online_Sales").textContent = ROI_breakdown["Online_Sales"];
					Total_ROI += ROI_breakdown["Online_Sales"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = ROI_breakdown["Email_marketing"];
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Donations"] = donations(labeled_input["TPY"]);
					document.getElementById("Donations").textContent = ROI_breakdown["Donations"];
					Total_ROI += ROI_breakdown["Donations"];

					ROI_breakdown["Total"] = Total_ROI;
					document.getElementById("Total_ROI").textContent = Total_ROI;
				}

				function Performing_Arts(labeled_input) {

					ROI_breakdown = new Array();
					var Total_ROI = 0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = ROI_breakdown["Ticket_Sales"];
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
					document.getElementById("Automation").textContent = ROI_breakdown["Automation"];
					Total_ROI += ROI_breakdown["Automation"];


					ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
					document.getElementById("Social_Media").textContent = ROI_breakdown["Social_Media"];
					Total_ROI += ROI_breakdown["Social_Media"];

					ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .80);
					document.getElementById("Online_Sales").textContent = ROI_breakdown["Online_Sales"];
					Total_ROI += ROI_breakdown["Online_Sales"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = ROI_breakdown["Email_marketing"];
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Donations"] = donations(labeled_input["TPY"]);
					document.getElementById("Donations").textContent = ROI_breakdown["Donations"];
					Total_ROI += ROI_breakdown["Donations"];

					ROI_breakdown["Total"] = Total_ROI;
					document.getElementById("Total_ROI").textContent = Total_ROI;
				}

				function University(labeled_input) {

					ROI_breakdown = new Array();
					var Total_ROI = 0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = ROI_breakdown["Ticket_Sales"];
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
					document.getElementById("Automation").textContent = ROI_breakdown["Automation"];
					Total_ROI += ROI_breakdown["Automation"];

					ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .80);
					document.getElementById("Online_Sales").textContent = ROI_breakdown["Online_Sales"];
					Total_ROI += ROI_breakdown["Online_Sales"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = ROI_breakdown["Email_marketing"];
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Total"] = Total_ROI;
					document.getElementById("Total_ROI").textContent = Total_ROI;
				}

				function Festival(labeled_input) {

					ROI_breakdown = new Array();
					var Total_ROI = 0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = ROI_breakdown["Ticket_Sales"];
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
					document.getElementById("Social_Media").textContent = ROI_breakdown["Social_Media"];
					Total_ROI += ROI_breakdown["Social_Media"];

					ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .80);
					document.getElementById("Online_Sales").textContent = ROI_breakdown["Online_Sales"];
					Total_ROI += ROI_breakdown["Online_Sales"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = ROI_breakdown["Email_marketing"];
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Total"] = Total_ROI;
					document.getElementById("Total_ROI").textContent = Total_ROI;
				}

				function Live_Music(labeled_input) {

					ROI_breakdown = new Array();
					var Total_ROI = 0;

					ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
					document.getElementById("Ticket_Sales").textContent = ROI_breakdown["Ticket_Sales"];
					Total_ROI += ROI_breakdown["Ticket_Sales"];

					ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
					document.getElementById("Automation").textContent = ROI_breakdown["Automation"];
					Total_ROI += ROI_breakdown["Automation"];

					ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
					document.getElementById("Social_Media").textContent = ROI_breakdown["Social_Media"];
					Total_ROI += ROI_breakdown["Social_Media"];

					ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
					document.getElementById("Email_marketing").textContent = ROI_breakdown["Email_marketing"];
					Total_ROI += ROI_breakdown["Email_marketing"];

					ROI_breakdown["Total"] = Total_ROI;
					document.getElementById("Total_ROI").textContent = Total_ROI;
				}

			
		}