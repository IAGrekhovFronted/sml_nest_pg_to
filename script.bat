@echo off
setlocal enabledelayedexpansion

set "resources=employeeBaseSchedule employeeSlotSchedule employeeType employeeType"

for %%i in (%resources%) do (
    echo Generating resource: %%i
    nest generate resource %%i
)

endlocal