/* ============================================================
   MISS DAWN LEGACY AFRICA — Shared JavaScript
   ============================================================ */

/* --- Data defaults & persistence --- */
const defaults = {
  about: "Miss Dawn Legacy Africa is a purpose-led African pageant built around beauty, identity, leadership, culture, service and lasting impact.",
  vision: "To cultivate a new generation of African queens who lead with confidence, purpose and integrity.",
  mission: "To provide a platform where beauty becomes a gateway to leadership, identity, service and meaningful impact.",
  littleTheme: "During The Dawn",
  teenTheme: "The Hour of Becoming",
  missTheme: "Before The Sun Sets",
  littleDesc: "A nurturing platform celebrating young girls while building confidence, creativity, kindness and self-belief.",
  teenDesc: "A space for young women discovering identity, building confidence and learning to use their voices with courage.",
  missDesc: "For young women stepping into leadership, purpose and responsibility.",
  news: [],
  contestants: [],
  siteName: "Miss Dawn Legacy Africa",
  officialEmail: "",
  officialPhone: "",
  socialUrl: ""
};

let data = JSON.parse(localStorage.getItem("dawnAdminData") || "null") || defaults;

function saveData() {
  localStorage.setItem("dawnAdminData", JSON.stringify(data));
}

/* --- Mobile hamburger menu --- */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  // Mark the current page link as active in the nav
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".links a, .mobileMenu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      a.classList.add("on");
    }
  });

  // Apply saved site title
  if (data.siteName) document.title = data.siteName;

  // Apply dynamic content to pages that show it
  applyDynamicContent();
});

/* --- Apply saved content to public pages --- */
function applyDynamicContent() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("aboutText",    data.about);
  set("visionText",   data.vision);
  set("missionText",  data.mission);
  set("littleTheme",  data.littleTheme);
  set("teenTheme",    data.teenTheme);
  set("missTheme",    data.missTheme);
  set("littleDesc",   data.littleDesc);
  set("teenDesc",     data.teenDesc);
  set("missDesc",     data.missDesc);

  const contactEl = document.getElementById("contactDetails");
  if (contactEl) {
    contactEl.textContent = (data.officialEmail || data.officialPhone)
      ? "Email: " + (data.officialEmail || "—") + " | Phone: " + (data.officialPhone || "—")
      : "Use Website Admin to add your official email and phone.";
  }

  // Restore hero image on home page
  const homeImg = document.getElementById("homeImg");
  if (homeImg) {
    const saved = localStorage.getItem("dawnHeroImage");
    if (saved) homeImg.src = saved;
  }

  // Render news cards if on news page
  if (document.getElementById("newsCards")) renderNewsCards();
}

/* --- News rendering (public news page) --- */
function renderNewsCards() {
  const c = document.getElementById("newsCards");
  if (!c) return;
  c.innerHTML = "";
  if (!data.news.length) {
    c.innerHTML = '<div class="card"><h3>Coming Soon</h3><p>Official news and events will appear here.</p></div>';
    return;
  }
  data.news.forEach(n => {
    c.innerHTML += `<div class="card"><h3>${esc(n.title)}</h3><p><span class="pill">${esc(n.date || "News")}</span></p><p>${esc(n.body)}</p></div>`;
  });
}

/* --- Application form --- */
function previewPhoto(input, previewId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById(previewId);
    if (img) { img.src = e.target.result; img.style.display = "block"; }
  };
  reader.readAsDataURL(file);
}

function submitApplication(e) {
  e.preventDefault();
  const form   = document.getElementById("applicationForm");
  const banner = document.getElementById("applySuccess");
  if (banner) banner.style.display = "block";
  if (form)   form.style.display   = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   ADMIN FUNCTIONS  (used only on admin.html)
   ============================================================ */

function openAdmin() {
  document.getElementById("login").classList.add("show");
  document.getElementById("pin").focus();
}
function closeLogin() {
  document.getElementById("login").classList.remove("show");
}
function loginAdmin() {
  if (document.getElementById("pin").value === "2580") {
    closeLogin();
    showAdminPanel("overview");
    loadAdmin();
    document.getElementById("adminWrap").style.display = "block";
    document.getElementById("loginGate").style.display = "none";
  } else {
    alert("Incorrect PIN.");
  }
}
function logoutAdmin() {
  window.location.href = "index.html";
}

function showAdminPanel(panelId) {
  document.querySelectorAll(".side button").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".adminPanel").forEach(p => p.classList.remove("active"));
  const btn = document.querySelector(`.side button[data-panel="${panelId}"]`);
  const panel = document.getElementById("panel-" + panelId);
  if (btn)   btn.classList.add("active");
  if (panel) panel.classList.add("active");
}

function loadAdmin() {
  document.getElementById("editAbout").value        = data.about;
  document.getElementById("editVision").value       = data.vision;
  document.getElementById("editMission").value      = data.mission;
  document.getElementById("littleThemeEdit").value  = data.littleTheme;
  document.getElementById("teenThemeEdit").value    = data.teenTheme;
  document.getElementById("missThemeEdit").value    = data.missTheme;
  document.getElementById("littleDescEdit").value   = data.littleDesc;
  document.getElementById("teenDescEdit").value     = data.teenDesc;
  document.getElementById("missDescEdit").value     = data.missDesc;
  document.getElementById("siteName").value         = data.siteName;
  document.getElementById("officialEmail").value    = data.officialEmail;
  document.getElementById("officialPhone").value    = data.officialPhone;
  document.getElementById("socialUrl").value        = data.socialUrl;
  renderNewsAdmin();
  renderContestantsAdmin();
  document.getElementById("newsCount").textContent  = data.news.length + " news items";
}

function savePageant() {
  data.about   = document.getElementById("editAbout").value;
  data.vision  = document.getElementById("editVision").value;
  data.mission = document.getElementById("editMission").value;
  saveData();
  document.getElementById("savePageantNotice").innerHTML = '<div class="notice">Pageant information saved.</div>';
}

function saveDivisions() {
  data.littleTheme = document.getElementById("littleThemeEdit").value;
  data.teenTheme   = document.getElementById("teenThemeEdit").value;
  data.missTheme   = document.getElementById("missThemeEdit").value;
  data.littleDesc  = document.getElementById("littleDescEdit").value;
  data.teenDesc    = document.getElementById("teenDescEdit").value;
  data.missDesc    = document.getElementById("missDescEdit").value;
  saveData();
  alert("Divisions saved.");
}

function addNews() {
  const title = document.getElementById("newsTitle").value.trim();
  const date  = document.getElementById("newsDate").value;
  const body  = document.getElementById("newsBody").value.trim();
  if (!title || !body) return alert("Add a headline and story.");
  data.news.push({ title, date, body });
  saveData();
  document.getElementById("newsTitle").value = "";
  document.getElementById("newsDate").value  = "";
  document.getElementById("newsBody").value  = "";
  renderNewsAdmin();
  document.getElementById("newsCount").textContent = data.news.length + " news items";
}

function renderNewsAdmin() {
  const t = document.getElementById("newsTable");
  if (!t) return;
  t.innerHTML = "";
  data.news.forEach((n, i) => {
    t.innerHTML += `<tr><td>${esc(n.date || "—")}</td><td>${esc(n.title)}</td><td><button class="btn" onclick="deleteNews(${i})">DELETE</button></td></tr>`;
  });
  if (!data.news.length) t.innerHTML = '<tr><td colspan="3">No news added yet.</td></tr>';
}

function deleteNews(i) {
  data.news.splice(i, 1);
  saveData();
  renderNewsAdmin();
  document.getElementById("newsCount").textContent = data.news.length + " news items";
}

function addContestant() {
  const name     = document.getElementById("cName").value.trim();
  const division = document.getElementById("cDivision").value.trim();
  const bio      = document.getElementById("cBio").value.trim();
  if (!name || !division) return alert("Add a contestant name and division.");
  data.contestants.push({ name, division, bio });
  saveData();
  document.getElementById("cName").value     = "";
  document.getElementById("cDivision").value = "";
  document.getElementById("cBio").value      = "";
  renderContestantsAdmin();
}

function renderContestantsAdmin() {
  const t = document.getElementById("contestantTable");
  if (!t) return;
  t.innerHTML = "";
  data.contestants.forEach((c, i) => {
    t.innerHTML += `<tr><td>${esc(c.name)}</td><td>${esc(c.division)}</td><td><button class="btn" onclick="deleteContestant(${i})">DELETE</button></td></tr>`;
  });
  if (!data.contestants.length) t.innerHTML = '<tr><td colspan="3">No contestants added yet.</td></tr>';
}

function deleteContestant(i) {
  data.contestants.splice(i, 1);
  saveData();
  renderContestantsAdmin();
}

function saveSettings() {
  data.siteName      = document.getElementById("siteName").value || "Miss Dawn Legacy Africa";
  data.officialEmail = document.getElementById("officialEmail").value;
  data.officialPhone = document.getElementById("officialPhone").value;
  data.socialUrl     = document.getElementById("socialUrl").value;
  document.title     = data.siteName;
  saveData();
  alert("Settings saved.");
}

document.addEventListener("DOMContentLoaded", function () {
  const heroFile = document.getElementById("heroFile");
  if (heroFile) {
    heroFile.addEventListener("change", e => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => localStorage.setItem("dawnHeroImage", r.result);
      r.readAsDataURL(f);
    });
  }

  // Wire up admin sidebar buttons
  document.querySelectorAll(".side button[data-panel]").forEach(b => {
    b.onclick = () => showAdminPanel(b.dataset.panel);
  });

  // Show login gate on admin page
  const loginGate = document.getElementById("loginGate");
  const adminWrap = document.getElementById("adminWrap");
  if (loginGate && adminWrap) {
    loginGate.style.display = "flex";
    adminWrap.style.display = "none";
  }
});

function resetSite() {
  if (confirm("Reset all local admin content?")) {
    localStorage.removeItem("dawnAdminData");
    localStorage.removeItem("dawnHeroImage");
    location.reload();
  }
}

/* --- Utility --- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
