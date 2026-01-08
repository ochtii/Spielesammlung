/**
 * Game Data: Austrian Districts (KFZ-Kennzeichen)
 */
const DistrictData = [
    // Burgenland
    { code: 'E', name: 'Eisenstadt', state: 'Burgenland' },
    { code: 'EU', name: 'Eisenstadt-Umgebung', state: 'Burgenland' },
    { code: 'GS', name: 'Güssing', state: 'Burgenland' },
    { code: 'JE', name: 'Jennersdorf', state: 'Burgenland' },
    { code: 'MA', name: 'Mattersburg', state: 'Burgenland' },
    { code: 'ND', name: 'Neusiedl am See', state: 'Burgenland' },
    { code: 'OP', name: 'Oberpullendorf', state: 'Burgenland' },
    { code: 'OW', name: 'Oberwart', state: 'Burgenland' },
    
    // Kärnten
    { code: 'K', name: 'Klagenfurt', state: 'Kärnten' },
    { code: 'VI', name: 'Villach', state: 'Kärnten' },
    { code: 'SP', name: 'Spittal an der Drau', state: 'Kärnten' },
    { code: 'HE', name: 'Hermagor', state: 'Kärnten' },
    { code: 'FE', name: 'Feldkirchen', state: 'Kärnten' },
    { code: 'SV', name: 'Sankt Veit an der Glan', state: 'Kärnten' },
    { code: 'VK', name: 'Völkermarkt', state: 'Kärnten' },
    { code: 'WO', name: 'Wolfsberg', state: 'Kärnten' },
    
    // Niederösterreich
    { code: 'AM', name: 'Amstetten', state: 'Niederösterreich' },
    { code: 'BN', name: 'Baden', state: 'Niederösterreich' },
    { code: 'BL', name: 'Bruck an der Leitha', state: 'Niederösterreich' },
    { code: 'GD', name: 'Gmünd', state: 'Niederösterreich' },
    { code: 'GF', name: 'Gänserndorf', state: 'Niederösterreich' },
    { code: 'HL', name: 'Hollabrunn', state: 'Niederösterreich' },
    { code: 'HO', name: 'Horn', state: 'Niederösterreich' },
    { code: 'KR', name: 'Krems', state: 'Niederösterreich' },
    { code: 'KO', name: 'Korneuburg', state: 'Niederösterreich' },
    { code: 'LF', name: 'Lilienfeld', state: 'Niederösterreich' },
    { code: 'ME', name: 'Melk', state: 'Niederösterreich' },
    { code: 'MI', name: 'Mistelbach', state: 'Niederösterreich' },
    { code: 'MD', name: 'Mödling', state: 'Niederösterreich' },
    { code: 'NK', name: 'Neunkirchen', state: 'Niederösterreich' },
    { code: 'P', name: 'Sankt Pölten', state: 'Niederösterreich' },
    { code: 'PL', name: 'Sankt Pölten-Land', state: 'Niederösterreich' },
    { code: 'SB', name: 'Scheibbs', state: 'Niederösterreich' },
    { code: 'TU', name: 'Tulln', state: 'Niederösterreich' },
    { code: 'WB', name: 'Wiener Neustadt', state: 'Niederösterreich' },
    { code: 'WT', name: 'Waidhofen an der Thaya', state: 'Niederösterreich' },
    { code: 'ZT', name: 'Zwettl', state: 'Niederösterreich' },
    
    // Oberösterreich
    { code: 'BR', name: 'Braunau am Inn', state: 'Oberösterreich' },
    { code: 'EF', name: 'Eferding', state: 'Oberösterreich' },
    { code: 'FR', name: 'Freistadt', state: 'Oberösterreich' },
    { code: 'GM', name: 'Gmunden', state: 'Oberösterreich' },
    { code: 'GR', name: 'Grieskirchen', state: 'Oberösterreich' },
    { code: 'KI', name: 'Kirchdorf', state: 'Oberösterreich' },
    { code: 'L', name: 'Linz', state: 'Oberösterreich' },
    { code: 'LL', name: 'Linz-Land', state: 'Oberösterreich' },
    { code: 'PE', name: 'Perg', state: 'Oberösterreich' },
    { code: 'RI', name: 'Ried im Innkreis', state: 'Oberösterreich' },
    { code: 'RO', name: 'Rohrbach', state: 'Oberösterreich' },
    { code: 'SD', name: 'Schärding', state: 'Oberösterreich' },
    { code: 'SE', name: 'Steyr-Land', state: 'Oberösterreich' },
    { code: 'SR', name: 'Steyr', state: 'Oberösterreich' },
    { code: 'UU', name: 'Urfahr-Umgebung', state: 'Oberösterreich' },
    { code: 'VB', name: 'Vöcklabruck', state: 'Oberösterreich' },
    { code: 'WE', name: 'Wels', state: 'Oberösterreich' },
    { code: 'WL', name: 'Wels-Land', state: 'Oberösterreich' },
    
    // Salzburg
    { code: 'S', name: 'Salzburg', state: 'Salzburg' },
    { code: 'HA', name: 'Hallein', state: 'Salzburg' },
    { code: 'JO', name: 'Sankt Johann im Pongau', state: 'Salzburg' },
    { code: 'TA', name: 'Tamsweg', state: 'Salzburg' },
    { code: 'ZE', name: 'Zell am See', state: 'Salzburg' },
    
    // Steiermark
    { code: 'G', name: 'Graz', state: 'Steiermark' },
    { code: 'GU', name: 'Graz-Umgebung', state: 'Steiermark' },
    { code: 'BM', name: 'Bruck-Mürzzuschlag', state: 'Steiermark' },
    { code: 'DL', name: 'Deutschlandsberg', state: 'Steiermark' },
    { code: 'FF', name: 'Feldbach', state: 'Steiermark' },
    { code: 'HB', name: 'Hartberg-Fürstenfeld', state: 'Steiermark' },
    { code: 'LB', name: 'Leibnitz', state: 'Steiermark' },
    { code: 'LN', name: 'Leoben', state: 'Steiermark' },
    { code: 'LI', name: 'Liezen', state: 'Steiermark' },
    { code: 'MU', name: 'Murau', state: 'Steiermark' },
    { code: 'MT', name: 'Murtal', state: 'Steiermark' },
    { code: 'VO', name: 'Voitsberg', state: 'Steiermark' },
    { code: 'WZ', name: 'Weiz', state: 'Steiermark' },
    
    // Tirol
    { code: 'I', name: 'Innsbruck', state: 'Tirol' },
    { code: 'IL', name: 'Innsbruck-Land', state: 'Tirol' },
    { code: 'IM', name: 'Imst', state: 'Tirol' },
    { code: 'KB', name: 'Kitzbühel', state: 'Tirol' },
    { code: 'KU', name: 'Kufstein', state: 'Tirol' },
    { code: 'LA', name: 'Landeck', state: 'Tirol' },
    { code: 'LZ', name: 'Lienz', state: 'Tirol' },
    { code: 'RE', name: 'Reutte', state: 'Tirol' },
    { code: 'SZ', name: 'Schwaz', state: 'Tirol' },
    
    // Vorarlberg
    { code: 'B', name: 'Bregenz', state: 'Vorarlberg' },
    { code: 'DO', name: 'Dornbirn', state: 'Vorarlberg' },
    { code: 'FK', name: 'Feldkirch', state: 'Vorarlberg' },
    { code: 'BZ', name: 'Bludenz', state: 'Vorarlberg' },
    
    // Wien
    { code: 'W', name: 'Wien', state: 'Wien' }
];

/**
 * Game Data: Austrian State Capitals
 */
const StateCapitals = [
    { state: 'Burgenland', capital: 'Eisenstadt' },
    { state: 'Kärnten', capital: 'Klagenfurt' },
    { state: 'Niederösterreich', capital: 'St. Pölten' },
    { state: 'Oberösterreich', capital: 'Linz' },
    { state: 'Salzburg', capital: 'Salzburg' },
    { state: 'Steiermark', capital: 'Graz' },
    { state: 'Tirol', capital: 'Innsbruck' },
    { state: 'Vorarlberg', capital: 'Bregenz' },
    { state: 'Wien', capital: 'Wien' }
];
