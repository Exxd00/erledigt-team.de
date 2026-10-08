import fs from 'node:fs';
const geo = JSON.parse(fs.readFileSync('docs/geography-input.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('src/data/content.json', 'utf8'));
// Each local introduction has a distinct planning focus; these are use cases, not claims about local clients.
const profiles = {
  Molbergen: [
    'Neue Pflege beginnt mit dem vorhandenen Zustand.',
    'Für ein Objekt in Molbergen ist zunächst hilfreich, den aktuellen Zustand von Ihrem gewünschten Ergebnis zu unterscheiden. Welche Flächen werden bereits regelmäßig gepflegt, und wo reichen die bisherigen Arbeiten nicht mehr aus? Beschreiben Sie diese Unterschiede möglichst konkret. Wir können anschließend laufende Aufgaben und einen möglichen intensiveren Einstieg getrennt betrachten. So wird nachvollziehbar, welche Reinigung jetzt benötigt wird und welche Pflege danach sinnvoll vereinbart werden kann.',
    'zustand',
    'die bisherige Pflege und die stärker belasteten Flächen',
  ],
  'Lindern (Oldenburg)': [
    'Die wichtigsten Räume zuerst in den Blick nehmen.',
    'Bei Ihrer Anfrage aus Lindern müssen Sie nicht sofort das gesamte Gebäude erfassen. Beginnen Sie mit den Räumen oder Flächen, die Ihnen am wichtigsten sind. Ein nachvollziehbarer Schwerpunkt erleichtert die Abstimmung über Umfang und Termin. Wenn weitere Aufgaben hinzukommen, ordnen wir diese gemeinsam ein. Beschreiben Sie auch, welche Bereiche während der Reinigung genutzt werden, damit die Planung zu Ihrem Alltag und zur vorhandenen Einrichtung passt.',
    'privat',
    'vorrangige Räume und die weitere Nutzung während des Termins',
  ],
  Großenkneten: [
    'Für unterschiedliche Arbeitszonen passend planen.',
    'Wenn Sie in Großenkneten gewerblich genutzte Räume anfragen, hilft eine Aufteilung nach Funktion. Empfang, Büro, Lager und technische Bereiche brauchen nicht automatisch denselben Ablauf. Nennen Sie uns die Zonen und die Personen, die sie freigeben können. Wir besprechen dann, welche Aufgaben gemeinsam und welche in einem eigenen Zeitfenster geprüft werden sollten. Die Beschreibung bildet die Grundlage für ein Angebot, in dem einzelne Leistungen erkennbar bleiben.',
    'gewerbe',
    'die Raumfunktionen und die zuständigen Personen für die Freigabe',
  ],
  Wardenburg: [
    'Reinigung auf Raumwechsel abstimmen.',
    'Für eine Anfrage in Wardenburg ist die geplante Nutzung nach dem Termin ein guter Ausgangspunkt. Soll ein Raum wieder laufend gepflegt werden, oder steht zunächst ein Wechsel der Möblierung an? Teilen Sie uns den Ablauf mit, damit gereinigte Flächen nicht unmittelbar erneut durch andere Arbeiten belastet werden. Wir prüfen, welche Vorbereitung hilfreich ist und ob die Aufgabe besser in getrennte Abschnitte gegliedert werden sollte.',
    'wechsel',
    'Möblierungswechsel und die geplante Freigabe der Räume',
  ],
  Jade: [
    'Außenflächen mit klaren Angaben beschreiben.',
    'Bei Außenarbeiten an Ihrem Objekt in Jade kommt es besonders auf eine verständliche Beschreibung der Flächen an. Material, Höhe und Zugang gehören zusammen; die Größe allein reicht selten für eine belastbare Einschätzung. Nennen Sie außerdem angrenzende Bauteile und bekannte empfindliche Stellen. Wir klären, ob zusätzliche Informationen oder eine Besichtigung benötigt werden. Erst wenn die Voraussetzungen passen, können Umfang und mögliche Ausführung miteinander abgestimmt werden.',
    'aussen',
    'angrenzende Flächen und eine sichere Erreichbarkeit',
  ],
  Ihlow: [
    'Einzelaufgaben zu einem verständlichen Auftrag verbinden.',
    'Für Ihr Objekt in Ihlow können Sie verschiedene Reinigungswünsche gemeinsam nennen, ohne sie bereits fachlich einordnen zu müssen. Beschreiben Sie, was Sie stört und welche Bereiche betroffen sind. Wir helfen bei der Zuordnung zur passenden Leistung und trennen laufende Pflege von einmaligen Arbeiten. Hilfreich ist eine Reihenfolge Ihrer Prioritäten. Damit bleibt im späteren Angebot erkennbar, welche Aufgaben zuerst anstehen und welche ergänzend geprüft werden.',
    'gemischt',
    'die einzelnen Arbeitsbereiche und Ihre Reihenfolge nach Wichtigkeit',
  ],
  Friedeburg: [
    'Termin und Betriebsablauf gemeinsam betrachten.',
    'Wenn in Friedeburg während des Tages gearbeitet oder Publikum empfangen wird, sollte die Reinigung mit diesen Zeiten abgestimmt sein. Nennen Sie uns freie Räume und mögliche Zeitfenster. Ein Bereich kann vielleicht bereits bearbeitet werden, während ein anderer noch genutzt wird. Wir besprechen, welche Aufteilung sinnvoll erscheint und wer den Zugang ermöglicht. Auch eine einmalige Aufgabe profitiert davon, dass diese Fragen vor dem Einsatz geklärt sind.',
    'zeit',
    'freie Zeitfenster und noch genutzte Bereiche',
  ],
  Südbrookmerland: [
    'Mehr Übersicht für mehrere Einsatzorte.',
    'Wenn Sie in Südbrookmerland mehr als ein Objekt betreuen, nennen Sie die Adressen und Aufgaben jeweils getrennt. Eine gemeinsame Anfrage kann die Kommunikation erleichtern, während der tatsächliche Aufwand pro Gebäude erkennbar bleibt. Unterschiede bei Zugang, Nutzung und Material sind dabei wichtig. Wir prüfen die Angaben und besprechen mögliche Zusammenhänge in der Terminplanung. Eine Bündelung wird erst vereinbart, wenn die einzelnen Voraussetzungen ausreichend geklärt sind.',
    'mehrere',
    'die genaue Zuordnung von Aufgaben zu den jeweiligen Adressen',
  ],
  Hilkenbrook: [
    'Ein sinnvoller Start für regelmäßige Pflege.',
    'Für eine laufende Reinigung in Hilkenbrook lohnt sich eine kurze Bestandsaufnahme der häufig genutzten Bereiche. Welche Räume sollen bei jedem Besuch berücksichtigt werden, welche nur gelegentlich? Teilen Sie auch mit, wo sich der Bedarf im Verlauf der Woche verändert. Wir betrachten Ihre Angaben gemeinsam und unterscheiden regelmäßige Aufgaben von zusätzlichen Leistungen. Der geplante Rhythmus richtet sich nach der tatsächlichen Nutzung und kann bei Änderungen erneut besprochen werden.',
    'rhythmus',
    'Nutzungsunterschiede im Wochenverlauf und besondere Schwerpunkte',
  ],
  Neubörger: [
    'Übergänge nach Bauarbeiten geordnet vorbereiten.',
    'Bei einer Anfrage aus Neubörger nach Umbau oder Renovierung ist der verbleibende Arbeitsablauf besonders hilfreich. Sind Handwerker noch vor Ort, werden Möbel erst angeliefert oder stehen Räume bereits für die Nutzung bereit? Diese Angaben beeinflussen den passenden Reinigungszeitpunkt. Wir trennen vorläufige Arbeiten von einer abschließenden Reinigung und berücksichtigen Hinweise zu neuen Materialien. So lässt sich das gewünschte Ergebnis an einen realistischen Bauzustand knüpfen.',
    'bau',
    'verbleibende Gewerke und anstehende Einrichtungsarbeiten',
  ],
  Neulehe: [
    'Fensterflächen mit ihren Besonderheiten erfassen.',
    'Wenn Sie für ein Objekt in Neulehe Glasflächen anfragen, hilft eine Beschreibung nach Gebäudeseiten oder Räumen. Öffnungsart, Höhe und Hindernisse können sich selbst innerhalb eines Hauses deutlich unterscheiden. Nennen Sie bekannte Folien oder empfindliche Rahmen und sagen Sie, ob beide Seiten gereinigt werden sollen. Weitere Aufgaben können Sie ergänzen. Wir klären anschließend den Umfang, ohne eine reine Fensterzahl als vollständige Grundlage vorauszusetzen.',
    'fenster',
    'Öffnungsarten und Unterschiede zwischen den Gebäudeseiten',
  ],
  Lehe: [
    'Den Zugang vor dem Termin einfach klären.',
    'Eine Reinigungsanfrage aus Lehe lässt sich leichter planen, wenn feststeht, wie die Arbeitsbereiche erreichbar sind. Müssen Türen geöffnet, Gegenstände beiseitegestellt oder einzelne Räume besonders vorbereitet werden? Teilen Sie uns bekannte Besonderheiten mit. Wir besprechen die erforderlichen Schritte und unterscheiden Ihre Vorbereitung von den eigentlichen Reinigungsaufgaben. Dadurch kann der Termin geordnet beginnen, und der Umfang bleibt für alle Beteiligten verständlich und nachvollziehbar.',
    'privat',
    'Türzugänge und die Vorbereitung der einzelnen Arbeitsbereiche',
  ],
  Heede: [
    'Gepflegte gemeinschaftliche Bereiche nachvollziehbar planen.',
    'Für ein gemeinsam genutztes Objekt in Heede stehen klare Zuständigkeiten am Anfang. Nennen Sie eine Kontaktperson und die Bereiche, die zum Auftrag gehören sollen. Eingänge, Aufgänge und Nebenräume werden einzeln erfasst, statt den Umfang nur mit einem allgemeinen Gebäudebegriff zu beschreiben. Wir klären auch, wie Hinweise zum Ergebnis weitergegeben werden. So lassen sich regelmäßige Aufgaben und ergänzende Wünsche gezielt voneinander unterscheiden.',
    'verwaltung',
    'die freigegebenen Gemeinschaftsflächen und eine feste Kontaktperson',
  ],
  Dersum: [
    'Bei Textilien Material und Nutzung zusammenbringen.',
    'Wenn Sie in Dersum Polster oder textile Bodenflächen reinigen lassen möchten, helfen Materialangaben und die geplante Wiederbenutzung. Bekannte Flecken und frühere Reinigungsversuche sollten Sie ebenfalls nennen. Wir betrachten die Voraussetzungen und besprechen, welche Vorbereitung sinnvoll ist. Eine Reinigung wird nicht unabhängig vom Zustand als vollständige Erneuerung versprochen. Entscheidend ist ein realistisches Ziel, das zum Gewebe und zum vorgesehenen Ablauf in Ihren Räumen passt.',
    'textil',
    'Materialangaben und die gewünschte Wiederbenutzung nach dem Einsatz',
  ],
  Kluse: [
    'Technische Bereiche mit den Verantwortlichen abstimmen.',
    'Für einen Reinigungswunsch an technischen Bereichen in Kluse benötigen wir eine klare Beschreibung der freigegebenen Flächen. Nennen Sie außerdem die zuständige Kontaktperson und vorhandene Herstellerhinweise. Die Reinigung und die technische Verantwortung bleiben getrennte Aufgaben. Wir prüfen, welche Informationen noch fehlen und ob der gewünschte Umfang zu den Betriebsbedingungen passt. Auf dieser Grundlage können nächste Schritte besprochen werden, bevor ein konkreter Einsatz zugesagt wird.',
    'technik',
    'die technische Freigabe und vorhandene Herstellerunterlagen',
  ],
  Walchum: [
    'Außenpflege nach Fläche und Umgebung beurteilen.',
    'Bei einer Anfrage für Walchum sollten neben der betroffenen Außenfläche auch ihre unmittelbare Umgebung und der Zugang beschrieben werden. Empfindliche angrenzende Bauteile, Pflanzen oder Wege können die Vorbereitung beeinflussen. Wir betrachten diese Angaben zusammen mit dem Material und dem gewünschten Ergebnis. Eine geeignete Vorgehensweise ergibt sich erst aus den Voraussetzungen. Bei offenen Fragen kann eine Besichtigung helfen, den Umfang genauer und nachvollziehbarer festzulegen.',
    'aussen',
    'die Umgebung der Arbeitsfläche und empfindliche angrenzende Bauteile',
  ],
  Sustrum: [
    'Die Belastung Ihrer Räume als Ausgangspunkt nutzen.',
    'Für ein Objekt in Sustrum lässt sich der Reinigungsbedarf gut anhand der tatsächlichen Nutzung beschreiben. Welche Flächen werden täglich beansprucht, wo kommen nur gelegentlich Besucher vorbei? Nennen Sie diese Unterschiede und ergänzen Sie Ihre Prioritäten. Wir prüfen, wie sich regelmäßige Pflege und einzelne intensivere Arbeiten sinnvoll abgrenzen lassen. Ein nachvollziehbarer Plan soll Ihnen zeigen, welche Aufgaben bei jedem Einsatz vorgesehen sind und welche zusätzlich vereinbart werden.',
    'rhythmus',
    'täglich beanspruchte Zonen und seltener genutzte Nebenräume',
  ],
  Fresenburg: [
    'Mehrere Reinigungswünsche übersichtlich sortieren.',
    'Eine Anfrage aus Fresenburg kann mit einer einfachen Liste beginnen: die betroffenen Bereiche, der aktuelle Zustand und Ihr gewünschter Termin. Sie müssen die passende Fachbezeichnung noch nicht kennen. Wir ordnen die Aufgaben gemeinsam ein und besprechen, welche Informationen für eine Einschätzung fehlen. Wenn verschiedene Materialien betroffen sind, bleiben sie im Umfang getrennt erkennbar. Das hilft Ihnen, über einzelne Leistungen oder eine abgestimmte Kombination zu entscheiden.',
    'gemischt',
    'die Materialarten und den Umfang der einzelnen Reinigungswünsche',
  ],
  Stavern: [
    'Empfindliche Oberflächen bewusst berücksichtigen.',
    'Bei einem Objekt in Stavern sollten bekannte empfindliche Stellen früh genannt werden. Beschichtungen, ältere Beläge oder frühere Behandlungen können beeinflussen, welche Reinigung geeignet ist. Beschreiben Sie den Zustand und sagen Sie, welche Veränderung Sie sich wünschen. Wir unterscheiden entfernbare Rückstände von vorhandenen Schäden. Wenn die Informationen noch nicht ausreichen, wird der nächste Prüfschritt besprochen, bevor ein Verfahren oder ein bestimmtes Ergebnis zugesagt wird.',
    'zustand',
    'ältere Beläge und bekannte Empfindlichkeiten der Materialien',
  ],
  Spahnharrenstätte: [
    'Betriebliche Reinigung nach nutzbaren Bereichen aufteilen.',
    'Für eine gewerbliche Anfrage aus Spahnharrenstätte hilft eine Übersicht der Bereiche, die tatsächlich freigegeben werden können. Freie Bodenflächen, Lagerzonen und Arbeitsplätze stellen unterschiedliche Anforderungen. Teilen Sie uns mit, welche Abläufe während des Termins weiterlaufen sollen. Wir betrachten dann eine mögliche Aufteilung und klären den Zugang. Zusätzliche technische Aufgaben werden ausdrücklich abgegrenzt, damit aus einer allgemeinen Flächenreinigung kein unklarer Auftrag an Anlagen entsteht.',
    'gewerbe',
    'freigegebene Flächen und weiterlaufende betriebliche Abläufe',
  ],
  Lähden: [
    'Eine veränderte Nutzung mit passenden Schritten vorbereiten.',
    'Wenn Räume in Lähden anders genutzt werden sollen, sind bestehender Zustand und künftiger Alltag zwei getrennte Fragen. Eine einmalige Reinigung kann andere Aufgaben enthalten als die spätere laufende Pflege. Beschreiben Sie beide Ziele, sofern sie schon feststehen. Wir besprechen, welche Reihenfolge sinnvoll erscheint und welche Arbeiten noch Einfluss auf den Termin haben. So bleibt der Übergang übersichtlich, ohne laufende und einmalige Leistungen miteinander zu vermischen.',
    'wechsel',
    'die künftige Nutzung und noch ausstehende vorbereitende Arbeiten',
  ],
  Renkenberge: [
    'Auch überschaubare Aufgaben klar vereinbaren.',
    'Für eine Anfrage aus Renkenberge genügt zum Einstieg eine konkrete Beschreibung der betroffenen Räume oder Flächen. Kleine Aufträge brauchen ebenso klare Absprachen über Zugang, Umfang und gewünschtes Ergebnis. Nennen Sie deshalb die Aufgaben, die Ihnen besonders wichtig sind, und bekannte empfindliche Gegenstände. Wir klären offene Fragen gemeinsam. Weitere Leistungen können später ergänzt werden, ohne dass die erste Anfrage bereits einen vollständigen Auftrag für das ganze Gebäude voraussetzt.',
    'privat',
    'die ausgewählten Einzelflächen und empfindliche Einrichtungsgegenstände',
  ],
  Werpeloh: [
    'Für gemeinsam genutzte Gebäude einen klaren Ablauf finden.',
    'Wenn mehrere Personen ein Objekt in Werpeloh nutzen, sollte die Reinigung mit den gemeinsamen Regeln abgestimmt sein. Wer ermöglicht den Zugang und bündelt Rückmeldungen? Welche Bereiche gehören zur regelmäßigen Pflege, welche werden nur bei Bedarf einbezogen? Wir besprechen diese Punkte zusammen mit dem gewünschten Umfang. Eine feste Ansprechperson erleichtert Änderungen und sorgt dafür, dass zusätzliche Wünsche vor der Ausführung nachvollziehbar vereinbart werden können.',
    'verwaltung',
    'Hausregeln und die Organisation von Zugang und Rückmeldungen',
  ],
  Saterland: [
    'Am Standort beginnt eine gute Planung.',
    'Unser Ausgangspunkt liegt in der Eschstraße 70. Für ein Objekt in Ramsloh, Scharrel, Sedelsberg oder Strücklingen können wir die einzelnen Aufgaben gemeinsam betrachten: vom Eingangsbereich über Fenster bis zu regelmäßig genutzten Arbeitsräumen. Entscheidend ist nicht nur die Nähe, sondern ein klarer Umfang. Wenn mehrere Reinigungsbereiche anstehen, nennen Sie diese zusammen, damit die Reihenfolge von Anfang an sinnvoll geplant werden kann.',
    'gemischt',
    'die genaue Lage und den Zugang zu den einzelnen Gebäudeteilen',
  ],
  Barßel: [
    'Ein gepflegter Empfang – drinnen wie draußen.',
    'Für Ihr Objekt in Barßel lohnt sich ein Blick auf die Übergänge zwischen Außenbereich und Innenräumen. Was gelangt über Eingänge hinein, welche Glasflächen prägen den ersten Eindruck und welche Böden werden besonders häufig genutzt? Wir trennen regelmäßige Pflege von einzelnen intensiven Arbeiten. So lässt sich beispielsweise eine laufende Raumreinigung mit einem gesondert geplanten Fenstertermin verbinden, ohne unterschiedliche Aufgaben im Angebot zu vermischen.',
    'eingang',
    'die Eingänge, Laufwege und frei erreichbaren Fensterflächen',
  ],
  Ostrhauderfehn: [
    'Reinigung nach Ihrem Tagesablauf planen.',
    'Wenn eine Reinigung in Ostrhauderfehn Ihren Alltag erleichtern soll, muss das Zeitfenster passen. Ein Privathaus mit Arbeit im Homeoffice stellt andere Anforderungen als ein tagsüber geöffnetes Büro. Beschreiben Sie uns, wann welche Räume frei sind und welche Aufgaben besonders wichtig sind. Daraus können wir eine sinnvolle Reihenfolge entwickeln. Auch bei einer einmaligen Reinigung ist ein kurzer Plan hilfreicher als eine allgemeine Zusage für das ganze Gebäude.',
    'zeit',
    'mögliche Ruhezeiten und die Nutzung der Räume während des Einsatzes',
  ],
  Rhauderfehn: [
    'Mehrere Aufgaben in einer Anfrage zusammenführen.',
    'Für eine Reinigung in Rhauderfehn können Sie Fenster, Böden und weitere Flächen gemeinsam anfragen. Wichtig ist, die gewünschten Arbeiten einzeln zu benennen. Eine Glasreinigung und eine intensive Bodenbehandlung brauchen möglicherweise unterschiedliche Voraussetzungen oder Termine. Wir prüfen den Zusammenhang und besprechen, welche Aufgaben sich verbinden lassen. Sie behalten einen Ansprechpartner, während der Leistungsumfang übersichtlich bleibt und jeder Bereich nach seinem tatsächlichen Bedarf betrachtet wird.',
    'gemischt',
    'die Priorität und gewünschte Reihenfolge der einzelnen Aufgaben',
  ],
  Friesoythe: [
    'Gewerbliche Flächen mit ihrem Betrieb zusammendenken.',
    'Bei einem Auftrag in Friesoythe kann die Abstimmung mit laufenden Arbeitsprozessen den entscheidenden Unterschied machen. Für eine Halle, Werkstatt oder ein Büro interessiert uns deshalb, welche Flächen frei zugänglich sind und wann dort gearbeitet wird. Verkehrswege und Arbeitszonen sollten nicht pauschal als eine Fläche behandelt werden. Eine gegliederte Beschreibung hilft, den Aufwand realistisch zu planen und Unterbrechungen für Mitarbeitende oder Besucher möglichst geordnet zu halten.',
    'gewerbe',
    'Betriebszeiten sowie freigegebene Lager- und Arbeitsbereiche',
  ],
  Apen: [
    'Fenster und Innenräume als getrennte Aufgaben erfassen.',
    'Eine Anfrage für Apen lässt sich leichter beurteilen, wenn Sie die Glasflächen und die übrigen Räume getrennt beschreiben. Bei Fenstern zählen Anzahl, Höhe und Erreichbarkeit; bei Innenräumen kommen Bodenart und Möblierung hinzu. Die Flächengröße allein sagt noch nicht, wie viel Arbeit nötig ist. Nennen Sie daher lieber konkrete Bereiche und erkennbare Besonderheiten. Gemeinsam klären wir anschließend, welche Reinigung zuerst sinnvoll ist und wie sich die Termine verbinden lassen.',
    'fenster',
    'Innen- und Außenseiten sowie die Bewegungsfreiheit vor den Fenstern',
  ],
  Detern: [
    'Kleine Objekte verdienen einen präzisen Umfang.',
    'Auch bei einem überschaubaren Objekt in Detern lohnt sich eine klare Aufgabenliste. Soll der gesamte Raum gepflegt werden oder vor allem ein bestimmter Bereich? Gehören Rahmen zur Fensterreinigung und sind Nebenräume einbezogen? Solche Angaben verhindern, dass aus unterschiedlichen Vorstellungen ein unklarer Auftrag entsteht. Für den Einstieg reichen wenige Sätze. Wir ergänzen die offenen Punkte gemeinsam und planen den Einsatz passend zur tatsächlichen Nutzung.',
    'privat',
    'die konkret gewünschten Räume und die Grenzen des Auftrags',
  ],
  Filsum: [
    'Mit wenigen Angaben zu einer belastbaren Einschätzung.',
    'Für Ihren Einsatz in Filsum müssen nicht sofort alle Maße feststehen. Hilfreicher als eine vermeintlich genaue Zahl sind zunächst Objektart, Nutzung und ein ehrlicher Eindruck vom Zustand. Beschreiben Sie uns, welche Flächen täglich belastet werden und wo es besondere Rückstände gibt. So können wir laufende Pflege und einmalige Intensivreinigung unterscheiden. Wenn eine Besichtigung nötig ist, dient sie dazu, diese Fragen gezielt am Objekt zu klären.',
    'zustand',
    'bekannte Beläge und bisherige Reinigungsversuche',
  ],
  Uplengen: [
    'Den konkreten Einsatzort früh benennen.',
    'Bei einer Anfrage aus Uplengen hilft die genaue Ortsangabe innerhalb der Gemeinde bei der Planung. Die Entfernung in unserer Übersicht ist eine Orientierung zum Ort und keine Berechnung Ihrer Anfahrt. Nennen Sie deshalb Postleitzahl und Lage des Objekts sowie die gewünschten Flächen. Wenn mehrere Gebäude betreut werden sollen, ist eine getrennte Übersicht sinnvoll. Anschließend prüfen wir, wie Zugang, Zeitfenster und Arbeitsumfang zusammenpassen.',
    'mehrere',
    'die Adressen und Ansprechpartner der einzelnen Objekte',
  ],
  Westoverledingen: [
    'Gemeinschaftsflächen übersichtlich organisieren.',
    'Für ein verwaltetes Objekt in Westoverledingen kann eine klare Trennung von Gemeinschaftsflächen und privaten Bereichen hilfreich sein. Eingang, Treppen, Podeste und Nebenräume werden einzeln erfasst. Wir besprechen, wer den Zugang ermöglicht und welche Hausregeln berücksichtigt werden müssen. So wissen Eigentümer und Bewohner, welche Aufgaben vereinbart sind. Auch einzelne Glasflächen oder eine ergänzende Grundreinigung können aufgenommen werden, wenn sie ausdrücklich im Umfang stehen.',
    'verwaltung',
    'Aufgänge, Etagen und gemeinsam genutzte Nebenräume',
  ],
  Papenburg: [
    'Vom Kundenbereich bis zur Arbeitsfläche planen.',
    'Eine Reinigung für Papenburg kann unterschiedliche Bereiche eines Betriebs verbinden. Im Empfang zählt die gepflegte Wirkung, auf Arbeitsflächen die passende Pflege und in Nebenräumen ein verlässlicher Ablauf. Diese Ziele werden nicht einfach mit derselben Behandlung erreicht. Teilen Sie uns die Nutzung der einzelnen Zonen mit. Wir besprechen, welche Aufgaben regelmäßig anfallen und welche besser als gesonderter Einsatz geplant werden, beispielsweise Glasflächen oder besonders beanspruchte Bodenbereiche.',
    'gewerbe',
    'Kundenverkehr und sensible Arbeitsplätze',
  ],
  Leer: [
    'Klare Absprachen für genutzte und zugängliche Räume.',
    'In einem Objekt in Leer können während der Reinigung Menschen arbeiten, wohnen oder Besucher empfangen. Die Planung sollte diese Nutzung berücksichtigen. Nennen Sie uns, welche Räume zuerst frei werden und wo besondere Rücksicht nötig ist. Für Büros, Praxisflächen oder private Räume entstehen daraus unterschiedliche Abläufe. Ein gemeinsames Zeitfenster ist nur dann sinnvoll, wenn auch Zugang und Materialbehandlung dazu passen. Diese Punkte klären wir vor der verbindlichen Zusage.',
    'zeit',
    'Öffnungs- und Ruhezeiten sowie vertrauliche Bereiche',
  ],
  Moormerland: [
    'Regelmäßige Pflege nach tatsächlichem Bedarf.',
    'Für Ihr Objekt in Moormerland muss der Reinigungsrhythmus zur Nutzung passen. Ein wenig genutzter Raum braucht möglicherweise andere Intervalle als ein Eingang oder eine gemeinsame Küche. Beschreiben Sie uns die Belastung der wichtigsten Bereiche und Ihre Prioritäten. So lässt sich ein Plan aufstellen, der einzelne Aufgaben nachvollziehbar zuordnet. Wenn sich die Nutzung später verändert, können gerade diese Bereiche neu besprochen werden, ohne jede Leistung pauschal auszuweiten.',
    'rhythmus',
    'stark genutzte Zonen und saisonale Änderungen',
  ],
  Hesel: [
    'Eine gezielte Reinigung vor der nächsten Nutzung.',
    'Wenn Räume in Hesel neu genutzt oder nach einer Pause wieder geöffnet werden sollen, hilft eine Bestandsaufnahme. Welche Flächen brauchen nur Pflege und wo sitzen Rückstände fest? Sind bereits Möbel aufgestellt oder steht das Objekt noch leer? Die Antworten beeinflussen Reihenfolge und Aufwand. Wir betrachten die gewünschte Nutzung und klären anschließend, ob eine Grundreinigung, Fensterpflege oder eine Kombination verschiedener Leistungen für Ihr Vorhaben passend ist.',
    'wechsel',
    'den geplanten Nutzungsbeginn und vorhandene Möblierung',
  ],
  Großefehn: [
    'Außen- und Innenarbeiten richtig aufeinander abstimmen.',
    'Bei einem Objekt in Großefehn können Innenreinigung und Arbeiten an Außenflächen unterschiedliche Terminbedingungen haben. Für die Räume ist die Verfügbarkeit entscheidend, für höher gelegene Flächen zusätzlich die sichere Erreichbarkeit und das Wetter. Nennen Sie uns beide Bereiche getrennt, wenn Sie mehrere Aufgaben anfragen. Wir prüfen, welche Vorbereitungen erforderlich sind und ob die Leistungen gemeinsam oder nacheinander geplant werden sollten. Eine zeitliche Abstimmung ersetzt dabei keine Materialprüfung.',
    'aussen',
    'Höhe, Zugang und die geschützte Umgebung der Außenflächen',
  ],
  Wiesmoor: [
    'Gepflegte Textilien mit ausreichender Trocknungszeit.',
    'Für Wartebereiche, Besprechungsräume oder das eigene Wohnzimmer in Wiesmoor kann eine Textilreinigung interessant sein. Vor der Planung zählen Material, Zustand und die Zeit, in der Polster oder Teppiche nicht genutzt werden müssen. Teilen Sie bekannte Flecken und frühere Behandlungen mit. So lässt sich die passende Einschätzung vorbereiten. Wenn außerdem Böden oder Fenster gereinigt werden sollen, besprechen wir die Reihenfolge, damit frisch behandelte Bereiche anschließend in Ruhe trocknen können.',
    'textil',
    'Materialetiketten, Fleckenursache und Belüftungsmöglichkeiten',
  ],
  Westerstede: [
    'Räume für Besucher mit Sorgfalt vorbereiten.',
    'Für ein Büro, eine Praxis oder einen anderen Besucherbereich in Westerstede sind Empfang, Laufwege und Sanitärflächen oft besonders sichtbar. Dennoch sollte der Umfang nicht allein nach dem ersten Eindruck festgelegt werden. Wir fragen auch nach Nebenräumen, empfindlichen Materialien und den Zeiten mit wenig Betrieb. Daraus lässt sich eine Pflege entwickeln, die die vereinbarten Bereiche berücksichtigt. Besondere Hygienevorgaben werden ausdrücklich angesprochen und nicht stillschweigend aus einer allgemeinen Reinigung abgeleitet.',
    'praxis',
    'betriebliche Hygienevorgaben und die Nutzung des Empfangs',
  ],
  'Bad Zwischenahn': [
    'Ein guter Eindruck beginnt mit passenden Details.',
    'Für Ihr Objekt in Bad Zwischenahn können Glasflächen, Eingang und textile Sitzbereiche gemeinsam den Eindruck prägen. Die Pflege muss dennoch nach Material getrennt geplant werden. Fenster brauchen einen sicheren Zugang, Polster eine passende Behandlung und Böden eine abgestimmte Wiederbenutzung. Beschreiben Sie, welche Bereiche Ihnen wichtig sind und wann sie frei sind. Wir prüfen daraus einen sinnvollen Ablauf, ohne für unterschiedliche Oberflächen pauschal das gleiche Verfahren vorauszusetzen.',
    'textil',
    'Nutzungszeiten der Sitzbereiche und angrenzende Oberflächen',
  ],
  Edewecht: [
    'Nach Renovierung wieder geordnet starten.',
    'Wenn in Edewecht renoviert oder umgebaut wurde, ist der richtige Zeitpunkt für die Reinigung wichtig. Noch laufende Arbeiten können erneut Staub erzeugen, während neue Beläge zunächst aushärten müssen. Nennen Sie uns den tatsächlichen Baufortschritt und die geplante Nutzung der Räume. So lässt sich unterscheiden, ob eine Zwischenreinigung oder eine abschließende Feinreinigung sinnvoll ist. Einzelne Fenster, Sanitärbereiche und empfindliche Bauteile werden dabei ausdrücklich im Umfang erfasst.',
    'bau',
    'laufende Gewerke und Pflegehinweise für neue Materialien',
  ],
  Bösel: [
    'Reinigung nach Fläche und Material beurteilen.',
    'Für eine Reinigungsanfrage aus Bösel betrachten wir den Zustand der Flächen ebenso wie ihre Größe. Zwei gleich große Räume können durch Belag, Möblierung oder Verschmutzung sehr unterschiedlichen Aufwand verursachen. Teilen Sie uns deshalb mit, wo die normale Pflege nicht mehr ausreicht. Wir klären, welche Rückstände vorliegen und ob zusätzliche Informationen oder eine Besichtigung nötig sind. So entsteht eine Einschätzung, die zu Ihrem konkreten Objekt passt.',
    'zustand',
    'empfindliche Beschichtungen und hartnäckige Rückstände',
  ],
  Garrel: [
    'Objektpflege mit einer verständlichen Aufgabenliste.',
    'Für Eigentümer oder Verwaltungen mit einem Objekt in Garrel hilft eine gegliederte Aufstellung: regelmäßige Räume, zeitweise genutzte Bereiche und einzelne Sonderaufgaben. Diese Trennung zeigt, was bei jedem Besuch ansteht und was separat vereinbart werden muss. Wir besprechen außerdem Zugang und Rückmeldung. Wenn mehrere Personen das Gebäude nutzen, ist eine feste Kontaktperson hilfreich, damit Hinweise zum Ergebnis und Änderungen der Nutzung an der richtigen Stelle ankommen.',
    'verwaltung',
    'Zuständigkeiten und die Freigabe gemeinschaftlicher Räume',
  ],
  Cloppenburg: [
    'Laufende Nutzung und größere Flächen koordinieren.',
    'Bei einem gewerblichen Objekt in Cloppenburg kann die Reinigung abschnittsweise sinnvoller sein als ein pauschaler Termin für alles. Nennen Sie uns die Arbeitszonen, mögliche Stillstandszeiten und frei zugängliche Verkehrswege. Wir prüfen, wie sich der gewünschte Umfang in diese Abläufe einordnen lässt. Büroflächen, Hallen und technische Bereiche bleiben dabei getrennte Aufgaben. Sicherheitsrelevante Freigaben und Herstellerhinweise werden vor der Zusage mit den zuständigen Personen geklärt.',
    'gewerbe',
    'Lagerverkehr, freie Zonen und betriebliche Freigaben',
  ],
  Lorup: [
    'Private Räume ohne unnötige Vorbereitung anfragen.',
    'Für Ihr Zuhause in Lorup dürfen Sie mit einer einfachen Beschreibung beginnen. Welche Räume oder Fenster sollen gereinigt werden, was ist Ihnen besonders wichtig und wann wäre der Zugang möglich? Exakte Maße können später ergänzt werden. Wenn Möbel, Pflanzen oder empfindliche Gegenstände im Arbeitsbereich stehen, sprechen wir die Vorbereitung an. So bleibt klar, was Sie vor dem Termin bereitstellen sollten und welche Aufgaben tatsächlich zur Reinigung gehören.',
    'privat',
    'empfindliche Einrichtung und den Zugang zu den Arbeitsflächen',
  ],
  Rastdorf: [
    'Ein übersichtlicher Einstieg für einzelne Aufgaben.',
    'Eine Anfrage aus Rastdorf muss kein großer Auftrag sein, um präzise geplant zu werden. Wenn nur Fenster, ein Teppichbereich oder einzelne Räume betroffen sind, nennen Sie genau diese Bereiche. Wir betrachten Material, Zustand und Erreichbarkeit und klären offene Angaben gemeinsam. Bei einer Kombination mehrerer Leistungen kann sich die Vorbereitung unterscheiden. Ein nachvollziehbarer Umfang hilft Ihnen zu entscheiden, welche Arbeiten jetzt anstehen und was später sinnvoll ergänzt werden kann.',
    'privat',
    'die gewünschten Einzelleistungen und ihre Dringlichkeit',
  ],
  Vrees: [
    'Materialschonende Pflege bewusst auswählen.',
    'Bei einem Objekt in Vrees ist die Materialangabe besonders hilfreich, wenn Sie eine intensive Behandlung wünschen. Ein Holzboden, ein textiler Belag und eine beschichtete Fläche lassen sich nicht gleich reinigen. Nennen Sie bekannte Pflegehinweise und frühere Mittel, soweit sie Ihnen vorliegen. Wir besprechen anschließend, welche Vorgehensweise geprüft werden sollte. Bestehende Schäden oder Abnutzungen werden dabei von Verschmutzungen unterschieden, damit das erwartete Ergebnis realistisch bleibt.',
    'zustand',
    'Herstellerangaben und bekannte empfindliche Stellen',
  ],
  Surwold: [
    'Technische und allgemeine Bereiche sauber trennen.',
    'Für eine Anfrage in Surwold können allgemeine Bodenflächen neben Maschinen oder anderen technischen Einrichtungen liegen. Die räumliche Nähe bedeutet nicht, dass beide zum selben Reinigungsumfang gehören. Beschreiben Sie die gewünschten Bereiche getrennt und nennen Sie die verantwortliche Person im Betrieb. Wir klären Freigabe, Zugang und geeignete Zeitfenster. Wartung, Reparatur und technische Prüfung bleiben von der vereinbarten Reinigung abgegrenzt.',
    'technik',
    'freigegebene Oberflächen und die betrieblichen Zuständigkeiten',
  ],
  Esterwegen: [
    'Nach einer Nutzungsänderung gezielt reinigen.',
    'Ein Wechsel der Nutzung kann in Esterwegen neue Anforderungen an ein Objekt stellen. Vor dem Einzug, nach einer Umgestaltung oder vor der Wiederöffnung sollten die vorhandenen Flächen geprüft werden. Was ist tatsächlich verschmutzt, welche Beläge sind empfindlich und welche Bereiche müssen zuerst nutzbar sein? Diese Informationen helfen, eine Grundreinigung von laufender Pflege zu unterscheiden. Wir besprechen den Ablauf mit Blick auf den geplanten nächsten Schritt.',
    'wechsel',
    'Übergabetermin, Leerstand und neue Nutzung',
  ],
  Bockhorst: [
    'Nähe ersetzt keine klare Leistungsbeschreibung.',
    'Auch für ein Objekt in Bockhorst braucht ein sinnvoller Einsatz mehr als einen freien Termin. Beschreiben Sie uns die betroffenen Räume, den Zustand und die gewünschten Arbeiten. Eine kleine Fläche mit hartnäckigen Rückständen kann andere Vorbereitung benötigen als ein größeres, regelmäßig gepflegtes Objekt. Wir klären den tatsächlichen Bedarf und stimmen den Umfang darauf ab. So bleibt die Anfrage einfach, ohne wichtige Einzelheiten bei der Planung zu überspringen.',
    'zustand',
    'den Unterschied zwischen laufender Pflege und Intensivreinigung',
  ],
  Breddenberg: [
    'Reinigung und Wiederbenutzung gemeinsam planen.',
    'Wenn Räume in Breddenberg kurz nach einer Reinigung wieder gebraucht werden, gehört dieser Zeitpunkt in die Anfrage. Bei Textilien oder bestimmten Bodenverfahren können Trocknungszeiten nötig sein. Auch das Freiräumen und anschließende Wiedereinrichten braucht gegebenenfalls etwas Zeit. Wir besprechen die geplante Nutzung und prüfen, welcher Ablauf dazu passt. Ein gewünschtes Datum ist eine Orientierung; die konkrete Zusage erfolgt erst, wenn die Voraussetzungen und der Arbeitsumfang geklärt sind.',
    'zeit',
    'Trocknungszeiten und den geplanten Zugang nach der Reinigung',
  ],
  Bunde: [
    'Mehrere Gebäudeteile getrennt beschreiben.',
    'Für einen Auftrag in Bunde kann eine Übersicht der Gebäudeteile die Abstimmung erleichtern. Ein Eingang, eine Wohnung und eine Gewerbeeinheit unterscheiden sich auch dann, wenn sie dieselbe Adresse haben. Nennen Sie die jeweils gewünschten Leistungen und die möglichen Zugangszeiten. Wir prüfen, welche Arbeiten sich organisatorisch verbinden lassen. Der Umfang bleibt dabei für jede Einheit erkennbar, damit die spätere Durchführung und Rückmeldung nachvollziehbar sind.',
    'mehrere',
    'Einheiten, Zugänge und unterschiedliche Nutzungszeiten',
  ],
  Weener: [
    'Regelmäßige Betreuung verständlich aufbauen.',
    'Für Ihr Objekt in Weener lohnt sich vor einer laufenden Reinigung eine kurze Bestandsaufnahme. Welche Bereiche werden häufig genutzt, wo gibt es empfindliche Beläge und welche Arbeiten reichen in größeren Abständen? Wir ordnen diese Aufgaben gemeinsam. So entsteht ein Reinigungsrhythmus, der nicht allein von der Gesamtfläche ausgeht. Zusätzliche Glas- oder Grundreinigungen können getrennt eingeplant werden, während die regelmäßige Pflege übersichtlich bleibt.',
    'rhythmus',
    'wiederkehrende Aufgaben und separat gewünschte Arbeiten',
  ],
  'Rhede (Ems)': [
    'Objekt und Zugang vor der Anfahrt klären.',
    'Bei einer Anfrage für Rhede (Ems) hilft eine genaue Beschreibung der Lage und Zufahrt. Die Luftlinienentfernung sagt noch nichts über den tatsächlichen Weg oder die Erreichbarkeit einzelner Gebäudeseiten aus. Nennen Sie deshalb Zugang, mögliche Arbeitsbereiche und vorhandene Einschränkungen. Wir beziehen diese Punkte in die Planung ein. Bei mehreren Leistungen unterscheiden wir die Voraussetzungen jeweils nach Fläche, damit der Einsatz vor Ort vorbereitet beginnen kann.',
    'aussen',
    'Zufahrt und Erreichbarkeit der einzelnen Gebäudeseiten',
  ],
  Dörpen: [
    'Arbeitsflächen nach Funktion gliedern.',
    'Für gewerblich genutzte Räume in Dörpen ist eine funktionale Beschreibung hilfreich. Welche Zonen dienen als Laufweg, wo wird gelagert und welche Bereiche sind Arbeitsplätze? Diese Einteilung zeigt, welche Reinigung möglich ist, während andere Abläufe weitergehen. Nennen Sie uns außerdem Bodenbeläge und besondere Rückstände. Wir besprechen geeignete Zeitfenster mit einer verantwortlichen Person und trennen technische Anlagen von allgemeinen Flächen, bevor der Umfang festgelegt wird.',
    'gewerbe',
    'Verkehrswege, Lagerzonen und die Bodenbeschaffenheit',
  ],
  Börger: [
    'Eine intensive Reinigung mit klaren Grenzen.',
    'Wenn für Ihr Objekt in Börger eine intensive Reinigung geplant ist, sollten Anlass und gewünschtes Ergebnis zusammen betrachtet werden. Fest sitzender Schmutz, eine bevorstehende Übergabe und eine veränderte Nutzung können unterschiedliche Schwerpunkte setzen. Beschreiben Sie den Zustand möglichst konkret. Wir prüfen, welche Behandlung in Frage kommt und wo materialbedingte Grenzen bestehen. Eine Reinigung ersetzt keine Reparatur, kann aber eine gut vorbereitete Grundlage für die weitere Pflege schaffen.',
    'wechsel',
    'den Anlass der Intensivreinigung und vorhandene Schäden',
  ],
  Werlte: [
    'Planung für größere Flächen beginnt im Detail.',
    'Bei einer Halle oder größeren Gewerbefläche in Werlte sagt die Quadratmeterzahl allein wenig über den Ablauf aus. Zugängliche Flächen, Regale, Maschinen und Verkehrsbewegungen beeinflussen die Arbeit. Wir benötigen deshalb eine Beschreibung der tatsächlich freigegebenen Bereiche. Ein gemeinsamer Rundgang kann offene Fragen klären. Danach lässt sich festlegen, ob eine abschnittsweise Reinigung sinnvoll ist und welche Vorbereitungen Ihr Betrieb vor dem vereinbarten Termin übernimmt.',
    'technik',
    'Stillstandsfenster und die Abgrenzung zu Maschinenwartung',
  ],
  Lathen: [
    'Den gewünschten Umfang vor dem Termin schärfen.',
    'Für einen Einsatz in Lathen hilft eine priorisierte Liste der Aufgaben. Nennen Sie zuerst die Flächen, die unbedingt gereinigt werden sollen, und anschließend mögliche Ergänzungen. So können wir den Aufwand gezielt einschätzen und das Angebot verständlich aufbauen. Wenn der Zeitrahmen eng ist, besprechen wir die Reihenfolge und mögliche Grenzen frühzeitig. Erst nach dieser Abstimmung wird entschieden, welche Arbeiten zu welchem Termin verbindlich eingeplant werden können.',
    'zeit',
    'Prioritäten und zeitliche Rahmenbedingungen des Auftrags',
  ],
  Sögel: [
    'Ein Reinigungsplan für gemeinsam genutzte Räume.',
    'Bei einem Objekt in Sögel mit mehreren Nutzern sind klare Zuständigkeiten besonders hilfreich. Wer ermöglicht den Zugang, welche Räume sind gemeinsam und wo beginnt ein privater Bereich? Wir erfassen diese Grenzen mit Ihnen, bevor die Aufgaben geplant werden. Treppenhäuser, Eingänge und zusätzliche Glasflächen lassen sich gezielt zuordnen. Eine feste Kontaktperson erleichtert Rückmeldungen und sorgt dafür, dass geänderte Nutzungszeiten rechtzeitig in der Planung berücksichtigt werden.',
    'verwaltung',
    'Nutzungsgrenzen und die gemeinsame Kontaktperson',
  ],
  Emden: [
    'Besondere Zugänge rechtzeitig in die Planung aufnehmen.',
    'Für Ihr Objekt in Emden sollten Zugang, Arbeitszeit und gewünschter Umfang früh zusammen betrachtet werden. Gerade wenn Außenflächen oder mehrere Gebäudeteile betroffen sind, reicht eine allgemeine Adresse für die Ablaufplanung nicht immer aus. Beschreiben Sie die Erreichbarkeit und mögliche Einschränkungen. Wir prüfen den Einsatz vom Standort Saterland aus und besprechen, welche Informationen für ein passendes Angebot noch fehlen. Eine Verfügbarkeit wird erst nach dieser Abstimmung zugesagt.',
    'aussen',
    'Gebäudezugang, Außenbereiche und mögliche Wetterabhängigkeit',
  ],
  Aurich: [
    'Am Rand des Umkreises zählt die konkrete Adresse.',
    'Aurich liegt in unserer Übersicht nahe am äußeren Bereich des genannten Umkreises. Für einen möglichen Einsatz ist deshalb die genaue Lage des Objekts entscheidend. Nennen Sie Ortsteil, Postleitzahl und den gewünschten Arbeitsumfang. Wir prüfen daraus die Anfahrt und die Einsatzmöglichkeit, ohne eine pauschale Verfügbarkeit für jede Adresse zu versprechen. Eine gebündelte Beschreibung mehrerer Aufgaben kann helfen, die Planung sinnvoll auf Ihr Vorhaben auszurichten.',
    'mehrere',
    'die genaue Objektlage und einen zusammenhängenden Leistungsumfang',
  ],
  Oldenburg: [
    'Unterschiedliche Räume mit eigenen Anforderungen.',
    'Für ein Büro, eine Wohnung oder eine Praxis in Oldenburg betrachten wir die Aufgaben nach Raumfunktion. Arbeitsplätze brauchen andere Absprachen als Fenster, Sanitärräume oder textile Sitzbereiche. Teilen Sie mit, welche Räume während der Reinigung frei sind und welche Regeln beim Zugang gelten. So lässt sich ein konkreter Umfang vorbereiten. Die Einsatzmöglichkeit wird vom Standort Saterland aus anhand der Adresse geprüft; eine eigene Niederlassung in Oldenburg wird damit nicht bezeichnet.',
    'praxis',
    'Raumnutzung, Hygienevorgaben und Zugangsbeschränkungen',
  ],
  Rastede: [
    'Pflege nach Nutzung statt nach festen Annahmen.',
    'Für eine regelmäßige Reinigung in Rastede ist der tatsächliche Bedarf der beste Ausgangspunkt. Ein Objekt kann ruhige Nebenräume und stark genutzte Eingänge zugleich haben. Wir besprechen diese Unterschiede und ordnen ihnen passende Aufgaben zu. Nennen Sie uns bekannte saisonale Änderungen und besondere Materialien. Dadurch bleibt der Reinigungsplan verständlich und kann angepasst werden, wenn sich Nutzung oder gewünschter Umfang verändern. Eine einzelne Intensivreinigung lässt sich davon klar abgrenzen.',
    'rhythmus',
    'die unterschiedlich belasteten Bereiche Ihres Objekts',
  ],
  Wiefelstede: [
    'Fensterpflege mit Blick auf Rahmen und Umgebung.',
    'Für eine Fensterreinigung in Wiefelstede sind nicht nur die Glasflächen wichtig. Rahmen, Falze, Öffnungsart und die Einrichtung davor beeinflussen den Auftrag. Nennen Sie uns, welche Teile gereinigt werden sollen und ob Außenflächen sicher erreichbar sind. Auch feststehende Elemente oder Wintergartenbereiche brauchen eine gesonderte Einschätzung. So kann die Planung zwischen frei zugänglichen Standardflächen und besonderen Anforderungen unterscheiden, bevor ein Angebot und ein Termin abgestimmt werden.',
    'fenster',
    'Rahmen, Falze und die sichere Zugänglichkeit',
  ],
  Hatten: [
    'Privates Wohnen und Reinigungszeit miteinander verbinden.',
    'Für ein Privathaus in Hatten soll die Reinigung in den Alltag passen. Besprechen Sie mit uns, welche Räume frei werden können und welche Gegenstände besondere Rücksicht verlangen. Bei Polstern oder Teppichen gehört eine mögliche Trocknungsphase in die Planung. Für Fenster wiederum sollten Öffnungsbereiche erreichbar sein. Diese kleinen Vorbereitungen helfen, unterschiedliche Leistungen geordnet auszuführen. Die konkrete Einsatzmöglichkeit prüfen wir anhand Ihrer Adresse und des gewünschten Umfangs.',
    'privat',
    'Einrichtung, Raumfreigabe und gewünschte Wiederbenutzung',
  ],
  Bockhorn: [
    'Außenflächen nicht ohne Materialangaben anfragen.',
    'Bei Dach- oder anderen Außenflächen in Bockhorn sind Material, Zustand und Höhe die ersten Fragen. Sichtbare Ablagerungen sagen allein noch nicht, welches Verfahren geeignet ist. Bitte nennen Sie bekannte Herstellerhinweise und bereits vorhandene Schäden. Wir prüfen Zugang und Vorbereitung, bevor eine Vorgehensweise zugesagt wird. Wenn zugleich Innenräume gereinigt werden sollen, planen wir diese als eigene Aufgabe mit ihren jeweiligen Voraussetzungen und Zeitfenstern.',
    'aussen',
    'Baustoffe, Alter der Flächen und Wasserführung',
  ],
  Zetel: [
    'Technische Pflege braucht eine klare Freigabe.',
    'Für eine Anlage oder ein gewerblich genutztes Objekt in Zetel müssen freigegebene Bereiche eindeutig sein. Allgemeine Bodenflächen können anders behandelt werden als technische Komponenten. Nennen Sie den Zweck der Reinigung und die zuständige Person im Betrieb. Wir besprechen Herstellerhinweise, mögliche Stillstandszeiten und den Zugang. Eine Reinigung umfasst weder eine technische Prüfung noch eine Reparatur. Diese Abgrenzung schafft eine realistische Grundlage für das gemeinsame Angebot.',
    'technik',
    'Herstellervorgaben und die Freigabe technischer Bereiche',
  ],
  Varel: [
    'Vor einer Wiederöffnung das gesamte Objekt betrachten.',
    'Wenn ein Objekt in Varel nach Umbau oder längerer Pause wieder genutzt werden soll, hilft eine Reihenfolge nach Dringlichkeit. Welche Räume werden zuerst benötigt und welche Oberflächen brauchen besondere Pflege? Beschreiben Sie den aktuellen Zustand und noch laufende Arbeiten. So können wir eine passende Reinigung prüfen, ohne eine fertige Fläche später erneut unnötig zu belasten. Außenarbeiten und technische Bereiche werden dabei gesondert beurteilt und nur nach Abstimmung einbezogen.',
    'bau',
    'Fertigstellungsstand und die Reihenfolge der Raumfreigaben',
  ],
  Nortmoor: [
    'Ein überschaubarer Auftrag mit klarer Vorbereitung.',
    'Für eine Anfrage aus Nortmoor sind konkrete Angaben zu wenigen Flächen oft hilfreicher als eine lange allgemeine Beschreibung. Benennen Sie die gewünschten Räume oder Fenster, ihren Zustand und den möglichen Zugang. Wenn Sie das Material nicht kennen, sagen Sie dies offen. Wir klären die passende Einschätzung gemeinsam. So entsteht ein Auftrag, dessen Umfang nachvollziehbar bleibt und der bei Bedarf um weitere abgestimmte Aufgaben ergänzt werden kann.',
    'privat',
    'einzelne Flächen und noch offene Materialfragen',
  ],
  Brinkum: [
    'Saubere Übergänge zwischen Eingang und Innenraum.',
    'Für ein Objekt in Brinkum können Eingang und anschließende Laufwege ein sinnvoller Schwerpunkt sein. Diese Bereiche verbinden Außenbelastung mit der täglichen Nutzung des Gebäudes. Nennen Sie uns Beläge, Möblierung und gewünschte Reinigungsintervalle. Zusätzliche Glasflächen oder Nebenräume werden getrennt erfasst. Wir besprechen, welche Aufgaben regelmäßig wichtig sind und welche nur gelegentlich anfallen, damit aus dem ersten Eindruck ein klar gegliederter Pflegeplan wird.',
    'eingang',
    'Türbereiche, Laufwege und angrenzende Bodenbeläge',
  ],
  Holtland: [
    'Rückmeldungen bei gemeinsamer Nutzung einfach halten.',
    'Bei einem gemeinschaftlich genutzten Objekt in Holtland hilft es, die Abstimmung über eine feste Person zu führen. Sie bündelt Hinweise zu Zugang, besonderen Flächen und Änderungen im Haus. Wir legen mit Ihnen fest, welche Bereiche zum vereinbarten Umfang gehören. So können einzelne Rückmeldungen gezielt geprüft werden, ohne den gesamten Auftrag unklar zu verändern. Auch ergänzende Fenster- oder Grundreinigungen lassen sich auf dieser Basis nachvollziehbar planen.',
    'verwaltung',
    'Ansprechpartner und Hinweise der Gebäudenutzer',
  ],
  Firrel: [
    'Pflege im passenden Abstand organisieren.',
    'Für Räume in Firrel mit unterschiedlicher Nutzung muss nicht jede Aufgabe im selben Rhythmus stattfinden. Manche Flächen werden häufig beansprucht, andere nur gelegentlich. Beschreiben Sie die Nutzung und nennen Sie die Bereiche, die Ihnen besonders wichtig sind. Wir prüfen, wie regelmäßige Pflege und einzelne Intensivarbeiten voneinander abgegrenzt werden können. Ein solcher Plan schafft Orientierung und erleichtert Anpassungen, wenn sich Ihre Anforderungen später ändern.',
    'rhythmus',
    'häufig genutzte Bereiche und selten benötigte Nebenräume',
  ],
  Schwerinsdorf: [
    'Textile Flächen mit Blick auf Material und Zeit.',
    'Wenn für Ihr Objekt in Schwerinsdorf Polster oder Teppiche gereinigt werden sollen, helfen Materialangaben und eine Beschreibung bekannter Flecken. Nennen Sie außerdem, wann die Fläche anschließend wieder gebraucht wird. Die mögliche Trocknung ist Teil der Planung. Andere Aufgaben, etwa Fenster oder Böden, können gemeinsam angefragt werden, brauchen aber eine eigene Einschätzung. So bleiben Verfahren, Vorbereitung und erwartbares Ergebnis für jede Oberfläche nachvollziehbar.',
    'textil',
    'Gewebe, Flecken und den vorgesehenen Zeitraum zur Trocknung',
  ],
  Neukamperfehn: [
    'Nach Veränderungen eine neue Grundlage schaffen.',
    'Wenn sich die Nutzung Ihrer Räume in Neukamperfehn ändert, ist ein neuer Blick auf die Reinigung sinnvoll. Ein bisher wenig genutzter Bereich kann künftig mehr Pflege benötigen, während andere Aufgaben seltener anfallen. Teilen Sie uns den geplanten Ablauf mit. Wir betrachten den aktuellen Zustand und unterscheiden einmalige Vorbereitung von anschließender Unterhaltsreinigung. So lässt sich ein Übergang planen, der zu Ihrem nächsten Nutzungsschritt passt.',
    'wechsel',
    'die bisherige Nutzung und die künftig gewünschten Abläufe',
  ],
  Jemgum: [
    'Die Anfahrt mit einem gut beschriebenen Auftrag verbinden.',
    'Für einen Einsatz in Jemgum sind Objektlage und Umfang wichtige Planungsangaben. Die gezeigte Luftlinie ist keine Fahrstrecke; die tatsächliche Verbindung und der Zugang werden anhand Ihrer Adresse geprüft. Beschreiben Sie außerdem, welche Flächen zusammen gereinigt werden sollen. Wenn mehrere Aufgaben anstehen, können wir deren Voraussetzungen gemeinsam betrachten und eine sinnvolle Reihenfolge besprechen, bevor ein Termin verbindlich vereinbart wird.',
    'mehrere',
    'Objektadresse, Zufahrt und die gemeinsam gewünschten Aufgaben',
  ],
  Emstek: [
    'Gewerbliche Reinigung mit abgestimmten Verantwortlichkeiten.',
    'Für einen Betrieb in Emstek sollten Reinigung, technische Freigabe und laufende Arbeit klar voneinander abgegrenzt sein. Nennen Sie uns die betroffenen Zonen und die verantwortliche Kontaktperson. Wir besprechen mögliche Arbeitszeiten, Bodenarten und vorhandene Rückstände. Eine Halle oder Anlage wird nicht allein nach Quadratmetern beurteilt. Erst wenn Zugang und erlaubte Tätigkeiten feststehen, lässt sich ein nachvollziehbarer Umfang für Ihren konkreten Einsatz vorbereiten.',
    'technik',
    'die verantwortliche Freigabe und betriebliche Arbeitszeiten',
  ],
  Cappeln: [
    'Vor der Übergabe die letzten Arbeiten berücksichtigen.',
    'Für eine Reinigung in Cappeln nach Bau- oder Renovierungsarbeiten zählt der tatsächliche Fertigstellungsstand. Sind die staubintensiven Arbeiten abgeschlossen und neue Oberflächen bereits freigegeben? Nennen Sie uns diese Informationen gemeinsam mit der geplanten Übergabe. Wir prüfen, ob eine Feinreinigung oder zunächst ein anderer Abschnitt sinnvoll ist. Möbel, Glasflächen und besondere Rückstände werden gezielt in den Umfang aufgenommen, statt eine pauschale Reinigung aller Bereiche vorauszusetzen.',
    'bau',
    'Fertigstellung, Aushärtungszeiten und den geplanten Übergabetermin',
  ],
};
const planning = {
  gemischt: [
    'Mehrere Leistungen sinnvoll verbinden',
    'Wenn verschiedene Aufgaben zusammenkommen, trennen wir zunächst die Materialien und die dafür nötigen Vorbereitungen. Fensterflächen, Böden und Textilien können nicht mit derselben Behandlung beurteilt werden. Für Ihr Angebot entsteht deshalb eine nachvollziehbare Gliederung. Beschreiben Sie, welche Arbeiten gleichzeitig gewünscht sind und welche später erfolgen dürfen. Eine passende Reihenfolge kann dabei helfen, frisch gereinigte Bereiche nicht unmittelbar wieder zu belasten. Ob sich die Aufgaben an einem Termin verbinden lassen, klären wir nach Prüfung des Objekts.',
  ],
  eingang: [
    'Eingänge und Laufwege bewusst einplanen',
    'Besonders an Übergängen zwischen draußen und drinnen zeigt sich, wie ein Gebäude genutzt wird. Schmutzfangbereiche, Türen, Glas und die anschließenden Böden bilden unterschiedliche Aufgaben. Wir erfassen diese Bereiche getrennt, damit der Umfang verständlich bleibt. Teilen Sie mit, ob der Eingang während der Reinigung weiter genutzt werden muss. Bei nassen Verfahren berücksichtigen wir die sichere Wiederbenutzung. Zusätzliche Arbeiten an schwer erreichbaren Flächen werden vorab geprüft und nicht als automatische Nebenleistung einer gewöhnlichen Reinigung verstanden.',
  ],
  zeit: [
    'Zeitfenster und Wiederbenutzung abstimmen',
    'Für eine geeignete Terminplanung sind Startzeit und spätere Nutzung gleichermaßen wichtig. Manche Verfahren verlangen Zeit zum Trocknen, andere setzen frei zugängliche Räume voraus. Nennen Sie uns feste Termine, Ruhezeiten und Bereiche, die während des Einsatzes weiter genutzt werden. Wir prüfen, ob eine andere Reihenfolge oder eine Aufteilung sinnvoll ist. Ein eingetragenes Wunschdatum dient dabei der Orientierung. Eine verbindliche Zusage folgt erst, wenn Umfang, Zugang und die erforderlichen Voraussetzungen miteinander abgestimmt sind.',
  ],
  gewerbe: [
    'Reinigung in betriebliche Abläufe einordnen',
    'In einem Betrieb werden unterschiedliche Flächen häufig gleichzeitig genutzt. Ein freier Laufweg und ein belegter Arbeitsplatz stellen deshalb nicht dieselben Bedingungen. Wir besprechen die verfügbaren Zonen mit einer verantwortlichen Person und prüfen mögliche Arbeitsabschnitte. Herstellerhinweise und interne Regeln gehören zur Vorbereitung. Waren, Unterlagen und technische Einrichtungen werden nicht ohne ausdrückliche Vereinbarung bewegt oder bearbeitet. Ein klar abgegrenzter Umfang erleichtert es, die Reinigung im Alltag zu koordinieren und Änderungen der Nutzung rechtzeitig zu berücksichtigen.',
  ],
  fenster: [
    'Glasflächen vollständig beschreiben',
    'Bei Fenstern hilft eine ungefähre Anzahl zusammen mit Angaben zu Größe, Öffnungsart und Stockwerk. Rahmen, Falze und Fensterbänke werden ausdrücklich in den gewünschten Umfang aufgenommen. Innen sollten die Arbeitsbereiche erreichbar sein; für Außenseiten prüfen wir die sichere Durchführung. Festverglasungen oder Flächen über einem Anbau benötigen eine eigene Einschätzung. Bekannte Beschichtungen und Vorschäden sollten vor Beginn angesprochen werden. So lassen sich gewöhnliche Pflege, besondere Rückstände und mögliche Materialgrenzen im Angebot sinnvoll unterscheiden.',
  ],
  privat: [
    'Die Vorbereitung im Zuhause einfach halten',
    'Eine private Anfrage beginnt mit Ihren Wünschen und der tatsächlichen Nutzung der Räume. Sie müssen kein fertiges Leistungsverzeichnis erstellen. Benennen Sie die Bereiche, die gereinigt werden sollen, und sagen Sie uns, wo Sie unsicher sind. Wir klären anschließend, welche Gegenstände freigeräumt werden sollten und welche Materialien besondere Pflege benötigen. Persönliche Unterlagen und sensible Gegenstände gehören nicht in den Reinigungsumfang. Nach der Abstimmung wissen Sie, welche Aufgaben geplant sind und welche Vorbereitungen vor dem Termin hilfreich werden.',
  ],
  zustand: [
    'Zustand vor Verfahren prüfen',
    'Für eine intensivere Reinigung ist es sinnvoll, Verschmutzung und Materialschäden auseinanderzuhalten. Ein Fleck kann aus entfernbaren Rückständen bestehen, aber auch eine dauerhafte Verfärbung sein. Beschreiben Sie bekannte Ursachen und frühere Behandlungen. Wir besprechen, welche Angaben für die Einschätzung noch fehlen und ob eine Probefläche erforderlich sein kann. Das passende Vorgehen wird am Objekt ausgerichtet. Eine pauschale Zusage für eine neuwertige Optik wäre ohne Kenntnis des Zustands keine belastbare Grundlage für Ihren Auftrag.',
  ],
  mehrere: [
    'Mehrere Objekte übersichtlich zuordnen',
    'Wenn verschiedene Einheiten oder Adressen betroffen sind, hilft eine kurze Übersicht mit Aufgaben und Zugängen je Objekt. Ein gemeinsamer Ansprechpartner vereinfacht die Abstimmung, ersetzt aber nicht die einzelnen Informationen. Wir prüfen, welche Leistungen gebündelt werden können und wo getrennte Zeitfenster nötig sind. Unterschiedliche Materialien und Nutzungen bleiben im Umfang erkennbar. So lässt sich später nachvollziehen, welche Arbeiten an welchem Standort vereinbart wurden und an wen Hinweise oder Rückfragen zu richten sind.',
  ],
  verwaltung: [
    'Gemeinschaftsflächen eindeutig abgrenzen',
    'Bei verwalteten Gebäuden ist die Grenze zwischen gemeinsamer und privater Nutzung ein wichtiger Ausgangspunkt. Eingang, Aufgänge, Podeste und Nebenräume werden einzeln erfasst. Dazu kommen Hausregeln und die Frage, wer den Zugang ermöglicht. Persönliche Gegenstände werden nicht ohne Absprache umgeräumt. Eine feste Kontaktperson bündelt Rückmeldungen und Änderungen. Der vereinbarte Umfang macht sichtbar, welche Aufgaben regelmäßig stattfinden und welche nur als ergänzender Einsatz geplant sind. Damit bleibt der Ablauf für alle Beteiligten nachvollziehbar.',
  ],
  rhythmus: [
    'Reinigungsintervalle nach Belastung wählen',
    'Ein sinnvoller Turnus ergibt sich aus der tatsächlichen Nutzung. Besucheraufkommen, gemeinsame Küchen und häufig genutzte Sanitärbereiche können andere Intervalle benötigen als ein Nebenraum. Wir besprechen Ihre Prioritäten und unterscheiden Aufgaben je Einsatz von Arbeiten in größeren Abständen. Der Plan darf sich verändern, wenn die Nutzung wechselt. Eine gelegentliche Glas- oder Grundreinigung sollte darin gesondert erkennbar bleiben. So ist klar, welche Leistung Sie regelmäßig erwarten können und welche zusätzlichen Schritte vorher abgestimmt werden.',
  ],
  wechsel: [
    'Vorbereitung und laufende Pflege unterscheiden',
    'Eine neue Nutzung kann zunächst einen intensiveren Reinigungsbedarf erzeugen. Danach reicht möglicherweise eine anders aufgebaute regelmäßige Pflege. Wir betrachten beide Phasen getrennt: den bestehenden Zustand und das gewünschte spätere Niveau. Angaben zu Möblierung, Termin und empfindlichen Flächen erleichtern die Einschätzung. Eine Reinigung ersetzt weder eine bauliche Abnahme noch notwendige Reparaturen. Sie kann aber gezielt in den Übergang eingeplant werden, wenn die Voraussetzungen und die Grenzen der Aufgabe vor Beginn klar sind.',
  ],
  aussen: [
    'Außenarbeiten mit ihren Voraussetzungen betrachten',
    'Bei Außenflächen bestimmen Material, Zustand und Erreichbarkeit wesentlich die Planung. Ein Verfahren wird nicht allein aufgrund einer sichtbaren Verschmutzung zugesagt. Herstellerhinweise, vorhandene Schäden und mögliche Wasserführung gehören zur Prüfung. Auch Nachbarflächen und sichere Arbeitsbereiche sind zu berücksichtigen. Wetterbedingungen können den Termin beeinflussen. Nennen Sie deshalb Höhe, Zugang und bekannte Besonderheiten schon in Ihrer Anfrage. Wir besprechen danach, welche Arbeiten unter den gegebenen Bedingungen sinnvoll und sicher eingeplant werden können.',
  ],
  textil: [
    'Textile Pflege mit ausreichender Zeit planen',
    'Polster und Teppiche verlangen eine eigene Einschätzung von Fasern, Farbe und Untergrund. Bekannte Flecken und bereits eingesetzte Mittel sind hilfreiche Informationen. Ein beschädigtes oder ausgeblichenes Gewebe lässt sich durch Reinigung nicht einfach erneuern. Je nach Verfahren muss außerdem eine Trocknungszeit eingeplant werden. Beschreiben Sie die Lüftung und die vorgesehene Wiederbenutzung des Bereichs. Gemeinsam klären wir, welche Vorbereitung notwendig ist und welche Veränderung unter den vorhandenen Bedingungen realistisch erwartet werden kann.',
  ],
  praxis: [
    'Besucherbereiche und sensible Räume unterscheiden',
    'Für Praxis- oder Büroräume zählen Empfang, Arbeitsbereiche und Nebenräume jeweils als eigene Aufgaben. Öffnungszeiten und vertrauliche Unterlagen müssen bei der Planung berücksichtigt werden. Die allgemeine Reinigung ersetzt keine gesondert geregelte Desinfektion oder Aufbereitung medizinischer Instrumente. Vorhandene Hygienevorgaben werden deshalb ausdrücklich besprochen. Nennen Sie uns eine verantwortliche Kontaktperson und die Räume, die freigegeben werden können. Daraus lässt sich ein klarer Umfang entwickeln, ohne aus einer allgemeinen Anfrage unbestätigte Spezialleistungen abzuleiten.',
  ],
  bau: [
    'Baufortschritt vor Feinreinigung prüfen',
    'Eine abschließende Reinigung sollte mit dem tatsächlichen Bauablauf abgestimmt sein. Solange noch staubintensive Arbeiten stattfinden, können bereits gereinigte Bereiche erneut belastet werden. Neue Beläge und Beschichtungen müssen außerdem für die Behandlung freigegeben sein. Wir benötigen deshalb Hinweise auf laufende Gewerke, Aushärtungszeiten und vorhandene Rückstände. Bauschuttentsorgung und unbekannte Stoffe sind gesonderte Themen. Nach der Prüfung kann der Umfang in passende Abschnitte gegliedert werden, damit Reinigung und geplante Übergabe sinnvoll zusammenpassen.',
  ],
  technik: [
    'Reinigung von Wartung und Freigabe abgrenzen',
    'Technische Anlagen verlangen eine genaue Abstimmung mit dem Betrieb. Freigegebene Oberflächen, Herstellerhinweise und Stillstandszeiten bestimmen, welche Arbeiten möglich sind. Eine Reinigung beinhaltet keine Reparatur oder eigenständige technische Wiederinbetriebnahme. Die zuständigen Personen müssen die dafür erforderlichen Voraussetzungen sicherstellen. Auch die Handhabung unbekannter Rückstände wird vorab geklärt. Wir prüfen das beschriebene Ziel und grenzen die Aufgabe so ab, dass erlaubte Tätigkeiten, Zugänge und Verantwortlichkeiten vor dem Einsatz verständlich feststehen.',
  ],
};
const slug = (s) =>
  s
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const focusNotes = [
  'Bei regelmäßig genutzten Innenräumen bietet die Unterhaltsreinigung einen Einstieg. Hier stehen Turnus und klar benannte Aufgaben im Vordergrund; eine einmalige Intensivreinigung wird separat betrachtet.',
  'Für Büro- und Praxisräume zählen Öffnungszeiten und freigegebene Arbeitsflächen. Allgemeine Reinigung und besondere Hygienevorgaben werden getrennt abgestimmt, damit die erwartete Leistung nachvollziehbar bleibt.',
  'Wenn normale Pflege nicht ausreicht, kann eine Grund- oder Sonderreinigung geprüft werden. Beschreiben Sie Rückstände, Material und frühere Behandlungen; sichtbare Abnutzung ist nicht automatisch entfernbarer Schmutz.',
  'Bei einem Treppenhaus helfen Angaben zu Etagen, Podesten und Nebenräumen. Gemeinsame und private Bereiche werden unterschieden, ebenso regelmäßige Aufgaben und einzelne ergänzende Arbeiten.',
  'Für Fenster sind Höhe, Öffnungsart und Erreichbarkeit entscheidend. Rahmen, Falze und Innen- oder Außenseiten sollten ausdrücklich genannt werden, weil die reine Fensterzahl den Aufwand nicht vollständig beschreibt.',
  'Bei Maschinen oder Anlagen beginnt die Planung mit der technischen Freigabe. Verantwortlichkeiten, zugängliche Oberflächen und Herstellerhinweise müssen feststehen; Reparatur und Wiederinbetriebnahme sind eigenständige betriebliche Aufgaben.',
  'In Hallen und auf Gewerbeflächen unterscheiden wir freie Böden, Verkehrswege und Lagerzonen. Eine abschnittsweise Reinigung kann geprüft werden, wenn der Betrieb nicht alle Bereiche zugleich freigeben kann.',
  'Nach Bauarbeiten kommt es auf den tatsächlichen Baufortschritt an. Staubintensive Gewerke, neue Beläge und vorhandene Schutzschichten beeinflussen, wann eine Zwischen- oder Feinreinigung sinnvoll geplant werden kann.',
  'Polster und Teppiche verlangen Angaben zu Fasern, Flecken und früheren Reinigungsversuchen. Berücksichtigen Sie auch die mögliche Trocknung, bevor Sitzmöbel oder Laufbereiche wieder vollständig genutzt werden.',
  'Bei Dach- und Außenflächen werden Zustand, Wasserführung und sicherer Zugang zuerst betrachtet. Die Auswahl eines Verfahrens erfolgt anhand des Materials und schließt vorhandene Schäden in die Beurteilung ein.',
  'Für PV-Module sind Aufstellung, Herstellerhinweise und Erreichbarkeit wichtig. Eine Reinigung beinhaltet keine elektrische Wartung und erlaubt keine allgemeine Zusage für einen bestimmten zusätzlichen Energieertrag.',
];
const priorities = {
  gemischt: [0, 4, 2, 8, 3],
  eingang: [3, 4, 0, 6, 2],
  zeit: [0, 1, 4, 8, 3],
  gewerbe: [6, 5, 1, 0, 7],
  fenster: [4, 2, 1, 3, 0],
  privat: [4, 8, 2, 0, 9],
  zustand: [2, 8, 9, 4, 6],
  verwaltung: [3, 0, 4, 7, 2],
  rhythmus: [0, 1, 3, 4, 6],
  wechsel: [7, 2, 0, 8, 4],
  aussen: [9, 10, 4, 2, 6],
  textil: [8, 0, 2, 1, 4],
  praxis: [1, 0, 8, 4, 2],
  bau: [7, 4, 2, 6, 0],
  technik: [5, 6, 10, 2, 1],
  mehrere: [0, 3, 4, 6, 1],
};
const peersByLens = {};
const focusCombinations = [];
for (let a = 0; a < 5; a++)
  for (let b = a + 1; b < 5; b++) for (let c = b + 1; c < 5; c++) focusCombinations.push([a, b, c]);
const cities = geo.cities
  .filter((c) => c.exactDistanceKm <= 50 && profiles[c.name])
  .map((c, index) => {
    const [summary, intro, lens, access] = profiles[c.name];
    const region = (c.resolvedName.match(/Landkreis ([^,]+)/) || [])[1] || 'Nordwesten';
    const rank = peersByLens[lens] || 0;
    peersByLens[lens] = rank + 1;
    const choices = priorities[lens] || priorities.gemischt;
    const body3 = `Welche Aufgabe in ${c.name} zuerst ansteht, entscheiden Sie anhand Ihres Objekts. Drei mögliche Ansatzpunkte helfen bei der Einordnung. ${focusCombinations[rank % focusCombinations.length].map((i) => focusNotes[choices[i]]).join(' ')} Alle elf Leistungen bleiben über die Auswahl unten erreichbar. Sie können mehrere Aufgaben in einer gemeinsamen Anfrage zusammenführen und anschließend gezielt klären lassen.`;
    const near = geo.cities
      .filter((x) => x.name !== c.name && x.exactDistanceKm <= 50)
      .sort(
        (a, b) =>
          Math.hypot(a.lat - c.lat, a.lon - c.lon) - Math.hypot(b.lat - c.lat, b.lon - c.lon),
      )
      .slice(0, 3)
      .map((x) => x.name);
    const body4 = `${c.name === 'Saterland' ? 'Die Eschstraße 70 ist unser zentraler Ausgangspunkt in Saterland.' : `Von unserer Adresse Eschstraße 70 in Saterland liegt ${c.name} ungefähr ${c.distanceKm} Kilometer Luftlinie entfernt. Das ist eine Orientierung, keine Fahrstrecke oder pauschale Anfahrtsberechnung.`} Wenn Sie zusätzlich ein Objekt in ${near[0]}, ${near[1]} oder ${near[2]} betreuen, können Sie die betreffenden Adressen gemeinsam nennen. Die Einsatzmöglichkeit prüfen wir für jeden Standort einzeln. Beschreiben Sie für Ihr Objekt in ${c.name} insbesondere ${access}. Diese Hinweise erleichtern die erste Einschätzung. Ergänzen Sie eine ungefähre Größe und Ihren Terminwunsch. Nach der Klärung des Umfangs entscheiden Sie über das Angebot; ein verbindlicher Einsatz wird erst anschließend vereinbart.`;
    return {
      ...c,
      slug: slug(c.name),
      summary,
      tags: [lens, region],
      lens,
      access,
      intro,
      sections: [
        { title: `Reinigung in ${c.name}: ${summary.replace(/\.$/, '')}`, body: intro },
        { title: planning[lens][0], body: planning[lens][1] },
        { title: `Die passende Leistung für Ihr Objekt in ${c.name}`, body: body3 },
        { title: 'Anfrage, Zugang und Termin gemeinsam klären', body: body4 },
      ],
      sourceUrls: [c.sourceUrl],
      index,
    };
  })
  .sort((a, b) => a.distanceKm - b.distanceKm);
fs.writeFileSync('src/data/content.json', JSON.stringify({ ...data, cities }, null, 2));
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync(
  'docs/geography-sources.json',
  JSON.stringify(
    {
      origin: geo.origin,
      basis: geo.distanceBasis,
      licence: 'OpenStreetMap contributors, ODbL 1.0; https://www.openstreetmap.org/copyright',
      retrieved: '2026-10-07',
      cities: cities.map(({ name, lat, lon, distanceKm, sourceUrl }) => ({
        name,
        lat,
        lon,
        distanceKm,
        sourceUrl,
      })),
    },
    null,
    2,
  ),
);
console.log(
  'Cities',
  cities.length,
  'Minimum body words',
  Math.min(
    ...cities.map(
      (c) =>
        c.sections
          .map((s) => s.body)
          .join(' ')
          .split(/\s+/).length,
    ),
  ),
);
