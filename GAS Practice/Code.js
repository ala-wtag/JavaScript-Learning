/**
 * @OnlyCurrentDoc
 * Limits the script to this spreadsheet only.
 */

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Week 1-3 Combined");

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Results')
    .addItem('Week 1 Overview', 'alertWeek1')
    .addItem('Week 2 Overview', 'alertWeek2')
    .addItem('Show Sheet Name', 'showSheetName')
    .addItem('Rename Sheet', 'renameSheet')
    .addItem('Run Week 2 Practice', 'runWeek2')
    .addItem('Show Average Alert', 'showAverage')
    .addItem('Send Pending Reminders', 'sendReminders') 
    .addToUi();
}



function alertWeek1() {
  SpreadsheetApp.getUi().alert('Week 1: Learn functions, logging, and renaming sheets.');
}

function alertWeek2() {
  SpreadsheetApp.getUi().alert('Week 2: Practice reading/writing cells, ranges, arrays, and formatting.');
}

function showSheetName() {
  const name = sheet.getName();
  Logger.log('Active sheet name: ' + name);
  SpreadsheetApp.getUi().alert('Active sheet name: ' + name);
}

function renameSheet() {
  sheet.setName('Week 1, 2 & 3 Practice Done!');
  Logger.log('Sheet renamed to: ' + sheet.getName());
  SpreadsheetApp.getUi().alert('Sheet renamed to: ' + sheet.getName());
}

function readCellB2() {
  const value = sheet.getRange('B2').getValue();
  Logger.log('Value in B2: ' + value);
}

function writeCellC3() {
  sheet.getRange('C3').setValue('Your Name');
  Logger.log('Wrote "Your Name" in C3');
}

function readRangeA1C3() {
  const values = sheet.getRange('A1:C3').getValues();
  Logger.log('Values in A1:C3: ' + JSON.stringify(values));
}

function writeRangeD1F3() {
  const values = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ];
  sheet.getRange('D1:F3').setValues(values);
  Logger.log('Wrote numbers to D1:F3');
}

function formatHeader() {
  const range = sheet.getRange('A1:D1');
  range.setFontWeight('bold').setBackground('lightblue');
  Logger.log('Formatted A1:D1 header');
}

function runWeek2() {
  readCellB2();
  writeCellC3();
  readRangeA1C3();
  writeRangeD1F3();
  formatHeader();
  SpreadsheetApp.getUi().alert('Week 2 practice done! Check your sheet.');
}


function onEdit(e) {
  const active = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (active.getName() !== "Week 1-3 Combined") return;

  const row = e.range.getRow();
  const col = e.range.getColumn();

  if (col === 1) {
    active.getRange(row, 2).setValue(new Date());
  }
}


function findAverage(range) {
  let sum = 0, count = 0;
  range.forEach(r => {
    r.forEach(v => {
      if (typeof v === 'number') {
        sum += v;
        count++;
      }
    });
  });
  return count > 0 ? sum / count : 0;
}

function showAverage() {
  const values = sheet.getRange('A1:C3').getValues();
  const avg = findAverage(values);
  SpreadsheetApp.getUi().alert('Average of A1:C3: ' + avg);
  Logger.log('Average: ' + avg);
}

//TASK 1: Email

function sendReminders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "Task 1: Pending Reminders";
  const taskSheet = ss.getSheetByName(sheetName);

  if (!taskSheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" not found. Create it with headers: Name | Email | Status`);
    return;
  }

  const TRAINING_URL = "https://script.google.com/macros/s/AKfycbwR-KVsv_hgSrosMegBL-WI5x9SgVre2iHDRN6kQ3I5AaQeCd6J5R4WNZRR_-Tykb-9/exec";
  const SENDER_NAME = "Adhara";

  const data = taskSheet.getDataRange().getValues();
  if (data.length < 2) {
    SpreadsheetApp.getUi().alert('No data rows found.');
    return;
  }

  const headers = data[0].map(h => String(h).trim());
  const rows = data.slice(1);
  const nameCol = headers.indexOf("Name");
  const emailCol = headers.indexOf("Email"); 
  const statusCol = headers.indexOf("Status");
  let sentCol = headers.indexOf("Reminder Sent");

  if (nameCol === -1 || emailCol === -1 || statusCol === -1) {
    SpreadsheetApp.getUi().alert('Headers must include Name, Email, and Status.');
    return;
  }

  if (sentCol === -1) {
    taskSheet.getRange(1, headers.length + 1).setValue("Reminder Sent");
    sentCol = headers.length;
  }

  let sent = 0, skippedEmpty = 0, skippedDone = 0;

  rows.forEach((row, i) => {
    const status = String(row[statusCol] || "").toLowerCase();
    const alreadySent = row[sentCol];
    const name = String(row[nameCol] || "").trim();
    const email = String(row[emailCol] || "").trim();

    if (status === "pending" && !alreadySent) {
      if (!email) {
        skippedEmpty++;
        return;
      }

      const safeLink = `${TRAINING_URL}?name=${encodeURIComponent(name)}`;
      const subject = `Reminder: Pending task for ${name || "you"}`;
      const htmlBody = `
        <p>Hi ${name || 'there'},</p>
        <p>This is a reminder that your task is still <strong>Pending</strong>.</p>
        <p><a href="${safeLink}" target="_blank">Find details here.</a></p>
        <p>Thanks,<br>${SENDER_NAME}</p>
      `;

      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: htmlBody
        });
        taskSheet.getRange(i + 2, sentCol + 1).setValue(new Date());
        sent++;
      } catch (err) {
        Logger.log(`Failed for ${email}: ${err}`);
      }
    } else if (status === "pending" && alreadySent) {
      skippedDone++;
    }
  });

  SpreadsheetApp.getUi().alert(`Done! Emails sent: ${sent}, skipped (no email): ${skippedEmpty}, already sent: ${skippedDone}`);
  Logger.log(`Emails sent: ${sent}, skipped no email: ${skippedEmpty}, already sent: ${skippedDone}`);
}

//Web App 
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
                    .setTitle('Learning Demo');
}
