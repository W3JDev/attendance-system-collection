/***********************************************
 * main.js - Shared offline logic with localStorage
 ***********************************************/

// "Global" config for default late time
const DEFAULT_START_TIME = "10:30"; // HH:mm in 24-hour format

/* ======= LOCAL STORAGE KEYS ======= 
   We'll store the following data as JSON:
   - staffList: [{ passcode, name, role, wageType, wageRate, ...}, ...]
   - attendanceList: [{ passcode, clockIn, clockOut, hours, faceImgBase64, ...}, ...]
   - shiftsList: [{ shiftId, date, startTime, endTime, passcode, ...}, ...]
*/

/* Initialize data if not present */
(function initData() {
  if (!localStorage.getItem("staffList")) {
    const dummyStaff = [
      { passcode: "9999", name: "Boss", role: "admin", wageType: "hourly", wageRate: 20 },
      { passcode: "3793", name: "Siska", role: "staff", wageType: "fixed", wageRate: 2000 },
      { passcode: "0417", name: "Friska", role: "staff", wageType: "hourly", wageRate: 15 },
    ];
    localStorage.setItem("staffList", JSON.stringify(dummyStaff));
  }
  if (!localStorage.getItem("attendanceList")) {
    localStorage.setItem("attendanceList", JSON.stringify([]));
  }
  if (!localStorage.getItem("shiftsList")) {
    localStorage.setItem("shiftsList", JSON.stringify([]));
  }
})();

/* Utility: get "HH:mm" from a Date object */
function getTimeHHmm(date) {
  let hh = String(date.getHours()).padStart(2, "0");
  let mm = String(date.getMinutes()).padStart(2, "0");
  return hh + ":" + mm;
}

/* Utility: parse "HH:mm" to a Date object for today's date (for comparisons) */
function parseTimeToDate(hhmm) {
  const [hh, mm] = hhmm.split(":").map(str => parseInt(str));
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d;
}

/* ====== 1) PUNCH LOGIC ====== */
function clockIn(passcode, faceImgBase64 = null) {
  let staff = findStaffByPasscode(passcode);
  if (!staff) {
    return { error: "Invalid passcode." };
  }

  // Check if already clocked in
  let attList = getAttendanceList();
  let openEntry = attList.find(a => a.passcode === passcode && !a.clockOut);
  if (openEntry) {
    return { error: "Already clocked in at " + new Date(openEntry.clockIn).toLocaleString() };
  }

  let now = new Date();
  let record = {
    passcode: passcode,
    clockIn: now.toISOString(),
    clockOut: null,
    hours: 0,
    faceImg: faceImgBase64,
  };
  attList.push(record);
  saveAttendanceList(attList);

  // Check lateness
  let startTimeDate = parseTimeToDate(DEFAULT_START_TIME);
  let isLate = now > startTimeDate;
  
  return { success: `Clocked in at ${now.toLocaleString()}`, late: isLate };
}

function clockOut(passcode) {
  let staff = findStaffByPasscode(passcode);
  if (!staff) {
    return { error: "Invalid passcode." };
  }

  let attList = getAttendanceList();
  let openIndex = attList.findIndex(a => a.passcode === passcode && !a.clockOut);
  if (openIndex === -1) {
    return { error: "You haven't clocked in yet." };
  }

  let now = new Date();
  let clockInTime = new Date(attList[openIndex].clockIn);
  let diffHours = (now - clockInTime) / (1000 * 60 * 60);

  attList[openIndex].clockOut = now.toISOString();
  attList[openIndex].hours = parseFloat(diffHours.toFixed(2));

  saveAttendanceList(attList);
  return { success: `Clocked out at ${now.toLocaleString()}, Hours: ${diffHours.toFixed(2)}` };
}

/* ====== 2) STAFF CRUD ====== */
function addOrUpdateStaff(staffObj) {
  // staffObj = { passcode, name, role, wageType, wageRate }
  let staffList = getStaffList();
  let existingIndex = staffList.findIndex(s => s.passcode === staffObj.passcode);

  if (existingIndex === -1) {
    staffList.push(staffObj);
    saveStaffList(staffList);
    return { success: "Staff added." };
  } else {
    staffList[existingIndex] = staffObj; // overwrite
    saveStaffList(staffList);
    return { success: "Staff updated." };
  }
}

function findStaffByPasscode(passcode) {
  let staffList = getStaffList();
  return staffList.find(s => s.passcode === passcode);
}

/* ====== 3) SHIFTS (for scheduling) ====== */
function createShift(shiftObj) {
  // shiftObj = { shiftId, date, startTime, endTime, passcode (or all-staff?), etc. }
  let shifts = getShiftsList();
  shifts.push(shiftObj);
  saveShiftsList(shifts);
  return { success: "Shift created." };
}

function getStaffShifts(passcode) {
  let shifts = getShiftsList();
  return shifts.filter(s => s.passcode === passcode);
}

/* ====== 4) MISSED PUNCH REQUESTS ====== 
   Could store them in localStorage or just let staff manually fix it in the admin panel, etc. 
   For brevity, we won't implement a full missed punch flow here, 
   but we can store a simple request object and let admin approve.
*/

/* ====== 5) REPORTS & ANALYSIS ====== */
function getStaffAttendance(passcode) {
  let attList = getAttendanceList();
  return attList.filter(a => a.passcode === passcode).sort((a,b) => new Date(a.clockIn) - new Date(b.clockIn));
}

function getAllAttendance() {
  return getAttendanceList().sort((a,b) => new Date(a.clockIn) - new Date(b.clockIn));
}

function calculatePayslip(passcode) {
  // Summation of hours for passcode * wageRate (if hourly) or fixed
  let staff = findStaffByPasscode(passcode);
  if (!staff) return null;

  let att = getStaffAttendance(passcode);
  let totalHours = att.reduce((sum, rec) => sum + rec.hours, 0);
  let pay = 0;
  if (staff.wageType === "hourly") {
    pay = totalHours * staff.wageRate;
  } else {
    // fixed
    pay = staff.wageRate;
  }

  return {
    passcode: passcode,
    name: staff.name,
    totalHours: totalHours.toFixed(2),
    wageType: staff.wageType,
    wageRate: staff.wageRate,
    totalPay: pay.toFixed(2),
  };
}

function calculateAllPayslips() {
  let staffList = getStaffList();
  return staffList.map(s => calculatePayslip(s.passcode));
}

/* ====== 6) DOWNLOAD / EXPORT DATA ====== */
function exportAllData() {
  let data = {
    staffList: getStaffList(),
    attendanceList: getAttendanceList(),
    shiftsList: getShiftsList(),
  };
  let blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "attendance_data.json";
  a.click();
  URL.revokeObjectURL(url);
}

/* ====== GET/SET localStorage HELPERS ====== */
function getStaffList() {
  return JSON.parse(localStorage.getItem("staffList")) || [];
}
function saveStaffList(arr) {
  localStorage.setItem("staffList", JSON.stringify(arr));
}

function getAttendanceList() {
  return JSON.parse(localStorage.getItem("attendanceList")) || [];
}
function saveAttendanceList(arr) {
  localStorage.setItem("attendanceList", JSON.stringify(arr));
}

function getShiftsList() {
  return JSON.parse(localStorage.getItem("shiftsList")) || [];
}
function saveShiftsList(arr) {
  localStorage.setItem("shiftsList", JSON.stringify(arr));
}
