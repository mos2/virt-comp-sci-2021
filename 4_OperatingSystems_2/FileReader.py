with open('StarWars.txt') as file:
    lineCount = 1
    line = file.readline()
    while line:
        print(line.strip())
        line = file.readline()
        lineCount += 1

file.close()

print("Read", lineCount, "lines.")