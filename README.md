# Demo Actions — демонстрация GitHub Actions (JavaScript)

Пример Node.js приложения с пайплайном: **линтер → тесты → сборка → релиз (артефакт в GitHub Release)** и деплой статики на GitHub Pages.

## Пайплайн (что важно)

| Этап | Где | Описание |
|------|-----|----------|
| **Линтер** | CI, Release, Deploy, pre-commit | ESLint по коду (`npm run lint`) |
| **Тесты** | CI, Release, Deploy, pre-commit | Jest (`npm run test` / `npm run test:ci`) |
| **Сборка** | CI, Release, Deploy | `npm run build` → каталог `release/` (package.json, src/, package-lock.json) |
| **Релиз** | По тегу `v*` | Zip-артефакт в [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github) + авто-заметки |

## Возможности GitHub Actions в проекте

### 1. **CI** (`.github/workflows/ci.yml`)
- **Триггер:** push и pull request в `main`/`master`
- **Шаги:** lint → test (matrix Node 20, 22) → build
- **Артефакты:** coverage (7 дней), бандл `release-bundle` для последующих шагов

### 2. **Manual Run** (`.github/workflows/manual.yml`)
- **Триггер:** ручной запуск (Actions → Manual Run → Run workflow)
- **Inputs:** выбор окружения (staging/production) и произвольное сообщение
- **Два job:** первый собирает артефакт с build-info, второй скачивает его и выводит в лог
- Демонстрирует `workflow_dispatch` и передачу данных между jobs через артефакты

### 3. **Dependency Review** (`.github/workflows/dependency-review.yml`)
- **Триггер:** PR, в котором меняются `package.json` или lock-файлы
- **Назначение:** проверка новых/изменённых зависимостей на уязвимости
- Падение при обнаружении уязвимостей уровня high

### 4. **Release** (`.github/workflows/release.yml`)
- **Триггер:** push тега вида `v*` (например `v1.0.0`)
- **Шаги:** lint → test → build → упаковка в zip → создание GitHub Release с артефактом (файл в разделе Assets)

### 5. **Deploy** (`.github/workflows/deploy.yml`)
- **Триггер:** push в `main`/`master` или успешное завершение workflow CI
- **Деплой:** статическая страница на GitHub Pages (шаблон из `deploy/index.html.template`).
- Включи в репо: **Settings → Pages → Source: GitHub Actions**.

## Pre-commit (Husky)

Перед каждым коммитом запускается хук **pre-commit**: `npm run lint` и `npm run test`. Если линт или тесты падают, коммит отменяется. После `npm install` хук подхватывается автоматически (скрипт `prepare` инициализирует Husky).

## Запуск локально

```bash
npm install
npm run lint
npm test
npm run build   # результат в release/
```

Запуск приложения (HTTP-сервер на порту 3000):

```bash
npm start
```

Эндпоинты: `GET /` (инфо), `GET /hello?name=...`, `GET /add?a=1&b=2`, `GET /time`.

## Структура

```
.github/workflows/
  ci.yml              # основной CI
  manual.yml          # ручной запуск с параметрами
  dependency-review.yml
  release.yml         # релиз = артефакт в GitHub Release
  deploy.yml          # деплой на GitHub Pages
deploy/
  index.html.template # шаблон страницы для Pages
.husky/
  pre-commit         # хук: lint + test перед коммитом
scripts/
  build.js           # сборка бандла в release/
src/
  index.js            # код
  server.js           # HTTP-сервер (npm start)
  __tests__/index.test.js
```

Создай репозиторий на GitHub, добавь remote и запушь — workflow начнут срабатывать по событиям.

Чтобы заработал деплой: в настройках репозитория **Settings → Pages** выбери **Source: GitHub Actions**.
