import type { Faq } from './site.ts';

export type Guide = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  serviceSlug: string;
  label: string;
  sections: { id: string; title: string; paragraphs: string[]; checklist?: string[] }[];
  comparison: { caption: string; headers: string[]; rows: string[][] };
  faqs: Faq[];
};

export const guides: Guide[] = [
  {
    slug: 'reinigungsangebot-vergleichen',
    title: 'Reinigungsangebote vergleichen: Was gehört in den Preis?',
    label: 'Angebot & Kosten',
    description:
      'Reinigungsangebote anhand von Umfang, Turnus, Zugang und Zusatzarbeiten vergleichen. Eine praktische Checkliste für Privatkunden und Gewerbe.',
    summary:
      'Vergleichen Sie Reinigungsangebote erst, wenn dieselben Flächen, Aufgaben und Intervalle beschrieben sind. Fläche allein erklärt den Preis nicht: Verschmutzung, Material, Erreichbarkeit und Zusatzarbeiten beeinflussen den Aufwand. ERLEDIGT TEAM vereinbart Umfang und Preis für Ihr konkretes Objekt in Saterland und Umgebung.',
    serviceSlug: 'unterhaltsreinigung',
    sections: [
      {
        id: 'umfang',
        title: 'Zuerst klären: Welche Arbeit wird tatsächlich angeboten?',
        paragraphs: [
          'Zwei Angebote mit derselben Quadratmeterzahl können sehr unterschiedliche Aufgaben enthalten. In einem Büro sind freie Bodenflächen, Sanitärbereiche, Teeküche und Arbeitsplätze jeweils eigene Bereiche. Bei Fenstern ist zu unterscheiden, ob ausschließlich Glas oder auch Rahmen, Falze und Fensterbänke berücksichtigt werden. Schreiben Sie deshalb vor einem Preisvergleich auf, welche Bereiche für Sie wichtig sind.',
          'Fragen Sie auch nach Grenzen: Werden schwer zugängliche Flächen einbezogen? Müssen Möbel bewegt werden? Wie werden besondere Rückstände behandelt? Solche Punkte sollten vor der Beauftragung besprochen werden. Ein nachvollziehbarer Umfang erleichtert später die Abstimmung, weil beide Seiten dieselbe Vorstellung vom vereinbarten Ergebnis haben.',
        ],
      },
      {
        id: 'aufwand',
        title: 'Warum Zustand und Zugang den Aufwand verändern',
        paragraphs: [
          'Eine regelmäßig gepflegte, frei zugängliche Fläche stellt andere Anforderungen als ein stark verschmutzter Bereich zwischen Möbeln oder Lagergut. Material und vorhandene Beschichtungen können eine besondere Vorgehensweise erfordern. Auch die Frage, ob während der Reinigung Menschen im Gebäude arbeiten, gehört zur Planung. Diese Unterschiede lassen sich nicht sinnvoll aus der Größe allein ableiten.',
          'Beschreiben Sie bekannte Besonderheiten möglichst konkret. Es reicht zunächst, wenn Sie die Raumnutzung, sichtbare Rückstände und mögliche Zugangszeiten nennen. Wenn Angaben fehlen, werden diese im Gespräch oder bei einer vereinbarten Besichtigung ergänzt. Sie müssen den Zeitaufwand nicht selbst berechnen und vor der ersten Anfrage kein professionelles Leistungsverzeichnis erstellen.',
        ],
      },
      {
        id: 'vergleich',
        title: 'Laufende Pflege und Zusatzarbeiten getrennt betrachten',
        paragraphs: [
          'Bei regelmäßiger Reinigung sollte erkennbar sein, welche Aufgaben bei jedem Besuch anstehen und welche nur gelegentlich vorgesehen sind. Eine monatlich eingeplante Zusatzaufgabe ist etwas anderes als eine Tätigkeit bei jedem Termin. Vergleichen Sie deshalb nicht nur einen einzelnen Einsatzpreis, sondern auch den beschriebenen Rhythmus und den Umfang pro Besuch.',
          'Bei einem einmaligen Auftrag ist der Anlass entscheidend: Handelt es sich um eine Auffrischung, eine Grundreinigung oder die Feinreinigung nach Bauarbeiten? Neue Verschmutzung durch noch laufende Arbeiten kann einen weiteren Einsatz erforderlich machen. Eine klare Beschreibung des Ausgangszustands und des geplanten Zeitpunkts hilft, solche Unterschiede im Angebot zu erkennen.',
        ],
      },
      {
        id: 'checkliste',
        title: 'Diese Angaben machen Ihre Anfrage verständlich',
        paragraphs: [
          'Beginnen Sie mit dem Objekt und Ihrem Ziel. Eine grobe Flächen- oder Stückzahlangabe hilft, muss aber für den ersten Kontakt noch nicht exakt sein. Teilen Sie außerdem mit, ob Sie einen einzelnen Einsatz oder eine laufende Betreuung wünschen. Für Rückfragen braucht ERLEDIGT TEAM eine Kontaktmöglichkeit; einen gewünschten Termin prüfen wir gemeinsam.',
          'Die Anfrage ist unverbindlich. Sie entscheiden über die Beauftragung, nachdem Aufgaben, Preis und Ablauf geklärt sind. Ein veröffentlichter Pauschalpreis wird hier bewusst nicht genannt, weil ein belastbarer Vergleich zuerst einen vergleichbaren Leistungsumfang braucht.',
        ],
        checklist: [
          'Ort und Postleitzahl',
          'Objektart und ungefähre Fläche oder Stückzahl',
          'Gewünschte Aufgaben und bekannte Rückstände',
          'Einmaliger Einsatz oder Reinigungsrhythmus',
          'Zugang, mögliche Zeiten und besondere Materialien',
        ],
      },
    ],
    comparison: {
      caption: 'Worauf Sie beim Vergleich zweier Reinigungsangebote achten können',
      headers: ['Vergleichspunkt', 'Konkret klären'],
      rows: [
        ['Flächen', 'Sind dieselben Räume, Glasflächen und Nebenbereiche erfasst?'],
        ['Aufgaben', 'Was wird gereinigt, was bleibt außerhalb des Auftrags?'],
        ['Rhythmus', 'Welche Aufgaben erfolgen bei jedem Besuch, welche zusätzlich?'],
        ['Zugang', 'Wer ermöglicht den Zugang und welche Zeitfenster gelten?'],
        [
          'Preisumfang',
          'Sind Zusatzarbeiten, Anfahrt und die Preisbestandteile verständlich beschrieben?',
        ],
      ],
    },
    faqs: [
      {
        question: 'Kann ich ein Angebot ohne genaue Quadratmeterzahl anfragen?',
        answer:
          'Ja. Eine grobe Beschreibung reicht für den Einstieg. Für ein konkretes Angebot werden fehlende Angaben anschließend gemeinsam geklärt.',
      },
      {
        question: 'Ist das günstigste Angebot automatisch die passende Wahl?',
        answer:
          'Der Betrag allein sagt nicht, ob die vereinbarten Aufgaben zu Ihrem Bedarf passen. Vergleichen Sie zuerst Umfang, Rhythmus, Zugang und enthaltene Zusatzarbeiten.',
      },
    ],
  },
  {
    slug: 'unterhaltsreinigung-oder-grundreinigung',
    title: 'Unterhaltsreinigung oder Grundreinigung: Was passt zu Ihrem Objekt?',
    label: 'Die passende Leistung',
    description:
      'Regelmäßige Pflege und intensive Reinigung verständlich unterscheiden. Entscheidungshilfe für Räume, Böden und gewerblich genutzte Gebäude.',
    summary:
      'Unterhaltsreinigung ist die wiederkehrende Pflege im Alltag. Eine Grundreinigung behandelt vereinbarte Flächen intensiver, wenn die normale Pflege den vorhandenen Zustand nicht ausreichend verbessert. Beide Leistungen können aufeinander aufbauen. Entscheidend sind Nutzung, Material und Verschmutzung, nicht allein die Größe des Objekts.',
    serviceSlug: 'grund-sonderreinigung',
    sections: [
      {
        id: 'alltag',
        title: 'Unterhaltsreinigung: einen regelmäßigen Ablauf festlegen',
        paragraphs: [
          'In genutzten Räumen entsteht immer wieder Schmutz. Laufwege, Sanitärbereiche und Kontaktflächen müssen passend zur tatsächlichen Nutzung gepflegt werden. Bei einer Unterhaltsreinigung wird deshalb vereinbart, welche Aufgaben regelmäßig anfallen und in welchem Rhythmus sie ausgeführt werden. Ein stark besuchter Eingang kann andere Anforderungen haben als ein selten genutzter Besprechungsraum.',
          'Der Plan muss zum Alltag im Gebäude passen. Öffnungszeiten, Mitarbeitende, Bewohnerverkehr und die Möglichkeiten für einen sicheren Zugang werden berücksichtigt. Nicht jede Fläche wird automatisch bei jedem Besuch gereinigt. Eine eindeutige Aufteilung zwischen regelmäßigen und ergänzenden Aufgaben macht die Leistung verständlich und erleichtert spätere Anpassungen.',
        ],
      },
      {
        id: 'intensiv',
        title: 'Grundreinigung: den vorhandenen Zustand genauer prüfen',
        paragraphs: [
          'Wenn fest haftende Rückstände oder besondere Belastungen vorhanden sind, reicht die übliche laufende Pflege unter Umständen nicht aus. Bei einer Grundreinigung werden der Zustand der Fläche, die Art der Rückstände und die Eigenschaften des Materials genauer betrachtet. Vorhandene Beschichtungen und bekannte Pflegehinweise sind dafür wichtige Informationen.',
          'Intensiver bedeutet nicht, dass jedes Verfahren für jeden Belag geeignet ist. Verträglichkeit, erreichbare Bereiche und mögliche Trocknungs- oder Sperrzeiten müssen zusammenpassen. Eine Reinigung ist außerdem keine Reparatur: Beschädigungen oder Verschleiß lassen sich nicht einfach mit Schmutz gleichsetzen. Solche Grenzen sollten vor einem Einsatz gemeinsam besprochen werden.',
        ],
      },
      {
        id: 'entscheidung',
        title: 'Drei Fragen helfen bei der ersten Entscheidung',
        paragraphs: [
          'Fragen Sie sich zuerst, ob Sie eine wiederkehrende Aufgabe oder ein konkretes einmaliges Problem lösen möchten. Beschreiben Sie anschließend, welche Bereiche betroffen sind und wie sie genutzt werden. Zum Schluss prüfen Sie, welche bekannten Rückstände, Materialien oder Einschränkungen genannt werden sollten. Diese Informationen sind hilfreicher als die vorschnelle Festlegung auf einen Fachbegriff.',
          'Ein Beispiel: Soll ein Büro dauerhaft gepflegt werden, ist eine Anfrage zur Unterhaltsreinigung naheliegend. Sind zusätzlich ältere Rückstände auf einzelnen Bodenflächen vorhanden, können diese als gesonderte Aufgabe geprüft werden. Die beiden Leistungen schließen sich also nicht aus. Ein abgestimmter Startzustand und anschließende regelmäßige Pflege können gemeinsam geplant werden.',
        ],
        checklist: [
          'Wiederkehrende Pflege oder einmaliger Anlass?',
          'Welche Flächen und Materialien sind betroffen?',
          'Welche Rückstände und bisherigen Behandlungen sind bekannt?',
        ],
      },
      {
        id: 'planen',
        title: 'So planen Sie mit ERLEDIGT TEAM den nächsten Schritt',
        paragraphs: [
          'Nennen Sie in Ihrer Anfrage den Ort, die Objektart und Ihr gewünschtes Ergebnis. Wenn Sie zwischen Unterhalts- und Grundreinigung schwanken, können Sie das ausdrücklich dazuschreiben. Fotos oder genaue Materialangaben können bei Bedarf später im persönlichen Austausch ergänzt werden. ERLEDIGT TEAM plant vom Standort Saterland aus Einsätze in der Umgebung.',
          'Vor der Beauftragung werden der Leistungsumfang, der Preis und der passende Termin abgestimmt. Bei regelmäßigem Bedarf wird zusätzlich der Rhythmus vereinbart. Ein angefragtes Zeitfenster ist noch keine Zusage. Wenn die Fläche während der Reinigung nicht nutzbar ist, wird auch das in die Planung aufgenommen, damit Ihr Alltag darauf abgestimmt werden kann.',
        ],
      },
    ],
    comparison: {
      caption: 'Unterhaltsreinigung und Grundreinigung im direkten Vergleich',
      headers: ['Frage', 'Unterhaltsreinigung', 'Grundreinigung'],
      rows: [
        [
          'Wofür?',
          'Laufende Pflege genutzter Bereiche',
          'Intensivere Behandlung eines vereinbarten Zustands',
        ],
        ['Wann?', 'In einem abgestimmten Turnus', 'Bei einem konkreten Anlass oder Bedarf'],
        [
          'Was klären?',
          'Aufgaben je Besuch, Nutzung und Zugang',
          'Material, Rückstände, Verträglichkeit und Sperrzeiten',
        ],
        [
          'Kombination?',
          'Kann auf eine Grundreinigung folgen',
          'Kann den Start für regelmäßige Pflege bilden',
        ],
      ],
    },
    faqs: [
      {
        question: 'Muss vor jeder Unterhaltsreinigung eine Grundreinigung stattfinden?',
        answer:
          'Nein. Das hängt vom vorhandenen Zustand und dem gewünschten Umfang ab. Ein zusätzlicher intensiver Einsatz wird nur nach Prüfung und Vereinbarung eingeplant.',
      },
      {
        question: 'Muss ich die Reinigungsart schon im ersten Kontakt sicher wissen?',
        answer:
          'Nein. Beschreiben Sie das Objekt, die betroffenen Flächen und Ihr Ziel. Die passende Zuordnung lässt sich anschließend gemeinsam klären.',
      },
    ],
  },
  {
    slug: 'fensterreinigung-vorbereiten',
    title: 'Fensterreinigung vorbereiten: Glas, Rahmen und Zugang richtig beschreiben',
    label: 'Vorbereitung',
    description:
      'Was Sie für eine Fensterreinigung angeben sollten: Glasflächen, Rahmen, Falze, Stockwerke und sichere Zugänge. Mit kompakter Checkliste.',
    summary:
      'Für eine gut vorbereitete Fensterreinigung sind Fensterzahl, Innen- und Außenseiten, gewünschte Rahmenpflege und sichere Erreichbarkeit wichtig. Rahmen, Falze und Fensterbänke werden ausdrücklich vereinbart. Beschreiben Sie Besonderheiten vom sicheren Boden aus; schwer erreichbare Flächen werden vor einer Zusage geprüft.',
    serviceSlug: 'glas-fensterreinigung',
    sections: [
      {
        id: 'flaechen',
        title: 'Glasfläche und komplettes Fenster unterscheiden',
        paragraphs: [
          'Mit dem Begriff Fensterreinigung können unterschiedliche Erwartungen verbunden sein. Manche Kunden wünschen saubere Glasflächen, andere möchten zusätzlich Rahmen, Falze oder Fensterbänke einbeziehen. Auch Innen- und Außenseiten sind getrennt zu betrachten. Halten Sie deshalb fest, welche Bereiche Ihnen wichtig sind, damit diese im Angebot eindeutig benannt werden können.',
          'Schaufenster, bodentiefe Elemente und kleinere Fenster unterscheiden sich in Größe und Zugang. Für die erste Anfrage reichen eine ungefähre Anzahl und eine Beschreibung der Fensterarten. Wenn nicht alle Flächen gleich behandelt werden sollen, nennen Sie die Unterschiede. So muss später nicht aus einer allgemeinen Stückzahl auf einen unklaren Umfang geschlossen werden.',
        ],
      },
      {
        id: 'zugang',
        title: 'Erreichbarkeit vor dem Termin klären',
        paragraphs: [
          'Das Stockwerk allein beschreibt den Zugang nicht vollständig. Lassen sich die Fenster öffnen? Gibt es feste Verglasungen, davorstehende Möbel oder bauliche Hindernisse? Sind Außenflächen nur schwer erreichbar? Solche Informationen helfen bei der Einschätzung. Beschreiben Sie die Situation aus einer sicheren Position und unternehmen Sie für die Anfrage keine eigenen Arbeiten in der Höhe.',
          'ERLEDIGT TEAM prüft die Voraussetzungen, bevor ein konkreter Einsatz zugesagt wird. Eine Nachricht über schwer erreichbare Glasflächen ist deshalb noch keine Bestätigung, dass diese ohne weitere Vorbereitung gereinigt werden können. Zugang, mögliche Hilfsmittel und ein geeigneter Arbeitsbereich müssen zur jeweiligen Situation passen und werden persönlich abgestimmt.',
        ],
      },
      {
        id: 'rueckstaende',
        title: 'Besondere Rückstände und empfindliche Flächen erwähnen',
        paragraphs: [
          'Gewöhnliche Verschmutzung und fest haftende Bau-, Kleber- oder Farbreste sind unterschiedliche Aufgaben. Nennen Sie bekannte Rückstände und bisherige Behandlungen bereits bei der Anfrage. Vorhandene Beschichtungen, Schäden oder besondere Pflegehinweise sollten ebenfalls angesprochen werden. Die Wahl des Vorgehens richtet sich nach dem Zustand der Oberfläche und dem vereinbarten Umfang.',
          'Eine Reinigung beseitigt keine Kratzer oder baulichen Mängel. Solche Merkmale sollten von Schmutz unterschieden werden, bevor Erwartungen an das Ergebnis entstehen. Bei einer Reinigung nach Bauarbeiten ist außerdem wichtig, ob noch weitere Gewerke tätig sind. Neue Arbeiten können bereits gereinigte Flächen erneut belasten und die Terminplanung verändern.',
        ],
      },
      {
        id: 'vorbereiten',
        title: 'Was Sie für Anfrage und Termin vorbereiten können',
        paragraphs: [
          'Geben Sie Ort und Postleitzahl, die ungefähre Fensterzahl und die betroffenen Stockwerke an. Ergänzen Sie, welche Seiten und Zusatzbereiche gereinigt werden sollen. Wenn Sie regelmäßig gereinigte Glasflächen wünschen, nennen Sie diesen Bedarf; ein sinnvoller Rhythmus wird gemeinsam besprochen. Für Rückfragen reicht zunächst die von Ihnen gewählte Kontaktmöglichkeit.',
          'Vor einem bestätigten Termin stimmen wir ab, wie die Arbeitsbereiche zugänglich werden. Bewegliche Gegenstände auf Fensterbänken und persönliche Dinge sollten nach Vereinbarung sicher beiseitegeräumt werden. Größere Möbel oder fest montierte Einrichtungen sind gesondert zu besprechen. Für Ihren Auftrag in Saterland und Umgebung werden Umfang, Preis und Termin vor der Beauftragung geklärt.',
        ],
        checklist: [
          'Ungefähre Anzahl und Art der Fenster',
          'Innen, außen oder beide Seiten',
          'Rahmen, Falze und Fensterbänke ausdrücklich nennen',
          'Stockwerk, Öffnungsmöglichkeiten und Hindernisse',
          'Bekannte Rückstände und besondere Pflegehinweise',
        ],
      },
    ],
    comparison: {
      caption: 'So wird aus einer allgemeinen Anfrage eine klare Beschreibung',
      headers: ['Statt nur …', 'Hilfreicher ist …'],
      rows: [
        ['„Fenster reinigen“', 'Fensterzahl, Innen- und Außenseiten nennen'],
        ['„Alles mitmachen“', 'Rahmen, Falze und Fensterbänke einzeln aufführen'],
        ['„Oben am Haus“', 'Stockwerk und Öffnungsmöglichkeiten beschreiben'],
        ['„Stark verschmutzt“', 'Art der Rückstände und bekannte Vorbehandlung angeben'],
      ],
    },
    faqs: [
      {
        question: 'Muss ich meine Fenster vor der Anfrage genau ausmessen?',
        answer:
          'Für den Einstieg sind eine ungefähre Anzahl und die Beschreibung der Fensterarten ausreichend. Fehlende Einzelheiten werden für das konkrete Angebot ergänzt.',
      },
      {
        question: 'Soll ich für Fotos auf eine Leiter steigen?',
        answer:
          'Nein. Beschreiben Sie die Situation aus einer sicheren Position. Erforderliche Angaben zur Erreichbarkeit werden gemeinsam geklärt.',
      },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
export const guideForService = (slug: string) =>
  slug === 'glas-fensterreinigung'
    ? guides[2]
    : ['grund-sonderreinigung', 'unterhaltsreinigung'].includes(slug)
      ? guides[1]
      : guides[0];
