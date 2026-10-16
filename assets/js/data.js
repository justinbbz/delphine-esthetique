/* Delphine Esthétique : carte des soins, avis, galerie, horaires et règles de réservation.
   GÉNÉRÉ par outils/generer-donnees.mjs depuis les relevés Planity du 2026-10-15 : ne pas modifier à la main.
   Prix, durées et descriptions = page publique Planity (102 lignes affichées, toutes rapprochées du JSON de la page ; contrôle : node outils/verifier-donnees.mjs).
   Les montants sont en centimes (cents). Règles d'acompte et d'annulation = propositions (voir README).
   Après toute modification : node worker/build-catalog.mjs */
window.DE = {
 "brand": "Delphine Esthétique",
 "owner": "Delphine",
 "team": [
  "Delphine",
  "Christelle",
  "Malika"
 ],
 "salon": {
  "street": "8, Av. du Dr Bernard Foussier",
  "streetFull": "8 avenue du Docteur Bernard Foussier",
  "postalCode": "04100",
  "locality": "Manosque",
  "phone": "04 92 79 05 28",
  "phoneTel": "+33492790528",
  "lat": 43.8308446,
  "lng": 5.8048146,
  "siret": "83352967000022"
 },
 "source": {
  "prix": "Planity",
  "date": "2026-10-15",
  "url": "https://www.planity.com/delphine-esthetique-04100-manosque"
 },
 "hours": {
  "0": null,
  "1": [
   "09:00",
   "19:00"
  ],
  "2": [
   "09:00",
   "19:00"
  ],
  "3": [
   "09:00",
   "19:00"
  ],
  "4": [
   "09:00",
   "19:00"
  ],
  "5": [
   "09:00",
   "19:00"
  ],
  "6": [
   "08:00",
   "19:00"
  ]
 },
 "policy": {
  "depositPercent": 20,
  "depositMinEuros": 10,
  "lateCancelHours": 24,
  "minNoticeHours": 2
 },
 "giftAmounts": [
  30,
  65,
  90,
  150
 ],
 "giftHints": {
  "30": "1 h de hammam privatif",
  "65": "un massage du monde d’1 h",
  "90": "la cérémonie « Rêve »",
  "150": "un massage d’1 h et un soin du visage"
 },
 "ratings": {
  "planity": {
   "value": "4,9",
   "exact": "4,93",
   "count": 706,
   "url": "https://www.planity.com/delphine-esthetique-04100-manosque"
  },
  "google": {
   "value": "4,3",
   "count": 58,
   "url": "https://www.google.com/maps/place/Delphine+Esthetique/@43.8308446,5.8048146,17z/data=!4m8!3m7!1s0x12cbcd632e577ecb:0xd1c4eb761ed3e2d2!8m2!3d43.8308446!4d5.8048146!9m1!1b1!16s%2Fg%2F11qm3tq_6l?hl=fr"
  }
 },
 "facebook": "https://www.facebook.com/delphinesthetique04",
 "stats": {
  "items": 102,
  "groups": 8,
  "minMin": 15,
  "maxMin": 210
 },
 "keys": {
  "hammam-1": "-NBI0sP1ie01HB58J4L3",
  "hammam-2": "-NBI0vsVGA-GfTknto_K",
  "hammam-34": "-NBI0zlnWA9jPCpWuRKQ",
  "led": "-Obmd2UAto9oY9fC4BKF",
  "led-cure": "-ObmdhxeScC1c8CeueCd"
 },
 "perks": [
  "−10 % sur les duos",
  "Cure de 5 massages : un gommage corps offert",
  "Épilations : −5 % dès 2 zones, −15 % pour 4 zones",
  "−10 % sur les produits m’y spa",
  "−10 % sur la gamme Pupa Milano"
 ],
 "groups": [
  {
   "id": "hammam",
   "title": "Hammam & cérémonies",
   "kicker": "Hammam privatif",
   "teaser": "Vapeur, gommage et modelage, seule, à deux ou entre amis.",
   "intro": "Un hammam privatif, seule, à deux ou jusqu’à quatre, avec savon noir et gant de kessa, puis l’espace détente et ses boissons chaudes ou fraîches. À prolonger d’une cérémonie : exfoliation, modelage, soin du visage.",
   "photo": "carte-hammam",
   "sections": [
    {
     "id": "hammam",
     "group": "hammam",
     "title": "Hammam privatif",
     "rows": [
      {
       "id": "-NBI0sP1ie01HB58J4L3",
       "name": "Hammam privatif, 1 personne",
       "min": 60,
       "cents": 3000,
       "mode": "book",
       "planity": "1 personne"
      },
      {
       "id": "-NBI0vsVGA-GfTknto_K",
       "name": "Hammam privatif, 2 personnes",
       "min": 60,
       "cents": 5000,
       "mode": "book",
       "planity": "Hammam pour 2 personnes"
      },
      {
       "id": "-NBI0zlnWA9jPCpWuRKQ",
       "name": "Hammam privatif, 3 ou 4 personnes",
       "min": 60,
       "cents": 2000,
       "mode": "call",
       "from": true,
       "desc": "20 € par personne.",
       "planity": "Hammam pour 3 et/ ou 4 personnes"
      },
      {
       "id": "-NBI11WYRQLkhwboHlpZ",
       "name": "Heure supplémentaire de hammam",
       "min": 60,
       "cents": 1000,
       "mode": "book",
       "supp": true,
       "planity": "Heure supplémentaire"
      }
     ],
     "note": {
      "lead": "Immergez-vous dans les vapeurs de notre hammam privatif. Un savon noir et un gant de kessa sont mis à votre disposition, ainsi que l’accès à notre espace détente avec boissons chaudes et fraîches."
     }
    },
    {
     "id": "ceremonies",
     "group": "hammam",
     "title": "Les cérémonies",
     "rows": [
      {
       "fam": "cer-reve",
       "name": "Cérémonie « Rêve »",
       "options": [
        {
         "id": "-NBI168UqZ-mnyb1bjng",
         "name": "Cérémonie « Rêve »",
         "opt": "Seule",
         "full": "Cérémonie « Rêve » · Seule",
         "min": 135,
         "cents": 9000,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Rêve »"
        },
        {
         "id": "-NC-RigtFs2uT6UMXJrm",
         "name": "Cérémonie « Rêve »",
         "opt": "En duo",
         "full": "Cérémonie « Rêve » · En duo",
         "min": 135,
         "cents": 16200,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Rêve » en duo"
        }
       ],
       "desc": "Accès au hammam suivi d’une exfoliation du corps puis d’un modelage dos.",
       "excl": "ceremonie"
      },
      {
       "fam": "cer-monde",
       "name": "Cérémonie « Au bout du monde »",
       "options": [
        {
         "id": "-NBI19rzJj9AolX4W9nB",
         "name": "Cérémonie « Au bout du monde »",
         "opt": "Seule",
         "full": "Cérémonie « Au bout du monde » · Seule",
         "min": 150,
         "cents": 11500,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Au bout du monde »"
        },
        {
         "id": "-NC-RivPC9XT8n0U3jgb",
         "name": "Cérémonie « Au bout du monde »",
         "opt": "En duo",
         "full": "Cérémonie « Au bout du monde » · En duo",
         "min": 150,
         "cents": 20700,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Au bout du monde » en duo"
        }
       ],
       "desc": "Accès au hammam suivi d’une exfoliation du corps puis d’un modelage relaxant du corps.",
       "excl": "ceremonie"
      },
      {
       "fam": "cer-luxe",
       "name": "Cérémonie « Luxe exotique »",
       "options": [
        {
         "id": "-NBI1E-bi-w3A0588aVk",
         "name": "Cérémonie « Luxe exotique »",
         "opt": "Seule",
         "full": "Cérémonie « Luxe exotique » · Seule",
         "min": 210,
         "cents": 18500,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Luxe exotique »"
        },
        {
         "id": "-NC-Rj5nxucC_sSVsPUy",
         "name": "Cérémonie « Luxe exotique »",
         "opt": "En duo",
         "full": "Cérémonie « Luxe exotique » · En duo",
         "min": 210,
         "cents": 36000,
         "mode": "book",
         "excl": "ceremonie",
         "planity": "Cérémonie « Luxe exotique » en duo"
        }
       ],
       "desc": "Accès au hammam suivi d’une exfoliation du corps, d’un modelage relaxant puis d’un soin du visage « Sources et Lagons de Polynésie ».",
       "excl": "ceremonie"
      }
     ]
    },
    {
     "id": "hammam-extra",
     "group": "hammam",
     "title": "Supplément",
     "rows": [
      {
       "id": "-NBI1JHUU8GZlRpZO3Nb",
       "name": "Supplément enveloppement au beurre de karité",
       "min": 30,
       "cents": 1500,
       "mode": "book",
       "supp": true,
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Supplément enveloppement au beurre de karité"
      }
     ]
    }
   ],
   "from": 3000,
   "count": 11
  },
  {
   "id": "massages",
   "title": "Massages du monde",
   "kicker": "Modelages",
   "teaser": "Yamato, caribéen, lomi-lomi, Brésil : une heure ou une heure trente de voyage.",
   "intro": "Yamato, caribéen, lomi-lomi hawaïen, dynamisant au Brésil ou signature de la maison : une heure ou une heure trente de voyage, seule, en duo ou avec son enfant.",
   "photo": "carte-massages",
   "sections": [
    {
     "id": "massages",
     "group": "massages",
     "title": "Massages du monde",
     "rows": [
      {
       "fam": "yamato",
       "name": "Massage Yamato, à la porte du Torii",
       "options": [
        {
         "id": "-ObmSRc7R8iwwDXBEX-w",
         "name": "Massage Yamato, à la porte du Torii",
         "opt": "1 h",
         "full": "Massage Yamato, à la porte du Torii · 1 h",
         "min": 60,
         "cents": 6500,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage yamato à la porte du Torii"
        },
        {
         "id": "-ObmTJn1X3lV_Lh0y_kS",
         "name": "Massage Yamato, à la porte du Torii",
         "opt": "1 h 30",
         "full": "Massage Yamato, à la porte du Torii · 1 h 30",
         "min": 90,
         "cents": 8900,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage yamato à la porte du Torii"
        }
       ],
       "desc": "Massage favorisant l’équilibre émotionnel et la méditation. (Huile fleurs de cerisiers)"
      },
      {
       "fam": "caribeen",
       "name": "Massage caribéen",
       "options": [
        {
         "id": "-ObmTrlBvLOZT0i-MQl_",
         "name": "Massage caribéen",
         "opt": "1 h",
         "full": "Massage caribéen · 1 h",
         "min": 60,
         "cents": 6500,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage Caribéen"
        },
        {
         "id": "-ObmTyJmipaG3N5BnB2d",
         "name": "Massage caribéen",
         "opt": "1 h 30",
         "full": "Massage caribéen · 1 h 30",
         "min": 90,
         "cents": 8900,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage Caribéen"
        }
       ],
       "desc": "Massage relaxant et énergisant réalisé sur des tempos de zouk. Voyage chaleureux et joyeux qui vous donnera le sourire plusieurs semaines. (Huile vanille, monoï ou mangue)"
      },
      {
       "fam": "lomi",
       "name": "Massage lomi-lomi hawaïen",
       "options": [
        {
         "id": "-ObmUTNjAbU5RuVTADC6",
         "name": "Massage lomi-lomi hawaïen",
         "opt": "1 h",
         "full": "Massage lomi-lomi hawaïen · 1 h",
         "min": 60,
         "cents": 6500,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage Lomi-Lomi Hawaïen"
        },
        {
         "id": "-ObmUcsO9dyoV-udvdtj",
         "name": "Massage lomi-lomi hawaïen",
         "opt": "1 h 30",
         "full": "Massage lomi-lomi hawaïen · 1 h 30",
         "min": 90,
         "cents": 8900,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage Lomi-Lomi Hawaïen"
        }
       ],
       "desc": "Massage authentique, laissez-vous bercer par le rythme des vagues. Pour procurer détente et bien-être. (Huile de coco)"
      },
      {
       "fam": "bresil",
       "name": "Massage dynamisant au Brésil",
       "options": [
        {
         "id": "-ObmV6kKi7NrUbhVG8ex",
         "name": "Massage dynamisant au Brésil",
         "opt": "1 h",
         "full": "Massage dynamisant au Brésil · 1 h",
         "min": 60,
         "cents": 6500,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage dynamisant au Brésil"
        },
        {
         "id": "-ObmV9UnWukm8X1uwJpr",
         "name": "Massage dynamisant au Brésil",
         "opt": "1 h 30",
         "full": "Massage dynamisant au Brésil · 1 h 30",
         "min": 90,
         "cents": 8900,
         "mode": "book",
         "qui": [
          "Malika"
         ],
         "planity": "Massage dynamisant au Brésil"
        }
       ],
       "desc": "Plongez dans un véritable voyage envoûtant au cœur du Brésil. Massage dynamisant et drainant pour un lâcher prise garanti. (Huile agrumes boisés)"
      },
      {
       "fam": "signature",
       "name": "Massage signature Delphine Esthétique",
       "options": [
        {
         "id": "-ObmVeteqLRz2XhZ-DCb",
         "name": "Massage signature Delphine Esthétique",
         "opt": "1 h",
         "full": "Massage signature Delphine Esthétique · 1 h",
         "min": 60,
         "cents": 6500,
         "mode": "book",
         "qui": [
          "Delphine",
          "Malika"
         ],
         "planity": "Massage signature Delphine Esthétique"
        },
        {
         "id": "-ObmVkudfH-o5M60pbOs",
         "name": "Massage signature Delphine Esthétique",
         "opt": "1 h 30",
         "full": "Massage signature Delphine Esthétique · 1 h 30",
         "min": 90,
         "cents": 8900,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Massage signature Delphine Esthétique"
        },
        {
         "id": "-OknCMh584TVTIIhEVYQ",
         "name": "Massage signature Delphine Esthétique",
         "opt": "Duo · 1 h",
         "full": "Massage signature Delphine Esthétique · Duo · 1 h",
         "min": 60,
         "cents": 11700,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Massage signature Delphine Esthétique duo"
        },
        {
         "id": "-OknDCraneTurpI0YPYS",
         "name": "Massage signature Delphine Esthétique",
         "opt": "Duo · 1 h 30",
         "full": "Massage signature Delphine Esthétique · Duo · 1 h 30",
         "min": 90,
         "cents": 16020,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Massage signature Delphine Esthétique duo"
        }
       ],
       "desc": "Massage lent et relaxant permettant une réduction du stress et de l’anxiété par une gestuelle chaleureuse et enveloppante. (Huile amyris patchouli)"
      }
     ],
     "note": {
      "head": "Offres et avantages",
      "items": [
       "−10 % sur les duos",
       "Cure de 5 massages : un gommage corps offert",
       "−10 % sur un produit m’y spa pour tout soin du corps"
      ],
      "foot": "Nos massages peuvent se réaliser en 1 h ou 1 h 30, au choix."
     }
    },
    {
     "id": "gommage",
     "group": "massages",
     "title": "Gommage & enveloppement",
     "rows": [
      {
       "fam": "gommage",
       "name": "Gommage corps / enveloppement, senteur au choix",
       "options": [
        {
         "id": "-NBI-4cAs0U_KPZDfYyg",
         "name": "Gommage corps / enveloppement, senteur au choix",
         "opt": "Seule",
         "full": "Gommage corps / enveloppement, senteur au choix · Seule",
         "min": 30,
         "cents": 2900,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Gommage corps / enveloppement senteur au choix"
        },
        {
         "id": "-OlfQo-wX9cuAhp9Syiq",
         "name": "Gommage corps / enveloppement, senteur au choix",
         "opt": "En duo",
         "full": "Gommage corps / enveloppement, senteur au choix · En duo",
         "min": 30,
         "cents": 5220,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Gommage corps / enveloppement senteur au choix duo"
        }
       ]
      }
     ]
    },
    {
     "id": "zen",
     "group": "massages",
     "title": "Zen attitude",
     "rows": [
      {
       "fam": "zen-visage",
       "name": "Massage zen attitude, visage et cuir chevelu",
       "options": [
        {
         "id": "-ObmVxYIHSPKE6WmYf37",
         "name": "Massage zen attitude, visage et cuir chevelu",
         "opt": "Seule",
         "full": "Massage zen attitude, visage et cuir chevelu · Seule",
         "min": 30,
         "cents": 3400,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Massage zen attitude"
        },
        {
         "id": "-OlfS0HioFLLPUaF2uLt",
         "name": "Massage zen attitude, visage et cuir chevelu",
         "opt": "En duo",
         "full": "Massage zen attitude, visage et cuir chevelu · En duo",
         "min": 30,
         "cents": 6120,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Zen attitude duo"
        }
       ]
      },
      {
       "id": "-ObmW6C-Onv6wmqHHq54",
       "name": "Massage zen attitude, arrière du corps",
       "min": 45,
       "cents": 4900,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Massage zen attitude"
      }
     ]
    },
    {
     "id": "kids",
     "group": "massages",
     "title": "Spécial kids",
     "rows": [
      {
       "fam": "kids",
       "name": "Massage spécial kids",
       "options": [
        {
         "id": "-ObmWE5bZKwpQWmwCCVT",
         "name": "Massage spécial kids",
         "opt": "Enfant · 30 min",
         "full": "Massage spécial kids · Enfant · 30 min",
         "min": 30,
         "cents": 3200,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Spécial kids"
        },
        {
         "id": "-ObmWNW12x5f-Ql9CwBV",
         "name": "Massage spécial kids",
         "opt": "Parent + enfant · 45 min",
         "full": "Massage spécial kids · Parent + enfant · 45 min",
         "min": 45,
         "cents": 8500,
         "mode": "book",
         "qui": [
          "Christelle",
          "Delphine",
          "Malika"
         ],
         "planity": "Spécial kids duo"
        }
       ],
       "desc": "Mini roi ou mini princesse : modelage relaxant de l’arrière du corps. Pour l’enfant seul, ou en duo « mon enfant et moi »."
      }
     ]
    }
   ],
   "from": 2900,
   "count": 19
  },
  {
   "id": "visage",
   "title": "Soins du visage",
   "kicker": "My Spa · Eberlin",
   "teaser": "Rituels My Spa, soins traitants Eberlin, Tunnel LED et anti-âge.",
   "intro": "Rituels pour tous types de peaux, soins traitants Eberlin, Tunnel LED et stretching cellulaire du visage.",
   "photo": "carte-visage",
   "sections": [
    {
     "id": "myspa",
     "group": "visage",
     "title": "Rituels My Spa",
     "rows": [
      {
       "id": "-NBHzSk9a2zbHxbIJ9BV",
       "name": "Rituel « Sources et Lagons de Polynésie »",
       "min": 60,
       "cents": 8000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "desc": "Tous types de peaux : soin oxygénant, hydratant et coup d’éclat.",
       "planity": "Rituel « Sources et Lagons de Polynésie »"
      },
      {
       "id": "-NBHzV0EDYzelicf87lL",
       "name": "Rituel « Cléopâtre »",
       "min": 60,
       "cents": 7200,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "desc": "Peaux mixtes à grasses.",
       "planity": "Rituel « Cléopâtre »"
      },
      {
       "id": "-NBHzXYRC8Hr04l8Zwt7",
       "name": "Rituel « Secret du Japon »",
       "min": 60,
       "cents": 7200,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "desc": "Peaux sensibles et sèches.",
       "planity": "Rituel « Secret du japon »"
      },
      {
       "id": "-NBHz_PgFRWvPlsx6i52",
       "name": "Rituel « Source de jeunesse »",
       "min": 60,
       "cents": 8500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "desc": "Peaux matures.",
       "planity": "Rituel « source de jeunesse »"
      },
      {
       "id": "-NBHzbjDXMbFzZGRh8Ot",
       "name": "Rituel magnetic express",
       "min": 30,
       "cents": 3900,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Rituel magnetic express"
      },
      {
       "id": "-NBHzdrOtOaho54CBFnM",
       "name": "Soin contour des yeux",
       "min": 20,
       "cents": 1800,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin contour des yeux"
      }
     ],
     "note": {
      "lead": "M’y spa est une gamme de produits qui réinvente le parcours émotionnel du soin et fait voyager les sens !",
      "head": "Avantages et cures",
      "items": [
       "−10 % sur les produits m’y spa visage",
       "Cure de 5 soins : un rituel magnetic express offert"
      ]
     }
    },
    {
     "id": "eberlin",
     "group": "visage",
     "title": "Soins traitants Eberlin",
     "rows": [
      {
       "id": "-O8H_FXwFxk3DAJs3a0T",
       "name": "Firmezza",
       "min": 60,
       "cents": 7900,
       "mode": "book",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Retarde le vieillissement cellulaire, raffermit la peau !",
       "planity": "Firmezza"
      },
      {
       "id": "-O8HaGu_RxQzDfdc7qg0",
       "name": "Épigénétique",
       "min": 60,
       "cents": 12900,
       "mode": "book",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Soin spécifique pour les peaux matures, les plus marquées par les signes de l’âge.",
       "planity": "Épigénétique"
      },
      {
       "id": "-OasQj2T2P6T21xxWz8B",
       "name": "Equilibrium",
       "min": 60,
       "cents": 7200,
       "mode": "book",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Soin intensif qui régénère, hydrate, répare et oxygène en profondeur.",
       "planity": "Equilibrium"
      },
      {
       "id": "-OasSPhrDlGDIzUOZ6Xy",
       "name": "Soin express « masque signature »",
       "min": 30,
       "cents": 4200,
       "mode": "book",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Effet lifting immédiat, coup d’éclat.",
       "planity": "Soin express « masque signature «"
      },
      {
       "id": "-O8HbARFZBcLbxQwBtCe",
       "name": "Cure de 5 soins Firmezza + traitement à domicile",
       "min": 60,
       "cents": 51560,
       "mode": "call",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "5 soins du visage en cabine + gamme de cosmétique à utiliser à la maison qui comprend : fluide nettoyant, lotion traitante, sérum et crème visage. Cure à 515,60 € au lieu de 594,60 €.",
       "planity": "Cure 5 soins firmezza + traitement quotidien à domicile pour prolonger leurs bienfaits et les résultats."
      },
      {
       "id": "-O8HbPZRKdXJms8bxOw-",
       "name": "Cure de 5 soins Épigénétique + traitement à domicile",
       "min": 60,
       "cents": 76260,
       "mode": "call",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "5 soins du visage en cabine + gamme de cosmétique à utiliser à la maison qui comprend : fluide nettoyant, lotion traitante, sérum et crème visage. Cure à 762,60 € au lieu de 891,60 €.",
       "planity": "Cure 5 soins Épigénétique + traitement quotidien à domicile pour prolonger leurs bienfaits et les résultats."
      },
      {
       "id": "-OasUYXYra6zcOnGA2FJ",
       "name": "Cure de 5 soins Equilibrium + traitement à domicile",
       "min": 60,
       "cents": 46165,
       "mode": "call",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Cure de 5 soins, avec nettoyant, lotion, sérum et crème pour le domicile, à 461,65 € au lieu de 533,65 €.",
       "planity": "Cure 5 soins equilibrium + traitement quotidien à domicile pour prolonger leurs bienfaits et les résultats."
      }
     ],
     "note": {
      "lead": "Soins traitants intensifs bio-cosmétiques. Une marque de cosmétologie haut de gamme qui allie le pouvoir de la phytothérapie et de la biotechnologie pour des résultats visibles et durables."
     }
    },
    {
     "id": "led",
     "group": "visage",
     "title": "Tunnel LED",
     "rows": [
      {
       "id": "-Obmd2UAto9oY9fC4BKF",
       "name": "Tunnel LED",
       "min": 30,
       "cents": 2000,
       "mode": "book",
       "qui": [
        "Delphine",
        "Malika"
       ],
       "desc": "Multiples traitements pour résoudre des problèmes de peau tels que l’acné, les signes de l’âge, l’hyperpigmentation, la peau terne, la peau sensible, etc…",
       "planity": "Tunnel Led"
      },
      {
       "id": "-ObmdhxeScC1c8CeueCd",
       "name": "Cure de 10 séances Tunnel LED",
       "min": 30,
       "cents": 15000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10
       },
       "desc": "Nettoyage, traitement LED et crème de soin. 10 séances à 150 € au lieu de 200 €.",
       "planity": "Cure 10 séances tunnel Led"
      }
     ]
    },
    {
     "id": "stretch-visage",
     "group": "visage",
     "title": "Stretching cellulaire du visage",
     "rows": [
      {
       "id": "-NC-TkONH9qO0InynxVd",
       "name": "Soin visage anti-âge détox",
       "min": 60,
       "cents": 6500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine"
       ],
       "planity": "Soin visage anti age detox"
      },
      {
       "id": "-NC-Tp_0DJTplRAaUW5g",
       "name": "Cure de 5 séances, soin visage anti-âge détox",
       "min": 60,
       "cents": 30000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine"
       ],
       "cure": {
        "n": 5,
        "was": 32500
       },
       "planity": "Cure de 5 seances soin visage anti age detox",
       "planityCall": true
      },
      {
       "id": "-NC-TtSzXnBpgq5Hxb_D",
       "name": "Cure de 10 séances, soin visage anti-âge détox",
       "min": 60,
       "cents": 55000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine"
       ],
       "cure": {
        "n": 10,
        "was": 65000
       },
       "planity": "Cure de 10 séances soin visage anti age detox",
       "planityCall": true
      },
      {
       "id": "-NC-UD3IXzlslongIRlA",
       "name": "Soin magie du regard",
       "min": 30,
       "cents": 4000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin magie du regard"
      },
      {
       "id": "-NC-UKHdmGq6ktdOaa1C",
       "name": "Cure de 10 séances, soin magie du regard",
       "min": 60,
       "cents": 30000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine"
       ],
       "cure": {
        "n": 10,
        "was": 40000
       },
       "planity": "Cure de 10 séances soin magie du regard",
       "planityCall": true
      }
     ]
    }
   ],
   "from": 1800,
   "count": 20
  },
  {
   "id": "corps",
   "title": "Stretching cellulaire",
   "kicker": "Corps · silhouette",
   "teaser": "Bidou, Push-Up, Abracadabra, Panty : des soins signatures aux noms évocateurs.",
   "intro": "Des soins signatures aux noms évocateurs, Bidou, Push-Up, Abracadabra, Panty, jambes lourdes ou soin corps minceur : à la séance ou en cure de 10.",
   "photo": "carte-corps",
   "sections": [
    {
     "id": "stretch-corps",
     "group": "corps",
     "title": "Stretching cellulaire du corps",
     "rows": [
      {
       "id": "-NC-Uj_NJUeDCcOZP576",
       "name": "Soin corps complet minceur",
       "min": 60,
       "cents": 5500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin corps complet minceur"
      },
      {
       "id": "-NC-Upn7-cQ9qLlSeIdA",
       "name": "Cure de 10 séances, soin corps minceur",
       "min": 60,
       "cents": 45000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 55000
       },
       "planity": "Cure de 10 séances - soin corps minceur",
       "planityCall": true
      },
      {
       "id": "-NC-V4pYBSYOM4bfyzm5",
       "name": "Soin Bidou",
       "min": 30,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin Bidou"
      },
      {
       "id": "-NC-VHSr7X2RAPmBxS0W",
       "name": "Cure de 10 séances, Bidou",
       "min": 30,
       "cents": 25000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 35000
       },
       "planity": "Cure de 10 séances - Bidou",
       "planityCall": true
      },
      {
       "id": "-NC-VOm0FVWbht4POrSA",
       "name": "Soin Push-Up",
       "min": 30,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin Push-Up"
      },
      {
       "id": "-NC-VPk0Atny-V9Cw47A",
       "name": "Cure de 10 séances, Push-Up",
       "min": 30,
       "cents": 25000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 35000
       },
       "planity": "Cure de 10 séances - Push-Up",
       "planityCall": true
      },
      {
       "id": "-NC-VVb0pS22GLsXbsxQ",
       "name": "Soin Abracadabra",
       "min": 30,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin Abracadabra"
      },
      {
       "id": "-NC-VWOzjaCby1_nWDct",
       "name": "Cure de 10 séances, Abracadabra",
       "min": 30,
       "cents": 25000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 35000
       },
       "planity": "Cure de 10 séances - Abracadabra",
       "planityCall": true
      },
      {
       "id": "-NC-VgdsB86FCBDj0TAO",
       "name": "Soin jambes lourdes",
       "min": 45,
       "cents": 4000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin jambes lourdes"
      },
      {
       "id": "-NC-ViEqIOvfDS8kNSIi",
       "name": "Cure de 10 séances, jambes lourdes",
       "min": 45,
       "cents": 35000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 40000
       },
       "planity": "Cure de 10 séances - Jambes lourdes",
       "planityCall": true
      },
      {
       "id": "-O_RG3-8hmkk3ShSDxzn",
       "name": "Soin Panty",
       "min": 45,
       "cents": 4500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin Panty"
      },
      {
       "id": "-O_RGOnaqO4PDlojMWDK",
       "name": "Cure de 10 séances, Panty",
       "min": 45,
       "cents": 35000,
       "mode": "call",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "cure": {
        "n": 10,
        "was": 45000
       },
       "planity": "Cure de 10 séances - Panty",
       "planityCall": true
      }
     ]
    }
   ],
   "from": 3500,
   "count": 12
  },
  {
   "id": "epilation",
   "title": "Épilations",
   "kicker": "Cire traditionnelle & bandes",
   "teaser": "Des épilations minutieuses, avec des forfaits dégressifs dès deux zones.",
   "intro": "Des épilations minutieuses à la cire traditionnelle ou en bandes, avec des forfaits dégressifs dès deux zones.",
   "photo": "carte-epilation",
   "sections": [
    {
     "id": "cire",
     "group": "epilation",
     "title": "Cire traditionnelle",
     "rows": [
      {
       "id": "-NBI-VEIvZB-MKJ8vdld",
       "name": "Lèvres ou menton",
       "min": 15,
       "cents": 800,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Lèvres ou menton"
      },
      {
       "id": "-NBI-XM0ggX-TZtX4XH0",
       "name": "Sourcils ou aisselles",
       "min": 15,
       "cents": 900,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Sourcils ou aisselles"
      },
      {
       "id": "-NBI-ZMqqk1WdQbUbfWz",
       "name": "Maillot simple",
       "min": 15,
       "cents": 1000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Maillot simple"
      },
      {
       "id": "-NBI-aQjGaMZwSoFShUB",
       "name": "Maillot échancré",
       "min": 15,
       "cents": 1500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Maillot échancré"
      },
      {
       "id": "-NBI-cWy_rEwYauTUEhp",
       "name": "Maillot brésilien / intégral",
       "min": 30,
       "cents": 2200,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Maillot brésilien / intégral"
      },
      {
       "id": "-NBI-exYX8HJmkgUVbYH",
       "name": "Demi-jambes",
       "min": 15,
       "cents": 2500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Demi-jambes"
      },
      {
       "id": "-NBI-hH37hmDbMHxn5Ip",
       "name": "Jambes complètes",
       "min": 30,
       "cents": 3800,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Jambes complètes"
      },
      {
       "id": "-NBI-jbvOjO_jbjZkw-P",
       "name": "Cuisses",
       "min": 15,
       "cents": 2800,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Cuisses"
      },
      {
       "id": "-NBI-llB8gkFWAIsY8lv",
       "name": "Bras",
       "min": 15,
       "cents": 2200,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Bras"
      }
     ],
     "note": {
      "head": "Forfait épilation",
      "items": [
       "2 zones : −5 %",
       "3 zones : −10 %",
       "4 zones : −15 %"
      ]
     }
    },
    {
     "id": "bandes",
     "group": "epilation",
     "title": "Cire en bandes",
     "rows": [
      {
       "id": "-NBI05_kACpVI39Lbsso",
       "name": "Demi-jambes",
       "min": 15,
       "cents": 1700,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Demi-jambes"
      },
      {
       "id": "-NBI07hq52PfqXlxRed-",
       "name": "Cuisses",
       "min": 15,
       "cents": 2000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Cuisses"
      },
      {
       "id": "-NBI0A_5LF3YTTWj8uQT",
       "name": "Jambes complètes",
       "min": 30,
       "cents": 2700,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Jambes complètes"
      },
      {
       "id": "-NBI0E-3BOpUhERIkNSk",
       "name": "Bras",
       "min": 15,
       "cents": 1700,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Bras"
      },
      {
       "id": "-OaPrJTHyTfa9uqjurM_",
       "name": "Torse ou dos",
       "min": 30,
       "cents": 3000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Torse ou Dos"
      },
      {
       "id": "-OaPrRhSmV144wXcBI5D",
       "name": "Épaules",
       "min": 15,
       "cents": 1200,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Épaules"
      }
     ],
     "note": {
      "head": "Forfait épilation",
      "items": [
       "2 zones : −5 %",
       "3 zones : −10 %",
       "4 zones : −15 %"
      ]
     }
    }
   ],
   "from": 800,
   "count": 15
  },
  {
   "id": "ongles",
   "title": "Onglerie",
   "kicker": "Mains & pieds",
   "teaser": "Pose complète, remplissage, semi-permanent, soins des mains et des pieds.",
   "intro": "Pose complète sur capsules ou chablon, remplissage, vernis semi-permanent (renforcé ou non), soins des mains et des pieds, dépose et décoration.",
   "photo": "carte-ongles",
   "sections": [
    {
     "id": "ongles",
     "group": "ongles",
     "title": "Pose, vernis & soins",
     "rows": [
      {
       "id": "-NBHyOpYzjaby5fcXboY",
       "name": "Soin velours des mains",
       "min": 45,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin velours des mains"
      },
      {
       "id": "-NBHyRMoEZzPKQt7HTtt",
       "name": "Soin douceurs des pieds",
       "min": 60,
       "cents": 4500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin douceurs des pieds"
      },
      {
       "id": "-NBHyTWntZzc-L078TMw",
       "name": "Pose de vernis",
       "min": 15,
       "cents": 1500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Pose de vernis"
      },
      {
       "id": "-NBHyVqyK1KoifhMG6xI",
       "name": "Pose de vernis semi-permanent mains ou pieds",
       "min": 30,
       "cents": 2500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Pose de vernis semi-permanent mains ou pieds"
      },
      {
       "id": "-O7Xmqq6sDyQ-vAmtmRU",
       "name": "Vernis semi-permanent renforcé, mains ou pieds",
       "min": 45,
       "cents": 3000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Vernis semi permanent renforcé mains ou pieds"
      },
      {
       "id": "-NUWSb-UauxO6cuYv9Sq",
       "name": "Soin anti-callosités avec vernis semi-permanent",
       "min": 45,
       "cents": 4500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin anti callosités avec vernis semi permanent"
      },
      {
       "id": "-NBHyYIiR4Uz4NUrpjkp",
       "name": "Pose complète",
       "min": 90,
       "cents": 4500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "desc": "Capsules ou chablons.",
       "planity": "Pose complète"
      },
      {
       "id": "-NBHyadGtWFSpftJs5Ko",
       "name": "Remplissage",
       "min": 60,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Remplissage"
      },
      {
       "id": "-NBHyiIp0rb2F6VQwEU9",
       "name": "Supplément déco",
       "min": 30,
       "cents": 0,
       "mode": "book",
       "devis": true,
       "supp": true,
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Supplément Déco"
      },
      {
       "id": "-NBHyeyLGW5mI4k998j2",
       "name": "Supplément soin cuticules",
       "min": 15,
       "cents": 1500,
       "mode": "book",
       "supp": true,
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Supplément soin cuticules"
      },
      {
       "id": "-NBHyl72k9exmsNG1s13",
       "name": "Dépose",
       "min": 30,
       "cents": 1000,
       "mode": "book",
       "supp": true,
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Dépose"
      },
      {
       "id": "-NUWSigJaLwVzyv7MV2f",
       "name": "Soin anti-callosités",
       "min": 30,
       "cents": 3000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Soin anti callosités"
      }
     ]
    }
   ],
   "from": 1500,
   "count": 12
  },
  {
   "id": "regard",
   "title": "Maquillage & regard",
   "kicker": "Cils · sourcils · teint",
   "teaser": "Maquillage de jour, de soirée ou de mariée, teinture, recourbement, lash lift.",
   "intro": "Maquillage de jour, de soirée ou de mariée (avec essai), cours d’auto-maquillage, teinture des cils et des sourcils, recourbement de cils et lash lift coréen.",
   "photo": "carte-regard",
   "sections": [
    {
     "id": "maquillage",
     "group": "regard",
     "title": "Maquillage",
     "rows": [
      {
       "id": "-NBHysUtQVSbT4RXPBwq",
       "name": "Maquillage jour ou conseil en maquillage",
       "min": 45,
       "cents": 3500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Malika"
       ],
       "planity": "Maquillage jour ou conseil en maquillage"
      },
      {
       "id": "-NBHyullSCO0qujJ41kJ",
       "name": "Maquillage soirée",
       "min": 60,
       "cents": 4500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Malika"
       ],
       "planity": "Maquillage soirée"
      },
      {
       "id": "-NBHyy-mQmXDXSxNXvIZ",
       "name": "Maquillage mariée + essai",
       "min": 90,
       "cents": 7500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Malika"
       ],
       "planity": "Maquillage mariée + essai"
      },
      {
       "id": "-OaPPkJCELCEFnh8XsHQ",
       "name": "Cours d’auto maquillage personnalisé",
       "min": 60,
       "cents": 7000,
       "mode": "book",
       "qui": [
        "Christelle",
        "Delphine",
        "Malika"
       ],
       "planity": "Cours d’auto maquillage personnalisé"
      }
     ],
     "note": {
      "head": "Avantages",
      "items": [
       "−10 % sur la gamme Pupa Milano"
      ]
     }
    },
    {
     "id": "cils",
     "group": "regard",
     "title": "Cils & sourcils",
     "rows": [
      {
       "id": "-NBHz-VcB6kJoDL8lXvA",
       "name": "Teinture des cils",
       "min": 15,
       "cents": 1500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Malika"
       ],
       "planity": "Teinture cils"
      },
      {
       "id": "-NBHz1a0dETyCxsMW8P0",
       "name": "Teinture des sourcils",
       "min": 15,
       "cents": 1500,
       "mode": "book",
       "qui": [
        "Christelle",
        "Malika"
       ],
       "planity": "Teinture sourcils"
      },
      {
       "id": "-NBHz5-iJotnyjBbRekm",
       "name": "Recourbement de cils + teinture des cils",
       "min": 60,
       "cents": 5000,
       "mode": "book",
       "qui": [
        "Christelle"
       ],
       "planity": "Recourbement de cils + teinture des cils"
      },
      {
       "id": "-OfYDqs0ZxZHUNHLra4P",
       "name": "Soin lash lift coréen + teinture des cils",
       "min": 60,
       "cents": 6500,
       "mode": "book",
       "qui": [
        "Christelle"
       ],
       "planity": "Soin lash lift coréen + teinture des cils"
      }
     ]
    }
   ],
   "from": 1500,
   "count": 8
  },
  {
   "id": "bronzage",
   "title": "Bronzage UV",
   "kicker": "Séances",
   "teaser": "Des séances de 10, 15, 20, 25 ou 30 minutes.",
   "intro": "Des séances de 10, 15, 20, 25 ou 30 minutes.",
   "photo": "carte-bronzage",
   "sections": [
    {
     "id": "uv",
     "group": "bronzage",
     "title": "Séances de bronzage UV",
     "rows": [
      {
       "id": "-NsOC5ccHpSf1--30sjC",
       "name": "Bronzage UV, 30 min",
       "min": 35,
       "cents": 3000,
       "mode": "book",
       "planity": "Bronzage Uv 30 min"
      },
      {
       "id": "-NsOCCCIV6absnWfZGxW",
       "name": "Bronzage UV, 25 min",
       "min": 30,
       "cents": 2500,
       "mode": "book",
       "planity": "Bronzage uv 25 min"
      },
      {
       "id": "-NsOCI0sAH52sGFzriIL",
       "name": "Bronzage UV, 20 min",
       "min": 25,
       "cents": 2000,
       "mode": "book",
       "planity": "Bronzage uv 20 min"
      },
      {
       "id": "-NsOCMamPPGwHNv_Yi6d",
       "name": "Bronzage UV, 15 min",
       "min": 20,
       "cents": 1500,
       "mode": "book",
       "planity": "Bronzage uv 15min"
      },
      {
       "id": "-NsOCQA_WBBXzYcnn_3k",
       "name": "Bronzage UV, 10 min",
       "min": 15,
       "cents": 1000,
       "mode": "book",
       "planity": "Bronzage uv 10min"
      }
     ]
    }
   ],
   "from": 1000,
   "count": 5
  }
 ],
 "ceremonies": [
  {
   "fam": "cer-reve",
   "name": "Cérémonie « Rêve »",
   "min": 135,
   "steps": [
    "Accès au hammam",
    "Exfoliation du corps",
    "Modelage du dos"
   ],
   "soloId": "-NBI168UqZ-mnyb1bjng",
   "soloCents": 9000,
   "duoId": "-NC-RigtFs2uT6UMXJrm",
   "duoCents": 16200,
   "desc": "Accès au hammam suivi d’une exfoliation du corps puis d’un modelage dos."
  },
  {
   "fam": "cer-monde",
   "name": "Cérémonie « Au bout du monde »",
   "min": 150,
   "steps": [
    "Accès au hammam",
    "Exfoliation du corps",
    "Modelage relaxant du corps"
   ],
   "soloId": "-NBI19rzJj9AolX4W9nB",
   "soloCents": 11500,
   "duoId": "-NC-RivPC9XT8n0U3jgb",
   "duoCents": 20700,
   "desc": "Accès au hammam suivi d’une exfoliation du corps puis d’un modelage relaxant du corps."
  },
  {
   "fam": "cer-luxe",
   "name": "Cérémonie « Luxe exotique »",
   "min": 210,
   "steps": [
    "Accès au hammam",
    "Exfoliation du corps",
    "Modelage relaxant",
    "Soin du visage « Sources et Lagons de Polynésie »"
   ],
   "soloId": "-NBI1E-bi-w3A0588aVk",
   "soloCents": 18500,
   "duoId": "-NC-Rj5nxucC_sSVsPUy",
   "duoCents": 36000,
   "desc": "Accès au hammam suivi d’une exfoliation du corps, d’un modelage relaxant puis d’un soin du visage « Sources et Lagons de Polynésie »."
  }
 ],
 "reviews": [
  {
   "src": "Planity",
   "who": "Amandine F.",
   "stars": 5,
   "when": "septembre 2026",
   "service": "Remplissage",
   "text": "Ça fait 4 ans que j’y vais et je ne suis jamais déçue. Super accueil, super travail (ongles et épilation ) je recommande a 20000%"
  },
  {
   "src": "Planity",
   "who": "Madalena M.",
   "stars": 5,
   "when": "septembre 2026",
   "service": "Pose de vernis semi-permanent mains ou pieds",
   "text": "Prestation parfaite ! Mes ongles sont magnifiques depuis vendredi. L'esthéticienne est très gentille et accueillante. C'est la 4ème fois que je viens et je ne suis jamais déçue !"
  },
  {
   "src": "Google",
   "who": "Aurore P.",
   "stars": 5,
   "when": "mai 2026",
   "service": "",
   "text": "Un grand merci à Christelle pour son professionnalisme, sa gentillesse, son perfectionnement et son sens du relationnel. C’est toujours un grand plaisir et une grande joie de passer ce moment avec elle. Si je peut résumé qu’une seule chose c’est que c’est la définition parfaite du savoir faire. Merci beaucoup à toi Christelle."
  },
  {
   "src": "Planity",
   "who": "Sandrine A.",
   "stars": 5,
   "when": "septembre 2026",
   "service": "Sourcils ou aisselles",
   "text": "Institut découvert par hasard, j'ai été accueillie dans une ambiance chaleureuse, décontractée. Les esthéticiennes sont professionnelles et très sympas. Les lieux sont propres. C'est validé pour moi"
  },
  {
   "src": "Planity",
   "who": "Pascale V.",
   "stars": 5,
   "when": "mars 2026",
   "service": "Remplissage",
   "text": "Accueil et ambiance chaleureuse. Les esthéticiennes sont très professionnelles et nous conseillent au plus juste."
  },
  {
   "src": "Google",
   "who": "Romeo V.",
   "stars": 5,
   "when": "mars 2026",
   "service": "",
   "text": "Un moment de deux heures très reposant, dans un calme avec hamam, séance de gommage et massage en duo. Parfait pour les couples en recherche d’une petite pause."
  },
  {
   "src": "Planity",
   "who": "Elodie O.",
   "stars": 5,
   "when": "mars 2026",
   "service": "Pose complète",
   "text": "Travail remarquable, prestations toujours de qualité merci À tte l'équipe mais surtout à ma prothésiste Delphine que je suis fidèlement depuis 11 ans 😊🙂"
  },
  {
   "src": "Planity",
   "who": "Mélina W.",
   "stars": 5,
   "when": "décembre 2025",
   "service": "Sourcils ou aisselles",
   "text": "Un grand merci à Christelle pour son professionnalisme et sa gentillesse ! Toujours un plaisir de venir se faire chouchouter au salon"
  },
  {
   "src": "Google",
   "who": "Christophe T.",
   "stars": 5,
   "when": "février 2026",
   "service": "",
   "text": "Une prestation au top comme d’habitude avec Christelle hyper professionnelle bienveillante et toujours très très agréable. Mon moment chaque mois , avec le sourire et un résultat à la perfection(Onglerie,épilation) merci merci et je recommande fortement ! Christel F."
  },
  {
   "src": "Planity",
   "who": "Lison S.",
   "stars": 5,
   "when": "août 2025",
   "service": "Maillot brésilien / intégral",
   "text": "Malika est toujours d’excellents conseils et à l’écoute ! Encore merci pour votre douceur et votre attention."
  },
  {
   "src": "Planity",
   "who": "Nolwine L.",
   "stars": 5,
   "when": "août 2025",
   "service": "Pose complète",
   "text": "Un endroit très agréable, les filles sont sympathiques et un travail très bien réalisé Et elles sont de bon conseil !"
  },
  {
   "src": "Google",
   "who": "Elisabeth M.",
   "stars": 5,
   "when": "novembre 2025",
   "service": "",
   "text": "Toujours formidable.. une équipe très professionnelle et très accueillante.. nous sommes toujours sorties de nos rendez vous totalement enchantés pour diverses prestations"
  },
  {
   "src": "Planity",
   "who": "Véronique D.",
   "stars": 5,
   "when": "mai 2025",
   "service": "Remplissage",
   "text": "Salon top et très pro...la directrice \" Delphine\" est très agréable et pro...Moi , Malika s occupe de moi ,ongles et épilations...👌Vous met à l'aise ,d'une gentillesse,connait son métier... bravo"
  },
  {
   "src": "Planity",
   "who": "Aude D.",
   "stars": 5,
   "when": "avril 2025",
   "service": "Bronzage uv  20 min",
   "text": "Christelle est d’un professionnalisme sans faille , accueil au top avec des explications claires et précises … enfin une machine UV performante !!! Bravo l’equipe"
  },
  {
   "src": "Google",
   "who": "Luc V.",
   "stars": 5,
   "when": "juillet 2025",
   "service": "",
   "text": "Au top, je conseille à tout le monde, vous pouvez y aller les yeux fermés. Personnel et travail de qualité 👍🏼"
  },
  {
   "src": "Planity",
   "who": "Sandrine C.",
   "stars": 5,
   "when": "février 2025",
   "service": "Sourcils / aisselles",
   "text": "Elles sont toutes extra ! Meme si on a toutes nos préférences qd meme 😉 appliquées contrairement à certaines chaînes Je recommande. Presta de qualité, ... et rapport qualité/prix 👌"
  },
  {
   "src": "Planity",
   "who": "Sophie G.",
   "stars": 5,
   "when": "janvier 2025",
   "service": "Remplissage",
   "text": "Un centre esthétique super jolie a l’intérieur Facile d’accès avec un parking Beaucoup de prestations différentes et de qualités Centre esthétique complet Personnel à l’écoute"
  },
  {
   "src": "Google",
   "who": "Marjo",
   "stars": 5,
   "when": "mars 2025",
   "service": "",
   "text": "Malika est une esthéticienne exceptionnelle : professionnelle, minutieuse et à l'écoute. Elle prend soin de ses clientes avec une grande attention et offre des prestations de qualité. Delphine, la patronne, a su s'entourer de personnes compétentes, ce qui crée une ambiance agréable et de confiance. Je recommande vivement cet institut et encore merci à vous toutes."
  },
  {
   "src": "Planity",
   "who": "Laura L.",
   "stars": 5,
   "when": "novembre 2024",
   "service": "Remplissage",
   "text": "Mes ongles sont magnifiques ! J'adore et je recommande à 100% ! Un vrai moment de détente dans une embiance chaleureuse et bienveillante 😊"
  },
  {
   "src": "Planity",
   "who": "Clotilde F.",
   "stars": 5,
   "when": "septembre 2024",
   "service": "Hammam pour 2 personnes",
   "text": "Parfait. J'ai passé un super moment à la hauteur de mes attentes. Hammam bien chauffe , serviettes à disposition . Super."
  },
  {
   "src": "Google",
   "who": "Solène B.",
   "stars": 5,
   "when": "juin 2024",
   "service": "",
   "text": "Cliente fidèle , je fais mes ongles la bas presque à chaque fois. Elles sont adorables, toujours dans la bienveillance et pro ( merci encore pour la gamelle d’eau pour mon toutou ❤️) Ce que j’aime c’est que c’est très bien fait et rapide n’ayant souvent pas trop de temps c’est juste parfait. Bravo la team 👍"
  },
  {
   "src": "Planity",
   "who": "Manon D.",
   "stars": 5,
   "when": "avril 2024",
   "service": "Soin Bidou",
   "text": "Toujours ravis d’allez me faire chouchouter chez Delphine esthétique. L’équipe est très souriante et professionnelle . Je recommande +++"
  },
  {
   "src": "Planity",
   "who": "Marylise S.",
   "stars": 5,
   "when": "janvier 2024",
   "service": "Demi-jambes",
   "text": "Chrystelle est une esthéticienne très professionnelle à l'écoute de ses clientes on se sent comme à la maison dans une bulle coconing et mes mains sont parfaite"
  },
  {
   "src": "Google",
   "who": "Cindy E.",
   "stars": 5,
   "when": "octobre 2023",
   "service": "",
   "text": "Une belle escapade de bien être avec christelle. Je recommande le modelage relaxant qui m'a bien détendu. Une adresse à ne pas louper si vous souhaitez un massage de qualité."
  },
  {
   "src": "Planity",
   "who": "Stéphanie C.",
   "stars": 5,
   "when": "septembre 2023",
   "service": "Cérémonie « Rêve »",
   "text": "Hammam, gommage et massage... un moment exceptionnel!! Je recommande et j'y retournerai avec mes amies!"
  },
  {
   "src": "Planity",
   "who": "Coralie D.",
   "stars": 5,
   "when": "août 2023",
   "service": "Modelage relaxant",
   "text": "Je recommande accueil au top. Et prestations très bien. Massage de Christelle une tuerie. Coralie"
  },
  {
   "src": "Google",
   "who": "Christine A.",
   "stars": 5,
   "when": "février 2023",
   "service": "",
   "text": "Service excellent, hammam super, un vrai régal,allez y,vous aurez un moment de détente avec votre thé et petit gâteau, les filles sont au top,j adore, j y vais tous les mois!"
  },
  {
   "src": "Planity",
   "who": "Francesca C.",
   "stars": 5,
   "when": "avril 2023",
   "service": "Remplissage",
   "text": "Equipe toujours ponctuelle et souriante. Épilation impeccable et ongles sublimes. Mon chéri m'a offert le soin fil de soie. Un vrai petit moment de détente et mon regard sublimé !"
  },
  {
   "src": "Planity",
   "who": "Isabelle B.",
   "stars": 5,
   "when": "avril 2023",
   "service": "Rituel « Sources et Lagons de Polynésie »",
   "text": "L'accueil es o top du top une super équipe gentille et souriante . Le prestation sont juste exceptionnelle Jamais decu et toujours très contente de revenir . Ne changer rien les filles 😘"
  },
  {
   "src": "Google",
   "who": "Sylvie N.",
   "stars": 5,
   "when": "décembre 2022",
   "service": "",
   "text": "Un accueil extraordinaire, on s'y sent de suite bien. Un sourire rayonnant, que ça fait du bien!! Merci"
  },
  {
   "src": "Planity",
   "who": "Melanie N.",
   "stars": 5,
   "when": "janvier 2023",
   "service": "Remplissage",
   "text": "Cliente depuis toujours chez Delphine, que ce soit Delphine ou le reste de son l’équipe tout est parfait!un institut que je recommande vivement!!"
  },
  {
   "src": "Planity",
   "who": "Laetitia R.",
   "stars": 5,
   "when": "janvier 2023",
   "service": "Remplissage",
   "text": "Des ongles superbes et si ne cesseront pas. Je suis toujours très satisfaite du travail de Chrystelle. C'est pour moi le meilleur salon d'esthétique de Manosque."
  },
  {
   "src": "Google",
   "who": "Sylvia R.",
   "stars": 5,
   "when": "octobre 2021",
   "service": "",
   "text": "Très beau salon, accueillant. Grand professionnalisme. Soins impeccables. Très bon accueil."
  },
  {
   "src": "Planity",
   "who": "Sandrine M.",
   "stars": 5,
   "when": "novembre 2022",
   "service": "Remplissage",
   "text": "Prestations au top. Delphine et son équipe sont très professionnelles, agréables et disponibles. Je recommande ce salon d'esthétique les yeux fermés"
  },
  {
   "src": "Planity",
   "who": "Laurie S.",
   "stars": 5,
   "when": "novembre 2022",
   "service": "Remplissage",
   "text": "Excellente ambiance dans cet institut qui inspire la détente. Bravo à Delphine et son équipe d’esthéticiennes, vous êtes au Top 😃"
  },
  {
   "src": "Google",
   "who": "Eve M.",
   "stars": 5,
   "when": "juillet 2021",
   "service": "",
   "text": "Delphine et son équipe sont de vrais pros. je recommande cet institut"
  },
  {
   "src": "Planity",
   "who": "Virginie K.",
   "stars": 5,
   "when": "novembre 2022",
   "service": "Sourcils / aisselles",
   "text": "Institut au top. Toujours bien accueillie. Delphine et sont équipe sont au petit soin quelque soit la prestation. Le meilleur institut de Manosque !"
  },
  {
   "src": "Planity",
   "who": "Julie M.",
   "stars": 5,
   "when": "octobre 2022",
   "service": "Pose de vernis semi-permanent",
   "text": "C'est tout le temps un plaisir de venir chez Delphine Esthétique car les filles sont remarquable au niveau de leur travail, l'ambiance est très sympa et c'est un salon d'une propreté irréprochable. Vous êtes au top les filles !!!"
  },
  {
   "src": "Google",
   "who": "Stephanie",
   "stars": 5,
   "when": "mai 2021",
   "service": "",
   "text": "Un accueil incroyablement chaleureux. Un professionnalisme incroyable et des produits de très bonne qualité. Ce qui est très rare à Manosque ! Je recommande à 300%!"
  },
  {
   "src": "Google",
   "who": "Sylvie A.",
   "stars": 5,
   "when": "décembre 2020",
   "service": "",
   "text": "Un magnifique institut, ambiance très raffinée et cosy 😍 un accueil toujours agréable et professionnel, des soins réalisés avec d´excellents produits, des manucures magnifiques, le paradis c’est chez Delphine !"
  }
 ],
 "gallery": [
  {
   "id": "pl-10",
   "w": 1500,
   "h": 1000,
   "alt": "Cabine de massage : table noire et serviette moutarde, suspensions dorées et deux statues de singes sages",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-flocons",
   "w": 1188,
   "h": 1500,
   "alt": "Ongles carrés rose poudré décorés de flocons de neige blancs et de rayures givrées",
   "cat": "ongles"
  },
  {
   "id": "pl-06",
   "w": 1500,
   "h": 1000,
   "alt": "Espace détente : transats jaune moutarde, bouddha de pierre et fauteuil de pédicure sous un mur bleu nuit",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-arc-en-ciel",
   "w": 1125,
   "h": 1500,
   "alt": "Ongles en dégradé de couleurs vives, de l’orange corail au vert pâle",
   "cat": "ongles"
  },
  {
   "id": "pl-01",
   "w": 1500,
   "h": 1000,
   "alt": "Façade de l’institut Delphine Esthétique à Manosque : vitrine, enseigne « Soins, onglerie, hammam »",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-feuilles-or",
   "w": 1125,
   "h": 1500,
   "alt": "Ongles blancs laiteux et deux ongles transparents ornés de feuilles d’or et de reflets irisés",
   "cat": "ongles"
  },
  {
   "id": "pl-04",
   "w": 1500,
   "h": 1000,
   "alt": "Espace onglerie : mur gris, lustre doré, longue table blanche et chaises claires",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-violet-pop",
   "w": 1400,
   "h": 1324,
   "alt": "Ongles violets effet pop art, avec une bouche dessinée à la main",
   "cat": "ongles"
  },
  {
   "id": "pl-12",
   "w": 1500,
   "h": 1000,
   "alt": "Douche en travertin du hammam, à côté d’une affiche de la gamme Vanille",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-pull",
   "w": 1383,
   "h": 1500,
   "alt": "Ongles avec une french blanche, un flocon de neige et un motif en relief façon maille de pull bleu pâle",
   "cat": "ongles"
  },
  {
   "id": "pl-02",
   "w": 1500,
   "h": 1000,
   "alt": "Cabine de soin : table noire, serviettes moutarde, appareils de soin et décor doré au mur",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-lavande",
   "w": 1125,
   "h": 1500,
   "alt": "Ongles carrés couleur lavande, dont un ongle pailleté violet",
   "cat": "ongles"
  },
  {
   "id": "pl-11",
   "w": 1500,
   "h": 1000,
   "alt": "Coin pédicure : fauteuil blanc et transats moutarde devant un mur bleu nuit orné d’une grande horloge",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-vert",
   "w": 1125,
   "h": 1500,
   "alt": "Ongles amande à motifs de feuillages verts, avec un ongle vert effet miroir",
   "cat": "ongles"
  },
  {
   "id": "pl-09",
   "w": 1500,
   "h": 1000,
   "alt": "L’onglerie en plein service : esthéticiennes et clientes assises à la longue table blanche",
   "cat": "institut"
  },
  {
   "id": "fb-ongles-palmier",
   "w": 1500,
   "h": 979,
   "alt": "Ongles dégradés bleu et rose avec palmiers dessinés à la main, paillettes dorées et petite étoile",
   "cat": "ongles"
  },
  {
   "id": "pl-03",
   "w": 1500,
   "h": 1000,
   "alt": "Maquillage minéral et bio présenté sur des étagères en bambou",
   "cat": "institut"
  },
  {
   "id": "fb-maquillage",
   "w": 1125,
   "h": 1500,
   "alt": "Séance de maquillage dans l’institut, devant les étagères dorées garnies de soins",
   "cat": "institut"
  },
  {
   "id": "pl-05",
   "w": 1500,
   "h": 1000,
   "alt": "Étagères dorées garnies de soins, de compléments et de produits de beauté",
   "cat": "institut"
  },
  {
   "id": "pl-07",
   "w": 1500,
   "h": 1000,
   "alt": "Gammes de soins noir et or, huiles et gommages, sur des étagères dorées",
   "cat": "institut"
  },
  {
   "id": "pl-08",
   "w": 1500,
   "h": 1000,
   "alt": "Cabine claire avec table d’épilation et grand tableau de plage au mur",
   "cat": "institut"
  }
 ]
};
