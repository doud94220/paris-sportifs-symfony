powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Process java -ArgumentList '-jar', 'C:\SeleniumServerGrid\selenium-server-4.35.0.jar', 'standalone'"
powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Process php -ArgumentList 'C:\ProgramData\Jenkins\.jenkins\workspace\JobDoud1\bin\console', 'serve'"
