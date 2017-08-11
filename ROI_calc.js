// 
function extra_questions(venue_type) {

	var RFID = document.getElementById("RFIDs");
	var donate = document.getElementById("donate");

	if (venue_type == "Festival") {
		RFID.style.display = 'block';
		RFID_res = true;
	}
	else {
		RFID.style.display = 'none';
	}
	if (venue_type == "Performing Arts") {
		donate.style.display = 'block';
		donate_res = true;
	}
	else {
		donate.style.display = 'none';
	}
}

var labeled_input = new Array();


// called onclick of Calculate
// stores input, calculates the breakdown for each
// aspect of ROI, calls helper functions. Returns
// labeled input and displays total. 
function Calculate() {
				// Set and label inputted data
				labeled_input = set_data(); 
				if (labeled_input == -1) { // Check to make sure fields weren't empty
					return;
				}
				//Parse venue types, call corresponding calculate and display functions
				// Live Music
				if ((labeled_input["Type"] == "Night Club, Promoter") || (labeled_input["Type"] == "Live Music")) {
					labeled_input["Type"] = 2;
					calculate_breakdown(labeled_input);
					display_total(labeled_input);
				}
				// University 
				else if (labeled_input["Type"] == "University") { 
					// dont change type because univ doesn't print social media 
					// social media() is only function that uses type
					labeled_input["Type"] = 5;
					calculate_breakdown(labeled_input); 
					display_total(labeled_input);
				}
				// Festival
				else if (labeled_input["Type"] == "Festival") {
					labeled_input["Type"] = 4;
					calculate_breakdown(labeled_input);
					display_total(labeled_input);
				}
				// Performing Arts 
				else if (labeled_input["Type"] == "Performing Arts") {
					console.log("changing type to PA");
					labeled_input["Type"] = 3;
					calculate_breakdown(labeled_input);
					display_total(labeled_input);
				}
				// General
				else {
					labeled_input["Type"] = 1;
					calculate_breakdown(labeled_input);
					display_total(labeled_input);
				}

				return labeled_input;
}

// set_data: Gets data inputted and sets it in a labeled input array. Validates user input
function set_data() {
	// Array of fields that will be used as labels
	//var num_fields = 8;
	var fields = ["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage", "Email_marketing","donations","RFID"];
	var input = new Array();

	for (i = 0; i < fields.length; i++) {
		var field_input = document.getElementById("Revenue")
		
		// Check that all fields are filled in
		if (!field_input.elements[i].value) {
			alert("Please fill in all fields");
			return -1;
		}

		if (i > 0 && i < 4) { // For fields with currency 
			input[fields[i]] = accounting.unformat(field_input.elements[i].value);
		}
		else if (i == 6) {
			if (document.getElementById("donate_y").checked) {
				input[fields[i]] = true;
			}
			else {
				input[fields[i]] = false; 
			}
		}
		else if (i == 7) {
			if (document.getElementById("rfid_y").checked) {
				input[fields[i]] = true;
			}
			else {
				input[fields[i]] = false; 
			}
		}	
		else {
			input[fields[i]] = field_input.elements[i].value;
		}	
	}
	
	return input;
}

// calculate_breakdown: Fill in ROI_breakdown array with values, call helpers.
function calculate_breakdown(labeled_input) {

	ROI_breakdown = new Array(); // Holds separate aspects of ROI breakdown 
	var Total_ROI = 0.0;

	ROI_breakdown["Ticket_Sales"] = ticket_sales(labeled_input["orig_ROI"]);
	document.getElementById("Ticket_Sales").textContent = accounting.formatMoney(ROI_breakdown["Ticket_Sales"]);
	Total_ROI += ROI_breakdown["Ticket_Sales"];

	if (labeled_input["Type"] != 5 || labeled_input["Type"] != 4 || 
		labeled_input["Type"] != 2) { // If not Live Music, Fest, or University 
		ROI_breakdown["Automation"] = automation(labeled_input["Employee_wage"], 10);
		document.getElementById("Automation").textContent = accounting.formatMoney(ROI_breakdown["Automation"]);
		Total_ROI += ROI_breakdown["Automation"];
	}	

	ROI_breakdown["Social_Media"] = social_media(labeled_input["TPY"], labeled_input["Type"]);
	document.getElementById("Social_Media").textContent = accounting.formatMoney(ROI_breakdown["Social_Media"]);
	Total_ROI += ROI_breakdown["Social_Media"];

	ROI_breakdown["Online_Sales"] = online_sales(labeled_input["TPY"], labeled_input["TPrice"], .20);
	document.getElementById("Online_Sales").textContent = accounting.formatMoney(ROI_breakdown["Online_Sales"]);
	Total_ROI += ROI_breakdown["Online_Sales"];

	ROI_breakdown["Email_marketing"] = marketing(labeled_input["Email_marketing"], labeled_input["TPY"]);
	document.getElementById("Email_marketing").textContent = accounting.formatMoney(ROI_breakdown["Email_marketing"]);
	Total_ROI += ROI_breakdown["Email_marketing"];


	if (labeled_input["Type"] == 3 && labeled_input["donations"] == true) { // If using software for donations
		console.log("about to write to donations id");
		ROI_breakdown["Donations"] = donations(labeled_input["TPY"]);
		document.getElementById("Donations").textContent = accounting.formatMoney(ROI_breakdown["Donations"]);
		Total_ROI += ROI_breakdown["Donations"];
	}

	if (labeled_input["Type"] == 4 && labeled_input["RFID"] == true) { // If Festival
		ROI_breakdown["Fest_extras"] = fest_extras();
		document.getElementById("Fest_extras").textContent = accounting.formatMoney(ROI_breakdown["Fest_extras"]);
		Total_ROI += ROI_breakdown["Fest_extras"];
	} 

	ROI_breakdown["Total"] = accounting.formatMoney(Total_ROI);
	document.getElementById("Total_ROI").textContent = ROI_breakdown["Total"];
}

//Display Functions for All Venue Types 
function display_total(labeled_input) {
	
	var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Social-Media", "Email-marketing","Fest-extras","donations","automation"];
	for (var i = 0; i < 8; i++) {
		
		var final_ROI = document.getElementById(element_ID[i]);
		if (i == 0) {
			final_ROI.style.display = 'block';
		}
		else {
			final_ROI.style.display = 'none';	
		}
	}
}

//HELPER FUNCTIONS to help calculate extras
// fest_extras: any extra perks Vendini offers for fests
function fest_extras() {
	//Vendini's RFID activation is 4800 less than competitors
	return 4800.00; 
}			
// ticket_sales: Calculates ROI from ticket sales
function ticket_sales(orig_ROI) {
	return .04 * orig_ROI;
}
// automation: Calculates hours saved from automation
function automation(wage, hrs_saved) {
	return hrs_saved * wage * 52; 
}
// social_media: Calculates ROI from social media
function social_media(TPY, type) {
	TPY = TPY * .81 // 81% of Americans use social media
	if ((type == 2) || (type == 1) || (type == 4)) {
		return (TPY * (4.49 + 2.29));
	}
	else if (type == 3 || type == 5) {
		return (TPY * (4.01 + 0.72));
	}
}
// online_sales: Calculates ROI from online sales, because of fee
function online_sales(TPY, TPrice, rate){
	//tickets sold online add 1.25
	return (rate * TPY) * (TPrice + 1.25);
}
// marketing: Calculates money saved from email marketing manager
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
// donations: Calculates money saved from donations manager 
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


// Called onclick of "break it down"
// Displays correct factors for each type of venue
function display_rest() { 

	// Save labeled inputs, parse types
	//labeled_input = new Array();
	//labeled_input = Calculate();

	// Live Music
	if (labeled_input["Type"] == 2) {
		display_live(labeled_input);
	}
	// University 
	else if (labeled_input["Type"] == 5) { 
		display_univ(labeled_input);
	}
	// Festival
	else if (labeled_input["Type"] == 4) {
		console.log("about to print fest");
		display_fest(labeled_input);
	}
	// Performing Arts 
	else if (labeled_input["Type"] == 3) {
		display_all(labeled_input);
	}
	// General
	else {
		console.log("is this happening?");
		display_all(labeled_input);
	}

}

// DISPLAY FUNCTIONS: Display the correct factors for each venue 
// Display_all: For General and PA venues, displays all fields. 
function display_all(labeled_input) {
	// Holds all possible fields 
	var element_ID = ["Ticket-Sales","Online-Sales","Email-marketing","automation","donations","Social-Media","Fest-extras"];

	for (var i = 0; i < 7; i++) {

		var final_ROI = document.getElementById(element_ID[i]);
		final_ROI.style.display = 'block';
		// Checks if email marketing option was 'none'
		if (i == 2 && labeled_input["Email_marketing"] == "None") {
			final_ROI.style.display = 'none';
		}
		else if (i == 4 && labeled_input["donations"] == false) {
			console.log("not displaying donations");
			final_ROI.style.display = 'none';
		}
		else if (i == 6) { //Fest_extras should not be displayed
			final_ROI.style.display = 'none';
		}	
	}			
}

//Display_Univ: For Universities, displays only select fields 
function display_univ(labeled_input) {
	// Holds all fields, displays only first 4 
	var element_ID = ["Ticket-Sales","Online-Sales","automation","Email-marketing","Social-Media","donations","Fest-extras"];	
	
	for (var i = 0; i < 7; i++) {
		var final_ROI = document.getElementById(element_ID[i]);

		if (i < 5) {
			final_ROI.style.display = 'block';
			// Checks if email marketing option was 'none'
			if (i == 3 && labeled_input["Email_marketing"] == 'None') { 
				final_ROI.style.display = 'none';
			}
		}
		else {
			final_ROI.style.display = 'none';	
		}
	}							
}

// Display_fest: For Festivals, displays only select fields 
function display_fest(labeled_input) {
	// Holds all fields, displays only first 5
	var element_ID = ["Ticket-Sales","Online-Sales","Social-Media", "Email-marketing","Fest-extras","donations","automation"];
					
		for (var i = 0; i < 7; i++) {
			var final_ROI = document.getElementById(element_ID[i]);
			if (i < 5) {
				final_ROI.style.display = 'block';
				// Checks if email marketing option was 'none'
				if (i == 3 && labeled_input["Email_marketing"] == "None") {
					final_ROI.style.display = 'none';
				}
				else if (i == 4 && labeled_input["RFID"] == false) {
					final_ROI.style.display = 'none';
				}
			}
			else {
				final_ROI.style.display = 'none';	
			}	
		}
}
// Display_live: For live music venues, displays only select fields
function display_live(labeled_input) {
	// Holds all fields, only displays first 4
	var element_ID = ["Ticket-Sales","Social-Media","Email-marketing","Online-Sales","donations","automation","Fest-extras"];
					
		for (var i = 0; i < 7; i++) {

			var final_ROI = document.getElementById(element_ID[i]);
			if (i < 4) {
				final_ROI.style.display = 'block';
				// Checks if email marketing option was 'none'
				if (i == 2 && labeled_input["Email_marketing"] == "None") {
					final_ROI.style.display = 'none';
				}
			}
			else {
				final_ROI.style.display = 'none';	
			}
		}
}

