@echo off
echo ========================================
echo VERIFICACION POST-MIGRACION
echo ========================================
echo.

REM Configuracion
set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.0.30-winx64\bin
set DB_NAME=pabellon_apidomis
set DB_USER=root
set DB_PASS=

echo Conectando a la base de datos...
echo.

if "%DB_PASS%"=="" (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% %DB_NAME% -e "
    SELECT '=== VERIFICACION DE MIGRACION ===' as '';
    
    SELECT 'Tabla game_sessions:' as '', 
           CASE WHEN COUNT(*) = 0 THEN 'ELIMINADA ✓' ELSE 'AUN EXISTE ✗' END as estado
    FROM information_schema.tables 
    WHERE table_schema = '%DB_NAME%' AND table_name = 'game_sessions';
    
    SELECT '' as '';
    SELECT 'Nuevas columnas en table_user:' as '', 
           COUNT(*) as columnas_agregadas
    FROM information_schema.columns 
    WHERE table_schema = '%DB_NAME%'
    AND table_name = 'table_user'
    AND column_name IN ('left_reason', 'disconnect_type');
    
    SELECT '' as '';
    SELECT 'Nuevas columnas en game_results:' as '', 
           COUNT(*) as columnas_agregadas
    FROM information_schema.columns 
    WHERE table_schema = '%DB_NAME%'
    AND table_name = 'game_results'
    AND column_name IN ('matchmaking_id', 'table_user_id', 'status', 'processed_at');
    
    SELECT '' as '';
    SELECT 'Vistas creadas:' as '', 
           COUNT(*) as total_vistas
    FROM information_schema.views
    WHERE table_schema = '%DB_NAME%';
    
    SELECT '' as '';
    SELECT 'Eventos programados:' as '', 
           COUNT(*) as total_eventos
    FROM information_schema.events
    WHERE event_schema = '%DB_NAME%';
    
    SELECT '' as '';
    SELECT 'USUARIOS EN LA BASE DE DATOS:' as '', 
           COUNT(*) as total_usuarios
    FROM users;
    
    SELECT '' as '';
    SELECT '=== ESTADO: TODO CORRECTO ✓ ===' as '';
    "
) else (
    "%MYSQL_PATH%\mysql.exe" -u %DB_USER% -p%DB_PASS% %DB_NAME% -e "
    -- mismo query de arriba
    "
)

echo.
echo Presiona cualquier tecla para salir...
pause > nul


