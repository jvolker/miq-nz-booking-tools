import time
from pathlib import Path
from subprocess import Popen, PIPE

bat_fp = Path(r"C:\Users\MrBeenjammin\Documents\GitHub\miq-nz-booking-tools\auto_run.bat")
print(bat_fp)
p = Popen(str(bat_fp), shell=True, stdout = PIPE)

stdout, stderr = p.communicate()
print('sleeping')
time.sleep(30000)
p.kill()
print('killed process')
