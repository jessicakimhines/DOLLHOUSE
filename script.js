/* =========================================================
   DOLLHOUSE — Main App Script
   ========================================================= */

let scanTimer = null;
let currentScan = null;
let currentPropertyId = null;
let currentViewingScan = null;
let lastModelSource = "dashboardScreen";
let selectedSubscription = null;


/* =========================================================
   BASIC SCREEN NAVIGATION
   ========================================================= */

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.add("active");
    }

    closeMenu();

    if (screenId === "dashboardScreen") {
        displaySavedScans();
    }

    if (screenId === "scansScreen") {
        renderAllProperties();
    }

    if (screenId === "profileScreen") {
        updateProfile();
    }

    if (screenId === "propertyScreen") {
        renderPropertyDetails();
    }
}


/* =========================================================
   SIDE MENU
   ========================================================= */

function toggleMenu() {
    const menu = document.getElementById("mainMenu");

    if (menu) {
        menu.classList.toggle("open");
    }
}

function closeMenu() {
    const menu = document.getElementById("mainMenu");

    if (menu) {
        menu.classList.remove("open");
    }
}

function navigateFromMenu(screenId) {
    showScreen(screenId);
}


/* =========================================================
   ACCOUNT CREATION
   ========================================================= */

function createAccount() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsInput = document.getElementById("terms");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    const termsAccepted = termsInput ? termsInput.checked : false;

    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        alert("Your password must be at least 8 characters.");
        return;
    }

    if (!termsAccepted) {
        alert("Please accept the Terms & Conditions.");
        return;
    }

    localStorage.setItem("dollhouseSignedIn", "true");
    localStorage.setItem("dollhouseEmail", email);

    updateProfile();
    showScreen("dashboardScreen");
}


/* =========================================================
   LOGIN / LOGOUT
   ========================================================= */

function logout() {
    localStorage.removeItem("dollhouseSignedIn");
    localStorage.removeItem("dollhouseEmail");

    currentPropertyId = null;
    currentScan = null;

    showScreen("welcomeScreen");
}


/* =========================================================
   PROPERTY DATA
   ========================================================= */

function getProperties() {
    const saved = localStorage.getItem("dollhouseProperties");

    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (error) {
            return [];
        }
    }

    /* -----------------------------------------
       Migrate older prototype scan data
       ----------------------------------------- */

    const oldScans = localStorage.getItem("dollhouseScans");

    if (oldScans) {
        try {
            const scans = JSON.parse(oldScans);

            if (Array.isArray(scans) && scans.length > 0) {
                const migratedProperty = {
                    id: "property-" + Date.now(),
                    name: "Imported Property",
                    createdAt: new Date().toISOString(),
                    scans: scans.map((scan, index) => ({
                        id: scan.id || "scan-" + Date.now() + "-" + index,
                        date: scan.date || new Date().toISOString(),
                        rooms: scan.rooms || 0,
                        objects: scan.objects || 0,
                        squareFeet: scan.squareFeet || 0,
                        modelVersion: scan.modelVersion || 1
                    }))
                };

                const properties = [migratedProperty];

                localStorage.setItem(
                    "dollhouseProperties",
                    JSON.stringify(properties)
                );

                return properties;
            }
        } catch (error) {
            console.log("No old scan data to migrate.");
        }
    }

    return [];
}


function saveProperties(properties) {
    localStorage.setItem(
        "dollhouseProperties",
        JSON.stringify(properties)
    );
}


/* =========================================================
   SCANNING
   ========================================================= */

function startScan() {
    const activeScreen = document.querySelector(".screen.active");

    let targetProperty = null;

    /*
       If the user started scanning from inside an
       existing property, continue adding to that property.
    */

    if (
        activeScreen &&
        activeScreen.id === "propertyScreen" &&
        currentPropertyId
    ) {
        const properties = getProperties();

        targetProperty = properties.find(
            property => property.id === currentPropertyId
        );
    }

    /*
       Otherwise this is a new property.
    */

    if (!targetProperty) {
        const propertyName = prompt(
            "Enter a name for this property:"
        );

        if (propertyName === null) {
            return;
        }

        const cleanName = propertyName.trim();

        if (cleanName.length > 0) {
            currentScan = {
                newPropertyName: cleanName
            };
        } else {
            currentScan = {
                newPropertyName: "New Property"
            };
        }

        currentPropertyId = null;
    }

    currentViewingScan = null;

    showScreen("scannerScreen");

    resetScanner();

    setTimeout(() => {
        beginScanning();
    }, 500);
}


function resetScanner() {
    const progress = document.getElementById("scanProgress");
    const percent = document.getElementById("scanPercent");
    const status = document.getElementById("scanStatus");
    const rooms = document.getElementById("roomCount");
    const objects = document.getElementById("objectCount");

    if (progress) progress.style.width = "0%";
    if (percent) percent.textContent = "0%";

    if (status) {
        status.textContent = "Preparing property scan...";
    }

    if (rooms) rooms.textContent = "0";
    if (objects) objects.textContent = "0";

    if (scanTimer) {
        clearInterval(scanTimer);
        scanTimer = null;
    }
}


function beginScanning() {
    let progress = 0;

    const statusMessages = [
        "Initializing spatial scan...",
        "Mapping walls and surfaces...",
        "Detecting rooms...",
        "Analyzing objects...",
        "Mapping doors and windows...",
        "Capturing property geometry...",
        "Building 3D environment...",
        "Finalizing DOLLHOUSE model..."
    ];

    scanTimer = setInterval(() => {
        progress += Math.floor(Math.random() * 7) + 4;

        if (progress > 100) {
            progress = 100;
        }

        updateScanner(progress, statusMessages);

        if (progress >= 100) {
            clearInterval(scanTimer);
            scanTimer = null;

            setTimeout(() => {
                finishScan();
            }, 600);
        }
    }, 250);
}


function updateScanner(progress, statusMessages) {
    const progressBar = document.getElementById("scanProgress");
    const percent = document.getElementById("scanPercent");
    const status = document.getElementById("scanStatus");
    const rooms = document.getElementById("roomCount");
    const objects = document.getElementById("objectCount");

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    if (percent) {
        percent.textContent = progress + "%";
    }

    const messageIndex = Math.min(
        Math.floor(progress / 14),
        statusMessages.length - 1
    );

    if (status) {
        status.textContent = statusMessages[messageIndex];
    }

    /*
       Simulated scan information.
       This is prototype data until native LiDAR/RoomPlan
       is connected.
    */

    if (rooms) {
        rooms.textContent = Math.max(
            1,
            Math.floor(progress / 12)
        );
    }

    if (objects) {
        objects.textContent = Math.floor(progress * 0.8);
    }
}


function finishScan() {
    const rooms = Math.max(
        1,
        Math.floor(Math.random() * 7) + 4
    );

    const objects = Math.floor(
        Math.random() * 80
    ) + 40;

    const squareFeet = Math.floor(
        Math.random() * 1800
    ) + 900;

    currentScan = {
        id: "scan-" + Date.now(),
        date: new Date().toISOString(),
        rooms: rooms,
        objects: objects,
        squareFeet: squareFeet,
        modelVersion: 1
    };

    currentViewingScan = currentScan;

    const resultRooms = document.getElementById("modelRooms");
    const resultObjects = document.getElementById("modelObjects");
    const resultSize = document.getElementById("modelSize");

    if (resultRooms) {
        resultRooms.textContent = rooms;
    }

    if (resultObjects) {
        resultObjects.textContent = objects;
    }

    if (resultSize) {
        resultSize.textContent =
            squareFeet.toLocaleString() + " sq ft";
    }

    lastModelSource =
        currentPropertyId
            ? "propertyScreen"
            : "dashboardScreen";

    showScreen("modelScreen");
}


/* =========================================================
   SAVE SCAN
   ========================================================= */

function saveScan() {
    if (!currentScan) {
        alert("There is no scan to save.");
        return;
    }

    const properties = getProperties();

    let property;

    if (currentPropertyId) {
        property = properties.find(
            item => item.id === currentPropertyId
        );
    }

    /*
       Create a new property if this was a new scan.
    */

    if (!property) {
        property = {
            id: "property-" + Date.now(),
            name:
                currentScan.newPropertyName ||
                "New Property",
            createdAt: new Date().toISOString(),
            scans: []
        };

        currentPropertyId = property.id;

        properties.unshift(property);
    }

    /*
       Remove temporary property-name information.
    */

    const scanToSave = {
        id: currentScan.id,
        date: currentScan.date,
        rooms: currentScan.rooms,
        objects: currentScan.objects,
        squareFeet: currentScan.squareFeet,
        modelVersion: currentScan.modelVersion
    };

    property.scans.unshift(scanToSave);

    saveProperties(properties);

    currentScan = scanToSave;
    currentViewingScan = scanToSave;

    renderAllProperties();
    displaySavedScans();
    renderPropertyDetails();

    alert("Scan saved to " + property.name + ".");

    showScreen("propertyScreen");
}


/* =========================================================
   MY SCANS
   ========================================================= */

function renderAllProperties() {
    const container = document.getElementById("allProperties");

    if (!container) {
        return;
    }

    const properties = getProperties();

    if (properties.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No properties yet</h3>
                <p>Create your first property scan to get started.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = properties.map(property => {

        const latestScan =
            property.scans && property.scans.length
                ? property.scans[0]
                : null;

        const dateText = latestScan
            ? formatDate(latestScan.date)
            : "No scans";

        const scanCount =
            property.scans
                ? property.scans.length
                : 0;

        return `
            <div class="property-card"
                 onclick="openProperty('${property.id}')">

                <div class="property-card-icon">
                    ◈
                </div>

                <div class="property-card-info">
                    <h3>${escapeHTML(property.name)}</h3>

                    <p>
                        ${scanCount}
                        ${scanCount === 1 ? "scan" : "scans"}
                    </p>

                    <span>
                        Last scanned: ${dateText}
                    </span>
                </div>

                <div class="property-card-arrow">
                    →
                </div>

            </div>
        `;
    }).join("");
}


function displaySavedScans() {
    const container = document.getElementById("savedScans");

    if (!container) {
        return;
    }

    const properties = getProperties();

    if (properties.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Your saved properties will appear here.</p>
            </div>
        `;
        return;
    }

    const recentProperties = properties.slice(0, 3);

    container.innerHTML = recentProperties.map(property => {

        const latestScan =
            property.scans &&
            property.scans.length
                ? property.scans[0]
                : null;

        return `
            <div class="property-card"
                 onclick="openProperty('${property.id}')">

                <div class="property-card-icon">
                    ◈
                </div>

                <div class="property-card-info">
                    <h3>${escapeHTML(property.name)}</h3>

                    <p>
                        ${property.scans.length}
                        scan${property.scans.length === 1 ? "" : "s"}
                    </p>

                    <span>
                        ${latestScan
                            ? formatDate(latestScan.date)
                            : "No scans"}
                    </span>
                </div>

                <div class="property-card-arrow">
                    →
                </div>

            </div>
        `;
    }).join("");
}


/* =========================================================
   PROPERTY DETAILS
   ========================================================= */

function openProperty(propertyId) {
    currentPropertyId = propertyId;

    renderPropertyDetails();

    showScreen("propertyScreen");
}


function renderPropertyDetails() {
    if (!currentPropertyId) {
        return;
    }

    const properties = getProperties();

    const property = properties.find(
        item => item.id === currentPropertyId
    );

    if (!property) {
        return;
    }

    const title = document.getElementById("propertyTitle");
    const subtitle = document.getElementById("propertySubtitle");
    const nameDisplay = document.getElementById("propertyNameDisplay");
    const stats = document.getElementById("propertyStats");
    const history = document.getElementById("propertyScanHistory");

    if (title) {
        title.textContent = property.name;
    }

    if (subtitle) {
        subtitle.textContent =
            property.scans.length +
            (property.scans.length === 1
                ? " saved scan"
                : " saved scans");
    }

    if (nameDisplay) {
        nameDisplay.textContent = property.name;
    }

    const latest = property.scans[0];

    if (stats) {
        if (latest) {
            stats.innerHTML = `
                <div>
                    <strong>${latest.rooms}</strong>
                    <span>Rooms</span>
                </div>

                <div>
                    <strong>${latest.objects}</strong>
                    <span>Objects</span>
                </div>

                <div>
                    <strong>${latest.squareFeet.toLocaleString()}</strong>
                    <span>Sq Ft</span>
                </div>
            `;
        } else {
            stats.innerHTML = "";
        }
    }

    if (history) {
        if (!property.scans.length) {
            history.innerHTML = `
                <div class="empty-state">
                    <p>No scans have been saved for this property.</p>
                </div>
            `;
        } else {
            history.innerHTML = property.scans.map(
                (scan, index) => `
                    <div class="history-card">

                        <div class="history-date">
                            ${formatDate(scan.date)}
                        </div>

                        <div class="history-info">
                            <span>
                                ${scan.rooms} rooms
                            </span>

                            <span>
                                ${scan.objects} objects
                            </span>

                            <span>
                                ${scan.squareFeet.toLocaleString()} sq ft
                            </span>
                        </div>

                        <button
                            class="secondary-button"
                            onclick="viewHistoricalScan('${property.id}', '${scan.id}')">

                            ${index === 0
                                ? "VIEW 3D MODEL"
                                : "VIEW HISTORICAL MODEL"}

                        </button>

                    </div>
                `
            ).join("");
        }
    }

    updatePropertyAI(property);
}


/* =========================================================
   PROPERTY AI
   ========================================================= */

function updatePropertyAI(property) {
    const changeSummary =
        document.getElementById("changeSummary");

    const maintenanceSummary =
        document.getElementById("maintenanceSummary");

    const propertyAISummary =
        document.getElementById("propertyAISummary");

    const premium = isPremium();

    if (!premium) {
        if (changeSummary) {
            changeSummary.textContent =
                "Premium feature — compare scans from different dates.";
        }

        if (maintenanceSummary) {
            maintenanceSummary.textContent =
                "Premium feature — get AI-generated maintenance suggestions.";
        }

        if (propertyAISummary) {
            propertyAISummary.textContent =
                "Premium unlocks detailed property intelligence.";
        }

        return;
    }

    if (!property.scans || property.scans.length === 0) {
        return;
    }

    const latest = property.scans[0];

    if (property.scans.length >= 2) {
        const previous = property.scans[1];

        const roomDifference =
            latest.rooms - previous.rooms;

        const objectDifference =
            latest.objects - previous.objects;

        let roomText =
            roomDifference === 0
                ? "The room count is unchanged."
                : roomDifference > 0
                    ? `The latest scan identifies ${roomDifference} additional room${roomDifference === 1 ? "" : "s"}.`
                    : `The latest scan identifies ${Math.abs(roomDifference)} fewer room${Math.abs(roomDifference) === 1 ? "" : "s"}.`;

        let objectText =
            objectDifference === 0
                ? "Object detection is similar."
                : objectDifference > 0
                    ? `The scan detected approximately ${objectDifference} more objects.`
                    : `The scan detected approximately ${Math.abs(objectDifference)} fewer objects.`;

        if (changeSummary) {
            changeSummary.innerHTML = `
                <strong>AI Change Summary</strong>
                <p>
                    ${roomText}
                    ${objectText}
                    Review the historical 3D models for a closer comparison.
                </p>
            `;
        }
    } else {
        if (changeSummary) {
            changeSummary.innerHTML = `
                <strong>AI Change Summary</strong>
                <p>
                    Complete another scan of this property to unlock
                    date-to-date change analysis.
                </p>
            `;
        }
    }

    if (maintenanceSummary) {
        maintenanceSummary.innerHTML = `
            <strong>AI Maintenance Check</strong>
            <p>
                Review walls, doors, windows, fixtures, and other
                property elements during your next inspection.
                DOLLHOUSE can organize areas that may need attention.
            </p>
        `;
    }

    if (propertyAISummary) {
        propertyAISummary.innerHTML = `
            <strong>AI Property Summary</strong>
            <p>
                ${latest.rooms} rooms and approximately
                ${latest.squareFeet.toLocaleString()} square feet
                were identified in the latest scan.
                Use historical scans to monitor the property over time.
            </p>
        `;
    }
}


function unlockPremiumAI() {
    showScreen("premiumScreen");
}


/* =========================================================
   HISTORICAL SCANS
   ========================================================= */

function viewHistoricalScan(propertyId, scanId) {

    if (!isPremium()) {
        alert(
            "Historical scan viewing and property comparison are Premium features."
        );

        showScreen("premiumScreen");
        return;
    }

    const properties = getProperties();

    const property = properties.find(
        item => item.id === propertyId
    );

    if (!property) {
        return;
    }

    const scan = property.scans.find(
        item => item.id === scanId
    );

    if (!scan) {
        return;
    }

    currentPropertyId = propertyId;
    currentViewingScan = scan;

    lastModelSource = "propertyScreen";

    updateModelScreen(property, scan);

    showScreen("modelScreen");
}


function updateModelScreen(property, scan) {
    const modelTitle =
        document.getElementById("modelTitle");

    const modelDate =
        document.getElementById("modelDate");

    const modelRooms =
        document.getElementById("modelRooms");

    const modelObjects =
        document.getElementById("modelObjects");

    const modelSize =
        document.getElementById("modelSize");

    if (modelTitle) {
        modelTitle.textContent =
            property.name + " — 3D Model";
    }

    if (modelDate) {
        modelDate.textContent =
            formatDate(scan.date);
    }

    if (modelRooms) {
        modelRooms.textContent = scan.rooms;
    }

    if (modelObjects) {
        modelObjects.textContent = scan.objects;
    }

    if (modelSize) {
        modelSize.textContent =
            scan.squareFeet.toLocaleString() +
            " sq ft";
    }
}


/* =========================================================
   DELETE SCAN
   ========================================================= */

function deleteCurrentScan() {

    if (
        currentPropertyId &&
        currentViewingScan &&
        isPremium()
    ) {
        const confirmDelete = confirm(
            "Delete this saved scan?"
        );

        if (!confirmDelete) {
            return;
        }

        const properties = getProperties();

        const property = properties.find(
            item => item.id === currentPropertyId
        );

        if (property) {
            property.scans =
                property.scans.filter(
                    scan =>
                        scan.id !==
                        currentViewingScan.id
                );

            saveProperties(properties);

            currentViewingScan = null;

            renderPropertyDetails();
            displaySavedScans();

            showScreen("propertyScreen");

            return;
        }
    }

    currentScan = null;
    currentViewingScan = null;

    showScreen(
        currentPropertyId
            ? "propertyScreen"
            : "dashboardScreen"
    );
}


function deleteScan(scanId) {
    const properties = getProperties();

    let changed = false;

    properties.forEach(property => {
        const originalLength =
            property.scans.length;

        property.scans =
            property.scans.filter(
                scan => scan.id !== scanId
            );

        if (
            property.scans.length !==
            originalLength
        ) {
            changed = true;
        }
    });

    if (changed) {
        saveProperties(properties);
        displaySavedScans();
        renderAllProperties();
    }
}


/* =========================================================
   CANCEL SCAN
   ========================================================= */

function cancelScan() {
    if (scanTimer) {
        clearInterval(scanTimer);
        scanTimer = null;
    }

    currentScan = null;

    showScreen(
        currentPropertyId
            ? "propertyScreen"
            : "dashboardScreen"
    );
}


/* =========================================================
   SCAN HELP
   ========================================================= */

function showScanHelp() {
    alert(
        "Move slowly through the property while the scanner captures the space. " +
        "The current GitHub prototype simulates the scanning process. " +
        "Native LiDAR scanning will be connected in a future version."
    );
}


/* =========================================================
   PREMIUM
   ========================================================= */

function selectSubscription(plan) {
    selectedSubscription = plan;

    document
        .querySelectorAll(".subscription-card")
        .forEach(card => {
            card.classList.remove("selected");
        });

    const selectedCard =
        document.querySelector(
            `[data-plan="${plan}"]`
        );

    if (selectedCard) {
        selectedCard.classList.add("selected");
    }

    const subscribeButton =
        document.getElementById("subscribeButton");

    if (subscribeButton) {
        const names = {
            weekly: "WEEKLY — $4.99",
            monthly: "MONTHLY — $14.99",
            yearly: "YEARLY — $249.99"
        };

        subscribeButton.textContent =
            "CONTINUE WITH " + names[plan];
    }
}


function activatePremium() {
    if (!selectedSubscription) {
        alert("Please select a subscription plan first.");
        return;
    }

    /*
       Prototype-only activation.
       No real payment is processed.
    */

    localStorage.setItem(
        "dollhousePremium",
        "true"
    );

    localStorage.setItem(
        "dollhousePlan",
        selectedSubscription
    );

    updateProfile();

    alert(
        "Premium activated for this prototype."
    );

    showScreen("dashboardScreen");
}


function isPremium() {
    return (
        localStorage.getItem(
            "dollhousePremium"
        ) === "true"
    );
}


/* =========================================================
   PROFILE
   ========================================================= */

function updateProfile() {
    const email =
        localStorage.getItem("dollhouseEmail");

    const profileEmail =
        document.getElementById("profileEmail");

    const profilePlan =
        document.getElementById("profilePlan");

    if (profileEmail) {
        profileEmail.textContent =
            email || "Not signed in";
    }

    if (profilePlan) {
        if (isPremium()) {
            const plan =
                localStorage.getItem("dollhousePlan");

            profilePlan.textContent =
                "DOLLHOUSE Premium — " +
                (plan || "Active");
        } else {
            profilePlan.textContent =
                "Free Plan";
        }
    }
}


/* =========================================================
   PROPERTY SEARCH
   ========================================================= */

function filterProperties() {
    const searchInput =
        document.getElementById("propertySearch");

    const container =
        document.getElementById("allProperties");

    if (!searchInput || !container) {
        return;
    }

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const properties = getProperties();

    const filtered =
        properties.filter(property =>
            property.name
                .toLowerCase()
                .includes(searchTerm)
        );

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No properties match your search.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(property => {

        const latestScan =
            property.scans[0];

        return `
            <div class="property-card"
                 onclick="openProperty('${property.id}')">

                <div class="property-card-icon">
                    ◈
                </div>

                <div class="property-card-info">

                    <h3>
                        ${escapeHTML(property.name)}
                    </h3>

                    <p>
                        ${property.scans.length}
                        scan${property.scans.length === 1 ? "" : "s"}
                    </p>

                    <span>
                        ${latestScan
                            ? "Last scanned: " +
                              formatDate(latestScan.date)
                            : "No scans"}
                    </span>

                </div>

                <div class="property-card-arrow">
                    →
                </div>

            </div>
        `;
    }).join("");
}


/* =========================================================
   AI ASSISTANT
   ========================================================= */

function sendMessage() {
    const input =
        document.getElementById("aiInput");

    const messages =
        document.getElementById("chatMessages");

    if (!input || !messages) {
        return;
    }

    const message =
        input.value.trim();

    if (!message) {
        return;
    }

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "chat-message user-message";

    userMessage.textContent = message;

    messages.appendChild(userMessage);

    input.value = "";

    setTimeout(() => {

        const response =
            generateAIResponse(message);

        const aiMessage =
            document.createElement("div");

        aiMessage.className =
            "chat-message ai-message";

        aiMessage.textContent = response;

        messages.appendChild(aiMessage);

        messages.scrollTop =
            messages.scrollHeight;

    }, 500);
}


function handleChatKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}


function generateAIResponse(message) {
    const text =
        message.toLowerCase();

    if (
        text.includes("maintenance") ||
        text.includes("fix") ||
        text.includes("repair")
    ) {
        return "I can help organize potential maintenance areas by property, room, and scan date. Premium property intelligence can also track changes between scans.";
    }

    if (
        text.includes("scan") ||
        text.includes("lidar")
    ) {
        return "DOLLHOUSE is designed to scan an entire property and turn the captured spatial information into an interactive 3D model. The current GitHub version uses a simulated scanner.";
    }

    if (
        text.includes("compare") ||
        text.includes("change")
    ) {
        return isPremium()
            ? "Open a property to compare its saved scan history and review the AI change summary."
            : "Scan comparison is a Premium feature.";
    }

    if (
        text.includes("property") ||
        text.includes("house")
    ) {
        return "Open My Scans to organize properties and view their scan history.";
    }

    return "I can help with property scans, 3D models, maintenance organization, scan history, and DOLLHOUSE features.";
}


/* =========================================================
   SETTINGS
   ========================================================= */

function resetAppData() {
    const confirmed = confirm(
        "This will delete your saved DOLLHOUSE prototype data. Continue?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "dollhouseProperties"
    );

    localStorage.removeItem(
        "dollhouseScans"
    );

    localStorage.removeItem(
        "dollhousePremium"
    );

    localStorage.removeItem(
        "dollhousePlan"
    );

    alert("DOLLHOUSE data has been reset.");

    location.reload();
}


/* =========================================================
   UTILITIES
   ========================================================= */

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   INITIALIZE APP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const signedIn =
            localStorage.getItem(
                "dollhouseSignedIn"
            ) === "true";

        updateProfile();
        displaySavedScans();
        renderAllProperties();

        /*
           Make the model screen's back button
           return to the property when viewing
           a historical scan.
        */

        const modelBackButton =
            document.querySelector(
                "#modelScreen .back-button"
            );

        if (modelBackButton) {
            modelBackButton.onclick = () => {
                showScreen(lastModelSource);
            };
        }

        if (signedIn) {
            showScreen("dashboardScreen");
        } else {
            showScreen("welcomeScreen");
        }
    }
);
