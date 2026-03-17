# AI Schematic IDEA

Desktop-приложение на **Electron + React + TypeScript** для интерактивного редактирования электрических схем в двух режимах:
- ручное редактирование в визуальном редакторе;
- AI-редактирование через команды на естественном языке.

## Требования
- Node.js **20+**
- npm **10+**

Проверка версий:
```bash
node -v
npm -v
```

## Первоначальная настройка
1. Установите зависимости:
   ```bash
   npm install
   ```
2. (Опционально) задайте ключ OpenAI для AI-панели:
   - Linux/macOS:
     ```bash
     export VITE_OPENAI_API_KEY="your_api_key"
     ```
   - Windows PowerShell:
     ```powershell
     $env:VITE_OPENAI_API_KEY="your_api_key"
     ```

## Запуск проекта
### Режим разработки (Electron + Vite + TypeScript watch)
```bash
npm run dev
```
Что делает команда:
- поднимает Vite dev server для renderer;
- запускает watch-компиляцию main/preload;
- запускает Electron после готовности renderer и main-скрипта.

### Production build
```bash
npm run build
```
Собирает:
- `dist/main/main.js`
- `dist/preload/preload.js`
- `dist/renderer/*`

### Запуск собранного приложения
```bash
npm run start
```

## Тесты
```bash
npm run test
```

## Документация
- Архитектура: `docs/ARCHITECTURE.md`
- Структура файлов: `docs/FILE_STRUCTURE.md`

## Почему может быть белый экран
Чаще всего причина в том, что запускается Electron без собранного renderer-бандла.

Что проверить:
1. Выполните `npm install`
2. Выполните `npm run build`
3. Выполните `npm run start`

Теперь `npm run start` автоматически делает build перед запуском приложения.

Если экран всё ещё пустой:
- откройте DevTools: `Ctrl+Shift+I`
- проверьте ошибки в консоли renderer и в терминале Electron
