# Инструкция по загрузке проекта на GitHub

## Способ 1: Через GitHub Desktop (Рекомендуется)

1. **Откройте GitHub Desktop**
   - Запустите приложение GitHub Desktop

2. **Добавьте локальный репозиторий**
   - Нажмите `File` → `Add Local Repository`
   - Выберите папку: `D:\PRcURSOR\Alina`
   - Нажмите `Add repository`

3. **Создайте репозиторий на GitHub**
   - В GitHub Desktop нажмите кнопку `Publish repository` (вверху справа)
   - Или: `Repository` → `Publish repository`
   - Введите название: `medical-staff-training` (или любое другое)
   - Выберите описание: "Система обучения медицинского персонала с системой бонусов"
   - Выберите видимость: `Public` или `Private`
   - Снимите галочку "Keep this code private" если хотите публичный репозиторий
   - Нажмите `Publish repository`

4. **Готово!**
   - Проект будет загружен на GitHub
   - Вы получите ссылку на репозиторий

## Способ 2: Через командную строку (если GitHub Desktop не работает)

1. **Авторизуйтесь в GitHub CLI:**
   ```powershell
   gh auth login
   ```
   - Выберите `GitHub.com`
   - Выберите `HTTPS`
   - Выберите способ авторизации (браузер или токен)

2. **Создайте репозиторий и загрузите код:**
   ```powershell
   cd D:\PRcURSOR\Alina
   gh repo create medical-staff-training --public --source=. --remote=origin --push
   ```

## Способ 3: Через веб-интерфейс GitHub

1. **Создайте репозиторий на GitHub:**
   - Перейдите на https://github.com/new
   - Название: `medical-staff-training`
   - Описание: "Система обучения медицинского персонала с системой бонусов"
   - Выберите `Public` или `Private`
   - НЕ создавайте README, .gitignore или лицензию (они уже есть)
   - Нажмите `Create repository`

2. **В GitHub Desktop:**
   - Нажмите `Repository` → `Repository Settings` → `Remote`
   - Добавьте URL вашего репозитория
   - Или используйте команду:
   ```powershell
   cd D:\PRcURSOR\Alina
   git remote add origin https://github.com/ВАШ_USERNAME/medical-staff-training.git
   git branch -M main
   git push -u origin main
   ```

## Текущий статус проекта

✅ Git репозиторий инициализирован
✅ Все файлы добавлены в git
✅ Создан первый коммит
✅ Создан .gitignore файл

**Следующий шаг:** Используйте GitHub Desktop для публикации репозитория на GitHub.

