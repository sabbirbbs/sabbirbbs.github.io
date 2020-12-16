#!/usr/bin/python3
import subprocess
import optparse
import re

print("MAC Changer\n25.10.2020\n************\n")

def get_mac(iface):
    if iface == None:
        return "not possible to find."
    else:
        ifconfig = str(subprocess.check_output(['ifconfig',iface]))
        mac = re.search(r"\w\w:\w\w:\w\w:\w\w:\w\w:\w\w",ifconfig)
        if mac:
            return mac.group(0)
        else:
            print("[-] Could not read the MAC!")
        
def get_args():
    arg = optparse.OptionParser()
    arg.add_option("-i","--iface",dest="Interface",help="Interface to change MAC address of it.")
    arg.add_option("-m","--mac",dest="MAC",help="New MAC to change present one.")

    return arg.parse_args()
    
def mac_changer(iface,mac):
    cmd = [["ifconfig",iface,"down"],
           ["ifconfig",iface,"hw","ether",mac],
           ["ifconfig",iface,"up"]]

    for c in cmd:
        subprocess.call(c)
        
    print(f"[+] Changing MAC of {iface} to {mac}")
    
opt,arg = get_args()


if opt.MAC == None and opt.Interface == None:
    print("[x] Am also interested to joke.")
elif opt.Interface == None:
    print("[-] Where is the interface defined?")
elif opt.MAC == None:
    print("[-] Make sure,you also mentioned MAC to change -m 00:11:22:33:44:55")
else:
    mac_changer(opt.Interface,opt.MAC)

MAC = get_mac(opt.Interface)
print("[-] Current MAC is",MAC)

MAC = get_mac(opt.Interface)
if MAC == opt.MAC:
    print("[+] MAC Address successfully changed to",MAC)
else:
    print("[-] Unable to change the MAC.")
