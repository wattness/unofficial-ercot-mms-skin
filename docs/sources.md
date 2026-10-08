# Sources

Every ERCOT document this repository uses, what is taken from each and how. The files were downloaded from
www.ercot.com on 8 October 2026, between 10:52 and 10:56 CT, and each matched the SHA-256 given here. On that day each
document's meeting page, linked below, still listed it.

The images are in [ercot/](ercot/). They are ERCOT's and are not covered by this repository's MIT licence. The section
[ERCOT's terms](#ercots-terms) says how each kind of excerpt relates to ERCOT's Website User Agreement.

Dates are the date printed in the document, or the date ERCOT posted it where none is printed. Page numbers are the
document's own where it prints them, otherwise the page's position in the file. A box is `(left, top)–(right, bottom)`
in the pixels of the image it is cut from, right and bottom exclusive.

## Documents

### NPRR 1188 – System Impacts Overview, 20 August 2026

- Meeting: [TWG meeting, 20 August 2026](https://www.ercot.com/calendar/08202026-TWG-Meeting-_-Webex).
- File: https://www.ercot.com/files/docs/2026/08/20/ERCOT-TWG-2026-08-20-NPRR-1188-System-Impacts.pptx, 214,978
  bytes, SHA-256 `0763399d7e59fa37dd8d6cd16361f12c6a5c80bbd3df8efa4437b885ede2bfd2`.
- Notices: every slide carries ERCOT's "PUBLIC" label.
- Used: slide 5, "Market Manager (MMS UI) Changes". Its screenshot, `ppt/media/image11.png` (1184×445), is
  [2026-08-20-nprr1188-system-impacts-slide05-energy-bid-curve.png](ercot/2026-08-20-nprr1188-system-impacts-slide05-energy-bid-curve.png),
  unmodified: the same bytes, SHA-256 `cf14902e574a82d07d89e27aaacef41e1fb1166fc9b498213ac41acabfe4432d`. The ten
  values marked `sampled` in `src/tokens.css` are measured from it, and `npm run verify-provenance` repeats the
  measurement.

### MMS UI Prototypes, 31 October 2007

- Title as printed: "MMS UI Prototypes". No date or version is printed. ERCOT's meeting page lists the file as "MER MMS
  HF Prototypes v0.03", and its first paragraph calls it "the third iteration of paper prototypes for MMS screens".
- Meeting: [UI Subgroup meeting, 7 November 2007](https://www.ercot.com/calendar/11072007-UI-Subgroup-Meeting).
- File: https://www.ercot.com/files/docs/2007/10/31/mer_mms_hf_prototypes_v0_03.doc, 1,987,072 bytes, SHA-256
  `0bb311f8e5bdb88e93eef66bd9fa3aeec25d5f4cfc2ae5f31bc12ef900beb315`.
- Notices: "ERCOT Public" in the page header; "© 2007 Electric Reliability Council of Texas, Inc. All rights
  reserved." in the footer.
- Used:
  - Page 1: from the first two paragraphs, quoted in [provenance.md](provenance.md).
  - Page 6, "2.0 Resource-Specific Submissions Landing Page":
    [2007-10-31-mms-ui-prototypes-v0.03-page06-resource-specific-submissions.png](ercot/2007-10-31-mms-ui-prototypes-v0.03-page06-resource-specific-submissions.png),
    a crop of the screenshot embedded on the page (PNG, 1152×593, SHA-256
    `ba87d1cd1e6242386b2da378f7754045976777203a17671b4b5767eefb5babba`), box (16, 94)–(1119, 523).
  - Page 12, "3.1 DAM Energy-Only Offer Curve":
    [2007-10-31-mms-ui-prototypes-v0.03-page12-dam-energy-only-offer-curve.png](ercot/2007-10-31-mms-ui-prototypes-v0.03-page12-dam-energy-only-offer-curve.png),
    a crop of the embedded screenshot (PNG, 1184×690, SHA-256
    `8e36dc846fc1ba429568b629e1db531b2abd809b2acb0ce7921ee92e27984cc9`), box (16, 94)–(1151, 648).
  - Page 15, "5.0 Queries – Trades":
    [2007-10-31-mms-ui-prototypes-v0.03-page15-submit-query.png](ercot/2007-10-31-mms-ui-prototypes-v0.03-page15-submit-query.png),
    a crop of the embedded screenshot (PNG, 1093×751, SHA-256
    `1a34e57d7998c9187f9ca407a2796eae7ae38baa9fc9aef13b17d0bc3c47a132`), box (16, 94)–(1060, 447).
  - Each box keeps the page shown inside the browser window and leaves out the window itself. On page 15 it also
    leaves out the query results below the Submit Query panel.

### User Interface Status, 6 November 2007

- Title as printed: "User Interface Status", with "TPTF" and "November 6, 2007". ERCOT's meeting page lists it as "19-
  Presentation - User Interface Status", posted on 2 November 2007.
- Meeting: [TPTF meeting, 5 November 2007](https://www.ercot.com/calendar/11052007-TPTF-Meeting).
- File: https://www.ercot.com/files/docs/2007/11/02/19_presentation_user_interface_status.ppt, 1,609,728 bytes, SHA-256
  `de4a803f97fb39d0e8549ae2c83fab3524e6dbe8eb93e1e890c4bb5e62394435`.
- Notices: none printed. The ERCOT logo appears on slides 1 to 5 and inside the screenshots on slides 7 and 8; no
  excerpt shows it.
- Used:
  - Slide 4, "UI Subgroup Meetings":
    [2007-11-06-user-interface-status-slide04-ui-subgroup-meetings.png](ercot/2007-11-06-user-interface-status-slide04-ui-subgroup-meetings.png),
    a crop of the slide as LibreOffice draws it ([method](#how-the-excerpts-were-made)), box (0, 0)–(1500, 1012) of
    the 1500×1125 render, which stops above the slide footer.
  - Slide 5, "UI Subgroup Participation": two lines quoted in [provenance.md](provenance.md). The slide's list of
    companies is not reproduced.
  - Slide 7, "MIS Real-Time Landing Page":
    [2007-11-06-user-interface-status-slide07-market-manager-links.png](ercot/2007-11-06-user-interface-status-slide07-market-manager-links.png),
    a crop of the embedded screenshot (PNG, 770×624, SHA-256
    `7c19f03f0b30871d27bcb7dbc6de5612bacbf70c5ed3a8356b04bcd84df53344`), box (6, 140)–(260, 318): the Market Manager
    portlet only.
  - Slide 11, "Bids and Offers Landing Page":
    [2007-11-06-user-interface-status-slide11-bids-and-offers-grid.png](ercot/2007-11-06-user-interface-status-slide11-bids-and-offers-grid.png),
    a crop of the embedded screenshot (PNG, 1216×905, SHA-256
    `6735773f03e5c3d95c2ee98baa723b9383f23e6e44d861e8db235f70d564ba6c`), box (16, 94)–(1193, 276): from the top of
    the page in the browser window down to the column headers, above the first row.

### MMS Wireframes, Conceptual Designs, Version 0.03, 13 September 2007

- Title as printed on page 1. ERCOT's file name and meeting page call it v0.04 ("MMS Wireframes v0.04").
- Meeting: [UI Subgroup meeting, 17 September 2007](https://www.ercot.com/calendar/09172007-UI-Subgroup-Meeting).
- File: https://www.ercot.com/files/docs/2007/09/13/mms_wireframes_v0.04.doc, 3,014,656 bytes, SHA-256
  `f4ee7377b5eb7e49297a06e5087d34b8f679177be469b95e5614a2cceb5fe621`.
- Notices: none printed. Page 1 carries the ERCOT logo, which no excerpt shows.
- Used: page 7, "MMS Dashboard (Home, Summary Screen)":
  [2007-09-13-mms-wireframes-v0.04-page07-dashboard.png](ercot/2007-09-13-mms-wireframes-v0.04-page07-dashboard.png),
  a crop of the page's drawing as rendered here ([method](#how-the-excerpts-were-made)), box (0, 0)–(1528, 236) of
  the 1528×1084 render: the title line, the banner, the tabs and the operating-day line.

### MMS Wireframes, Conceptual Designs, Version 0.02, 15 August 2007

- Title as printed on page 1. ERCOT's file name and meeting page call it v0.03 ("MMS Wireframes v0.03").
- Meeting: [UI Subgroup meeting, 15 August 2007](https://www.ercot.com/calendar/08152007-UI-Subgroup-Meeting).
- File: https://www.ercot.com/files/docs/2007/08/15/mms_wireframes_v0.03.pdf, 201,219 bytes, SHA-256
  `a3c98fa8430d64ff3d3baa846b1553c4bb587589fbb4110ae979801d331ee6a4`.
- Notices: none printed. Page 1 carries the ERCOT logo, which no excerpt shows.
- Used: page 2, "MMS Home":
  [2007-08-15-mms-wireframes-v0.03-page02-banner-and-tabs.png](ercot/2007-08-15-mms-wireframes-v0.03-page02-banner-and-tabs.png),
  a crop of the page as rendered here ([method](#how-the-excerpts-were-made)), box (85, 40)–(1515, 348) of the
  1650×1275 render: the banner, the tabs and the Create Trade section, above the trade grids.

### User Interfaces Subgroup Meeting Notes, 17 September 2007

- Title as printed: "User Interfaces Subgroup Meeting Notes", with "Monday, September 17, 2007". ERCOT's meeting page
  lists it as "Meeting Notes: UI Subgroup", posted on 6 November 2007.
- Meeting: [UI Subgroup meeting, 17 September 2007](https://www.ercot.com/calendar/09172007-UI-Subgroup-Meeting).
- File: https://www.ercot.com/files/docs/2007/11/06/meeting_notes_0917_ui_subgroup.doc, 117,248 bytes, SHA-256
  `7bfa53a00cef2834b4c8d409bdbc799385e01a6d7af7774b8fdf05645ad4902f`.
- Notices: "ERCOT Public" in the page header; "© Copyright ERCOT 2007" in the footer.
- Used: one phrase, quoted under [Access](#access). The list of attendees is not reproduced.

## Excerpt files

Of the nine images, one is unmodified, five are crops of embedded screenshots and three are crops of renders; the
sections above say which. The SHA-256 of every file in `docs/ercot/`, as `shasum -a 256` prints them when run there:

```text
d79a0d5d060b5eeaeecc99dd2c98e4bf0ff205bf6e5f50752a738dcef93bf4cd  2007-08-15-mms-wireframes-v0.03-page02-banner-and-tabs.png
6a4613b7bc7bb057a5ee8204184b242ff94c2433820aa294511c568513c61c1a  2007-09-13-mms-wireframes-v0.04-page07-dashboard.png
7e1b1d83a276b3bd2372e6fa0080383879d1cfd126414f8f97c509dd749da3ab  2007-10-31-mms-ui-prototypes-v0.03-page06-resource-specific-submissions.png
a181bdbc9a4783f3c27b2a2b04fb09140f80a470c8abc80a936c5ebb4d73bf37  2007-10-31-mms-ui-prototypes-v0.03-page12-dam-energy-only-offer-curve.png
471cc90121d7dcca3238b156c6dcfe979bab815405f7285db5be0e5a00c0e6f4  2007-10-31-mms-ui-prototypes-v0.03-page15-submit-query.png
815b925ee244b1fb55b12f28ec39142253794c1abbe550de94ca9162814391f5  2007-11-06-user-interface-status-slide04-ui-subgroup-meetings.png
cf52890e2416d67b9b73e7a595d118c39a3079b374403b22220c3a62169baaab  2007-11-06-user-interface-status-slide07-market-manager-links.png
76136b9fe5cfae59c448b8c15d1dd78d1f32891d0f3f73c6cb1a40e75a8bd991  2007-11-06-user-interface-status-slide11-bids-and-offers-grid.png
cf14902e574a82d07d89e27aaacef41e1fb1166fc9b498213ac41acabfe4432d  2026-08-20-nprr1188-system-impacts-slide05-energy-bid-curve.png
b8a24e533ddb363e2bb10e80acca272990fd87489c9ce6caf46a96b84877393a  ERCOT-TERMS-OF-USE.txt
```

File names start with the document's date, then the document, the page or slide, and what the excerpt shows. Before
cutting, each document was checked against the SHA-256 above and each embedded screenshot against its own SHA-256.
Every excerpt was checked at full size: none shows a browser window, a logo, contact details, or the name of a
person, a company or a resource.

## How the excerpts were made

- Embedded screenshots. Word and PowerPoint 97–2003 files keep pictures in a stream (`Data` in Word, `Pictures` in
  PowerPoint). Each screenshot was copied out byte for byte with olefile 0.47, matched by its PNG signature and end
  marker, and cropped with Pillow 12.3.0 on Python 3.13.0. Nothing else is done to the pixels.
- PDF page (Version 0.02 wireframes). pdftoppm from poppler 26.06.0 at 150 dpi. The PDF does not embed its fonts
  (Arial, Tahoma), so they come from the machine that renders it.
- PowerPoint slide (User Interface Status, slide 4). LibreOffice version 26.8.0.3, headless, converts the deck to PDF,
  and pdftoppm renders the slide at 150 dpi. LibreOffice draws the text in Liberation Sans, Liberation Serif and
  Linux Libertine G, so the excerpt is LibreOffice's drawing of the slide, not PowerPoint's.
- Word page with a Visio drawing (Version 0.03 wireframes, page 7). LibreOffice does not draw the text or the lines
  of these embedded drawings. The excerpt therefore renders the drawing's own print picture: the EMF in the
  `\x03EPRINT` stream under `ObjectPool/_1251192831` (119,468 bytes). LibreOffice converts the EMF to a drawing,
  whose page and picture are then set to the EMF's frame, 258.62 × 183.42 mm, with no margins; LibreOffice exports
  that page to PDF, and pdftoppm renders it at 150 dpi. The text is drawn in Liberation Sans.
- All crops are saved as lossless PNG; decoded, each file holds exactly the cropped pixels. The renders were made on
  macOS 26.5.2 (arm64); other versions or fonts can move pixels, so a re-cut elsewhere may differ slightly.

## ERCOT's terms

[ERCOT-TERMS-OF-USE.txt](ercot/ERCOT-TERMS-OF-USE.txt) is the text of ERCOT's Website User Agreement,
https://www.ercot.com/help/terms, "Last updated: 07/20/2023", unchanged when checked on 8 October 2026. Section 5
reads in part:

> The publicly available contents of this website may be used, reproduced, and redistributed, provided that the
> contents are not modified and that you maintain all copyright and other notices contained in the contents,
> including this Agreement.

Section 9:

> The ERCOT logo, "ERCOT," and "The Texas Connection" are either trademarks or registered trademarks of ERCOT and may
> not be used without the prior written permission of ERCOT.

How each kind of excerpt relates to them:

- The slide 5 screenshot is a file ERCOT published inside its deck, kept byte for byte, with the Agreement beside it
  in the same folder and the deck's "PUBLIC" label recorded above. It is redistributed on the terms of section 5.
- The crops and renders are modified extracts: parts of screenshots, and pages drawn by other software. Section 5
  covers contents that are not modified, so it does not cover them, and no other permission from ERCOT is claimed.
  Each is a small part of its document, credited to it, and shown to compare the skin with ERCOT's published designs
  or to record how those designs were reviewed.
- The quotations are short and credited to their sources.
- No excerpt shows an ERCOT logo. The repository uses the name ERCOT to say what the skin recreates and where each
  excerpt comes from; see [NOTICE](../NOTICE).

## Access

The README's "Why this exists" rests on these ERCOT sources.

- "Market Manager (MMS UI) Changes" is the title of slide 5 of the TWG deck above.
- ERCOT's browser configuration guide for Chrome lists the "Market Management System (MMS)" and the "Market
  Information System (MIS)" in its scope, and its section 5.1 says: "Market Participants use digital certificates to
  authenticate access to external applications."
  (https://developer.ercot.com/support/browsers/chrome/Chrome_Config_Guide/, text from the Developer Portal's search
  index, downloaded on 8 October 2026)
- ERCOT's "MIS Log In" link, https://www.ercot.com/mp/mis-ercot-com, redirects to https://mis.ercot.com/secure and
  from there to a certificate sign-in address on the same host. Without a client certificate, the server ends the
  connection at that address with a TLS handshake failure (one request, 8 October 2026).
- ERCOT Nodal Protocols, as of 1 August 2026 (https://www.ercot.com/mktrules/nprotocols/current). Section 2.1 defines
  the MIS Secure Area as "The portion of the MIS that is available only to registered Market Participants" and the
  MIS Certified Area as "The portion of the MIS that is available only to a specific Market Participant". Section
  16.12(2): "The Market Participant's USA is responsible for registering all MIS users and administering their access
  to the MIS on behalf of the Market Participant."
- Market Manager and the MIS. Section 4.4.9.3.2(3), in the same version of the Protocols: "ERCOT shall continuously
  validate Energy Offer Curves and continuously display on the MIS Certified Area information that allows any QSE to
  view its valid Energy Offer Curves." ERCOT's 2007 design record links the two: the UI Subgroup meeting notes of
  17 September 2007 (above) describe launching "a separate browser instance of the MMS Market Manager from the MIS",
  and slide 7 of User Interface Status shows Market Manager as a portlet on a prototype MIS landing page. No current
  ERCOT text found names Market Manager as part of the MIS.
- NPRR1306, "Removal of Digital Certificate References for Market Participants with ERCOT MIS Access", approved by the
  PUCT on 9 July 2026 and effective on 1 August 2026 (https://www.ercot.com/mktrules/issues/NPRR1306). ERCOT
  describes it: "This Nodal Protocol Revision Request (NPRR) replaces the concept of “Digital Certificates”
  throughout the Protocols with references to more technology-neutral means whereby restricted Market Information
  System (MIS) access is granted to certain Market Participant users by each individual Market Participant’s User
  Security Administrator (USA)." The README therefore names the User Security Administrator's role rather than a
  credential.
- Below its list of documents, each meeting page cited above says: "All information is posted as Public in
  accordance with the ERCOT Websites Content Management Corporate Standard."
