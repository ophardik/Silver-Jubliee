/* ============================================================
   INVITATION DETAILS
   Edit this file only. Every name, date, address and the whole
   programme on the page is filled in from here.
   ============================================================ */
window.INVITE = {
  // The couple
  partner1: 'Arun',
  partner2: 'Priya',
  weddingDate: '2001-09-20',            // YYYY-MM-DD

  // Who is inviting (shown on the card and in the footer)
  hosts: 'Dhaduka family',

  // Shown on the invitation card and the date card
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
  dressNote: 'Festive attire for every ceremony',

  // RSVP
  rsvpBy:   '10th October 2026',
  phone:    '+91 98765 43210',
  whatsapp: '919876543210',             // country code + number, digits only

  /* ----------------------------------------------------------
     The programme. The countdown runs to the first event, and
     "Add to calendar" saves every event.
     start: YYYY-MM-DDTHH:MM (24-hour)
     icon:  mehndi | music | diya | flower | sparkle
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
          note: 'An afternoon filled with colour, laughter, music, and cherished moments.',
          icon: 'mehndi'
        },
        {
          name: 'Sangeet — Bollywood Night',
          start: '2026-10-17T18:00',
          time: '6:00 PM onwards',
          note: 'An evening of music, dance, glamour, and unforgettable celebrations.',
          icon: 'music'
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
          start: '2026-10-18T10:00',
          time: '10:00 AM onwards',
          note: 'A serene morning of prayers, devotion, and blessings.',
          icon: 'diya'
        },
        {
          name: 'Haldi Ceremony',
          start: '2026-10-18T14:00',
          time: '2:00 PM onwards',
          note: 'A joyful celebration of love, happiness, and family traditions.',
          icon: 'flower'
        },
        {
          name: 'Silver Jubilee Reception',
          start: '2026-10-18T18:00',
          time: '6:00 PM onwards',
          note: 'Join us for an elegant evening as we raise a toast to 25 wonderful years of togetherness and celebrate the journey that brought us here.',
          icon: 'sparkle',
          featured: true
        }
      ]
    }
  ]
};
