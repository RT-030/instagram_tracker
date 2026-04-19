# Instagram Tracker (MVP)

Dieses Repository enthält ein Frontend-MVP für eine Instagram-Tracking-Website mit den gewünschten Funktionskategorien:

- Login über Instagram Account (aktuell als Demo-Button)
- Lost follower
- New follower
- You don't follow back
- You follow each other
- Profile interaction (friends)
- Profile interaction (strangers)
- Ghost follower
- Top follower
- Lost following
- Blocked you
- Unblocked you
- Followers
- Following

## Starten

```bash
python3 -m http.server 8000
```

Dann im Browser öffnen:

- http://localhost:8000

## Qualitätssicherung

Es gibt eine CI-Pipeline in `.github/workflows/ci-frontend.yml`.

Bei jedem Push/Pull-Request werden automatisch ausgeführt:

- `node --check app.js` (JavaScript Syntaxprüfung)
- `python3 scripts/code_check.py` (strukturierte Projekt-Prüfungen für HTML/CSS/JS)

Du kannst die Checks lokal starten mit:

```bash
node --check app.js
python3 scripts/code_check.py
```

## .gitignore

Es gibt jetzt eine `.gitignore` für typische lokale/temporäre Dateien:

- OS- und Editor-Dateien (z. B. `.DS_Store`, `.vscode/`)
- Python-Artefakte (`__pycache__/`, virtuelle Umgebungen)
- Node/Frontend-Abhängigkeiten (`node_modules/`, Debug-Logs)
- Build-/Coverage-Ausgaben (`dist/`, `build/`, `coverage/`)

Das reduziert unnötige Dateien in Commits und verhindert häufige Merge-Konflikte bei lokalen Artefakten.

## Hinweis zu Merge-Konflikten (README.md)

Falls GitHub meldet, dass `README.md` Konflikte hat, kannst du sie lokal lösen mit:

```bash
git fetch origin
git merge origin/main
# Konflikte in README.md auflösen
git add README.md
git commit
```

Anschließend die Branch wieder pushen.

## Wichtiger Hinweis für Produktion

Für echte Daten brauchst du:

1. **Instagram Graph API** / **Instagram Basic Display API**
2. Eine **Meta App** im Developer Dashboard
3. OAuth-Flow (Redirect URI, Access Token, ggf. Refresh Token)
4. Server-seitige Speicherung von Snapshots, um Veränderungen wie `lost follower`, `new follower` oder `blocked/unblocked` über Zeiträume zu berechnen.

Die meisten erweiterten Relationship-Features sind über die offiziellen APIs nur eingeschränkt verfügbar. In der Praxis werden dafür häufig historische Snapshots (eigenes Tracking) und heuristische Auswertungen eingesetzt.
