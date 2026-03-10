# Demo Actions — учебный проект GitHub Actions (JavaScript)

Минимальный пайплайн для разбора: **линт → тесты → сборка → артефакты → деплой на Pages**.

## Что запускается при push в main

| Этап | Workflow | Описание |
|------|----------|----------|
| **Линт** | CI | `npm run lint` (ESLint) |
| **Тесты** | CI | `npm run test:ci` (Jest + coverage) |
| **Сборка** | CI | `npm run build` → папка `release/` |
| **Артефакты** | CI | В разделе Actions → Run → Artifacts: `artifacts` (coverage + release) |
| **Деплой** | Deploy | Статика из `deploy/index.html.template` на GitHub Pages |

## Файлы workflow

- **`.github/workflows/ci.yml`** — один job: Install → Lint → Test → Build → Upload artifacts (coverage и release в один архив).
- **`.github/workflows/deploy.yml`** — запускается после успешного CI: скачивает артефакт (из того же run), папку `dist/` из него публикует на GitHub Pages.

При push тега `v*` (например `v1.0.2`) запускается **Release**: создаётся новый релиз в **Releases** с zip-артефактом в разделе Assets.

Настройка Pages: **Settings → Pages → Source: GitHub Actions**.

## Локально

```bash
npm install
npm run lint
npm test
npm run build   # результат в release/
npm start       # сервер на :3000
```

Pre-commit (Husky): перед коммитом автоматически запускаются lint и test.
