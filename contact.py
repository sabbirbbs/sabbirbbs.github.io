#!/usr/bin/python
import base64 as bbs
mail = "c2FiYmlyQGJic0BnbWFpbC5jb20="
fb = "aHR0cHM6Ly9tLm1lL3NhYmJpcmJicw=="
num = "NTc4MTM1MjQyNTE1MjAwMjkwNDMyMTg1Njc4MTU="
x = bbs.b64decode(num)
print("Email me: "+bbs.b64decode(mail))
print("Message me: "+bbs.b64decode(fb))
print("Call me: "+"0"+x[21:-6]+x[12:20])
