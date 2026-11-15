THE BROMINE ARCHIVE: setup notes
================================
Pages: index.html (introduction) and collection.html (all 20 entries on one scroll).
Open index.html in a browser, or upload the whole folder to any static host.

EDITING CONTENT: everything lives in archive-data.js. For each entry set:
  day, type ("website", "pdf" for Nov 19, "finale" for Nov 20), title, url, description.
Paste real links into url (leave "" until ready; an entry with no URL keeps a disabled link).
Entries titled "Website NN: Title Placeholder" and their bracketed descriptions are placeholders to replace.
Websites 12, 15, 16 and 17 are pre-filled, assuming Website N was released on November N.

UNLOCKING: each entry opens at 12:00 AM IST (Asia/Kolkata, UTC+05:30) on its November 2026 date,
independent of the visitor's device timezone. Before that: LOCKED label, unlock date shown, link disabled,
description still visible.

BYPASS: UNLOCK EVERYTHING exists only on index.html. It saves a flag in localStorage so full access
survives refreshes and navigation. To reset to the normal schedule, clear this site's localStorage
(key: bromine_archive_unlock_all) in the browser's developer tools.

Testing a date: change ARCHIVE_ENTRIES days or use the browser's developer tools to override the clock.
Dependencies: none (plain HTML, CSS, JavaScript; system fonts only).
