// ==================== KO'P TILLILIK (ru — asosiy, uz, tj) ====================
const I18N = {
  ru: {
    logo_sub: 'Система контроля обеденных перерывов',
    nav_login: 'Войти', nav_register: 'Регистрация', nav_dashboard: 'Обед',
    nav_admin: 'Админ', nav_profile: 'Профиль', nav_logout: 'Выйти',

    auth_tab_login: 'Вход', auth_tab_register: 'Регистрация',
    register_note: 'Самостоятельная регистрация доступна только для номера первого администратора. Остальных сотрудников добавляет администратор из панели управления.',
    field_firstname: 'Имя', field_lastname: 'Фамилия', field_phone: 'Номер телефона',
    field_password: 'Пароль', field_password_current: 'Текущий пароль', field_password_new: 'Новый пароль',
    btn_login: 'Войти', btn_register: 'Зарегистрироваться', btn_save: 'Сохранить', btn_change_password: 'Изменить пароль',
    captcha_label: 'Проверка', captcha_loading: 'загрузка...',

    dashboard_title: '🕐 Контроль обеда', dashboard_subtitle: 'Управление временем обеденного перерыва сотрудников',
    self_label: 'Ваш статус',
    self_none_title: 'Вы ещё не уходили на обед', self_none_btn: '🍽️ Уйти на обед',
    self_active_title: '🍽️ Вы сейчас на обеде', self_active_left: 'Ушли', self_active_return: 'Ожидаемое возвращение',
    self_active_btn: '✅ Я вернулся',
    self_queued_title: '⏳ Вы в очереди', self_queued_note: 'Вас автоматически пропустят, когда освободится место',
    self_queued_position: '-е место', self_queued_btn: '✖ Отменить очередь',
    self_done_title: '✅ Вы уже вернулись с обеда сегодня', self_done_btn: '🍽️ Уйти снова',

    stat_active: 'Сейчас на обеде', stat_queue: 'В очереди', stat_notgone: 'Ещё не уходили',
    section_active: '🍽️ Сейчас на обеде', section_queue: '⏳ Ожидают очереди', section_notgone: '🕓 Ещё не уходили сегодня',
    empty_active: 'Сейчас никого нет на обеде', empty_queue: 'Очередь пуста', empty_notgone: 'Все уже сходили',

    admin_title: '⚙️ Админ — Контроль обеда', admin_subtitle: 'Отслеживание и настройка обеденных перерывов сотрудников',
    admin_stat_completed: 'Вернулись сегодня',
    section_settings: '🛠 Настройки', label_duration: 'Длительность обеда (минут)', label_maxconcurrent: 'Сколько человек может уйти одновременно',
    btn_save_settings: '💾 Сохранить',
    section_history: '📋 История', btn_show: 'Показать',
    th_employee: 'Сотрудник', th_left: 'Ушёл', th_return: 'Вернулся', th_status: 'Статус',
    status_active: '🍽️ На обеде', status_queued: '⏳ В очереди', status_completed: '✅ Вернулся', status_cancelled: '✖ Отменено',
    history_empty: 'Данных за эту дату нет',
    section_users: '👥 Сотрудники', th_phone: 'Телефон', th_role: 'Роль', th_action: 'Действие',
    role_admin: '⭐ Админ', role_employee: 'Сотрудник', banned_label: '🚫 Заблокирован',
    btn_ban: 'Заблокировать', btn_unban: 'Разблокировать', btn_make_admin: 'Сделать админом', btn_remove_admin: 'Снять админа',

    section_add_employee: '➕ Добавить сотрудника', btn_add_employee: 'Добавить',
    section_danger: '⚠️ Опасная зона',
    wipe_note: 'Удалить всех сотрудников (кроме вас) и всю историю обедов — для чистого старта.',
    btn_wipe_all: 'Очистить всех сотрудников',
    wipe_confirm: 'Удалить ВСЕХ сотрудников и всю историю обедов? Это действие необратимо.',

    profile_title: '👤 Профиль',

    toast_went: '🍽️ Вы ушли на обед!', toast_queued: '⏳ Вы поставлены в очередь',
    toast_returned: '✅ С возвращением!', toast_queue_cancelled: 'Очередь отменена',
    toast_saved: '✅ Сохранено', toast_updated: '✅ Обновлено', toast_password_changed: '✅ Пароль изменён',
    toast_settings_saved: '✅ Настройки сохранены',
    toast_employee_created: '✅ Сотрудник добавлен', toast_wipe_done: '✅ Все сотрудники удалены',
  },
  uz: {
    logo_sub: 'Xodimlarning abet vaqtini nazorat qilish tizimi',
    nav_login: 'Kirish', nav_register: "Ro'yxatdan o'tish", nav_dashboard: 'Abet',
    nav_admin: 'Admin', nav_profile: 'Profil', nav_logout: 'Chiqish',

    auth_tab_login: 'Kirish', auth_tab_register: "Ro'yxatdan o'tish",
    register_note: "O'z-o'zidan ro'yxatdan o'tish faqat birinchi admin raqami uchun ochiq. Qolgan xodimlarni admin boshqaruv panelidan qo'shadi.",
    field_firstname: 'Ism', field_lastname: 'Familiya', field_phone: 'Telefon raqam',
    field_password: 'Parol', field_password_current: 'Joriy parol', field_password_new: 'Yangi parol',
    btn_login: 'Kirish', btn_register: "Ro'yxatdan o'tish", btn_save: 'Saqlash', btn_change_password: "Parolni o'zgartirish",
    captcha_label: 'Tekshiruv', captcha_loading: 'yuklanmoqda...',

    dashboard_title: '🕐 Abet Nazorati', dashboard_subtitle: 'Xodimlarning tushlik tanaffusiga chiqish vaqtini boshqarish',
    self_label: 'Sizning holatingiz',
    self_none_title: 'Hali abetga chiqmadingiz', self_none_btn: '🍽️ Abetga chiqish',
    self_active_title: '🍽️ Siz hozir abetdasiz', self_active_left: 'Chiqdingiz', self_active_return: 'Taxminiy qaytish',
    self_active_btn: '✅ Qaytdim',
    self_queued_title: '⏳ Navbatdasiz', self_queued_note: "Joy bo'shashi bilan avtomatik chiqarilasiz",
    self_queued_position: '-o\'rin', self_queued_btn: '✖ Navbatni bekor qilish',
    self_done_title: '✅ Bugun abetdan qaytdingiz', self_done_btn: '🍽️ Yana chiqish',

    stat_active: 'Hozir abetda', stat_queue: 'Navbatda', stat_notgone: 'Hali chiqmagan',
    section_active: '🍽️ Hozir abetda', section_queue: '⏳ Navbatda kutayotganlar', section_notgone: '🕓 Bugun hali chiqmaganlar',
    empty_active: "Hozir hech kim abetda emas", empty_queue: "Navbat bo'sh", empty_notgone: "Hammasi chiqib ulgurdi",

    admin_title: '⚙️ Admin — Abet nazorati', admin_subtitle: "Barcha xodimlarning abet holatini kuzatish va sozlash",
    admin_stat_completed: 'Bugun qaytganlar',
    section_settings: '🛠 Sozlamalar', label_duration: 'Abet davomiyligi (daqiqa)', label_maxconcurrent: 'Bir vaqtda nechta kishi chiqishi mumkin',
    btn_save_settings: '💾 Saqlash',
    section_history: '📋 Tarix', btn_show: "Ko'rsatish",
    th_employee: 'Xodim', th_left: 'Chiqdi', th_return: 'Qaytdi', th_status: 'Holat',
    status_active: '🍽️ Abetda', status_queued: '⏳ Navbatda', status_completed: '✅ Qaytgan', status_cancelled: '✖ Bekor qilingan',
    history_empty: "Bu sana uchun ma'lumot yo'q",
    section_users: '👥 Xodimlar', th_phone: 'Telefon', th_role: 'Rol', th_action: 'Amal',
    role_admin: '⭐ Admin', role_employee: 'Xodim', banned_label: '🚫 Bloklangan',
    btn_ban: 'Bloklash', btn_unban: 'Blokdan chiqarish', btn_make_admin: 'Admin qilish', btn_remove_admin: 'Admin olish',

    section_add_employee: "➕ Xodim qo'shish", btn_add_employee: "Qo'shish",
    section_danger: "⚠️ Xavfli hudud",
    wipe_note: "Barcha xodimlarni (sizdan tashqari) va abet tarixini butunlay o'chirish — nol nuqtadan boshlash uchun.",
    btn_wipe_all: 'Barcha xodimlarni tozalash',
    wipe_confirm: "BARCHA xodimlar va abet tarixi o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi. Davom etaymi?",

    profile_title: '👤 Profil',

    toast_went: '🍽️ Abetga chiqdingiz!', toast_queued: "⏳ Navbatga qo'yildingiz",
    toast_returned: '✅ Qaytdingiz!', toast_queue_cancelled: 'Navbat bekor qilindi',
    toast_saved: '✅ Saqlandi', toast_updated: '✅ Yangilandi', toast_password_changed: "✅ Parol o'zgartirildi",
    toast_settings_saved: '✅ Sozlamalar saqlandi',
    toast_employee_created: "✅ Xodim qo'shildi", toast_wipe_done: '✅ Barcha xodimlar tozalandi',
  },
  tj: {
    logo_sub: 'Низоми назорати вақти танаффуси хӯроки корманд',
    nav_login: 'Даромадан', nav_register: 'Бақайдгирӣ', nav_dashboard: 'Танаффус',
    nav_admin: 'Админ', nav_profile: 'Профил', nav_logout: 'Баромадан',

    auth_tab_login: 'Вуруд', auth_tab_register: 'Бақайдгирӣ',
    register_note: 'Бақайдгирии мустақилона танҳо барои рақами администратори якум кушода аст. Дигар кормандонро администратор аз панели идора илова мекунад.',
    field_firstname: 'Ном', field_lastname: 'Насаб', field_phone: 'Рақами телефон',
    field_password: 'Парол', field_password_current: 'Пароли ҷорӣ', field_password_new: 'Пароли нав',
    btn_login: 'Даромадан', btn_register: 'Бақайдгирӣ кардан', btn_save: 'Сабт кардан', btn_change_password: 'Тағйир додани парол',
    captcha_label: 'Санҷиш', captcha_loading: 'боркунӣ...',

    dashboard_title: '🕐 Назорати танаффус', dashboard_subtitle: 'Идоракунии вақти танаффуси хӯроки кормандон',
    self_label: 'Ҳолати шумо',
    self_none_title: 'Шумо ҳанӯз ба танаффус нарафтаед', self_none_btn: '🍽️ Ба танаффус рафтан',
    self_active_title: '🍽️ Шумо ҳозир дар танаффус ҳастед', self_active_left: 'Рафтед', self_active_return: 'Баргаштани тахминӣ',
    self_active_btn: '✅ Баргаштам',
    self_queued_title: '⏳ Шумо дар навбат ҳастед', self_queued_note: 'Ҳамин ки ҷой холӣ шавад, ба таври худкор дароварда мешавед',
    self_queued_position: '-ум ҷой', self_queued_btn: '✖ Бекор кардани навбат',
    self_done_title: '✅ Имрӯз аз танаффус баргаштед', self_done_btn: '🍽️ Боз рафтан',

    stat_active: 'Ҳозир дар танаффус', stat_queue: 'Дар навбат', stat_notgone: 'Ҳанӯз нарафта',
    section_active: '🍽️ Ҳозир дар танаффус', section_queue: '⏳ Дар навбат интизоршаванда', section_notgone: '🕓 Имрӯз ҳанӯз нарафтаҳо',
    empty_active: 'Ҳозир касе дар танаффус нест', empty_queue: 'Навбат холист', empty_notgone: 'Ҳама аллакай рафтаанд',

    admin_title: '⚙️ Админ — Назорати танаффус', admin_subtitle: 'Назорат ва танзими танаффуси ҳамаи кормандон',
    admin_stat_completed: 'Имрӯз баргаштагон',
    section_settings: '🛠 Танзимот', label_duration: 'Давомнокии танаффус (дақиқа)', label_maxconcurrent: 'Дар як вақт чанд нафар рафта метавонанд',
    btn_save_settings: '💾 Сабт кардан',
    section_history: '📋 Таърих', btn_show: 'Нишон додан',
    th_employee: 'Корманд', th_left: 'Рафт', th_return: 'Баргашт', th_status: 'Ҳолат',
    status_active: '🍽️ Дар танаффус', status_queued: '⏳ Дар навбат', status_completed: '✅ Баргашт', status_cancelled: '✖ Бекоршуда',
    history_empty: 'Барои ин сана маълумот нест',
    section_users: '👥 Кормандон', th_phone: 'Телефон', th_role: 'Нақш', th_action: 'Амал',
    role_admin: '⭐ Админ', role_employee: 'Корманд', banned_label: '🚫 Баста',
    btn_ban: 'Бастан', btn_unban: 'Кушодан', btn_make_admin: 'Админ кардан', btn_remove_admin: 'Админро гирифтан',

    section_add_employee: '➕ Илова кардани корманд', btn_add_employee: 'Илова кардан',
    section_danger: '⚠️ Минтақаи хатарнок',
    wipe_note: 'Ҳамаи кормандонро (ба ғайр аз шумо) ва таърихи танаффусро тоза кардан — барои сар кардан аз нав.',
    btn_wipe_all: 'Ҳамаи кормандонро тоза кардан',
    wipe_confirm: 'ҲАМАИ кормандон ва таърихи танаффус нест карда мешавад. Ин амалро баргардонидан мумкин нест. Идома медиҳед?',

    profile_title: '👤 Профил',

    toast_went: '🍽️ Шумо ба танаффус рафтед!', toast_queued: '⏳ Шумо ба навбат гузошта шудед',
    toast_returned: '✅ Хуш омадед!', toast_queue_cancelled: 'Навбат бекор карда шуд',
    toast_saved: '✅ Сабт шуд', toast_updated: '✅ Навсозӣ шуд', toast_password_changed: '✅ Парол тағйир ёфт',
    toast_settings_saved: '✅ Танзимот сабт шуд',
    toast_employee_created: '✅ Корманд илова карда шуд', toast_wipe_done: '✅ Ҳамаи кормандон тоза карда шуданд',
  },
};

function t(key) {
  const lang = window.currentLang || 'ru';
  return (I18N[lang] && I18N[lang][key]) || I18N.ru[key] || key;
}
