# Analytics and lead tracking

The site pushes named events to the GTM `dataLayer`. GTM forwards them to GA4 (`G-06DS8V2DMQ`). Nothing is sent to GA4 from the code directly. Code: `lib/analytics.ts`, `lib/booking.ts`, `components/site-analytics.tsx`.

## Where a lead came from

Every visit records two touches. No personal data is stored.

- **First touch.** The first time this browser reached the site. Kept 90 days in `localStorage`.
- **Last touch.** What brought this visit. Kept in `sessionStorage`.

Each touch is a source and medium, using GA4's naming: `google / organic`, `linkedin / social`, `chatgpt / ai`, `newsletter / email (campaign)`, `direct / none`. It also carries any UTM fields, the ad click id, `?src=`, the landing page and the date.

That source rides along with every lead:

| Lead path | Where you see the source |
|---|---|
| **Book a call** (any button, the floating pill, a cal.com link anywhere on the site) | In Cal.com, on the booking's details page as UTM source, medium, campaign and content. The content holds the button and page, for example `hero · /work/pella`. In GA4, on `book_call_click` and `book_call_complete`. |
| **Contact form** | In the Web3Forms lead email: `came_from`, `first_visit_from`, `landing_page`, `first_seen`, `sent_from_page`. In GA4, on `contact_form_submit`. |
| **Meta Ads video review form** | Same fields in its email, plus `src` and `track`. |
| **Email link** | In GA4 only, on `email_click`. A mail app can't carry it. |

Booking buttons now open the Cal.com popup on the page instead of a new tab. That's what lets the site see a completed booking. If an ad blocker stops Cal.com's script, the button opens the booking page in a new tab with the same UTMs.

### Optional: see more on each booking in Cal.com

Cal.com stores the standard UTMs on its own. To also see the button, the landing page and the first-visit source as separate fields, open the 30-min event type, go to **Advanced → Booking questions**, and add three **Short text** questions:

- `cta`
- `landing`
- `first_source`

Toggle each one to **Hidden**. The identifier must match exactly.

## Events

| Event | When | Parameters |
|---|---|---|
| `book_call_click` | Any booking button or link | `location`, `lead_source`, `first_source`, `landing_page`, `first_seen`, `src` |
| `book_call_complete` | Cal.com confirms a booking made in the popup | same as above |
| `generate_lead` | A booking completes, or a form is sent (GA4's recommended lead event) | `form` (`booking`, `contact`, `meta_ads_review`) plus the lead fields |
| `contact_form_submit` / `contact_form_error` | Contact form result | `form`, lead fields / `error` |
| `contact_form_open` / `contact_form_close` | "Prefer to write?" toggle | `location` |
| `email_click`, `phone_click`, `linkedin_click` | Contact links | `location` (+ lead fields) |
| `outbound_click` | Any other external link | `link_url`, `link_domain`, `label`, `location` |
| `case_study_click`, `essay_click` | Links to a case study or essay | `slug`, `label`, `location` |
| `nav_click` | Internal links in the header, footer or mobile menu | `label`, `link_url`, `location` |
| `scroll_link_click` | In-page jump links ("See the work") | `label`, `link_url` |
| `section_view` | First time a section is on screen | `section` (`hero`, `work`, `how-i-work`, `contact`...) |
| `scroll_depth` | 25, 50, 75, 100% of a page | `percent` |
| `content_read` | 75% of a case study or essay | `slug`, `label` (`case_study` / `essay`) |
| `work_filter` | Filters on /work | `filter_type`, `filter_value` |
| `weather_change` | The sun / cloud / snow toggle | `weather` |
| `page_not_found` | The 404 page | `link_url` (the bad path), `label` (referrer) |
| `meta_ads_cta`, `meta_ads_track`, `meta_ads_review_submit` | /meta-ads page, as before | `cta`, `location`, `track`, `page`, `src`, `spend`, `sells` |

`location` is where the click happened. It's the nearest `data-track-location` attribute, or else `header`, `footer`, `menu`, or the id of the section (the hero is `hero`). To track a new button, give it `data-track="event_name"` and, optionally, `data-track-label="..."`.

Page views, sessions, traffic source, country and device come from GA4 itself.

## One-time setup

### 1. GTM: import the tag

1. In GTM, open **Admin → Import Container** and choose `docs/gtm-site-events.json`.
2. Choose the **Default Workspace**, then **Merge → Rename conflicting tags, triggers and variables**.

This adds:

- one GA4 event tag, which forwards every event above with its parameters;
- one trigger;
- 23 dataLayer variables.

Click **Preview** and open the site. Book-call clicks, section views and scroll depth should appear as events. Then **Submit → Publish**.

### 2. GA4: make the parameters reportable

In **Admin → Custom definitions → Create custom dimension** (scope: Event), add:

- `location`
- `lead_source`
- `first_source`
- `landing_page`
- `section`
- `slug`
- `form`
- `filter_type`
- `filter_value`
- `cta`
- `src`
- `link_domain`

Add `percent` as a custom metric, or as a dimension if you'd rather group by it.

### 3. GA4: mark the key events

In **Admin → Events** (or **Key events**), mark these as key events:

- `book_call_complete`
- `generate_lead`
- `contact_form_submit`
- `email_click`

Optionally mark `book_call_click` too.

### 4. Optional extras, added in GTM with no code change

- **Microsoft Clarity** (free): heatmaps and session recordings. Use the Clarity template from the GTM gallery with your project id.
- **LinkedIn Insight Tag**: lets you retarget site visitors on LinkedIn.
- **Meta Pixel**: lets you retarget site visitors on Meta.
