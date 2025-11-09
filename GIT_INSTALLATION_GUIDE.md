# Руководство по установке Git для исправления ошибки GitLens

## Проблема

GitLens показывает ошибку "Unable to find git" потому что Git не установлен в системе.

## Решение

### Вариант 1: Скачать Git с официального сайта

1. Перейдите на https://git-scm.com/download/win
2. Скачайте последнюю версию Git для Windows
3. Запустите установщик и следуйте инструкциям
4. **ВАЖНО**: Во время установки выберите опцию "Git from the command line and also from 3rd-party software"

### Вариант 2: Установка через PowerShell (если есть права администратора)

```powershell
# Скачать Git
Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/latest/download/Git-2.43.0-64-bit.exe" -OutFile "$env:TEMP\Git-installer.exe"

# Запустить установщик
Start-Process -FilePath "$env:TEMP\Git-installer.exe" -ArgumentList "/VERYSILENT", "/NORESTART" -Wait
```

### Вариант 3: Установка через Chocolatey (если установлен)

```powershell
choco install git
```

## После установки

1. Перезапустите Cursor/VS Code
2. GitLens должен автоматически найти Git
3. Если проблема остается, проверьте настройки GitLens в VS Code:
   - Откройте настройки (Ctrl+,)
   - Найдите "git.path"
   - Укажите путь к git.exe (обычно C:\Program Files\Git\bin\git.exe)

## Проверка установки

После установки откройте новый терминал и выполните:

```bash
git --version
```

Если команда возвращает версию Git, значит установка прошла успешно.


