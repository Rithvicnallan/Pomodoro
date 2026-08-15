import time


def timer(countdown):
    while countdown > 0:

        minutes = countdown//60
        seconds = countdown%60
        print(f'{minutes:02}:{seconds:02}\r',end="", flush=True)
        time.sleep(1)
        countdown -= 1


work_timer = input("Please input how long you would like to work for: ")
break_timer = input("Please input how long you would like to have a break for: ")

timer(int(work_timer))
print("              \r", end="")
print("Done, starting break now")

timer(int(break_timer))

print("              \r", end="")
print("Done")
