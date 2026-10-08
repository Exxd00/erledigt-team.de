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
    var sheet = book.getSheetByName(p.kind === 'lead' ? 'Anfragen' : p.kind === 'event' ? 'Ereignisse' : 'Zustellung');
    if (!sheet) throw new Error('missing_tab');
    // Check the persistent ID column: idempotency survives caches and restarts.
    var last=sheet.getLastRow();
    var dedupeColumn=p.kind==='delivery'?8:2;
    var dedupeKey=p.kind==='delivery'?record.key:record.id;
    if(!dedupeKey || (p.kind==='delivery'&&!/^[0-9a-f-]{36}:\d+$/i.test(dedupeKey)))return reply({ok:false});
    if (last>1 && sheet.getRange(2,dedupeColumn,last-1,1).createTextFinder(dedupeKey).matchEntireCell(true).findNext()) return reply({ok:true,duplicate:true});
    var row;
    if (p.kind==='lead') row=[record.created_at,record.id,'Neu',record.name,record.company,record.email,record.phone,record.contact_method,record.service,record.city,record.postal_code,record.property_type,record.scope,record.frequency,record.preferred_date,record.message,record.landing_page,record.source,record.medium,record.campaign,record.privacy_version,'','',''];
    else if(p.kind==='event')row=[record.created_at,record.id,record.name,record.path,record.session_id,record.service,record.city,record.position,record.step,record.device,record.source,record.medium,record.campaign,record.consent,record.lead_id];
    else row=[record.created_at,record.id,record.destination,record.status,record.attempts,record.error,record.sent_at,record.key];
    if(last+1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),500);
    var target=sheet.getRange(last+1,1,1,row.length);
    target.setNumberFormat('@');
    target.setValues([row.map(safeCell)]);
    return reply({ok:true});
  } catch(err) {return reply({ok:false});}
  finally {if(lock.hasLock())lock.releaseLock();}
}
function safeCell(value){var text=String(value==null?'':value);return /^[=+\-@\t\r]/.test(text)?"'"+text:text;}
function reply(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
