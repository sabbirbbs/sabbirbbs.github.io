from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

#Load the driver
browser = webdriver.Firefox()

url = "http://103.230.104.210:8088/ntrca/c3/app/applicant-start.php"
agree = "agree"

##Applicant Data
primary_data = {
	"roll": "30110493",
	"reg": "201512027828",
	"batch" : "12",
	
}
#First Step Data
_1st_entry_data = {
	"post_type" : "MPO",
	"level" : "School",
	"post" : "Assistant Teacher, Bengali",
	"subject" : "Bengali",
	"division" : "MYMENSINGH",
	"district" : "MYMENSINGH",
}

#2nd Entry Input Field
_2nd_inp_entry_data = {
	"mobile" : "01234567890",
	"nid" : "4582316725891534",
	"email" : "username@domain.com",
	"pcode" : "2200",
	"address" : "Vill: Hoichoi P.O: Sadar",
	"perm_pcode" : "2200",
	"perm_address" : "Vill: Hoichoi P.O: Sadar",
	"photo" : 'avatar.jpg',
	"signature" : 'sign.jpg'
}

#2nd Select Entry Field
_2nd_entry_data = {
	"religion" : "Islam",
	"gender" : "Female",
	"nationality" : "Bangladeshi",
	"maritial_status" : "Single",
	"div_code" : "MYMENSINGH",
	"dist_code" : "MYMENSINGH",
	"thana_code" : "FULBARIA",
	"perm_div_code" : "MYMENSINGH",
	"perm_dist_code" : "MYMENSINGH",
	"perm_thana_code" : "FULBARIA"
	
}

##Form Field

static_field = {
	"batch" : "applicant_batch",
	"roll" : "applicant_roll",
	"reg" : "applicant_reg",
}

#1st Step
_1st_entry = {
	"post_type" : "applicant_mpo",
	"level" : "applicant_level",
	"post" : "applicant_post",
	"subject" : "applicant_subject",
	"division" : "applicant_division",
	"district" : "applicant_district",
}

#2nd Step
_2nd_inp_entry = {
	"mobile" : "mobile",
	"nid" : "nid",
	"email" : "email",
	"pcode" : "pcode",
	"address" : "address",
	"perm_pcode" : "perm_pcode",
	"perm_address" : "perm_address",
	"photo" : "photo_hidden",
	"signature" : "signature_hidden"
}

_2nd_entry = {
	"div_code" : "div_code",
	"perm_div_code" : "perm_div_code",
	"religion" : "religion",
	"gender" : "gender",
	"nationality" : "nationality",
	"maritial_status" : "maritial_status",
	"dist_code" : "dist_code",
	"thana_code" : "thana_code",
	"perm_dist_code" : "perm_dist_code",
	"perm_thana_code" : "perm_thana_code"
	
}


#Start the job
browser.get(url)
browser.maximize_window()

#First Form Fill Up Function
def fill_the_first_form():
	try:
		batch = Select(browser.find_element_by_id(static_field["batch"]))
		batch.select_by_value(primary_data["batch"])
		
		roll = browser.find_element_by_id(static_field["roll"])
		roll.send_keys(primary_data["roll"])
		
		reg = browser.find_element_by_id(static_field["reg"])
		reg.send_keys(primary_data["reg"])
		
		for verbose,field in _1st_entry.items():
			time.sleep(0.5)
			WebDriverWait(browser, 30).until(EC.element_to_be_clickable((By.ID,field)))
			action = Select(browser.find_element_by_id(field))
			action.select_by_visible_text(_1st_entry_data[verbose])
	except Exception as error:
		print(error)

#Second Form Fill Up Function
def fill_the_second_form():
	try:
		try:
			for verbose,field in _2nd_inp_entry.items():
				WebDriverWait(browser, 30).until(EC.element_to_be_clickable((By.ID,field)))
				action = browser.find_element_by_id(field)
				action.send_keys(_2nd_inp_entry_data[verbose])			
		except Exception as error:
			print(error)
		try:
			for verbose,field in _2nd_entry.items():
				WebDriverWait(browser, 30).until(EC.element_to_be_clickable((By.ID,field)))
				action = Select(browser.find_element_by_id(field))
				action.select_by_visible_text(_2nd_entry_data[verbose])
				
			understand = browser.find_element_by_id(agree)
			understand.click()
		except Exception as error:
			print(error)
	except Exception as error:
		print(error)

#Calling The First Form Fill Up Functiion
fill_the_first_form()

input("Have you done institute selection? >>  ")

#Calling The Second Form Fill Up Functiion
fill_the_second_form()

input("Should i start a new application? >>  ")

	
	
"""
batch = Select(browser.find_element_by_xpath(Ibatch))
batch.select_by_value("11")
browser.find_element_by_xpath(Iroll).send_keys(roll)


for x in range(10):
	browser.execute_script("window.open()")
	print(browser.current_url)
	browser.switch_to.window(browser.window_handles[len(browser.window_handles)-1])
	browser.get("https://sabbirbbs.wtf")
	print(browser.current_url)
	print(len(browser.window_handles))

"""
