# Prior art

This page records a search for any other public recreation of the look of ERCOT's Market Management System (MMS)
screens, run on Thursday 8 October 2026 from 09:45 to 10:35 CT and checked in a second pass from 10:45 to 11:40 CT, so
that it can be repeated. A public repository counts whether or not it carries a licence.

## Result

None found.

- Repository search. The queries for ERCOT with MMS, Market Manager or Market Management System, in names,
  descriptions, topics and README text, returned this repository and a list of MCP servers in which MMS means
  multimedia messaging. The queries for ERCOT with CSS, UI, skin, theme, Figma, mockup or clone returned this
  repository and two forecasting apps on names, descriptions and topics. On README text, ERCOT with CSS returned 167
  repositories, all covered by the contents pass below.
- Code search. 20 repositories have CSS that contains the word ERCOT; each colours, styles or labels ERCOT on a
  dashboard, map or personal site. Two of them cite ERCOT as a style source, a control-room look for a simulated grid
  and an "ERCOT-style" chart legend; neither is the MMS. No HTML, TSX, JSX, Vue, SCSS or LESS file that code search
  returned shows ERCOT together with MMS or Market Manager in its matched text. Among the first 1,000 of 15,136
  results for `ercot mms` in any file type, the ten repositories where both words appear hold text corpora, job
  lists, notes, protocol text and ERCOT's own XSD comments.
- Contents. In the README and file list of each of the 1,278 repositories from the repository queries, the mentions of
  MMS are this repository, an EWS client whose README describes submissions into the MMS, Australian market data from
  a system also called MMS, SMS and MMS messaging, job titles, and one EWS client module named `ercot_mms`.
- Registries. No npm package or PyPI project name, and no Hugging Face Space, model or dataset, is about the MMS.
- Second pass. It ran 261 more GitHub searches (topics, repositories, commits, issues and code) and listed every
  repository that GitHub's repository search returns for ERCOT in a name, description or README, forks left out:
  2,165. It fetched the READMEs (890) and file lists (891) of the 894 that the first pass had not scanned. It also
  looked beyond GitHub's repository and code search: gists (122 reported for `ercot`, 115 of them readable), an
  archive of deleted repositories, other code hosts, other package registries and a web search engine. Nothing it
  found recreates the MMS look. Its queries are not listed below.

ERCOT's own public repositories hold no user interface. [ercot/api-specs](https://github.com/ercot/api-specs)
publishes specifications, among them the EWS XSDs and WSDLs and the Public API's OpenAPI description, and
[ercot/ews-client](https://github.com/ercot/ews-client) is a sample Java client for EWS.

## What was searched

| Where               | How                                                                                      | Found                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| GitHub repositories | `gh search repos`: 42 queries on names, descriptions and topics, 18 on README text       | 1,278 repositories                                                      |
| GitHub code         | `gh search code` (GitHub's REST code search): 45 queries                                 | 2,591 repositories with a match, 87 with the query terms as whole words |
| Repository contents | the README and the file list of each of the 1,278 repositories                           | 1,140 READMEs, 1,255 file lists                                         |
| npm                 | registry search, 5 queries                                                               | 10 results for `ercot`, none about the MMS                              |
| PyPI                | project names containing `ercot`, out of 908,766                                         | 5, none about the MMS                                                   |
| Hugging Face        | Spaces, models and datasets matching `ercot`                                             | 8, none about the MMS                                                   |
| Second pass         | 261 more GitHub searches; the README and file list of each repository not scanned before | 2,165 repositories, 894 of them new; none recreates the MMS look        |

## Method

- Account. Every GitHub query on this page ran signed in as the wattness account, which can see public repositories
  only, so the results are what any signed-in GitHub user sees. GitHub's code search needs a signed-in user. The
  second pass's gist search ran signed out. This repository and
  [ercot-ews-check](https://github.com/wattness/ercot-ews-check) were public when the search ran; they appear in the
  search results and are not counted.
- Repository search matches names, descriptions and topics, and README text with `--match readme`. The words of a
  query are combined with AND, in any order; quoted strings match as phrases. Forks are left out unless the query says
  `fork:true`. Each query fetched every result, up to GitHub's cap of 1,000.
- Code search covers default branches and files under 384 KB, returns at most 1,000 results per query, and matches
  inside longer identifiers. A code hit counted only when the returned fragments hold the query's terms as whole words.
- Every repository whose README or file names mention EWS, XSD, WSDL, SOAP, BidSet, MMS, Market Manager or MOTE, or
  that a code query matched on such a term as a whole word, was checked by hand, with others that the targeted queries
  returned: 125 repositories in all. The rest were classified from their names, descriptions and README text.
- The same search also asked whether a public tool checks ERCOT EWS submissions, for ercot-ews-check. Its queries
  are in the list below, so the list matches the counts above.

## Limits

- Repository search finds a repository only if ERCOT appears in its name, description, topics or README. A project
  that never names ERCOT there is missed unless code search finds it.
- GitHub's code search index is incomplete: of 16 public repositories probed that contain the word ERCOT, it
  returned nothing for 8, this repository among them.
- Three code queries stopped at GitHub's cap of 1,000 (C32, C36, C41), and C39 at 300 after a time-out; for those
  four, the results not returned are the lowest ranked. Four others returned fewer results than their `total`
  although it was under 1,000 (C01, C21, C24, C30), and GitHub did not say which results it left out
  (`incomplete_results` was false).
- Private repositories, in-house tools and commercial products cannot be seen this way. Some other hosts' search
  needs an account; the second pass reached those only through the web search engine and the archive.
- PyPI was checked by project name only, because its search page refused automated access. npm's search matches
  names, descriptions and keywords, not READMEs.
- The result holds for 8 October 2026.

## Queries

Multi-word queries match all words, in any order; quoted strings match as phrases. `total` is GitHub's `total_count`
on 8 October 2026.

| ID  | Searched                    | Query                                   | total |
| --- | --------------------------- | --------------------------------------- | ----: |
| R01 | names, descriptions, topics | `ercot mms`                             |     1 |
| R02 | names, descriptions, topics | `ercot market manager`                  |     0 |
| R03 | names, descriptions, topics | `market management system ercot`        |     0 |
| R04 | names, descriptions, topics | `ercot ews`                             |     3 |
| R05 | names, descriptions, topics | `ercot web services`                    |     2 |
| R06 | names, descriptions, topics | `ercot nodal web services`              |     0 |
| R07 | names, descriptions, topics | `ercot xsd`                             |     1 |
| R08 | names, descriptions, topics | `ercot bid submission`                  |     0 |
| R09 | names, descriptions, topics | `ercot bidset`                          |     0 |
| R10 | names, descriptions, topics | `ercot soap`                            |     1 |
| R11 | names, descriptions, topics | `ercot qse`                             |     0 |
| R12 | names, descriptions, topics | `ercot offer`                           |     4 |
| R13 | names, descriptions, topics | `ercot css`                             |     1 |
| R14 | names, descriptions, topics | `ercot ui`                              |     2 |
| R15 | names, descriptions, topics | `ercot bid`                             |     5 |
| R16 | names, descriptions, topics | `ercot submission validator`            |     0 |
| R17 | names, descriptions, topics | `ercot`                                 |   666 |
| R18 | names, descriptions, topics | `topic:ercot`                           |    50 |
| R19 | names, descriptions, topics | `ercot wsdl`                            |     0 |
| R20 | names, descriptions, topics | `ercot validator`                       |     4 |
| R21 | names, descriptions, topics | `ercot validation`                      |     4 |
| R22 | names, descriptions, topics | `ercot schema`                          |     0 |
| R23 | names, descriptions, topics | `ercot xml`                             |     0 |
| R24 | names, descriptions, topics | `ercot mis`                             |     8 |
| R25 | names, descriptions, topics | `ercot "market information system"`     |     0 |
| R26 | names, descriptions, topics | `ercot certificate`                     |     1 |
| R27 | names, descriptions, topics | `ercot mote`                            |     0 |
| R28 | names, descriptions, topics | `ercot nodal`                           |     9 |
| R29 | names, descriptions, topics | `ercot client`                          |     9 |
| R30 | names, descriptions, topics | `ercot api`                             |    38 |
| R31 | names, descriptions, topics | `ercot scraper`                         |    12 |
| R32 | names, descriptions, topics | `ercot trading`                         |    20 |
| R33 | names, descriptions, topics | `ercot bidding`                         |     5 |
| R34 | names, descriptions, topics | `ercot dashboard`                       |    55 |
| R35 | names, descriptions, topics | `ercot skin`                            |     1 |
| R36 | names, descriptions, topics | `ercot theme`                           |     0 |
| R37 | names, descriptions, topics | `ercot "external web services"`         |     0 |
| R38 | names, descriptions, topics | `ercot ews fork:true`                   |    10 |
| R39 | names, descriptions, topics | `ercot mms fork:true`                   |     1 |
| R40 | README text                 | `ercot ews`                             |     6 |
| R41 | README text                 | `ercot mms`                             |     2 |
| R42 | README text                 | `ercot xsd`                             |     3 |
| R43 | README text                 | `ercot bidset`                          |     2 |
| R44 | README text                 | `ercot "external web services"`         |     1 |
| R45 | README text                 | `ercot "market manager"`                |     1 |
| R46 | README text                 | `ercot soap`                            |     8 |
| R47 | README text                 | `ercot wsdl`                            |     8 |
| R48 | README text                 | `ercot qse`                             |    13 |
| R49 | README text                 | `ercot "market management system"`      |     1 |
| R50 | README text                 | `ercot css`                             |   167 |
| R51 | README text                 | `ercot validator`                       |   562 |
| R52 | README text                 | `ercot "digital certificate"`           |     3 |
| R53 | README text                 | `ercot "energy offer"`                  |     4 |
| R54 | names, descriptions, topics | `ercot figma`                           |     0 |
| R55 | names, descriptions, topics | `ercot mockup`                          |     0 |
| R56 | names, descriptions, topics | `ercot clone`                           |     0 |
| R57 | README text                 | `ercot validate`                        |   560 |
| R58 | README text                 | `ercot mote`                            |     0 |
| R59 | README text                 | `ercot "web services"`                  |    41 |
| R60 | README text                 | `ercot submission`                      |   111 |
| C01 | code                        | `ErcotCommonTypes`                      |   101 |
| C02 | code                        | `ASOnlyOffer`                           |    12 |
| C03 | code                        | `EnergyOnlyOffer`                       |    76 |
| C04 | code                        | `ThreePartOffer`                        |    22 |
| C05 | code                        | `misapi.ercot.com`                      |    49 |
| C06 | code                        | `eEDS/EWS`                              |    43 |
| C07 | code                        | `Nodal.wsdl`                            |    25 |
| C08 | code                        | `BidSet ercot`                          |    25 |
| C09 | code                        | `MarketManager ercot`                   |     4 |
| C10 | code                        | `"Market Manager" ercot css`            |     0 |
| C11 | code                        | `"Market Manager" ercot extension:css`  |     0 |
| C12 | code                        | `ercot extension:css`                   |   184 |
| C13 | code                        | `ercot extension:scss`                  |    46 |
| C14 | code                        | `ercot mms extension:html`              |   252 |
| C15 | code                        | `"Market Manager" ercot extension:html` |     0 |
| C16 | code                        | `nodal/ews/message`                     |    69 |
| C17 | code                        | `schema/2007-06/nodal/ews`              |   295 |
| C18 | code                        | `ewsConcrete`                           |   185 |
| C19 | code                        | `NodalService.serviceagent`             |    34 |
| C20 | code                        | `ErcotTransactions`                     |     1 |
| C21 | code                        | `ercot extension:xsd`                   |   386 |
| C22 | code                        | `ercot extension:wsdl`                  |    65 |
| C23 | code                        | `ReplayDetection ercot`                 |    59 |
| C24 | code                        | `zeep ercot`                            |   425 |
| C25 | code                        | `BinarySecurityToken ercot`             |    15 |
| C26 | code                        | `testmisapi.ercot.com`                  |     9 |
| C27 | code                        | `IncDecOffer`                           |    32 |
| C28 | code                        | `PTPObligation`                         |    51 |
| C29 | code                        | `SelfArrangedAS`                        |    41 |
| C30 | code                        | `api.ercot.com`                         |   446 |
| C31 | code                        | `misapp/GetReports`                     |    95 |
| C32 | code                        | `ercot mms`                             | 15136 |
| C33 | code                        | `schema filename:ErcotCommonTypes.xsd`  |    10 |
| C34 | code                        | `definitions filename:Nodal.wsdl`       |    16 |
| C35 | code                        | `EnergyBid ercot`                       |    98 |
| C36 | code                        | `ercot xsd validate`                    |  2076 |
| C37 | code                        | `ercot "Market Management System"`      |    22 |
| C38 | code                        | `misapitest.ercot.com`                  |     2 |
| C39 | code                        | `ercot ews`                             | 72704 |
| C40 | code                        | `MarketTransactions ercot`              |    41 |
| C41 | code                        | `BidSet validate`                       |  3552 |
| C42 | code                        | `ercot mms extension:tsx`               |    19 |
| C43 | code                        | `ercot mms extension:jsx`               |     5 |
| C44 | code                        | `ercot mms extension:vue`               |     0 |
| C45 | code                        | `ercot extension:less`                  |     4 |

To repeat one, signed in to GitHub with gh 2.92 or later:

```sh
gh search repos ercot mms --limit 1000 --json fullName,url,description
gh search repos ercot css --match readme --limit 1000 --json fullName,url,description
gh search code ercot --extension css --limit 1000 --json path,repository,url
gh api -X GET search/repositories -f 'q=ercot mms' -f per_page=1 --jq .total_count
```
