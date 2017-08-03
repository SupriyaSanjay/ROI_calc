num_fields = 5
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

	""" Printing and saving results into Int Array """
	""" [Type, orig_ROI, TPY, TPrice, Employee_wage] """
	Results = []

	for i in range(num_fields):

		print(Print_statements[i])
		Results.append(float(raw_input()))
	
	return Results

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

""" Final print """
def print_ROI(ROI_breakdown): 

	length = len(ROI_breakdown)

	print("Increase revenue by " + str(ROI_breakdown["Total"]) + " with Vendini.")
	print("Increase revenue from Online Sales by " + str(ROI_breakdown["Online Sales"]) + " .")
	print("Save " + str(ROI_breakdown["Automation"]) + " with Box Office Automation.")
	print("Increase revenue by " + str(ROI_breakdown["Social Media"]) + " and publicize your events with Social Media.")


def General(input):

	ROI_breakdown = {}
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 10)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .80)
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_ROI(ROI_breakdown)

def Performing_arts(input):

	ROI_breakdown = {}
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 25)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .17)
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print(ROI_breakdown["Total"])
	print_ROI(ROI_breakdown)

def University(input):

	ROI_breakdown = {}
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 12)
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .70)
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_ROI(ROI_breakdown)

def Festival(input):

	ROI_breakdown = {}
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Online Sales"] = online_sales(input["TPY"], input["TPrice"], .30)
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_ROI(ROI_breakdown)

def Live_Music(input):

	ROI_breakdown = []
	ROI_breakdown["Automation"] = automation(input["Employee_wage"], 10)
	ROI_breakdown["Social Media"] = social_media(input["TPY"], input["Type"])
	ROI_breakdown["Total"] = sum(ROI_breakdown.values())
	print_ROI(ROI_breakdown)

if __name__ == '__main__':

	Results = get_data()
	Results_dict = {}
	Results_fields = ["Type", "orig_ROI", "TPY", "TPrice", "Employee_wage"]

	for i in range(num_fields): 

		Results_dict[Results_fields[i]] = Results[i]

	parse_types(Results_dict)



	