#!/usr/bin/python3
print("################################")
print("#    Project: Network Scanner  #")
print("#    Date: 02.12.2020          #")
print("################################")
import optparse
import scapy.all as scapy
def get_args():
    arg = optparse.OptionParser()
    arg.add_option('-i','--ip',dest="IP",help="Mention the ip or ip range.")
    return arg.parse_args()
def scan(ip):
    if ip == None:
        print("[-] IP not defined.")
    else:
        arp = scapy.ARP(pdst=ip)
        bdcst = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
        arp_bdcst = bdcst/arp
        answer = scapy.srp(arp_bdcst,timeout=1,verbose=False)[0]
        users = []
        for data in answer:
            users.append({"ip":data[1].psrc,"mac":data[1].hwsrc})
        return users
    
def print_data(clients):
    print("-"*57+"\n|\tMAC Address     \t |\t IP Address    |\n"+"-"*57)
    for x in clients:
        print("|\t"+x["ip"]+"\t|"+"\t"+x["mac"]+"\t|\n")
        print("-"*57)

print_data(scan(get_args()[0].IP))
