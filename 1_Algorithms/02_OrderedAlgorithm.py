print("This is instruction one")

print("This is instruction two")

print("This is instruction 3")

# The print function can also print numbers - numbers should not be
# surrounded by quotes
print(7)

# If a number was surrounded by quotes, Python would treat it as a
# String, rather than a number
print("7")

# Python can perform arithmetic in numbers - the result
# of 2 + 3 will be printed here, which is 5
print(2 + 3)

# Woops! This was surrounded by quotes, so Python treated it
# as a String - literally! It will print out the String "2 + 3"
# Arithmetic can only be performed on numbers of course, not Strings!
print("2 + 3")

# The character * means multiply
print(3 * 4)

# Order is important! 
# Python will multiply 3 and 4 first, and then add 2 to the result of that
# This is because multiply has higher precedence (priority) than addition
print(2 + 3 * 4)

# You can however force the order you want!
# Python will perform the arithmetic in brackets first,
# so here it will add 2 + 3 first, and then multiply the result of that by 4
print((2 + 3) * 4)

# The character / means divide
# Multiply has the highest precedence, followed by divide, followed by add, followed by subtract
# Note that these numbers have decimal places
# Numbers with decimal places are known as "Floats", or "Doubles"
# Numbers without decimal places are known as "Integers"
# Here, 3.0 will be multiplied by 4.0 first, the result will be
# divided by 10.0, and finallt that result will have 2.0 added to it, giving 3.2.
print(2.0 + 3.0 * 4.0 / 10.0)



