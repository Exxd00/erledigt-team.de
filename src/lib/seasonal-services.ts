import type { Service } from './site.ts';

// These are complete regional service pages. They deliberately do not generate
// city-name variations: a local page needs its own useful editorial material.
export const seasonalServices: Service[] = [
  {
    slug: 'winterdienst-schneeraeumung',
    name: 'Winterdienst & Schneeräumung',
    category: 'Winter & Außenpflege',
    icon: 'Snowflake',
    summary:
      'Schnee räumen, Zugänge freihalten, Glätte gezielt behandeln. Mit eigenen Einsatzfahrzeugen und einem Plan für Ihr Objekt.',
    localPages: false,
    formHints: [
      'Welche Wege, Eingänge oder Stellflächen?',
      'Ungefähre Fläche und schmalste Zufahrt',
      'Nutzungszeiten, Saison und gewünschter Leistungsumfang',
    ],
    sections: [
      {
        title: 'Der Winterplan beginnt vor dem ersten Schnee',
        body: 'Wenn Beschäftigte zur Frühschicht kommen, Bewohner das Haus verlassen oder Kunden vor der Tür stehen, müssen die wichtigen Wege im Blick sein. ERLEDIGT TEAM bietet Winterdienst und Schneeräumung in Saterland und Umgebung für Unternehmen, Hausverwaltungen und private Grundstücke. Wir besprechen zuerst, welche Flächen betreut werden sollen: Gehwege, Hauseingänge, Zufahrten, vereinbarte Stellflächen oder die Verbindung zwischen Parkplatz und Gebäude. Daraus entsteht ein verständlicher Flächenplan mit Prioritäten. Eine ungefähre Größe und die üblichen Nutzungszeiten reichen für das erste Gespräch. Die genaue Ausführung stimmen wir anhand des Objekts ab.',
      },
      {
        title: 'Eigene Fahrzeuge, passend zur Fläche eingesetzt',
        body: 'Für diese Einsätze stehen eigene, für den Winterdienst vorgesehene Fahrzeuge zur Verfügung. Welche Technik an Ihrem Objekt sinnvoll eingesetzt werden kann, hängt von Durchfahrtsbreite, Rangiermöglichkeiten, Untergrund und Hindernissen ab. Poller, Stufen, empfindliche Beläge und schmale Übergänge werden bereits bei der Vorbereitung erfasst. Breite Flächen und schwer zugängliche Randbereiche benötigen unterschiedliche Arbeitsschritte. Ebenso wichtig ist ein geeigneter Platz für den geräumten Schnee. Eingänge, Sichtbereiche und notwendige Durchgänge dürfen durch die Ablage nicht verstellt werden. Ein Fahrzeug ersetzt deshalb keine sorgfältige Objektaufnahme, sondern ergänzt den abgestimmten Einsatzplan.',
      },
      {
        title: 'Räumen und Streuen als abgestimmte Aufgaben',
        body: 'Zur Schneeräumung kann ein vereinbarter Streudienst bei winterlicher Glätte hinzukommen. Wir klären die zu behandelnden Bereiche, geeignete Streumittel und die am Einsatzort geltenden Vorgaben. Eine allgemeine Zusage, überall Salz einzusetzen, wäre dafür nicht passend. Witterung, erneuter Schneefall und nachlaufendes Wasser können die Situation während eines Tages verändern. Deshalb besprechen wir, wie Einsätze ausgelöst werden, welche Zeitfenster gelten und wie zusätzliche Arbeiten abgestimmt werden. Die Betreuung kann als vereinbarte Saisonleistung oder nach Prüfung als einzelner Einsatz angefragt werden. Eine Anfrage allein bedeutet noch keine automatische Wetterüberwachung oder sofortige Einsatzgarantie.',
      },
      {
        title: 'Für Verwaltungen und Betriebe nachvollziehbar planen',
        body: 'Bei mehreren Gebäuden helfen eine Liste der Objektadressen und ein Ansprechpartner, die Planung zu bündeln. Benennen Sie unterschiedliche Öffnungszeiten, Lieferzonen und Bereiche mit besonderem Fußgängerverkehr. Wir halten fest, welche Aufgaben übernommen werden und welche Zuständigkeiten bei Ihnen verbleiben. Umfang und Form einer gewünschten Einsatzdokumentation werden vor der Beauftragung vereinbart. Örtliche Räum- und Streupflichten müssen für das konkrete Grundstück geprüft werden; sie sind nicht in allen Gemeinden gleich. Für ein Angebot nennen Sie bitte Flächen, Zugänge, gewünschte Betreuungszeit und bekannte Besonderheiten. Verfügbarkeit, Preis und Beginn bestätigen wir nach dieser Abstimmung persönlich.',
      },
    ],
    faqs: [
      {
        question: 'Hat ERLEDIGT TEAM eigene Fahrzeuge für den Winterdienst?',
        answer:
          'Ja. Für den Winterdienst stehen eigene Einsatzfahrzeuge zur Verfügung. Die passende Technik wird nach Fläche, Zufahrt und Untergrund gewählt; enge oder empfindliche Bereiche werden gesondert geplant.',
      },
      {
        question: 'Kann ich eine ganze Wintersaison anfragen?',
        answer:
          'Ja. Nennen Sie den gewünschten Zeitraum und die betroffenen Flächen. Auslösung der Einsätze, Betreuungszeiten, Räumen, Streuen und gegebenenfalls Dokumentation werden im Angebot festgelegt.',
      },
      {
        question: 'Wird nach einer Anfrage sofort Schnee geräumt?',
        answer:
          'Ein Einsatz beginnt erst nach bestätigter Beauftragung und Termin- beziehungsweise Betreuungsvereinbarung. Bei akutem Bedarf klären wir die aktuelle Möglichkeit direkt mit Ihnen; eine automatische Sofortzusage erfolgt nicht.',
      },
    ],
    sources: [
      {
        label: 'Gemeinde Saterland: örtliche Satzungen und Verordnungen',
        url: 'https://www.saterland.de/Verwaltung-und-Politik/Politik-/Ortsrecht-/',
      },
    ],
  },
  {
    slug: 'rasen-gruenflaechenpflege',
    name: 'Rasen- & Grünflächenpflege',
    category: 'Winter & Außenpflege',
    icon: 'Sprout',
    summary:
      'Gepflegte Rasenflächen, saubere Kanten und ein sinnvoller Pflegerhythmus für Gärten, Wohnanlagen und Firmengelände.',
    localPages: false,
    formHints: [
      'Ungefähre Rasenfläche und Geländeverlauf',
      'Zugänge, Hindernisse und gewünschter Rhythmus',
      'Schnittgut aufnehmen oder vor Ort belassen?',
    ],
    sections: [
      {
        title: 'Grünflächen, die zum Gebäude passen',
        body: 'Ein gepflegter Rasen prägt den Eindruck eines Grundstücks schon vor der Eingangstür. Gleichzeitig soll die Pflege zum Alltag passen und nicht bei jedem Termin neue Abstimmung verlangen. ERLEDIGT TEAM übernimmt Rasen- und Grünflächenpflege in Saterland und Umgebung für private Gärten, Wohnanlagen und gewerblich genutzte Grundstücke. Im Mittelpunkt stehen das vereinbarte Rasenmähen, die erreichbaren Randbereiche und eine sinnvolle Behandlung des Schnittguts. Wir schauen gemeinsam auf die Nutzung: Eine repräsentative Fläche vor dem Büro hat andere Anforderungen als eine wenig begangene Nebenfläche. Diese Unterschiede fließen in die Aufgabenverteilung ein.',
      },
      {
        title: 'Mäharbeiten nach Fläche und Wachstum planen',
        body: 'Die Quadratmeterzahl ist ein guter Anfang, beschreibt den Aufwand aber nicht vollständig. Schmale Durchgänge, Böschungen, einzelne Bäume und viele Beeteinfassungen beeinflussen die Arbeitsweise. Teilen Sie uns mit, welche Teile gut zugänglich sind und ob es getrennte Rasenbereiche gibt. Schnitthöhe und Häufigkeit werden passend zum Zustand und zur Nutzung abgestimmt. In trockenen Phasen oder bei stark durchnässtem Boden kann ein starrer Terminplan ungeeignet sein. Wir sprechen deshalb auch darüber, wie wetterbedingte Anpassungen erfolgen. Ziel ist eine nachvollziehbare Pflege, bei der die Fläche und ihre Entwicklung berücksichtigt werden.',
      },
      {
        title: 'Kanten und Schnittgut ausdrücklich mitdenken',
        body: 'Ein Mähauftrag ist klarer, wenn die Randarbeiten von Anfang an benannt werden. Soll entlang eines Weges nachgearbeitet werden? Welche Bereiche rund um Einbauten bleiben frei? Gehören schwer erreichbare Stellen zum Auftrag? Diese Fragen werden vor dem Einsatz geklärt. Auch der Umgang mit dem anfallenden Material wird festgelegt: Aufnahme, vereinbarte Ablage auf dem Grundstück oder ein gesondert abgestimmter Abtransport. Schnittgut soll weder auf angrenzende Gehwege noch in Entwässerungsrinnen gelangen. Spielgeräte, lose Gegenstände und empfindliche Pflanzbereiche sollten vorab bekannt sein. So kann der Arbeitsbereich sinnvoll vorbereitet werden.',
      },
      {
        title: 'Regelmäßige Außenpflege für Ihr Objekt',
        body: 'Für Wohnanlagen und Betriebe lässt sich Rasenpflege mit weiteren vereinbarten Aufgaben am Gebäude verbinden. Das vereinfacht die Koordination, ohne alle Tätigkeiten in ein unübersichtliches Pauschalpaket zu packen. Heckenpflege, Gebäudereinigung und Winterdienst bleiben jeweils klar beschriebene Leistungen mit eigenen Voraussetzungen. Für den Einstieg genügen Ort, ungefähre Fläche und Ihr gewünschter Rhythmus. Ergänzen Sie Hinweise zu Hanglagen, Zufahrten und Nutzungszeiten. Bei mehreren Objekten können Sie die Flächen gemeinsam anfragen. Wir prüfen den Bedarf und besprechen, ob ein einzelner Termin oder eine laufende Pflegevereinbarung besser passt. Sie erhalten vor der Beauftragung einen abgegrenzten Umfang.',
      },
    ],
    faqs: [
      {
        question: 'Bieten Sie regelmäßiges Rasenmähen an?',
        answer:
          'Ja. Fläche, Nutzung, Wachstum und Wetter bilden die Grundlage für einen abgestimmten Pflegerhythmus. Einmalige Mäharbeiten können ebenfalls angefragt werden.',
      },
      {
        question: 'Ist der Abtransport von Schnittgut enthalten?',
        answer:
          'Der Umgang mit dem Schnittgut wird ausdrücklich vereinbart. Bitte nennen Sie bei der Anfrage, ob eine Ablage auf dem Grundstück möglich ist oder ein Abtransport gewünscht wird.',
      },
      {
        question: 'Kann die Grünpflege mit Winterdienst kombiniert werden?',
        answer:
          'Ja, beide Bereiche können gemeinsam angefragt werden. Flächen, Aufgaben, Zeiträume und Konditionen werden für jede Leistung nachvollziehbar festgelegt.',
      },
    ],
  },
  {
    slug: 'hecken-gehoelzpflege',
    name: 'Hecken- & Gehölzpflege',
    category: 'Winter & Außenpflege',
    icon: 'Trees',
    summary:
      'Schonende Pflege von Hecken, Sträuchern und geeigneten, sicher erreichbaren Bäumen. Mit Blick auf Pflanzen, Artenschutz und zulässige Schnittarbeiten.',
    localPages: false,
    formHints: [
      'Pflanzenart, Länge und ungefähre Höhe',
      'Gewünschter Pflegeschnitt und sichere Zugänglichkeit',
      'Bekannte Nester, Schutzvorgaben und Schnittgut',
    ],
    sections: [
      {
        title: 'Konturen pflegen und den Bewuchs respektieren',
        body: 'Hecken und Gehölze geben einem Grundstück Struktur, schaffen Sichtschutz und begleiten Wege und Eingänge. Wenn der Zuwachs in einen Durchgang reicht oder eine Hecke ihre Form verliert, braucht es eine passende Pflege. ERLEDIGT TEAM bietet schonende Hecken- und Gehölzpflege in Saterland und Umgebung an. Dazu gehören abgestimmte Form- und Pflegeschnitte an Hecken, Sträuchern und geeigneten, sicher erreichbaren Bäumen. Wir klären zuerst, welche Pflanze betroffen ist und welches Ergebnis Sie wünschen. Die vorhandene Form erhalten, einzelne Triebe zurücknehmen und einen starken Rückschnitt durchführen sind unterschiedliche Aufgaben mit unterschiedlichen Voraussetzungen.',
      },
      {
        title: 'Schnittzeit und Artenschutz vorher prüfen',
        body: 'Nicht jeder Schnitt ist zu jeder Jahreszeit zulässig. Für Hecken und weitere in § 39 Bundesnaturschutzgesetz erfasste Gehölze gelten zwischen dem 1. März und dem 30. September Einschränkungen für starke Eingriffe. Schonende Form- und Pflegeschnitte sind unter den gesetzlichen Voraussetzungen möglich. Das bedeutet jedoch keine pauschale Freigabe für jede Pflanze oder jede Situation. Tiere, genutzte Nester und geschützte Lebensstätten müssen unabhängig vom Kalender berücksichtigt werden. Auch örtliche Schutzbestimmungen können relevant sein. Vor der Ausführung prüfen wir deshalb den vorgesehenen Eingriff und die erkennbaren Bedingungen. Bei unklaren Schutzvorgaben wird zunächst die zuständige Stelle einbezogen.',
      },
      {
        title: 'Zugängliche Pflegearbeiten klar abgrenzen',
        body: 'Die Höhe und Breite einer Hecke beeinflussen, wie sie erreichbar ist. Ebenso wichtig sind angrenzende Straßen, parkende Fahrzeuge, Zäune und empfindliche Beete. Beschreiben Sie bei der Anfrage, von welchen Seiten gearbeitet werden kann und ob der Zugang über fremde Grundstücke führen würde. An Bäumen geht es um geeignete, sicher erreichbare Pflegearbeiten nach vorheriger Prüfung. Baumfällungen, Seilkletterarbeiten, umfangreiche Kronenarbeiten und eine fachliche Baumkontrolle sind kein Bestandteil dieses Angebots. Diese klare Abgrenzung hilft, Ihren Bedarf von Anfang an richtig einzuordnen. Notwendige Freigaben werden nicht durch eine einfache Terminvereinbarung ersetzt.',
      },
      {
        title: 'Vom Schnitt bis zum aufgeräumten Arbeitsbereich',
        body: 'Vor Beginn vereinbaren wir die gewünschten Konturen, die betroffenen Abschnitte und den Umgang mit dem Schnittmaterial. Nennen Sie, ob eine geeignete Sammelstelle vorhanden ist oder ein Abtransport besprochen werden soll. Wege und Eingänge werden bei der Arbeitsplanung berücksichtigt; angrenzende Flächen und Hindernisse gehören ebenfalls zur Aufnahme. Bei Wohnanlagen und Firmengeländen kann die Gehölzpflege zusammen mit Rasenarbeiten angefragt werden. Beide Tätigkeiten behalten einen eigenen, nachvollziehbaren Umfang. Für die erste Einschätzung helfen Pflanzenart, Länge, Höhe und Einsatzort. Wenn diese Angaben noch nicht sicher sind, reicht zunächst eine Beschreibung; offene Fragen klären wir persönlich vor einem verbindlichen Angebot.',
      },
    ],
    faqs: [
      {
        question: 'Darf eine Hecke im Sommer gepflegt werden?',
        answer:
          'Schonende Form- und Pflegeschnitte können nach § 39 BNatSchG zulässig sein. Starke Eingriffe unterliegen Schutzzeiten. Artenschutz, vorhandene Nester und weitere Schutzvorschriften müssen zusätzlich geprüft werden.',
      },
      {
        question: 'Bieten Sie auch Arbeiten an Bäumen an?',
        answer:
          'Geeignete, sicher erreichbare Pflegearbeiten werden nach Prüfung von Pflanzenzustand, Zugang und rechtlichen Voraussetzungen übernommen. Fällungen, Kletterarbeiten, umfangreiche Kronenarbeiten und Baumkontrollen gehören nicht zu diesem Angebot.',
      },
      {
        question: 'Welche Angaben braucht die Anfrage?',
        answer:
          'Nennen Sie den Standort, die Pflanzenart soweit bekannt, ungefähre Länge und Höhe sowie den gewünschten Schnitt. Hinweise zu Nestern, Schutzvorgaben, Zugängen und Schnittgut helfen bei der Vorbereitung.',
      },
    ],
    sources: [
      {
        label: '§ 39 BNatSchG: Schutzzeiten und schonende Pflegeschnitte',
        url: 'https://www.gesetze-im-internet.de/bnatschg_2009/__39.html',
      },
      {
        label: '§ 44 BNatSchG: besonderer Artenschutz',
        url: 'https://www.gesetze-im-internet.de/bnatschg_2009/__44.html',
      },
    ],
  },
];
