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
    .addItem('Merge Sheets (MasterSheet)', 'mergeSheets') 
    .addItem('Create Assessment Folders', 'createFolders')
    .addItem('Run Team Reassignment', 'runReassignment')
    .addToUi();
}

const SHEET_NAME = "InnoTix Teams Monthly Reassignment"; 
const PARENT_FOLDER_ID = "1Yuy19UxtvtZK1vP1U-aw3zn7PVrQmapu"; 
const TEAM_NAMES = ["InnoTix Cockpit", "InnoTix Hirsch", "InnoTix WebApp", "InnoTix Origa", "InnoTix Oev Pad"];
const TEAM_SIZE = 8;

function runReassignment() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Main sheet not found");
    return;
  }

  const data = sheet.getDataRange().getValues(); //reads initial member data from main sheet
  const headers = data[0];
  const teamCol = headers.indexOf("Team");
  const memberCol = headers.indexOf("Member");
  const desigCol = headers.indexOf("Designation");

  const membersData = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[teamCol] && row[memberCol]) {
      membersData.push({
        name: row[memberCol],
        designation: row[desigCol],
        team: row[teamCol]
      });
    }
  }

  const parentFolder = DriveApp.getFolderById(PARENT_FOLDER_ID); //InnoTix folder created
  let mainFolder;
  const folders = parentFolder.getFoldersByName("InnoTix Teams");
  if (folders.hasNext()) mainFolder = folders.next();
  else mainFolder = parentFolder.createFolder("InnoTix Teams");

  const teamFiles = {}; //team spreadsheets created
  for (let i = 0; i < TEAM_NAMES.length; i++) {
    const teamName = TEAM_NAMES[i];
    const files = mainFolder.getFilesByName(teamName);
    let file;
    if (files.hasNext()) file = files.next();
    else file = SpreadsheetApp.create(teamName);
    DriveApp.getFileById(file.getId()).moveTo(mainFolder);
    teamFiles[teamName] = file;
  }

  const allReassigned = []; //reassignment logic (50% first half reassigned sequentially)
  const currentTeamMembers = {}; 
  for (let i = 0; i < TEAM_NAMES.length; i++) {
    const team = TEAM_NAMES[i];
    const teamMembers = membersData.filter(m => m.team === team);
    const half = Math.floor(teamMembers.length / 2);
    const leaving = teamMembers.slice(0, half); 
    const staying = teamMembers.slice(half); 
    currentTeamMembers[team] = staying;
    allReassigned.push(...leaving);
  }

  let index = 0;
  for (let i = 0; i < TEAM_NAMES.length; i++) {
    const team = TEAM_NAMES[i];
    const current = currentTeamMembers[team];
    while (current.length < TEAM_SIZE && index < allReassigned.length) {
      const member = allReassigned[index];
      current.push(member);
      index++;
    }
  }

  for (let i = 0; i < TEAM_NAMES.length; i++) {
    const team = TEAM_NAMES[i];
    const file = teamFiles[team];
    const teamMembers = currentTeamMembers[team];
    const teamSpreadsheet = SpreadsheetApp.openById(file.getId());
    let teamSheet = teamSpreadsheet.getSheets()[0];
    teamSheet.setName("Member Details"); 
    teamSheet.clear();

    teamSheet.getRange(1, 1, 1, 3).setValues([["Member Name", "Designation", "Comment"]]).setFontWeight("bold").setBackground("lightblue");

    for (let j = 0; j < teamMembers.length; j++) {
      const m = teamMembers[j];
      let comment = "New";
      if (m.team === team) comment = "No Change";
      teamSheet.getRange(j + 2, 1, 1, 3).setValues([[m.name, m.designation, comment]]);
      if (comment === "No Change") teamSheet.getRange(j + 2, 1, 1, 3).setBackground("#FFFACD");
      m.newTeam = team; 
    }

    const prevMembers = membersData.filter(m => m.team === team); //removed members
    const removed = prevMembers.filter(pm => !teamMembers.some(cm => cm.name === pm.name));
    if (removed.length > 0) {
      const startRow = teamMembers.length + 3;
      teamSheet.getRange(startRow - 1, 1, 1, 3).setValues([["Removed Members", "", ""]]).setFontWeight("bold").setBackground("lightpink");
      for (let k = 0; k < removed.length; k++) {
        const m = removed[k];
        teamSheet.getRange(startRow + k, 1, 1, 3).setValues([[m.name, m.designation, "Removed"]]);
      }
    }
  }

  const timestamp = new Date(); //summary table inmain sheet
  const summaryStart = sheet.getLastRow() + 2;
  sheet.getRange(summaryStart, 1, 1, 7).setValues([["Timestamp","Name","Old Team","New Team","Designation","Status","Team File Link"]]).setFontWeight("bold").setBackground("lightblue");

  const summaryValues = [];
  for (let i = 0; i < membersData.length; i++) {
    const m = membersData[i];
    const status = m.team === m.newTeam ? "No Change" : "Reassigned";
    const fileLink = teamFiles[m.newTeam].getUrl();
    summaryValues.push([timestamp, m.name, m.team, m.newTeam, m.designation, status, fileLink]);
  }

  sheet.getRange(summaryStart + 1, 1, summaryValues.length, 7).setValues(summaryValues);

  for (let i = 0; i < summaryValues.length; i++) {
    if (summaryValues[i][5] === "No Change") {
      sheet.getRange(summaryStart + 1 + i, 1, 1, 7).setBackground("#FFFACD");
    }
  }

  SpreadsheetApp.getUi().alert("Reassignment complete! Team sheets and summary updated.");
}