import time

countdown = 5

while countdown > 0:

    minutes = countdown//60
    seconds = countdown%60
    print(f'{minutes:02}:{seconds:02}\r',end="")
    time.sleep(1)
    countdown -= 1

print("              \r", end="")
print("Do")
