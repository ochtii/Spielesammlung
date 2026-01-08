/**
 * Österreichische Wappen - Bundesländer und Städte
 * Alle Wappen-URLs von Wikimedia Commons
 */

const austrianCoatsOfArms = {
    // Bundesländer (9)
    bundeslaender: {
        'Wien': {
            name: 'Wien',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Wien_Wappen.svg/300px-Wien_Wappen.svg.png',
            typ: 'Bundesland & Landeshauptstadt'
        },
        'Niederösterreich': {
            name: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coat_of_arms_of_Lower_Austria.svg/300px-Coat_of_arms_of_Lower_Austria.svg.png',
            typ: 'Bundesland'
        },
        'Oberösterreich': {
            name: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Coat_of_arms_of_Upper_Austria.svg/300px-Coat_of_arms_of_Upper_Austria.svg.png',
            typ: 'Bundesland'
        },
        'Steiermark': {
            name: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Coat_of_arms_of_Styria.svg/300px-Coat_of_arms_of_Styria.svg.png',
            typ: 'Bundesland'
        },
        'Kärnten': {
            name: 'Kärnten',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Coat_of_arms_of_Carinthia.svg/300px-Coat_of_arms_of_Carinthia.svg.png',
            typ: 'Bundesland'
        },
        'Salzburg': {
            name: 'Salzburg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Coat_of_arms_of_Salzburg.svg/300px-Coat_of_arms_of_Salzburg.svg.png',
            typ: 'Bundesland'
        },
        'Tirol': {
            name: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Coat_of_arms_of_Tyrol.svg/300px-Coat_of_arms_of_Tyrol.svg.png',
            typ: 'Bundesland'
        },
        'Vorarlberg': {
            name: 'Vorarlberg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Coat_of_arms_of_Vorarlberg.svg/300px-Coat_of_arms_of_Vorarlberg.svg.png',
            typ: 'Bundesland'
        },
        'Burgenland': {
            name: 'Burgenland',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Coat_of_arms_of_Burgenland.svg/300px-Coat_of_arms_of_Burgenland.svg.png',
            typ: 'Bundesland'
        }
    },

    // Landeshauptstädte (9)
    landeshauptstaedte: {
        'Wien': {
            name: 'Wien',
            bundesland: 'Wien',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Wien_Wappen.svg/300px-Wien_Wappen.svg.png'
        },
        'St. Pölten': {
            name: 'St. Pölten',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/AUT_Sankt_P%C3%B6lten_COA.svg/300px-AUT_Sankt_P%C3%B6lten_COA.svg.png'
        },
        'Linz': {
            name: 'Linz',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Linz_Wappen.svg/300px-Linz_Wappen.svg.png'
        },
        'Graz': {
            name: 'Graz',
            bundesland: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AUT_Graz_COA.svg/300px-AUT_Graz_COA.svg.png'
        },
        'Klagenfurt': {
            name: 'Klagenfurt',
            bundesland: 'Kärnten',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/AUT_Klagenfurt_COA.svg/300px-AUT_Klagenfurt_COA.svg.png'
        },
        'Salzburg': {
            name: 'Salzburg',
            bundesland: 'Salzburg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/AUT_Salzburg_COA.svg/300px-AUT_Salzburg_COA.svg.png'
        },
        'Innsbruck': {
            name: 'Innsbruck',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AUT_Innsbruck_COA.svg/300px-AUT_Innsbruck_COA.svg.png'
        },
        'Bregenz': {
            name: 'Bregenz',
            bundesland: 'Vorarlberg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/AUT_Bregenz_COA.svg/300px-AUT_Bregenz_COA.svg.png'
        },
        'Eisenstadt': {
            name: 'Eisenstadt',
            bundesland: 'Burgenland',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/AUT_Eisenstadt_COA.svg/300px-AUT_Eisenstadt_COA.svg.png'
        }
    },

    // Wichtige Städte Österreichs (alphabetisch)
    staedte: {
        'Amstetten': {
            name: 'Amstetten',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/AUT_Amstetten_COA.svg/300px-AUT_Amstetten_COA.svg.png'
        },
        'Baden': {
            name: 'Baden',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AUT_Baden_COA.svg/300px-AUT_Baden_COA.svg.png'
        },
        'Bad Ischl': {
            name: 'Bad Ischl',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AUT_Bad_Ischl_COA.svg/300px-AUT_Bad_Ischl_COA.svg.png'
        },
        'Bruck an der Mur': {
            name: 'Bruck an der Mur',
            bundesland: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/AUT_Bruck_an_der_Mur_COA.svg/300px-AUT_Bruck_an_der_Mur_COA.svg.png'
        },
        'Dornbirn': {
            name: 'Dornbirn',
            bundesland: 'Vorarlberg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/AUT_Dornbirn_COA.svg/300px-AUT_Dornbirn_COA.svg.png'
        },
        'Feldkirch': {
            name: 'Feldkirch',
            bundesland: 'Vorarlberg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/AUT_Feldkirch_COA.svg/300px-AUT_Feldkirch_COA.svg.png'
        },
        'Gmunden': {
            name: 'Gmunden',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/AUT_Gmunden_COA.svg/300px-AUT_Gmunden_COA.svg.png'
        },
        'Hall in Tirol': {
            name: 'Hall in Tirol',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/AUT_Hall_in_Tirol_COA.svg/300px-AUT_Hall_in_Tirol_COA.svg.png'
        },
        'Hallein': {
            name: 'Hallein',
            bundesland: 'Salzburg',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/AUT_Hallein_COA.svg/300px-AUT_Hallein_COA.svg.png'
        },
        'Kapfenberg': {
            name: 'Kapfenberg',
            bundesland: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/AUT_Kapfenberg_COA.svg/300px-AUT_Kapfenberg_COA.svg.png'
        },
        'Kitzbühel': {
            name: 'Kitzbühel',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AUT_Kitzb%C3%BChel_COA.svg/300px-AUT_Kitzb%C3%BChel_COA.svg.png'
        },
        'Klosterneuburg': {
            name: 'Klosterneuburg',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/AUT_Klosterneuburg_COA.svg/300px-AUT_Klosterneuburg_COA.svg.png'
        },
        'Krems': {
            name: 'Krems',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/AUT_Krems_an_der_Donau_COA.svg/300px-AUT_Krems_an_der_Donau_COA.svg.png'
        },
        'Kufstein': {
            name: 'Kufstein',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/AUT_Kufstein_COA.svg/300px-AUT_Kufstein_COA.svg.png'
        },
        'Leibnitz': {
            name: 'Leibnitz',
            bundesland: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/AUT_Leibnitz_COA.svg/300px-AUT_Leibnitz_COA.svg.png'
        },
        'Leoben': {
            name: 'Leoben',
            bundesland: 'Steiermark',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/AUT_Leoben_COA.svg/300px-AUT_Leoben_COA.svg.png'
        },
        'Lienz': {
            name: 'Lienz',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AUT_Lienz_COA.svg/300px-AUT_Lienz_COA.svg.png'
        },
        'Mattersburg': {
            name: 'Mattersburg',
            bundesland: 'Burgenland',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/AUT_Mattersburg_COA.svg/300px-AUT_Mattersburg_COA.svg.png'
        },
        'Mödling': {
            name: 'Mödling',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/AUT_M%C3%B6dling_COA.svg/300px-AUT_M%C3%B6dling_COA.svg.png'
        },
        'Neunkirchen': {
            name: 'Neunkirchen',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/AUT_Neunkirchen_%28N%C3%96%29_COA.svg/300px-AUT_Neunkirchen_%28N%C3%96%29_COA.svg.png'
        },
        'Oberwart': {
            name: 'Oberwart',
            bundesland: 'Burgenland',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/AUT_Oberwart_COA.svg/300px-AUT_Oberwart_COA.svg.png'
        },
        'Ried im Innkreis': {
            name: 'Ried im Innkreis',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/AUT_Ried_im_Innkreis_COA.svg/300px-AUT_Ried_im_Innkreis_COA.svg.png'
        },
        'Rust': {
            name: 'Rust',
            bundesland: 'Burgenland',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/AUT_Rust_%28Burgenland%29_COA.svg/300px-AUT_Rust_%28Burgenland%29_COA.svg.png'
        },
        'Schwaz': {
            name: 'Schwaz',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/AUT_Schwaz_COA.svg/300px-AUT_Schwaz_COA.svg.png'
        },
        'Steyr': {
            name: 'Steyr',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/AUT_Steyr_COA.svg/300px-AUT_Steyr_COA.svg.png'
        },
        'Stockerau': {
            name: 'Stockerau',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/AUT_Stockerau_COA.svg/300px-AUT_Stockerau_COA.svg.png'
        },
        'Telfs': {
            name: 'Telfs',
            bundesland: 'Tirol',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/AUT_Telfs_COA.svg/300px-AUT_Telfs_COA.svg.png'
        },
        'Traun': {
            name: 'Traun',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/AUT_Traun_COA.svg/300px-AUT_Traun_COA.svg.png'
        },
        'Tulln': {
            name: 'Tulln',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/AUT_Tulln_an_der_Donau_COA.svg/300px-AUT_Tulln_an_der_Donau_COA.svg.png'
        },
        'Villach': {
            name: 'Villach',
            bundesland: 'Kärnten',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/AUT_Villach_COA.svg/300px-AUT_Villach_COA.svg.png'
        },
        'Völkermarkt': {
            name: 'Völkermarkt',
            bundesland: 'Kärnten',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/AUT_V%C3%B6lkermarkt_COA.svg/300px-AUT_V%C3%B6lkermarkt_COA.svg.png'
        },
        'Waidhofen an der Ybbs': {
            name: 'Waidhofen an der Ybbs',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/AUT_Waidhofen_an_der_Ybbs_COA.svg/300px-AUT_Waidhofen_an_der_Ybbs_COA.svg.png'
        },
        'Wels': {
            name: 'Wels',
            bundesland: 'Oberösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/AUT_Wels_COA.svg/300px-AUT_Wels_COA.svg.png'
        },
        'Wiener Neustadt': {
            name: 'Wiener Neustadt',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/AUT_Wiener_Neustadt_COA.svg/300px-AUT_Wiener_Neustadt_COA.svg.png'
        },
        'Wolfsberg': {
            name: 'Wolfsberg',
            bundesland: 'Kärnten',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/AUT_Wolfsberg_COA.svg/300px-AUT_Wolfsberg_COA.svg.png'
        },
        'Zwettl': {
            name: 'Zwettl',
            bundesland: 'Niederösterreich',
            wappen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/AUT_Zwettl_%28Stadt%29_COA.svg/300px-AUT_Zwettl_%28Stadt%29_COA.svg.png'
        }
    }
};

// Hilfsfunktionen
const coatsOfArmsHelpers = {
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
     * Testet, ob alle Wappen-URLs erreichbar sind
     */
    async validateAllUrls() {
        const all = this.getAllCoatsOfArms();
        const results = {
            valid: [],
            invalid: [],
            total: all.length
        };

        for (const item of all) {
            try {
                const response = await fetch(item.wappen, { method: 'HEAD' });
                if (response.ok) {
                    results.valid.push(item.name);
                } else {
                    results.invalid.push({ name: item.name, status: response.status });
                }
            } catch (error) {
                results.invalid.push({ name: item.name, error: error.message });
            }
        }

        return results;
    }
};

// Export für Verwendung in anderen Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { austrianCoatsOfArms, coatsOfArmsHelpers };
}
