const SITE_DATA = {
  MAIN_DATE: "22.08.2026",
  MAIN_TEXT_CALENDAR: "",
  GROOM: "Артур",
  BRIDE: "Дарья",
  COVER_PHOTO: "./assets/double-mobile.webp",
  HELLO_TITLE: "Дорогие<br>гости!",
  HELLO_TEXT: "<p>Настал момент, когда мы больше не можем терпеть пустоту на 14-й странице наших паспортов. Именно поэтому мы решили узаконить свою любовь.</p><p>Будем счастливы, если в этот день вы разделите с нами эту радость и станете частью нашего торжества.</p>",
  LOCATION_TITLE: "Локация",
  LOCATION_SUBTITLE: "Центральный ЗАГС г. Воронеж",
  LOCATION_TEXT: "<p><strong>Сбор гостей у ЗАГСа</strong> начнётся в 13:30, а церемония регистрации — в 14:00.</p><p><strong>Ждём вас по адресу</strong>: Воронеж, площадь Ленина, 11.</p><p>Вход во Дворец бракосочетания — через кованые ворота с боковой стороны здания.</p>",
  LOCATION_PHOTO: "./assets/location-zags-mobile.webp",
  LOCATION_MAP: "https://yandex.ru/maps/?text=Воронеж%2C%20площадь%20Ленина%2C%2011",
  TIMING_TITLE: "План дня",
  TIMING_SUBTITLE: "",
  TIMING_1_0: "13:30",
  TIMING_1_1: "Сбор гостей у ЗАГСа",
  TIMING_2_0: "14:00",
  TIMING_2_1: "Церемония регистрации",
  TIMING_3_0: "15:30",
  TIMING_3_1: "Банкет",
  TIMING_4_0: "22:00",
  TIMING_4_1: "Конец торжества",
  DRESSCODE_TITLE: "Дресс-код",
  DRESSCODE_TEXT: "<p>Мы рады сообщить, что дресс-кода на нашей свадьбе не будет, но будем благодарны, если вы выберете однотонные образы без броских принтов.</p><p>Если вы хотите поддержать цветовую гамму нашей свадьбы, мы будем рады.</p>",
  DRESSCODE_COLORS: ["#242520", "#8D7350", "#D8C49A", "#A5B487", "#F5C242"],
  TIMER_TITLE: "До свадьбы осталось",
  TIMER_SUBTITLE: "Waiting for you!",
  WISH_TITLE: "Детали",
  WISH_SUBTITLE: "",
  WISH_CARD_1_TITLE: "Подарки",
  WISH_CARD_1_TEXT: "<p>Свои тёплые слова и пожелания приносите в сердцах, а подарки — в конверте.</p>",
  WISH_CARD_2_TITLE: "Цветы",
  WISH_CARD_2_TEXT: "<p>Вместо цветов можно подарить любимую книгу или что-то для нашего дома. Нам будет особенно приятно сохранить это надолго.</p>",
  WISH_CARD_3_TITLE: "Трансфер",
  WISH_CARD_3_TEXT: "<p>До места банкета и обратно будет организован трансфер. Если вы хотите добираться на своём авто, пожалуйста, сообщите нам заранее.</p>",
  WISH_WISHLIST: "",
  CONTACTS_TITLE: "",
  CONTACTS_TEXT: "",
  CONTACTS_NAME: "",
  CONTACTS_PHOTO_ONE: "",
  GROOM_TEL: "+7 910 321 05 99",
  BRIDE_TEL: "+7 920 581 32 73",
  CONTACT_LINK: "",
  ANKETA_TITLE: "Анкета гостя",
  ANKETA_TEXT: "Пожалуйста, подтвердите ваше присутствие на нашей свадьбе до",
  ANKETA_PHOTO: "./assets/double.png",
  BEFORE_DATE: "07.02.2026",
  ANKETA_QUESTION: "Планируете ли вы присутствовать?",
  ANKETA_ANSWER1: "С удовольствием приду!",
  ANKETA_ANSWER2: "К сожалению, не смогу",
  ANKETA_DRINKS_QUESTION: "Ваши предпочтения",
  ANKETA_DRINKS: ["Шампанское", "Белое вино", "Красное вино", "Виски", "Водка", "Джин", "Коньяк", "Сидр", "Не пью алкоголь"],
  BYE_TITLE: "С любовью",
  BYE_SUBTITLE: "До скорой встречи!",
  BYE_PHOTO_ONE: "./assets/final-couch-mobile.webp"
};

const MONTHS_GENITIVE = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const MONTHS_NOMINATIVE = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

function asAbsoluteUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (/^\.{0,2}\//.test(path) || !path.startsWith("/")) return path;
  return `https://wedwed.ru${path.startsWith("/") ? path : `/${path}`}`;
}

function parseDate(value) {
  const [day, month, year] = value.split(".").map(Number);
  return new Date(year, month - 1, day);
}

function setDigits(container, value, minLength) {
  const formatted = String(value).padStart(minLength, "0");
  container.innerHTML = "";
  [...formatted].forEach((char) => {
    const wrapper = document.createElement("div");
    wrapper.className = "sm-timer-time_number sm-time__item_number";
    wrapper.innerHTML = `<span class="sm-timer-time_number-span">${char}</span>`;
    container.appendChild(wrapper);
  });
}

function fillTextData() {
  document.querySelectorAll("[data-sm-text]").forEach((node) => {
    const key = node.getAttribute("data-sm-text");
    const value = SITE_DATA[key];
    if (value == null) return;
    node.innerHTML = value;
  });
}

function fillMediaData() {
  document.querySelectorAll("[data-sm-src]").forEach((node) => {
    const key = node.getAttribute("data-sm-src");
    const value = SITE_DATA[key];
    if (!value) return;
    node.src = asAbsoluteUrl(value);
  });

  document.querySelectorAll("[data-sm-href]").forEach((node) => {
    const key = node.getAttribute("data-sm-href");
    const value = SITE_DATA[key];
    if (!value || (typeof value === "object" && !value.value)) {
      node.classList.add("is-hidden");
      return;
    }
    const href = typeof value === "string" ? value : value.value;
    node.href = href;
  });

  document.querySelectorAll("[data-sm-tel]").forEach((node) => {
    const key = node.getAttribute("data-sm-tel");
    const value = SITE_DATA[key];
    if (!value) return;
    node.textContent = value;
    node.href = `tel:${value.replace(/\s+/g, "")}`;
  });
}

function fillDateData() {
  const date = parseDate(SITE_DATA.MAIN_DATE);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  document.querySelectorAll("[data-sm-day]").forEach((node) => {
    node.textContent = dd;
  });
  document.querySelectorAll("[data-sm-month]").forEach((node) => {
    node.textContent = mm;
  });
  document.querySelectorAll("[data-sm-year]").forEach((node) => {
    node.textContent = yy;
  });
  document.querySelectorAll("[data-sm-tmonth]").forEach((node) => {
    node.textContent = MONTHS_NOMINATIVE[date.getMonth()];
  });

  const beforeDate = parseDate(SITE_DATA.BEFORE_DATE);
  document.querySelectorAll("[data-sm-bday]").forEach((node) => {
    node.textContent = String(beforeDate.getDate()).padStart(2, "0");
  });
  document.querySelectorAll("[data-sm-bmonth-rod]").forEach((node) => {
    node.textContent = MONTHS_GENITIVE[beforeDate.getMonth()];
  });
  document.querySelectorAll("[data-sm-bfyear]").forEach((node) => {
    node.textContent = beforeDate.getFullYear();
  });
}

function buildCalendar() {
  const date = parseDate(SITE_DATA.MAIN_DATE);
  const container = document.querySelector("[data-calendar]");
  if (!container) return;

  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const start = (firstDay.getDay() + 6) % 7;

  container.innerHTML = "";

  WEEK_DAYS.forEach((day) => {
    const item = document.createElement("div");
    item.className = "sm-calendar-day-week-title";
    item.textContent = day;
    container.appendChild(item);
  });

  for (let i = 0; i < start; i += 1) {
    const spacer = document.createElement("div");
    spacer.className = "sm-calendar-day";
    spacer.textContent = "";
    container.appendChild(spacer);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const item = document.createElement("div");
    item.className = `sm-calendar-day${day === date.getDate() ? " sm-number-active" : ""}`;
    item.textContent = day;
    container.appendChild(item);
  }
}

function buildDresscodeColors() {
  const root = document.querySelector("[data-dresscode-colors]");
  if (!root) return;
  root.innerHTML = "";

  SITE_DATA.DRESSCODE_COLORS.forEach((color) => {
    const outer = document.createElement("div");
    outer.className = "sm_colors";
    const inner = document.createElement("div");
    inner.style.background = color;
    outer.appendChild(inner);
    root.appendChild(outer);
  });
}

function initTimer() {
  const target = parseDate(SITE_DATA.MAIN_DATE);
  const nodes = {
    days: document.querySelector('[data-timer="days"]') || document.querySelector("#days"),
    hours: document.querySelector('[data-timer="hours"]') || document.querySelector("#hours"),
    minutes: document.querySelector('[data-timer="minutes"]') || document.querySelector("#minutes"),
    seconds: document.querySelector('[data-timer="seconds"]') || document.querySelector("#seconds")
  };

  if (!nodes.days || !nodes.hours || !nodes.minutes || !nodes.seconds) return;

  function render() {
    const diff = Math.max(0, target.getTime() - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setDigits(nodes.days, days, 3);
    setDigits(nodes.hours, hours, 2);
    setDigits(nodes.minutes, minutes, 2);
    setDigits(nodes.seconds, seconds, 2);
  }

  render();
  window.setInterval(render, 1000);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("item-active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".item-animation").forEach((node) => observer.observe(node));
}

function initDecorMotion() {
  const items = [...document.querySelectorAll(".item-rotate-scroll")];
  if (!items.length) return;

  let lastScrollY = window.scrollY || window.pageYOffset || 0;
  let currentRotation = 0;

  const render = () => {
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const scrollDelta = currentScrollY - lastScrollY;
    currentRotation += scrollDelta * 0.2;

    items.forEach((item) => {
      item.style.transform = `rotate(${currentRotation}deg)`;
      item.style.transition = "transform 0.1s ease-out";
    });

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", render, { passive: true });
  render();
}

function initSmoothScroll() {
  document.querySelectorAll("[data-scroll-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = button.closest("section");
      const next = current?.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function init() {
  fillTextData();
  fillMediaData();
  fillDateData();
  buildCalendar();
  buildDresscodeColors();
  initTimer();
  initScrollAnimations();
  initDecorMotion();
  initSmoothScroll();
}

document.addEventListener("DOMContentLoaded", init);
