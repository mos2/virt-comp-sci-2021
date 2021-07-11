pageContainsCars = False
pageContainsTrains = False

#This shows the AND Boolean operator.
#An "AND" Boolean expression is only True when the
#Boolean values (the two variable inputs here) are all True.
#Here, both variables are False, so this AND expression is False.
print(pageContainsCars and pageContainsTrains)

pageContainsCars = True
pageContainsTrains = False

#This will be False.
print(pageContainsCars and pageContainsTrains)

pageContainsCars = False
pageContainsTrains = True

#This will be False.
print(pageContainsCars and pageContainsTrains)

pageContainsCars = True
pageContainsTrains = True

#This will be True - both Boolean inputs in this expression are True,
#so the AND expression results in True,
print(pageContainsCars and pageContainsTrains)