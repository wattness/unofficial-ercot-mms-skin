# Provenance

**Unofficial.** Not affiliated with or endorsed by ERCOT. Every image captioned "Source: ERCOT" is ERCOT's;
[sources.md](sources.md) lists each one with its document, SHA-256 and how it was cut.

The values marked `sampled` in `src/tokens.css` come from one image, ERCOT's 2026 screenshot of the Energy Bid Curve
screen, and the skin follows that screen. This page adds the older public record. In 2007 ERCOT posted drafts of these
screens for review at UI Subgroup meetings; on 8 October 2026 the files were still on ercot.com. Each excerpt below
sits beside the matching part of the skin.

No value in `src/tokens.css` is taken from the 2007 documents. Between them, the Market Manager screenshots in ERCOT's
2007 MMS UI Prototypes use seven of the eight sampled colours exactly, and each has a 4px navy rule like today's. None
has an amber selected row; a close amber (`#f7ca68`) fills the title bands of the trade grids. Their grid rows are
25px or more apart, against 23px today.

## Today's screen

![ERCOT's screenshot of the Energy Bid Curve tab in Market Manager: tab strip, query band and a results grid whose resource names ERCOT blurred, with three red ovals added by ERCOT](ercot/2026-08-20-nprr1188-system-impacts-slide05-energy-bid-curve.png)

Source: ERCOT, NPRR 1188 – System Impacts Overview, 20 August 2026, slide 5,
[ERCOT-TWG-2026-08-20-NPRR-1188-System-Impacts.pptx](https://www.ercot.com/files/docs/2026/08/20/ERCOT-TWG-2026-08-20-NPRR-1188-System-Impacts.pptx).
Unmodified; ERCOT added the red ovals and blurred the resource names. Redistributed on the terms of section 5 of
ERCOT's Website User Agreement, kept in [ercot/ERCOT-TERMS-OF-USE.txt](ercot/ERCOT-TERMS-OF-USE.txt).

<img src="img/screen-energy-bid-curve.png" width="1184" alt="The same screen drawn with this skin: the same seven tabs, the query band and a results grid listing DEMO_RES_01 to DEMO_RES_06">

This skin: the same screen on made-up data, [demo/energy-bid-curve.html](../demo/energy-bid-curve.html). The ten
sampled values were measured from ERCOT's image above.

## Tab strip

![ERCOT's August 2007 wireframe of the MMS Home screen: a welcome bar, an MMS Banner placeholder, seven tabs with Trades selected in white, and a Create Trade form](ercot/2007-08-15-mms-wireframes-v0.03-page02-banner-and-tabs.png)

Source: ERCOT, MMS Wireframes, Conceptual Designs, Version 0.02, 15 August 2007, page 2,
[mms_wireframes_v0.03.pdf](https://www.ercot.com/files/docs/2007/08/15/mms_wireframes_v0.03.pdf). Crop of a render
of that page.

<img src="img/component-tab-strip.png" width="706" alt="The skin's tab strip: five slanted tabs over a navy rule, the first selected and the last disabled">

This skin: tab strip (`src/components/tabstrip.css`). The August 2007 wireframe marks the selected tab by leaving it
white; the skin draws today's slanted tabs over the navy rule.

## Query panel

![ERCOT's 2007 Market Manager prototype, Queries tab: a Submit Query panel with Submission Type, a date and time range, Status, Product, Counterparty, Load Zone, Hub and Resource Node, closed by Cancel and Submit](ercot/2007-10-31-mms-ui-prototypes-v0.03-page15-submit-query.png)

Source: ERCOT, MMS UI Prototypes, 31 October 2007, page 15,
[mer_mms_hf_prototypes_v0_03.doc](https://www.ercot.com/files/docs/2007/10/31/mer_mms_hf_prototypes_v0_03.doc).
© 2007 Electric Reliability Council of Texas, Inc. Crop of the screenshot embedded on that page.

<img src="img/component-query-panel.png" width="792" alt="The skin's query panel: a Query title band, a row of criteria and a band of Submit, Copy, Cancel and Export buttons">

This skin: query panel (`src/components/query.css`), made-up values. Both stack a title band, a block of labelled
criteria and a band of buttons.

## Results grid

![ERCOT's 2007 Market Manager prototype, Bids and Offers tab: a Current Submissions for Bids and Offers title band over a pale-blue band of operating days and the column headers Sett Point and Offer ID](ercot/2007-11-06-user-interface-status-slide11-bids-and-offers-grid.png)

Source: ERCOT, User Interface Status, 6 November 2007, slide 11,
[19_presentation_user_interface_status.ppt](https://www.ercot.com/files/docs/2007/11/02/19_presentation_user_interface_status.ppt).
Crop of the screenshot embedded on that slide, above its first row.

<img src="img/component-results-grid.png" width="792" alt="The skin's results grid: a pale-blue title band, white column headers and five rows, one selected in amber and one flagged">

This skin: results grid (`src/components/grid.css`), made-up rows. In 2007 the pale blue (`#b8c9e2`) filled the band
of operating days; on today's screen it fills the results title, as in the skin.

## Form controls

![ERCOT's 2007 Market Manager prototype of the DAM Energy-Only Offer Curve form: operating-day checkboxes, Load Zone, Hub and Resource Node selects, expiration selects with a calendar button, Fixed and Variable radio buttons, a Copy Tool, a 24 Hours band, and Import, Export, Cancel Offer and Update/Submit buttons](ercot/2007-10-31-mms-ui-prototypes-v0.03-page12-dam-energy-only-offer-curve.png)

Source: ERCOT, MMS UI Prototypes, 31 October 2007, page 12,
[mer_mms_hf_prototypes_v0_03.doc](https://www.ercot.com/files/docs/2007/10/31/mer_mms_hf_prototypes_v0_03.doc).
© 2007 Electric Reliability Council of Texas, Inc. Crop of the screenshot embedded on that page.

<img src="img/component-form-controls.png" width="871" alt="The skin's controls: a select, number inputs, checkboxes, a text input, a disabled input, an open combobox with a search field, and an open calendar">

This skin: controls, combobox and date picker (`src/components/controls.css`, `combobox.css`, `datepicker.css`),
made-up values. The 2007 form already pairs selects and checkboxes with a calendar button.

## Side navigation

![ERCOT's 2007 prototype of a Market Manager portlet: a title bar and links to View Dashboard, View Trades, View Resource-Specific Submissions, View Bids and Offers, View Schedules and Query Submissions](ercot/2007-11-06-user-interface-status-slide07-market-manager-links.png)

Source: ERCOT, User Interface Status, 6 November 2007, slide 7,
[19_presentation_user_interface_status.ppt](https://www.ercot.com/files/docs/2007/11/02/19_presentation_user_interface_status.ppt).
Crop of the screenshot embedded on that slide, a prototype MIS landing page.

<img src="img/component-side-navigation.png" width="208" alt="The skin's side navigation: Day-Ahead, Real-Time and Reports headings, with Energy Offers selected in navy">

This skin: side navigation (`src/components/sidenav.css`). In the 2007 prototype the Market Manager screens are links
in a portlet on the MIS landing page; the skin groups screens under headings in a side panel.

## Operating day and clock

![ERCOT's September 2007 wireframe of the MMS Dashboard: a Market Manager banner, four tabs with Dashboard selected, and the line Current Operating Day: Sep 15 2007 1113 CDST](ercot/2007-09-13-mms-wireframes-v0.04-page07-dashboard.png)

Source: ERCOT, MMS Wireframes, Conceptual Designs, Version 0.03, 13 September 2007, page 7,
[mms_wireframes_v0.04.doc](https://www.ercot.com/files/docs/2007/09/13/mms_wireframes_v0.04.doc). Crop of a render of
the drawing on that page.

<img src="img/component-masthead.png" width="880" alt="The skin's masthead: a title, DEMO and made-up-data badges, a market clock with the phase and a countdown, and the operating day, QSE and resource pickers">

This skin: masthead and market clock (`src/components/masthead.css`, `clock.css`), made-up values. The September 2007
dashboard shows the operating day and the time under the tabs; the skin's masthead carries both.

## A whole screen

![ERCOT's 2007 Market Manager prototype of the Resource-Specific Submissions landing page: a Market Manager title, eight tabs, and a grid of operating days with one row per submission type and a Create button on each](ercot/2007-10-31-mms-ui-prototypes-v0.03-page06-resource-specific-submissions.png)

Source: ERCOT, MMS UI Prototypes, 31 October 2007, page 6,
[mer_mms_hf_prototypes_v0_03.doc](https://www.ercot.com/files/docs/2007/10/31/mer_mms_hf_prototypes_v0_03.doc).
© 2007 Electric Reliability Council of Texas, Inc. Crop of the screenshot embedded on that page.

<img src="img/screen-energy-offer-curve.png" width="1280" alt="The skin's demo page: masthead, side navigation, tab strip, a query panel and an energy offer curve grid on made-up data">

This skin: [demo/index.html](../demo/index.html) on made-up data. Both have a navy rule under the tabs and a pale-blue
band at the top of the grid.

## 2007 review meetings

![ERCOT's slide UI Subgroup Meetings: the topics of the meetings of 15 August, 17 September, 11 October, 7 November and 5 December 2007, from reviewing the MMS wireframes to reviewing a working version of the MMS user interfaces](ercot/2007-11-06-user-interface-status-slide04-ui-subgroup-meetings.png)

Source: ERCOT, User Interface Status, 6 November 2007, slide 4,
[19_presentation_user_interface_status.ppt](https://www.ercot.com/files/docs/2007/11/02/19_presentation_user_interface_status.ppt).
Crop of a render of that slide.

The next slide, "UI Subgroup Participation", reads "114 individual subscribers to exploder list" and "23 companies
participating in meetings"; its list of companies is not reproduced here. The prototypes of 31 October 2007 open:

> This document contains the third iteration of paper prototypes for MMS screens. […] The deadline for comments is
> Nov. 7 at the UI Subgroup meeting. […]
>
> We plan to improve on the design during 2008 with feedback from MPs.

ERCOT's pages for these meetings list the documents (checked on 8 October 2026), and below the list they say: "All
information is posted as Public in accordance with the ERCOT Websites Content Management Corporate Standard."
