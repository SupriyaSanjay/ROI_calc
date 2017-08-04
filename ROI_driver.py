""" Const for number of fields to enter """
NUM_FIELDS = 6

""" Get data: prompts users for data and saves results in array of integers """ 
def get_data(): 

	""" Statements to be Printed """ 
	Print_statements = []

	Print_statements.append("""
	Choose one of the following types, by corresponding number: (1) Arena/Conference Center/Expo,
	(2) Casino, (3) Fair/Attraction/Rodeo, (4) K-12, (5) Comedy/Mixed Use Venue, (6) Museum/Tours,
	(7) Other, (8) Professional Sports, (9) Live Music, (10) Night Club/Promoter, (11) Performing Arts,
	(12) Festival, (13) University
	""")
	Print_statements.append("""
	What is the average yearly revenue of your entertainment venue?
	""")
	Print_statements.append("""
	How many tickets does your venue sell yearly? 
	""")
	Print_statements.append("""
	What is the average price of a ticket at your venue? 
	""")
	Print_statements.append("""
	What does your average Box Office Employee earn, hourly?
	""")
	Print_statements.append("""
	Choose which if the following e-mail marketing services you use: (1) Mailchimp, (2) Constant Contact, (3) None
	""")

	""" Printing and saving results into Int Array """
	""" [Type, orig_ROI, TPY, TPrice, Employee_wage, email_marketing] """
	Results = []

	for i in range(NUM_FIELDS):

		print(Print_statements[i])
		Results.append(float(raw_input()))
	
	return Results

""" Parse types: parses types of an entry and calls the corresponding fxn """
def parse_types(Results):

	if Results["Type"] < 9: 

		Results["Type"] = 1
		General(Results)

	elif Results["Type"] == 9 or Results["Type"] == 10:

		Results["Type"] = 2
		Live_Music(Results)

	elif Results["Type"] == 11: 

		Results["Type"] = 3
		Performing_arts(Results)

	elif Results["Type"] == 12: 

		Results["Type"] = 4
		Festival(Results)

	elif Results["Type"] == 13:
		Results["Type"] = 5
		University(Results)

	else: 

		print("Please enter a valid number.")

""" ticket_sales: Takes original ROI """ 
def ticket_sales(orig_ROI):

	return .16 * orig_ROI


""" Automation function: takes box office employee wage and hrs/week saved """
def automation(wage, hrs_saved):

	return hrs_saved * wage * 52 

""" Social Media function: takes TPY and type """
def social_media(TPY, type):

	if type == 2 or type == 1 or type == 4: 

		return (TPY * (4.49 + 2.29))

	elif type == 3: 

		return (TPY * (4.01 + 0.72))

""" Online Sales: Takes TPY and increase rate """
def online_sales(TPY, TPrice, rate):

	""" tickets sold online sell for 6.3% higher """
	return (rate * TPY) * (TPrice * .063) 

""" Marketing: Takes email marketing type and TPY """ 
def marketing(email_marketing, TPY):

	""" 1 = Mailchimp 2 = Constant contact 3 = None """
	if email_marketing == 1:

		if TPY > 15000:

			return 12 * 199.0

		else: 

			return 12 * 10.0 

	elif email_marketing == 2:

		if TPY <= 5000:

			return 12 * 95.0

		else: 

			return 12 * 125.0
	else: 

		return 0

""" donations: Takes TPY """ 
def donations(TPY):

	if TPY <= 2000: 

		return 12 * 99.0

	elif 2000 < TPY <= 5000: 

		return 12 * 199.0

	elif 5000 < TPY <= 15000:

		return 12 * 299.0

	elif TPY > 15000: 

		return 12 * 399.0 


""" Final print if all fields satisfied"""
def print_all(ROI_breakdown): 

	print("Increase revenue by " + str(ROI_breakdown["Total"]) + " in total with Vendini!")
	print("Increase revenue from ticket sales by " + str(ROI_breakdown["Ticket Sales"]) + ".")
	print("Increase revenue from Online Sales by " + str(ROI_breakdown["Online Sales"]) + ".")
	print("Save " + str(ROI_breakdown["Email Marketing"]) + " with Vendini's built-in Email Marketing Solutions.")
	print("Save " + str(ROI_breakdown["Automation"]) + " with Box Office Automation.")
	print("Save " + str(ROI_breakdown["Donations"]) + " with Vendini's CRM and Donation Management Solutions.")
	print("Increase revenue by " + str(ROI_breakdown["Social Media"]) + " and publicize your events with Social Media.")

def Univ_print(ROI_breakdown):

	print("Increase revenue by " + str(ROI_breakdown["Total"]) + " in total with Vendini!")
	print("Increase revenue from ticket sales by " + str(ROI_breakdown["Ticket Sales"]) + ".")
	print("Save " + str(ROI_breakdown["Automation"]) + " with Box Office Automation.")
	print("Increase revenue from Online Sales by " + str(ROI_breakdown["Online Sales"]) + ".")

def Fest_print(ROI_breakdown):

	print("Increase revenue by " + str(ROI_breakdown["Total"]) + " in total with Vendini!")
	print("Increase revenue from ticket sales by " + str(ROI_breakdown["Ticket Sales"]) + ".")
	print("Increase revenue by " + str(ROI_breakdown["Social Media"]) + " and publicize your events with Social Media.")
	print("Increase revenue from Online Sales by " + str(ROI_breakdown["Online Sales"]) + ".")
	print("Save " + str(ROI_breakdown["Email Marketing"]) + " with Vendini's built-in Email Marketing Solutions.")

def Live_print(ROI_breakdown):

	print("Increase revenue by " + str(ROI_breakdown["Total"]) + " in total with Vendini!")
	print("Increase revenue from ticket sales by " + str(ROI_breakdown["Ticket Sales"]) + ".")
	print("Increase revenue by " + str(ROI_breakdown["Social Media"]) + " and publicize your events with Social Media.")
	print("Save " + str(ROI_breakdown["Email Marketing"]) + " with Vendini's built-in Email Marketing Solutions.")

""" General: takes input of General venue info, calculates and saves relevant revenue numbers """
def General(input):

	ROI_breakdown = {}
	ROI_breakdown["Ticket Sales"] = ticket_sales(input["orig_ROI"])
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 10)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .80)
	ROI_breakdown["Email Marketing"] = marketing(input["Email_marketing"], input["TPY"])
	ROI_breakdown["Donations"] = donations(input["TPY"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_all(ROI_breakdown)

""" Performing Arts: takes input of PA venue info, calculates and saves relevant revenue numbers """
def Performing_arts(input):

	ROI_breakdown = {}
	ROI_breakdown["Ticket Sales"] = ticket_sales(input["orig_ROI"])
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 25)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .17)
	ROI_breakdown["Email Marketing"] = marketing(input["Email_marketing"], input["TPY"])
	ROI_breakdown["Donations"] = donations(input["TPY"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_all(ROI_breakdown)

""" University: takes input of University venue info, calculates and saves relevant revenue numbers """
def University(input):

	ROI_breakdown = {}
	ROI_breakdown["Ticket Sales"] = ticket_sales(input["orig_ROI"])
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 12)
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .70)
	ROI_breakdown["Email Marketing"] = marketing(input["Email_marketing"], input["TPY"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	Univ_print(ROI_breakdown)

""" Festival: takes input of Festival info, calculates and saves relevant revenue numbers """
def Festival(input):

	ROI_breakdown = {}
	ROI_breakdown["Ticket Sales"] = ticket_sales(input["orig_ROI"])
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .30)
	ROI_breakdown["Email Marketing"] = marketing(input["Email_marketing"], input["TPY"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	Fest_print(ROI_breakdown)

""" Live Music: takes input of Live Music info, calculates and saves relevant revenue numbers """
def Live_Music(input):

	ROI_breakdown = {}
	ROI_breakdown["Ticket Sales"] = ticket_sales(input["orig_ROI"])
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 10)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Email Marketing"] = marketing(input["Email_marketing"], input["TPY"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	Live_Music(ROI_breakdown)

if __name__ == '__main__':

	Results = get_data()
	Results_dict = {}
	Results_fields = ["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage", "Email_marketing"]

	for i in range(NUM_FIELDS): 

		""" Fill in results dictionary with fields entered """ 
		Results_dict[Results_fields[i]] = Results[i]

	""" Parse type of venue and call corresponding function to calculate ROI""" 
	parse_types(Results_dict)



	