pageContainsCars = False
pageContainsTrains = False

#This shows the OR Boolean operator.
#An "OR" Boolean expression is True when either of the
#Boolean values (the two variable inputs here) are True.
#Here, both variables are False, so this OR expression is False.
print(pageContainsCars or pageContainsTrains)

pageContainsCars = True
pageContainsTrains = False

#This will be True - one of the Boolean inputs in this expression are True,
#so the OR expression results in True.
print(pageContainsCars or pageContainsTrains)

pageContainsCars = False
pageContainsTrains = True

#This will be True - one of the Boolean inputs in this expression are True,
#so the OR expression results in True.
print(pageContainsCars or pageContainsTrains)

pageContainsCars = True
pageContainsTrains = True

#This will be True - both of the Boolean inputs in this expression are True,
#so the OR expression results in True here as well.
print(pageContainsCars or pageContainsTrains)