// OCR-anrop och fältmappning för Claude_kostnad/dela/index.html.
// Se SPEC_publik_variant.md avsnitt 3–4. Körs helt i webbläsaren (Tesseract.js, WebAssembly) —
// bilden skickas aldrig till någon server. Ingen DOM-koppling i mappningsfunktionerna nedan,
// bara i den lilla runOCR-wrappern som pratar med Tesseract-workern.

const CKO = (function(){

  const MONTHS = {
    jan:1, january:1, feb:2, february:2, mar:3, march:3, apr:4, april:4,
    may:5, jun:6, june:6, jul:7, july:7, aug:8, august:8,
    sep:9, sept:9, september:9, oct:10, october:10, nov:11, november:11, dec:12, december:12
  };

  // Alla förekomster av keywordRegex i text, i läsordning. Ett enda nyckelord kan
  // förekomma flera gånger (t.ex. "resets" på både session-, vecko- och usage
  // credits-raderna, eller "weekly" både i vecko-rubriken och i en boost-mening) —
  // se längre kommentar vid mapFields. Vi kan därför inte lita på första träffen.
  function allMatches(text, keywordRegex){
    const re = new RegExp(keywordRegex.source, keywordRegex.flags.replace('g','') + 'g');
    const out = [];
    let m;
    while ((m = re.exec(text)) !== null){
      out.push(m);
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    return out;
  }

  // Bland alla värden av rätt sort inom fönstret runt en nyckelords-förekomst,
  // ta det som ligger NÄRMAST nyckelordet (kortast teckenavstånd) — inte det första
  // som råkar stå tidigast i den utklippta fönstersträngen. Utan detta valde en
  // tidig implementation systematiskt fel värde så fort två tal låg olika långt
  // före/efter nyckelordet (t.ex. "€6.13 ... Monthly spend limit ... €104.75" —
  // "först i strängen" plockade €6.13 trots att €20.00 stod närmast).
  // forwardOnly: sök bara EFTER nyckelordet, inte före. Används för "Resets" och
  // "through", där etiketten alltid kommer före sitt värde i skärmdumparna
  // ("Resets Sep 1", "through August 19") — utan detta kunde en dagsangivelse i en
  // helt annan, tidigare mening (t.ex. "...through August 5.\nAll models\nResets
  // Thu...") felaktigt plockas upp som om den hörde till "Resets"-förekomsten,
  // bara för att den råkade stå textmässigt nära.
  function nearestValueMatch(text, keywordIndex, keywordLen, valueRegex, windowChars, forwardOnly){
    const start = forwardOnly ? (keywordIndex + keywordLen) : Math.max(0, keywordIndex - windowChars);
    const end = Math.min(text.length, keywordIndex + keywordLen + windowChars);
    const win = text.slice(start, end);
    const keywordCenter = (keywordIndex - start) + keywordLen / 2;
    const re = new RegExp(valueRegex.source, valueRegex.flags.replace('g','') + 'g');
    let best = null, bestDist = Infinity, m;
    while ((m = re.exec(win)) !== null){
      const matchCenter = m.index + m[0].length / 2;
      const dist = Math.abs(matchCenter - keywordCenter);
      if (dist < bestDist){ bestDist = dist; best = m; }
      if (m.index === re.lastIndex) re.lastIndex++;
    }
    return best;
  }

  // Provar varje förekomst av nyckelordet i tur och ordning, tar den FÖRSTA
  // förekomsten som faktiskt har ett värde av rätt sort i sin närhet (närmaste
  // värdet inom fönstret, se nearestValueMatch) — hoppar över förekomster som
  // inte ger någon träff alls, i stället för att ge upp vid första försöket.
  function firstNearMatch(text, keywordRegex, valueRegex, windowChars, forwardOnly){
    const occurrences = allMatches(text, keywordRegex);
    for (let i = 0; i < occurrences.length; i++){
      const km = occurrences[i];
      const vm = nearestValueMatch(text, km.index, km[0].length, valueRegex, windowChars, forwardOnly);
      if (vm) return vm;
    }
    return null;
  }

  function findPercentNear(text, keywordRegex, windowChars){
    const vm = firstNearMatch(text, keywordRegex, /(\d{1,3}(?:[.,]\d+)?)\s*%/, windowChars || 60);
    return vm ? parseFloat(vm[1].replace(',', '.')) : null;
  }

  function findCurrencyNear(text, keywordRegex, windowChars){
    const vm = firstNearMatch(text, keywordRegex, /[€$]\s*(\d+(?:[.,]\d{2})?)/, windowChars || 60);
    return vm ? parseFloat(vm[1].replace(',', '.')) : null;
  }

  // Hittar "Month Day" (ev. år) nära ett nyckelord, returnerar ISO-datum (YYYY-MM-DD).
  // Antar innevarande år om inget år står i texten — ett rimligt antagande för en
  // skärmdump som per definition är tagen "nu", men inte hundraprocentigt säkert
  // kring årsskiften. Flaggas här, inte gissat bort.
  function findDateNear(text, keywordRegex, refNow, windowChars){
    const monthNames = Object.keys(MONTHS).sort((a,b)=>b.length-a.length).join('|');
    const dateRegex = new RegExp('(' + monthNames + ')\\.?\\s+(\\d{1,2})(?:,?\\s*(\\d{4}))?', 'i');
    const dm = firstNearMatch(text, keywordRegex, dateRegex, windowChars || 40, true);
    if (!dm) return null;
    const month = MONTHS[dm[1].toLowerCase()];
    const day = parseInt(dm[2], 10);
    const year = dm[3] ? parseInt(dm[3], 10) : refNow.getFullYear();
    if (!month || !day) return null;
    return year + '-' + String(month).padStart(2,'0') + '-' + String(day).padStart(2,'0');
  }

  // Huvudfunktion: rå OCR-text in, förslag på fältvärden ut. Fält som inte hittas blir null —
  // aldrig gissade till 0, se SPEC avsnitt 6.
  //
  // Ordvalen nedan är medvetet specifika, inte de kortaste möjliga nyckelorden. Verifierat
  // mot en realistisk skärmdumpstext (Kents egen, 2026-08-04) under byggfasen: ett kort
  // nyckelord som "weekly" eller "limit" råkar också förekomma i boost-notisens löptext
  // ("...your weekly Claude Code limit is 50% higher...") och i "Resets"-etiketter på andra
  // rader — vilket gav fel eller tomma träffar tills nyckelorden gjordes mer specifika och
  // sökningen provar alla förekomster i tur och ordning (se firstNearMatch ovan), inte bara
  // den första.
  function mapFields(text, refNow){
    refNow = refNow || new Date();
    const result = {
      sessPct: findPercentNear(text, /current session/i),
      weekPct: findPercentNear(text, /all models/i) ?? findPercentNear(text, /weekly limits/i),
      boostPct: findPercentNear(text, /higher/i),
      boostEnd: findDateNear(text, /through/i, refNow),
      creditSpent: findCurrencyNear(text, /spent/i),
      creditLimit: findCurrencyNear(text, /monthly spend limit/i),
      creditReset: findDateNear(text, /resets/i, refNow)
    };
    result.fieldsFound = Object.keys(result).filter(function(k){
      return k !== 'fieldsFound' && result[k] !== null;
    }).length;
    return result;
  }

  // Kör Tesseract.js på en bildfil/Blob. Returnerar rå text (string).
  // Kräver att <script src=".../tesseract.min.js"> redan laddats (global `Tesseract`).
  async function runOCR(imageFileOrBlob){
    const worker = await Tesseract.createWorker('eng');
    try {
      const { data } = await worker.recognize(imageFileOrBlob);
      return data.text || '';
    } finally {
      await worker.terminate();
    }
  }

  return { mapFields, findPercentNear, findCurrencyNear, findDateNear, runOCR };
})();
