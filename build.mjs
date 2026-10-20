// Regénère ../index.html (application) et ../review.html (liste des leçons) à partir des sources.
// Usage (depuis le dossier source/) : node build.mjs
import fs from 'node:fs';
const read = (f) => fs.readFileSync(f, 'utf8');
const data = read('data.js') + read('data-java.js') + read('data-2026.js') + read('data-exams.js');
fs.writeFileSync('../index.html', read('tpl.html')
  .replace('%%DATA%%', () => data)
  .replace('%%SQL%%', () => read('sql.js')));

// Tableau de revue : on recalcule LESSONS à partir des données.
const DATA = new Function(data + ';return DATA')();
const LESSONS = DATA.tracks.flatMap((t) => t.chapters.flatMap((c) => c.lessons.map((l) => ({
  track: t.title, chapter: c.title, id: l.id, title: l.title, summary: l.summary,
  minutes: l.minutes, blocks: l.blocks.length, exercises: (l.exercises || []).length,
}))));
const rv = read('../review.html');
const a = rv.indexOf('const LESSONS=') + 'const LESSONS='.length;
const b = rv.indexOf('];', a) < 0 ? a : (() => { let e = a; for (;;) { e = rv.indexOf('];', e + 1); try { JSON.parse(rv.slice(a, e + 1)); return e; } catch { if (e < 0) throw new Error('LESSONS introuvable'); } } })();
fs.writeFileSync('../review.html', rv.slice(0, a) + JSON.stringify(LESSONS) + rv.slice(b + 1));
const n = LESSONS.length, ex = DATA.tracks.reduce((s, t) => s + t.chapters.reduce((u, c) => u + c.lessons.reduce((v, l) => v + (l.exercises || []).length, 0), 0), 0);
console.log(`index.html et review.html générés : ${DATA.tracks.length} parcours, ${n} leçons, ${ex} exercices`);
