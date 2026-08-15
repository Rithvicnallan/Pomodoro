import time


def timer(countdown,timer_type):
    while countdown > 0:

        minutes = countdown//60
        seconds = countdown%60
        print(f'{minutes:02}:{seconds:02}\r',end="", flush=True)
        time.sleep(1)
        countdown -= 1
    print("              \r", end="")
    print(f'Done with {timer_type}')
    time.sleep(0.5)

work_timer = input("Please input how long you would like to work for in seconds: ")
break_timer = input("Please input how long you would like to have a break for in seconds: ")

timer(int(work_timer),"work")
print("Starting break timer now")
timer(int(break_timer),"break")
