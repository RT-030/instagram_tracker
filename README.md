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

## Wichtiger Hinweis für Produktion

Für echte Daten brauchst du:

1. **Instagram Graph API** / **Instagram Basic Display API**
2. Eine **Meta App** im Developer Dashboard
3. OAuth-Flow (Redirect URI, Access Token, ggf. Refresh Token)
4. Server-seitige Speicherung von Snapshots, um Veränderungen wie `lost follower`, `new follower` oder `blocked/unblocked` über Zeiträume zu berechnen.

Die meisten erweiterten Relationship-Features sind über die offiziellen APIs nur eingeschränkt verfügbar. In der Praxis werden dafür häufig historische Snapshots (eigenes Tracking) und heuristische Auswertungen eingesetzt.
