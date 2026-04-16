const SITE_DATA = {
  MAIN_DATE: "22.08.2026",
  MAIN_TEXT_CALENDAR: "Save the date!",
  GROOM: "Артур",
  BRIDE: "Дарья",
  COVER_PHOTO: "/userdata/189005/b36a904db219f2a9ebd46d0f41ac500a/images/cover_photo_1770083371-2227.webp",
  HELLO_TITLE: "Дорогие друзья!",
  HELLO_TEXT: "Это официальное приглашение на нашу свадьбу! А получили вы его потому, что мы очень хотим видеть вас в этот день рядом с нами!",
  LOCATION_TITLE: "Место проведения",
  LOCATION_SUBTITLE: "Save the place!",
  LOCATION_TEXT: "<p>Банкетный зал “Дача”, ул. Придорожная 22</p>",
  LOCATION_PHOTO: "/userdata/189005/b36a904db219f2a9ebd46d0f41ac500a/images/location_photo_1769801828-6198.webp",
  LOCATION_MAP: "https://yandex.ru/maps/org/dacha/188248980856/?ll=39.370572%2C46.347123&z=16.52",
  TIMING_TITLE: "Тайминг",
  TIMING_SUBTITLE: "Of the day",
  TIMING_1_0: "12:00",
  TIMING_1_1: "Выкуп, ул. Набережная 27",
  TIMING_2_0: "14:00",
  TIMING_2_1: "Церемония регистрации, \"Дача\"",
  TIMING_3_0: "16:30",
  TIMING_3_1: "Банкет, \"Дача\"",
  TIMING_4_0: "23:00",
  TIMING_4_1: "Завершение вечера",
  DRESSCODE_TITLE: "Дресс-код",
  DRESSCODE_TEXT: "<p>Мы очень ждём и готовимся к нашему незабываемому дню! Тематическое оформление свадьбы - средневековье стран Скандинавии. Поддержите нас Вашими улыбками и объятиями, а также красивыми нарядами в стиле мероприятия</p>",
  DRESSCODE_COLORS: ["#c9b8a9", "#acc487", "#c4b66e", "#a2d84f", "#44813b", "#72531d"],
  TIMER_TITLE: "До свадьбы осталось",
  TIMER_SUBTITLE: "Waiting for you!",
  WISH_TITLE: "Пожелания",
  WISH_SUBTITLE: "Our wishes",
  WISH_TEXT_ITEMS_0: "<p>Приятным комплиментом для нас будет бутылочка вашего любимого вина, которую мы откроем на ближайшем совместном празднике.&nbsp;</p>",
  WISH_TEXT_ITEMS_1: "<p>Ваши улыбки и смех подарят нам незабываемое счастье в этот день, а пожелания в конвертах помогут осуществить наши мечты!</p>",
  WISH_TEXT_ITEMS_2: "<p>Будем очень признательны, если Вы воздержитесь от криков «Горько». Ведь поцелуй – это знак выражения чувств, и он не может быть по заказу.</p>",
  WISH_WISHLIST: "",
  CONTACTS_TITLE: "Контакты",
  CONTACTS_TEXT: "<p>По всем вопросам, связанным с мероприятием, вы можете обратиться к нашим любимым мамам</p>",
  CONTACTS_NAME: "Юлия и Виктория",
  CONTACTS_PHOTO_ONE: "/userdata/189005/b36a904db219f2a9ebd46d0f41ac500a/images/contacts_photo_one_1770036900-7766.webp",
  GROOM_TEL: "+79282684282   +79615000271",
  CONTACT_LINK: "",
  ANKETA_TITLE: "Анкета гостя",
  ANKETA_TEXT: "Пожалуйста, подтвердите ваше присутствие на нашей свадьбе до",
  ANKETA_PHOTO: "/userdata/189005/b36a904db219f2a9ebd46d0f41ac500a/images/cover_photo_1770083371-2227.webp",
  BEFORE_DATE: "07.02.2026",
  ANKETA_QUESTION: "Планируете ли вы присутствовать?",
  ANKETA_ANSWER1: "С удовольствием приду!",
  ANKETA_ANSWER2: "К сожалению, не смогу",
  ANKETA_DRINKS_QUESTION: "Ваши предпочтения",
  ANKETA_DRINKS: ["Шампанское", "Белое вино", "Красное вино", "Виски", "Водка", "Джин", "Коньяк", "Сидр", "Не пью алкоголь"],
  BYE_TITLE: "С любовью",
  BYE_SUBTITLE: "До скорой встречи!",
  BYE_PHOTO_ONE: "/userdata/189005/b36a904db219f2a9ebd46d0f41ac500a/images/bye_photo_one_1770083040-2518.webp"
};

const MONTHS_GENITIVE = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const MONTHS_NOMINATIVE = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
const WEEK_DAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

function asAbsoluteUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
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

function buildDrinks() {
  const list = document.querySelector("[data-drinks-list]");
  if (!list) return;
  list.innerHTML = "";

  SITE_DATA.ANKETA_DRINKS.forEach((drink, index) => {
    const wrap = document.createElement("div");
    wrap.className = "sm-form__drinks-check";
    wrap.innerHTML = `
      <label class="sm-form_checkbox">
        <input class="sm-form_checkbox_input" type="checkbox" name="drinks" value="${drink}" id="drink-${index}">
        <span class="sm-form_checkbox_box"></span>
        <div data-sm-alcoitem>${drink}</div>
      </label>
    `;
    list.appendChild(wrap);
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

function initWishesSlider() {
  const slides = [...document.querySelectorAll(".sm-wishes__content-item")];
  const prev = document.querySelector("[data-wish-prev]") || document.querySelector(".sm-arrow-prev");
  const next = document.querySelector("[data-wish-next]") || document.querySelector(".sm-arrow-next");
  const current = document.querySelector("[data-current-slide]") || document.querySelector("#current-slide");
  const total = document.querySelector("[data-total-slides]") || document.querySelector("#count-slides");
  if (!slides.length || !prev || !next || !current || !total) return;

  let index = 0;
  total.textContent = slides.length;

  const render = () => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
    current.textContent = index + 1;
  };

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    render();
  });

  render();
}

function setModalState(modal, open) {
  modal.classList.toggle("sm-open", open);
  document.body.classList.toggle("lock", open);
}

function initModals() {
  const questionnaire = document.querySelector(".sm-questionnaire");
  const thankYou = document.querySelector("#thankYouMessage");
  if (!questionnaire || !thankYou) return;

  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", () => setModalState(questionnaire, true));
  });

  [...document.querySelectorAll(".sm-modal-close")].forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".sm-modal");
      if (modal) setModalState(modal, false);
    });
  });

  questionnaire.addEventListener("click", (event) => {
    if (event.target === questionnaire) setModalState(questionnaire, false);
  });

  thankYou.addEventListener("click", (event) => {
    if (event.target === thankYou) setModalState(thankYou, false);
  });

  const form = document.querySelector("[data-rsvp-form]") || questionnaire.querySelector("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      setModalState(questionnaire, false);
      setModalState(thankYou, true);
      form.reset();
    });
  }
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
  const decorNodes = [...document.querySelectorAll(
    ".sm-decor01, .sm-decor02, .sm-decor03, .sm-decor-flower01, .sm-decor-flower02, .sm-decor-flower04, .sm-decor-line"
  )];

  if (!decorNodes.length) return;

  const animated = decorNodes.map((node, index) => ({
    node,
    baseTransform: getComputedStyle(node).transform === "none" ? "" : getComputedStyle(node).transform,
    phase: index * 0.85,
    drift: node.classList.contains("sm-decor-line") ? 4 : 7,
    rotation: node.classList.contains("sm-decor-line") ? 0.8 : 1.8,
    speed: node.classList.contains("sm-decor-line") ? 0.0009 : 0.0014,
    scrollFactor: node.classList.contains("item-rotate-scroll") ? 0.2 : 0
  }));

  let frameId = 0;

  const render = (now) => {
    const scrollY = window.scrollY || window.pageYOffset || 0;

    animated.forEach((item) => {
      const bob = Math.sin(now * item.speed + item.phase) * item.drift;
      const twist = Math.cos(now * item.speed * 0.75 + item.phase) * item.rotation;
      const scrollRotation = scrollY * item.scrollFactor;
      const base = item.baseTransform ? `${item.baseTransform} ` : "";

      item.node.style.transform = `${base}translate3d(0, ${bob}px, 0) rotate(${twist + scrollRotation}deg)`;
    });

    frameId = window.requestAnimationFrame(render);
  };

  frameId = window.requestAnimationFrame(render);

  window.addEventListener("beforeunload", () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  }, { once: true });
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
  buildDrinks();
  initTimer();
  initWishesSlider();
  initModals();
  initScrollAnimations();
  initDecorMotion();
  initSmoothScroll();
}

document.addEventListener("DOMContentLoaded", init);
