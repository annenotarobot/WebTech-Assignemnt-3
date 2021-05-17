# Architecture Manual 

Um einen reibungslosen Ablauf in der praktischen Umsetzung unserer Pläne zu garantieren, muss ein ausreichend guter Plan auch zur Umsetzung der Software existieren.
Planlose Ansätze können, besonders in großen Projekten, viel Zeit durch unnötiges Suchen von Fehlern kosten. Für den folgenden Aufbau haben wir uns für den MVC Ansatz entschieden.
MVC steht für Model, View, Controller und definiert eine klare Trennung von Software-Elementen und Datenflüssen, abhängig von der jeweiligen Funktion und Aufgabe der Komponenten.
Das Model enthält die grundlegende Datenstruktur und die Funktionalität zur korrekten Verarbeitung der Daten. Die View nutzt die Informationen, die durch das Model übergeben werden
und ist für die Darstellung des so genannten User Interface zuständig. Der Controller steuert die Anwendung. Indem der Nutzer mit Elementen der Anwendung
interagiert, können definierte Prozeduren ausgelöst werden, die vom Controller übernommen werden.

![Alt text](https://github.com/annenotarobot/WebTech/blob/main/documentation/architecture.svg)

## Model

Das Model besteht in unserem Projekt aus mehreren Elementen. Der "Requester" ist für das Abfragen von Informationen zuständig. Die XML Datenbank, die über das Community
Mashup verfügbar ist, wird durch den Requester ausgelesen. In der späteren Verarbeitung der Datenbank ist es zudem nötig, Verlinkungen zu graphischen Medien aufzulösen.
Der Requester soll auch diese Medien anfragen und an den Parser weiter geben.
Dem Parser werden die Rohdaten vom Requester übergeben, die von ihm verarbeitet werden. Die Daten sollen an dieser Stelle in ein Format gebracht werden, welches die 
weitere Arbeit durch andere Softwareelemente vereinfacht. 
Die aufbereiteten Daten werden vom Parser-Element an die Viewkomponente übergeben zur endgültigen Darstellung. Nach der Verarbeitung aller Daten durch den Parser,
wird diese Softwarekomponente zum Bereitsteller dieser Daten und startet eine Wartephase. 

## View

Die View besteht aus der HTML Grundlage und dem Angular basierten Javascript Backend. Die Aufgabe von Angular in dieser Anwendung ist es, die vom Parser übergebenen Daten
in einer aufbereiteten Form darzustellen. Hierzu muss via Javascript der Inhalt einiger Bereiche der HTML Seite modifiziert werden. Die Daten, die an die Viewkomponente 
übergeben werden, werden so vorbereitet, dass sie möglichst effizient in das Zielformat geformt werden können.
Da die View für das User Interface zuständig ist, müssen Elemente zur Nutzerinteraktion integriert sein, die es ermöglichen, Prozeduren des Controllers zu starten.

## Controller

Der Controller steuert die Anwendungen. Ereignisse in der Anwendung werden vom Controller verarbeitet. Der Controller kann mit dem Model interagieren, um beispielsweise
die Datenverarbeitung zu starten oder für besonderer Daten vom Model abzufragen. Um die Skalierbarkeit der Anwendung zu sichern, werden die Funktionalitäten unabhängig
voneinander in der Form von Modulen geschrieben, sodass Teile des Controllers ohne Probleme erweitert oder ausgetauscht werden können. Hierbei soll eine 
zentrale Verwaltungseinheit eine Referenz zu den jeweiligen Modulen enthalten.
Die Beschreibung weiterer Funktionaltitäten, die durch den Controller umgesetzt werden, sind in der ./Funktionalitäten.key beschrieben.
