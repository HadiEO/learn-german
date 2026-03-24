(function () {
  function noun(german, plural, meaningEn, meaningBn, level, category) {
    return {
      german,
      plural,
      pronunciationEn: buildPronunciationEn(german),
      pronunciationBn: buildPronunciationBn(german),
      meaningEn,
      meaningBn,
      exampleDe: `Wir sprechen heute über ${toAccusativePhrase(german)}.`,
      exampleEn: `We are talking about ${meaningEn} today.`,
      level,
      category
    };
  }

  function verb(german, meaningEn, meaningBn, level, category) {
    return {
      german,
      pronunciationEn: buildPronunciationEn(german),
      pronunciationBn: buildPronunciationBn(german),
      meaningEn,
      meaningBn,
      exampleDe: `Wir wollen heute ${german}.`,
      exampleEn: `We want to ${meaningEn} today.`,
      level,
      category
    };
  }

  function adjective(german, meaningEn, meaningBn, level, category) {
    return {
      german,
      pronunciationEn: buildPronunciationEn(german),
      pronunciationBn: buildPronunciationBn(german),
      meaningEn,
      meaningBn,
      exampleDe: `Das ist heute sehr ${german}.`,
      exampleEn: `That is very ${meaningEn} today.`,
      level,
      category
    };
  }

  function toAccusativePhrase(german) {
    if (german.startsWith("der ")) {
      return german.replace("der ", "den ");
    }

    return german;
  }

  function buildPronunciationEn(text) {
    let value = text.toLowerCase();

    value = value
      .replace(/tsch/g, "ch")
      .replace(/sch/g, "sh")
      .replace(/(^| )sp/g, "$1shp")
      .replace(/(^| )st/g, "$1sht")
      .replace(/äu/g, "oy")
      .replace(/eu/g, "oy")
      .replace(/ei/g, "eye")
      .replace(/ie/g, "ee")
      .replace(/au/g, "ow")
      .replace(/ph/g, "f")
      .replace(/qu/g, "kv")
      .replace(/ch/g, "kh")
      .replace(/z/g, "ts")
      .replace(/w/g, "v")
      .replace(/j/g, "y")
      .replace(/v/g, "f")
      .replace(/ß/g, "ss")
      .replace(/ä/g, "eh")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue");

    return value.replace(/\s+/g, " ").trim();
  }

  function buildPronunciationBn(text) {
    let value = text.toLowerCase();

    value = value
      .replace(/tsch/g, "চ")
      .replace(/sch/g, "শ")
      .replace(/(^| )sp/g, "$1শ্প")
      .replace(/(^| )st/g, "$1শ্ট")
      .replace(/äu/g, "য়")
      .replace(/eu/g, "য়")
      .replace(/ei/g, "আই")
      .replace(/ie/g, "ই")
      .replace(/au/g, "আউ")
      .replace(/ph/g, "ফ")
      .replace(/qu/g, "কভ")
      .replace(/ch/g, "খ")
      .replace(/z/g, "ৎস")
      .replace(/w/g, "ভ")
      .replace(/j/g, "ইয়")
      .replace(/v/g, "ফ")
      .replace(/ß/g, "স")
      .replace(/ä/g, "এ")
      .replace(/ö/g, "ও")
      .replace(/ü/g, "উ");

    const charMap = {
      a: "আ",
      b: "ব",
      c: "ক",
      d: "ড",
      e: "এ",
      f: "ফ",
      g: "গ",
      h: "হ",
      i: "ই",
      k: "ক",
      l: "ল",
      m: "ম",
      n: "ন",
      o: "ও",
      p: "প",
      r: "র",
      s: "স",
      t: "ট",
      u: "উ",
      y: "ই",
      " ": " ",
      "-": "-"
    };

    return Array.from(value)
      .map((char) => charMap[char] || char)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  }

  window.extraVocabularyData = [
    noun("der Arzt", "die Ärzte", "doctor", "ডাক্তার", "A2", "Health"),
    noun("die Ärztin", "die Ärztinnen", "female doctor", "মহিলা ডাক্তার", "B1", "Health"),
    noun("das Krankenhaus", "die Krankenhäuser", "hospital", "হাসপাতাল", "A2", "Health"),
    noun("die Apotheke", "die Apotheken", "pharmacy", "ফার্মেসি", "A2", "Health"),
    noun("das Medikament", "die Medikamente", "medicine", "ওষুধ", "A2", "Health"),
    noun("der Termin", "die Termine", "appointment", "সাক্ষাতের সময়", "A2", "Health"),
    verb("untersuchen", "examine", "পরীক্ষা করা", "B1", "Health"),
    verb("heilen", "heal", "সুস্থ করা", "B1", "Health"),
    verb("husten", "cough", "কাশি দেওয়া", "A2", "Health"),
    verb("atmen", "breathe", "শ্বাস নেওয়া", "A2", "Health"),
    verb("pflegen", "care for", "যত্ন নেওয়া", "B1", "Health"),
    verb("verletzen", "injure", "আঘাত করা", "B1", "Health"),
    adjective("krank", "sick", "অসুস্থ", "A2", "Health"),
    adjective("gesund", "healthy", "সুস্থ", "A2", "Health"),
    adjective("müde", "tired", "ক্লান্ত", "A2", "Health"),
    adjective("fit", "fit", "সুস্থ-সবল", "A2", "Health"),

    noun("die Arbeit", "die Arbeiten", "work", "কাজ", "A2", "Work"),
    noun("der Chef", "die Chefs", "boss", "বস", "A2", "Work"),
    noun("die Kollegin", "die Kolleginnen", "female colleague", "সহকর্মী", "B1", "Work"),
    noun("das Büro", "die Büros", "office", "অফিস", "A2", "Work"),
    noun("die Pause", "die Pausen", "break", "বিরতি", "A2", "Work"),
    noun("die Besprechung", "die Besprechungen", "meeting", "বৈঠক", "B1", "Work"),
    verb("planen", "plan", "পরিকল্পনা করা", "A2", "Work"),
    verb("organisieren", "organize", "সংগঠিত করা", "B1", "Work"),
    verb("verdienen", "earn", "উপার্জন করা", "B1", "Work"),
    verb("besprechen", "discuss", "আলোচনা করা", "B1", "Work"),
    verb("schicken", "send", "পাঠানো", "A2", "Work"),
    verb("erledigen", "complete", "শেষ করা", "B1", "Work"),
    adjective("beschäftigt", "busy", "ব্যস্ত", "A2", "Work"),
    adjective("pünktlich", "punctual", "সময়নিষ্ঠ", "A2", "Work"),
    adjective("offiziell", "official", "আনুষ্ঠানিক", "B1", "Work"),
    adjective("praktisch", "practical", "ব্যবহারিক", "A2", "Work"),

    noun("der Laden", "die Läden", "shop", "দোকান", "A2", "Shopping"),
    noun("der Preis", "die Preise", "price", "দাম", "A2", "Shopping"),
    noun("das Geschäft", "die Geschäfte", "store", "দোকান", "A2", "Shopping"),
    noun("die Kasse", "die Kassen", "checkout", "কাউন্টার", "A2", "Shopping"),
    noun("das Angebot", "die Angebote", "offer", "প্রস্তাব বা ছাড়", "A2", "Shopping"),
    noun("die Größe", "die Größen", "size", "মাপ", "A2", "Shopping"),
    verb("bezahlen", "pay", "পরিশোধ করা", "A2", "Shopping"),
    verb("umtauschen", "exchange", "বদলানো", "B1", "Shopping"),
    verb("bestellen", "order", "অর্ডার করা", "A2", "Shopping"),
    verb("sparen", "save money", "সঞ্চয় করা", "A2", "Shopping"),
    verb("wählen", "choose", "বেছে নেওয়া", "A2", "Shopping"),
    verb("anprobieren", "try on", "পরে দেখা", "B1", "Shopping"),
    adjective("billig", "cheap", "সস্তা", "A2", "Shopping"),
    adjective("teuer", "expensive", "দামী", "A2", "Shopping"),
    adjective("passend", "suitable", "মানানসই", "B1", "Shopping"),
    adjective("verfügbar", "available", "উপলব্ধ", "B1", "Shopping"),

    noun("der Park", "die Parks", "park", "পার্ক", "A2", "City"),
    noun("das Museum", "die Museen", "museum", "জাদুঘর", "A2", "City"),
    noun("die Brücke", "die Brücken", "bridge", "সেতু", "A2", "City"),
    noun("der Platz", "die Plätze", "square", "চত্বর", "A2", "City"),
    noun("die Ampel", "die Ampeln", "traffic light", "ট্রাফিক সিগন্যাল", "A2", "City"),
    noun("der Markt", "die Märkte", "market", "বাজার", "A2", "City"),
    verb("überqueren", "cross", "অতিক্রম করা", "B1", "City"),
    verb("warten", "wait", "অপেক্ষা করা", "A2", "City"),
    verb("einsteigen", "get in", "ওঠা", "A2", "City"),
    verb("aussteigen", "get out", "নামা", "A2", "City"),
    verb("entdecken", "discover", "আবিষ্কার করা", "B1", "City"),
    verb("folgen", "follow", "অনুসরণ করা", "A2", "City"),
    adjective("laut", "loud", "জোরে", "A2", "City"),
    adjective("leise", "quiet", "নিচুস্বরে", "A2", "City"),
    adjective("sicher", "safe", "নিরাপদ", "A2", "City"),
    adjective("zentral", "central", "কেন্দ্রীয়", "B1", "City"),

    noun("der Sturm", "die Stürme", "storm", "ঝড়", "A2", "Weather"),
    noun("die Wolke", "die Wolken", "cloud", "মেঘ", "A2", "Weather"),
    noun("die Temperatur", "die Temperaturen", "temperature", "তাপমাত্রা", "A2", "Weather"),
    noun("die Jahreszeit", "die Jahreszeiten", "season", "ঋতু", "A2", "Weather"),
    noun("das Klima", "die Klimate", "climate", "জলবায়ু", "B1", "Weather"),
    noun("der Himmel", "die Himmel", "sky", "আকাশ", "A2", "Weather"),
    verb("regnen", "rain", "বৃষ্টি হওয়া", "A2", "Weather"),
    verb("schneien", "snow", "তুষার পড়া", "A2", "Weather"),
    verb("frieren", "freeze", "ঠান্ডায় কাঁপা", "A2", "Weather"),
    verb("scheinen", "shine", "আলো দেওয়া", "A2", "Weather"),
    verb("wehen", "blow", "বইতে থাকা", "A2", "Weather"),
    verb("steigen", "rise", "বাড়া", "B1", "Weather"),
    adjective("warm", "warm", "উষ্ণ", "A2", "Weather"),
    adjective("kalt", "cold", "ঠান্ডা", "A2", "Weather"),
    adjective("sonnig", "sunny", "রৌদ্রোজ্জ্বল", "A2", "Weather"),
    adjective("bewölkt", "cloudy", "মেঘলা", "B1", "Weather"),

    noun("der Baum", "die Bäume", "tree", "গাছ", "A2", "Nature"),
    noun("die Blume", "die Blumen", "flower", "ফুল", "A2", "Nature"),
    noun("der Fluss", "die Flüsse", "river", "নদী", "A2", "Nature"),
    noun("der Berg", "die Berge", "mountain", "পাহাড়", "A2", "Nature"),
    noun("der Wald", "die Wälder", "forest", "বন", "A2", "Nature"),
    noun("das Meer", "die Meere", "sea", "সমুদ্র", "A2", "Nature"),
    verb("wachsen", "grow", "বেড়ে ওঠা", "A2", "Nature"),
    verb("blühen", "bloom", "ফোটা", "B1", "Nature"),
    verb("schützen", "protect", "রক্ষা করা", "B1", "Nature"),
    verb("sammeln", "collect", "সংগ্রহ করা", "A2", "Nature"),
    verb("wandern", "hike", "হেঁটে ভ্রমণ করা", "B1", "Nature"),
    verb("pflanzen", "plant", "রোপণ করা", "A2", "Nature"),
    adjective("grün", "green", "সবুজ", "A2", "Nature"),
    adjective("tief", "deep", "গভীর", "B1", "Nature"),
    adjective("trocken", "dry", "শুকনো", "A2", "Nature"),
    adjective("wild", "wild", "বন্য", "A2", "Nature"),

    noun("die Angst", "die Ängste", "fear", "ভয়", "A2", "Feelings"),
    noun("die Freude", "die Freuden", "joy", "আনন্দ", "A2", "Feelings"),
    noun("die Hoffnung", "die Hoffnungen", "hope", "আশা", "A2", "Feelings"),
    noun("das Gefühl", "die Gefühle", "feeling", "অনুভূতি", "A2", "Feelings"),
    noun("die Laune", "die Launen", "mood", "মেজাজ", "B1", "Feelings"),
    noun("die Erinnerung", "die Erinnerungen", "memory", "স্মৃতি", "B1", "Feelings"),
    verb("lächeln", "smile", "হাসিমুখে থাকা", "A2", "Feelings"),
    verb("hoffen", "hope", "আশা করা", "A2", "Feelings"),
    verb("vermissen", "miss", "মিস করা", "B1", "Feelings"),
    verb("ärgern", "annoy", "বিরক্ত করা", "B1", "Feelings"),
    verb("genießen", "enjoy", "উপভোগ করা", "A2", "Feelings"),
    verb("entspannen", "relax", "আরাম করা", "A2", "Feelings"),
    adjective("glücklich", "happy", "সুখী", "A2", "Feelings"),
    adjective("traurig", "sad", "দুঃখিত", "A2", "Feelings"),
    adjective("nervös", "nervous", "নার্ভাস", "A2", "Feelings"),
    adjective("zufrieden", "satisfied", "সন্তুষ্ট", "B1", "Feelings"),

    noun("der Computer", "die Computer", "computer", "কম্পিউটার", "A2", "Technology"),
    noun("das Handy", "die Handys", "mobile phone", "মোবাইল ফোন", "A2", "Technology"),
    noun("die Nachricht", "die Nachrichten", "message", "বার্তা", "A2", "Technology"),
    noun("das Passwort", "die Passwörter", "password", "পাসওয়ার্ড", "B1", "Technology"),
    noun("die Datei", "die Dateien", "file", "ফাইল", "B1", "Technology"),
    noun("die Webseite", "die Webseiten", "website", "ওয়েবসাইট", "B1", "Technology"),
    verb("klicken", "click", "ক্লিক করা", "A2", "Technology"),
    verb("speichern", "save", "সংরক্ষণ করা", "A2", "Technology"),
    verb("löschen", "delete", "মুছে ফেলা", "A2", "Technology"),
    verb("herunterladen", "download", "ডাউনলোড করা", "A2", "Technology"),
    verb("hochladen", "upload", "আপলোড করা", "B1", "Technology"),
    verb("suchen", "search", "খোঁজা", "A2", "Technology"),
    adjective("digital", "digital", "ডিজিটাল", "A2", "Technology"),
    adjective("online", "online", "অনলাইন", "A2", "Technology"),
    adjective("langsam", "slow", "ধীর", "A2", "Technology"),
    adjective("modern", "modern", "আধুনিক", "A2", "Technology"),

    noun("das Hobby", "die Hobbys", "hobby", "শখ", "A2", "Leisure"),
    noun("das Spiel", "die Spiele", "game", "খেলা", "A2", "Leisure"),
    noun("das Konzert", "die Konzerte", "concert", "কনসার্ট", "A2", "Leisure"),
    noun("der Film", "die Filme", "film", "সিনেমা", "A2", "Leisure"),
    noun("das Foto", "die Fotos", "photo", "ছবি", "A2", "Leisure"),
    noun("der Sport", "die Sportarten", "sport", "খেলাধুলা", "A2", "Leisure"),
    verb("tanzen", "dance", "নাচা", "A2", "Leisure"),
    verb("zeichnen", "draw", "আঁকা", "A2", "Leisure"),
    verb("fotografieren", "photograph", "ছবি তোলা", "B1", "Leisure"),
    verb("spielen", "play", "খেলা", "A2", "Leisure"),
    verb("üben", "practice", "অনুশীলন করা", "A2", "Leisure"),
    verb("reisen", "travel", "ভ্রমণ করা", "A2", "Leisure"),
    adjective("interessant", "interesting", "আকর্ষণীয়", "A2", "Leisure"),
    adjective("langweilig", "boring", "বিরক্তিকর", "A2", "Leisure"),
    adjective("kreativ", "creative", "সৃজনশীল", "B1", "Leisure"),
    adjective("beliebt", "popular", "জনপ্রিয়", "B1", "Leisure"),

    noun("die Bank", "die Banken", "bank", "ব্যাংক", "A2", "Services"),
    noun("das Formular", "die Formulare", "form", "ফরম", "A2", "Services"),
    noun("der Brief", "die Briefe", "letter", "চিঠি", "A2", "Services"),
    noun("das Paket", "die Pakete", "package", "পার্সেল", "A2", "Services"),
    noun("das Amt", "die Ämter", "office", "দপ্তর", "B1", "Services"),
    noun("die Rechnung", "die Rechnungen", "bill", "বিল", "A2", "Services"),
    verb("unterschreiben", "sign", "স্বাক্ষর করা", "B1", "Services"),
    verb("reservieren", "reserve", "সংরক্ষণ করা", "A2", "Services"),
    verb("mieten", "rent", "ভাড়া নেওয়া", "A2", "Services"),
    verb("leihen", "borrow", "ধার নেওয়া", "B1", "Services"),
    verb("liefern", "deliver", "পৌঁছে দেওয়া", "B1", "Services"),
    verb("beantragen", "apply for", "আবেদন করা", "B1", "Services"),
    adjective("dringend", "urgent", "জরুরি", "B1", "Services"),
    adjective("gültig", "valid", "বৈধ", "B1", "Services"),
    adjective("kostenlos", "free of charge", "বিনামূল্যে", "A2", "Services"),
    adjective("privat", "private", "ব্যক্তিগত", "A2", "Services")
  ];
})();
