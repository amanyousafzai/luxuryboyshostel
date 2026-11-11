# Luxury Boys Hostel F-11 redesign

The branch `redesign/f11-hospitality` is based on a local snapshot of the
published page and property assets. This is a static site with no build step.

## Review

From this directory, run `python3 -m http.server 8080` and open
`http://localhost:8080/`. The local Python server serves the pages and assets.
Vercel applies the redirects defined in `vercel.json`.

Chrome checks covered the manual hero carousel, keyboard gallery navigation,
Escape and focus restoration, on-demand map creation, and the rendered
WhatsApp and Maps link destinations. The five layout checks used 360, 390,
768, 1024, and 1440 px frames, each with a 15 px browser scrollbar. No
horizontal page overflow was observed. At the 390 px test width, the
hero controls cleared the sticky WhatsApp and call bar. No message was sent
and no call was placed. Lighthouse, Safari, production indexing, and real
Vercel redirect behavior need testing.

## Route mapping

| Route | Expected on Vercel |
| --- | --- |
| `/` | Direct HTML homepage |
| `/hostel`, `/hostel/`, `/hostel/index.html`, `/index.html` | Permanent redirect to `/` |
| `/#rooms`, `/#facilities`, `/#gallery`, `/#location`, `/#main` | Existing section targets |
| `/robots.txt`, `/sitemap.xml` | Production crawl directives and canonical homepage |

## Before promoting

- Verify the exact Maps pin and arrival point on a real device. The listing
  link is the Google share URL supplied by the owner. Directions use the
  business name and street address. Verify both against House 37.
- Confirm the WhatsApp number and alternate phone, room occupancy, AC and
  bathroom options, meal and laundry inclusions, power backup coverage,
  viewing hours, and move-in requirements. Publish room-specific facts only
  after confirming them. The review build leaves prices and star ratings out.
- Test the preview URL on iOS Safari and Android Chrome, and check the
  redirects, contact buttons, gallery and the rendered map. Run mobile
  Lighthouse on both production and the preview. Check the preview's
  `X-Robots-Tag` before sharing its URL.
- After you promote, check the canonical URL in Google Search Console and
  Bing Webmaster Tools. Submit the sitemap in both and point the Google
  Business Profile website field at the canonical URL.
- If analytics are enabled, track WhatsApp, calls and directions separately
  without sending message text. Compare organic impressions, AI referrals
  and qualified enquiries after 30 days.
