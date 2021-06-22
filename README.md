# WebTech

## WebAnwendung mit CommunityMashup Interaktion

Diese Anwendung stellt eine portable Weboberfläche bereit, auf der Nutzer gezielt nach
Abschlussarbeiten, Seminaren, sowie Praktias suchen können.<br>
Die Anwendung wurde basierend auf einem leicht veränderten Datensatz unter `src/assets/mashup.xml` entwickelt.


## Installation

Es wird davon ausgegangen, dass npm und nodejs bereits auf dem Host installiert wurden.

Zur Installation der packages führen sie im Ordner `WebTech` den folgenden Befehl aus:

```
nmp i
```

Bei Problemen mit angular/material können sie so das Packet einzeln hinzufügen:
```
ng add @angular/material
  Custom; no; yes
```

## Neues Community Mashup
Folgende Änderungen auf dem Community Mashup wurden getan:
```
- Connection von Abschlussarbeit zu Professur (Child Organisation von Institut) eingefügt
- Connection von Abschlussarbeit zu Person eingefügt
```

Zukünftige Veränderungen zur Optimierung der App:

```
- MetaTags als 'Thementag' zu Abschlussarbeiten
```
