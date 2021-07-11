#Create a variable called carsAreCool, and assign it
#the Boolean value True
carsAreCool = True

#This will print out "Are cars cool? True
print("Are cars cool?", carsAreCool)

#Here we use the Boolean NOT operator - it will flip
#a Boolean value to the opposite value. Boolean values
#can only be True or False, so it will flip carsAreCool,
#which us currently True, to False.
print("Does Michael think cars are cool?", not carsAreCool)

#The > symbols means "greater than" - is 5 greater than 2? That's True.
#This is a an example of a Boolean expression.
print("Is 5 greater than 2?", 5 > 2)

#Is 2 greater than 5? False
print("Is 2 greater than 5?", 2 > 5)

# == (two equals signs) is used to check if two things are equal to each other.
#The number 5 does not equal the number 2, so this Boolean expression is False.
print("Does 5 equal 2?", 5 == 2)

#The number 5 is equal to the Number 5 (i.e. 5 equals itself!), so this is True.
print("Does 5 equal 5?", 5 == 5)

#The String "Michael" has different characters to the String "Caelum", so
#these two Strings are not equal. Therefore, this is False.
print("Is Michael equal to Caelum?", "Michael" == "Caelum")

#The String "Michael" does equal the String "Michael", so this is True.
print("Is Michael equal to Michael?", "Michael" == "Michael")