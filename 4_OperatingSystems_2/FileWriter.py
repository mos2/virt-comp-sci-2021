name = input("What is your name?")
hobby = input("What is your favourite hobby?")

title = "<h1>" + name + "'s Website</h1>"
intro = "<p>My favourite hobby is " + hobby + "</p>"

with open('index.html', "w") as file:
    file.write(title + "\n")
    file.write(intro + "\n")