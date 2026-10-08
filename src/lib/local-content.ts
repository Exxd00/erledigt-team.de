import type { City, Service, ContentSection } from './site.ts';

// Additional editorial modules give each local page a distinct, useful focus.
// Local introductions describe planning scenarios, never invented local references.
const additional: Record<string, ContentSection[]> = {
  unterhaltsreinigung: [
    {
      title: 'Wiederkehrende Aufgaben von Extras trennen',
      body: 'Ein Reinigungsplan wird verständlicher, wenn er drei Ebenen enthält: die Aufgaben bei jedem Besuch, Arbeiten in größeren Abständen und ausdrücklich angefragte Extras. Fenster, intensive Bodenpflege oder ein zusätzlicher Raum sollten nicht stillschweigend in einem allgemeinen Begriff verschwinden. Halten Sie zunächst fest, welches Ergebnis Sie im Alltag brauchen. Daraus lassen sich konkrete Aufgaben ableiten, deren Ausführung später gemeinsam beurteilt werden kann.',
    },
    {
      title: 'Veränderungen frühzeitig einplanen',
      body: 'Eine andere Raumbelegung kann den bisherigen Bedarf verändern. Zusätzliche Arbeitsplätze, eine vorübergehende Baustelle im Haus oder neue Nutzungszeiten sollten deshalb angesprochen werden. Teilen Sie Änderungen möglichst vor dem nächsten Einsatz mit. So lässt sich prüfen, ob der vereinbarte Umfang weiterhin passt oder angepasst werden muss. Ein fester Ansprechpartner hilft, diese Abstimmung zu bündeln und widersprüchliche Einzelaufträge vor Ort zu vermeiden.',
    },
  ],
  'buero-praxisreinigung': [
    {
      title: 'Arbeitsplätze für die Reinigung vorbereiten',
      body: 'Freie Oberflächen erleichtern die Arbeit, ohne dass persönliche Unterlagen bewegt werden müssen. Besprechen Sie intern, welche Schreibtische freigegeben sind und welche Bereiche unberührt bleiben sollen. Kabel, Bildschirme und andere Geräte benötigen eigene Absprachen. In gemeinsam genutzten Küchen zählt außerdem die Abgrenzung zwischen Oberflächenreinigung und dem Umgang mit Geschirr oder Lebensmitteln. Klare Zuständigkeiten machen den geplanten Termin für alle Beteiligten überschaubar.',
    },
    {
      title: 'Zugang und Vertraulichkeit organisieren',
      body: 'Bei einer Reinigung außerhalb der Öffnungszeit beginnt die Vorbereitung an der Eingangstür. Schlüssel, Alarmanlage und erreichbare Kontaktpersonen müssen abgestimmt sein. Vertrauliche Dokumente und personenbezogene Unterlagen sollten sicher verwahrt werden. Räume mit besonderen Zutrittsregeln werden ausdrücklich benannt. Ein kurzer Ablaufplan kann auch festhalten, welche Türen anschließend verschlossen werden und wie ein unerwartet nicht zugänglicher Raum gemeldet werden soll.',
    },
  ],
  'grund-sonderreinigung': [
    {
      title: 'Das gewünschte Ergebnis konkret beschreiben',
      body: 'Die Aussage „wieder wie neu“ ist bei älteren Oberflächen oft kein verlässlicher Maßstab. Hilfreicher ist eine Beschreibung sichtbarer Rückstände und der gewünschten Nutzung nach dem Einsatz. Kratzer, Verfärbungen oder abgenutzte Schutzschichten können trotz Reinigung bestehen bleiben. Wir besprechen diese Grenzen vorab und unterscheiden entfernbare Verschmutzung von Schäden am Material. So lässt sich eine Entscheidung auf nachvollziehbarer Grundlage treffen.',
    },
    {
      title: 'Eine Probefläche als Entscheidungshilfe',
      body: 'Bei unbekannten Belägen oder hartnäckigen Rückständen kann eine kleine, abgestimmte Probefläche sinnvoll sein. Sie hilft, Materialverträglichkeit und erreichbare Veränderung einzuschätzen. Der Versuch ist keine pauschale Zusage für jede Stelle des Objekts: unterschiedliche Vorbehandlungen können abweichend reagieren. Halten Sie bekannte Pflegeprodukte und vorhandene Herstellerangaben bereit. Auch die spätere Freigabe und Nutzung der behandelten Fläche gehören zur Planung.',
    },
  ],
  treppenhausreinigung: [
    {
      title: 'Gemeinschaftsflächen ohne Missverständnisse erfassen',
      body: 'Zum Treppenhaus können neben Stufen und Podesten auch Eingangstüren, Handläufe, Briefkastenoberflächen oder ein Kellerzugang gehören. Welche Bereiche tatsächlich gereinigt werden, wird einzeln festgelegt. Private Schuhe, Kinderwagen und Dekoration sollten nicht ohne Absprache umgestellt werden. Eine Information an die Bewohner kann helfen, Laufwege zum Termin freizuhalten. Zusätzliche Fenster oder schwer erreichbare Leuchten bleiben gesondert zu prüfende Aufgaben.',
    },
    {
      title: 'Rückmeldungen über eine Kontaktperson bündeln',
      body: 'In einem Mehrparteienhaus treffen unterschiedliche Wünsche zusammen. Eine benannte Kontaktperson kann Hinweise sammeln und Änderungen am vereinbarten Umfang abstimmen. Das erleichtert die Zusammenarbeit und verhindert, dass einzelne Zurufe den ursprünglichen Auftrag unbemerkt verändern. Besprechen Sie auch, wie außergewöhnliche Verschmutzungen gemeldet werden. Eine einmalige zusätzliche Aufgabe und der reguläre Reinigungsturnus sollten für Verwaltung und Bewohner klar voneinander erkennbar bleiben.',
    },
  ],
  'glas-fensterreinigung': [
    {
      title: 'Fenster zählen ist erst der Anfang',
      body: 'Zwei Objekte mit derselben Fensterzahl können sehr unterschiedlichen Aufwand verursachen. Größe, Öffnungsart, Höhe und Hindernisse vor dem Glas spielen eine Rolle. Geben Sie an, ob Innen- und Außenseiten, Rahmen, Falze oder Fensterbänke gewünscht sind. Große feste Verglasungen werden anders vorbereitet als frei zugängliche Drehfenster. Eine grobe Aufstellung nach Räumen oder Etagen ist deshalb oft hilfreicher als eine einzelne Quadratmeterzahl.',
    },
    {
      title: 'Den Arbeitsbereich am Fenster vorbereiten',
      body: 'Freie Fensterbänke und zugängliche Flächen erleichtern einen geordneten Einsatz. Welche Vorhänge, Pflanzen oder Möbel vorher bewegt werden sollen, besprechen wir mit Ihnen. Beschädigte Dichtungen, Folien oder empfindliche Rahmenbeschichtungen sollten schon bei der Anfrage genannt werden. Fest sitzende Bau- oder Farbreste gehören nicht automatisch zur normalen Glasreinigung. Sie benötigen eine eigene Beurteilung, damit das Verfahren zum Zustand der Oberfläche passt.',
    },
  ],
  'maschinen-anlagenreinigung': [
    {
      title: 'Freigaben vor dem Einsatz festhalten',
      body: 'Technische Verantwortung und Reinigungsauftrag müssen eindeutig getrennt sein. Ihr Betrieb legt fest, welche Anlage freigegeben ist und wie sie gegen unbeabsichtigten Betrieb gesichert wird. Wir stimmen die zu reinigenden Oberflächen und zulässigen Verfahren mit der zuständigen Person ab. Elektrische Komponenten, Schmierstellen und empfindliche Sensoren dürfen nicht pauschal einbezogen werden. Fehlende Informationen werden geklärt, bevor eine Ausführung zugesagt wird.',
    },
    {
      title: 'Rückstände und Betriebsstoffe benennen',
      body: 'Öl, Staub, Produktionsreste und unbekannte Ablagerungen verlangen unterschiedliche Vorbereitungen. Beschreiben Sie bekannte Stoffe und stellen Sie verfügbare Sicherheits- oder Herstellerinformationen bereit. Die Handhabung belasteter Rückstände wird gesondert geprüft; eine allgemeine Anfrage enthält keine automatische Entsorgungszusage. Ebenso wichtig ist ein geeigneter Arbeitsbereich um die Anlage. Zugänge, Beleuchtung und mögliche Wechselwirkungen mit benachbarten Prozessen gehören in die Abstimmung.',
    },
  ],
  'hallen-gewerbereinigung': [
    {
      title: 'Verkehrswege und Arbeitszonen getrennt planen',
      body: 'Eine Halle lässt sich selten sinnvoll nur über ihre Gesamtfläche beschreiben. Laufwege, Lagerzonen, freie Bodenflächen und Bereiche unter Einbauten haben unterschiedliche Voraussetzungen. Teilen Sie mit, wo Fahrzeuge oder Mitarbeitende unterwegs sind und welche Abschnitte zeitweise freigegeben werden können. Eine etappenweise Ausführung kann dadurch gezielt geprüft werden. Die Reinigung soll in einen abgestimmten Ablauf passen, dessen Grenzen vor Beginn verständlich feststehen.',
    },
    {
      title: 'Belastung und Belag gemeinsam betrachten',
      body: 'Ein Hallenboden mit Beschichtung stellt andere Anforderungen als eine unbehandelte oder beschädigte Fläche. Auch Reifenabrieb, Staub und eingetragene Feuchtigkeit können verschiedene Maßnahmen erfordern. Nennen Sie bekannte Pflegehinweise und Bereiche mit erhöhtem Verschleiß. Wir unterscheiden zwischen dem Entfernen von Schmutz und einer Reparatur des Untergrunds. Regale, gelagerte Waren und Maschinen werden nur im ausdrücklich vereinbarten Umfang einbezogen.',
    },
  ],
  baustellenreinigung: [
    {
      title: 'Den richtigen Zeitpunkt für die Feinreinigung wählen',
      body: 'Wenn noch gesägt, geschliffen oder verputzt wird, können bereits gereinigte Flächen erneut verschmutzen. Ein geplanter Übergabetermin allein reicht daher nicht als Startsignal. Nennen Sie die noch laufenden Gewerke und die Reihenfolge der Raumfreigaben. Bei Bedarf werden Zwischenreinigung und abschließende Feinreinigung getrennt betrachtet. So bleibt nachvollziehbar, welches Ergebnis zum jeweiligen Bauzustand gehört und welche Arbeiten später erneut erforderlich sein könnten.',
    },
    {
      title: 'Neue Oberflächen brauchen passende Pflegehinweise',
      body: 'Neue Böden, Fenster oder Beschichtungen sind nicht automatisch unempfindlich. Aushärtungszeiten und Herstellerangaben bestimmen, wann und wie eine Behandlung möglich ist. Klebereste, Schutzfolien oder Mörtelspritzer werden vorab beschrieben und gesondert beurteilt. Eine Reinigung beinhaltet weder eine bauliche Abnahme noch die Beseitigung von Ausführungsmängeln. Die klare Trennung hilft, Zuständigkeiten zwischen Bauherrschaft, Gewerken und Reinigungsdienst verständlich festzuhalten.',
    },
  ],
  'polster-teppichreinigung': [
    {
      title: 'Flecken nach Ursache und Vorgeschichte beurteilen',
      body: 'Ein Fleck lässt sich besser einschätzen, wenn seine Ursache bekannt ist. Nennen Sie verschüttete Stoffe und bereits verwendete Hausmittel, soweit Sie sich erinnern. Frühere Behandlungen können Farbe oder Faser verändert haben. Wir prüfen die Möglichkeiten anhand des Materials und versprechen keine vollständige Entfernung unabhängig vom Zustand. Bei empfindlichen Textilien kann eine abgestimmte Probe helfen, die nächste Entscheidung vorzubereiten.',
    },
    {
      title: 'Trocknung in Ihren Alltag einplanen',
      body: 'Je nach Verfahren können Textilien nach der Behandlung noch Feuchtigkeit enthalten. Lüftung, Raumklima und Material beeinflussen die weitere Trocknung. Beschreiben Sie deshalb, wann Sitzmöbel oder Laufbereiche wieder benötigt werden. Eine feste Trocknungsdauer lässt sich nicht für jedes Objekt pauschal zusagen. Gegebenenfalls kann eine Reinigung in Abschnitten besprochen werden, damit andere Bereiche währenddessen nutzbar bleiben und das Ergebnis geschützt wird.',
    },
  ],
  'dach-oberflaechenreinigung': [
    {
      title: 'Zustand vor Verfahren beurteilen',
      body: 'Ein sichtbarer Belag sagt noch nicht, welche Behandlung für eine Dach- oder Außenfläche geeignet ist. Material, Beschichtung, Fugen und vorhandene Schäden müssen mitbetrachtet werden. Ein kräftiger Wasserstrahl ist keine allgemeine Lösung für jede Oberfläche. Nennen Sie bekannte Undichtigkeiten oder empfindliche Bauteile. Wir klären zuerst, ob die gewünschte Reinigung unter den vorhandenen Bedingungen sinnvoll geplant werden kann und welche Grenzen bestehen.',
    },
    {
      title: 'Umgebung und Wasserführung berücksichtigen',
      body: 'Außenarbeiten betreffen auch angrenzende Wege, Pflanzen und andere Bauteile. Der Arbeitsbereich und der Umgang mit ablaufendem Wasser werden deshalb vorab besprochen. Höhe und Erreichbarkeit bestimmen zusätzliche Voraussetzungen. Eine Reinigungsanfrage ist keine Zusage für Dachreparaturen oder Arbeiten an unbekannten schadstoffhaltigen Materialien. Wenn wichtige Angaben fehlen, ist eine weitere Prüfung notwendig, bevor Verfahren, Umfang und Ausführungstermin festgelegt werden.',
    },
  ],
  'pv-anlagen-reinigung': [
    {
      title: 'Verschmutzung und Anlass gemeinsam prüfen',
      body: 'Nicht jede sichtbare Spur auf einem Solarmodul rechtfertigt dieselbe Maßnahme. Beschreiben Sie Art und Verteilung der Ablagerungen sowie die bisherige Pflege. Eine Reinigung ist keine elektrische Prüfung und erlaubt keine pauschale Zusage für einen bestimmten Mehrertrag. Für die Entscheidung zählen Zustand, Herstellerhinweise und sichere Erreichbarkeit. Technische Auffälligkeiten sollten zunächst mit dem zuständigen Fachbetrieb geklärt werden, bevor ein Reinigungstermin geplant wird.',
    },
    {
      title: 'Modulflächen ohne unnötige Belastung behandeln',
      body: 'Bei der Planung sind empfindliche Glasflächen, Rahmen, Leitungen und Anschlüsse zu berücksichtigen. Das Verfahren richtet sich nach den Vorgaben des Herstellers und den Bedingungen vor Ort. Zugang und geeigneter Arbeitsbereich müssen geklärt sein; Module werden nicht als allgemeine Lauffläche betrachtet. Nennen Sie Aufstellungsart, ungefähre Größe und bekannte Beschädigungen. Eine Dachanlage und frei zugängliche Module können sehr unterschiedliche Vorbereitungen erfordern.',
    },
  ],
};

const combinations: number[][] = [];
for (let a = 0; a < 6; a++)
  for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) combinations.push([a, b, c]);

export function localContent(city: City, service: Service, allCities: City[]) {
  const peers = allCities
    .filter((c) => c.lens === city.lens)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const ordinal = peers.findIndex((c) => c.slug === city.slug);
  const serviceOffset = Object.keys(additional).indexOf(service.slug);
  const choice = combinations[(ordinal * 7 + serviceOffset * 3) % combinations.length];
  const pool = [...service.sections, ...(additional[service.slug] || [])];
  const selected = choice.map((i) => pool[i]);
  const place =
    city.distanceKm === 0
      ? 'Unser Ausgangspunkt ist die Eschstraße 70 in Saterland.'
      : `Wir planen den Einsatz in ${city.name} von Saterland aus. Der Ortsbezug liegt bei ungefähr ${city.distanceKm} Kilometern Luftlinie zu unserem Standort; die tatsächliche Fahrt und der Zugang werden anhand Ihrer Adresse geprüft.`;
  const sections: ContentSection[] = [
    {
      title: `${service.name} für Ihr Objekt in ${city.name}`,
      body: city.intro || city.sections[0].body,
    },
    selected[0],
    { title: city.sections[1].title, body: city.sections[1].body },
    ...selected.slice(1),
    {
      title: `Ihre Anfrage aus ${city.name} vorbereiten`,
      body: `${place} Beschreiben Sie insbesondere ${city.access || 'die Fläche und den Zugang'}. Für ${service.name} sind außerdem diese Angaben hilfreich: ${service.formHints.join('; ')}. Sie müssen nicht bereits alles exakt wissen. Die Anfrage öffnet sich mit Ihrer Leistung und Ihrem Ort. Fehlende Einzelheiten klären wir persönlich, bevor Sie über ein Angebot und einen verbindlichen Termin entscheiden.`,
    },
  ];
  return {
    sections,
    description: `${service.name} in ${city.name}: ${city.summary} Umfang, Vorbereitung und Anfrage bei ERLEDIGT TEAM aus Saterland.`,
    focus: selected.map((s) => s.title),
  };
}
