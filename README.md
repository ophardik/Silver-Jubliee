# Silver Jubilee Invitation — Royal Palace theme

A mobile-friendly invitation site for a 25th wedding anniversary. It has a deep
emerald background, fine gold palace arches and ivory text.

Open `index.html` in any browser. You don't need to install anything or run a server.

## Change the details: `js/config.js`

Every name, date, address and phone number on the page comes from
**`js/config.js`**. Change a value there and it updates everywhere on the page:

| Setting | Used for |
|---|---|
| `partner1`, `partner2` | Names in the hero, invitation card and footer, plus the nav initials |
| `weddingDate` | The "20 · 09 · 2001" line in the footer |
| `hosts` | "With best compliments from" on the card, and the footer |
| `dateText`, `daysText` | "17th & 18th October 2026" and "Saturday & Sunday" on the card |
| `days` | **The whole programme**: each day's name and date, and each event's name, start time, time text, description and icon. The countdown runs to the first event, and **Add to calendar** saves every event. Set `featured: true` to give an event the wide, highlighted card |
| `venue`, `address`, `city`, `venueNote` | The venue card text |
| `mapsUrl` | The shared Google Maps link that **Get directions** opens |
| `mapQuery` | What the embedded map searches for and shows |
| `dressCode`, `dressNote` | Dress code card |
| `rsvpBy`, `phone`, `whatsapp` | RSVP text and the call and WhatsApp buttons |

## Edit directly in `index.html`

- **Their Journey**: the `<article class="moment">` blocks.
- **Hindi lines**: ॥ रजत जयंती ॥ (hero), ॥ सादर आमंत्रण ॥ (card), ॥ शुभम् भवतु ॥ (footer).

## Photos

Put 6 photos in the `images/` folder named `photo-1.jpg` to `photo-6.jpg`.
Portrait photos fit the arched frames best. Until a photo is added, its frame
shows the filename it is waiting for. Captions are the `<figcaption>` text next
to each image.

## Music (optional)

Put an MP3 at `images/song.mp3` and a music button appears at the bottom right.
If there's no song file, the button doesn't show.

## Blessings

Guests can leave messages on the page. These are saved only in that guest's own
browser and aren't sent anywhere.

## Sharing

- **Online, free:** drag the whole folder onto <https://app.netlify.com/drop> to get a link to share on WhatsApp.
- **Offline:** zip the folder and send it.

The map and fonts need an internet connection. Everything else works offline.
