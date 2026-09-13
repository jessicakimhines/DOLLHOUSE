/* =========================================================
   DOLLHOUSE
   Main Application JavaScript
========================================================= */


/* =========================================================
   APP DATA
========================================================= */

const STORAGE_KEY = "dollhouseAppData";

let appData = {
  account: null,
  plan: "FREE",
  properties: [],
  currentPropertyId: null,
  currentScanId: null
};

let scanTimer = null;
let scanProgressValue = 0;
let selectedSubscription = "monthly";


/* =========================================================
   STARTUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  loadAppData();

  setupKeyboardShortcuts();

  if (appData.account) {
    openApplication();
  } else {
    showScreen("welcomeScreen");
  }

});


/* =========================================================
   STORAGE
========================================================= */

function loadAppData() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      appData = {
        ...appData,
        ...parsed
      };
    }

  } catch (error) {

    console.error("Could not load DOLLHOUSE data:", error);

  }

}


function saveAppData() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appData)
    );

  } catch (error) {

    console.error("Could not save DOLLHOUSE data:", error);

  }

}


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(screenId) {

  const welcome = document.getElementById("welcomeScreen");
  const account = document.getElementById("accountScreen");
  const mainApp = document.getElementById("mainApp");

  const allScreens = document.querySelectorAll(
    ".screen, .app-screen"
  );

  allScreens.forEach(screen => {
    screen.classList.remove(
      "active-screen",
      "active-app-screen"
    );
  });

  if (screenId === "welcomeScreen") {

    if (mainApp) {
      mainApp.classList.add("hidden");
    }

    if (welcome) {
      welcome.classList.add("active-screen");
      welcome.style.display = "flex";
    }

    if (account) {
      account.style.display = "none";
    }

    return;
  }


  if (screenId === "accountScreen") {

    if (mainApp) {
      mainApp.classList.add("hidden");
    }

    if (welcome) {
      welcome.style.display = "none";
    }

    if (account) {
      account.classList.add("active-screen");
      account.style.display = "flex";
    }

    return;
  }


  if (welcome) {
    welcome.style.display = "none";
  }

  if (account) {
    account.style.display = "none";
  }

  if (mainApp) {
    mainApp.classList.remove("hidden");
  }


  const target = document.getElementById(screenId);

  if (target) {

    document.querySelectorAll(".app-screen").forEach(screen => {
      screen.classList.remove("active-app-screen");
    });

    target.classList.add("active-app-screen");

  }


  updateNavigation(screenId);

  closeMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function openApplication() {

  showScreen("dashboardScreen");

  updateUserInterface();

  renderDashboard();
  renderProperties();

}


function navigateFromMenu(screenId) {

  showScreen(screenId);

}


/* =========================================================
   SIDE MENU
========================================================= */

function toggleMenu() {

  const menu = document.getElementById("sideMenu");

  if (!menu) return;

  menu.classList.toggle("open");

}


function closeMenu() {

  const menu = document.getElementById("sideMenu");

  if (!menu) return;

  menu.classList.remove("open");

}


function updateNavigation(screenId) {

  document.querySelectorAll(".menu-item").forEach(item => {

    item.classList.remove("active");

    if (item.dataset.screen === screenId) {
      item.classList.add("active");
    }

  });

}


/* =========================================================
   ACCOUNT
========================================================= */

function createAccount() {

  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const error = document.getElementById("accountError");

  if (!emailInput || !passwordInput || !termsCheckbox) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (error) {
    error.textContent = "";
  }


  /* Email validation */

  if (!email.includes("@") || !email.includes(".")) {

    if (error) {
      error.textContent = "Please enter a valid email address.";
    }

    emailInput.focus();

    return;
  }


  /* Password validation */

  if (password.length < 8) {

    if (error) {
      error.textContent =
        "Your password must be at least 8 characters.";
    }

    passwordInput.focus();

    return;
  }


  /* Terms */

  if (!termsCheckbox.checked) {

    if (error) {
      error.textContent =
        "Please agree to the Terms & Conditions.";
    }

    return;
  }


  appData.account = {
    email: email,
    createdAt: new Date().toISOString()
  };


  if (!appData.plan) {
    appData.plan = "FREE";
  }


  saveAppData();

  showNotification("Account created successfully.");

  openApplication();

}


function logout() {

  const confirmed = confirm(
    "Are you sure you want to log out?"
  );

  if (!confirmed) {
    return;
  }

  closeMenu();

  showScreen("welcomeScreen");

  showNotification("You have been logged out.");

}


/* =========================================================
   USER INTERFACE
========================================================= */

function updateUserInterface() {

  const email = appData.account
    ? appData.account.email
    : "—";

  const plan = appData.plan || "FREE";


  const profileEmail =
    document.getElementById("profileEmail");

  const profilePlan =
    document.getElementById("profilePlan");

  const dashboardPlan =
    document.getElementById("dashboardPlan");

  const menuPlan =
    document.getElementById("menuPlan");


  if (profileEmail) {
    profileEmail.textContent = email;
  }

  if (profilePlan) {
    profilePlan.textContent = plan;
  }

  if (dashboardPlan) {
    dashboardPlan.textContent = plan;
  }

  if (menuPlan) {
    menuPlan.textContent = plan;
  }


  updateAvatar();

}


function updateAvatar() {

  const avatar =
    document.getElementById("topProfileAvatar");

  if (!avatar || !appData.account) {
    return;
  }

  const email = appData.account.email;

  const firstLetter =
    email.charAt(0).toUpperCase();

  avatar.textContent = firstLetter + "H";

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

  const propertyCount =
    document.getElementById("propertyCount");

  const scanCount =
    document.getElementById("scanCount");

  const lastScanDate =
    document.getElementById("lastScanDate");

  const savedScans =
    document.getElementById("savedScans");


  const properties = appData.properties || [];

  const allScans = properties.flatMap(
    property => property.scans || []
  );


  if (propertyCount) {
    propertyCount.textContent = properties.length;
  }

  if (scanCount) {
    scanCount.textContent = allScans.length;
  }


  if (lastScanDate) {

    if (allScans.length === 0) {

      lastScanDate.textContent = "—";

    } else {

      const newest = [...allScans].sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )[0];

      lastScanDate.textContent =
        formatDate(newest.date);

    }

  }


  if (savedScans) {

    if (allScans.length === 0) {

      savedScans.innerHTML = `
        <div class="empty-state">
          <div class="empty-symbol">◇</div>
          <h4>No scans yet</h4>
          <p>
            Start your first property scan
            to see it here.
          </p>
          <button
            class="secondary-button"
            onclick="startScan()">
            Create First Scan
          </button>
        </div>
      `;

      return;
    }


    const recentScans = [...allScans]
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )
      .slice(0, 5);


    savedScans.innerHTML =
      recentScans.map(scan => {

        const property =
          properties.find(
            p => p.id === scan.propertyId
          );

        return `
          <div class="scan-item">

            <div>
              <h4>
                ${escapeHTML(
                  property?.name || "Property"
                )}
              </h4>

              <p>
                ${formatDate(scan.date)}
                · ${scan.rooms} rooms
                · ${scan.objects} objects
              </p>
            </div>

            <button
              class="secondary-button"
              onclick="openScan('${scan.id}', '${scan.propertyId}')">
              Open
            </button>

          </div>
        `;

      }).join("");

  }

}


/* =========================================================
   PROPERTY LIST
========================================================= */

function renderProperties(searchTerm = "") {

  const container =
    document.getElementById("allProperties");

  if (!container) {
    return;
  }


  let properties = appData.properties || [];

  const term = searchTerm
    .trim()
    .toLowerCase();


  if (term) {

    properties = properties.filter(property =>
      property.name.toLowerCase().includes(term)
    );

  }


  if (properties.length === 0) {

    container.innerHTML = `
      <div class="empty-state">

        <div class="empty-symbol">
          ◇
        </div>

        <h4>
          ${term
            ? "No matching properties"
            : "No properties yet"}
        </h4>

        <p>
          ${term
            ? "Try another search."
            : "Your scanned properties will appear here."}
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML =
    properties.map(property => {

      const scans =
        property.scans || [];

      const latest =
        [...scans].sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )[0];


      return `
        <div class="property-card">

          <span class="eyebrow">
            PROPERTY
          </span>

          <h3>
            ${escapeHTML(property.name)}
          </h3>

          <p>
            ${scans.length} scan${scans.length === 1 ? "" : "s"}
            ${latest
              ? ` · Last scan ${formatDate(latest.date)}`
              : ""}
          </p>

          <div class="property-card-footer">

            <span>
              ${latest
                ? `${latest.rooms} rooms · ${latest.objects} objects`
                : "No scans"}
            </span>

            <button
              class="secondary-button"
              onclick="openProperty('${property.id}')">
              View Property
            </button>

          </div>

        </div>
      `;

    }).join("");

}


function filterProperties() {

  const search =
    document.getElementById("propertySearch");

  if (!search) {
    return;
  }

  renderProperties(search.value);

}


/* =========================================================
   START SCAN
========================================================= */

function startScan() {

  showScreen("scannerScreen");

  resetScanner();

}


function resetScanner() {

  clearInterval(scanTimer);

  scanProgressValue = 0;

  const percentage =
    document.getElementById("scanPercentage");

  const progress =
    document.getElementById("scanProgress");

  const status =
    document.getElementById("scanStatus");

  const rooms =
    document.getElementById("roomCount");

  const objects =
    document.getElementById("objectCount");

  const instructions =
    document.getElementById("scanInstructions");

  const button =
    document.getElementById("scanStartButton");


  if (percentage) {
    percentage.textContent = "0%";
  }

  if (progress) {
    progress.style.width = "0%";
  }

  if (status) {
    status.textContent = "READY";
  }

  if (rooms) {
    rooms.textContent = "0";
  }

  if (objects) {
    objects.textContent = "0";
  }

  if (instructions) {
    instructions.textContent =
      "Move slowly through the property. Capture rooms, walls, objects, and spaces.";
  }

  if (button) {
    button.disabled = false;
    button.textContent = "Begin Scan";
  }

}


function beginScanning() {

  const button =
    document.getElementById("scanStartButton");

  const status =
    document.getElementById("scanStatus");

  const instructions =
    document.getElementById("scanInstructions");


  if (button) {
    button.disabled = true;
    button.textContent = "Scanning...";
  }

  if (status) {
    status.textContent = "SCANNING";
  }

  if (instructions) {
    instructions.textContent =
      "Capturing the property. Continue moving through the space.";
  }


  scanProgressValue = 0;

  clearInterval(scanTimer);


  scanTimer = setInterval(() => {

    scanProgressValue += Math.random() * 3.5;

    if (scanProgressValue >= 100) {

      scanProgressValue = 100;

      updateScanner();

      clearInterval(scanTimer);

      finishScan();

      return;
    }

    updateScanner();

  }, 180);

}


function updateScanner() {

  const percentage =
    document.getElementById("scanPercentage");

  const progress =
    document.getElementById("scanProgress");

  const rooms =
    document.getElementById("roomCount");

  const objects =
    document.getElementById("objectCount");


  if (percentage) {
    percentage.textContent =
      Math.floor(scanProgressValue) + "%";
  }

  if (progress) {
    progress.style.width =
      scanProgressValue + "%";
  }


  const estimatedRooms =
    Math.max(
      1,
      Math.floor(scanProgressValue / 18)
    );

  const estimatedObjects =
    Math.floor(scanProgressValue * 1.8);


  if (rooms) {
    rooms.textContent =
      Math.min(estimatedRooms, 6);
  }

  if (objects) {
    objects.textContent =
      estimatedObjects;
  }

}


function finishScan() {

  const status =
    document.getElementById("scanStatus");

  const instructions =
    document.getElementById("scanInstructions");

  const button =
    document.getElementById("scanStartButton");


  if (status) {
    status.textContent = "COMPLETE";
  }

  if (instructions) {
    instructions.textContent =
      "Property scan complete. Generating your digital model...";
  }


  if (button) {
    button.textContent = "Generating Model...";
  }


  setTimeout(() => {

    createDemoScan();

  }, 1300);

}


/* =========================================================
   CREATE DEMO SCAN
========================================================= */

function createDemoScan() {

  const date =
    new Date().toISOString();

  const propertyId =
    "property-" + Date.now();

  const scanId =
    "scan-" + Date.now();


  const property = {
    id: propertyId,

    name: "New Property",

    createdAt: date,

    scans: []
  };


  const scan = {

    id: scanId,

    propertyId: propertyId,

    date: date,

    rooms: 6,

    objects: 47,

    size: "2,480 sq ft",

    modelReady: true,

    summary:
      "The property appears to contain six primary spaces with a variety of detected objects and structural elements.",

    maintenance:
      "No confirmed maintenance issue can be determined from this prototype scan. A professional inspection would be required for actual property assessment."

  };


  property.scans.push(scan);

  appData.properties.push(property);

  appData.currentPropertyId =
    propertyId;

  appData.currentScanId =
    scanId;


  saveAppData();

  updateUserInterface();

  renderDashboard();

  renderProperties();

  showNotification(
    "Scan complete. Your digital property model is ready."
  );


  setTimeout(() => {

    showScreen("modelScreen");

    loadModel(scan, property);

  }, 500);

}


/* =========================================================
   PROPERTY OPENING
========================================================= */

function openProperty(propertyId) {

  const property =
    appData.properties.find(
      p => p.id === propertyId
    );

  if (!property) {
    return;
  }


  appData.currentPropertyId =
    propertyId;


  const latest =
    [...(property.scans || [])].sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )[0];


  appData.currentScanId =
    latest ? latest.id : null;


  saveAppData();

  loadProperty(property);

  showScreen("propertyScreen");

}


function loadProperty(property) {

  const title =
    document.getElementById("propertyTitle");

  const subtitle =
    document.getElementById("propertySubtitle");

  const nameDisplay =
    document.getElementById("propertyNameDisplay");

  const roomCount =
    document.getElementById("propertyRoomCount");

  const objectCount =
    document.getElementById("propertyObjectCount");

  const scanCount =
    document.getElementById("propertyScanCount");

  const history =
    document.getElementById("propertyScanHistory");

  const aiSummary =
    document.getElementById("propertyAISummary");

  const maintenance =
    document.getElementById("maintenanceSummary");

  const changes =
    document.getElementById("changeSummary");


  if (title) {
    title.textContent = property.name;
  }

  if (subtitle) {
    subtitle.textContent =
      `${property.scans.length} saved scan${property.scans.length === 1 ? "" : "s"}`;
  }

  if (nameDisplay) {
    nameDisplay.textContent =
      property.name;
  }


  const latest =
    [...property.scans].sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )[0];


  if (roomCount) {
    roomCount.textContent =
      latest ? latest.rooms : "—";
  }

  if (objectCount) {
    objectCount.textContent =
      latest ? latest.objects : "—";
  }

  if (scanCount) {
    scanCount.textContent =
      property.scans.length;
  }


  if (history) {

    history.innerHTML =
      property.scans
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )
        .map(scan => `
          <div class="history-item">

            <strong>
              ${formatDate(scan.date)}
            </strong>

            <span>
              ${scan.rooms} rooms
              · ${scan.objects} objects
              · ${scan.size}
            </span>

            <button
              class="text-button"
              onclick="openScan('${scan.id}', '${property.id}')">
              Open scan →
            </button>

          </div>
        `)
        .join("");

  }


  if (aiSummary) {

    aiSummary.textContent =
      latest?.summary ||
      "Scan your property to generate an AI-powered property summary.";

  }


  if (maintenance) {

    maintenance.textContent =
      latest?.maintenance ||
      "Maintenance recommendations will appear after your property is scanned.";

  }


  if (changes) {

    if (property.scans.length < 2) {

      changes.textContent =
        "A second scan is required to compare how the property changed over time.";

    } else {

      changes.textContent =
        "DOLLHOUSE can compare your latest scan with previous scans to identify changes in rooms, objects, and property data.";

    }

  }

}


/* =========================================================
   OPEN SCAN
========================================================= */

function openScan(scanId, propertyId) {

  const property =
    appData.properties.find(
      p => p.id === propertyId
    );

  if (!property) {
    return;
  }


  const scan =
    property.scans.find(
      s => s.id === scanId
    );

  if (!scan) {
    return;
  }


  appData.currentPropertyId =
    propertyId;

  appData.currentScanId =
    scanId;

  saveAppData();

  loadModel(scan, property);

  showScreen("modelScreen");

}


function loadModel(scan, property) {

  const title =
    document.getElementById("modelTitle");

  const date =
    document.getElementById("modelDate");

  const rooms =
    document.getElementById("modelRooms");

  const objects =
    document.getElementById("modelObjects");

  const size =
    document.getElementById("modelSize");


  if (title) {
    title.textContent =
      property.name;
  }

  if (date) {
    date.textContent =
      `Scan date: ${formatDate(scan.date)}`;
  }

  if (rooms) {
    rooms.textContent =
      scan.rooms;
  }

  if (objects) {
    objects.textContent =
      scan.objects;
  }

  if (size) {
    size.textContent =
      scan.size || "—";
  }

}


/* =========================================================
   DELETE SCAN
========================================================= */

function deleteCurrentScan() {

  const property =
    appData.properties.find(
      p => p.id === appData.currentPropertyId
    );

  if (!property) {
    return;
  }


  const scanIndex =
    property.scans.findIndex(
      s => s.id === appData.currentScanId
    );

  if (scanIndex === -1) {
    return;
  }


  const confirmed = confirm(
    "Delete this scan? This cannot be undone."
  );

  if (!confirmed) {
    return;
  }


  property.scans.splice(
    scanIndex,
    1
  );


  if (property.scans.length === 0) {

    appData.properties =
      appData.properties.filter(
        p => p.id !== property.id
      );

    appData.currentPropertyId = null;
    appData.currentScanId = null;

  } else {

    appData.currentScanId =
      property.scans[
        property.scans.length - 1
      ].id;

  }


  saveAppData();

  renderDashboard();
  renderProperties();

  showNotification(
    "Scan deleted."
  );

  showScreen("scansScreen");

}


/* =========================================================
   SAVE SCAN
========================================================= */

function saveScan() {

  saveAppData();

  showNotification(
    "Scan saved successfully."
  );

}


/* =========================================================
   SCAN HELP
========================================================= */

function showScanHelp() {

  const modal =
    document.getElementById("scanHelpModal");

  if (modal) {
    modal.classList.remove("hidden");
  }

}


function closeScanHelp() {

  const modal =
    document.getElementById("scanHelpModal");

  if (modal) {
    modal.classList.add("hidden");
  }

}


function cancelScan() {

  clearInterval(scanTimer);

  scanProgressValue = 0;

  showScreen("dashboardScreen");

  showNotification(
    "Scan cancelled."
  );

}


/* =========================================================
   TERMS
========================================================= */

function showTerms() {

  const modal =
    document.getElementById("termsModal");

  if (modal) {
    modal.classList.remove("hidden");
  }

}


function closeTerms() {

  const modal =
    document.getElementById("termsModal");

  if (modal) {
    modal.classList.add("hidden");
  }

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function sendMessage() {

  const input =
    document.getElementById("chatInput");

  const messages =
    document.getElementById("chatMessages");


  if (!input || !messages) {
    return;
  }


  const text =
    input.value.trim();


  if (!text) {
    return;
  }


  addChatMessage(
    text,
    "user"
  );


  input.value = "";


  setTimeout(() => {

    const response =
      generateAIResponse(text);

    addChatMessage(
      response,
      "ai"
    );

  }, 650);

}


function handleChatKey(event) {

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    sendMessage();

  }

}


function useSuggestion(text) {

  const input =
    document.getElementById("chatInput");

  if (!input) {
    return;
  }

  input.value = text;

  sendMessage();

}


function addChatMessage(text, type) {

  const messages =
    document.getElementById("chatMessages");

  if (!messages) {
    return;
  }


  const message =
    document.createElement("div");

  message.className =
    "chat-message " +
    (type === "user"
      ? "user-message"
      : "ai-message");


  if (type === "user") {

    message.innerHTML = `
      <div class="message-content">
        <p>${escapeHTML(text)}</p>
      </div>
    `;

  } else {

    message.innerHTML = `
      <div class="chat-avatar">
        AI
      </div>

      <div class="message-content">

        <strong>
          DOLLHOUSE AI
        </strong>

        <p>
          ${escapeHTML(text)}
        </p>

      </div>
    `;

  }


  messages.appendChild(message);

  messages.scrollTop =
    messages.scrollHeight;

}


function generateAIResponse(text) {

  const lower =
    text.toLowerCase();


  if (
    lower.includes("summary") ||
    lower.includes("summarize")
  ) {

    return "Based on the available prototype scan data, your property can be organized by rooms, detected objects, property size, scan dates, and historical changes. A future native version can use real LiDAR and AI analysis for substantially more detailed results.";

  }


  if (
    lower.includes("maintenance") ||
    lower.includes("fix") ||
    lower.includes("inspect")
  ) {

    return "I can help organize areas that may need attention, but a scan alone cannot confirm a real defect. For important structural, electrical, plumbing, or safety concerns, a qualified professional should inspect the property.";

  }


  if (
    lower.includes("changed") ||
    lower.includes("change") ||
    lower.includes("compare")
  ) {

    return "DOLLHOUSE can compare saved scans from different dates. The prototype tracks room counts, object counts, property size, and scan dates. A future native version can add deeper visual and spatial change detection.";

  }


  if (
    lower.includes("room")
  ) {

    return "Your saved property data can be organized room by room. The native version is intended to use Apple's LiDAR and RoomPlan technologies to capture spatial information more accurately.";

  }


  if (
    lower.includes("scan")
  ) {

    return "The current GitHub prototype simulates the scanning process. It does not have real LiDAR access. The eventual iPad version can use compatible Apple LiDAR hardware for actual spatial scanning.";

  }


  return "I can help you understand your saved property data, review scan information, compare historical scans, and organize maintenance questions. What would you like to know?";

}


/* =========================================================
   SUBSCRIPTIONS
========================================================= */

function selectSubscription(plan) {

  selectedSubscription =
    plan;


  document
    .querySelectorAll(".subscription-card")
    .forEach(card => {
      card.classList.remove("selected");
    });


  const selected =
    document.getElementById(
      plan + "Plan"
    );

  if (selected) {
    selected.classList.add("selected");
  }


  const button =
    document.getElementById(
      "subscribeButton"
    );

  if (!button) {
    return;
  }


  const labels = {

    weekly:
      "Continue with Weekly",

    monthly:
      "Continue with Monthly",

    yearly:
      "Continue with Yearly"

  };


  button.textContent =
    labels[plan] ||
    "Continue";

}


function activatePremium() {

  const planNames = {

    weekly: "WEEKLY",

    monthly: "MONTHLY",

    yearly: "YEARLY"

  };


  appData.plan =
    planNames[selectedSubscription] ||
    "PREMIUM";


  saveAppData();

  updateUserInterface();

  showNotification(
    `Premium ${appData.plan.toLowerCase()} plan activated in prototype.`
  );

}


/* =========================================================
   RESET DATA
========================================================= */

function resetAppData() {

  const confirmed = confirm(
    "This will delete your local DOLLHOUSE account, properties, and scans. Continue?"
  );

  if (!confirmed) {
    return;
  }


  localStorage.removeItem(
    STORAGE_KEY
  );


  appData = {

    account: null,

    plan: "FREE",

    properties: [],

    currentPropertyId: null,

    currentScanId: null

  };


  clearInterval(scanTimer);

  showNotification(
    "App data has been reset."
  );


  setTimeout(() => {

    location.reload();

  }, 600);

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

let notificationTimer = null;


function showNotification(message) {

  const notification =
    document.getElementById("notification");

  const messageElement =
    document.getElementById(
      "notificationMessage"
    );


  if (!notification || !messageElement) {
    return;
  }


  messageElement.textContent =
    message;


  notification.classList.add(
    "show"
  );


  clearTimeout(
    notificationTimer
  );


  notificationTimer =
    setTimeout(() => {

      notification.classList.remove(
        "show"
      );

    }, 3000);

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(dateString) {

  if (!dateString) {
    return "—";
  }


  const date =
    new Date(dateString);


  if (Number.isNaN(date.getTime())) {
    return "—";
  }


  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

}


/* =========================================================
   SECURITY / TEXT CLEANING
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function setupKeyboardShortcuts() {

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeMenu();
        closeTerms();
        closeScanHelp();

      }

    }
  );

}


/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

window.addEventListener(
  "error",
  event => {

    console.error(
      "DOLLHOUSE error:",
      event.error
    );

  }
);
