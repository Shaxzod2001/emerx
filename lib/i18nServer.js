// Server javoblari uchun ko'p tillilik (ru — asosiy, uz, tj)
const MESSAGES = {
  captcha_required:   { ru: 'CAPTCHA обязательна', uz: 'CAPTCHA majburiy', tj: 'CAPTCHA ҳатмист' },
  captcha_wrong:      { ru: 'CAPTCHA неверна, попробуйте снова', uz: 'CAPTCHA noto\'g\'ri, qaytadan urinib ko\'ring', tj: 'CAPTCHA нодуруст, бори дигар кӯшиш кунед' },
  captcha_expired:    { ru: 'Срок CAPTCHA истёк, обновите вопрос', uz: 'CAPTCHA muddati o\'tdi, yangi savol oling', tj: 'Мӯҳлати CAPTCHA гузашт, саволи нав гиред' },
  fields_required:    { ru: 'Заполните все поля', uz: 'Barcha maydonlarni to\'ldiring', tj: 'Ҳамаи майдонҳоро пур кунед' },
  password_short:     { ru: 'Пароль должен быть не менее 6 символов', uz: 'Parol kamida 6 belgi bo\'lishi kerak', tj: 'Парол бояд on ками 6 аломат бошад' },
  password_long:      { ru: 'Пароль не должен превышать 72 символа', uz: 'Parol 72 belgidan oshmasligi kerak', tj: 'Парол набояд аз 72 аломат зиёд бошад' },
  phone_invalid:      { ru: 'Неверный формат номера телефона', uz: 'Telefon raqam formati noto\'g\'ri', tj: 'Формати рақами телефон нодуруст аст' },
  name_invalid:       { ru: 'Имя/фамилия: 2-30 символов', uz: 'Ism/familiya 2-30 belgi bo\'lishi kerak', tj: 'Ном/насаб бояд 2-30 аломат бошад' },
  phone_taken:        { ru: 'Этот номер телефона уже зарегистрирован', uz: 'Bu telefon raqam allaqachon ro\'yxatdan o\'tgan', tj: 'Ин рақами телефон аллакай сабти ном шудааст' },
  server_error:       { ru: 'Ошибка сервера, попробуйте снова', uz: 'Server xatosi, qayta urinib ko\'ring', tj: 'Хатои сервер, бори дигар кӯшиш кунед' },
  login_wrong:        { ru: 'Неверный номер телефона или пароль', uz: 'Telefon raqam yoki parol noto\'g\'ri', tj: 'Рақами телефон ё парол нодуруст аст' },
  banned:              { ru: 'Ваш аккаунт заблокирован. Обратитесь к администратору.', uz: 'Hisobingiz bloklangan. Admin bilan bog\'laning.', tj: 'Ҳисоби шумо баста шудааст. Бо администратор тамос гиред.' },
  user_not_found:      { ru: 'Пользователь не найден', uz: 'Foydalanuvchi topilmadi', tj: 'Корбар ёфт нашуд' },

  already_active:      { ru: 'Вы уже на обеде', uz: 'Siz allaqachon abetdasiz', tj: 'Шумо аллакай дар танаффус ҳастед' },
  already_queued:      { ru: 'Вы уже в очереди', uz: 'Siz allaqachon navbatdasiz', tj: 'Шумо аллакай дар навбат ҳастед' },
  already_booked:      { ru: 'У вас уже есть бронь на сегодня', uz: 'Sizda bugunga band qilingan vaqt bor', tj: 'Шумо барои имрӯз аллакай вақт брон кардаед' },
  slot_invalid:        { ru: 'Неверное время', uz: "Noto'g'ri vaqt", tj: 'Вақти нодуруст' },
  slot_past:           { ru: 'Нельзя забронировать прошедшее время', uz: "O'tgan vaqtni band qilib bo'lmaydi", tj: 'Вақти гузаштаро брон кардан мумкин нест' },
  slot_full:           { ru: 'В это время нет свободных мест', uz: "Bu vaqtda bo'sh joy yo'q", tj: 'Дар ин вақт ҷои холӣ нест' },
  no_booking:          { ru: 'У вас нет брони', uz: "Sizda band qilingan vaqt yo'q", tj: 'Шумо брон надоред' },
  not_in_queue:        { ru: 'Вы не в очереди', uz: 'Siz navbatda emassiz', tj: 'Шумо дар навбат нестед' },
  not_active:          { ru: 'Вы сейчас не на обеде', uz: 'Siz hozir abetda emassiz', tj: 'Шумо ҳозир дар танаффус нестед' },
  duration_range:      { ru: 'Продолжительность обеда должна быть 1-480 минут', uz: 'Abet davomiyligi 1-480 daqiqa oralig\'ida bo\'lishi kerak', tj: 'Давомнокии танаффус бояд 1-480 дақиқа бошад' },
  max_range:           { ru: 'Одновременный лимит должен быть 1-50', uz: 'Bir vaqtdagi limit 1-50 oralig\'ida bo\'lishi kerak', tj: 'Ҳадди ҳамзамон бояд 1-50 бошад' },

  nothing_changed:     { ru: 'Ничего не изменено', uz: 'Hech narsa o\'zgartirilmadi', tj: 'Ҳеҷ чиз тағйир наёфт' },
  current_pass_wrong:  { ru: 'Текущий пароль неверен', uz: 'Joriy parol noto\'g\'ri', tj: 'Пароли ҷорӣ нодуруст аст' },

  self_manage:         { ru: 'Вы не можете управлять собой', uz: 'O\'zingizni boshqara olmaysiz', tj: 'Шумо наметавонед худро идора кунед' },
  self_ban:            { ru: 'Вы не можете заблокировать себя', uz: 'O\'zingizni ban qila olmaysiz', tj: 'Шумо наметавонед худро баста кунед' },
  self_delete:         { ru: 'Вы не можете удалить себя', uz: 'O\'zingizni o\'chira olmaysiz', tj: 'Шумо наметавонед худро нест кунед' },
  not_found:           { ru: 'Не найдено', uz: 'Topilmadi', tj: 'Ёфт нашуд' },
  no_access:           { ru: 'Требуется доступ администратора', uz: 'Admin huquqi kerak', tj: 'Ҳуқуқи администратор лозим аст' },
  auth_required:       { ru: 'Требуется авторизация', uz: 'Avtorizatsiya kerak', tj: 'Санҷиши ҳувият лозим аст' },
  token_invalid:       { ru: 'Неверный токен', uz: 'Token noto\'g\'ri', tj: 'Токен нодуруст аст' },
  no_token:            { ru: 'Нет токена', uz: 'Token yo\'q', tj: 'Токен нест' },

  registration_closed: { ru: 'Самостоятельная регистрация закрыта. Обратитесь к администратору.', uz: 'Ro\'yxatdan o\'tish yopiq. Admin bilan bog\'laning.', tj: 'Бақайдгирии мустақилона баста аст. Бо администратор тамос гиред.' },
  employee_created:    { ru: 'Сотрудник добавлен', uz: 'Xodim qo\'shildi', tj: 'Корманд илова карда шуд' },
  wipe_done:           { ru: 'Все сотрудники удалены', uz: 'Barcha xodimlar tozalandi', tj: 'Ҳамаи кормандон тоза карда шуданд' },
};

function t(key, lang = 'ru') {
  const entry = MESSAGES[key];
  if (!entry) return key;
  return entry[lang] || entry.ru;
}

function getLang(req) {
  const lang = (req.headers['x-lang'] || '').toLowerCase();
  return ['ru', 'uz', 'tj'].includes(lang) ? lang : 'ru';
}

module.exports = { t, getLang };
