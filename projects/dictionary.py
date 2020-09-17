print("##############################")
print("#    Project: Dictionary     #")
print("#    Date: 16.09.2020        #")
print("##############################")
cmd = """
    Add definition
    Remove definition
    Search definition
    """
print(cmd)
dic = {}
while True:
    opt = input("What you want to do? ").upper()
    a = opt.split()
    if "ADD" in a:
        key = input("Enter the key > ")
        defi = input("Enter the definition > ")
        dic[key] = defi
        print("Definition added.")
    elif "REMOVE" in a:
        key = input("Enter the key > ")
        if key in dic: 
            del dic[key]
            print("Definition {} removed.".format(key))
        else:
            print("Key not found.")
    elif "SEARCH" in a:
        key = input("Enter the key > ")
        if key in dic:
            print(dic[key])
        else:
            print("Key not found.")
    else:
        print("Bye.")
        break
