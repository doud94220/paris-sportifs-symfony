@echo off
set /A max_attempts=30
set /A attempts=0

:loop
if %attempts% geq %max_attempts% (
    echo Error: Symfony server did not start within the given time.
    exit /b 1
)

ping -n 2 127.0.0.1 >nul

curl -s --head http://localhost:8000 > nul
if %errorlevel% equ 0 (
    echo Symfony server is up!
    exit /b 0
)

echo Waiting for Symfony server... Attempt %attempts%/%max_attempts%
set /A attempts=%attempts%+1
goto loop