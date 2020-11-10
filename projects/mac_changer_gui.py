#!/usr/bin/python3
print("##############################")
print("#    Project: MAC Changer    #")
print("#    Date: 25.10.2020        #")
print("##############################")
import subprocess
from kivymd.app import MDApp
from kivy.lang import Builder
from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton

look = """
Screen:
    MDLabel:
        text:"MAC Address Changer"
        halign:"center"
        font_style:"H2"
        pos_hint_y:None
        center_y:root.height/2.5
        bold:True
    MDTextField:
        id:iface
        hint_text:"Enter Interface"
        helper_text:"Such as wlan0 or eth0"
        helper_text_mode:"on_focus"
        icon_right:"source-commit-local"
        pos_hint:{"center_x":0.5,"center_y":0.6}
        size_hint_x:0.4
        required:True
    MDTextField:
        id:mac
        hint_text:"Enter Desired Mac"
        helper_text:"Like 00:11:22:aa:bb:cc"
        helper_text_mode:"on_focus"
        icon_right:"air-filter"
        pos_hint:{"center_x":0.5,"center_y":0.5}
        size_hint_x:0.7
        required:True
    MDRectangleFlatButton:
        text:"Change"
        on_press:app.change()
        pos_hint:{"center_x":0.5,"center_y":0.4}
        theme_text_color:"Custom"
        text_color:0,0,0,1
    MDLabel:
        text:"This is not for noob.Open the program in terminal with python3."
        halign:"center"
        font_style:"H4"
        pos_hint:{"center_x":0.5,"center_y":0.2}
"""

class MainApp(MDApp):
    def build(self):
        self.title = "MAC Changer"
        self.screen = Builder.load_string(look)
        return self.screen

    def change(self):
        mac = self.screen.ids.mac.text
        iface = self.screen.ids.iface.text
        
        close = MDFlatButton(text="OK",on_press=self.close)
        if len(mac) != 17 or len(iface) <= 2:
            msg = "You can,if want to do fun with the innocence program."
        else:
            msg = "Look,may be it's changed.If you didn't any mistake."
            
        self.box = MDDialog(title="Message",text=msg,size_hint=(0.8,0.2),
                            buttons=[close])
        self.box.open()
        
        cmd = [f"ifconfig {iface} down",
               f"ifconfig {iface} hw ether {mac}",
               f"ifconfig {iface} up",
               "ifconfig"]
        for x in cmd:
            subprocess.call(x,shell=True)
        
    def close(self,obj):
        self.box.dismiss()
if __name__ == "__main__":
    MainApp().run()
