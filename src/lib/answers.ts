import type { Faq, Service, City } from './site.ts';

export const companyAnswer =
  'ERLEDIGT TEAM ist ein Gebäudeservice mit Sitz in der Eschstraße 70, 26683 Saterland. Das Unternehmen bietet Gebäude-, Glas- und Spezialreinigung für Privatkunden, Unternehmen und Hausverwaltungen in Saterland und Umgebung an. Leistungsumfang, Preis und Termin werden vor einer Beauftragung individuell abgestimmt.';

export const commonQuestions: (Faq & { id: string; link: string; linkLabel: string })[] = [
  {
    id: 'welche-reinigung',
    question: 'Welche Reinigung passt zu meinem Vorhaben?',
    answer:
      'Für die laufende Pflege genutzter Räume ist Unterhaltsreinigung der passende Einstieg. Bei stärker haftenden Rückständen kommt eine Grund- oder Sonderreinigung infrage. Fenster, Treppenhäuser, Polster und Bauflächen haben eigene Leistungsbereiche. Beschreiben Sie im Zweifel zuerst den Zustand und Ihr gewünschtes Ergebnis. ERLEDIGT TEAM klärt den passenden Umfang mit Ihnen; Sie müssen vor der Anfrage kein Verfahren auswählen.',
    link: '/ratgeber/unterhaltsreinigung-oder-grundreinigung',
    linkLabel: 'Reinigungsarten vergleichen',
  },
  {
    id: 'kosten',
    question: 'Was kostet eine Reinigung bei ERLEDIGT TEAM?',
    answer:
      'Der Preis hängt von Fläche oder Stückzahl, Material, Verschmutzung, Zugänglichkeit und dem gewünschten Rhythmus ab. Eine pauschale Preisliste würde diese Unterschiede nicht zuverlässig abbilden. Für eine erste Einschätzung reichen Ort, Objektart und eine grobe Beschreibung. Vor einer Beauftragung werden die konkreten Aufgaben und der Preis vereinbart. Ein angefragtes Datum ist noch keine Terminbestätigung.',
    link: '/ratgeber/reinigungsangebot-vergleichen',
    linkLabel: 'So vergleichen Sie Reinigungsangebote',
  },
  {
    id: 'einsatzgebiet',
    question: 'Wo ist ERLEDIGT TEAM tätig und wo befindet sich der Standort?',
    answer:
      'Der Standort ist Eschstraße 70, 26683 Saterland. Von dort werden Reinigungen in Saterland und Umgebung geplant, unter anderem in Barßel, Friesoythe, Ostrhauderfehn, Rhauderfehn, Leer und Papenburg. Die Ortsseiten beschreiben Einsatzgebiete, keine weiteren Niederlassungen. Ob ein konkretes Objekt betreut werden kann, wird anhand der Adresse, des Arbeitsumfangs und der Terminplanung geprüft.',
    link: '/einsatzgebiete',
    linkLabel: 'Meinen Ort finden',
  },
  {
    id: 'anfrage',
    question: 'Welche Angaben braucht ERLEDIGT TEAM für ein Angebot?',
    answer:
      'Hilfreich sind die gewünschte Leistung, Ort und Postleitzahl, die Objektart, ein ungefährer Umfang und der gewünschte Rhythmus. Ergänzen Sie bekannte Besonderheiten wie empfindliche Materialien oder einen erschwerten Zugang. Eine Kontaktmöglichkeit ist für Rückfragen erforderlich. Die genaue Straßenadresse und gegebenenfalls Fotos können später persönlich besprochen werden. Unklare Einzelheiten lassen sich gemeinsam klären; exakte Aufmaße sind für die erste Anfrage nicht zwingend nötig.',
    link: '/anfrage',
    linkLabel: 'Anfrage vorbereiten',
  },
  {
    id: 'fensterrahmen',
    question: 'Sind Rahmen und Falze bei einer Fensterreinigung enthalten?',
    answer:
      'Rahmen, Falze, Fensterbänke und die jeweiligen Glasflächen werden ausdrücklich im Leistungsumfang festgehalten. Teilen Sie mit, ob Innen- und Außenseiten gereinigt werden sollen und wie die Fenster erreichbar sind. Fest haftende Bau-, Kleber- oder Farbreste werden gesondert beurteilt. Eine allgemeine Anfrage zur Glasreinigung bedeutet deshalb nicht automatisch, dass jede Zusatzarbeit bereits enthalten ist.',
    link: '/ratgeber/fensterreinigung-vorbereiten',
    linkLabel: 'Fensterreinigung gut vorbereiten',
  },
  {
    id: 'einmalig-regelmaessig',
    question: 'Kann ich eine einmalige oder regelmäßige Reinigung anfragen?',
    answer:
      'Beides ist möglich. Einmalige Einsätze eignen sich beispielsweise für eine gründliche Auffrischung oder die Reinigung nach einer Bauphase. Für regelmäßig genutzte Räume wird ein passender Reinigungsrhythmus abgestimmt. Nicht jede Aufgabe muss dabei bei jedem Besuch stattfinden. Eine klare Aufteilung zwischen laufender Pflege und gelegentlichen Zusatzarbeiten hilft, den tatsächlichen Bedarf verständlich zu beschreiben.',
    link: '/leistungen/unterhaltsreinigung',
    linkLabel: 'Mehr zur regelmäßigen Pflege',
  },
  {
    id: 'gewerbe',
    question: 'Reinigt ERLEDIGT TEAM auch Büros, Praxen und Gewerbeflächen?',
    answer:
      'Büro- und Praxisreinigung sowie Hallen- und Gewerbeflächen gehören zum Leistungsangebot. Zugang, Betriebszeiten, empfindliche Technik und besondere Vorgaben werden vorab besprochen. Bei Praxisräumen müssen vorhandene Hygienevorgaben und die genaue Aufgabenverteilung geklärt werden. Eine allgemeine Reinigungsanfrage enthält keine pauschale Zusage für spezielle Desinfektionsleistungen, technische Wartung oder Reparaturen.',
    link: '/leistungen/buero-praxisreinigung',
    linkLabel: 'Büro- und Praxisreinigung ansehen',
  },
  {
    id: 'kontakt',
    question: 'Wie erreiche ich ERLEDIGT TEAM und wann ist ein Auftrag verbindlich?',
    answer:
      'Sie erreichen ERLEDIGT TEAM unter +49 155 67451482 und info@erledigt-team.de oder über das Anfrageformular. Über das Telefonsymbol können Sie auch einen Rückruf anfordern. Die erste Kontaktaufnahme ist unverbindlich. Ein Auftrag entsteht erst, wenn Umfang und Angebot abgestimmt sind und Sie die Beauftragung erteilen. Ein gewünschter Termin wird persönlich geprüft und bestätigt.',
    link: '/anfrage',
    linkLabel: 'Unverbindlich anfragen',
  },
];

const serviceAnswers: Record<string, string> = {
  unterhaltsreinigung:
    'Unterhaltsreinigung ist die wiederkehrende Pflege genutzter Räume. Böden, Sanitärbereiche und Kontaktflächen werden nach einem vereinbarten Reinigungsplan betreut. Nutzung und Verschmutzung bestimmen den Rhythmus; gelegentliche Zusatzarbeiten werden separat festgehalten.',
  'buero-praxisreinigung':
    'Büro- und Praxisreinigung umfasst vereinbarte Arbeits-, Empfangs- und Nebenräume. ERLEDIGT TEAM stimmt Aufgaben und Zugang mit den Betriebszeiten ab. Bei Praxen werden Hygienevorgaben gesondert geklärt; spezielle Desinfektionsleistungen sind keine automatische Zusage.',
  'grund-sonderreinigung':
    'Grund- und Sonderreinigung richtet sich an Flächen, deren Zustand eine intensivere oder besondere Behandlung verlangt. Material, Rückstände und vorhandene Beschichtungen werden vor der Verfahrenswahl betrachtet. Die genaue Aufgabe wird einzeln abgestimmt.',
  treppenhausreinigung:
    'Treppenhausreinigung betrifft die vereinbarten gemeinschaftlichen Bereiche eines Gebäudes: etwa Stufen, Podeste, Handläufe und Eingänge. Umfang, Bodenpflege und Turnus werden mit Eigentümern oder Hausverwaltung besprochen; Sonderflächen werden ausdrücklich benannt.',
  'glas-fensterreinigung':
    'Glas- und Fensterreinigung umfasst die vereinbarten Innen- und Außenseiten der Glasflächen. Rahmen, Falze und Fensterbänke werden ausdrücklich in den Auftrag aufgenommen. Fensterzahl, Höhe, Öffnungsmöglichkeiten und Zugänge bestimmen die Vorbereitung.',
  'maschinen-anlagenreinigung':
    'Maschinen- und Anlagenreinigung betrifft ausdrücklich vereinbarte, zugängliche Oberflächen nach betrieblicher Freigabe. Herstellerhinweise und bekannte Rückstände werden vorab geklärt. Technische Wartung, Reparatur und Eingriffe in elektrische Komponenten gehören nicht automatisch dazu.',
  'hallen-gewerbereinigung':
    'Bei der Hallen- und Gewerbereinigung werden Laufwege, Arbeitsbereiche und erreichbare Bodenflächen passend zur Nutzung geplant. Belag, Rückstände, Lagergut und Betriebsverkehr beeinflussen den Umfang. Zeitfenster und Teilflächen werden vor Beginn abgestimmt.',
  baustellenreinigung:
    'Baustellenreinigung wird nach Bauphase und Zustand in Grob-, Zwischen- oder Feinreinigung aufgeteilt. ERLEDIGT TEAM klärt Räume, Rückstände und Freigaben mit Ihnen. Noch laufende Gewerke und empfindliche neue Oberflächen beeinflussen den geeigneten Termin.',
  'polster-teppichreinigung':
    'Polster- und Teppichreinigung wird auf Faser, Farbe, Konstruktion und Verschmutzung abgestimmt. Pflegeetikett und bisherige Fleckbehandlung helfen bei der Einschätzung. Trocknung gehört zur Planung; eine vollständige Entfernung jedes Flecks wird nicht pauschal zugesagt.',
  'dach-oberflaechenreinigung':
    'Dach- und Oberflächenreinigung setzt eine Prüfung von Material, Zustand und sicherer Erreichbarkeit voraus. Wasserführung und angrenzende Bereiche werden berücksichtigt. Eine Reinigungsanfrage umfasst keine automatische Zusage für Reparaturen oder Arbeiten an unbekannten belasteten Materialien.',
  'pv-anlagen-reinigung':
    'PV-Anlagen-Reinigung dient der materialgerechten Pflege verschmutzter Modulflächen. Herstellerhinweise, Anlagenart und sicherer Zugang bestimmen die Planung. Die Reinigung ersetzt keine elektrische Prüfung; ein bestimmter Mehrertrag wird nicht versprochen.',
};

export function serviceAnswer(service: Service, city?: City) {
  const detail = serviceAnswers[service.slug];
  if (!detail) throw new Error(`Missing service answer: ${service.slug}`);
  return `${detail} ERLEDIGT TEAM plant ${city ? `Ihren Einsatz in ${city.name} und Umgebung` : 'Einsätze in Saterland und Umgebung'} vom Standort Saterland aus. Preis und Termin werden individuell vereinbart.`;
}
