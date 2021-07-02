#Uh oh...
luckyNumber = 7

# A "while" loop is another type of loop.
# The "for" loops we saw run for a specified number of times, but "while" loops run
# an undetermined number of times - they run as long as the Boolean condition
# in the brackets is True. Here, the condition can be read, "while the contents of 
# the variable called luckyNumber are greater than 1". While this is True, the code
# on lines 18 and 19 will execute.
# After each run of the code inside the loop, Python goes back up to the "while"
# Boolean condition and checks if it is True again. It keeps repeating this for 
# as long as the Condition is True. As soon as the condition becomes False, the
# loop will stop running, and Python will move onto the first line of code
# after the loop.
 # Each time this loop runs, it prints the luckyNumber variable,
# and adds 1 to the current value of it.
while (luckyNumber > 1):
    print("Hello! Lucky number is", luckyNumber)
    luckyNumber = luckyNumber + 1

print("This program will never reach this line!")

# WARNING! This program will run forever - it does not terminate! Why?
# This is because luckyNumber starts at 7 - each time the while loop runs, 
# 1 is added to it. As a result, the Boolean condition on line 11 will ALWAYS be True!

# We will look at Booleans and Boolean conditions in the next class.
