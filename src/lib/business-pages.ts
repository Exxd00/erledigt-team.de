import type { ContentSection, Faq } from './site.ts';

export type BusinessPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  answer: string;
  focus: string;
  icon: string;
  image: 'stairs' | 'office' | 'hero' | 'floor';
  alt: string;
  property: 'hausverwaltung' | 'gewerbe' | 'industrie';
  priorities: [string, string, string];
  brief: [string, string, string];
  services: string[];
  sections: ContentSection[];
  faqs: Faq[];
};

export const businessPages: BusinessPage[] = [
  {
    slug: 'hausverwaltungen-wohnanlagen',
    name: 'Hausverwaltungen & Wohnanlagen',
    title: 'Objektpflege, die Verwaltung einfacher macht.',
    description:
      'Treppenhäuser, Grünflächen und Winterdienst für Hausverwaltungen und Wohnanlagen in Saterland und Umgebung. Aufgaben je Objekt klar planen.',
    focus: 'Mehrere Häuser. Ein abgestimmter Ablauf.',
    answer:
      'Hausverwaltungen brauchen einen je Objekt abgegrenzten Umfang, geregelte Zugänge und eine zentrale Kontaktperson. ERLEDIGT TEAM verbindet auf Wunsch Treppenhausreinigung mit saisonaler Außenpflege. Für jedes Haus werden Aufgaben, Intervalle und zusätzlich beauftragte Arbeiten nachvollziehbar festgelegt.',
    icon: 'Layers',
    image: 'stairs',
    alt: 'Gepflegtes Treppenhaus als gemeinsamer Zugang einer Wohnanlage',
    property: 'hausverwaltung',
    priorities: [
      'Umfang pro Aufgang und Außenfläche',
      'Bewohnerverkehr und Zugänge berücksichtigen',
      'Laufende Pflege von Zusatzaufträgen trennen',
    ],
    brief: [
      'Objektadressen und Anzahl der Aufgänge',
      'Gewünschte Aufgaben innen und außen',
      'Ansprechpartner, Zugang und bisheriger Turnus',
    ],
    services: [
      'treppenhausreinigung',
      'glas-fensterreinigung',
      'rasen-gruenflaechenpflege',
      'hecken-gehoelzpflege',
      'winterdienst-schneeraeumung',
    ],
    sections: [
      {
        title: 'Eine Objektliste statt vieler einzelner Absprachen',
        body: 'Eine Wohnanlage besteht aus mehr als ihrem Treppenhaus. Eingänge, gemeinschaftliche Fenster, Rasenflächen und Wege haben jeweils andere Aufgaben und Zeitpläne. Für Hausverwaltungen bündelt ERLEDIGT TEAM diese Anforderungen zu einer nachvollziehbaren Objektbetreuung in Saterland und Umgebung. Wir beginnen mit den tatsächlich zu betreuenden Gebäuden und einer benannten Kontaktperson. Je Objekt werden Aufgänge, Etagen, Nebenflächen und Außenbereiche aufgenommen. So bleibt erkennbar, was zum regulären Umfang gehört und welche Wünsche gesondert entschieden werden. Auch mehrere Häuser können gemeinsam angefragt werden, ohne dass alle automatisch denselben Leistungsumfang erhalten.',
      },
      {
        title: 'Reinigung im bewohnten Haus organisieren',
        body: 'Im Alltag einer Wohnanlage müssen Reinigungsarbeiten mit den Wegen der Bewohner zusammenpassen. Stufen, Podeste, Geländer und Eingänge werden nach dem vereinbarten Plan betreut. Kellerzugänge, Aufzüge oder zusätzliche Glasflächen gehören nur dann dazu, wenn sie aufgenommen wurden. Wir stimmen ab, wie Haustüren zugänglich sind und welche Bereiche zum Termin frei bleiben sollen. Hinweise zu Kinderwagen, Gehhilfen oder stark frequentierten Durchgängen helfen bei der Planung. Rückmeldungen sollten über eine verantwortliche Kontaktperson laufen. Dadurch lassen sich außergewöhnliche Verschmutzungen und Änderungswünsche beurteilen, ohne dass einzelne Zurufe den Auftrag unbemerkt erweitern.',
      },
      {
        title: 'Außenanlagen über die Jahreszeiten mitdenken',
        body: 'Rasen wächst in einem anderen Rhythmus als eine Hecke, und Schneefall folgt keinem festen Wochentermin. Deshalb werden Grünpflege und Winterdienst mit eigenen Aufgaben und Voraussetzungen geplant. Für Mäharbeiten erfassen wir Flächen, Hindernisse und den Umgang mit Schnittgut. Bei Gehölzen werden zulässiger Schnitt, Schutzzeiten und sichere Erreichbarkeit geprüft. Für die kalte Jahreszeit klären wir Wege, Eingänge, Zufahrten und geeignete Schneeablageflächen. Eigene Winterdienstfahrzeuge stehen für passende Flächen zur Verfügung. Auslösung, Betreuungszeiten und gewünschte Einsatznachweise werden vor einer Beauftragung vereinbart. Die Pflichten am jeweiligen Grundstück bleiben Gegenstand einer konkreten Abstimmung.',
      },
      {
        title: 'Ein Angebot, das sich intern prüfen lässt',
        body: 'Für eine erste Einschätzung brauchen Sie kein fertiges Leistungsverzeichnis. Hilfreich sind die Objektadressen, Anzahl der Aufgänge, ungefähre Außenflächen und der bisherige oder gewünschte Turnus. Nennen Sie auch bekannte Probleme, etwa einen schwer zugänglichen Eingang oder regelmäßig stark beanspruchte Bereiche. Wir klären den Bedarf und besprechen bei Bedarf eine Besichtigung. Das Angebot sollte laufende Leistungen, saisonale Aufgaben und einzeln beauftragte Extras unterscheiden. Zuständigkeiten für Schlüssel, Rückfragen und Änderungen werden vor Beginn festgelegt. So erhalten Sie eine verständliche Grundlage für Ihre eigene Prüfung und die Abstimmung mit Eigentümern oder weiteren verantwortlichen Personen.',
      },
    ],
    faqs: [
      {
        question: 'Können mehrere Wohnhäuser gemeinsam betreut werden?',
        answer:
          'Sie können mehrere Objekte in einer Anfrage zusammenfassen. Umfang, Zugänge und Turnus werden für jedes Haus gesondert aufgenommen und anschließend sinnvoll koordiniert.',
      },
      {
        question: 'Ist Winterdienst automatisch in der Treppenhausreinigung enthalten?',
        answer:
          'Winterdienst ist ein eigener Leistungsbereich. Flächen, Betreuung, Einsatzzeiten und Konditionen werden ausdrücklich vereinbart, auch wenn beide Leistungen gemeinsam angefragt werden.',
      },
      {
        question: 'Wie gehen wir mit Zusatzwünschen von Bewohnern um?',
        answer:
          'Eine benannte Kontaktperson der Verwaltung bündelt Rückmeldungen. Zusätzliche Aufgaben werden geprüft und abgestimmt, bevor sich der vereinbarte Umfang ändert.',
      },
    ],
  },
  {
    slug: 'bueros-praxen',
    name: 'Büros & Praxen',
    title: 'Gepflegte Räume. Platz für Ihren Arbeitstag.',
    description:
      'Objektservice für Büros und Praxen: Reinigungsplan, vertrauliche Bereiche, Zugänge und Außenflächen passend zu Ihrem Arbeitsalltag abstimmen.',
    focus: 'Ihr Betrieb gibt den Takt vor.',
    answer:
      'Für Büros und Praxen zählen geeignete Zeitfenster, der Schutz vertraulicher Bereiche und ein Plan nach Raumnutzung. ERLEDIGT TEAM klärt diese Punkte vor dem ersten Einsatz. Praxisvorgaben werden gesondert geprüft; spezielle medizinische Leistungen werden nicht pauschal zugesagt.',
    icon: 'Building2',
    image: 'office',
    alt: 'Sorgfältige Reinigung einer hellen Empfangstheke',
    property: 'gewerbe',
    priorities: [
      'Zeitfenster passend zu Öffnungszeiten',
      'Vertrauliche Unterlagen und Technik schützen',
      'Empfang, Nebenräume und Zugang zusammen planen',
    ],
    brief: [
      'Raumarten, Fläche und Zahl der Arbeitsplätze',
      'Öffnungszeiten und gewünschter Reinigungsrhythmus',
      'Zutrittsregeln und gegebenenfalls Hygieneplan',
    ],
    services: [
      'buero-praxisreinigung',
      'unterhaltsreinigung',
      'glas-fensterreinigung',
      'polster-teppichreinigung',
      'winterdienst-schneeraeumung',
    ],
    sections: [
      {
        title: 'Mit der Raumnutzung beginnt ein guter Plan',
        body: 'Empfang, Besprechungsraum und Teeküche werden in einem Büro unterschiedlich beansprucht. In einer Praxis kommen weitere Anforderungen an Nutzung und Abläufe hinzu. ERLEDIGT TEAM entwickelt mit Ihnen einen klar abgegrenzten Reinigungsauftrag für Ihren Standort in Saterland und Umgebung. Im ersten Gespräch geht es deshalb um Raumarten, Besucheraufkommen und Arbeitszeiten. Wir unterscheiden Aufgaben, die häufig gebraucht werden, von gelegentlichen Zusatzarbeiten. Nicht jeder Schrank und jedes Fenster muss bei jedem Termin berücksichtigt werden. Ein verständlicher Raumplan hilft Ihrem Team, die vereinbarte Betreuung nachzuvollziehen und besondere Anforderungen rechtzeitig anzusprechen.',
      },
      {
        title: 'Zugang und Vertraulichkeit gehören zur Vorbereitung',
        body: 'Reinigung vor Arbeitsbeginn oder nach Geschäftsschluss braucht zuverlässige Absprachen. Wer öffnet die Räume, welche Türen bleiben geschlossen und wen erreichen wir bei einem Hindernis? Diese Fragen werden vor dem ersten Einsatz geklärt. Persönliche Unterlagen, Patientenakten und vertrauliche Dokumente werden von Ihrem Team sicher verwahrt. Bildschirme, Kabel, Geräte und empfindliche Oberflächen dürfen nicht ohne festgelegten Umfang behandelt werden. Aufgeräumte Arbeitsplätze erleichtern die Ausführung. Auch die Regeln für Alarmanlage und Schlüsselübergabe gehören in eine persönliche Abstimmung; solche Zugangsdaten sollen nicht im allgemeinen Anfrageformular stehen. So bleibt die Vorbereitung auf das notwendige Maß beschränkt.',
      },
      {
        title: 'Praxisanforderungen gezielt besprechen',
        body: 'Eine Praxis ist kein Büro mit einem anderen Schild an der Tür. Vorhandene Hygienepläne, Raumfreigaben und betriebliche Vorgaben müssen gesondert betrachtet werden. Nennen Sie uns zunächst die vorgesehenen Bereiche und die zuständige Ansprechperson. Wir prüfen, welche Reinigungsarbeiten übernommen werden können und welche Aufgaben außerhalb des Angebots liegen. Eine allgemeine Praxisreinigung beinhaltet keine pauschale Zusage für spezielle Desinfektion, Medizinprodukteaufbereitung oder medizinische Tätigkeiten. Für die erste Anfrage sind weder Patientendaten noch Gesundheitsinformationen erforderlich. Die Klärung konzentriert sich auf Flächen, Abläufe und die für den konkreten Auftrag geltenden Anforderungen.',
      },
      {
        title: 'Den Weg bis zur Eingangstür einbeziehen',
        body: 'Ein gepflegter Arbeitsplatz beginnt für Beschäftigte und Besucher oft schon draußen. Glasflächen, Eingang und gegebenenfalls Wege auf Ihrem Grundstück lassen sich zusätzlich zum Innenbereich betrachten. Winterdienst kann für vereinbarte Zugänge angefragt werden; Rasen- oder Gehölzpflege eignet sich für zugehörige Außenflächen. Diese Aufgaben werden einzeln beschrieben und mit Ihren Nutzungszeiten abgestimmt. Für das Angebot helfen eine ungefähre Fläche, die Raumarten, gewünschte Häufigkeit und mögliche Zeitfenster. Wenn sich die Belegung später verändert, lässt sich der Bedarf erneut besprechen. Sie entscheiden über einen nachvollziehbaren Umfang, bevor ein Termin verbindlich bestätigt wird.',
      },
    ],
    faqs: [
      {
        question: 'Kann vor oder nach den Öffnungszeiten gereinigt werden?',
        answer:
          'Teilen Sie uns mögliche Zeitfenster mit. Zugang, Schließregeln und Verfügbarkeit werden gemeinsam geprüft und vor Beginn bestätigt.',
      },
      {
        question: 'Was muss eine Praxis zusätzlich angeben?',
        answer:
          'Benennen Sie die Raumarten, zuständige Kontaktperson und vorhandene Hygienevorgaben. Ob spezielle Aufgaben übernommen werden können, wird vorab geprüft. Patientendaten werden dafür nicht benötigt.',
      },
      {
        question: 'Müssen alle Räume denselben Rhythmus haben?',
        answer:
          'Nein. Nutzung und Verschmutzung können unterschiedliche Intervalle sinnvoll machen. Häufige Aufgaben und gelegentliche Zusatzarbeiten werden getrennt festgehalten.',
      },
    ],
  },
  {
    slug: 'handel-gewerbeimmobilien',
    name: 'Handel & Gewerbeimmobilien',
    title: 'Ein guter Eindruck. Vom Parkplatz bis zum Laden.',
    description:
      'Gebäudeservice für Geschäfte und Gewerbeimmobilien in Saterland und Umgebung: Glas, Verkaufsflächen, Außenpflege und Winterdienst mit klarem Ablauf.',
    focus: 'Besucherwege und Öffnungszeiten im Blick.',
    answer:
      'Für Handel und Gewerbeimmobilien werden Kundenwege, Schaufenster, Verkaufsflächen und Lieferzeiten gemeinsam betrachtet. ERLEDIGT TEAM stimmt Reinigung und gewünschte Außenpflege mit den zuständigen Ansprechpartnern ab. Eigene und gemeinschaftliche Grundstücksbereiche werden dabei klar voneinander abgegrenzt.',
    icon: 'Store',
    image: 'hero',
    alt: 'Glasreinigung an einer großen, gut erreichbaren Gebäudeverglasung',
    property: 'gewerbe',
    priorities: [
      'Eingang und sichtbare Flächen priorisieren',
      'Kundenverkehr und Lieferzeiten einplanen',
      'Innenflächen und Außenbereiche abgestimmt pflegen',
    ],
    brief: [
      'Geschäftsart, Flächen und Eigentumsgrenzen',
      'Öffnungs- und Lieferzeiten',
      'Glasflächen, Eingänge und saisonaler Außenbedarf',
    ],
    services: [
      'glas-fensterreinigung',
      'unterhaltsreinigung',
      'grund-sonderreinigung',
      'rasen-gruenflaechenpflege',
      'winterdienst-schneeraeumung',
    ],
    sections: [
      {
        title: 'Den ersten Eindruck entlang des Kundenwegs planen',
        body: 'Bei einem Geschäft beginnt der Eindruck nicht erst an der Kasse. Kunden sehen die Zufahrt, den Eingangsbereich, die Schaufenster und schließlich die Verkaufsfläche. ERLEDIGT TEAM unterstützt Handel und Gewerbeimmobilien in Saterland und Umgebung mit einem dazu passenden Gebäudeservice. Wir betrachten mit Ihnen die tatsächlichen Besucherwege und priorisieren die sichtbaren, häufig genutzten Bereiche. Dabei unterscheiden wir Ihre eigenen Flächen von gemeinschaftlichen Bereichen und vermieterseitigen Zuständigkeiten. Diese Abgrenzung ist besonders in Gebäuden mit mehreren Nutzern hilfreich. Sie zeigt, welche Aufgaben direkt beauftragt werden können und wo zunächst eine weitere Abstimmung nötig ist.',
      },
      {
        title: 'Reinigung mit Öffnung und Warenfluss verbinden',
        body: 'Eine freie Verkaufsfläche am frühen Morgen kann kurz darauf durch Warenständer, Lieferungen oder Kundschaft belegt sein. Deshalb gehören Öffnungszeiten und Warenannahme schon in die Planung. Wir besprechen geeignete Zeitfenster und gegebenenfalls eine abschnittsweise Ausführung. Empfindliche Auslagen, elektrische Einrichtungen und Lagerware werden nicht stillschweigend in den Reinigungsumfang aufgenommen. Ihr Team weiß vorab, welche Bereiche zugänglich sein sollen. Nach einer Aktion, einem Umbau oder einem saisonalen Wechsel können zusätzliche Arbeiten sinnvoll sein. Diese werden als eigener Bedarf erfasst, damit der reguläre Turnus für alle Beteiligten übersichtlich bleibt.',
      },
      {
        title: 'Schaufenster und Beläge gezielt behandeln',
        body: 'Glasflächen brauchen andere Angaben als ein stark beanspruchter Eingangsbelag. Bei Fenstern klären wir Innen- und Außenseiten, Rahmen, Folien und erreichbare Höhen. Auf Böden zählen Material, vorhandene Beschichtungen und die Art der Rückstände. Nicht jede sichtbare Veränderung ist entfernbare Verschmutzung; Abnutzung und Schäden werden vorab angesprochen. Eine Grundreinigung kann bei besonderem Bedarf geprüft werden, während die laufende Pflege den Alltagszustand unterstützt. Für ein Angebot helfen ungefähre Glasflächen, Raumgrößen und Hinweise auf feste Einbauten. Ein gemeinsamer Blick auf das Objekt verhindert, dass wichtige Randbereiche im allgemeinen Begriff Reinigung untergehen.',
      },
      {
        title: 'Saisonale Aufgaben am Standort koordinieren',
        body: 'Grünflächen am Parkplatz und winterliche Wege können den Betrieb ebenfalls beschäftigen. Rasenpflege, schonende Gehölzpflege und Winterdienst lassen sich für die vereinbarten Grundstücksbereiche zusätzlich anfragen. Für Schnee und Glätte erfassen wir Eingänge, Fußwege, Zufahrten und mögliche Ablageflächen. Eigene Fahrzeuge werden passend zu Zugänglichkeit und Untergrund eingeplant. Betreuungszeiten und Auslösung der Einsätze sind Teil der Vereinbarung und ergeben sich nicht allein aus Ihren Ladenöffnungszeiten. Nennen Sie einen Ansprechpartner, den gewünschten Zeitraum und bekannte Engstellen. Aus diesen Informationen entsteht ein Angebot, in dem Reinigung und saisonale Außenarbeiten jeweils verständlich beschrieben sind.',
      },
    ],
    faqs: [
      {
        question: 'Können Schaufenster und Verkaufsflächen zusammen angefragt werden?',
        answer:
          'Ja. Glas, Rahmen und Innenflächen werden als einzelne Aufgaben aufgenommen und zeitlich mit Ihrem Betrieb abgestimmt.',
      },
      {
        question: 'Werden Parkplätze im Winter berücksichtigt?',
        answer:
          'Vereinbarte Stellflächen und Zugangswege können nach Prüfung einbezogen werden. Zufahrt, Untergrund, Hindernisse und Schneeablage sind dafür wichtige Angaben.',
      },
      {
        question: 'Was gilt bei mehreren Mietern im Gebäude?',
        answer:
          'Zuerst werden eigene und gemeinschaftliche Bereiche sowie die beauftragungsberechtigten Ansprechpartner geklärt. So bleibt der Leistungsumfang den richtigen Flächen zugeordnet.',
      },
    ],
  },
  {
    slug: 'industrie-logistik',
    name: 'Industrie & Logistik',
    title: 'Flächenpflege, die Ihren Betriebsablauf versteht.',
    description:
      'Reinigung und Außenpflege für Industrie, Lager und Logistik in Saterland und Umgebung. Verkehrswege, Freigaben und Schichtzeiten vorab abstimmen.',
    focus: 'Zonen festlegen. Freigaben klären. Einsatz planen.',
    answer:
      'Industrie- und Logistikflächen benötigen klar freigegebene Arbeitszonen, bekannte Materialien und abgestimmte Zeitfenster. ERLEDIGT TEAM plant Hallenreinigung und angefragte Außenarbeiten gemeinsam mit Ihrem Betrieb. Verkehrswege, Schichtzeiten und betriebliche Sicherheitsvorgaben bestimmen den konkreten Einsatz.',
    icon: 'Warehouse',
    image: 'floor',
    alt: 'Maschinelle Bodenreinigung in einer geordneten Gewerbehalle',
    property: 'industrie',
    priorities: [
      'Verkehrs- und Arbeitszonen abgrenzen',
      'Schichtzeiten und Freigaben berücksichtigen',
      'Rückstände, Material und Zugänge vorab erfassen',
    ],
    brief: [
      'Hallenfläche, Bodenbelag und betroffene Zonen',
      'Betriebsverkehr, Schichtzeiten und Freigabeprozess',
      'Bekannte Rückstände und gewünschte Außenleistungen',
    ],
    services: [
      'hallen-gewerbereinigung',
      'maschinen-anlagenreinigung',
      'glas-fensterreinigung',
      'winterdienst-schneeraeumung',
      'rasen-gruenflaechenpflege',
    ],
    sections: [
      {
        title: 'Eine Halle nach Nutzung statt nur nach Größe betrachten',
        body: 'Lagergassen, Laufwege, Arbeitsplätze und freie Bodenflächen stellen unterschiedliche Anforderungen. Eine einzelne Quadratmeterangabe reicht deshalb für die Planung eines Industrie- oder Logistikobjekts selten aus. ERLEDIGT TEAM stimmt Hallenreinigung und ergänzende Objektpflege mit Betrieben in Saterland und Umgebung ab. Wir erfassen die vorgesehenen Zonen und klären, welche Flächen während eines Einsatzes tatsächlich zugänglich sind. Regale, Lagergut und feste Einbauten beeinflussen den Umfang. Besonders wichtig ist die Trennung vom laufenden Fahrzeugverkehr. Ihre zuständige Kontaktperson benennt die betrieblichen Regeln und die Voraussetzungen für eine Freigabe der Arbeitsbereiche.',
      },
      {
        title: 'Zeitfenster und Schnittstellen vor Beginn festlegen',
        body: 'In einem Betrieb mit Schichten oder festen Lieferzeiten muss ein Termin mehrere Abläufe berücksichtigen. Wir besprechen, ob ganze Bereiche oder einzelne Abschnitte nacheinander freigegeben werden können. Notwendige Unterweisungen, Zugänge und Ansprechpartner gehören zur Vorbereitung. Wenn sich ein Produktionsablauf kurzfristig ändert, braucht es einen vereinbarten Weg für Rückfragen. Auch die spätere Nutzung der gereinigten Fläche wird mitgedacht. Trocknung, verbleibende Hindernisse und die betriebliche Freigabe sollen nicht erst während des Einsatzes ungeklärt auffallen. Eine belastbare Planung entsteht durch diese konkreten Schnittstellen, nicht durch ein pauschales Versprechen, jeden Betrieb ohne Unterbrechung bedienen zu können.',
      },
      {
        title: 'Material und betriebliche Rückstände kennen',
        body: 'Beschichtete Böden, unbehandelter Beton und empfindliche Anlagenoberflächen benötigen eine passende Behandlung. Beschreiben Sie bekannte Ablagerungen und stellen Sie verfügbare Hersteller- oder Sicherheitsinformationen bereit. Unbekannte Stoffe werden vor einer Zusage geklärt. Für Maschinen- und Anlagenreinigung müssen die betroffenen Oberflächen, zulässigen Verfahren und die verantwortliche Freigabe eindeutig benannt sein. Wartung, Reparaturen und Eingriffe in elektrische Komponenten gehören nicht zum allgemeinen Reinigungsauftrag. Ebenso wird die Handhabung belasteter Rückstände gesondert betrachtet. Wenn diese Informationen vorliegen, lässt sich beurteilen, welche Aufgaben übernommen werden können und wo zusätzliche fachliche Klärung erforderlich ist.',
      },
      {
        title: 'Außenflächen und winterliche Zufahrten einbeziehen',
        body: 'Am Hallentor endet die Objektpflege nicht. Vereinbarte Wege, Eingänge und geeignete Außenflächen können in die Planung aufgenommen werden. Für den Winterdienst stehen eigene Einsatzfahrzeuge zur Verfügung; deren Einsatz richtet sich nach Zufahrt, Tragfähigkeit des Untergrunds und Rangiermöglichkeiten. Lieferzonen und betriebliche Verkehrswege brauchen klare Prioritäten und Absprachen mit Ihrer Disposition. Schneeablage und Streudienst werden objektbezogen festgelegt. Rasenflächen oder zulässige Gehölzpflege lassen sich als weitere Aufgaben anfragen. Nennen Sie für ein erstes Angebot Flächen, Nutzungszeiten und den gewünschten Zeitraum. Die Bestätigung erfolgt nach Prüfung des konkreten Bedarfs und der verfügbaren Einsatzmöglichkeiten.',
      },
    ],
    faqs: [
      {
        question: 'Ist eine Reinigung in mehreren Abschnitten möglich?',
        answer:
          'Das kann anhand Ihrer Betriebsabläufe geprüft werden. Die freigegebenen Zonen, Zeitfenster und Ansprechpartner werden dafür vor Beginn festgelegt.',
      },
      {
        question: 'Gehören Maschinenwartung und Reparatur dazu?',
        answer:
          'Nein. Die Maschinenreinigung betrifft ausdrücklich vereinbarte, freigegebene Oberflächen. Wartung, technische Eingriffe und Wiederinbetriebnahme bleiben bei den dafür zuständigen Fachpersonen.',
      },
      {
        question: 'Kann Winterdienst für Zufahrten angefragt werden?',
        answer:
          'Ja. Nennen Sie Breite, Nutzung, Untergrund und bekannte Hindernisse. Räumflächen, Prioritäten, Streuen und Betreuungszeiten werden nach Prüfung vereinbart.',
      },
    ],
  },
];

export const businessHubSections: ContentSection[] = [
  {
    title: 'Ein Gebäudeservice für Ihren betrieblichen Alltag',
    body: 'Ein Unternehmen braucht mehr als eine Liste möglicher Reinigungsarbeiten. Entscheidend ist, wie die Aufgaben zu Menschen, Nutzungszeiten und Zuständigkeiten passen. ERLEDIGT TEAM betreut gewerbliche Anfragen aus Saterland und Umgebung mit diesem Blick auf das gesamte Objekt. Wir klären, welche Bereiche im Alltag Aufmerksamkeit brauchen, wer vor Ort entscheidet und wann ein Einsatz sinnvoll möglich ist. Die passende Betreuung kann aus regelmäßiger Reinigung, einzelnen Sonderarbeiten und saisonaler Außenpflege bestehen. Sie wählen den Bedarf; wir übersetzen ihn gemeinsam in konkrete, verständliche Aufgaben. Ein vollständiges Leistungsverzeichnis müssen Sie dafür noch nicht mitbringen.',
  },
  {
    title: 'Die Anforderungen Ihrer Branche zuerst',
    body: 'Bei einer Hausverwaltung geht es häufig um mehrere Aufgänge, Bewohnerverkehr und eine nachvollziehbare Zuordnung der Leistungen. Ein Büro legt andere Schwerpunkte: vertrauliche Unterlagen, gemeinsam genutzte Räume und Zugang außerhalb der Arbeitszeit. Für Handel zählen sichtbare Flächen und die Abstimmung mit Kundschaft und Warenannahme. Industrie und Logistik benötigen klare Zonen, Freigaben und Rücksicht auf Betriebsverkehr. Deshalb finden Sie hier eigene Seiten für diese Situationen. Jede erklärt die relevanten Entscheidungen, passende Leistungen und hilfreiche Angaben für ein Angebot. So können Sie sich orientieren, ohne zuerst einen technischen Reinigungsbegriff auswählen zu müssen.',
  },
  {
    title: 'Innenräume und Außenbereiche zusammen denken',
    body: 'Ein gepflegter Standort reicht vom Eingang bis zur genutzten Fläche. Neben Gebäude-, Glas- und Spezialreinigung können Sie Rasenpflege, zulässige Hecken- und Gehölzpflege sowie Winterdienst anfragen. Für Schneeräumung stehen eigene Einsatzfahrzeuge zur Verfügung. Welche Technik und welcher Umfang passen, wird am konkreten Objekt geprüft. Eine kombinierte Anfrage erleichtert die Koordination, ersetzt aber keine klare Aufgabenbeschreibung. Pflegeintervalle, wetterabhängige Arbeiten und einmalige Zusatzaufträge werden getrennt festgelegt. Damit bleibt nachvollziehbar, welche Tätigkeit zu welchem Zeitpunkt vorgesehen ist und wie Änderungen oder außergewöhnlicher Bedarf besprochen werden.',
  },
  {
    title: 'Mit wenigen Angaben zum passenden Angebot',
    body: 'Starten Sie mit Einsatzort, Objektart und den Bereichen, die betreut werden sollen. Ergänzen Sie eine ungefähre Fläche, Öffnungs- oder Schichtzeiten und Ihren gewünschten Rhythmus. Bei mehreren Standorten hilft eine kurze Liste; die genaue Aufnahme kann anschließend erfolgen. Teilen Sie uns bekannte Zugangsbedingungen und besondere Vorgaben mit, jedoch keine vertraulichen Zugangscodes oder personenbezogenen Unterlagen. Wir klären offene Punkte persönlich und vereinbaren bei Bedarf eine Besichtigung. Preis, Umfang, Zuständigkeiten und Beginn werden vor Ihrer Beauftragung abgestimmt. Die Anfrage ist unverbindlich und dient dazu, eine passende Lösung für Ihren tatsächlichen Betrieb vorzubereiten.',
  },
];
