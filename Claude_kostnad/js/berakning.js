// Delade formler för Claude-kostnad-verktyget (Kents eget index.html och den publika dela/index.html).
// Alternativ C, se PRD_publik_variant.md delfråga d.1: BARA de rena formlerna ligger här.
// DOM-inläsning, DOM-utskrift, tooltip- och kopiera-logik är medvetet INTE med — det förblir
// separat kod i varje sida, se SPEC_publik_variant.md avsnitt 5.
//
// Varje funktion tar emot rena tal/strängar och returnerar ett värde eller ett litet objekt.
// Ingen funktion här läser eller skriver till DOM:et.
const CKB = (function(){

  const WEEK_HOURS = 168; // en vecka = 7 dygn, källa: Claude Help Center, "What is the Pro plan?"
  const PACE_DANGER_THRESHOLD = -10; // procentenheter, se PRD_tokenanvandning.md v8

  function normalizePct(aktivPct, boostPct){
    return aktivPct * (1 + boostPct / 100);
  }

  // Nästa tillfälle för en given veckodag (0=sön..6=lör) + klockslag, från "now".
  // Om det redan passerat idag/denna vecka, rullas det fram till nästa vecka.
  function nextWeeklyReset(now, targetDow, hh, mm){
    const d = new Date(now.getTime());
    d.setHours(hh, mm, 0, 0);
    const diffDays = (targetDow - now.getDay() + 7) % 7;
    d.setDate(d.getDate() + diffDays);
    if (d <= now) d.setDate(d.getDate() + 7);
    return d;
  }

  function weekElapsedPct(now, resetDag, resetHH, resetMM){
    const resetDateTime = nextWeeklyReset(now, resetDag, resetHH, resetMM);
    const hoursUntilReset = (resetDateTime - now) / 3600000;
    const pctTimeRemaining = Math.max(0, Math.min(100, hoursUntilReset / WEEK_HOURS * 100));
    return 100 - pctTimeRemaining;
  }

  // Flaggat antagande (ej bekräftat av Anthropic): usage credits-cykeln följer kalendermånader.
  function monthElapsedPct(resetDatumISO, now){
    const cycleStart = new Date(resetDatumISO + 'T00:00:00');
    cycleStart.setMonth(cycleStart.getMonth() - 1);
    const resetDT = new Date(resetDatumISO + 'T00:00:00');
    const totalMs = resetDT - cycleStart;
    const elapsedMs = now - cycleStart;
    return Math.max(0, Math.min(100, (elapsedMs / totalMs) * 100));
  }

  function paceBuffer(andelTidGangen, andelForbrukad){
    return andelTidGangen - andelForbrukad;
  }

  // Samma tröskel (−10 procentenheter) som orsakade v8-bugfixen i PRD_tokenanvandning.md.
  function paceLevel(buffer){
    if (buffer < PACE_DANGER_THRESHOLD) return {level: 'danger', ok: false};
    if (buffer < 0) return {level: 'warn', ok: true};
    return {level: 'ok', ok: true};
  }

  function sessionLevel(sessPct){
    if (sessPct >= 100) return {level: 'danger', ok: false};
    if (sessPct >= 85) return {level: 'warn', ok: true};
    return {level: 'ok', ok: true};
  }

  function weekLevel(weekPct, normalPct, boostPct){
    if (normalPct > 100 && boostPct > 0) return {level: 'warn', ok: false};
    if (weekPct >= 100) return {level: 'danger', ok: false};
    if (normalPct >= 85) return {level: 'warn', ok: true};
    return {level: 'ok', ok: true};
  }

  function creditLevel(spent, limit, pct){
    if (spent > limit) return {level: 'danger', ok: false};
    if (pct >= 85) return {level: 'warn', ok: true};
    return {level: 'ok', ok: true};
  }

  // Kärnfrågan-bannerns sammanvägning. sessOk/weekOk/creditOk är redan kombinerade
  // (hård gräns OCH takt) av anroparen innan de skickas in hit.
  function coreVerdict(hasAnyData, sessOk, weekOk, creditOk){
    if (!hasAnyData) return {status: 'no-data', failedAreas: []};
    const failed = [];
    if (!sessOk) failed.push('session');
    if (!weekOk) failed.push('vecka');
    if (!creditOk) failed.push('månad');
    return failed.length ? {status: 'not-ok', failedAreas: failed} : {status: 'ok', failedAreas: []};
  }

  function fmtPct(n){
    if (isNaN(n)) return '–';
    return (Math.round(n * 10) / 10).toLocaleString('sv-SE') + ' %';
  }
  function fmtEur(n){
    if (isNaN(n)) return '–';
    return (Math.round(n * 100) / 100).toLocaleString('sv-SE') + ' €';
  }
  function todayISO(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function daysBetween(fromISO, toISO){
    if (!toISO) return NaN;
    const from = new Date(fromISO + 'T00:00:00');
    const to = new Date(toISO + 'T00:00:00');
    return Math.round((to - from) / 86400000);
  }

  return {
    normalizePct, nextWeeklyReset, weekElapsedPct, monthElapsedPct,
    paceBuffer, paceLevel, sessionLevel, weekLevel, creditLevel, coreVerdict,
    fmtPct, fmtEur, todayISO, daysBetween
  };
})();
