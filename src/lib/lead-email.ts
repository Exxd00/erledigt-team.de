const escape = (value: unknown) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
const names: Record<string, string> = {
  beratung: 'Beratung / noch offen',
  unterhaltsreinigung: 'Unterhaltsreinigung',
  'buero-praxisreinigung': 'Büro- & Praxisreinigung',
  'grund-sonderreinigung': 'Grund- & Sonderreinigung',
  treppenhausreinigung: 'Treppenhausreinigung',
  'glas-fensterreinigung': 'Glas- & Fensterreinigung',
  'maschinen-anlagenreinigung': 'Maschinen- & Anlagenreinigung',
  'hallen-gewerbereinigung': 'Hallen- & Gewerbeflächen',
  baustellenreinigung: 'Baustellenreinigung',
  'polster-teppichreinigung': 'Polster- & Teppichreinigung',
  'dach-oberflaechenreinigung': 'Dach- & Oberflächenreinigung',
  'pv-anlagen-reinigung': 'PV-Anlagen-Reinigung',
};
export function renderLeadEmail(lead: Record<string, unknown>, id: string) {
  const callback = lead.request_type === 'callback';
  const reference = id.slice(0, 8).toUpperCase();
  const title = callback ? 'Neuer Rückrufwunsch' : 'Neue Reinigungsanfrage';
  const date = new Date(String(lead.created_at || '')).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const contact: [string, unknown][] = [
    ['Name', lead.name || 'Nicht angegeben'],
    ['Telefon', lead.phone || 'Nicht angegeben'],
    ['E-Mail', lead.email || 'Nicht angegeben'],
  ];
  if (lead.company) contact.push(['Firma', lead.company]);
  const object: [string, unknown][] = callback
    ? []
    : [
        ['Leistung', names[String(lead.service)] || 'Beratung'],
        ['Ort', [lead.postal_code, lead.city].filter(Boolean).join(' ')],
        ['Objekt', lead.property_type],
        ['Umfang', lead.scope || 'Noch offen'],
        ['Rhythmus', lead.frequency],
        ['Wunschtermin', lead.preferred_date || 'Nach Absprache'],
        ['Gewünschter Kontakt', lead.contact_method],
      ];
  const rows = (items: [string, unknown][]) =>
    items
      .map(
        ([label, value]) =>
          `<tr><td style="padding:12px 0;border-bottom:1px solid #d7e5ef;word-break:break-word"><div style="font-size:12px;font-weight:700;letter-spacing:.04em;color:#4a6176;margin-bottom:4px">${escape(label)}</div><div style="font-size:16px;line-height:1.6;color:#06172e">${escape(value)}</div></td></tr>`,
      )
      .join('');
  const button = (href: string, label: string) =>
    `<a href="${escape(href)}" style="display:inline-block;padding:14px 20px;margin:0 8px 10px 0;background:#0f4c81;color:#ffffff;border-radius:9px;text-decoration:none;font-size:15px;font-weight:700;line-height:1.5">${escape(label)}</a>`;
  const phone = String(lead.phone || '').replace(/[^+\d]/g, '');
  const email = String(lead.email || '');
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${title}</title></head><body style="margin:0;padding:0;background:#f2f8fc;font-family:Arial,sans-serif;color:#06172e"><div style="display:none;max-height:0;overflow:hidden">${escape(title)} · ${escape(lead.name || 'Rückruf')} · ${reference}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f8fc"><tr><td align="center" style="padding:20px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background:#ffffff;border:1px solid #d7e5ef;border-radius:16px;overflow:hidden"><tr><td style="padding:26px 24px;background:#022c50;color:#ffffff"><div style="font-size:13px;font-weight:700;letter-spacing:.06em;color:#b3def8">ERLEDIGT TEAM</div><h1 style="font-size:25px;line-height:1.25;margin:12px 0">${title}</h1><div style="font-size:13px;color:#b3def8">Referenz ${reference} · ${escape(date)}</div></td></tr><tr><td style="padding:24px"><p style="font-size:16px;line-height:1.65;margin:0 0 20px">${callback ? 'Eine Person bittet um einen Rückruf. Die Telefonnummer steht direkt unten.' : 'Eine neue Anfrage wurde gespeichert. Hier finden Sie die Angaben für Ihre persönliche Rückmeldung.'}</p>${phone ? button(`tel:${phone}`, 'Zurückrufen') : ''}${email ? button(`mailto:${encodeURIComponent(email)}`, 'Per E-Mail antworten') : ''}<h2 style="font-size:18px;margin:22px 0 6px">Kontakt</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows(contact)}</table>${object.length ? `<h2 style="font-size:18px;margin:26px 0 6px">Das Vorhaben</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows(object)}</table>` : ''}${lead.message ? `<h2 style="font-size:18px;margin:26px 0 10px">Nachricht</h2><div style="font-size:16px;line-height:1.7;background:#f2f8fc;padding:16px;border-radius:10px;white-space:pre-wrap;word-break:break-word">${escape(lead.message)}</div>` : ''}<p style="font-size:12px;color:#4a6176;line-height:1.6;margin:26px 0 0">Die Anfrage ist gespeichert. Sie stellt noch keine verbindliche Buchung dar.<br>Interne Referenz: ${escape(id)}</p></td></tr></table><p style="font-size:12px;line-height:1.5;color:#4a6176">erledigt-team.de · Saterland &amp; Umgebung</p></td></tr></table></body></html>`;
  const text = [
    title,
    `Referenz: ${reference}`,
    `Eingang: ${date}`,
    '',
    ...contact.map(([k, v]) => `${k}: ${v}`),
    '',
    ...object.map(([k, v]) => `${k}: ${v}`),
    ...(lead.message ? ['', `Nachricht: ${lead.message}`] : []),
    '',
    'Noch keine verbindliche Buchung.',
    `Interne Referenz: ${id}`,
  ].join('\n');
  return { subject: `${title} · ${reference}`, html, text };
}
