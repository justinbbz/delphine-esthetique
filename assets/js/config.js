/* Réglages du site Delphine Esthétique : seul fichier à modifier pour brancher l'agenda et le paiement.
   Voir RESERVATION-AGENDA.md (agenda Google via Make) et worker/README.md (paiement Stripe ou SumUp).
   Prix, durées, horaires, adresse, téléphone et règles d'acompte sont dans data.js (généré depuis les relevés Planity : outils/generer-donnees.mjs) ;
   le catalogue du Worker se régénère avec : node worker/build-catalog.mjs */
window.DECFG = {
  /* true = démonstration : créneaux d'exemple, aucun paiement réel, aucune demande envoyée. */
  DEMO_MODE: true,

  /* Agenda (Make → Google Agenda). Contrat décrit dans RESERVATION-AGENDA.md. */
  BOOKING_WEBHOOK: '',      // reçoit le rendez-vous (POST JSON) et crée l'événement dans l'agenda de l'institut
  AVAILABILITY_URL: '',     // renvoie les créneaux déjà pris (GET ?from=AAAA-MM-JJ&to=AAAA-MM-JJ)

  /* Paiement de l'acompte et des cartes cadeau.
     'demo'   : simulation claire, aucune carte demandée (état actuel)
     'stripe' : redirection vers Stripe Checkout via le Worker Cloudflare (worker/checkout.js)
     'sumup'  : redirection vers la page de paiement hébergée de SumUp, via le même Worker (PAYMENT_PROVIDER = "sumup" dans wrangler.toml)
     'none'   : pas de paiement en ligne, la demande est envoyée à l'agenda et l'acompte se règle à l'institut */
  PAYMENT_MODE: 'demo',
  CHECKOUT_ENDPOINT: '',    // ex. https://delphine-esthetique-paiement.<compte>.workers.dev/checkout
  GIFT_ENDPOINT: '',        // ex. https://delphine-esthetique-paiement.<compte>.workers.dev/gift

  /* Réservation. Horaires : page Planity et fiche Google (lundi–vendredi 9 h–19 h, samedi 8 h–19 h). Délai minimal et acompte : data.js (policy). */
  MAX_DAYS_AHEAD: 90,       // Planity : réservation jusqu'à 90 jours à l'avance
  SLOT_STEP_MIN: 30,        // Planity : un créneau toutes les 30 minutes
  MAX_TOTAL_MIN: 360,
  MAX_ITEMS: 8,

  /* Carte : chargée seulement avec l'accord du visiteur (adresse et coordonnées : data.js, salon). */
  MAP_EMBED: 'https://www.google.com/maps?q=43.8308446,5.8048146&z=16&output=embed&hl=fr',

  /* Film du héros (boucle sans son). Mobile en portrait : version verticale plus légère. */
  HERO: { desktop: 'assets/video/hero.mp4', mobile: 'assets/video/hero-mobile.mp4', v: 1 }
};
