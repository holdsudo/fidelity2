(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => (n < 0 ? '-' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
const pct = (n) => (isFinite(n) ? (n * 100).toFixed(1) + '%' : '—');
const num = (el) => +String(el.value).replace(/[^\d.]/g, '') || 0;
function apr(net, pay, n, perYear) {
if (net <= 0 || pay <= 0 || n <= 0 || pay * n <= net) return 0;
let r = 0.001;
for (let k = 0; k < 100; k++) {
const f = pay * (1 - Math.pow(1 + r, -n)) / r - net;
const d = pay * ((n * Math.pow(1 + r, -n - 1)) / r - (1 - Math.pow(1 + r, -n)) / (r * r));
const nr = r - f / d; if (!isFinite(nr) || nr <= 0) { r /= 2; continue; }
if (Math.abs(nr - r) < 1e-10) { r = nr; break; } r = nr;
}
return r * perYear;
}
const PER = { daily: [21.67, 'day', 252], weekly: [4.33, 'week', 52], monthly: [1, 'month', 12] };
$$('.slider-field input').forEach(i => {
const o = i.closest('.slider-field').querySelector('output');
const f = () => { o.textContent = i.dataset.fmt === 'money' ? money(+i.value) : i.dataset.fmt === 'x' ? (+i.value).toFixed(2) : i.dataset.fmt === 'pct' ? (+i.value).toFixed(1) + '%' : i.value + (i.dataset.suffix || ''); };
i.addEventListener('input', f); f();
});
$$('.seg-light').forEach(sg => $$('button', sg).forEach(b => b.addEventListener('click', () => {
$$('button', sg).forEach(x => x.setAttribute('aria-pressed', x === b)); sg.dispatchEvent(new CustomEvent('change', { detail: b.dataset.v, bubbles: true }));
})));
const fc = $('#calc');
if (fc) {
let mode = 'mca', freq = 'daily';
const run = () => {
const amt = +$('#c-amt').value, months = +$('#c-term').value;
$$('[data-mode]', fc).forEach(el => el.hidden = el.dataset.mode !== mode);
let payback, pay, n, per = PER[freq];
if (mode === 'mca') {
payback = amt * +$('#c-factor').value; n = Math.round(months * per[0]); pay = payback / n;
} else {
const r = +$('#c-apr').value / 100 / 12; n = months; per = PER.monthly;
pay = r ? amt * r / (1 - Math.pow(1 + r, -n)) : amt / n; payback = pay * n;
}
const cost = payback - amt, a = mode === 'mca' ? apr(amt, pay, n, per[2]) : +$('#c-apr').value / 100;
$('#o-payback').textContent = money(payback);
$('#o-pay').textContent = money(pay); $('#o-per').textContent = 'per ' + per[1];
$('#o-cost').textContent = money(cost);
$('#o-apr').textContent = pct(a);
$('#o-n').textContent = n + ' payments';
const tot = payback || 1;
$('#bar-p').style.width = (amt / tot * 100) + '%'; $('#bar-c').style.width = (cost / tot * 100) + '%';
$('#o-go').href = `/apply/?amount=${amt}`;
};
fc.addEventListener('input', run);
fc.addEventListener('change', (e) => { if (e.detail && e.target.id === 'c-mode') mode = e.detail; if (e.detail && e.target.id === 'c-freq') freq = e.detail; run(); });
run();
}
const cmp = $('#compare');
if (cmp) {
const run = () => {
const res = $$('.offer', cmp).map(o => {
const g = (k) => num($(`[name=${k}]`, o));
const amt = g('amt'), fee = g('fee'), payback = g('payback'), months = g('term'), freq = $('[name=freq]', o).value;
if (!amt || !payback || !months) { $('.offer-res', o).innerHTML = '<span>Fill in amount, payback and term.</span>'; return null; }
const per = PER[freq], n = Math.round(months * per[0]), pay = payback / n, net = amt - fee, cost = payback - net, a = apr(net, pay, n, per[2]);
$('.offer-res', o).innerHTML = `<span>You receive <b>${money(net)}</b></span><span>Cost of capital <b>${money(cost)}</b></span><span>Payment <b>${money(pay)}</b> / ${per[1]}</span><span>Est. APR equivalent <b>${pct(a)}</b></span>`;
return { o, a, cost };
});
$$('.offer', cmp).forEach(o => o.classList.remove('is-best'));
const valid = res.filter(Boolean);
if (valid.length > 1) valid.reduce((b, x) => x.a < b.a ? x : b).o.classList.add('is-best');
};
cmp.addEventListener('input', run); cmp.addEventListener('change', run); run();
}
const qz = $('#quiz');
if (qz) {
const qs = $$('.quiz__q', qz), bar = $('#quiz-bar'), ans = {};
let i = 0;
const show = () => { qs.forEach((q, k) => q.classList.toggle('is-on', k === i)); bar.style.width = (i / qs.length * 100) + '%'; };
qz.addEventListener('click', (e) => {
const b = e.target.closest('[data-a]'); if (!b) return;
ans[b.closest('.quiz__q').dataset.q] = b.dataset.a;
if (++i < qs.length) show(); else result();
});
$('#quiz-back')?.addEventListener('click', () => { if (i > 0) { i--; show(); } });
const P = {
mca: ['Merchant Cash Advance', 'Revenue-based funding that can move fast and leans on sales history over credit.', '/funding/merchant-cash-advance/', 'cash'],
wc: ['Working Capital Loan', 'Short-term capital for operations, with set payments.', '/funding/working-capital-loans/', 'briefcase'],
loc: ['Business Line of Credit', 'Draw what you need, when you need it — ideal for recurring gaps.', '/funding/business-line-of-credit/', 'refresh'],
eq: ['Equipment Financing', 'The equipment itself secures the financing, which can improve terms.', '/funding/equipment-financing/', 'gear'],
fac: ['Invoice Factoring', 'Turn unpaid B2B invoices into cash now.', '/funding/invoice-factoring/', 'file'],
term: ['Business Term Loan', 'Longer horizon with fixed payments for planned investments.', '/funding/business-term-loans/', 'trend'],
sba: ['SBA Loan', 'Often the lowest cost, but slower and paperwork-heavy.', '/funding/sba-loans/', 'building'],
};
function result() {
const s = { mca: 0, wc: 0, loc: 0, eq: 0, fac: 0, term: 0, sba: 0 };
const { tib, rev, credit, use, speed, b2b } = ans;
if (tib === 'lt6') { s.mca += 2; } if (tib === '6-24') { s.mca += 2; s.wc += 2; s.eq += 1; } if (tib === 'gt24') { s.term += 2; s.loc += 2; s.sba += 2; s.wc += 1; }
if (credit === 'low') { s.mca += 3; s.fac += 1; s.sba -= 3; s.term -= 1; s.loc -= 1; } if (credit === 'mid') { s.wc += 2; s.mca += 1; s.eq += 1; } if (credit === 'high') { s.sba += 2; s.term += 2; s.loc += 2; }
if (use === 'equipment') s.eq += 4; if (use === 'ops') { s.wc += 2; s.loc += 2; s.mca += 1; } if (use === 'growth') { s.term += 2; s.sba += 1; s.wc += 1; } if (use === 'gap') { s.loc += 2; s.fac += 1; s.mca += 1; }
if (speed === 'now') { s.mca += 2; s.wc += 1; s.sba -= 4; } if (speed === 'weeks') { s.term += 1; s.loc += 1; } if (speed === 'flex') { s.sba += 2; s.term += 1; }
if (b2b === 'yes') s.fac += 3; else s.fac -= 2;
if (rev === 'lt20') { s.term -= 1; s.sba -= 1; } if (rev === 'gt100') { s.loc += 1; s.term += 1; }
const top = Object.entries(s).sort((a, b) => b[1] - a[1]).slice(0, 3);
const max = Math.max(1, top[0][1]);
$('#quiz-matches').innerHTML = top.map(([k, v], j) => { const p = P[k]; return `<a class="match ${j === 0 ? 'top' : ''}" href="${p[2]}"><span class="ic"><svg class="icon"><use href="#i-${p[3]}"/></svg></span><span><h3>${p[0]}</h3><p>${p[1]}</p></span><span class="score">${Math.max(40, Math.round(v / max * 96))}%</span></a>`; }).join('');
qs.forEach(q => q.classList.remove('is-on')); bar.style.width = '100%';
$('.quiz__res', qz).classList.add('is-on');
}
$('#quiz-restart')?.addEventListener('click', () => { i = 0; $('.quiz__res', qz).classList.remove('is-on'); show(); });
show();
}
const pf = $('#procfee');
if (pf) {
const run = () => {
const vol = num($('#p-vol')), fees = num($('#p-fees')), cut = +$('#p-cut').value / 100;
const eff = vol ? fees / vol : 0;
$('#o-eff').textContent = vol ? (eff * 100).toFixed(2) + '%' : '—';
$('#o-annual').textContent = money(fees * 12);
$('#o-save').textContent = money(vol * cut * 12);
$('#o-save-lbl').textContent = `per year if your effective rate were ${(cut * 100).toFixed(2)} pts lower`;
const lvl = eff > .035 ? ['High', '#E5484D'] : eff > .027 ? ['Worth reviewing', '#F5A524'] : eff ? ['Competitive', '#12B76A'] : ['—', '#8A91A4'];
$('#o-lvl').textContent = lvl[0]; $('#o-lvl').style.color = lvl[1];
};
pf.addEventListener('input', run); run();
}
})();