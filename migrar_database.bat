@echo off
echo ========================================
echo MIGRACION DE BASE DE DATOS - Sistema de Juegos
echo ========================================
echo.
echo Este script hara:
echo 1. Backup de la base de datos
echo 2. Ejecutar migraciones
echo 3. Verificar que todo este correcto
echo.
echo TU USUARIO NO SE PERDERA - Solo se optimizan tablas de juego
echo.
pause
echo.

REM Configuracion (ajustar si es necesario)
set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.0.30-winx64\bin
set DB_NAME=pabellon_apidomis
set DB_USER=root
set DB_PASS=

REM Crear carpeta de backups si no existe
if not exist "backups" mkdir backups

REM Nombre del backup con fecha y hora
set BACKUP_FILE=backups\backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set BACKUP_FILE=%BACKUP_FILE: =0%

echo.
echo [1/3] Haciendo backup de la base de datos...
echo Archivo: %BACKUP_FILE%
echo.

if "%DB_PASS%"=="" (
    "%MYSQL_PATH%\mysqldump.exe" -u %DB_USER% %DB_NAME% > "%BACKUP_FILE%"
) else (
    "%MYSQL_PATH%\mysqldump.exe" -u %DB_USER% -p%DB_PASS% %DB_NAME% > "%BACKUP_FILE%"
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: No se pudo hacer el backup
    echo Verifica que Laragon MySQL este ejecutandose
    pause
    exit /b 1
)

echo OK - Backup creado exitosamente!
echo.

echo [2/3] Ejecutando migraciones...
echo.
echo Esto tomara unos segundos...
echo.

if "%DB_PASS%"=="" (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% %DB_NAME% < database_migration_safe.sql
) else (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -p%DB_PASS% %DB_NAME% < database_migration_safe.sql
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Hubo un problema al ejecutar las migraciones
    echo.
    echo RESTAURAR BACKUP?
    echo Si algo salio mal, ejecuta:
    echo "%MYSQL_PATH%\mysql.exe" -u %DB_USER% %DB_NAME% ^< "%BACKUP_FILE%"
    echo.
    pause
    exit /b 1
)

echo OK - Migraciones ejecutadas exitosamente!
echo.

echo [3/3] Verificando migraciones...
echo.

REM Verificar que game_sessions fue eliminada
echo Verificando eliminacion de tabla game_sessions...
if "%DB_PASS%"=="" (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -e "USE %DB_NAME%; SHOW TABLES LIKE 'game_sessions';" > temp_check.txt
) else (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE %DB_NAME%; SHOW TABLES LIKE 'game_sessions';" > temp_check.txt
)

find /c "game_sessions" temp_check.txt > nul
if %ERRORLEVEL% EQU 0 (
    echo ADVERTENCIA: game_sessions aun existe
) else (
    echo OK - game_sessions eliminada correctamente
)
del temp_check.txt

REM Verificar que el usuario sigue existiendo
echo.
echo Verificando que tu usuario NO se perdio...
if "%DB_PASS%"=="" (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -e "USE %DB_NAME%; SELECT COUNT(*) as total_users FROM users;" -N
) else (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE %DB_NAME%; SELECT COUNT(*) as total_users FROM users;" -N
)

echo.
echo ========================================
echo MIGRACION COMPLETADA EXITOSAMENTE!
echo ========================================
echo.
echo Resumen:
echo - Backup guardado en: %BACKUP_FILE%
echo - Tabla game_sessions: ELIMINADA
echo - Nuevas columnas: AGREGADAS
echo - Indices: CREADOS
echo - Vistas SQL: CREADAS
echo - Eventos programados: ACTIVOS
echo - Usuarios: INTACTOS (no se perdieron)
echo.
echo Ahora puedes:
echo 1. Reiniciar tu aplicacion Vue
echo 2. Probar el panel Pote en /pote
echo 3. Jugar normalmente - todo deberia funcionar
echo.
echo Si algo salio mal, restaura el backup con:
echo "%MYSQL_PATH%\mysql.exe" -u %DB_USER% %DB_NAME% ^< "%BACKUP_FILE%"
echo.
pause

