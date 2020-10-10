print("##############################")
print("#    Project: First Kivymd   #")
print("#    Date: 01.10.2020        #")
print("##############################")
from kivymd.app import MDApp
from kivy.lang import Builder
from kivymd.uix.screen import Screen
from kivymd.uix.button import MDRectangleFlatButton,MDFlatButton
from kivymd.uix.dialog import MDDialog
from kivymd.uix.label import MDLabel


content = """

MDTextField:
    hint_text:"Enter your name."
    helper_text:"Make sure,You are a human!"
    helper_text_mode:"on_focus"
    size_hint_x:None
    width:300
    pos_hint:{"center_x":0.5,"center_y":0.5}
    icon_right:"account"
    icon_right_color:app.theme_cls.primary_color
    


"""



class MineApp(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "Green"
        screen = Screen()
        self.ctn = Builder.load_string(content)
        button = MDRectangleFlatButton(text="Print",pos_hint={"center_x":0.5,"center_y":0.4},on_release=self.showname)
        text = MDFlatButton(text="Created by -... -... ...",pos_hint={"center_x":0.5,"center_y":0.3})
        screen.add_widget(self.ctn)
        screen.add_widget(button)
        screen.add_widget(text)
        return screen

    def showname(self,obj):
        if self.ctn.text is "":
            showname = "Your name should not be empty."
        else:
            showname = "This is so cute name {}.".format(self.ctn.text)
        close = MDFlatButton(text="Close",on_release=self.closed)
        self.msg = MDDialog(text=showname,title="Username Check",size_hint=(0.7,1),buttons=[close])
        self.msg.open()

    def closed(self,obj):
        self.ctn.text = ""
        self.msg.dismiss()
        
    
if __name__ == "__main__":
    MineApp().run()
