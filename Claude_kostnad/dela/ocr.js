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

  function windowAround(text, index, matchLen, windowChars){
    const start = Math.max(0, index - windowChars);
    const end = Math.min(text.length, index + matchLen + windowChars);
    return text.slice(start, end);
  }

  function findPercentNear(text, keywordRegex, windowChars){
    windowChars = windowChars || 60;
    const km = keywordRegex.exec(text);
    if (!km) return null;
    const win = windowAround(text, km.index, km[0].length, windowChars);
    const pm = /(\d{1,3}(?:[.,]\d+)?)\s*%/.exec(win);
    return pm ? parseFloat(pm[1].replace(',', '.')) : null;
  }

  function findCurrencyNear(text, keywordRegex, windowChars){
    windowChars = windowChars || 60;
    const km = keywordRegex.exec(text);
    if (!km) return null;
    const win = windowAround(text, km.index, km[0].length, windowChars);
    const pm = /[€$]\s*(\d+(?:[.,]\d{2})?)/.exec(win);
    return pm ? parseFloat(pm[1].replace(',', '.')) : null;
  }

  // Hittar "Month Day" (ev. år) nära ett nyckelord, returnerar ISO-datum (YYYY-MM-DD).
  // Antar innevarande år om inget år står i texten — ett rimligt antagande för en
  // skärmdump som per definition är tagen "nu", men inte hundraprocentigt säkert
  // kring årsskiften. Flaggas här, inte gissat bort.
  function findDateNear(text, keywordRegex, refNow, windowChars){
    windowChars = windowChars || 40;
    const km = keywordRegex.exec(text);
    if (!km) return null;
    const win = windowAround(text, km.index, km[0].length, windowChars);
    const monthNames = Object.keys(MONTHS).sort((a,b)=>b.length-a.length).join('|');
    const dm = new RegExp('(' + monthNames + ')\\.?\\s+(\\d{1,2})(?:,?\\s*(\\d{4}))?', 'i').exec(win);
    if (!dm) return null;
    const month = MONTHS[dm[1].toLowerCase()];
    const day = parseInt(dm[2], 10);
    const year = dm[3] ? parseInt(dm[3], 10) : refNow.getFullYear();
    if (!month || !day) return null;
    return year + '-' + String(month).padStart(2,'0') + '-' + String(day).padStart(2,'0');
  }

  // Huvudfunktion: rå OCR-text in, förslag på fältvärden ut. Fält som inte hittas blir null —
  // aldrig gissade till 0, se SPEC avsnitt 6.
  function mapFields(text, refNow){
    refNow = refNow || new Date();
    const result = {
      sessPct: findPercentNear(text, /current session/i),
      weekPct: findPercentNear(text, /all models|weekly/i),
      boostPct: findPercentNear(text, /higher/i),
      boostEnd: findDateNear(text, /through/i, refNow),
      creditSpent: findCurrencyNear(text, /spent/i),
      creditLimit: findCurrencyNear(text, /monthly spend limit|limit/i),
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
