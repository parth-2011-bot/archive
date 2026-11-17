(function(){
  "use strict";
  var KEY = "bromine_archive_unlock_all";
  function bypass(){ try { return localStorage.getItem(KEY) === "1"; } catch(e){ return false; } }
  function setBypass(){ try { localStorage.setItem(KEY, "1"); } catch(e){} }

  /* 12:00 AM IST (UTC+05:30, no DST) on the entry's November date, expressed as a UTC instant */
  function unlockTime(day){ return Date.UTC(ARCHIVE_YEAR, ARCHIVE_MONTH - 1, day, 0, 0, 0) - 5.5 * 3600000; }
  function pad(n){ return String(n).padStart(2, "0"); }
  function fmtUnlock(day){
    return new Intl.DateTimeFormat("en-IN", {timeZone:"Asia/Kolkata", day:"numeric", month:"long", year:"numeric", hour:"numeric", minute:"2-digit", hour12:true})
      .format(new Date(unlockTime(day))) + " IST";
  }
  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }

  /* PAGE 1 */
  var unlockBtn = document.getElementById("unlock");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", setBypass);
    var s = document.getElementById("status");
    if (bypass() && s) s.textContent = "Full access is active on this device.";
  }

  /* PAGE 2 */
  var host = document.getElementById("entries");
  if (!host) return;
  var all = bypass(), now = Date.now(), open = 0;

  ARCHIVE_ENTRIES.forEach(function(d){
    var unlocked = all || now >= unlockTime(d.day);
    if (unlocked) open++;
    var a = el("article", "entry " + d.type + (unlocked ? " open" : " locked"));
    a.id = "nov-" + pad(d.day);

    var left = el("div", "info");
    left.appendChild(el("p", "date", "NOVEMBER " + pad(d.day)));
    left.appendChild(el("h2", "", d.title));
    left.appendChild(el("span", "status", unlocked ? "AVAILABLE" : "LOCKED"));
    if (!unlocked) left.appendChild(el("p", "when", "Unlocks " + fmtUnlock(d.day)));

    var label = d.type === "pdf" ? "click" : d.type === "finale" ? "Open the Birthday Site" : "Visit Website";
    var hasUrl = d.url && d.url.trim() !== "";
    var link = el("a", "btn" + (unlocked && hasUrl ? "" : " off"), label);
    if (unlocked && hasUrl) { link.href = d.url; link.target = "_blank"; link.rel = "noopener"; }
    else { link.setAttribute("aria-disabled", "true"); link.tabIndex = -1; link.title = unlocked ? "URL not added yet" : "Locked"; }
    left.appendChild(link);

    var right = el("div", "comment");
    right.appendChild(el("h3", "", d.type === "website" ? "Editor's Comment" : "From the Archive"));
    right.appendChild(el("p", "", d.description));

    a.appendChild(left); a.appendChild(right); host.appendChild(a);
  });

  var c = document.getElementById("count");
  if (c) c.textContent = open + " of " + ARCHIVE_ENTRIES.length + " entries available" + (all ? " (full access)" : "");
})();
