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

  function other(german, meaningEn, meaningBn, level, category, exampleDe, exampleEn) {
    return {
      german,
      pronunciationEn: buildPronunciationEn(german),
      pronunciationBn: buildPronunciationBn(german),
      meaningEn,
      meaningBn,
      exampleDe,
      exampleEn,
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

  function parseOtherLines(lines) {
    return lines
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [german, meaningEn, meaningBn, level, category] = line.split("|");
        return other(
          german,
          meaningEn,
          meaningBn,
          level,
          category,
          `In diesem Satz benutzen wir ${german}.`,
          `In this sentence we use ${meaningEn}.`
        );
      });
  }

  function parseNounLines(lines) {
    return lines
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => noun(...line.split("|")));
  }

  function parseAdjectivePairs(lines) {
    return lines
      .trim()
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        const [wordA, meaningA, bnA, wordB, meaningB, bnB, level, category] = line.split("|");
        return [
          adjective(wordA, meaningA, bnA, level, category),
          adjective(wordB, meaningB, bnB, level, category)
        ];
      });
  }

  function parseVerbTriples(lines) {
    return lines
      .trim()
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        const [verbA, meaningA, bnA, verbB, meaningB, bnB, verbC, meaningC, bnC, level, category] = line.split("|");
        return [
          verb(verbA, meaningA, bnA, level, category),
          verb(verbB, meaningB, bnB, level, category),
          verb(verbC, meaningC, bnC, level, category)
        ];
      });
  }

  function toBanglaDigits(number) {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(number)
      .split("")
      .map((digit) => digits[Number(digit)])
      .join("");
  }

  function germanCardinal(number) {
    const units = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const unitPrefix = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const teens = {
      10: "zehn",
      11: "elf",
      12: "zwölf",
      13: "dreizehn",
      14: "vierzehn",
      15: "fünfzehn",
      16: "sechzehn",
      17: "siebzehn",
      18: "achtzehn",
      19: "neunzehn"
    };
    const tens = {
      20: "zwanzig",
      30: "dreißig",
      40: "vierzig",
      50: "fünfzig",
      60: "sechzig",
      70: "siebzig",
      80: "achtzig",
      90: "neunzig"
    };

    if (number < 10) {
      return units[number];
    }

    if (number < 20) {
      return teens[number];
    }

    if (number < 100) {
      const ones = number % 10;
      const tensPart = number - ones;
      return ones === 0 ? tens[tensPart] : `${unitPrefix[ones]}und${tens[tensPart]}`;
    }

    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    const hundredWord = hundreds === 1 ? "einhundert" : `${unitPrefix[hundreds]}hundert`;
    return remainder === 0 ? hundredWord : `${hundredWord}${germanCardinal(remainder)}`;
  }

  function englishOrdinal(number) {
    const suffix = number % 10 === 1 && number % 100 !== 11 ? "st"
      : number % 10 === 2 && number % 100 !== 12 ? "nd"
      : number % 10 === 3 && number % 100 !== 13 ? "rd"
      : "th";
    return `${number}${suffix}`;
  }

  function germanOrdinal(number) {
    const irregular = {
      1: "erste",
      2: "zweite",
      3: "dritte",
      4: "vierte",
      5: "fünfte",
      6: "sechste",
      7: "siebte",
      8: "achte",
      9: "neunte",
      10: "zehnte",
      11: "elfte",
      12: "zwölfte",
      13: "dreizehnte",
      14: "vierzehnte",
      15: "fünfzehnte",
      16: "sechzehnte",
      17: "siebzehnte",
      18: "achtzehnte",
      19: "neunzehnte"
    };

    if (irregular[number]) {
      return irregular[number];
    }

    if (number < 20) {
      return `${germanCardinal(number)}te`;
    }

    return `${germanCardinal(number)}ste`;
  }

  function generateNumberWords() {
    const words = [];

    for (let number = 0; number <= 299; number += 1) {
      const level = number <= 120 ? "A2" : "B1";
      const german = germanCardinal(number);
      words.push(
        other(
          german,
          String(number),
          toBanglaDigits(number),
          level,
          "Numbers",
          `Heute üben wir die Zahl ${german}.`,
          `Today we practice the number ${number}.`
        )
      );
    }

    return words;
  }

  function generateOrdinalWords() {
    const words = [];

    for (let number = 1; number <= 31; number += 1) {
      const german = germanOrdinal(number);
      words.push(
        other(
          german,
          englishOrdinal(number),
          `${toBanglaDigits(number)}তম`,
          number <= 15 ? "A2" : "B1",
          "Numbers",
          `Heute üben wir die Ordnungszahl ${german}.`,
          `Today we practice the ordinal number ${englishOrdinal(number)}.`
        )
      );
    }

    return words;
  }

  const functionWords = parseOtherLines(`
ich|I|আমি|A2|Grammar
 du|you|তুমি|A2|Grammar
er|he|সে|A2|Grammar
sie|she|সে|A2|Grammar
es|it|এটি|A2|Grammar
wir|we|আমরা|A2|Grammar
ihr|you all|তোমরা|A2|Grammar
Sie|you formal|আপনি|A2|Grammar
mich|me|আমাকে|A2|Grammar
dich|you (accusative)|তোমাকে|A2|Grammar
ihn|him|তাকে|A2|Grammar
ihm|to him|তাকে|A2|Grammar
uns|us|আমাদের|A2|Grammar
euch|you all (accusative)|তোমাদের|A2|Grammar
ihnen|them|তাদের|A2|Grammar
unser|our|আমাদের|A2|Grammar
euer|your plural|তোমাদের|A2|Grammar
kein|no, none|কোনো না|A2|Grammar
jeder|every|প্রতিটি|A2|Grammar
beide|both|উভয়|A2|Grammar
dieser|this|এই|A2|Grammar
jener|that|ওই|B1|Grammar
solcher|such|এমন|B1|Grammar
welcher|which|কোন|A2|Grammar
mancher|some|কিছু|B1|Grammar
wer|who|কে|A2|Grammar
was|what|কি|A2|Grammar
wann|when|কখন|A2|Grammar
wo|where|কোথায়|A2|Grammar
wohin|where to|কোথায় (দিকে)|A2|Grammar
woher|where from|কোথা থেকে|A2|Grammar
warum|why|কেন|A2|Grammar
wie|how|কিভাবে|A2|Grammar
wie viel|how much|কত|A2|Grammar
wie viele|how many|কতগুলো|A2|Grammar
in|in|মধ্যে|A2|Grammar
an|at, on|কাছে বা উপর|A2|Grammar
auf|on|ওপর|A2|Grammar
unter|under|নিচে|A2|Grammar
über|over|উপর দিয়ে|A2|Grammar
neben|beside|পাশে|A2|Grammar
zwischen|between|মধ্যে|A2|Grammar
vor|in front of|সামনে|A2|Grammar
hinter|behind|পেছনে|A2|Grammar
durch|through|মাধ্যমে|B1|Grammar
für|for|জন্য|A2|Grammar
gegen|against|বিরুদ্ধে|B1|Grammar
ohne|without|ছাড়া|A2|Grammar
um|around|ঘিরে|A2|Grammar
mit|with|সাথে|A2|Grammar
nach|after, to|পরে বা দিকে|A2|Grammar
aus|out of|থেকে|A2|Grammar
bei|at, with|কাছে|A2|Grammar
seit|since|থেকে|A2|Grammar
von|from|থেকে|A2|Grammar
zu|to|দিকে|A2|Grammar
bis|until|পর্যন্ত|A2|Grammar
und|and|এবং|A2|Grammar
oder|or|অথবা|A2|Grammar
aber|but|কিন্তু|A2|Grammar
denn|because|কারণ|B1|Grammar
sondern|but rather|বরং|B1|Grammar
weil|because|কারণ|A2|Grammar
dass|that|যে|A2|Grammar
wenn|if, when|যদি বা যখন|A2|Grammar
ob|whether|কিনা|B1|Grammar
obwohl|although|যদিও|B1|Grammar
bevor|before|আগে|B1|Grammar
nachdem|after|পরে|B1|Grammar
damit|so that|যাতে|B1|Grammar
deshalb|therefore|তাই|A2|Grammar
also|so, therefore|সুতরাং|A2|Grammar
heute|today|আজ|A2|Time
 gestern|yesterday|গতকাল|A2|Time
morgen|tomorrow|আগামীকাল|A2|Time
jetzt|now|এখন|A2|Time
bald|soon|শিগগির|A2|Time
schon|already|ইতিমধ্যে|A2|Time
noch|still, yet|এখনও|A2|Time
immer|always|সবসময়|A2|Time
nie|never|কখনও না|A2|Time
oft|often|প্রায়ই|A2|Time
selten|rarely|খুব কম|B1|Time
manchmal|sometimes|মাঝে মাঝে|A2|Time
sofort|immediately|সঙ্গে সঙ্গে|A2|Time
vielleicht|perhaps|হয়তো|A2|Time
wirklich|really|সত্যিই|A2|Time
ziemlich|quite|বেশ|B1|Time
besonders|especially|বিশেষভাবে|B1|Time
fast|almost|প্রায়|B1|Time
genug|enough|যথেষ্ট|A2|Time
zusammen|together|একসাথে|A2|Time
allein|alone|একা|A2|Time
oben|above|ওপরে|A2|Direction
unten|below|নিচে|A2|Direction
links|left|বামে|A2|Direction
rechts|right|ডানে|A2|Direction
hier|here|এখানে|A2|Direction
dort|there|সেখানে|A2|Direction
wieder|again|আবার|A2|Time`);

  const adjectiveWords = parseAdjectivePairs(`
alt|old|পুরোনো|neu|new|নতুন|A2|Description
jung|young|তরুণ|erwachsen|adult|প্রাপ্তবয়স্ক|A2|Description
groß|big|বড়|klein|small|ছোট|A2|Description
hoch|high|উঁচু|niedrig|low|নিচু|A2|Description
breit|wide|চওড়া|schmal|narrow|সরু|B1|Description
dick|thick|মোটা|dünn|thin|পাতলা|A2|Description
hell|bright|উজ্জ্বল|dunkel|dark|অন্ধকার|A2|Description
hart|hard|কঠিন|weich|soft|নরম|A2|Description
stark|strong|শক্তিশালী|schwach|weak|দুর্বল|A2|Description
reich|rich|ধনী|arm|poor|গরিব|A2|Description
schwer|heavy|ভারী|leicht|light|হালকা|A2|Description
schnell|fast|দ্রুত|langsam|slow|ধীর|A2|Description
früh|early|আগে|spät|late|দেরি|A2|Description
nah|near|কাছে|fern|far|দূরে|A2|Description
offen|open|খোলা|geschlossen|closed|বন্ধ|A2|Description
leer|empty|খালি|voll|full|ভরা|A2|Description
sauber|clean|পরিষ্কার|schmutzig|dirty|নোংরা|A2|Description
trocken|dry|শুকনো|nass|wet|ভেজা|A2|Description
ruhig|calm|শান্ত|laut|loud|জোরে|A2|Description
freundlich|friendly|বন্ধুসুলভ|unfreundlich|unfriendly|অমায়িক নয়|A2|Description
möglich|possible|সম্ভব|unmöglich|impossible|অসম্ভব|B1|Description
sicher|safe|নিরাপদ|unsicher|unsafe|অনিরাপদ|A2|Description
klar|clear|স্পষ্ট|unklar|unclear|অস্পষ্ট|A2|Description
direkt|direct|সরাসরি|indirekt|indirect|পরোক্ষ|B1|Description
lokal|local|স্থানীয়|global|global|বিশ্বব্যাপী|B1|Description
positiv|positive|ইতিবাচক|negativ|negative|নেতিবাচক|B1|Description
öffentlich|public|সার্বজনিক|privat|private|ব্যক্তিগত|B1|Description
aktiv|active|সক্রিয়|passiv|passive|নিষ্ক্রিয়|B1|Description
ehrlich|honest|সৎ|unehrlich|dishonest|অসৎ|B1|Description
traditionell|traditional|ঐতিহ্যবাহী|modern|modern|আধুনিক|A2|Description
beliebt|popular|জনপ্রিয়|unbeliebt|unpopular|অজনপ্রিয়|B1|Description
nötig|necessary|প্রয়োজনীয়|unnötig|unnecessary|অপ্রয়োজনীয়|B1|Description
gesund|healthy|সুস্থ|krank|sick|অসুস্থ|A2|Description
glücklich|happy|সুখী|unglücklich|unhappy|অসুখী|A2|Feelings
zufrieden|satisfied|সন্তুষ্ট|unzufrieden|dissatisfied|অসন্তুষ্ট|B1|Feelings
mutig|brave|সাহসী|feige|cowardly|ভীরু|B1|Feelings
höflich|polite|ভদ্র|unhöflich|rude|অভদ্র|B1|Description
geduldig|patient|ধৈর্যশীল|ungeduldig|impatient|অধৈর্য|B1|Feelings
seriös|serious|গম্ভীর|lustig|funny|মজার|B1|Description
praktisch|practical|ব্যবহারিক|theoretisch|theoretical|তাত্ত্বিক|B1|Study
heiß|hot|গরম|kühl|cool|শীতল|A2|Description
warm|warm|উষ্ণ|eiskalt|ice-cold|বরফ-ঠান্ডা|A2|Description
süß|sweet|মিষ্টি|salzig|salty|নোনতা|A2|Food
bitter|bitter|তিক্ত|sauer|sour|টক|A2|Food
wichtig|important|গুরুত্বপূর্ণ|dringend|urgent|জরুরি|A2|Description
einfach|simple|সহজ|kompliziert|complicated|জটিল|A2|Description
interessant|interesting|আকর্ষণীয়|langweilig|boring|বিরক্তিকর|A2|Description
kreativ|creative|সৃজনশীল|logisch|logical|যুক্তিসঙ্গত|B1|Study
vorsichtig|careful|সতর্ক|neugierig|curious|কৌতূহলী|B1|Description
fleißig|hardworking|পরিশ্রমী|faul|lazy|আলসে|A2|Work
schlau|clever|চালাক|dumm|stupid|বোকা|A2|Description
seltsam|strange|অদ্ভুত|gewöhnlich|ordinary|সাধারণ|B1|Description
wertvoll|valuable|মূল্যবান|nutzlos|useless|অকাজের|B1|Description
hilfreich|helpful|সহায়ক|schädlich|harmful|ক্ষতিকর|B1|Description
spannend|exciting|রোমাঞ্চকর|entspannend|relaxing|আরামদায়ক|B1|Leisure
deutlich|clear|পরিষ্কারভাবে বোঝা যায়|verwirrend|confusing|বিভ্রান্তিকর|B1|Description
scharf|sharp|ধারালো|stumpf|blunt|ভোঁতা|B1|Description
locker|loose|ঢিলা|fest|tight|কষা|B1|Description
rund|round|গোল|eckig|angular|কোণযুক্ত|A2|Description
glatt|smooth|মসৃণ|rau|rough|খসখসে|B1|Description
ordentlich|tidy|গোছানো|chaotisch|chaotic|অগোছালো|B1|Description
nett|nice|ভালো|gemein|mean|খারাপস্বভাব|A2|Feelings
friedlich|peaceful|শান্তিপূর্ণ|aggressiv|aggressive|আক্রমণাত্মক|B1|Feelings
offiziell|official|আনুষ্ঠানিক|inoffiziell|informal|অনানুষ্ঠানিক|B1|Work
digital|digital|ডিজিটাল|analog|analog|অ্যানালগ|B1|Technology
sichtbar|visible|দৃশ্যমান|unsichtbar|invisible|অদৃশ্য|B1|Description
realistisch|realistic|বাস্তবসম্মত|idealistisch|idealistic|আদর্শবাদী|B1|Description
regional|regional|আঞ্চলিক|international|international|আন্তর্জাতিক|B1|Description
mobil|mobile|চলমান|stationär|stationary|স্থির|B1|Technology
elastisch|flexible|নমনীয়|starr|rigid|কঠোর|B1|Description
legal|legal|বৈধ|illegal|illegal|অবৈধ|B1|Services
frei|free|মুক্ত|besetzt|occupied|দখলকৃত|A2|Description
still|quiet|নীরব|gesprächig|talkative|বাচাল|B1|Description
pünktlich|punctual|সময়নিষ্ঠ|verspätet|late|বিলম্বিত|A2|Work
schön|beautiful|সুন্দর|hässlich|ugly|কুৎসিত|A2|Description
teuer|expensive|দামী|billig|cheap|সস্তা|A2|Shopping
gemütlich|cozy|আরামদায়ক|kalt|cold|ঠান্ডা|A2|Home
lebendig|lively|প্রাণবন্ত|müde|tired|ক্লান্ত|A2|Feelings
bequem|comfortable|আরামদায়ক|anstrengend|exhausting|ক্লান্তিকর|B1|Description
selbstständig|independent|স্বনির্ভর|abhängig|dependent|নির্ভরশীল|B1|Work`);

  const verbWords = parseVerbTriples(`
arbeiten|work|কাজ করা|suchen|search|খোঁজা|finden|find|খুঁজে পাওয়া|A2|Work
beginnen|start|শুরু করা|enden|end|শেষ করা|dauern|last|স্থায়ী হওয়া|A2|Time
öffnen|open|খোলা|schließen|close|বন্ধ করা|reparieren|repair|মেরামত করা|A2|Home
putzen|clean|পরিষ্কার করা|waschen|wash|ধোয়া|trocknen|dry|শুকানো|A2|Home
kochen|cook|রান্না করা|backen|bake|বেক করা|schneiden|cut|কাটা|A2|Food
essen|eat|খাওয়া|trinken|drink|পান করা|probieren|try|চেষ্টা করা|A2|Food
kaufen|buy|কেনা|bezahlen|pay|পরিশোধ করা|sparen|save money|সঞ্চয় করা|A2|Shopping
bestellen|order|অর্ডার করা|liefern|deliver|পৌঁছে দেওয়া|holen|fetch|নিয়ে আসা|A2|Shopping
fahren|travel by vehicle|যানবাহনে যাতায়াত করা|reisen|travel|ভ্রমণ করা|laufen|run or walk|দৌড়ানো বা হাঁটা|A2|Travel
gehen|go|যাওয়া|kommen|come|আসা|bleiben|stay|থাকা|A2|Travel
steigen|climb or rise|ওঠা|sinken|sink|নামা|drehen|turn|ঘোরা|B1|Travel
ziehen|pull|টানা|schieben|push|ঠেলা|tragen|carry|বহন করা|A2|Daily Life
schicken|send|পাঠানো|senden|transmit|প্রেরণ করা|erhalten|receive|গ্রহণ করা|B1|Communication
fragen|ask|জিজ্ঞেস করা|antworten|answer|উত্তর দেওয়া|erklären|explain|ব্যাখ্যা করা|A2|Communication
meinen|mean or think|মত দেওয়া|glauben|believe|বিশ্বাস করা|denken|think|চিন্তা করা|A2|Communication
wissen|know|জানা|vergessen|forget|ভুলে যাওয়া|erinnern|remember|মনে রাখা|A2|Study
lesen|read|পড়া|schreiben|write|লেখা|üben|practice|অনুশীলন করা|A2|Study
lernen|learn|শেখা|studieren|study|অধ্যয়ন করা|merken|notice or remember|মনে রাখা|A2|Study
treffen|meet|দেখা করা|besuchen|visit|পরিদর্শন করা|einladen|invite|আমন্ত্রণ করা|A2|People
anrufen|call|ফোন করা|telefonieren|telephone|ফোনে কথা বলা|sprechen|speak|কথা বলা|A2|Communication
hören|hear|শোনা|zuhören|listen carefully|মন দিয়ে শোনা|verstehen|understand|বোঝা|A2|Communication
sehen|see|দেখা|anschauen|watch|দেখা|beobachten|observe|পর্যবেক্ষণ করা|A2|Daily Life
zeigen|show|দেখানো|weisen|point|ইশারা করা|beschreiben|describe|বর্ণনা করা|B1|Communication
sammeln|collect|সংগ্রহ করা|sortieren|sort|সাজানো|vergleichen|compare|তুলনা করা|B1|Study
planen|plan|পরিকল্পনা করা|entscheiden|decide|সিদ্ধান্ত নেওয়া|wählen|choose|বেছে নেওয়া|A2|Work
organisieren|organize|সংগঠিত করা|vorbereiten|prepare|প্রস্তুত করা|erledigen|complete|শেষ করা|B1|Work
helfen|help|সাহায্য করা|unterstützen|support|সমর্থন করা|retten|rescue|উদ্ধার করা|A2|Health
untersuchen|examine|পরীক্ষা করা|behandeln|treat|চিকিৎসা করা|heilen|heal|সুস্থ করা|B1|Health
trainieren|train|অনুশীলন করা|atmen|breathe|শ্বাস নেওয়া|husten|cough|কাশি দেওয়া|A2|Health
fühlen|feel|অনুভব করা|hoffen|hope|আশা করা|genießen|enjoy|উপভোগ করা|A2|Feelings
lachen|laugh|হাসা|lächeln|smile|হাসিমুখে থাকা|weinen|cry|কাঁদা|A2|Feelings
ärgern|annoy|বিরক্ত করা|vermissen|miss|মিস করা|entspannen|relax|আরাম করা|B1|Feelings
wohnen|live|থাকা|mieten|rent|ভাড়া নেওয়া|umziehen|move house|বাসা বদলানো|A2|Home
einsteigen|board|ওঠা|aussteigen|get off|নামা|landen|land|অবতরণ করা|A2|Travel
starten|start|শুরু করা|ankommen|arrive|পৌঁছানো|abfahren|depart|রওনা হওয়া|A2|Travel
packen|pack|গুছানো|auspacken|unpack|খোলা|einpacken|pack up|প্যাক করা|A2|Travel
stehen|stand|দাঁড়ানো|sitzen|sit|বসা|liegen|lie|শোয়া বা অবস্থিত থাকা|A2|Daily Life
bauen|build|নির্মাণ করা|malen|paint|আঁকা|zeichnen|draw|আঁকা|A2|Leisure
drucken|print|মুদ্রণ করা|kopieren|copy|কপি করা|scannen|scan|স্ক্যান করা|B1|Technology
speichern|save|সংরক্ষণ করা|löschen|delete|মুছে ফেলা|hochladen|upload|আপলোড করা|A2|Technology
herunterladen|download|ডাউনলোড করা|klicken|click|ক্লিক করা|tippen|type|টাইপ করা|A2|Technology
verkaufen|sell|বিক্রি করা|tauschen|exchange|বিনিময় করা|anprobieren|try on|পরে দেখা|A2|Shopping
kooperieren|cooperate|সহযোগিতা করা|diskutieren|discuss|আলোচনা করা|zustimmen|agree|সম্মতি দেওয়া|B1|Work
ablehnen|refuse|প্রত্যাখ্যান করা|akzeptieren|accept|গ্রহণ করা|prüfen|check|পরীক্ষা করা|B1|Work
schützen|protect|রক্ষা করা|warnen|warn|সতর্ক করা|vermeiden|avoid|এড়ানো|B1|Health
pflanzen|plant|রোপণ করা|wachsen|grow|বেড়ে ওঠা|blühen|bloom|ফোটা|A2|Nature
wandern|hike|হেঁটে ভ্রমণ করা|schwimmen|swim|সাঁতার কাটা|radeln|cycle|সাইকেল চালানো|A2|Leisure
fotografieren|photograph|ছবি তোলা|filmen|film|ভিডিও করা|teilen|share|ভাগ করা|B1|Leisure
reservieren|reserve|সংরক্ষণ করা|unterschreiben|sign|স্বাক্ষর করা|beantragen|apply for|আবেদন করা|B1|Services
leihen|borrow|ধার নেওয়া|zurückgeben|give back|ফেরত দেওয়া|liefern|deliver|পৌঁছে দেওয়া|B1|Services`);

  const nounWords = parseNounLines(`
das Fenster|die Fenster|window|জানালা|A2|Home
die Tür|die Türen|door|দরজা|A2|Home
der Spiegel|die Spiegel|mirror|আয়না|A2|Home
das Bett|die Betten|bed|বিছানা|A2|Home
der Schrank|die Schränke|cupboard|আলমারি|A2|Home
die Lampe|die Lampen|lamp|ল্যাম্প|A2|Home
das Sofa|die Sofas|sofa|সোফা|A2|Home
die Decke|die Decken|blanket|কম্বল|A2|Home
das Kissen|die Kissen|pillow|বালিশ|A2|Home
die Tasse|die Tassen|cup|কাপ|A2|Home
der Teller|die Teller|plate|প্লেট|A2|Food
der Löffel|die Löffel|spoon|চামচ|A2|Food
die Gabel|die Gabeln|fork|কাঁটা চামচ|A2|Food
das Messer|die Messer|knife|ছুরি|A2|Food
der Kühlschrank|die Kühlschränke|refrigerator|ফ্রিজ|A2|Home
die Waschmaschine|die Waschmaschinen|washing machine|ওয়াশিং মেশিন|A2|Home
das Hemd|die Hemden|shirt|শার্ট|A2|Clothing
die Hose|die Hosen|pants|প্যান্ট|A2|Clothing
die Jacke|die Jacken|jacket|জ্যাকেট|A2|Clothing
der Schuh|die Schuhe|shoe|জুতা|A2|Clothing
das Fahrrad|die Fahrräder|bicycle|সাইকেল|A2|Travel
der Bus|die Busse|bus|বাস|A2|Travel
die U-Bahn|die U-Bahnen|subway|মেট্রো|A2|Travel
der Zug|die Züge|train|ট্রেন|A2|Travel
das Auto|die Autos|car|গাড়ি|A2|Travel
das Taxi|die Taxis|taxi|ট্যাক্সি|A2|Travel
das Flugzeug|die Flugzeuge|airplane|বিমান|A2|Travel
der Flughafen|die Flughäfen|airport|বিমানবন্দর|B1|Travel
der Reisepass|die Reisepässe|passport|পাসপোর্ট|A2|Travel
die Karte|die Karten|map or card|মানচিত্র বা কার্ড|A2|Travel
die Zeitung|die Zeitungen|newspaper|সংবাদপত্র|A2|Media
der Fernseher|die Fernseher|television|টেলিভিশন|A2|Technology
das Radio|die Radios|radio|রেডিও|A2|Technology
die Batterie|die Batterien|battery|ব্যাটারি|B1|Technology
das Kabel|die Kabel|cable|ক্যাবল|B1|Technology
der Bildschirm|die Bildschirme|screen|পর্দা|B1|Technology
die Tastatur|die Tastaturen|keyboard|কীবোর্ড|B1|Technology
die Maus|die Mäuse|mouse|মাউস|B1|Technology
der Rucksack|die Rucksäcke|backpack|ব্যাকপ্যাক|A2|Travel
das Werkzeug|die Werkzeuge|tool|যন্ত্রপাতি|B1|Services
die Seife|die Seifen|soap|সাবান|A2|Health
die Zahnbürste|die Zahnbürsten|toothbrush|টুথব্রাশ|A2|Health
der Kalender|die Kalender|calendar|ক্যালেন্ডার|A2|Time`);

  window.fullVocabularyData = [
    ...generateNumberWords(),
    ...generateOrdinalWords(),
    ...functionWords,
    ...adjectiveWords,
    ...verbWords,
    ...nounWords
  ];
})();
