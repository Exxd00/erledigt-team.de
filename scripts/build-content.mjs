import fs from 'node:fs';
// Original service copy, written for this business. No imported marketing text.
const services = [
  {
    slug: 'unterhaltsreinigung',
    name: 'Unterhaltsreinigung',
    category: 'Gebäudereinigung',
    summary:
      'Sauberkeit, die im Alltag bleibt. Regelmäßige Pflege für Räume, die täglich genutzt werden.',
    formHints: [
      'Nutzungsart und ungefähre Fläche',
      'Gewünschter Reinigungsrhythmus',
      'Mögliche Zeitfenster und Zugang',
    ],
    sections: [
      {
        title: 'Regelmäßige Pflege mit einem klaren Plan',
        body: 'Unterhaltsreinigung sorgt dafür, dass alltägliche Verschmutzungen nicht zum Dauerzustand werden. Entscheidend ist dabei ein Ablauf, der sich an der Nutzung Ihrer Räume orientiert. Ein stark frequentierter Eingang braucht andere Aufmerksamkeit als ein selten genutzter Besprechungsraum. ERLEDIGT TEAM bespricht mit Ihnen, welche Bereiche regelmäßig gereinigt werden sollen und welche Aufgaben nur in größeren Abständen anstehen. Daraus entsteht ein übersichtlicher Plan für Ihr Objekt. Das Ziel ist eine nachvollziehbare Pflege, die im Alltag funktioniert und bei verändertem Bedarf angepasst werden kann.',
      },
      {
        title: 'Böden, Kontaktflächen und Nebenräume zusammen betrachten',
        body: 'Zum vereinbarten Umfang können die Reinigung von Bodenflächen, frei zugänglichen Oberflächen, Sanitärräumen und Gemeinschaftsbereichen gehören. Abfallbehälter, Küchenzonen oder häufig berührte Stellen werden ausdrücklich im Leistungsverzeichnis berücksichtigt. Nicht jede Oberfläche verträgt dieselbe Behandlung. Wir unterscheiden deshalb nach Material, Zustand und Herstellerhinweisen. Persönliche Gegenstände und Unterlagen bleiben an ihrem Platz; welche Arbeitsflächen freigeräumt werden sollen, klären wir vorher. Besondere Aufgaben wie eine intensive Grundpflege oder die Reinigung schwer erreichbarer Glasflächen werden separat eingeplant.',
      },
      {
        title: 'Ein Rhythmus, der zur tatsächlichen Nutzung passt',
        body: 'Täglich, mehrmals wöchentlich oder in größeren Abständen: Die passende Häufigkeit ergibt sich aus der Nutzung, nicht allein aus der Quadratmeterzahl. Saisonale Belastung, Besucheraufkommen und die Zahl gemeinsam genutzter Räume können den Bedarf verändern. Teilen Sie uns Ihre Prioritäten und mögliche Zeitfenster mit. Zugang, Schlüsselübergabe und die Nutzung einzelner Bereiche während des Einsatzes stimmen wir vor Beginn ab. Bei laufenden Aufträgen lassen sich Änderungen gezielt besprechen, statt den gesamten Plan jedes Mal neu aufzusetzen.',
      },
      {
        title: 'So bereiten Sie Ihre Anfrage vor',
        body: 'Für eine erste Einschätzung helfen die Objektart, die ungefähre Fläche und der gewünschte Rhythmus. Nennen Sie außerdem empfindliche Bodenbeläge oder Bereiche, die besonders wichtig sind. Genaue Maße können später ergänzt werden. Wenn Umfang oder Zustand aus der Beschreibung nicht sicher einzuschätzen sind, kann eine Besichtigung sinnvoll sein. Das Angebot beschreibt die abgestimmten Aufgaben und die vorgesehenen Abläufe. Eine Anfrage führt noch nicht zu einem verbindlichen Termin. Nach Ihrer Beauftragung legen wir gemeinsam fest, wann die regelmäßige Reinigung startet und wie Rückmeldungen zum Ergebnis weitergegeben werden.',
      },
    ],
    faqs: [
      {
        question: 'Sind Reinigungsmittel automatisch im Angebot enthalten?',
        answer:
          'Das klären wir im individuellen Angebot. Materialien, Verfahren und mögliche Verbrauchsartikel werden passend zum Objekt abgestimmt.',
      },
      {
        question: 'Kann ich den Rhythmus später ändern?',
        answer:
          'Teilen Sie uns geänderte Nutzungszeiten oder einen anderen Bedarf mit. Wir prüfen, wie sich Umfang und Terminplanung anpassen lassen.',
      },
    ],
  },
  {
    slug: 'buero-praxisreinigung',
    name: 'Büro- & Praxisreinigung',
    category: 'Gebäudereinigung',
    summary:
      'Gepflegte Arbeitsplätze, ein sauberer Empfang und Räume, in denen sich Menschen wohlfühlen.',
    formHints: [
      'Büro oder Praxis und Raumaufteilung',
      'Öffnungszeiten und mögliche Reinigungszeiten',
      'Hygieneplan und besondere Vorgaben',
    ],
    sections: [
      {
        title: 'Saubere Arbeitsräume ohne unnötige Unterbrechungen',
        body: 'In Büros und Praxen muss Reinigung mit dem laufenden Alltag vereinbar sein. Mitarbeitende brauchen nutzbare Arbeitsplätze, Besucher einen gepflegten Empfang und alle Beteiligten klare Abläufe. Deshalb planen wir die Büro- und Praxisreinigung nicht nur nach Flächen. Wir berücksichtigen auch Öffnungszeiten, vertrauliche Bereiche und gemeinsam genutzte Räume. ERLEDIGT TEAM klärt mit Ihnen, welche Zonen wann zugänglich sind und worauf besonders geachtet werden soll. So können die vereinbarten Arbeiten vorbereitet werden, ohne Abläufe spontan vor Ort neu organisieren zu müssen.',
      },
      {
        title: 'Vom Empfang bis zur Teeküche',
        body: 'Empfang, Flure, Besprechungsräume, Sanitärbereiche und Küchen stellen jeweils eigene Anforderungen. In Arbeitszimmern kommen unterschiedliche Bodenbeläge und empfindliche Oberflächen hinzu. Wir besprechen, welche frei zugänglichen Stellen gereinigt werden sollen. Dokumente, Bildschirme und technische Geräte werden nur nach ausdrücklicher Vereinbarung einbezogen. Auch die Frage, ob Papierkörbe geleert oder Verbrauchsmaterialien ergänzt werden sollen, gehört zur Abstimmung. Ein klarer Umfang verhindert Missverständnisse und macht es leichter, einzelne Räume oder zusätzliche Aufgaben später gezielt aufzunehmen.',
      },
      {
        title: 'Praxisräume brauchen eindeutige Vorgaben',
        body: 'Bei Praxen ist zwischen allgemeiner Reinigung und speziell geregelten Hygienemaßnahmen zu unterscheiden. Vorhandene Hygienepläne, Materialvorgaben und Zuständigkeiten werden vor einem Auftrag besprochen. Eine gewöhnliche Raumreinigung ersetzt weder die Aufbereitung medizinischer Instrumente noch eine gesondert vereinbarte Desinfektionsleistung. Patientendaten, Medikamente und medizinische Geräte bleiben außerhalb des vereinbarten allgemeinen Umfangs. Teilen Sie uns deshalb schon bei der Anfrage mit, welche Art von Praxis betroffen ist und welche internen Regeln bei Zugang und Durchführung einzuhalten sind.',
      },
      {
        title: 'Planung mit Rücksicht auf Menschen und Ausstattung',
        body: 'Hilfreich sind die Zahl der Räume, die ungefähre Fläche, die gewünschten Tage und Hinweise zu Alarmanlage oder Schlüsselübergabe. Bei sensiblen Bereichen legen wir fest, wer als Ansprechpartner erreichbar ist und wie Abweichungen gemeldet werden. Für eine realistische Einschätzung kann ein gemeinsamer Rundgang sinnvoll sein. Das Angebot beschreibt anschließend die abgestimmten Aufgaben. Wenn sich Arbeitsplätze, Öffnungszeiten oder Besucherzahlen ändern, lässt sich der Reinigungsplan überprüfen. Eine gute Zusammenarbeit beruht auf klarer Kommunikation, freigegebenen Flächen und einer Pflege, die sich am tatsächlichen Betrieb orientiert.',
      },
    ],
    faqs: [
      {
        question: 'Reinigen Sie während unserer Öffnungszeiten?',
        answer:
          'Wir besprechen ein Zeitfenster, das zu Ihrem Betrieb passt. Zugänglichkeit und mögliche Beeinträchtigungen werden vor der Terminbestätigung geklärt.',
      },
      {
        question: 'Ist eine Praxisreinigung automatisch eine Desinfektion?',
        answer:
          'Nein. Spezifische Hygienemaßnahmen benötigen einen ausdrücklich abgestimmten Umfang und müssen zu den geltenden Vorgaben Ihrer Praxis passen.',
      },
    ],
  },
  {
    slug: 'grund-sonderreinigung',
    name: 'Grund- & Sonderreinigung',
    category: 'Gebäudereinigung',
    summary:
      'Für Aufgaben, die über die laufende Pflege hinausgehen. Gezielt geplant und auf das Material abgestimmt.',
    formHints: [
      'Betroffene Oberflächen und Beläge',
      'Art und Dauer der Verschmutzung',
      'Vorherige Behandlungen oder Beschichtungen',
    ],
    sections: [
      {
        title: 'Wenn die normale Reinigung an ihre Grenzen kommt',
        body: 'Manchmal braucht eine Fläche mehr als den üblichen Pflegedurchgang. Fest sitzende Rückstände, länger nicht gereinigte Bereiche oder eine veränderte Nutzung können eine intensivere Behandlung erforderlich machen. Eine Grund- oder Sonderreinigung beginnt deshalb mit einer genauen Beschreibung des Problems. ERLEDIGT TEAM betrachtet Material, Zustand und Ziel der Reinigung gemeinsam. Was soll entfernt werden, welche Oberfläche liegt darunter und welche Nutzung ist anschließend geplant? Diese Fragen bestimmen den sinnvollen Umfang und helfen, unrealistische Erwartungen von Beginn an zu vermeiden.',
      },
      {
        title: 'Materialprüfung vor intensiver Behandlung',
        body: 'Naturstein, elastische Beläge, Fliesen und beschichtete Flächen reagieren unterschiedlich auf Feuchtigkeit, Mechanik und Reinigungsmittel. Bereits vorhandene Schäden oder abgenutzte Schutzschichten lassen sich durch Reinigung nicht einfach rückgängig machen. Deshalb benötigen wir Hinweise zu früheren Behandlungen und bekannten Empfindlichkeiten. Je nach Aufgabe kann eine Probefläche sinnvoll sein. Sie zeigt, wie das Material reagiert und welches Ergebnis unter den vorhandenen Bedingungen erreichbar ist. Eine zusätzliche Pflege oder Beschichtung gehört nur dann zum Auftrag, wenn sie ausdrücklich vereinbart wurde.',
      },
      {
        title: 'Sonderaufgaben konkret benennen',
        body: 'Der Begriff Sonderreinigung umfasst sehr unterschiedliche Tätigkeiten. Eine genaue Beschreibung ist daher hilfreicher als eine allgemeine Bezeichnung. Nennen Sie uns die betroffenen Räume, den Anlass und die Art der Rückstände. Auch Zugänglichkeit, Möblierung und die verfügbare Arbeitszeit spielen eine Rolle. Gefahrstoffe, unbekannte Substanzen oder besondere Kontaminationen müssen vorab offen angesprochen werden; solche Aufgaben setzen eine gesonderte Prüfung voraus. Wir sagen erst nach Klärung der Voraussetzungen zu, welche Arbeiten im konkreten Fall übernommen werden können.',
      },
      {
        title: 'Vom Zustand zum nachvollziehbaren Angebot',
        body: 'Für die Angebotserstellung helfen Fotos, die später im direkten Kontakt übermittelt werden können, sowie eine ungefähre Flächenangabe. Bitte teilen Sie mit, ob Räume leer stehen oder während der Reinigung weiter genutzt werden müssen. Trocknungs- und Freigabezeiten gehören bei empfindlichen Belägen zur Planung. Nach der Einschätzung stimmen wir Ziel, Verfahren und Abgrenzung des Auftrags ab. So wissen Sie, welche Veränderungen zu erwarten sind und welche Spuren möglicherweise bestehen bleiben. Die abschließende Rückmeldung kann außerdem Hinweise geben, wie sich das Ergebnis mit geeigneter laufender Pflege erhalten lässt.',
      },
    ],
    faqs: [
      {
        question: 'Verschwinden durch Grundreinigung auch Kratzer?',
        answer:
          'Nein. Reinigung entfernt Verschmutzungen. Schäden, Abrieb und Verfärbungen können je nach Material dauerhaft bleiben.',
      },
      {
        question: 'Brauchen Sie vorab eine Besichtigung?',
        answer:
          'Bei unbekannten Belägen oder hartnäckigen Rückständen kann eine Besichtigung oder Probefläche für eine belastbare Einschätzung nötig sein.',
      },
    ],
  },
  {
    slug: 'treppenhausreinigung',
    name: 'Treppenhausreinigung',
    category: 'Gebäudereinigung',
    summary:
      'Ein gepflegter Weg von der Haustür bis zur Wohnung. Für gemeinschaftlich genutzte Eingänge und Treppenräume.',
    formHints: [
      'Zahl der Etagen und Aufgänge',
      'Beläge, Geländer und Eingangsbereiche',
      'Gewünschter Turnus und Zugang',
    ],
    sections: [
      {
        title: 'Der erste Eindruck beginnt am Eingang',
        body: 'Ein Treppenhaus verbindet private und gemeinschaftliche Bereiche. Bewohner, Besucher und Lieferdienste tragen täglich Schmutz hinein, während Geländer und Türen häufig berührt werden. Eine planbare Treppenhausreinigung schafft hier klare Zuständigkeiten. ERLEDIGT TEAM stimmt mit Eigentümern und Verwaltungen ab, welche Flächen zum Auftrag gehören und in welchem Rhythmus sie gepflegt werden. Dabei betrachten wir den Weg vom Eingang über die Podeste bis zu den einzelnen Etagen. Auch Nebenbereiche lassen sich aufnehmen, wenn sie vorab im Umfang festgehalten werden.',
      },
      {
        title: 'Stufen, Podeste und Kontaktflächen unterscheiden',
        body: 'Stein, Fliesen, Holz oder elastische Beläge erfordern unterschiedliche Pflege. Auf Treppen kommt hinzu, dass Feuchtigkeit die sichere Nutzung beeinflussen kann. Die Durchführung wird deshalb so geplant, dass Laufwege möglichst geordnet bleiben. Zu den möglichen Aufgaben gehören Bodenflächen, Handläufe, frei zugängliche Fensterbänke und vereinbarte Türbereiche. Kellerzugänge, Aufzüge oder größere Glasflächen sind nicht automatisch enthalten. Ein eindeutiges Leistungsverzeichnis macht sichtbar, welche Aufgaben regelmäßig anfallen und welche bei Bedarf separat beauftragt werden können.',
      },
      {
        title: 'Absprachen für Häuser mit mehreren Parteien',
        body: 'In gemeinsam genutzten Gebäuden erleichtert eine feste Kontaktperson die Organisation. Wir klären, wie der Zugang erfolgt, wo Geräte sicher abgestellt werden können und wie Bewohner über erforderliche Rücksichtnahme informiert werden. Abgestellte Gegenstände, Kinderwagen oder persönliche Dekoration werden nicht ohne Absprache umgeräumt. Bitte nennen Sie bekannte Engstellen und besondere Hausregeln. Wenn mehrere Aufgänge betreut werden sollen, ist eine Übersicht mit Etagenzahl und Bodenarten hilfreich. So lassen sich ähnliche Arbeiten sinnvoll zusammen planen und unterschiedliche Anforderungen trotzdem berücksichtigen.',
      },
      {
        title: 'Regelmäßige Pflege nachvollziehbar vereinbaren',
        body: 'Der passende Turnus hängt unter anderem von Bewohnerzahl, Eingangssituation und tatsächlicher Belastung ab. Nasse Witterung oder Bauarbeiten im Haus können vorübergehend zusätzlichen Aufwand verursachen. Teilen Sie uns solche Veränderungen mit, damit wir den Bedarf neu einschätzen können. Für eine erste Anfrage reichen die Adresse beziehungsweise der Ort, die Anzahl der Aufgänge und eine grobe Beschreibung. Nach der Abstimmung erhalten Sie einen klaren Umfang. Die Reinigung ersetzt keine bauliche Instandhaltung; beschädigte Stufen, lockere Geländer oder andere Mängel sollten unabhängig davon durch die zuständigen Fachleute geprüft werden.',
      },
    ],
    faqs: [
      {
        question: 'Gehören Keller und Aufzug dazu?',
        answer:
          'Diese Bereiche können nach Absprache einbezogen werden. Entscheidend ist das vereinbarte Leistungsverzeichnis.',
      },
      {
        question: 'Müssen Bewohner während der Reinigung zuhause sein?',
        answer:
          'In der Regel genügt der abgestimmte Zugang zu den Gemeinschaftsflächen. Die konkrete Schlüssel- oder Türregelung vereinbaren wir vorher.',
      },
    ],
  },
  {
    slug: 'glas-fensterreinigung',
    name: 'Glas- & Fensterreinigung',
    category: 'Glas & Fenster',
    summary:
      'Klare Sicht und mehr Licht. Für Fenster, Glasflächen und die dazugehörigen Rahmen nach Vereinbarung.',
    formHints: [
      'Anzahl und ungefähre Größe der Fenster',
      'Innen- und Außenseiten, Rahmen und Falze',
      'Stockwerk und sichere Erreichbarkeit',
    ],
    sections: [
      {
        title: 'Mehr Licht durch gepflegte Glasflächen',
        body: 'Fenster prägen den Eindruck eines Raums von innen und außen. Staub, Witterung und Nutzung hinterlassen mit der Zeit Spuren auf dem Glas. Eine gezielte Fensterreinigung sorgt wieder für klare Sicht, muss aber zur jeweiligen Konstruktion passen. ERLEDIGT TEAM bespricht deshalb nicht nur die Zahl der Scheiben. Auch Öffnungsart, Stockwerk und die gewünschte Bearbeitung von Innen- und Außenseiten gehören zur Planung. So können Aufwand und Zugang beurteilt werden, bevor ein Termin vereinbart wird.',
      },
      {
        title: 'Rahmen und Falze ausdrücklich mitplanen',
        body: 'Glas, Rahmen, Dichtungen und Falze bilden zwar ein gemeinsames Bauteil, benötigen aber unterschiedliche Aufmerksamkeit. Welche Bereiche gereinigt werden sollen, wird im Angebot festgehalten. Gleiches gilt für Fensterbänke, Glastüren, Schaufenster oder Wintergartenflächen. Empfindliche Beschichtungen und bereits vorhandene Kratzer sollten vor Beginn bekannt sein. Hartnäckige Ablagerungen oder Rückstände von Bauarbeiten können eine besondere Vorgehensweise erfordern. Eine normale Glasreinigung ist deshalb nicht automatisch eine Entfernung sämtlicher mineralischer Beläge, Klebereste oder Materialschäden.',
      },
      {
        title: 'Sichere Erreichbarkeit bestimmt die Durchführung',
        body: 'Nicht jedes Fenster kann auf dieselbe Weise erreicht werden. Festverglasungen, schwer zugängliche Außenseiten und Flächen über Anbauten müssen gesondert betrachtet werden. Beschreiben Sie uns die Situation möglichst konkret. Wir prüfen, welche Zugänge und Arbeitsmittel sinnvoll sind und ob zusätzliche Voraussetzungen geschaffen werden müssen. Innen helfen freigeräumte Fensterbänke und zugängliche Öffnungsbereiche. Vorhänge, empfindliche Möbel und elektrische Geräte in Fensternähe werden in die Vorbereitung einbezogen. Eine sichere Ausführung hat Vorrang vor einer vorschnellen Zusage.',
      },
      {
        title: 'Einmaliger Einsatz oder wiederkehrend klare Sicht',
        body: 'Ob Frühjahrspflege im Privathaus oder regelmäßige Reinigung von Schaufenstern: Die Nutzung und die Lage der Flächen beeinflussen den geeigneten Rhythmus. Für ein Angebot helfen die ungefähre Anzahl, die Größenordnung und Hinweise auf besondere Verschmutzungen. Exakte Maße sind für die erste Nachricht nicht zwingend nötig. Bei komplexen Glasflächen kann eine Besichtigung erforderlich sein. Wetterabhängige Außenarbeiten stimmen wir mit Blick auf eine sinnvolle Durchführung ab. Nach Ihrer Beauftragung klären wir den Zugang und den konkreten Termin; die erste Anfrage selbst ist noch keine feste Buchung.',
      },
    ],
    faqs: [
      {
        question: 'Werden die Rahmen mitgereinigt?',
        answer:
          'Wenn Sie Rahmen und Falze wünschen, nehmen wir sie ausdrücklich in den abgestimmten Umfang auf.',
      },
      {
        question: 'Können auch feststehende Glasflächen gereinigt werden?',
        answer:
          'Wir prüfen dafür die sichere Erreichbarkeit und geeignete Arbeitsmittel. Bitte nennen Sie Höhe und Zugang bereits in der Anfrage.',
      },
    ],
  },
  {
    slug: 'maschinen-anlagenreinigung',
    name: 'Maschinen- & Anlagenreinigung',
    category: 'Industrie & Gewerbe',
    summary:
      'Reinigung technischer Bereiche mit einer Planung, die Sicherheit, Material und Betriebsablauf zusammenbringt.',
    formHints: [
      'Art der Maschine oder Anlage',
      'Freigabe, Stillstandszeit und Herstellerhinweise',
      'Zugängliche Bereiche und Verschmutzungsart',
    ],
    sections: [
      {
        title: 'Technische Reinigung beginnt mit Abstimmung',
        body: 'Bei Maschinen und Anlagen zählt eine genaue Abgrenzung des Auftrags. Von außen zugängliche Flächen unterscheiden sich deutlich von inneren Bauteilen oder sicherheitsrelevanten Komponenten. ERLEDIGT TEAM bespricht mit Ihrem Betrieb, welche Bereiche gereinigt werden dürfen und welche Vorgaben einzuhalten sind. Die Reinigung ist keine Wartung, Reparatur oder technische Prüfung. Sie ergänzt die betriebliche Pflege nur innerhalb des vereinbarten Umfangs. Vor einer Zusage benötigen wir deshalb Angaben zur Anlage, zur Verschmutzung und zu den vorgesehenen Freigaben.',
      },
      {
        title: 'Herstellerhinweise und Materialverträglichkeit berücksichtigen',
        body: 'Ölhaltige Rückstände, Produktionsstaub und Ablagerungen können verschiedene Verfahren erfordern. Gleichzeitig reagieren Dichtungen, Beschichtungen, Lagerstellen und elektrische Komponenten unterschiedlich auf Feuchtigkeit oder Reinigungsmittel. Herstellerhinweise und betriebliche Vorgaben sind daher Grundlage der Planung. Unbekannte Stoffe müssen vorab identifiziert werden. Es wird nicht pauschal davon ausgegangen, dass Wasser oder hoher Druck geeignet sind. Welche Hilfsmittel eingesetzt werden und welche Teile geschützt oder ausgespart bleiben, wird mit einer verantwortlichen Person abgestimmt.',
      },
      {
        title: 'Stillstand, Freigabe und Zugang vor dem Einsatz klären',
        body: 'Der sichere Zustand einer Anlage und ihre Freigabe müssen durch die dafür zuständigen Personen im Betrieb gewährleistet werden. Wir besprechen das geplante Zeitfenster, notwendige Unterweisungen und den Zugang zum Arbeitsbereich. Bewegliche Teile, Restenergien und benachbarte Produktionsabläufe dürfen nicht erst während der Reinigung ungeklärt auffallen. Auch die Aufnahme und Entsorgung anfallender Rückstände gehört bei Bedarf zur Abstimmung. Eine kurze Beschreibung der Anlage und vorhandene Vorgaben helfen uns einzuschätzen, ob und unter welchen Voraussetzungen die Aufgabe übernommen werden kann.',
      },
      {
        title: 'Ein nachvollziehbarer Umfang für Ihren Betrieb',
        body: 'Nennen Sie in Ihrer Anfrage die Maschinenart, die betroffenen Oberflächen und das gewünschte Ziel. Hilfreich sind außerdem Informationen zum bisherigen Reinigungsverfahren und zu empfindlichen Bereichen. Bei komplexen Anlagen ist eine Besichtigung sinnvoll, um Zugänglichkeit und Aufwand zu prüfen. Anschließend grenzen wir die Reinigung gegenüber Wartung und Instandhaltung ab. Das Angebot hält die freigegebenen Tätigkeiten fest. Nach dem Einsatz erfolgt die betriebliche Wiederinbetriebnahme weiterhin durch die zuständigen Fachpersonen. Wir versprechen weder eine technische Leistungssteigerung noch die Beseitigung vorhandener Defekte durch Reinigung.',
      },
    ],
    faqs: [
      {
        question: 'Ist die Reinigung auch eine Maschinenwartung?',
        answer:
          'Nein. Wartung, technische Prüfung und Wiederinbetriebnahme bleiben Aufgaben der dafür zuständigen Fachpersonen.',
      },
      {
        question: 'Wer stellt die sichere Abschaltung sicher?',
        answer:
          'Die Freigabe und Sicherung werden vorab mit den verantwortlichen Personen Ihres Betriebs geregelt.',
      },
    ],
  },
  {
    slug: 'hallen-gewerbereinigung',
    name: 'Hallen- & Gewerbeflächenreinigung',
    category: 'Industrie & Gewerbe',
    summary:
      'Gepflegte große Flächen, abgestimmt auf Laufwege, Lagerbetrieb und die Belastung Ihrer Böden.',
    formHints: [
      'Fläche und Art des Bodenbelags',
      'Lager-, Verkehrs- und Arbeitszonen',
      'Betriebszeiten und freie Arbeitsbereiche',
    ],
    sections: [
      {
        title: 'Große Flächen in sinnvolle Bereiche aufteilen',
        body: 'Eine Halle ist selten eine einzige gleichmäßig genutzte Fläche. Lagerzonen, Verkehrswege, Arbeitsplätze und Zugänge werden unterschiedlich beansprucht. Für eine geeignete Reinigung teilen wir das Objekt deshalb zunächst nach Nutzung und Material auf. ERLEDIGT TEAM bespricht, welche Bereiche frei zugänglich sind und welche während des Betriebs gereinigt werden können. Ein klarer Plan hilft, Fahrwege und Arbeitsabläufe zu berücksichtigen. Dabei zählt nicht nur die Gesamtgröße, sondern vor allem, welche Flächen tatsächlich bearbeitet werden sollen.',
      },
      {
        title: 'Beläge und Rückstände bestimmen den Aufwand',
        body: 'Beschichtete Industrieböden, Beton, Fliesen und andere Beläge reagieren unterschiedlich auf Mechanik und Feuchtigkeit. Staub, Abrieb oder betriebliche Rückstände brauchen eine passende Behandlung. Informationen zu vorhandenen Beschichtungen und früheren Reinigungen erleichtern die Auswahl. Markierungen, beschädigte Stellen und empfindliche Übergänge werden vorab angesprochen. Eine Reinigung erneuert keine verschlissene Bodenbeschichtung und repariert keine Risse. Wenn besondere Stoffe oder unbekannte Ablagerungen vorhanden sind, muss ihre Handhabung geklärt werden, bevor ein Verfahren zugesagt werden kann.',
      },
      {
        title: 'Reinigung mit dem Betriebsablauf verbinden',
        body: 'Für eine sichere Durchführung besprechen wir mögliche Sperrbereiche, Staplerverkehr und die vorgesehene Reihenfolge. Freie Flächen ermöglichen einen anderen Ablauf als eng belegte Lagergänge. Nennen Sie uns deshalb Zeiten, zu denen bestimmte Zonen zugänglich werden, sowie Wasser- und Stromanschlüsse, soweit sie für das gewählte Verfahren benötigt werden. Waren, Maschinen und technische Einrichtungen werden nur nach Vereinbarung einbezogen. Auch das Umstellen gelagerter Gegenstände ist keine selbstverständliche Nebenleistung, sondern wird mit den Verantwortlichen geplant.',
      },
      {
        title: 'Passender Umfang für einmalige und laufende Pflege',
        body: 'Eine intensive Reinigung vor einer Übergabe kann andere Schwerpunkte haben als die regelmäßige Pflege genutzter Gewerbeflächen. Für Ihr Angebot brauchen wir den Ort, eine grobe Flächengröße, die Bodenart und das gewünschte Zeitfenster. Bei größeren Objekten hilft ein Lageplan oder ein gemeinsamer Rundgang. Wir legen fest, welche Ergebnisse im vorhandenen Zustand realistisch sind und wie die Fläche anschließend wieder genutzt werden kann. Bei wiederkehrenden Aufträgen lässt sich der Turnus nach tatsächlicher Belastung ausrichten. Änderungen in Nutzung oder Warenbewegung sollten dabei rechtzeitig in die Planung einfließen.',
      },
    ],
    faqs: [
      {
        question: 'Muss die ganze Halle leer sein?',
        answer:
          'Nicht unbedingt. Wir prüfen, welche Bereiche frei zugänglich sind und ob eine abschnittsweise Reinigung sinnvoll möglich ist.',
      },
      {
        question: 'Werden Bodenmarkierungen entfernt?',
        answer:
          'Markierungen werden in der Planung berücksichtigt. Eine gezielte Entfernung ist eine gesonderte Aufgabe und wird nicht vorausgesetzt.',
      },
    ],
  },
  {
    slug: 'baustellenreinigung',
    name: 'Baustellenreinigung',
    category: 'Industrie & Gewerbe',
    summary:
      'Von der Bauphase zur nutzbaren Fläche. Grob- und Feinreinigung für einen sauber vorbereiteten Übergang.',
    formHints: [
      'Bauphase und geplante Übergabe',
      'Flächen, Materialien und vorhandene Rückstände',
      'Noch laufende Gewerke und Zugang',
    ],
    sections: [
      {
        title: 'Reinigung zum richtigen Zeitpunkt einplanen',
        body: 'Nach Bau- oder Renovierungsarbeiten ist ein Raum oft fertiggestellt, aber noch nicht bezugsbereit. Staub, Verpackungen und Rückstände verschiedener Gewerke müssen gezielt betrachtet werden. Entscheidend ist, in welcher Bauphase die Reinigung stattfinden soll. ERLEDIGT TEAM unterscheidet zwischen vorbereitenden Arbeiten, einer Zwischenreinigung und der abschließenden Feinreinigung. Wenn noch geschliffen, gesägt oder montiert wird, kann neuer Schmutz entstehen. Deshalb stimmen wir Termin und Umfang mit Ihrem tatsächlichen Baufortschritt ab, statt allein vom geplanten Übergabedatum auszugehen.',
      },
      {
        title: 'Grob- und Feinreinigung sauber voneinander abgrenzen',
        body: 'Welche Materialien aufgenommen und welche Oberflächen gereinigt werden, wird vorab festgelegt. Eine Feinreinigung kann frei zugängliche Böden, Oberflächen, Sanitärbereiche und vereinbarte Glasflächen umfassen. Bauschuttentsorgung, Spezialabfälle und das Entfernen unbekannter Stoffe sind keine automatisch enthaltenen Leistungen. Auch Kleber, Farbspritzer oder mineralische Rückstände müssen einzeln beurteilt werden. Neue Oberflächen können empfindlich sein; Herstellerhinweise und notwendige Aushärtungszeiten gehören deshalb zur Vorbereitung. So wird vermieden, dass Reinigung zu früh oder mit ungeeigneten Mitteln erfolgt.',
      },
      {
        title: 'Neue Materialien brauchen eine vorsichtige Einschätzung',
        body: 'Fensterbeschichtungen, Naturstein, frisch verlegte Böden und lackierte Bauteile reagieren nicht gleich. Teilen Sie uns mit, welche Materialien eingebaut wurden und ob Pflegehinweise vorliegen. Bereits vorhandene Beschädigungen sollten vor Beginn dokumentiert werden. Eine Reinigung beseitigt Verschmutzungen, kann aber Verarbeitungsfehler oder Kratzer nicht rückgängig machen. Bei unklaren Rückständen kann eine Probefläche nötig sein. Die sichere Zugänglichkeit, funktionierende Anschlüsse und eine geeignete Beleuchtung sind weitere Voraussetzungen, die wir mit Ihnen beziehungsweise der Bauleitung besprechen.',
      },
      {
        title: 'Eine vorbereitete Übergabe erleichtert den letzten Schritt',
        body: 'Für eine Anfrage helfen die Objektgröße, der Ort, die gewünschte Bauphase und ein realistisches Zeitfenster. Nennen Sie außerdem, welche Gewerke noch arbeiten und ob Bereiche bereits möbliert sind. Falls mehrere Abschnitte zu unterschiedlichen Terminen fertig werden, kann eine gestaffelte Planung sinnvoll sein. Das Angebot beschreibt die vereinbarten Arbeiten und ihre Grenzen. Eine Reinigungsleistung ersetzt keine technische Bauabnahme. Nach Ihrer Beauftragung klären wir den verbindlichen Termin und die Ansprechpartner vor Ort, damit die Fläche zum vorgesehenen Zeitpunkt geordnet bearbeitet werden kann.',
      },
    ],
    faqs: [
      {
        question: 'Ist Bauschuttentsorgung enthalten?',
        answer:
          'Nur bei ausdrücklicher Vereinbarung. Art und Menge der anfallenden Materialien müssen vorher bekannt sein.',
      },
      {
        question: 'Wann ist der beste Termin für die Feinreinigung?',
        answer:
          'Möglichst nach den staubintensiven Arbeiten und unter Berücksichtigung der Aushärtungszeiten neuer Materialien. Den genauen Zeitpunkt stimmen wir ab.',
      },
    ],
  },
  {
    slug: 'polster-teppichreinigung',
    name: 'Polster- & Teppichreinigung',
    category: 'Spezialreinigung',
    summary:
      'Textile Oberflächen wieder bewusst pflegen. Mit Rücksicht auf Fasern, Farben und die nötige Trocknungszeit.',
    formHints: [
      'Art und Größe der Polster oder Teppiche',
      'Materialetikett und bekannte Flecken',
      'Verfügbare Trocknungszeit und Lüftung',
    ],
    sections: [
      {
        title: 'Textilien individuell statt pauschal behandeln',
        body: 'Ein Sofa, ein Teppichboden und ein loser Teppich haben sehr unterschiedliche Eigenschaften. Fasern, Färbung und Untergrund beeinflussen, welches Reinigungsverfahren geeignet ist. ERLEDIGT TEAM beginnt deshalb mit einer Beschreibung des Materials und des Zustands. Nennen Sie uns die Art des Möbelstücks oder der Fläche und, wenn bekannt, die Zusammensetzung laut Etikett. Auch bisherige Reinigungsversuche sind relevant. Eine vorsichtige Einschätzung hilft, die Behandlung auf das Textil abzustimmen und mögliche Grenzen vor Beginn offen zu besprechen.',
      },
      {
        title: 'Flecken, Nutzungsspuren und Materialzustand unterscheiden',
        body: 'Nicht jede sichtbare Stelle ist eine entfernbare Verschmutzung. Abrieb, Ausbleichungen und dauerhafte Verfärbungen können im Gewebe verbleiben. Für die Beurteilung eines Flecks helfen Angaben zu seiner Ursache und seinem Alter. Unterschiedliche Mittel wahllos nacheinander aufzutragen kann die spätere Behandlung erschweren. Teilen Sie uns deshalb mit, was bereits verwendet wurde. Je nach Material ist eine Prüfung an unauffälliger Stelle sinnvoll. Eine vollständige Fleckentfernung oder eine neuwertige Optik lässt sich nicht unabhängig vom Zustand versprechen.',
      },
      {
        title: 'Trocknung gehört zur Planung',
        body: 'Wenn Feuchtigkeit eingesetzt wird, muss das Textil anschließend ausreichend trocknen können. Raumklima, Belüftung, Materialdicke und das gewählte Verfahren beeinflussen den Ablauf. Planen Sie deshalb eine Zeit ein, in der das Möbelstück oder die Fläche nicht genutzt werden muss. Empfindliche Möbelteile und angrenzende Böden sind bei der Vorbereitung zu berücksichtigen. Wir besprechen, welche Bereiche freigeräumt werden sollten und wie der Zugang erfolgt. Das Verschieben großer Möbel oder die Bearbeitung schwer zugänglicher Flächen wird gesondert abgestimmt.',
      },
      {
        title: 'Gezielt anfragen, realistisch planen',
        body: 'Für eine erste Anfrage genügen die Anzahl der Sitzplätze oder die ungefähre Teppichfläche, der Einsatzort und eine kurze Zustandsbeschreibung. Bei besonderen Flecken oder unbekanntem Material können ergänzende Fotos im direkten Kontakt helfen. Wir klären anschließend, welche Behandlung in Betracht kommt und welcher Zeitraum sinnvoll ist. Bei gewerblich genutzten Textilien, etwa in Warte- oder Besprechungsbereichen, berücksichtigen wir die geplante Wiederbenutzung. Die Reinigung dient der Pflege des Materials; spezielle hygienische Eigenschaften oder eine allergenfreie Umgebung werden nicht pauschal zugesichert.',
      },
    ],
    faqs: [
      {
        question: 'Gehen alle Flecken heraus?',
        answer:
          'Das hängt von Ursache, Alter und Material ab. Dauerhafte Verfärbungen oder Schäden können auch nach einer Reinigung sichtbar bleiben.',
      },
      {
        question: 'Kann ich das Sofa direkt wieder benutzen?',
        answer:
          'Bei feuchten Verfahren ist eine ausreichende Trocknung notwendig. Das Zeitfenster besprechen wir anhand des Materials und der Bedingungen im Raum.',
      },
    ],
  },
  {
    slug: 'dach-oberflaechenreinigung',
    name: 'Dach- & Oberflächenreinigung',
    category: 'Spezialreinigung',
    summary:
      'Außenflächen pflegen und ihren Zustand respektieren. Mit vorheriger Prüfung von Material, Zugang und Entwässerung.',
    formHints: [
      'Art, Alter und Zustand der Oberfläche',
      'Fläche, Höhe und sichere Zugänge',
      'Wasserführung und bekannte Materialrisiken',
    ],
    sections: [
      {
        title: 'Vor der Reinigung kommt die Zustandsprüfung',
        body: 'Dächer und Außenflächen sind Witterung und unterschiedlichen Ablagerungen ausgesetzt. Ob eine Reinigung sinnvoll ist, hängt jedoch vom Material und seinem Zustand ab. ERLEDIGT TEAM bespricht mit Ihnen zunächst, welche Fläche betroffen ist und welches Ziel erreicht werden soll. Risse, lose Bauteile oder vorgeschädigte Beschichtungen dürfen nicht übergangen werden. Eine Reinigung ist keine Dachsanierung und ersetzt keine bauliche Prüfung. Erst wenn die Voraussetzungen geklärt sind, lässt sich eine geeignete Vorgehensweise für den konkreten Auftrag beurteilen.',
      },
      {
        title: 'Materialgerecht statt mit pauschalem Druck',
        body: 'Die passende Behandlung richtet sich nach Aufbau und Empfindlichkeit der Oberfläche. Hoher Druck ist nicht automatisch die richtige Lösung. Bei beschichteten Bauteilen, Fugen oder porösen Materialien kann eine ungeeignete Belastung Schäden verursachen. Informationen zu Alter, Hersteller und früheren Behandlungen sind deshalb hilfreich. Unbekannte oder möglicherweise schadstoffhaltige Baustoffe müssen vorab fachlich geklärt werden; sie werden nicht einfach bearbeitet. Eine zusätzliche Versiegelung, Beschichtung oder chemische Behandlung gehört nur dann zum Auftrag, wenn sie nach Prüfung ausdrücklich vereinbart wurde.',
      },
      {
        title: 'Zugang und Wasserführung gemeinsam planen',
        body: 'Arbeiten an höher liegenden Flächen erfordern geeignete Zugänge und eine sichere Durchführung. Bitte beschreiben Sie Dachform, Höhe und die Situation rund um das Gebäude. Pflanzen, angrenzende Grundstücke, elektrische Bauteile und Verkehrswege sind bei der Vorbereitung zu berücksichtigen. Ebenso muss geklärt werden, wohin Reinigungswasser und gelöste Rückstände gelangen. Die konkrete Handhabung hängt von Material und Verfahren ab. Wetterbedingungen können den vorgesehenen Termin beeinflussen, weshalb Außenarbeiten erst nach gemeinsamer Abstimmung verbindlich eingeplant werden.',
      },
      {
        title: 'Ein Angebot mit klarer Abgrenzung',
        body: 'Nennen Sie in Ihrer Anfrage die Art der Fläche, den Einsatzort und die ungefähre Größe. Fotos können später im direkten Kontakt eine erste Einschätzung unterstützen, ersetzen aber nicht in jedem Fall die Besichtigung. Wir besprechen erreichbare Ergebnisse und mögliche Grenzen. Bestehende Schäden oder Verfärbungen lassen sich nicht immer durch Reinigung beseitigen. Nach der Prüfung wird festgelegt, welche Arbeiten übernommen werden können und welche Vorbereitungen erforderlich sind. So erhalten Sie eine nachvollziehbare Grundlage für Ihre Entscheidung, ohne dass vorab ein Verfahren unabhängig vom Objekt versprochen wird.',
      },
    ],
    faqs: [
      {
        question: 'Wird jedes Dach mit Hochdruck gereinigt?',
        answer:
          'Nein. Material, Zustand, Herstellerhinweise und sichere Durchführung bestimmen, ob und wie gereinigt werden kann.',
      },
      {
        question: 'Ist eine Dachreinigung zugleich eine Sanierung?',
        answer:
          'Nein. Bauliche Schäden und notwendige Reparaturen müssen unabhängig von der Reinigung fachlich beurteilt werden.',
      },
    ],
  },
  {
    slug: 'pv-anlagen-reinigung',
    name: 'PV-Anlagen-Reinigung',
    category: 'Spezialreinigung',
    summary:
      'Schonende Pflege von Solarmodulen. Abgestimmt auf Herstellerhinweise, Verschmutzung und sichere Erreichbarkeit.',
    formHints: [
      'Modulanzahl oder ungefähre Anlagenfläche',
      'Dach- oder Freiflächenanlage und Zugang',
      'Herstellerhinweise und sichtbare Verschmutzung',
    ],
    sections: [
      {
        title: 'Zuerst prüfen, ob eine Reinigung sinnvoll ist',
        body: 'Auf Solarmodulen können sich Staub, Pollen oder andere Ablagerungen ansammeln. Ob daraus ein konkreter Reinigungsbedarf entsteht, hängt von Lage, Neigung und Zustand der Anlage ab. ERLEDIGT TEAM bespricht mit Ihnen die sichtbare Verschmutzung und die vorhandenen Zugänge. Eine Reinigung wird nicht mit einer pauschalen Ertragssteigerung beworben. Für eine Beurteilung elektrischer Leistung oder technischer Defekte ist ein entsprechender Fachbetrieb zuständig. Unser Ansatz konzentriert sich auf eine materialgerechte Pflege der freigegebenen Moduloberflächen unter den passenden Bedingungen.',
      },
      {
        title: 'Moduloberflächen sorgfältig behandeln',
        body: 'Solarmodule besitzen empfindliche Oberflächen, Dichtungen und elektrische Anschlüsse. Herstellerhinweise sind daher Teil der Vorbereitung. Grobe mechanische Belastung, ungeeignete Mittel oder starke Temperaturunterschiede können problematisch sein. Welches Verfahren geeignet ist, wird anhand der Anlage geklärt. Sichtbar beschädigte Module oder auffällige Bauteile sollten vor der Reinigung fachlich geprüft werden. Das Betreten der Module ist keine vorgesehene Reinigungsmethode. Auch die Auswahl von Wasser und Hilfsmitteln wird auf die vorhandenen Anforderungen abgestimmt, statt für jede Anlage dasselbe Vorgehen vorauszusetzen.',
      },
      {
        title: 'Sicherer Zugang ist eine Voraussetzung',
        body: 'Eine Freiflächenanlage stellt andere Anforderungen als Module auf einem Wohnhaus oder einer Gewerbehalle. Nennen Sie deshalb Aufstellungsart, Höhe und mögliche Zugänge. Vorhandene Anschlüsse, die Umgebung und die geplante Wasserführung sind ebenfalls relevant. Wenn geeignete Arbeitsmittel oder zusätzliche Sicherungen erforderlich sind, muss das vor einer Terminbestätigung geklärt werden. Wetter und Temperatur können die Ausführung beeinflussen. Die Reinigung umfasst keine Arbeiten an der elektrischen Installation und keine eigenständige technische Freigabe der Anlage durch uns.',
      },
      {
        title: 'Ihre Anlage nachvollziehbar beschreiben',
        body: 'Für die erste Anfrage helfen die ungefähre Modulzahl oder Fläche, der Ort und eine Beschreibung der Ablagerungen. Teilen Sie uns bekannte Herstelleranforderungen und vorhandene Schäden mit. Fotos können im anschließenden Kontakt die Planung erleichtern. Falls die Situation aus der Ferne nicht zuverlässig einzuschätzen ist, wird eine Besichtigung besprochen. Danach lässt sich festlegen, welche Flächen bearbeitet werden können und welcher Aufwand entsteht. Ein regelmäßiges Intervall sollte sich am tatsächlichen Bedarf orientieren. Wir stimmen den nächsten Schritt mit Ihnen ab, ohne aus einer einzelnen Anfrage bereits einen verbindlichen Auftrag abzuleiten.',
      },
    ],
    faqs: [
      {
        question: 'Wie viel mehr Ertrag bringt eine Reinigung?',
        answer:
          'Eine pauschale Ertragssteigerung lässt sich nicht seriös zusagen. Verschmutzung, Anlage und Standort unterscheiden sich; technische Leistungsfragen gehören zum zuständigen Fachbetrieb.',
      },
      {
        question: 'Kann jede Dachanlage gereinigt werden?',
        answer:
          'Wir müssen Zugang, Sicherheit, Modulzustand und Herstellerhinweise vorher prüfen. Eine Zusage erfolgt erst nach dieser Abstimmung.',
      },
    ],
  },
];
const file = 'src/data/content.json';
const previous = JSON.parse(fs.readFileSync(file, 'utf8'));
const additions = {
  'glas-fensterreinigung':
    ' Auch feste Verglasungen und Oberlichter sollten Sie gesondert nennen. Entscheidend ist, ob beide Seiten sicher erreichbar sind und welche Hilfsmittel für den Zugang erforderlich wären.',
  'maschinen-anlagenreinigung':
    ' Bitte benennen Sie eine verantwortliche Person für die technische Freigabe. So können offene Fragen zur Anlage direkt mit dem zuständigen Betrieb geklärt werden.',
  'hallen-gewerbereinigung':
    ' Teilen Sie uns mit, ob Waren umgelagert werden müssen und wer diese Aufgabe übernimmt. Frei zugängliche Flächen sollten vor dem Termin eindeutig feststehen.',
  baustellenreinigung:
    ' Ein kurzer Austausch mit der Bauleitung hilft, Überschneidungen mit anderen Gewerken zu erkennen. Die Freigabe neuer Materialien sollte vor Beginn der Reinigung nachvollziehbar vorliegen.',
  'polster-teppichreinigung':
    ' Auch die Unterseite und Polsterfüllung können für die Beurteilung wichtig sein. Bewahren Sie vorhandene Materialetiketten auf und nennen Sie bekannte frühere Reinigungsversuche.',
};
for (const service of services)
  if (additions[service.slug]) service.sections.at(-1).body += additions[service.slug];
fs.writeFileSync(file, JSON.stringify({ ...previous, services }, null, 2));
console.log(
  services.map((s) => [
    s.slug,
    s.sections
      .map((x) => x.body)
      .join(' ')
      .split(/\s+/).length,
  ]),
);
