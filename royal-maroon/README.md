# Silver Jubilee Invitation — Royal Maroon theme

A redesign of the anniversary invitation in deep maroon, antique gold and ivory,
with a shimmering silver "25". Guests tap a wax seal and the palace doors open
onto the invitation.

Open `index.html` in any browser. You don't need to install anything.

## Change the details: `js/config.js`

Every name, date, address and phone number comes from **`js/config.js`**. It
uses the same format as the original site, with a few additions:

| Setting | Used for |
|---|---|
| `partner1`, `partner2` | Names everywhere, plus the initials on the seal and nav |
| `weddingDate` | The "together for" years / months / days counter and the footer years |
| `hashtag` | Footer |
| `hosts`, `blessingLine` | The invitation card and footer |
| `dateText`, `daysText` | The hero and the invitation card |
| `days` | **The whole programme.** The countdown runs to the first event. The calendar buttons and the RSVP event choices are built from it. Add `image: 'images/haldi.jpg'` to an event to replace its coloured header with a photo. Set `featured: true` for the wide card |
| `venue`, `address`, `city`, `venueNote`, `mapsUrl`, `mapQuery` | Venue card, map and "Get directions" |
| `dressCode`, `dressNote` | Dress code note |
| `rsvpBy`, `phone`, `whatsapp` | RSVP deadline, the call link, and the WhatsApp number that receives RSVPs |
| `letter` | The closing "From us, with love" note, one paragraph per line (leave it empty to hide the section) |

## Edit directly in `index.html`

- **Their Journey**: the `<li class="moment">` blocks.
- **Hindi lines**: ॥ रजत जयंती ॥ (hero), ॥ सादर आमंत्रण ॥ (card), ॥ शुभम् भवतु ॥ (footer).

## Photos — the `images/` folder

- `hero.jpg`: a photo of the couple behind the names on the first screen. Without it, the hero uses a maroon lattice pattern.
- `photo-1.jpg` … `photo-6.jpg`: the gallery. Portrait photos suit the arched frames. An empty frame shows the filename it's waiting for.
- `song.mp3` (optional): starts when a guest taps the seal, and a music button appears. If there's no song file, the button doesn't show.

## RSVP

The RSVP form writes a WhatsApp message to the `whatsapp` number. It includes
the guest's name, whether they're coming, the number of guests, which events
they'll attend and their note. The guest just presses send. Nothing is stored
on the page.

## Sharing

Drag the `royal-maroon` folder onto <https://app.netlify.com/drop> to get a link
you can share. The map and fonts need an internet connection.
