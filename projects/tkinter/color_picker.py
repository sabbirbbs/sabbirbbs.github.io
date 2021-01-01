from tkinter import *
import pyautogui
from webcolors import *
import keyboard
import pyperclip

print("Color Picker\n30.12.2020\n***************\n")
root = Tk()
root.title("Color Picker")
root.maxsize(250,170)
root.minsize(250,170)

frame = Frame(root,bd=6,relief="raised",padx=20,pady=20)
frame.pack(fill=Y)


def get_pixel():
    x,y = pyautogui.position()
    img = pyautogui.screenshot()
    pixel = img.getpixel((x,y))
    hexi.delete(0,END)
    hex_code = rgb_to_hex(pixel)
    title["fg"] = hex_code
    hexi.insert(0,hex_code)
    rgb.delete(0,END)
    rgb_code = "rgb"+str(pixel)
    rgb.insert(0,rgb_code)
    frame.after(1,get_pixel)
    if keyboard.is_pressed("ctrl+h"):
        pyperclip.copy(hex_code)
    elif keyboard.is_pressed("ctrl+r"):
        pyperclip.copy(pixel)
    else:
        pass

title = Label(frame,text="Color Picker",font="Cursive 20 bold")
title.grid(column=2)
Label(frame,text="Hex").grid()
Label(frame,text="RGB").grid()
Label(root,text="ctrl+h for hex\nctrl+r for rgb",font=(5)).pack()
hexi = Entry(frame)
hexi.grid(row=1,column=2)
rgb = Entry(frame)
rgb.grid(row=2,column=2)

get_pixel()

root.mainloop()









