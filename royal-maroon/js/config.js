/* ============================================================
   INVITATION DETAILS
   Edit this file only. Every name, date, address and the whole
   programme on the page is filled in from here.
   ============================================================ */
window.INVITE = {
  // The couple
  partner1: 'Jitendra',
  partner2: 'Sweety',
  weddingDate: '2001-09-20',            // YYYY-MM-DD — drives the "together for" counter
  hashtag: '#JitendraSweety25',

  // Who is inviting (shown on the card and in the footer)
  hosts: 'Satvik, Sanidhya & Family',
  blessingLine: 'With the blessings of our elders',

  // Shown on the invitation card
  dateText: '17th & 18th October 2026',
  daysText: 'Saturday & Sunday',

  // Location
  venue:     'Varmala Resort and Banquet',
  address:   '200 Feet Airport Road, Tilawala, Chitrakoot Nagar, Jagatpura, Jaipur, Rajasthan 302017',
  city:      'Jaipur',
  venueNote: 'Valet parking available at the main gate',
  mapsUrl:   'https://maps.app.goo.gl/xTMqFA9XBZZSKGAq6',   // "Get directions" opens this exact pin
  mapQuery:  'RRCQ+H23 Varmala Resort and Banquet, Jagatpura, Jaipur', // what the embedded map shows

  // Dress code
  dressCode: 'Indian Traditional',
  dressNote: 'Festive colours for every ceremony — and shoes you can dance in.',

  // RSVP — the form composes a WhatsApp message to this number
  rsvpBy:   '10th October 2026',
  phone:    '+91 96721 54108',
  phone2:   '+91 99837 89558',          // a second number to call (optional)
  whatsapp: '919672154108',             // RSVPs go here — country code + number, digits only

  // Background music — starts when a guest taps the seal, loops between start and end (seconds).
  // Plays from YouTube; to use your own file instead, replace youtube: '…' with file: 'images/song.mp3'
  song: { youtube: 'DOMj__8afqg', start: 23, end: 80 },

  // The closing note, one paragraph per line
  letter: [
    'Twenty-five years ago we promised each other a lifetime. We had no idea how full that lifetime would be — of early mornings and late conversations, of a home that grew louder and warmer every year.',
    'Every one of you is woven into that story. You laughed with us, stood by us, and fed us when we forgot to eat.',
    'So come — not to watch us celebrate, but to celebrate with us. It would not be our Silver Jubilee without you.'
  ],

  /* ----------------------------------------------------------
     The programme. The countdown runs to the first event, and
     "Add to calendar" saves every event.
     start: YYYY-MM-DDTHH:MM (24-hour)
     icon:  mehndi | music | diya | flower | sparkle
     image: optional photo for the card header, e.g. 'images/mehndi.jpg'
     theme: optional dress theme for that event, e.g. 'Pastel & White'
     ---------------------------------------------------------- */
  days: [
    {
      label: 'Day One',
      weekday: 'Saturday',
      date: '17th October 2026',
      events: [
        {
          name: 'Mehndi Ceremony',
          start: '2026-10-17T12:00',
          time: '12:00 PM onwards',
          note: 'An afternoon of henna and heart — intricate designs, soft melodies and easy laughter, as colour blooms on every palm.',
          icon: 'mehndi',
          image: 'images/mehndi.jpg'
        },
        {
          name: 'Sangeet — Bollywood Night',
          start: '2026-10-17T18:00',
          time: '6:00 PM onwards',
          note: 'The lights dim and the music rises. An evening of dazzling performances, timeless Bollywood melodies and a dance floor that waits for no one.',
          icon: 'music',
          image: 'images/sangeet.jpg'
        }
      ]
    },
    {
      label: 'Day Two',
      weekday: 'Sunday',
      date: '18th October 2026',
      events: [
        {
          name: 'Bhaktamar Stotra',
          start: '2026-10-18T09:00',
          time: '9:00 AM onwards',
          note: 'We begin the day in stillness — the sacred verses of the Bhaktamar Stotra, chanted together in devotion, seeking blessings for the journey ahead.',
          icon: 'diya',
          image: 'images/chants.jpg'
        },
        {
          name: 'Haldi Ceremony',
          start: '2026-10-18T13:00',
          time: '1:00 PM onwards',
          note: 'Sunlit and serene in shades of pastel and white — turmeric, flowers and the warm blessings of loved ones, in a ceremony as gentle as it is joyful.',
          icon: 'flower',
          image: 'images/haldi.jpg',
          theme: 'Pastel & White'
        },
        {
          name: 'Silver Jubilee Reception',
          start: '2026-10-18T17:00',
          time: '5:00 PM onwards',
          note: 'Twenty-five years, one unforgettable evening. Join us beneath the lights for fine dining, heartfelt toasts and a celebration of the love story that brought us all together.',
          icon: 'sparkle',
          featured: true
        }
      ]
    }
  ]
};
