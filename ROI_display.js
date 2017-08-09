function display_rest() { 
					import {Calculate} from 'ROI_calc'
					labeled_input = new Array();
					labeled_input = Calculate();
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
						display_fest(labeled_input);
					}
					// Performing Arts 
					else if (labeled_input["Type"] == 3) {
						display_all(labeled_input);
					}
					// General
					else {
						display_all(labeled_input);
					}

				}
				// Display_all: For General and PA venues, displays all fields. 
				function display_all(labeled_input) {
					// Holds all possible fields 
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Email-marketing","automation","donations","Social-Media","Fest-extras"];

					// loop through all fields and print all but Fest-extras 
					for (var i = 0; i < 8; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						final_ROI.style.display = 'block';
						// Checks if email marketing option was 'none'
						if (i == 3 && labeled_input["Email_marketing"] == "None") {
							final_ROI.style.display = 'none';
						}
						else if (i == 7) { //Fest_extras should not be displayed
							final_ROI.style.display = 'none';
						}	
					}			
				}
				//Display_Univ: For Universities, displays only select fields 
				function display_univ(labeled_input) {
					// Holds all fields, displays only first 4 
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","automation","Email-marketing","donations","Social-Media","Fest-extras"];
					
					for (var i = 0; i < 8; i++) {
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
				function display_fest(labeled_input) {
					// Holds all fields, displays only first 5
					var element_ID = ["Total-ROI","Ticket-Sales","Online-Sales","Social-Media", "Email-marketing","Fest-extras","donations","automation"];
					
					for (var i = 0; i < 8; i++) {
						var final_ROI = document.getElementById(element_ID[i]);
						if (i < 6) {
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
				function display_live(labeled_input) {
					// Holds all fields, only displays first 4
					var element_ID = ["Total-ROI","Ticket-Sales","Social-Media","Email-marketing","donations","automation","Online-Sales","Fest-extras"];
					
					for (var i = 0; i < 8; i++) {
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
