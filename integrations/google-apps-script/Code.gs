/** ERLEDIGT TEAM — append-only webhook, shared secret set in Script Properties.
 * Properties: SPREADSHEET_ID, WEBHOOK_TOKEN. Deploy as web app executing as owner.
 * Never publish the token in the repository, browser bundle, or URL.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var p = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    if (!props.getProperty('WEBHOOK_TOKEN') || p.token !== props.getProperty('WEBHOOK_TOKEN')) return reply({ok:false});
    if (['lead','event','delivery'].indexOf(p.kind) < 0) return reply({ok:false});
    var record = p.kind === 'lead' ? p.lead : p.kind === 'event' ? p.event : p.delivery;
    if (!record || !/^[0-9a-f-]{36}$/i.test(record.id)) return reply({ok:false});
    lock.waitLock(20000);
    var book = SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID'));
    var dedupeColumn=p.kind==='delivery'?8:2;
    var dedupeKey=p.kind==='delivery'?record.key:record.id;
    if(!dedupeKey || (p.kind==='delivery'&&!/^[0-9a-f-]{36}:\d+$/i.test(dedupeKey)))return reply({ok:false});
    var callback=record.request_type==='callback';
    var mainEvent=callback?'callback_erledigt_team':'formular_erfolg_erledigt_team';
    var row;
    if (p.kind==='lead') row=[record.created_at,record.id,'Neu',record.name,record.company,record.email,record.phone,record.contact_method,record.service,record.city,record.postal_code,record.property_type,record.scope,record.frequency,record.preferred_date,record.message,record.landing_page,record.source,record.medium,record.campaign,record.privacy_version,'','','',callback?'Rückruf':'Anfrageformular',mainEvent];
    else if(p.kind==='event')row=[record.created_at,record.id,record.name,record.path,record.session_id,record.service,record.city,record.position,record.step,record.device,record.source,record.medium,record.campaign,record.consent,record.lead_id];
    else row=[record.created_at,record.id,record.destination,record.status,record.attempts,record.error,record.sent_at,record.key];
    var duplicate=!appendOnce(book,p.kind==='lead'?'Anfragen':p.kind==='event'?'Ereignisse':'Zustellung',row,dedupeColumn,dedupeKey);
    // Repair a partial prior write before acknowledging it. Both tabs deduplicate independently.
    // Saved requests appear here even without optional analytics consent. Their browser events
    // stay in Ereignisse only, so a successful request never creates two primary rows.
    if(p.kind==='lead')appendOnce(book,'Kontaktaktionen',[record.created_at,record.id,mainEvent,callback?'Rückruf angefordert':'Formular erfolgreich',record.name,[record.phone,record.email].filter(Boolean).join(' / '),record.service,record.city,record.page_path||'/anfrage',record.position||'anfrage',record.source,record.medium,record.campaign,'Neu','Anfrage übermittelt'],2,record.id);
    var clickEvents=['direkt_anrufen_erledigt_team','whatsapp_erledigt_team','email_erledigt_team'];
    var clickLabels=['Direktanruf bestätigt','WhatsApp bestätigt','E-Mail bestätigt'];
    var clickIndex=clickEvents.indexOf(record.name);
    if(p.kind==='event'&&clickIndex>=0&&record.consent==='analytics')appendOnce(book,'Kontaktaktionen',[record.created_at,record.id,record.name,clickLabels[clickIndex],'','',record.service,record.city,record.path,record.position,record.source,record.medium,record.campaign,'Kontaktweg bestätigt','Analyse erlaubt'],2,record.id);
    return reply({ok:true,record_id:dedupeKey,duplicate:duplicate});
  } catch(err) {return reply({ok:false});}
  finally {if(lock.hasLock())lock.releaseLock();}
}
function appendOnce(book,name,row,column,key){
  var sheet=book.getSheetByName(name);
  if(!sheet)throw new Error('missing_tab');
  var last=sheet.getLastRow();
  if(last>1&&sheet.getRange(2,column,last-1,1).createTextFinder(key).matchEntireCell(true).findNext())return false;
  if(last+1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),500);
  var target=sheet.getRange(last+1,1,1,row.length);
  target.setNumberFormat('@');
  target.setValues([row.map(safeCell)]);
  return true;
}
function safeCell(value){var text=String(value==null?'':value);return /^[=+\-@\t\r]/.test(text)?"'"+text:text;}
function reply(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
