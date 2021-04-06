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

#Applicant Data
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

#Form Field

static_field = {
	"batch" : "applicant_batch",
	"roll" : "applicant_roll",
	"reg" : "applicant_reg",
}

_1st_entry = {
	"post_type" : "applicant_mpo",
	"level" : "applicant_level",
	"post" : "applicant_post",
	"subject" : "applicant_subject",
	"division" : "applicant_division",
	"district" : "applicant_district",
}


#Start the job
browser.get(url)
browser.maximize_window()

def fill_the_first_form():
	batch = Select(browser.find_element_by_id(static_field["batch"]))
	batch.select_by_value(primary_data["batch"])
	
	roll = browser.find_element_by_id(static_field["roll"])
	roll.send_keys(primary_data["roll"])
	
	reg = browser.find_element_by_id(static_field["reg"])
	reg.send_keys(primary_data["reg"])
	
	for verbose,field in _1st_entry.items():
		WebDriverWait(browser, 5).until(EC.element_to_be_clickable((By.ID,field)))
		action = Select(browser.find_element_by_id(field))
		action.select_by_visible_text(_1st_entry_data[verbose])

#Calling The First Form Fill Up Functiion
fill_the_first_form()

input("Have you done institute selection? >>  ")
	
	
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
