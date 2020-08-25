import sys
sys.stdout = open("pass.txt","w")
key = 0
while key < 1000000:
    if len(str(key)) <= 6:
        a = 6 - len(str(key))
        if a == 5:
            print("00000{}".format(key))
        elif a == 4:
            print("0000{}".format(key))
        elif a == 3:
            print("000{}".format(key))
        elif a == 2:
            print("00{}".format(key))
        elif a == 1:
            print("0{}".format(key))
        else:
            print("{}".format(key))
    key += 1
sys.stdout.close()
