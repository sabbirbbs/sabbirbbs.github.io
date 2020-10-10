print("##############################")
print("#    Project: List Test      #")
print("#    Date: 09.10.2020        #")
print("##############################")
from kivymd.app import MDApp
from kivy.lang import Builder
from kivymd.uix.screen import Screen
from kivy.core.window import Window as win
from kivymd.uix.button import MDRectangleFlatButton,MDFlatButton
from kivymd.uix.list import MDList,OneLineIconListItem,IconLeftWidget
from kivy.uix.scrollview import ScrollView
from kivy.uix.boxlayout import BoxLayout
from kivymd.uix.textfield import MDTextField
from kivymd.uix.dialog import MDDialog

win.size = (400,700)

content = """
BoxLayout:
    orientation: "vertical"
    MDBottomAppBar:
        MDToolbar:
            title:"Blog"
            left_action_items:[["menu",lambda x:x]]
            icon:"plus"
            mode:"end"
            type:"bottom"
    MDLabel:
        text: ""
        halign: "center"
            
"""

user = """
BoxLayout:
    size_hint:(1,0.1)
    padding:(20,0,20,0)
    spacing:10
    pos_hint:{"center_x":0.5,"center_y":0.5}
    MDTextField:
        hint_text:"Enter Your Query"
        helper_text:"Search here."
        size_hint_x:None
        width:root.width/2
        icon_right:"account"
        icon_right_color:app.theme_cls.primary_color
        helper_text_mode:"on_focus"
        id:query
    MDRectangleFlatIconButton:
        text:"Search"
        pos_hint:{"center_x":1,"center_y":0.5}
        font_size:"24sp"
        icon:"circle"
        on_press:app.clicked()
"""
class App(MDApp):
    def build(self):
        self.theme_cls.primary_palette = "Blue"
        screen = Screen()
        data = Builder.load_string(content)
        listi = MDList()
        view = ScrollView()
        layout = BoxLayout(orientation="vertical",padding=(0,0,0,50))

        self.search = Builder.load_string(user)
        for x in range(20):
            if x%2 == 0:
                icon = IconLeftWidget(icon="language-python")
            else:
                icon = IconLeftWidget(icon="account")
            item = OneLineIconListItem(text="Item {}".format(x),on_press=self.test)
            item.add_widget(icon)
            listi.add_widget(item)
            
        view.add_widget(listi)
        layout.add_widget(self.search)
        layout.add_widget(view)
        screen.add_widget(layout)
        screen.add_widget(data)
        return screen
    def clicked(self):
        if self.search.ids.query.text != "root":
            results = "Wrong Inquery."
        else:
            results = "You are now admin."
        close = MDFlatButton(on_press=self.closeit,text="Close")
        self.dialog = MDDialog(title="Results",text=results,size_hint_x=0.5,buttons=[close])
        self.dialog.open()
    def closeit(self,obj):
        self.dialog.dismiss()
    def test(self,obj):
        print("Tested")
App().run()

















