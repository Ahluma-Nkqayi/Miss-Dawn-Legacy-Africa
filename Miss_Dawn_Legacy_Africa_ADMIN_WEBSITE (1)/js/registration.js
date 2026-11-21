/* ============================================================
   MISS DAWN LEGACY AFRICA — Registration Status Configuration
   ============================================================

   TO OPEN REGISTRATIONS:
     Change:  const REGISTRATION_OPEN = false;
     To:      const REGISTRATION_OPEN = true;
     Then save this file and redeploy the website.

   TO CLOSE REGISTRATIONS AGAIN:
     Change:  const REGISTRATION_OPEN = true;
     Back to: const REGISTRATION_OPEN = false;
     Then save this file and redeploy the website.

   ============================================================ */

const REGISTRATION_OPEN = false;

/* ============================================================
   DO NOT EDIT BELOW THIS LINE
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  if (REGISTRATION_OPEN) {
    _openRegistrations();
  } else {
    _closeRegistrations();
  }

});

/* ----------------------------------------------------------
   REGISTRATIONS OPEN
   - Restore all Apply Now / Apply buttons
   - Show the registration form on apply.html
   ---------------------------------------------------------- */
function _openRegistrations() {

  /* 1. Restore every nav "APPLY NOW" link in header and mobile menu */
  document.querySelectorAll("a.apply").forEach(function (a) {
    a.href        = "apply.html";
    a.textContent = "APPLY NOW";
    a.removeAttribute("data-reg-closed");
    a.style.pointerEvents = "";
    a.style.opacity       = "";
    a.style.cursor        = "";
    a.onclick             = null;
  });

  /* 2. Restore every data-reg-btn element across all pages */
  document.querySelectorAll("[data-reg-btn]").forEach(function (el) {
    var dest = el.getAttribute("data-reg-dest") || "apply.html";
    var label = el.getAttribute("data-reg-label") || "APPLY NOW";

    if (el.tagName === "A") {
      el.href        = dest;
      el.textContent = label;
      el.removeAttribute("data-reg-closed");
      el.style.pointerEvents = "";
      el.style.opacity       = "";
      el.style.cursor        = "";
      el.onclick             = null;
    } else {
      /* button element */
      el.textContent = label;
      el.disabled    = false;
      el.removeAttribute("data-reg-closed");
      el.onclick = function () { window.location.href = dest; };
    }
  });

  /* 3. On apply.html — show the form, hide the closed notice */
  var closedNotice = document.getElementById("regClosedNotice");
  var formWrapper  = document.getElementById("applyFormWrapper");
  var applyHero    = document.querySelector(".applyHero");
  var eligSection  = document.querySelector(".eligibilitySection");

  if (closedNotice)  closedNotice.style.display  = "none";
  if (formWrapper)   formWrapper.style.display    = "";
  if (applyHero)     applyHero.style.display      = "";
  if (eligSection)   eligSection.style.display    = "";
}

/* ----------------------------------------------------------
   REGISTRATIONS CLOSED
   - Replace Apply Now / Apply buttons with "Entries Opening Soon"
   - Hide the registration form on apply.html
   - Show the Opening Soon notice on apply.html
   ---------------------------------------------------------- */
function _closeRegistrations() {

  /* 1. Replace nav "APPLY NOW" links */
  document.querySelectorAll("a.apply").forEach(function (a) {
    a.textContent         = "ENTRIES OPENING SOON";
    a.setAttribute("data-reg-closed", "true");
    a.removeAttribute("href");
    a.style.pointerEvents = "none";
    a.style.opacity       = "0.7";
    a.style.cursor        = "default";
    a.onclick             = function (e) { e.preventDefault(); };
  });

  /* 2. Replace every data-reg-btn element */
  document.querySelectorAll("[data-reg-btn]").forEach(function (el) {
    var closedLabel = el.getAttribute("data-reg-closed-label") || "ENTRIES OPENING SOON";

    if (el.tagName === "A") {
      el.textContent         = closedLabel;
      el.setAttribute("data-reg-closed", "true");
      el.removeAttribute("href");
      el.style.pointerEvents = "none";
      el.style.opacity       = "0.75";
      el.style.cursor        = "default";
      el.onclick             = function (e) { e.preventDefault(); };
    } else {
      /* button element */
      el.textContent = closedLabel;
      el.disabled    = true;
      el.setAttribute("data-reg-closed", "true");
      el.onclick     = function (e) { e.preventDefault(); };
    }
  });

  /* 3. On apply.html — hide form & eligibility, show closed notice */
  var closedNotice = document.getElementById("regClosedNotice");
  var formWrapper  = document.getElementById("applyFormWrapper");
  var applyHero    = document.querySelector(".applyHero");
  var eligSection  = document.querySelector(".eligibilitySection");

  if (applyHero)   applyHero.style.display   = "none";
  if (eligSection) eligSection.style.display = "none";
  if (formWrapper) formWrapper.style.display  = "none";
  if (closedNotice) {
    closedNotice.style.display = "flex";
    /* Inject the homepage opening-soon banner into apply.html */
    _injectOpeningSoonBanner(closedNotice);
  }
}

/* ----------------------------------------------------------
   Opening Soon banner — injected into apply.html closed notice
   ---------------------------------------------------------- */
function _injectOpeningSoonBanner(container) {
  /* Only inject once */
  if (container.dataset.injected) return;
  container.dataset.injected = "true";

  container.innerHTML =
    '<div class="osBanner">' +
      '<div class="osEyebrow">Miss Dawn Legacy Africa</div>' +
      '<div class="osCrown">&#128081;</div>' +
      '<h1 class="osHeading">ENTRIES OPENING SOON</h1>' +
      '<p class="osTagline">Your journey to the crown begins here.</p>' +
      '<div class="osDivider"></div>' +
      '<p class="osBody">' +
        'Applications for our upcoming pageant will be opening soon.' +
        '<br>Stay connected for announcements and registration dates.' +
      '</p>' +
      '<a href="dashboard.html" class="osBtn">EXPLORE THE PAGEANT</a>' +
    '</div>';
}
