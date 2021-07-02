# This is a loop - a loop repeats one or more lines of code a given number
# of times.
# There are several ways to write loops.
# This is a "for" loop. It will repeat all lines of code indented (moved in under it)
# a limited number of times.
# Here, range is a Python function that will return a List -
# This list will start at number 0, and go all the way up to the number given
# inside the brackets - 1. range(6) gives the list [0, 1, 2, 3, 4, 5].
# The for loop defines a variable called "count" to hold each item in this list as
# it loops over it.
#
# On the first run of the loop, "count" will contain 0.
# On the second run of the loop, "count" will contain 1.
# On the third run of the loop, "count" will contain 2, and so on...
# On the sixth and final run of the loop, "count will contain 5", and then stop - the program will move on.
# Each time the loop runs, it will print out the String on line 18.
for count in range(6):
    print("Count is", count)

print("Now for another loop...")

# This for loop is the same as above, except this time we tell the range function to start
# at 5 rather than 0, and go up to 15 - 1. range(5, 15) gives
# the list [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
for count in range (5, 15):
    print("Count is", count)

print("Now for yet another loop that goes through a list...")

# We can create our own lists! Here we create a list of 5 Strings,
# and store it in a variable called "names". Lists are surrounded by square brackets [ ].
# Each piece of data in the list must be separated by a comma (the last item does not need a comma after it).
names = ["michael", "caelum", "thomas", "luka", "alan"]

# For loops can loop over lists stored in varibales!
# Here we loop over the names list - each time the loop runs
# it will store the current item in the list on a variable called "person".
#
# On the first run of the loop, "person" will contain "michael".
# On the second run of the loop, "person" will contain "caelum".
# On the third run of the loop, "person" will contain "thomas" and so on...
# On the sixth and final run of the loop, "person" will contain "alan", and then stop - the program will move on.
# Each time the loop runs, it will print out the String on line 45.
for person in names:
    print("Hello", person, "!")