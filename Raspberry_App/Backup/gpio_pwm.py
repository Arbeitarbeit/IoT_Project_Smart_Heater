from gpiozero import GPIO, PWM

#Hardware PWM available on GPIO12, GPIO13, GPIO18, GPIO19
# heater_PWM = PWM()
heater0 = GPIO(12)
fan0 = GPIO(13)



#reference
#https://www.ics.com/blog/control-raspberry-pi-gpio-pins-python#:~:text=Gpiozero,-A%20newer%20GPIO%20library%20for
#https://www.raspberrypi.com/documentation/computers/os.html#gpio-and-the-40-pin-header
#https://gpiozero.readthedocs.io/en/stable/installing.html
