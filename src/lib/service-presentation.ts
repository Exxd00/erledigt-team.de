import { assets } from './assets';
type ServicePresentation = {
  image: keyof typeof assets;
  alt: string;
  promise: string;
  focus: string;
  outcomes: [string, string, string];
  decisions: [string, string][];
};

export const servicePresentation: Record<string, ServicePresentation> = {
  unterhaltsreinigung: {
    image: 'office',
    alt: 'Sorgfältige Reinigung einer Empfangstheke',
    promise: 'Ein guter Tag beginnt in gepflegten Räumen.',
    focus: 'Regelmäßig. Durchdacht. Alltagstauglich.',
    outcomes: [
      'Raumweise abgestimmter Reinigungsplan',
      'Passender Turnus für stark genutzte Bereiche',
      'Klare Zuständigkeiten und Zugangszeiten',
    ],
    decisions: [
      [
        'Täglich oder wöchentlich?',
        'Besucherzahl, Raumnutzung und Verschmutzung bestimmen den sinnvollen Rhythmus.',
      ],
      [
        'Welche Flächen gehören dazu?',
        'Böden, Sanitärbereiche und Kontaktflächen werden einzeln in den Leistungsumfang aufgenommen.',
      ],
      [
        'Wann passt es in Ihren Alltag?',
        'Zugang und Arbeitszeiten stimmen wir vor Beginn gemeinsam ab.',
      ],
    ],
  },
  'buero-praxisreinigung': {
    image: 'office',
    alt: 'Reinigung eines hellen Empfangsbereichs mit einem Mikrofasertuch',
    promise: 'Ein gepflegter Empfang. Ein konzentrierter Arbeitstag.',
    focus: 'Rücksicht auf Menschen und Abläufe.',
    outcomes: [
      'Arbeitsplätze und Empfang gezielt planen',
      'Teeküche und Sanitärflächen mitdenken',
      'Praxisvorgaben gesondert abstimmen',
    ],
    decisions: [
      [
        'Büro oder Praxis?',
        'Bei Praxisräumen klären wir vorhandene Hygienepläne und die Grenzen des Auftrags.',
      ],
      [
        'Vor oder nach dem Betrieb?',
        'Ein geeignetes Zeitfenster verringert Unterbrechungen für Mitarbeitende und Besucher.',
      ],
      [
        'Was bleibt unberührt?',
        'Dokumente, persönliche Gegenstände und empfindliche Technik brauchen klare Absprachen.',
      ],
    ],
  },
  'grund-sonderreinigung': {
    image: 'floor',
    alt: 'Maschinelle Reinigung eines robusten Bodenbelags',
    promise: 'Wenn eine Fläche mehr Aufmerksamkeit braucht.',
    focus: 'Zustand prüfen. Verfahren passend wählen.',
    outcomes: [
      'Rückstände und Material erfassen',
      'Verträglichkeit vorab prüfen',
      'Einmaligen Aufwand klar eingrenzen',
    ],
    decisions: [
      [
        'Was hat sich abgelagert?',
        'Beschreiben Sie Rückstände und bisherige Behandlungen möglichst konkret.',
      ],
      [
        'Was verträgt der Belag?',
        'Material und vorhandene Beschichtungen entscheiden über das Verfahren.',
      ],
      [
        'Wann wird die Fläche gebraucht?',
        'Sperrzeiten und Trocknung gehören zur Planung des Einsatzes.',
      ],
    ],
  },
  treppenhausreinigung: {
    image: 'stairs',
    alt: 'Reinigung des Podests in einem hellen Treppenhaus',
    promise: 'Ein einladender Weg bis zur Wohnungstür.',
    focus: 'Vom Eingang bis zum letzten Absatz.',
    outcomes: [
      'Stufen, Podeste und Geländer einbeziehen',
      'Gemeinschaftsflächen klar zuordnen',
      'Turnus mit der Verwaltung abstimmen',
    ],
    decisions: [
      [
        'Wie viele Aufgänge?',
        'Zahl der Etagen, Aufgänge und gemeinsam genutzten Bereiche hilft bei der Einschätzung.',
      ],
      [
        'Welcher Boden liegt vor?',
        'Stein, Fliesen und andere Beläge brauchen eine passende Pflege.',
      ],
      [
        'Wie bleibt der Zugang frei?',
        'Bewohnerverkehr, Haustürzugang und sichere Laufwege stimmen wir vorab ab.',
      ],
    ],
  },
  'glas-fensterreinigung': {
    image: 'hero',
    alt: 'Glasreinigung mit einem Fensterwischer an einer großen Scheibe',
    promise: 'Mehr Tageslicht. Wieder freie Sicht.',
    focus: 'Glas ist nicht gleich Fenster.',
    outcomes: [
      'Innen- und Außenseiten festlegen',
      'Rahmen und Falze nach Vereinbarung',
      'Erreichbarkeit jeder Fläche prüfen',
    ],
    decisions: [
      [
        'Nur Glas oder das ganze Fenster?',
        'Rahmen, Falze und Fensterbänke werden ausdrücklich in den Umfang aufgenommen.',
      ],
      [
        'Wie hoch liegen die Fenster?',
        'Stockwerk, Öffnungsmöglichkeiten und freie Zugänge bestimmen die Planung.',
      ],
      [
        'Ein Termin oder regelmäßige Pflege?',
        'Die Nutzung und sichtbare Verschmutzung geben den passenden Anlass vor.',
      ],
    ],
  },
  'maschinen-anlagenreinigung': {
    image: 'floor',
    alt: 'Reinigung in einer geordneten Industriehalle als Beispiel des Arbeitsumfelds',
    promise: 'Ein sauberer Arbeitsbereich braucht einen sicheren Plan.',
    focus: 'Freigabe vor dem ersten Handgriff.',
    outcomes: [
      'Herstellerhinweise gemeinsam sichten',
      'Zugängliche Flächen eindeutig abgrenzen',
      'Stillstand und Freigabe einplanen',
    ],
    decisions: [
      [
        'Welche Anlage ist betroffen?',
        'Nennen Sie Bauart, Materialien und die zu reinigenden Bereiche.',
      ],
      [
        'Wer gibt die Anlage frei?',
        'Stillsetzung und betriebliche Sicherheitsfreigabe liegen bei den zuständigen Personen vor Ort.',
      ],
      [
        'Was gehört nicht zum Auftrag?',
        'Wartung, Reparatur und Eingriffe in die Technik sind gesondert zu betrachten.',
      ],
    ],
  },
  'hallen-gewerbereinigung': {
    image: 'floor',
    alt: 'Bodenreinigung mit einer Scheuersaugmaschine in einer Gewerbehalle',
    promise: 'Freie Wege. Gepflegte Flächen. Geordneter Betrieb.',
    focus: 'Große Flächen, sinnvoll aufgeteilt.',
    outcomes: [
      'Lauf-, Lager- und Arbeitszonen planen',
      'Bodenbelag und Rückstände berücksichtigen',
      'Betriebsabläufe in die Reinigung einbeziehen',
    ],
    decisions: [
      [
        'Welche Zonen haben Vorrang?',
        'Verkehrsflächen und Arbeitsbereiche lassen sich nach Nutzung priorisieren.',
      ],
      [
        'Was steht auf der Fläche?',
        'Regale, Maschinen und Lagergut beeinflussen die erreichbare Reinigungsfläche.',
      ],
      [
        'Wann ist ein Bereich frei?',
        'Teilflächen und passende Zeitfenster erleichtern die Abstimmung mit dem laufenden Betrieb.',
      ],
    ],
  },
  baustellenreinigung: {
    image: 'floor',
    alt: 'Gereinigte Bodenfläche in einem hellen Gebäude als illustrative Übergabesituation',
    promise: 'Der letzte Schritt vor der ersten Nutzung.',
    focus: 'Die Bauphase gibt den Takt vor.',
    outcomes: [
      'Grob- oder Feinreinigung unterscheiden',
      'Neue Materialien schonend behandeln',
      'Übergabetermin und Gewerke abstimmen',
    ],
    decisions: [
      [
        'Sind noch Gewerke vor Ort?',
        'Noch laufende Arbeiten können neue Rückstände verursachen und den geeigneten Termin verändern.',
      ],
      [
        'Welche Rückstände sind vorhanden?',
        'Staub, Verpackungen und haftende Rückstände werden unterschiedlich behandelt.',
      ],
      [
        'Was soll übergeben werden?',
        'Räume, Fenster und Nebenflächen werden im Leistungsumfang einzeln benannt.',
      ],
    ],
  },
  'polster-teppichreinigung': {
    image: 'textile',
    alt: 'Textilreinigung mit einer transparenten Polsterdüse auf einem hellen Sofa',
    promise: 'Lieblingsplätze verdienen sorgfältige Pflege.',
    focus: 'Faser, Farbe und Trocknung mitdenken.',
    outcomes: [
      'Material und Pflegeetikett prüfen',
      'Flecken und Nutzungsspuren einschätzen',
      'Trocknungszeit in den Alltag einplanen',
    ],
    decisions: [
      [
        'Sofa, Sessel oder Teppich?',
        'Größe, Material und Konstruktion helfen bei der Wahl des geeigneten Verfahrens.',
      ],
      [
        'Wie ist der Fleck entstanden?',
        'Art, Alter und bisherige Behandlung beeinflussen die realistische Einschätzung.',
      ],
      [
        'Wann wird das Möbel wieder gebraucht?',
        'Lüftung und ausreichende Trocknung sind Teil der Vorbereitung.',
      ],
    ],
  },
  'dach-oberflaechenreinigung': {
    image: 'exterior',
    alt: 'Sorgfältige Pflege einer Terrasse vor einem Haus mit Ziegeldach',
    promise: 'Außenflächen pflegen. Die Substanz respektieren.',
    focus: 'Zugang und Zustand entscheiden.',
    outcomes: [
      'Oberfläche und vorhandene Schäden prüfen',
      'Materialgerechtes Verfahren abstimmen',
      'Wasserführung und Umfeld berücksichtigen',
    ],
    decisions: [
      [
        'Was für eine Oberfläche?',
        'Material, Alter und vorhandene Beschichtungen helfen bei der ersten Einschätzung.',
      ],
      [
        'Wie ist der Zugang möglich?',
        'Höhe und sichere Erreichbarkeit müssen vor einer Zusage geklärt sein.',
      ],
      [
        'Wohin fließt das Wasser?',
        'Angrenzende Bereiche und die Wasserführung gehören zur Einsatzplanung.',
      ],
    ],
  },
  'pv-anlagen-reinigung': {
    image: 'solar',
    alt: 'Schonende Pflege von Solarmodulen mit einer weichen Bürste',
    promise: 'Sorgfalt für die Fläche, die Energie gewinnt.',
    focus: 'Bedarf prüfen. Module schonend pflegen.',
    outcomes: [
      'Sichtbare Verschmutzung beurteilen',
      'Herstellerhinweise berücksichtigen',
      'Sichere Erreichbarkeit voraussetzen',
    ],
    decisions: [
      [
        'Ist eine Reinigung sinnvoll?',
        'Standort, Neigung und Art der Verschmutzung werden vorab betrachtet.',
      ],
      [
        'Welche Anlage haben Sie?',
        'Modulzahl, Anlagenfläche und Bauart erleichtern die Vorbereitung.',
      ],
      [
        'Welches Ergebnis ist realistisch?',
        'Eine Reinigung ist keine elektrische Prüfung; ein bestimmter Mehrertrag wird nicht versprochen.',
      ],
    ],
  },
};
