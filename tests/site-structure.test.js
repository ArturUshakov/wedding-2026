const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "main.js"), "utf8");

test("dresscode follows timing and precedes wishes", () => {
  const timing = html.indexOf('class="sm-timing');
  const dresscode = html.indexOf('class="sm-dresscode');
  const wishes = html.indexOf('class="sm-wishes');

  assert.ok(timing >= 0 && dresscode > timing && wishes > dresscode);
  assert.equal(html.includes('class="sm-contact'), false);
});

test("cover includes anatomical heart overlay", () => {
  assert.match(html, /class="sm-lead-heart"/);
  assert.match(html, /src="\.\/heart\.png"/);
});

test("dresscode data has selected copy and four colors", () => {
  assert.match(js, /дресс-кода на нашей свадьбе не будет/i);
  assert.match(js, /воздержаться от ярких цветов и броских принтов/i);

  const palette = js.match(/DRESSCODE_COLORS:\s*\[([^\]]+)\]/);
  assert.ok(palette);
  assert.equal((palette[1].match(/#[0-9a-fA-F]{6}/g) || []).length, 4);
});

test("site data uses mobile-first updated copy", () => {
  assert.match(js, /HELLO_TITLE:\s*"Дорогие<br>гости!"/);
  assert.match(js, /Настал момент, когда мы больше не можем терпеть пустоту на 14-й странице наших паспортов\./);
  assert.match(js, /Будем счастливы, если в этот день вы разделите с нами эту радость/);
  assert.match(js, /LOCATION_TITLE:\s*"Локация"/);
  assert.match(js, /Центральный ЗАГС г\. Воронеж/);
  assert.match(js, /LOCATION_PHOTO:\s*"\.\/assets\/location-zags\.png"/);
  assert.match(js, /TIMING_TITLE:\s*"План дня"/);
  assert.match(js, /TIMING_1_0:\s*"13:30"/);
  assert.match(js, /TIMING_3_0:\s*"15:30"/);
  assert.match(js, /TIMING_4_0:\s*"22:00"/);
  assert.match(js, /WISH_TITLE:\s*"Детали"/);
  assert.match(js, /WISH_CARD_1_TITLE:\s*"Подарки"/);
  assert.match(js, /WISH_CARD_2_TITLE:\s*"Цветы"/);
  assert.match(js, /WISH_CARD_3_TITLE:\s*"Трансфер"/);
  assert.match(js, /подарки — в конверте/);
  assert.match(js, /любимую книгу или что-то для нашего дома/);
  assert.match(js, /транспорт будет вас ожидать и довезёт до места банкета/);
  assert.match(js, /BYE_PHOTO_ONE:\s*"\.\/assets\/final-couch-new\.png"/);
});

test("heart animation respects reduced motion", () => {
  assert.match(css, /@keyframes\s+heart-beat/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("lemon decor frames the cover and marquee follows dresscode", () => {
  assert.match(html, /class="sm-lead-lemon sm-lead-lemon--single"/);
  assert.match(html, /src="\.\/IMG_20260403_105744_434\.png"/);
  assert.match(html, /class="sm-lead-lemon sm-lead-lemon--branch"/);
  assert.match(html, /src="\.\/IMG_20260403_105740_921\.png"/);
  assert.match(html, /class="sm-desktop-lock"/);

  const dresscode = html.indexOf('id="dresscode"');
  const marquee = html.indexOf('class="sm-lemon-marquee');
  const wishes = html.indexOf('class="sm-wishes');
  assert.ok(dresscode >= 0 && marquee > dresscode && wishes > marquee);
  assert.match(
    html,
    /<section class="sm-dresscode sm-section-bg sm-section-light" id="dresscode">\s*<div class="sm-container">/
  );
  assert.doesNotMatch(html, /<section class="sm-time"/);
  assert.doesNotMatch(html, /class="sm-lemon-marquee sm-section-bg/);
  assert.match(html, /<\/div>\s*<section class="sm-wishes sm-section-type-1">/);
  assert.doesNotMatch(
    html,
    /sm-lemon-marquee[\s\S]*?sm-section-wrap sm-section-bg sm-section-dark[\s\S]*?sm-wishes/
  );

  assert.equal((html.match(/class="sm-lemon-marquee__group"/g) || []).length, 2);
  assert.match(html, /src="\.\/cicle\.png"/);
  assert.match(html, /class="sm-wishes__grid/);
  assert.equal(html.includes("sm-wishes__pagination-wrapper"), false);
  assert.equal(html.includes('data-sm-tel="BRIDE_TEL"'), false);
  assert.match(css, /\.sm-footer__image img\s*\{[\s\S]*?position:\s*static !important/);
  assert.match(css, /\.sm-lemon-marquee\s*\{[\s\S]*?background:\s*#fdf8f2/);
  assert.match(css, /@keyframes\s+lemon-marquee/);
  assert.match(css, /@keyframes\s+lemon-sway/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[\s\S]*sm-lemon-marquee__track/);
  assert.match(css, /@media\s*\(min-width:\s*701px\)[\s\S]*\.sm-desktop-lock/);
});
