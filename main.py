import time

countdown = 100

while countdown > 0:

    minutes = countdown//60
    seconds = countdown%60

    print(f'{minutes:02}:{seconds:02}')
    time.sleep(1)
    countdown -= 1

print("Done")
