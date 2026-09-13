/* =========================================================
   DOLLHOUSE
   Main JavaScript
   ========================================================= */


/* =========================================================
   APP STATE
   ========================================================= */

let scanTimer = null;

let currentScan = null;
let currentPropertyId = null;
let currentViewingScan = null;

let selectedSubscription = null;


/* =========================================================
   SCREEN NAVIGATION
   ========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(screenId);

    if (!screen) {
        console.error("Screen not found:", screenId);
        return;
    }

    screen.classList.add("active");

    closeMenu();

    // Refresh information when entering certain screens
    if (screenId === "dashboardScreen") {
        updateProfile();
        displaySavedScans();
    }

    if (screenId === "scansScreen") {
        renderAllProperties();
    }

    if (screenId === "propertyScreen") {
        renderPropertyDetails();
    }

    if (screenId === "profileScreen") {
        updateProfile();
    }
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


function navigateFromMenu(screenId) {

    closeMenu();
    showScreen(screenId);
}


/* =========================================================
   ACCOUNT CREATION
   ========================================================= */

function createAccount() {

    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const termsInput = document.getElementById("termsCheckbox");

    const email = emailInput
        ? emailInput.value.trim()
        : "";

    const password = passwordInput
        ? passwordInput.value
        : "";

    const termsAccepted = termsInput
        ? termsInput.checked
        : false;


    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Password validation
    if (password.length < 8) {

        alert(
            "Your password must be at least 8 characters."
        );

        return;
    }


    // Terms validation
    if (!termsAccepted) {

        alert(
            "Please accept the Terms & Conditions."
        );

        return;
    }


    // Save account
    localStorage.setItem(
        "dollhouseSignedIn",
        "true"
    );

    localStorage.setItem(
        "dollhouseEmail",
        email
    );


    // Make sure a new account starts FREE
    if (
        localStorage.getItem("dollhousePremium") === null
    ) {

        localStorage.setItem(
            "dollhousePremium",
            "false"
        );
    }


    updateProfile();

    showScreen("dashboardScreen");
}


/* =========================================================
   LOG OUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        "dollhouseSignedIn"
    );

    showScreen("welcomeScreen");
}


/* =========================================================
   PREMIUM / SUBSCRIPTION
   ========================================================= */

function isPremium() {

    return (
        localStorage.getItem(
            "dollhousePremium"
        ) === "true"
    );
}


function selectSubscription(plan) {

    selectedSubscription = plan;

    const cards =
        document.querySelectorAll(
            ".subscription-card"
        );

    cards.forEach(card => {
        card.classList.remove("selected");
    });


    // Current HTML order:
    // 0 = Weekly
    // 1 = Monthly
    // 2 = Yearly

    const planIndexes = {
        weekly: 0,
        monthly: 1,
        yearly: 2
    };

    const selectedIndex =
        planIndexes[plan];


    if (
        selectedIndex !== undefined &&
        cards[selectedIndex]
    ) {

        cards[selectedIndex]
            .classList.add("selected");
    }


    const subscribeButton =
        document.getElementById(
            "subscribeButton"
        );

    if (subscribeButton) {

        subscribeButton.textContent =
            "ACTIVATE PREMIUM";
    }
}


function activatePremium() {

    if (!selectedSubscription) {

        alert(
            "Please choose a subscription plan first."
        );

        return;
    }


    // Save Premium status
    localStorage.setItem(
        "dollhousePremium",
        "true"
    );


    // Save which plan was selected
    localStorage.setItem(
        "dollhouseSubscription",
        selectedSubscription
    );


    // Update FREE/PREMIUM everywhere
    updateProfile();


    alert(
        "Premium activated!"
    );


    // Return to home
    showScreen("dashboardScreen");
}


/* =========================================================
   PROFILE + CURRENT PLAN
   ========================================================= */

function updateProfile() {

    const email =
        localStorage.getItem(
            "dollhouseEmail"
        ) || "Account";


    const premium = isPremium();


    /* ---------- PROFILE SCREEN ---------- */

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePlan =
        document.getElementById(
            "profilePlan"
        );


    if (profileEmail) {

        profileEmail.textContent =
            email;
    }


    if (profilePlan) {

        profilePlan.textContent =
            premium
                ? "PREMIUM PLAN"
                : "FREE PLAN";
    }


    /* ---------- HOME / DASHBOARD ---------- */

    const dashboardPlan =
        document.getElementById(
            "dashboardPlan"
        );


    if (dashboardPlan) {

        dashboardPlan.textContent =
            premium
                ? "PREMIUM"
                : "FREE";
    }
}


/* =========================================================
   PROPERTY DATA
   ========================================================= */

function getProperties() {

    const saved =
        localStorage.getItem(
            "dollhouseProperties"
        );


    if (!saved) {

        return [];
    }


    try {

        const properties =
            JSON.parse(saved);


        if (!Array.isArray(properties)) {

            return [];
        }


        return properties.map(property => {

            if (!property.scans) {

                property.scans = [];
            }

            return property;
        });


    } catch (error) {

        console.error(
            "Could not load properties:",
            error
        );

        return [];
    }
}


function saveProperties(properties) {

    localStorage.setItem(
        "dollhouseProperties",
        JSON.stringify(properties)
    );
}


/* =========================================================
   START SCAN
   ========================================================= */

function startScan(propertyId = null) {

    currentPropertyId =
        propertyId || null;


    if (!currentPropertyId) {

        const propertyName =
            prompt(
                "Enter a name for this property:"
            );


        if (!propertyName) {

            return;
        }


        const properties =
            getProperties();


        const newProperty = {

            id:
                Date.now().toString(),

            name:
                propertyName.trim(),

            createdAt:
                new Date().toISOString(),

            scans: []
        };


        properties.push(
            newProperty
        );


        saveProperties(
            properties
        );


        currentPropertyId =
            newProperty.id;
    }


    resetScanner();

    showScreen("scannerScreen");

    setTimeout(
        beginScanning,
        500
    );
}


/* =========================================================
   RESET SCANNER
   ========================================================= */

function resetScanner() {

    if (scanTimer) {

        clearInterval(
            scanTimer
        );

        scanTimer = null;
    }


    currentScan = {

        rooms: 0,

        objects: 0,

        size: 0,

        progress: 0
    };


    const percentage =
        document.getElementById(
            "scanPercentage"
        );

    const progress =
        document.getElementById(
            "scanProgress"
        );

    const status =
        document.getElementById(
            "scanStatus"
        );

    const instructions =
        document.getElementById(
            "scanInstructions"
        );

    const rooms =
        document.getElementById(
            "roomCount"
        );

    const objects =
        document.getElementById(
            "objectCount"
        );


    if (percentage) {

        percentage.textContent =
            "0%";
    }


    if (progress) {

        progress.style.width =
            "0%";
    }


    if (status) {

        status.textContent =
            "Preparing Scanner";
    }


    if (instructions) {

        instructions.textContent =
            "Move slowly around the property.";
    }


    if (rooms) {

        rooms.textContent =
            "ROOMS: 0";
    }


    if (objects) {

        objects.textContent =
            "OBJECTS: 0";
    }
}


/* =========================================================
   BEGIN SCANNING
   ========================================================= */

function beginScanning() {

    if (!currentScan) {

        resetScanner();
    }


    const status =
        document.getElementById(
            "scanStatus"
        );

    const instructions =
        document.getElementById(
            "scanInstructions"
        );


    if (status) {

        status.textContent =
            "Scanning Property";
    }


    if (instructions) {

        instructions.textContent =
            "Move slowly around the property.";
    }


    let progress = 0;


    scanTimer =
        setInterval(() => {

            progress += 2;


            if (progress > 100) {

                progress = 100;
            }


            updateScanner(
                progress
            );


            if (progress >= 100) {

                clearInterval(
                    scanTimer
                );

                scanTimer = null;

                finishScan();
            }

        }, 100);
}


/* =========================================================
   UPDATE SCANNER
   ========================================================= */

function updateScanner(progress) {

    if (!currentScan) {

        currentScan = {};
    }


    currentScan.progress =
        progress;


    // Simulated room/object discovery
    const rooms =
        Math.max(
            1,
            Math.floor(
                progress / 25
            )
        );


    const objects =
        Math.floor(
            progress * 0.8
        );


    currentScan.rooms =
        rooms;

    currentScan.objects =
        objects;


    currentScan.size =
        Math.round(
            800 + progress * 15
        );


    const percentage =
        document.getElementById(
            "scanPercentage"
        );

    const progressBar =
        document.getElementById(
            "scanProgress"
        );

    const roomCount =
        document.getElementById(
            "roomCount"
        );

    const objectCount =
        document.getElementById(
            "objectCount"
        );


    if (percentage) {

        percentage.textContent =
            `${progress}%`;
    }


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;
    }


    if (roomCount) {

        roomCount.textContent =
            `ROOMS: ${rooms}`;
    }


    if (objectCount) {

        objectCount.textContent =
            `OBJECTS: ${objects}`;
    }
}


/* =========================================================
   FINISH SCAN
   ========================================================= */

function finishScan() {

    const status =
        document.getElementById(
            "scanStatus"
        );

    const instructions =
        document.getElementById(
            "scanInstructions"
        );


    if (status) {

        status.textContent =
            "Scan Complete";
    }


    if (instructions) {

        instructions.textContent =
            "Your property model is ready.";
    }


    if (!currentScan) {

        currentScan = {

            rooms: 1,

            objects: 0,

            size: 800,

            progress: 100
        };
    }


    currentScan.date =
        new Date().toISOString();


    currentScan.id =
        Date.now().toString();


    updateModelScreen();

    showScreen("modelScreen");
}


/* =========================================================
   UPDATE MODEL SCREEN
   ========================================================= */

function updateModelScreen() {

    const finalRooms =
        document.getElementById(
            "finalRooms"
        );

    const finalObjects =
        document.getElementById(
            "finalObjects"
        );


    if (!currentScan) {

        return;
    }


    if (finalRooms) {

        finalRooms.textContent =
            currentScan.rooms || 1;
    }


    if (finalObjects) {

        finalObjects.textContent =
            currentScan.objects || 0;
    }
}


/* =========================================================
   SAVE SCAN
   ========================================================= */

function saveScan() {

    if (!currentScan) {

        alert(
            "There is no scan to save."
        );

        return;
    }


    const properties =
        getProperties();


    let property =
        properties.find(
            p =>
                p.id ===
                currentPropertyId
        );


    if (!property) {

        const propertyName =
            prompt(
                "Enter a property name:"
            );


        if (!propertyName) {

            return;
        }


        property = {

            id:
                Date.now().toString(),

            name:
                propertyName.trim(),

            createdAt:
                new Date().toISOString(),

            scans: []
        };


        properties.push(
            property
        );


        currentPropertyId =
            property.id;
    }


    if (!property.scans) {

        property.scans = [];
    }


    const scanToSave = {

        ...currentScan,

        id:
            currentScan.id ||
            Date.now().toString(),

        date:
            currentScan.date ||
            new Date().toISOString(),

        propertyId:
            property.id
    };


    property.scans.push(
        scanToSave
    );


    saveProperties(
        properties
    );


    currentScan =
        scanToSave;


    alert(
        "Scan saved successfully!"
    );


    renderAllProperties();

    displaySavedScans();

    showScreen(
        "propertyScreen"
    );
}


/* =========================================================
   RENDER ALL PROPERTIES
   ========================================================= */

function renderAllProperties() {

    const container =
        document.getElementById(
            "allProperties"
        );


    if (!container) {

        return;
    }


    const properties =
        getProperties();


    if (properties.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No properties yet.
            </p>
        `;

        return;
    }


    container.innerHTML =
        properties.map(
            property => {

                const scanCount =
                    property.scans
                        ? property.scans.length
                        : 0;


                return `
                    <div
                        class="property-card"
                        onclick="openProperty('${property.id}')"
                    >

                        <div>
                            <h3>
                                ${escapeHTML(property.name)}
                            </h3>

                            <p>
                                ${scanCount}
                                ${scanCount === 1 ? "scan" : "scans"}
                            </p>
                        </div>

                        <span>
                            →
                        </span>

                    </div>
                `;
            }
        ).join("");
}


/* =========================================================
   DASHBOARD SAVED SCANS
   ========================================================= */

function displaySavedScans() {

    const container =
        document.getElementById(
            "savedScans"
        );


    if (!container) {

        return;
    }


    const properties =
        getProperties();


    const scans = [];


    properties.forEach(
        property => {

            if (
                property.scans &&
                property.scans.length
            ) {

                property.scans.forEach(
                    scan => {

                        scans.push({

                            ...scan,

                            propertyName:
                                property.name
                        });
                    }
                );
            }
        }
    );


    if (scans.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No saved scans yet.
            </p>
        `;

        return;
    }


    // Show newest scans first
    scans.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    container.innerHTML =
        scans
            .slice(0, 3)
            .map(
                scan => `
                    <div
                        class="saved-scan-card"
                        onclick="viewHistoricalScan('${scan.propertyId}', '${scan.id}')"
                    >

                        <div>

                            <h3>
                                ${escapeHTML(scan.propertyName)}
                            </h3>

                            <p>
                                ${formatDate(scan.date)}
                            </p>

                        </div>

                        <span>
                            →
                        </span>

                    </div>
                `
            )
            .join("");
}


/* =========================================================
   OPEN PROPERTY
   ========================================================= */

function openProperty(propertyId) {

    currentPropertyId =
        propertyId;

    renderPropertyDetails();

    showScreen(
        "propertyScreen"
    );
}


/* =========================================================
   PROPERTY DETAILS
   ========================================================= */

function renderPropertyDetails() {

    const properties =
        getProperties();


    const property =
        properties.find(
            p =>
                p.id ===
                currentPropertyId
        );


    if (!property) {

        return;
    }


    const scans =
        property.scans || [];


    const propertyTitle =
        document.getElementById(
            "propertyTitle"
        );

    const propertySubtitle =
        document.getElementById(
            "propertySubtitle"
        );

    const propertyNameDisplay =
        document.getElementById(
            "propertyNameDisplay"
        );

    const propertyStats =
        document.getElementById(
            "propertyStats"
        );

    const history =
        document.getElementById(
            "propertyScanHistory"
        );


    if (propertyTitle) {

        propertyTitle.textContent =
            property.name;
    }


    if (propertySubtitle) {

        propertySubtitle.textContent =
            "Property history";
    }


    if (propertyNameDisplay) {

        propertyNameDisplay.textContent =
            property.name;
    }


    if (propertyStats) {

        propertyStats.textContent =
            `${scans.length} ${
                scans.length === 1
                    ? "scan"
                    : "scans"
            } saved`;
    }


    if (!history) {

        return;
    }


    if (scans.length === 0) {

        history.innerHTML = `
            <p class="empty-message">
                No scan history.
            </p>
        `;

        return;
    }


    history.innerHTML =
        scans
            .slice()
            .reverse()
            .map(
                scan => `
                    <div
                        class="history-card"
                        onclick="viewHistoricalScan('${property.id}', '${scan.id}')"
                    >

                        <div>

                            <strong>
                                ${formatDate(scan.date)}
                            </strong>

                            <p>
                                ${scan.rooms || 0} rooms
                                ·
                                ${scan.objects || 0} objects
                            </p>

                        </div>

                        <span>
                            →
                        </span>

                    </div>
                `
            )
            .join("");


    updatePropertyAI(
        property,
        scans
    );
}


/* =========================================================
   PROPERTY AI SUMMARY
   ========================================================= */

function updatePropertyAI(
    property,
    scans
) {

    const changeSummary =
        document.getElementById(
            "changeSummary"
        );

    const maintenanceSummary =
        document.getElementById(
            "maintenanceSummary"
        );

    const propertyAISummary =
        document.getElementById(
            "propertyAISummary"
        );


    if (!property || !scans) {

        return;
    }


    if (scans.length < 2) {

        if (changeSummary) {

            changeSummary.textContent =
                "Save another scan to compare changes over time.";
        }

    } else {

        if (changeSummary) {

            changeSummary.textContent =
                "DOLLHOUSE can compare historical scans to identify changes between property scans.";
        }
    }


    if (maintenanceSummary) {

        maintenanceSummary.textContent =
            "AI maintenance suggestions will be generated from property scan data.";
    }


    if (propertyAISummary) {

        if (isPremium()) {

            propertyAISummary.textContent =
                "Premium AI property analysis is available for this property.";

        } else {

            propertyAISummary.textContent =
                "Upgrade to Premium to unlock advanced AI property analysis.";
        }
    }
}


/* =========================================================
   VIEW HISTORICAL SCAN
   ========================================================= */

function viewHistoricalScan(
    propertyId,
    scanId
) {

    const properties =
        getProperties();


    const property =
        properties.find(
            p =>
                p.id ===
                propertyId
        );


    if (!property) {

        return;
    }


    const scan =
        (property.scans || [])
            .find(
                s =>
                    s.id ===
                    scanId
            );


    if (!scan) {

        return;
    }


    currentPropertyId =
        propertyId;

    currentViewingScan =
        scan;

    currentScan =
        scan;


    updateModelScreen();

    showScreen(
        "modelScreen"
    );
}


/* =========================================================
   DELETE CURRENT SCAN
   ========================================================= */

function deleteCurrentScan() {

    if (!currentScan) {

        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this scan?"
        );


    if (!confirmed) {

        return;
    }


    deleteScan(
        currentPropertyId,
        currentScan.id
    );
}


/* =========================================================
   DELETE SCAN
   ========================================================= */

function deleteScan(
    propertyId,
    scanId
) {

    const properties =
        getProperties();


    const property =
        properties.find(
            p =>
                p.id ===
                propertyId
        );


    if (!property) {

        return;
    }


    property.scans =
        (property.scans || [])
            .filter(
                scan =>
                    scan.id !==
                    scanId
            );


    saveProperties(
        properties
    );


    currentScan = null;
    currentViewingScan = null;


    renderAllProperties();

    displaySavedScans();


    alert(
        "Scan deleted."
    );


    showScreen(
        "dashboardScreen"
    );
}


/* =========================================================
   CANCEL SCAN
   ========================================================= */

function cancelScan() {

    if (scanTimer) {

        clearInterval(
            scanTimer
        );

        scanTimer = null;
    }


    currentScan = null;


    showScreen(
        "dashboardScreen"
    );
}


/* =========================================================
   SCAN HELP
   ========================================================= */

function showScanHelp() {

    alert(
        "Move slowly around the property while scanning. " +
        "Keep the device pointed toward walls, floors, ceilings, " +
        "and objects so DOLLHOUSE can build the property model.\n\n" +
        "This web prototype uses a simulated scanner. " +
        "Real Apple LiDAR/RoomPlan scanning will be added in the native iPad version."
    );
}


/* =========================================================
   SEARCH PROPERTIES
   ========================================================= */

function filterProperties() {

    const searchInput =
        document.getElementById(
            "propertySearch"
        );


    const container =
        document.getElementById(
            "allProperties"
        );


    if (!searchInput || !container) {

        return;
    }


    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const properties =
        getProperties();


    const filtered =
        properties.filter(
            property =>
                property.name
                    .toLowerCase()
                    .includes(search)
        );


    if (filtered.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                No properties found.
            </p>
        `;

        return;
    }


    container.innerHTML =
        filtered
            .map(
                property => {

                    const scanCount =
                        property.scans
                            ? property.scans.length
                            : 0;


                    return `
                        <div
                            class="property-card"
                            onclick="openProperty('${property.id}')"
                        >

                            <div>

                                <h3>
                                    ${escapeHTML(property.name)}
                                </h3>

                                <p>
                                    ${scanCount}
                                    ${scanCount === 1 ? "scan" : "scans"}
                                </p>

                            </div>

                            <span>
                                →
                            </span>

                        </div>
                    `;
                }
            )
            .join("");
}


/* =========================================================
   AI CHAT
   ========================================================= */

function handleChatKey(event) {

    if (
        event.key === "Enter"
    ) {

        sendMessage();
    }
}


function sendMessage() {

    const input =
        document.getElementById(
            "chatInput"
        );


    const messages =
        document.getElementById(
            "aiMessages"
        );


    if (!input || !messages) {

        return;
    }


    const message =
        input.value.trim();


    if (!message) {

        return;
    }


    // User message
    const userMessage =
        document.createElement(
            "div"
        );


    userMessage.className =
        "user-message";


    userMessage.innerHTML =
        `<p>${escapeHTML(message)}</p>`;


    messages.appendChild(
        userMessage
    );


    input.value = "";


    // AI response
    setTimeout(() => {

        const aiMessage =
            document.createElement(
                "div"
            );


        aiMessage.className =
            "ai-message";


        aiMessage.innerHTML = `
            <strong>
                DOLLHOUSE AI
            </strong>

            <p>
                ${escapeHTML(
                    generateAIResponse(message)
                )}
            </p>
        `;


        messages.appendChild(
            aiMessage
        );


        messages.scrollTop =
            messages.scrollHeight;

    }, 500);
}


/* =========================================================
   AI RESPONSE
   ========================================================= */

function generateAIResponse(
    message
) {

    const text =
        message.toLowerCase();


    if (
        text.includes("premium") ||
        text.includes("subscription")
    ) {

        return isPremium()
            ? "Your account currently has Premium access."
            : "Your account is currently on the Free plan. You can view Premium plans from the Subscription page.";
    }


    if (
        text.includes("scan") ||
        text.includes("scanning")
    ) {

        return "DOLLHOUSE scans are designed to organize property information into a visual 3D model. The current web prototype uses a simulated scan.";
    }


    if (
        text.includes("maintenance") ||
        text.includes("fix") ||
        text.includes("repair")
    ) {

        return "Maintenance analysis can help organize areas that may need attention based on your property information.";
    }


    if (
        text.includes("room") ||
        text.includes("rooms")
    ) {

        return "DOLLHOUSE can organize scan information by room and provide room-by-room property analysis.";
    }


    return "I can help you understand your property, scans, maintenance information, historical changes, and DOLLHOUSE features.";
}


/* =========================================================
   RESET APP DATA
   ========================================================= */

function resetAppData() {

    const confirmed =
        confirm(
            "This will delete your DOLLHOUSE account and saved scans. Continue?"
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
        "dollhouseSignedIn"
    );

    localStorage.removeItem(
        "dollhouseEmail"
    );

    localStorage.removeItem(
        "dollhousePremium"
    );

    localStorage.removeItem(
        "dollhouseSubscription"
    );


    currentScan = null;
    currentPropertyId = null;
    currentViewingScan = null;
    selectedSubscription = null;


    showScreen(
        "welcomeScreen"
    );
}


/* =========================================================
   DATE FORMAT
   ========================================================= */

function formatDate(
    dateString
) {

    if (!dateString) {

        return "Unknown date";
    }


    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";
    }


    return date.toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(
    text
) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   APP STARTUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const signedIn =
            localStorage.getItem(
                "dollhouseSignedIn"
            ) === "true";


        // Make sure Premium has a default value
        if (
            localStorage.getItem(
                "dollhousePremium"
            ) === null
        ) {

            localStorage.setItem(
                "dollhousePremium",
                "false"
            );
        }


        if (signedIn) {

            updateProfile();

            displaySavedScans();

            showScreen(
                "dashboardScreen"
            );

        } else {

            showScreen(
                "welcomeScreen"
            );
        }

    }
);
