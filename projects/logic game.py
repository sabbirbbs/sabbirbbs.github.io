print("##############################")
print("#    Project: Math Game      #")
print("#    Date: 08.09.2020        #")
print("##############################")

print("What's the name of the logical game?")
print("""
        [ ] + [ ] = A
         +     +
        [ ] - [ ] = B
         =     =
         C     D
    """)
a = 0
b = 0
c = 0
d = 0
e = 0
f = 0
g = 0
h = 0
d1 = int(input("Enter A > "))
d2 = int(input("Enter B > "))
d3 = int(input("Enter C > "))
d4 = int(input("Enter D > "))
for i in range(1,1000):
    for j in range(1,1000):
        a = i + j
        if a == d1:
            e = i
            g = j
            #print("i {} + j {} = a {}".format(i,j,a))
            for k in range(1,1000):
                c = e + k
                if c == d3:
                    f = k
                    #print("e {} + k {} = c {}".format(e,k,c))
                    for l in range(1,1000):
                        b = f - l
                        if b == d2:
                            h = l
                            #print("f {} - l {} = b {}".format(f,l,b))
    if (g + h) == d4:
        ans = """
                {:2} + {:2} = {:2}
                {:2} - {:2} = {:2}
                 =    =
                {:2}    {:2}
            """.format(e,g,d1,f,h,d2,d3,d4)
        print("We got the answer")
        print(ans)
        break
    else:
        continue
if (g + h) != d4:
    print("The pattern is wrong.")















