/**
 * Österreichische Wappen - Bundesländer und Städte
 * Mit Fallback-URLs für bessere Verfügbarkeit
 * 
 * Primär: Direkte SVG von Wikimedia Commons
 * Fallback: PNG Thumbnails als zweite Option
 * Placeholder: SVG als letzte Option
 */

// Placeholder für fehlende Bilder
const WAPPEN_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"%3E%3Crect fill="%23f0f0f0" width="100" height="120"/%3E%3Ctext x="50" y="60" text-anchor="middle" fill="%23999" font-size="12"%3EWappen%3C/text%3E%3Ctext x="50" y="75" text-anchor="middle" fill="%23999" font-size="10"%3Enicht verfügbar%3C/text%3E%3C/svg%3E';

// Wappen-Daten mit Arrays von URL-Optionen (primär, fallback)
const austrianCoatsOfArms = {
    // Bundesländer (9)
    bundeslaender: {
        'Wien': {
            name: 'Wien',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Wien_3_Wappen.svg/200px-Wien_3_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/0/03/Wien_3_Wappen.svg'
            ],
            typ: 'Bundesland & Landeshauptstadt'
        },
        'Niederösterreich': {
            name: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/CoA_Lower_Austria.svg/200px-CoA_Lower_Austria.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/d/d0/CoA_Lower_Austria.svg'
            ],
            typ: 'Bundesland'
        },
        'Oberösterreich': {
            name: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Oberoesterreich_Wappen.svg/200px-Oberoesterreich_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/e/e1/Oberoesterreich_Wappen.svg'
            ],
            typ: 'Bundesland'
        },
        'Steiermark': {
            name: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Steiermark_Wappen.svg/200px-Steiermark_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/3/35/Steiermark_Wappen.svg'
            ],
            typ: 'Bundesland'
        },
        'Kärnten': {
            name: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Carinthia.svg/200px-Flag_of_Carinthia.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Carinthia.svg'
            ],
            typ: 'Bundesland'
        },
        'Salzburg': {
            name: 'Salzburg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Salzburg_Wappen.svg/200px-Salzburg_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/d/de/Salzburg_Wappen.svg'
            ],
            typ: 'Bundesland'
        },
        'Tirol': {
            name: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Flag_of_Tirol_and_Upper_Austria.svg/200px-Flag_of_Tirol_and_Upper_Austria.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/9/97/Flag_of_Tirol_and_Upper_Austria.svg'
            ],
            typ: 'Bundesland'
        },
        'Vorarlberg': {
            name: 'Vorarlberg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Salzburg%2C_Vienna%2C_Vorarlberg.svg/200px-Flag_of_Salzburg%2C_Vienna%2C_Vorarlberg.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Salzburg%2C_Vienna%2C_Vorarlberg.svg'
            ],
            typ: 'Bundesland'
        },
        'Burgenland': {
            name: 'Burgenland',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Burgenland_Wappen.svg/200px-Burgenland_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/9/92/Burgenland_Wappen.svg'
            ],
            typ: 'Bundesland'
        }
    },

    // Landeshauptstädte (9)
    landeshauptstaedte: {
        'Wien': {
            name: 'Wien',
            bundesland: 'Wien',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Wien_3_Wappen.svg/200px-Wien_3_Wappen.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/0/03/Wien_3_Wappen.svg'
            ]
        },
        'St. Pölten': {
            name: 'St. Pölten',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/AUT_Sankt_P%C3%B6lten_COA.svg/200px-AUT_Sankt_P%C3%B6lten_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/3/32/AUT_Sankt_P%C3%B6lten_COA.svg'
            ]
        },
        'Linz': {
            name: 'Linz',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/AUT_Linz_COA.svg/200px-AUT_Linz_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/9/9e/AUT_Linz_COA.svg'
            ]
        },
        'Graz': {
            name: 'Graz',
            bundesland: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/AUT_Graz_COA.svg/200px-AUT_Graz_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/e/e5/AUT_Graz_COA.svg'
            ]
        },
        'Klagenfurt': {
            name: 'Klagenfurt',
            bundesland: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/AUT_Klagenfurt_am_W%C3%B6rthersee_COA.svg/200px-AUT_Klagenfurt_am_W%C3%B6rthersee_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/c/cc/AUT_Klagenfurt_am_W%C3%B6rthersee_COA.svg'
            ]
        },
        'Salzburg': {
            name: 'Salzburg',
            bundesland: 'Salzburg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/AUT_Salzburg_Stadt_COA.svg/200px-AUT_Salzburg_Stadt_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/4/4c/AUT_Salzburg_Stadt_COA.svg'
            ]
        },
        'Innsbruck': {
            name: 'Innsbruck',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/AUT_Innsbruck_COA.svg/200px-AUT_Innsbruck_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/0/03/AUT_Innsbruck_COA.svg'
            ]
        },
        'Bregenz': {
            name: 'Bregenz',
            bundesland: 'Vorarlberg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/AUT_Bregenz_COA.svg/200px-AUT_Bregenz_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/3/37/AUT_Bregenz_COA.svg'
            ]
        },
        'Eisenstadt': {
            name: 'Eisenstadt',
            bundesland: 'Burgenland',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/AUT_Eisenstadt_COA.svg/200px-AUT_Eisenstadt_COA.svg.png',
                'https://upload.wikimedia.org/wikipedia/commons/3/3e/AUT_Eisenstadt_COA.svg'
            ]
        }
    },

    // Wichtige Städte Österreichs
    staedte: {
        'Amstetten': {
            name: 'Amstetten',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/e/e9/AUT_Amstetten_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/AUT_Amstetten_COA.svg/200px-AUT_Amstetten_COA.svg.png'
            ]
        },
        'Baden': {
            name: 'Baden',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/a1/AUT_Baden_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AUT_Baden_COA.svg/200px-AUT_Baden_COA.svg.png'
            ]
        },
        'Bad Ischl': {
            name: 'Bad Ischl',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/d/d0/AUT_Bad_Ischl_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AUT_Bad_Ischl_COA.svg/200px-AUT_Bad_Ischl_COA.svg.png'
            ]
        },
        'Bruck an der Mur': {
            name: 'Bruck an der Mur',
            bundesland: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/9/92/AUT_Bruck_an_der_Mur_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/AUT_Bruck_an_der_Mur_COA.svg/200px-AUT_Bruck_an_der_Mur_COA.svg.png'
            ]
        },
        'Dornbirn': {
            name: 'Dornbirn',
            bundesland: 'Vorarlberg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/3/33/AUT_Dornbirn_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/AUT_Dornbirn_COA.svg/200px-AUT_Dornbirn_COA.svg.png'
            ]
        },
        'Feldkirch': {
            name: 'Feldkirch',
            bundesland: 'Vorarlberg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/1/11/AUT_Feldkirch_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/AUT_Feldkirch_COA.svg/200px-AUT_Feldkirch_COA.svg.png'
            ]
        },
        'Gmunden': {
            name: 'Gmunden',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/3/3c/AUT_Gmunden_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/AUT_Gmunden_COA.svg/200px-AUT_Gmunden_COA.svg.png'
            ]
        },
        'Hall in Tirol': {
            name: 'Hall in Tirol',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/b/be/AUT_Hall_in_Tirol_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/AUT_Hall_in_Tirol_COA.svg/200px-AUT_Hall_in_Tirol_COA.svg.png'
            ]
        },
        'Hallein': {
            name: 'Hallein',
            bundesland: 'Salzburg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/e/e6/AUT_Hallein_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/AUT_Hallein_COA.svg/200px-AUT_Hallein_COA.svg.png'
            ]
        },
        'Kapfenberg': {
            name: 'Kapfenberg',
            bundesland: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/6/68/AUT_Kapfenberg_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/AUT_Kapfenberg_COA.svg/200px-AUT_Kapfenberg_COA.svg.png'
            ]
        },
        'Kitzbühel': {
            name: 'Kitzbühel',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/8/8a/AUT_Kitzb%C3%BChel_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AUT_Kitzb%C3%BChel_COA.svg/200px-AUT_Kitzb%C3%BChel_COA.svg.png'
            ]
        },
        'Klosterneuburg': {
            name: 'Klosterneuburg',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/2/29/AUT_Klosterneuburg_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/AUT_Klosterneuburg_COA.svg/200px-AUT_Klosterneuburg_COA.svg.png'
            ]
        },
        'Krems': {
            name: 'Krems',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/6/69/AUT_Krems_an_der_Donau_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/AUT_Krems_an_der_Donau_COA.svg/200px-AUT_Krems_an_der_Donau_COA.svg.png'
            ]
        },
        'Kufstein': {
            name: 'Kufstein',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/a1/AUT_Kufstein_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AUT_Kufstein_COA.svg/200px-AUT_Kufstein_COA.svg.png'
            ]
        },
        'Leibnitz': {
            name: 'Leibnitz',
            bundesland: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/4/44/AUT_Leibnitz_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/AUT_Leibnitz_COA.svg/200px-AUT_Leibnitz_COA.svg.png'
            ]
        },
        'Leoben': {
            name: 'Leoben',
            bundesland: 'Steiermark',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/4/4d/AUT_Leoben_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/AUT_Leoben_COA.svg/200px-AUT_Leoben_COA.svg.png'
            ]
        },
        'Lienz': {
            name: 'Lienz',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/5/52/AUT_Lienz_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AUT_Lienz_COA.svg/200px-AUT_Lienz_COA.svg.png'
            ]
        },
        'Mattersburg': {
            name: 'Mattersburg',
            bundesland: 'Burgenland',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/e/e3/AUT_Mattersburg_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/AUT_Mattersburg_COA.svg/200px-AUT_Mattersburg_COA.svg.png'
            ]
        },
        'Mödling': {
            name: 'Mödling',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/b/b7/AUT_M%C3%B6dling_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/AUT_M%C3%B6dling_COA.svg/200px-AUT_M%C3%B6dling_COA.svg.png'
            ]
        },
        'Neunkirchen': {
            name: 'Neunkirchen',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/8/80/AUT_Neunkirchen_%28N%C3%96%29_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/AUT_Neunkirchen_%28N%C3%96%29_COA.svg/200px-AUT_Neunkirchen_%28N%C3%96%29_COA.svg.png'
            ]
        },
        'Oberwart': {
            name: 'Oberwart',
            bundesland: 'Burgenland',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/1/1c/AUT_Oberwart_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/AUT_Oberwart_COA.svg/200px-AUT_Oberwart_COA.svg.png'
            ]
        },
        'Ried im Innkreis': {
            name: 'Ried im Innkreis',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/c/c3/AUT_Ried_im_Innkreis_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/AUT_Ried_im_Innkreis_COA.svg/200px-AUT_Ried_im_Innkreis_COA.svg.png'
            ]
        },
        'Rust': {
            name: 'Rust',
            bundesland: 'Burgenland',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/0/01/AUT_Rust_%28Burgenland%29_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/AUT_Rust_%28Burgenland%29_COA.svg/200px-AUT_Rust_%28Burgenland%29_COA.svg.png'
            ]
        },
        'Schwaz': {
            name: 'Schwaz',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/9/97/AUT_Schwaz_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/AUT_Schwaz_COA.svg/200px-AUT_Schwaz_COA.svg.png'
            ]
        },
        'Schwechat': {
            name: 'Schwechat',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/ae/AUT_Schwechat_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/AUT_Schwechat_COA.svg/200px-AUT_Schwechat_COA.svg.png'
            ]
        },
        'Spittal an der Drau': {
            name: 'Spittal an der Drau',
            bundesland: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/4/41/AUT_Spittal_an_der_Drau_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/AUT_Spittal_an_der_Drau_COA.svg/200px-AUT_Spittal_an_der_Drau_COA.svg.png'
            ]
        },
        'Steyr': {
            name: 'Steyr',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/8/81/AUT_Steyr_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/AUT_Steyr_COA.svg/200px-AUT_Steyr_COA.svg.png'
            ]
        },
        'Stockerau': {
            name: 'Stockerau',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/c/c8/AUT_Stockerau_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/AUT_Stockerau_COA.svg/200px-AUT_Stockerau_COA.svg.png'
            ]
        },
        'Telfs': {
            name: 'Telfs',
            bundesland: 'Tirol',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/8/88/AUT_Telfs_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/AUT_Telfs_COA.svg/200px-AUT_Telfs_COA.svg.png'
            ]
        },
        'Traun': {
            name: 'Traun',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/8/8f/AUT_Traun_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/AUT_Traun_COA.svg/200px-AUT_Traun_COA.svg.png'
            ]
        },
        'Tulln': {
            name: 'Tulln',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/c/cb/AUT_Tulln_an_der_Donau_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/AUT_Tulln_an_der_Donau_COA.svg/200px-AUT_Tulln_an_der_Donau_COA.svg.png'
            ]
        },
        'Villach': {
            name: 'Villach',
            bundesland: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/1/19/AUT_Villach_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/AUT_Villach_COA.svg/200px-AUT_Villach_COA.svg.png'
            ]
        },
        'Völkermarkt': {
            name: 'Völkermarkt',
            bundesland: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/5/5b/AUT_V%C3%B6lkermarkt_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/AUT_V%C3%B6lkermarkt_COA.svg/200px-AUT_V%C3%B6lkermarkt_COA.svg.png'
            ]
        },
        'Waidhofen an der Ybbs': {
            name: 'Waidhofen an der Ybbs',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/ab/AUT_Waidhofen_an_der_Ybbs_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/AUT_Waidhofen_an_der_Ybbs_COA.svg/200px-AUT_Waidhofen_an_der_Ybbs_COA.svg.png'
            ]
        },
        'Wels': {
            name: 'Wels',
            bundesland: 'Oberösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/5/53/AUT_Wels_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/AUT_Wels_COA.svg/200px-AUT_Wels_COA.svg.png'
            ]
        },
        'Wiener Neustadt': {
            name: 'Wiener Neustadt',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/a9/AUT_Wiener_Neustadt_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/AUT_Wiener_Neustadt_COA.svg/200px-AUT_Wiener_Neustadt_COA.svg.png'
            ]
        },
        'Wolfsberg': {
            name: 'Wolfsberg',
            bundesland: 'Kärnten',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/a/ae/AUT_Wolfsberg_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/AUT_Wolfsberg_COA.svg/200px-AUT_Wolfsberg_COA.svg.png'
            ]
        },
        'Zell am See': {
            name: 'Zell am See',
            bundesland: 'Salzburg',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/2/2a/AUT_Zell_am_See_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/AUT_Zell_am_See_COA.svg/200px-AUT_Zell_am_See_COA.svg.png'
            ]
        },
        'Zwettl': {
            name: 'Zwettl',
            bundesland: 'Niederösterreich',
            wappen: [
                'https://upload.wikimedia.org/wikipedia/commons/d/d4/AUT_Zwettl_%28Stadt%29_COA.svg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/AUT_Zwettl_%28Stadt%29_COA.svg/200px-AUT_Zwettl_%28Stadt%29_COA.svg.png'
            ]
        }
    }
};

// Hilfsfunktionen
const coatsOfArmsHelpers = {
    /**
     * Lädt ein Wappen-Bild mit Fallback-Unterstützung
     * Probiert alle URLs im Array durch, bis eine funktioniert
     * @param {HTMLImageElement} imgElement - Das Bild-Element
     * @param {string[]} urls - Array von URLs zum Versuchen
     * @param {string} altText - Alternativer Text
     */
    loadImageWithFallback(imgElement, urls, altText = 'Wappen') {
        if (!Array.isArray(urls) || urls.length === 0) {
            imgElement.src = WAPPEN_PLACEHOLDER;
            imgElement.alt = altText + ' (nicht verfügbar)';
            return;
        }

        let currentIndex = 0;

        const tryNext = () => {
            if (currentIndex >= urls.length) {
                // Alle URLs fehlgeschlagen - versuche Wikipedia API als letztes
                this.loadFromWikipedia(imgElement, altText);
                return;
            }

            imgElement.src = urls[currentIndex];
            imgElement.alt = altText;
        };

        imgElement.onerror = () => {
            currentIndex++;
            tryNext();
        };

        tryNext();
    },

    /**
     * Lädt ein Wappen-Bild von der Wikipedia API
     * @param {HTMLImageElement} imgElement - Das Bild-Element
     * @param {string} searchTerm - Suchbegriff (z.B. "Wien Wappen")
     */
    async loadFromWikipedia(imgElement, searchTerm) {
        try {
            // Extrahiere den Namen aus dem alt-Text
            const name = searchTerm.replace('Wappen ', '').trim();
            const searchQuery = encodeURIComponent(`${name} Wappen`);
            
            // Wikipedia API für Bilder
            const response = await fetch(
                `https://de.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=200&origin=*`
            );
            
            if (response.ok) {
                const data = await response.json();
                const pages = data.query?.pages;
                if (pages) {
                    const page = Object.values(pages)[0];
                    if (page.thumbnail?.source) {
                        imgElement.src = page.thumbnail.source;
                        imgElement.alt = searchTerm;
                        return;
                    }
                }
            }
        } catch (e) {
            console.warn('Wikipedia API Fehler:', e);
        }
        
        // Fallback zum Placeholder
        imgElement.src = WAPPEN_PLACEHOLDER;
        imgElement.alt = searchTerm + ' (nicht verfügbar)';
    },

    /**
     * Gibt die erste verfügbare URL zurück (für einfache Verwendung)
     * @param {string|string[]} wappen - Wappen URL oder Array von URLs
     * @returns {string} Erste URL oder Placeholder
     */
    getWappenUrl(wappen) {
        if (Array.isArray(wappen)) {
            return wappen[0] || WAPPEN_PLACEHOLDER;
        }
        return wappen || WAPPEN_PLACEHOLDER;
    },

    /**
     * Gibt alle Wappen als flache Liste zurück
     */
    getAllCoatsOfArms() {
        const all = [];
        
        // Bundesländer
        Object.values(austrianCoatsOfArms.bundeslaender).forEach(item => {
            all.push({
                ...item,
                kategorie: 'Bundesland'
            });
        });
        
        // Landeshauptstädte (außer Wien, da bereits in Bundesländer)
        Object.entries(austrianCoatsOfArms.landeshauptstaedte).forEach(([key, item]) => {
            if (key !== 'Wien') {
                all.push({
                    ...item,
                    kategorie: 'Landeshauptstadt'
                });
            }
        });
        
        // Städte
        Object.values(austrianCoatsOfArms.staedte).forEach(item => {
            all.push({
                ...item,
                kategorie: 'Stadt'
            });
        });
        
        return all;
    },

    /**
     * Sucht ein Wappen nach Name
     */
    findByName(name) {
        // In Bundesländern suchen
        if (austrianCoatsOfArms.bundeslaender[name]) {
            return {
                ...austrianCoatsOfArms.bundeslaender[name],
                kategorie: 'Bundesland'
            };
        }
        
        // In Landeshauptstädten suchen
        if (austrianCoatsOfArms.landeshauptstaedte[name]) {
            return {
                ...austrianCoatsOfArms.landeshauptstaedte[name],
                kategorie: 'Landeshauptstadt'
            };
        }
        
        // In Städten suchen
        if (austrianCoatsOfArms.staedte[name]) {
            return {
                ...austrianCoatsOfArms.staedte[name],
                kategorie: 'Stadt'
            };
        }
        
        return null;
    },

    /**
     * Gibt alle Wappen eines Bundeslandes zurück
     */
    getByBundesland(bundesland) {
        const result = [];
        
        // Bundesland selbst
        if (austrianCoatsOfArms.bundeslaender[bundesland]) {
            result.push({
                ...austrianCoatsOfArms.bundeslaender[bundesland],
                kategorie: 'Bundesland'
            });
        }
        
        // Landeshauptstadt
        Object.values(austrianCoatsOfArms.landeshauptstaedte).forEach(item => {
            if (item.bundesland === bundesland) {
                result.push({
                    ...item,
                    kategorie: 'Landeshauptstadt'
                });
            }
        });
        
        // Städte
        Object.values(austrianCoatsOfArms.staedte).forEach(item => {
            if (item.bundesland === bundesland) {
                result.push({
                    ...item,
                    kategorie: 'Stadt'
                });
            }
        });
        
        return result;
    },

    /**
     * Gibt Statistiken zurück
     */
    getStatistics() {
        return {
            bundeslaender: Object.keys(austrianCoatsOfArms.bundeslaender).length,
            landeshauptstaedte: Object.keys(austrianCoatsOfArms.landeshauptstaedte).length,
            staedte: Object.keys(austrianCoatsOfArms.staedte).length,
            gesamt: Object.keys(austrianCoatsOfArms.bundeslaender).length + 
                    Object.keys(austrianCoatsOfArms.landeshauptstaedte).length - 1 + // -1 weil Wien doppelt
                    Object.keys(austrianCoatsOfArms.staedte).length
        };
    },

    /**
     * Testet asynchron, ob alle Wappen-URLs erreichbar sind
     */
    async validateAllUrls() {
        const all = this.getAllCoatsOfArms();
        const results = {
            valid: [],
            invalid: [],
            total: all.length
        };

        for (const item of all) {
            const urls = Array.isArray(item.wappen) ? item.wappen : [item.wappen];
            let isValid = false;

            for (const url of urls) {
                try {
                    const response = await fetch(url, { method: 'HEAD' });
                    if (response.ok) {
                        isValid = true;
                        break;
                    }
                } catch (error) {
                    // Weiter zur nächsten URL
                }
            }

            if (isValid) {
                results.valid.push(item.name);
            } else {
                results.invalid.push({ name: item.name, urls });
            }
        }

        return results;
    }
};

// Export für Verwendung in anderen Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { austrianCoatsOfArms, coatsOfArmsHelpers, WAPPEN_PLACEHOLDER };
}
