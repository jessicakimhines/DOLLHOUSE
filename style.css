/* =========================================================
   DOLLHOUSE
   Main Stylesheet
   ========================================================= */

:root {
    --bg: #050509;
    --bg-soft: #0a0a11;
    --panel: rgba(18, 18, 28, 0.82);
    --panel-solid: #11111a;
    --panel-light: rgba(255, 255, 255, 0.055);

    --text: #f5f5f7;
    --muted: #9696a5;
    --muted-light: #b9b9c5;

    --line: rgba(255, 255, 255, 0.09);
    --line-bright: rgba(255, 255, 255, 0.16);

    --purple: #9b7cff;
    --blue: #6ca8ff;
    --cyan: #56e6ff;
    --pink: #ff72d2;

    --danger: #ff647c;

    --radius: 22px;
    --radius-small: 14px;

    --shadow: 0 20px 60px rgba(0, 0, 0, 0.42);
}


/* =========================================================
   RESET
   ========================================================= */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    width: 100%;
    min-height: 100%;
    background: var(--bg);
}

body {
    width: 100%;
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 50% -10%,
            rgba(126, 92, 255, 0.13),
            transparent 38%
        ),
        radial-gradient(
            circle at 100% 50%,
            rgba(74, 171, 255, 0.055),
            transparent 35%
        ),
        var(--bg);

    color: var(--text);

    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "SF Pro Display",
        "SF Pro Text",
        Inter,
        Arial,
        sans-serif;

    -webkit-font-smoothing: antialiased;
}

button,
input {
    font: inherit;
}

button {
    color: inherit;
    border: none;
    cursor: pointer;
}

input {
    outline: none;
}


/* =========================================================
   APP
   ========================================================= */

#app {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
}


/* =========================================================
   SCREENS
   ========================================================= */

.screen {
    display: none;

    width: 100%;
    min-height: 100vh;

    position: relative;
}

.screen.active {
    display: block;
}


/* =========================================================
   COMMON
   ========================================================= */

.primary-button {
    width: 100%;

    min-height: 56px;

    border-radius: 16px;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            #6f8dff
        );

    color: white;

    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1.2px;

    box-shadow:
        0 12px 35px rgba(125, 102, 255, 0.28);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
}

.primary-button:hover {
    transform: translateY(-2px);

    box-shadow:
        0 16px 42px rgba(125, 102, 255, 0.38);
}

.primary-button:active {
    transform: scale(0.98);
}


.back-button {
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 13px;

    background: rgba(255, 255, 255, 0.055);

    border: 1px solid var(--line);

    color: white;

    font-size: 23px;

    transition: 0.2s ease;
}

.back-button:hover {
    background: rgba(255, 255, 255, 0.1);
}


.secondary-button {
    padding: 11px 17px;

    border-radius: 11px;

    background: rgba(255, 255, 255, 0.07);

    border: 1px solid var(--line);

    color: white;

    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.8px;
}


.text-button {
    background: transparent;

    color: var(--purple);

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 0.8px;
}


.icon-button {
    width: 44px;
    height: 44px;

    border-radius: 13px;

    background: rgba(255, 255, 255, 0.055);

    border: 1px solid var(--line);

    font-size: 22px;
}


/* =========================================================
   WELCOME
   ========================================================= */

#welcomeScreen {
    display: none;

    align-items: center;
    justify-content: center;

    padding: 40px 20px;
}

#welcomeScreen.active {
    display: flex;
}

.welcome-container {
    width: min(560px, 100%);

    text-align: center;
}


.logo-area {
    position: relative;

    display: inline-block;

    margin-bottom: 12px;
}

.main-logo {
    position: relative;
    z-index: 2;

    font-size: clamp(38px, 9vw, 64px);

    font-weight: 900;

    letter-spacing: 5px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #b8a5ff,
            #ffffff,
            #79dfff,
            #ffffff
        );

    background-size: 250% auto;

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;

    animation: logoShift 7s linear infinite;
}

.logo-glow {
    position: absolute;

    width: 80%;
    height: 80%;

    left: 10%;
    top: 10%;

    background:
        linear-gradient(
            90deg,
            var(--purple),
            var(--cyan),
            var(--pink)
        );

    filter: blur(35px);

    opacity: 0.25;

    animation: glowPulse 3s ease-in-out infinite;
}

.tagline {
    color: var(--muted-light);

    font-size: 15px;

    letter-spacing: 1.5px;

    margin-bottom: 42px;
}


.welcome-features {
    display: grid;

    gap: 13px;

    text-align: left;

    margin-bottom: 28px;
}

.feature-card {
    display: flex;
    align-items: center;

    gap: 16px;

    padding: 18px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,0.065),
            rgba(255,255,255,0.025)
        );

    border: 1px solid var(--line);

    border-radius: var(--radius-small);

    backdrop-filter: blur(20px);

    box-shadow: var(--shadow);
}

.feature-icon {
    flex: 0 0 48px;

    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 15px;

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.18),
            rgba(86,230,255,0.1)
        );

    border: 1px solid rgba(155,124,255,0.22);

    color: white;

    font-size: 23px;
}

.feature-card h3 {
    font-size: 14px;

    margin-bottom: 5px;
}

.feature-card p {
    color: var(--muted);

    font-size: 12px;

    line-height: 1.5;
}


/* =========================================================
   ACCOUNT
   ========================================================= */

#accountScreen,
#termsScreen {
    padding: 30px 20px;
}

.account-container,
.page-container {
    width: min(620px, 100%);

    margin: 0 auto;
}

.account-container {
    padding-top: 15px;
}

.account-logo {
    margin-top: 38px;

    color: var(--muted);

    font-size: 11px;
    font-weight: 900;

    letter-spacing: 3px;
}

.account-container h1 {
    margin-top: 15px;

    font-size: 34px;

    letter-spacing: -1px;
}

.screen-subtitle {
    margin-top: 10px;

    color: var(--muted);

    font-size: 14px;

    line-height: 1.6;
}


.form-group {
    margin-top: 26px;
}

.form-group label {
    display: block;

    margin-bottom: 9px;

    color: var(--muted-light);

    font-size: 12px;
    font-weight: 700;
}


.form-group input {
    width: 100%;

    height: 54px;

    padding: 0 16px;

    border-radius: 14px;

    border: 1px solid var(--line);

    background: rgba(255, 255, 255, 0.055);

    color: white;

    font-size: 15px;

    transition: 0.2s ease;
}

.form-group input:focus {
    border-color: rgba(155, 124, 255, 0.7);

    box-shadow:
        0 0 0 4px rgba(155, 124, 255, 0.09);
}

.form-group input::placeholder {
    color: #666675;
}

.input-note,
.account-note {
    color: var(--muted);

    font-size: 11px;

    line-height: 1.5;
}

.input-note {
    margin-top: 8px;
}


.terms-container {
    display: flex;

    align-items: flex-start;

    gap: 10px;

    margin: 25px 0;

    color: var(--muted-light);

    font-size: 12px;

    line-height: 1.5;
}

.terms-container input {
    width: 17px;
    height: 17px;

    margin-top: 1px;

    accent-color: var(--purple);

    flex-shrink: 0;
}

.inline-link {
    background: none;

    color: var(--purple);

    font-weight: 700;

    text-decoration: underline;
}

.account-note {
    text-align: center;

    margin-top: 15px;
}


/* =========================================================
   PAGE HEADER
   ========================================================= */

.page-header {
    display: flex;
    align-items: center;

    gap: 15px;

    padding: 28px 0 24px;
}

.page-header > div {
    flex: 1;
}

.page-header h1 {
    font-size: 27px;

    letter-spacing: -0.7px;
}

.page-header p {
    color: var(--muted);

    font-size: 12px;

    margin-top: 4px;
}


/* =========================================================
   CONTENT CARD
   ========================================================= */

.content-card {
    padding: 24px;

    background: var(--panel);

    border: 1px solid var(--line);

    border-radius: var(--radius);

    box-shadow: var(--shadow);
}

.content-card h2 {
    margin-bottom: 14px;
}

.content-card h3 {
    margin-top: 24px;
    margin-bottom: 8px;

    font-size: 15px;
}

.content-card p {
    color: var(--muted-light);

    font-size: 13px;

    line-height: 1.7;

    margin-bottom: 10px;
}

.content-card .primary-button {
    margin-top: 22px;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

#dashboardScreen {
    padding-bottom: 50px;
}

.top-bar {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding:
        22px
        max(22px, env(safe-area-inset-right))
        20px
        max(22px, env(safe-area-inset-left));

    border-bottom: 1px solid var(--line);

    background: rgba(5, 5, 9, 0.7);

    backdrop-filter: blur(25px);

    position: sticky;
    top: 0;
    z-index: 20;
}

.top-bar-left {
    display: flex;
    align-items: center;

    gap: 13px;
}

.menu-button {
    width: 43px;
    height: 43px;

    border-radius: 12px;

    background: rgba(255, 255, 255, 0.06);

    border: 1px solid var(--line);

    font-size: 20px;
}

.brand-small h1 {
    font-size: 17px;

    letter-spacing: 2px;
}

.brand-small p {
    color: var(--muted);

    font-size: 10px;

    margin-top: 3px;
}

.premium-button {
    padding: 10px 13px;

    border-radius: 11px;

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.18),
            rgba(86,230,255,0.08)
        );

    border: 1px solid rgba(155,124,255,0.28);

    color: #dcd5ff;

    font-size: 10px;

    font-weight: 900;

    letter-spacing: 0.7px;
}


.dashboard-content {
    width: min(760px, 100%);

    margin: 0 auto;

    padding: 24px 20px;
}


/* =========================================================
   SIDE MENU
   ========================================================= */

.side-menu {
    position: fixed;

    left: 0;
    top: 0;

    width: min(330px, 88vw);
    height: 100vh;

    z-index: 100;

    padding: 22px;

    background:
        linear-gradient(
            180deg,
            #11111b,
            #08080d
        );

    border-right: 1px solid var(--line);

    box-shadow: 20px 0 60px rgba(0,0,0,0.45);

    transform: translateX(-105%);

    transition: transform 0.3s ease;
}

.side-menu.open {
    transform: translateX(0);
}

.menu-top {
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding-bottom: 25px;

    border-bottom: 1px solid var(--line);

    margin-bottom: 15px;
}

.menu-brand {
    font-size: 14px;

    font-weight: 900;

    letter-spacing: 2.5px;
}

.menu-close {
    width: 38px;
    height: 38px;

    border-radius: 10px;

    background: rgba(255,255,255,0.06);

    border: 1px solid var(--line);

    font-size: 21px;
}

.menu-item {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 15px;

    padding: 15px;

    margin-bottom: 5px;

    background: transparent;

    border-radius: 12px;

    color: var(--muted-light);

    text-align: left;

    font-size: 13px;

    transition: 0.2s ease;
}

.menu-item span {
    width: 22px;

    text-align: center;

    font-size: 17px;
}

.menu-item:hover,
.active-menu-item {
    background: rgba(155,124,255,0.11);

    color: white;
}

.menu-divider {
    height: 1px;

    background: var(--line);

    margin: 15px 0;
}

.logout-item {
    color: #ff8799;
}


/* =========================================================
   NEW SCAN CARD
   ========================================================= */

.new-scan-card {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 17px;

    padding: 22px;

    text-align: left;

    border-radius: var(--radius);

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.17),
            rgba(86,230,255,0.055)
        );

    border: 1px solid rgba(155,124,255,0.24);

    box-shadow:
        0 20px 55px rgba(55, 38, 130, 0.16);

    transition: 0.2s ease;
}

.new-scan-card:hover {
    transform: translateY(-2px);

    border-color: rgba(155,124,255,0.4);
}

.new-scan-icon {
    width: 58px;
    height: 58px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    border-radius: 18px;

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.24),
            rgba(86,230,255,0.13)
        );

    font-size: 29px;

    box-shadow:
        0 0 35px rgba(155,124,255,0.12);
}

.new-scan-text {
    flex: 1;
}

.card-label {
    color: var(--cyan);

    font-size: 9px;

    font-weight: 900;

    letter-spacing: 1.5px;
}

.new-scan-text h2 {
    font-size: 19px;

    margin-top: 4px;
}

.new-scan-text p {
    color: var(--muted);

    font-size: 11px;

    line-height: 1.5;

    margin-top: 4px;
}

.card-arrow {
    color: var(--muted-light);

    font-size: 23px;
}


/* =========================================================
   PLAN CARD
   ========================================================= */

.plan-card {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    margin-top: 14px;

    padding: 19px;

    background: rgba(255,255,255,0.035);

    border: 1px solid var(--line);

    border-radius: var(--radius-small);
}

.small-label {
    display: block;

    color: var(--muted);

    font-size: 9px;

    font-weight: 900;

    letter-spacing: 1.2px;
}

.plan-card h3 {
    margin-top: 5px;

    font-size: 17px;
}

.plan-card p {
    color: var(--muted);

    font-size: 11px;

    margin-top: 3px;
}


/* =========================================================
   SECTION TITLES
   ========================================================= */

.section-title-row {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin: 30px 0 13px;
}

.section-title-row h2 {
    font-size: 17px;
}


/* =========================================================
   EMPTY STATES
   ========================================================= */

.empty-state {
    padding: 48px 20px;

    text-align: center;

    border: 1px dashed rgba(255,255,255,0.11);

    border-radius: var(--radius);

    background: rgba(255,255,255,0.018);
}

.empty-state-icon {
    width: 55px;
    height: 55px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 14px;

    border-radius: 17px;

    background: rgba(155,124,255,0.09);

    color: var(--purple);

    font-size: 25px;
}

.empty-state h3 {
    font-size: 15px;

    margin-bottom: 6px;
}

.empty-state p {
    max-width: 310px;

    margin: auto;

    color: var(--muted);

    font-size: 12px;

    line-height: 1.6;
}


/* =========================================================
   SEARCH
   ========================================================= */

.search-box {
    display: flex;
    align-items: center;

    gap: 10px;

    height: 50px;

    padding: 0 15px;

    border-radius: 14px;

    background: rgba(255,255,255,0.045);

    border: 1px solid var(--line);
}

.search-box span {
    color: var(--muted);

    font-size: 20px;
}

.search-box input {
    width: 100%;

    border: none;

    background: transparent;

    color: white;

    font-size: 14px;
}

.search-box input::placeholder {
    color: #686875;
}


/* =========================================================
   PAGE CONTENT
   ========================================================= */

.page-content {
    padding-bottom: 50px;
}


/* =========================================================
   PROPERTY OVERVIEW
   ========================================================= */

.property-overview {
    display: flex;

    align-items: center;

    gap: 15px;

    padding: 20px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,0.055),
            rgba(255,255,255,0.025)
        );

    border: 1px solid var(--line);

    border-radius: var(--radius);
}

.property-icon {
    width: 55px;
    height: 55px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 17px;

    background: rgba(155,124,255,0.1);

    font-size: 26px;
}

.property-overview h2 {
    font-size: 17px;
}

.property-overview p {
    color: var(--muted);

    font-size: 11px;

    margin-top: 4px;
}


/* =========================================================
   PROPERTY HISTORY
   ========================================================= */

.premium-tag {
    display: inline-flex;

    align-items: center;

    padding: 5px 8px;

    border-radius: 7px;

    background: rgba(155,124,255,0.1);

    border: 1px solid rgba(155,124,255,0.2);

    color: #c5b7ff;

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 0.8px;
}

.property-history-card {
    padding: 17px;

    margin-bottom: 9px;

    border-radius: 15px;

    background: rgba(255,255,255,0.04);

    border: 1px solid var(--line);
}


/* =========================================================
   PREMIUM ANALYSIS
   ========================================================= */

.premium-analysis {
    margin-top: 28px;

    padding: 20px;

    border-radius: var(--radius);

    background:
        linear-gradient(
            145deg,
            rgba(155,124,255,0.08),
            rgba(255,255,255,0.025)
        );

    border: 1px solid rgba(155,124,255,0.16);
}

.analysis-header {
    display: flex;

    justify-content: space-between;

    gap: 15px;

    margin-bottom: 17px;
}

.analysis-header h2 {
    margin-top: 8px;

    font-size: 17px;
}

.analysis-icon {
    font-size: 26px;

    color: var(--purple);
}

.analysis-card {
    padding: 16px;

    margin-top: 9px;

    border-radius: 13px;

    background: rgba(0,0,0,0.2);

    border: 1px solid var(--line);
}

.analysis-label {
    color: var(--muted);

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 1.1px;
}

.analysis-card p {
    color: var(--muted-light);

    font-size: 12px;

    line-height: 1.6;

    margin-top: 7px;
}

.premium-lock-button {
    width: 100%;

    margin-top: 13px;

    padding: 14px;

    border-radius: 12px;

    background: rgba(155,124,255,0.12);

    border: 1px solid rgba(155,124,255,0.2);

    color: #cbbfff;

    font-size: 10px;

    font-weight: 900;

    letter-spacing: 0.8px;
}


/* =========================================================
   PROFILE
   ========================================================= */

.profile-card {
    padding: 30px 20px;

    text-align: center;

    border-radius: var(--radius);

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(155,124,255,0.13),
            transparent 55%
        ),
        rgba(255,255,255,0.035);

    border: 1px solid var(--line);
}

.profile-avatar {
    width: 76px;
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 14px;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.2),
            rgba(86,230,255,0.1)
        );

    border: 1px solid rgba(155,124,255,0.25);

    font-size: 35px;
}

.profile-card h2 {
    font-size: 16px;

    word-break: break-word;
}

.profile-plan {
    display: inline-block;

    margin-top: 8px;

    padding: 6px 9px;

    border-radius: 7px;

    background: rgba(255,255,255,0.06);

    color: var(--muted-light);

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 1px;
}

.profile-options {
    margin-top: 14px;
}

.profile-option {
    width: 100%;

    display: grid;

    grid-template-columns: 25px 1fr 20px;

    align-items: center;

    gap: 10px;

    padding: 17px;

    margin-bottom: 7px;

    text-align: left;

    border-radius: 14px;

    background: rgba(255,255,255,0.035);

    border: 1px solid var(--line);

    color: var(--muted-light);

    font-size: 13px;
}


/* =========================================================
   SETTINGS
   ========================================================= */

.settings-card {
    overflow: hidden;

    border-radius: var(--radius);

    border: 1px solid var(--line);

    background: rgba(255,255,255,0.03);
}

.setting-row {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 20px;

    border-bottom: 1px solid var(--line);
}

.setting-row:last-child {
    border-bottom: none;
}

.setting-row h3 {
    font-size: 13px;
}

.setting-row p {
    color: var(--muted);

    font-size: 10px;

    margin-top: 4px;
}

.setting-row input {
    width: 18px;
    height: 18px;

    accent-color: var(--purple);
}

.danger-setting h3 {
    color: #ff8799;
}

.danger-button {
    padding: 9px 12px;

    border-radius: 9px;

    background: rgba(255,100,124,0.1);

    border: 1px solid rgba(255,100,124,0.2);

    color: #ff8295;

    font-size: 9px;

    font-weight: 900;
}


/* =========================================================
   SCANNER
   ========================================================= */

.scanner-screen {
    overflow: hidden;

    background:
        radial-gradient(
            circle at 50% 50%,
            rgba(90, 72, 170, 0.12),
            transparent 45%
        ),
        #030306;
}

.scanner-background {
    position: absolute;

    inset: 0;

    overflow: hidden;
}

.scanner-grid {
    position: absolute;

    inset: -30%;

    opacity: 0.22;

    background-image:
        linear-gradient(
            rgba(100, 200, 255, 0.17) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(100, 200, 255, 0.17) 1px,
            transparent 1px
        );

    background-size: 55px 55px;

    transform:
        perspective(500px)
        rotateX(60deg)
        translateY(25%);

    animation: gridMove 8s linear infinite;
}


.laser {
    position: absolute;

    height: 2px;

    width: 160%;

    left: -30%;

    transform-origin: center;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--purple),
            var(--cyan),
            var(--pink),
            transparent
        );

    filter:
        blur(0.5px)
        drop-shadow(0 0 8px rgba(120,180,255,0.8));

    opacity: 0.7;

    animation: laserMove 3.5s ease-in-out infinite;
}

.laser-1 {
    top: 20%;
    transform: rotate(14deg);
}

.laser-2 {
    top: 28%;
    transform: rotate(-18deg);
    animation-delay: -1s;
}

.laser-3 {
    top: 37%;
    transform: rotate(7deg);
    animation-delay: -2s;
}

.laser-4 {
    top: 46%;
    transform: rotate(-12deg);
    animation-delay: -0.5s;
}

.laser-5 {
    top: 54%;
    transform: rotate(18deg);
    animation-delay: -1.7s;
}

.laser-6 {
    top: 63%;
    transform: rotate(-8deg);
    animation-delay: -2.3s;
}

.laser-7 {
    top: 72%;
    transform: rotate(13deg);
    animation-delay: -0.8s;
}

.laser-8 {
    top: 80%;
    transform: rotate(-15deg);
    animation-delay: -2.7s;
}

.laser-9 {
    top: 34%;
    transform: rotate(30deg);
    animation-delay: -1.4s;
}

.laser-10 {
    top: 68%;
    transform: rotate(-27deg);
    animation-delay: -2s;
}


.scanner-interface {
    position: relative;

    z-index: 2;

    min-height: 100vh;

    display: flex;

    flex-direction: column;

    justify-content: space-between;

    padding:
        25px
        max(25px, env(safe-area-inset-right))
        30px
        max(25px, env(safe-area-inset-left));
}

.scanner-top {
    display: flex;

    align-items: center;
    justify-content: space-between;
}

.glass-button {
    width: 44px;
    height: 44px;

    border-radius: 13px;

    background: rgba(10,10,18,0.6);

    border: 1px solid rgba(255,255,255,0.15);

    backdrop-filter: blur(15px);

    font-size: 20px;
}

.scanner-title {
    font-size: 11px;

    font-weight: 900;

    letter-spacing: 2px;
}


.scanner-main {
    display: flex;

    align-items: center;

    flex-direction: column;

    text-align: center;
}

.scanner-ring {
    width: 210px;
    height: 210px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(155,124,255,0.12),
            rgba(5,5,9,0.5) 58%,
            transparent 59%
        );

    border:
        1px solid rgba(155,124,255,0.38);

    box-shadow:
        0 0 35px rgba(155,124,255,0.12),
        inset 0 0 35px rgba(86,230,255,0.06);

    animation: scannerPulse 2.5s ease-in-out infinite;
}

.scan-percentage {
    font-size: 42px;

    font-weight: 300;

    letter-spacing: -2px;
}

.scanner-main h2 {
    margin-top: 25px;

    font-size: 18px;
}

.scanner-main p {
    margin-top: 8px;

    color: var(--muted);

    font-size: 12px;
}

.scan-mode {
    display: flex;

    gap: 8px;

    margin-top: 18px;

    padding: 6px;

    border-radius: 10px;

    background: rgba(0,0,0,0.35);

    border: 1px solid var(--line);

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 1px;

    color: var(--muted);
}

.scan-mode span {
    padding: 6px 9px;
}

.mode-active {
    border-radius: 6px;

    background: rgba(155,124,255,0.18);

    color: white;
}


.progress-track {
    width: 100%;

    height: 4px;

    border-radius: 10px;

    overflow: hidden;

    background: rgba(255,255,255,0.08);
}

.progress-bar {
    width: 0%;

    height: 100%;

    background:
        linear-gradient(
            90deg,
            var(--purple),
            var(--cyan),
            var(--pink)
        );

    box-shadow:
        0 0 12px rgba(100,200,255,0.7);

    transition: width 0.25s linear;
}

.scanner-stats {
    display: flex;

    justify-content: space-between;

    margin-top: 13px;

    color: var(--muted-light);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 0.8px;
}


/* =========================================================
   MODEL
   ========================================================= */

#modelScreen {
    background:
        radial-gradient(
            circle at 50% 40%,
            rgba(100,90,200,0.14),
            transparent 42%
        ),
        #050509;

    padding-bottom: 30px;
}

.model-header {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 20px;

    border-bottom: 1px solid var(--line);
}

.model-header > div {
    text-align: center;
}

.model-header h1 {
    font-size: 15px;

    letter-spacing: 2px;
}

.model-header p {
    color: var(--muted);

    font-size: 8px;

    margin-top: 3px;

    letter-spacing: 0.7px;
}

.delete-button {
    width: 42px;
    height: 42px;

    border-radius: 12px;

    background: rgba(255,100,124,0.07);

    border: 1px solid rgba(255,100,124,0.13);

    font-size: 17px;
}


.model-viewer {
    position: relative;

    width: min(700px, 100%);

    height: 390px;

    margin: 20px auto;

    overflow: hidden;

    border-radius: 24px;

    border: 1px solid var(--line);

    background:
        radial-gradient(
            circle,
            rgba(100,120,255,0.08),
            transparent 50%
        ),
        #080810;
}

.model-glow {
    position: absolute;

    width: 280px;
    height: 280px;

    left: 50%;
    top: 48%;

    transform: translate(-50%, -50%);

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--cyan)
        );

    filter: blur(90px);

    opacity: 0.11;
}

.model-room {
    position: absolute;

    width: 260px;
    height: 210px;

    left: 50%;
    top: 48%;

    transform:
        translate(-50%, -50%)
        perspective(700px)
        rotateX(58deg)
        rotateZ(-8deg);

    transform-style: preserve-3d;
}

.model-wall {
    position: absolute;

    border: 1px solid rgba(145,130,255,0.55);

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.11),
            rgba(86,230,255,0.035)
        );

    box-shadow:
        0 0 20px rgba(120,100,255,0.08);
}

.model-back-wall {
    width: 260px;
    height: 210px;

    left: 0;
    top: 0;

    transform: translateZ(-35px);
}

.model-left-wall {
    width: 210px;
    height: 210px;

    left: -105px;
    top: 0;

    transform:
        rotateY(90deg)
        translateZ(130px);
}

.model-floor {
    position: absolute;

    width: 260px;
    height: 210px;

    left: 0;
    top: 0;

    background:
        linear-gradient(
            135deg,
            rgba(120,130,180,0.07),
            rgba(255,255,255,0.025)
        );

    border: 1px solid rgba(145,130,255,0.4);

    transform: translateZ(0);
}

.model-ceiling {
    position: absolute;

    width: 260px;
    height: 210px;

    left: 0;
    top: -210px;

    border: 1px solid rgba(145,130,255,0.16);

    transform:
        rotateX(90deg)
        translateZ(210px);

    opacity: 0.2;
}

.model-door {
    position: absolute;

    width: 38px;
    height: 75px;

    left: 20px;
    top: 75px;

    border: 1px solid rgba(86,230,255,0.55);

    background: rgba(86,230,255,0.06);
}

.model-window {
    position: absolute;

    width: 62px;
    height: 42px;

    right: 28px;
    top: 40px;

    border: 1px solid rgba(86,230,255,0.55);

    background:
        linear-gradient(
            135deg,
            rgba(86,230,255,0.12),
            rgba(155,124,255,0.06)
        );
}

.model-furniture {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--cyan);

    border: 1px solid rgba(155,124,255,0.45);

    background: rgba(155,124,255,0.08);

    box-shadow:
        0 0 15px rgba(155,124,255,0.1);
}

.furniture-1 {
    width: 75px;
    height: 40px;

    left: 85px;
    top: 115px;
}

.furniture-2 {
    width: 38px;
    height: 38px;

    right: 35px;
    bottom: 30px;
}

.furniture-3 {
    width: 30px;
    height: 30px;

    left: 40px;
    bottom: 30px;
}

.model-overlay {
    position: absolute;

    left: 18px;
    right: 18px;
    bottom: 16px;

    display: flex;
    justify-content: space-between;

    color: var(--muted);

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 1px;
}

.model-information {
    width: min(600px, calc(100% - 40px));

    margin: 0 auto;
}

.success-label {
    color: var(--cyan);

    font-size: 9px;

    font-weight: 900;

    letter-spacing: 1.1px;
}

.model-information h2 {
    margin-top: 7px;

    font-size: 22px;
}

.model-stats {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 8px;

    margin: 20px 0;
}

.model-stat {
    padding: 15px;

    text-align: center;

    border-radius: 13px;

    background: rgba(255,255,255,0.035);

    border: 1px solid var(--line);
}

.model-stat strong {
    display: block;

    font-size: 19px;
}

.model-stat span {
    display: block;

    color: var(--muted);

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 0.8px;

    margin-top: 4px;
}


/* =========================================================
   AI
   ========================================================= */

.ai-page {
    width: min(700px, 100%);

    height: 100vh;

    margin: 0 auto;

    display: flex;

    flex-direction: column;
}

.ai-header {
    display: flex;

    align-items: center;

    gap: 14px;

    padding: 22px 20px;

    border-bottom: 1px solid var(--line);
}

.ai-title {
    display: flex;

    align-items: center;

    gap: 11px;
}

.ai-icon-small {
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    background: rgba(155,124,255,0.12);

    color: var(--purple);

    font-size: 20px;
}

.ai-title h1 {
    font-size: 15px;

    letter-spacing: 1.5px;
}

.ai-title p {
    color: var(--muted);

    font-size: 10px;

    margin-top: 3px;
}

.chat-messages {
    flex: 1;

    overflow-y: auto;

    padding: 22px 20px;
}

.ai-message,
.user-message {
    max-width: 88%;

    padding: 14px 16px;

    border-radius: 16px;

    margin-bottom: 12px;

    font-size: 13px;

    line-height: 1.6;
}

.ai-message {
    display: flex;

    gap: 10px;

    background: rgba(155,124,255,0.075);

    border: 1px solid rgba(155,124,255,0.13);
}

.message-icon {
    color: var(--purple);

    font-weight: 900;
}

.ai-message p {
    flex: 1;
}

.user-message {
    margin-left: auto;

    background: rgba(255,255,255,0.07);

    border: 1px solid var(--line);
}

.chat-input-container {
    display: flex;

    gap: 9px;

    padding:
        14px
        max(20px, env(safe-area-inset-right))
        max(20px, env(safe-area-inset-bottom))
        max(20px, env(safe-area-inset-left));

    border-top: 1px solid var(--line);

    background: rgba(5,5,9,0.85);

    backdrop-filter: blur(20px);
}

.chat-input-container input {
    flex: 1;

    height: 50px;

    padding: 0 15px;

    border-radius: 14px;

    background: rgba(255,255,255,0.055);

    border: 1px solid var(--line);

    color: white;
}

.chat-input-container button {
    width: 50px;

    border-radius: 14px;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            #6f8dff
        );

    font-size: 21px;
}


/* =========================================================
   PREMIUM
   ========================================================= */

.premium-page {
    width: min(680px, 100%);

    margin: 0 auto;

    padding:
        25px
        max(20px, env(safe-area-inset-right))
        45px
        max(20px, env(safe-area-inset-left));
}

.premium-hero {
    text-align: center;

    padding: 25px 0 30px;
}

.premium-icon {
    width: 70px;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 15px;

    border-radius: 22px;

    background:
        linear-gradient(
            135deg,
            rgba(155,124,255,0.2),
            rgba(86,230,255,0.09)
        );

    border: 1px solid rgba(155,124,255,0.25);

    color: white;

    font-size: 31px;

    box-shadow:
        0 0 45px rgba(155,124,255,0.13);
}

.premium-label {
    color: var(--purple);

    font-size: 9px;

    font-weight: 900;

    letter-spacing: 2px;
}

.premium-hero h1 {
    margin-top: 5px;

    font-size: 31px;

    letter-spacing: 2px;
}

.premium-hero p {
    color: var(--muted);

    font-size: 12px;

    margin-top: 8px;
}

.premium-feature-list {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 8px;

    margin-bottom: 22px;
}

.premium-feature {
    display: flex;

    align-items: center;

    gap: 10px;

    padding: 13px;

    border-radius: 12px;

    background: rgba(255,255,255,0.035);

    border: 1px solid var(--line);
}

.premium-feature span {
    color: var(--cyan);

    font-size: 12px;

    font-weight: 900;
}

.premium-feature p {
    color: var(--muted-light);

    font-size: 10px;

    line-height: 1.4;
}


.subscription-options {
    display: grid;

    gap: 9px;

    margin-bottom: 14px;
}

.subscription-card {
    position: relative;

    width: 100%;

    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 17px;

    border-radius: 15px;

    background: rgba(255,255,255,0.035);

    border: 1px solid var(--line);

    text-align: left;

    transition: 0.2s ease;
}

.subscription-card:hover {
    border-color: rgba(155,124,255,0.4);
}

.subscription-card.selected {
    background: rgba(155,124,255,0.1);

    border-color: rgba(155,124,255,0.55);

    box-shadow:
        0 0 25px rgba(155,124,255,0.08);
}

.subscription-info span {
    display: block;

    color: var(--muted);

    font-size: 8px;

    font-weight: 900;

    letter-spacing: 1px;
}

.subscription-info strong {
    display: inline-block;

    margin-top: 4px;

    font-size: 21px;
}

.subscription-info small {
    color: var(--muted);

    font-size: 9px;

    margin-left: 4px;
}

.subscription-radio {
    color: var(--muted);

    font-size: 23px;
}

.subscription-card.selected .subscription-radio {
    color: var(--purple);
}

.yearly-plan {
    padding-top: 24px;
}

.best-value {
    position: absolute;

    top: 0;
    left: 17px;

    padding: 5px 8px;

    border-radius: 0 0 7px 7px;

    background:
        linear-gradient(
            90deg,
            var(--purple),
            var(--cyan)
        );

    color: #08080d;

    font-size: 7px;

    font-weight: 900;

    letter-spacing: 0.7px;
}

.subscription-note {
    margin-top: 13px;

    text-align: center;

    color: #656572;

    font-size: 9px;

    line-height: 1.5;
}


/* =========================================================
   FLOATING AI
   ========================================================= */

.ai-floating-button {
    position: fixed;

    right: 22px;
    bottom: 22px;

    width: 57px;
    height: 57px;

    z-index: 30;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--blue)
        );

    color: white;

    font-size: 23px;

    box-shadow:
        0 10px 35px rgba(105,90,255,0.4);

    animation: aiFloat 3s ease-in-out infinite;
}


/* =========================================================
   ANIMATIONS
   ========================================================= */

@keyframes logoShift {
    0% {
        background-position: 0% center;
    }

    100% {
        background-position: 250% center;
    }
}

@keyframes glowPulse {
    0%,
    100% {
        opacity: 0.18;
        transform: scale(0.95);
    }

    50% {
        opacity: 0.34;
        transform: scale(1.08);
    }
}

@keyframes gridMove {
    from {
        transform:
            perspective(500px)
            rotateX(60deg)
            translateY(0);
    }

    to {
        transform:
            perspective(500px)
            rotateX(60deg)
            translateY(55px);
    }
}

@keyframes laserMove {
    0%,
    100% {
        opacity: 0.25;
    }

    50% {
        opacity: 0.9;
    }
}

@keyframes scannerPulse {
    0%,
    100% {
        transform: scale(0.98);
        box-shadow:
            0 0 30px rgba(155,124,255,0.1);
    }

    50% {
        transform: scale(1.02);
        box-shadow:
            0 0 55px rgba(86,180,255,0.18);
    }
}

@keyframes aiFloat {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (min-width: 700px) {

    .dashboard-content {
        padding-top: 35px;
    }

    .welcome-container {
        padding-top: 10px;
    }

    .welcome-features {
        gap: 16px;
    }

    .feature-card {
        padding: 20px;
    }

    .model-viewer {
        height: 470px;
    }
}


@media (max-width: 520px) {

    .premium-feature-list {
        grid-template-columns: 1fr;
    }

    .top-bar {
        padding-left: 16px;
        padding-right: 16px;
    }

    .dashboard-content {
        padding-left: 16px;
        padding-right: 16px;
    }

    .premium-page {
        padding-left: 16px;
        padding-right: 16px;
    }

    .model-viewer {
        height: 330px;

        border-radius: 18px;
    }

    .model-room {
        transform:
            translate(-50%, -50%)
            perspective(700px)
            rotateX(58deg)
            rotateZ(-8deg)
            scale(0.82);
    }
}


@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
    }
}
