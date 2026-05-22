// ============================================================
//  LEVEL 1 — BOSHLANG'ICH | НАЧАЛЬНЫЙ | BEGINNER  (1-oy)
//  4 hafta × 3 dars = 12 dars
// ============================================================
module.exports = [
  // ─────────────────────────────────────────────
  //  KURS 1 — 1-hafta: Kiberxavfsizlik dunyosiga kirish
  // ─────────────────────────────────────────────
  {
    id:"c1w1", level:1, week:1, icon:"🛡️", color:"#00ff88",
    title:{ uz:"Kiberxavfsizlik Dunyosi", ru:"Мир кибербезопасности", en:"The World of Cybersecurity" },
    desc:{ uz:"Kiberxavfsizlik nima, nima uchun kerak va qanday boshlash kerak — mutlaq boshlang'ichlar uchun", ru:"Что такое кибербезопасность, зачем она нужна и как начать — для полных новичков", en:"What is cybersecurity, why it matters and how to start — for absolute beginners" },
    duration:{ uz:"3 × 25 daqiqa", ru:"3 × 25 минут", en:"3 × 25 minutes" },
    lessons:[
      {
        id:"c1w1l1",
        title:{ uz:"Kiberxavfsizlik nima?", ru:"Что такое кибербезопасность?", en:"What is Cybersecurity?" },
        duration:"25 daq",
        content:{
          uz:`<h2>Kiberxavfsizlik nima?</h2>
<p>Tasavvur qiling: siz katta bir uyda yashaydisiz. Eshiklar qulfli, derazalar yopiq, signalizatsiya bor. Bu — <strong>fizik xavfsizlik</strong>.</p>
<p>Endi tasavvur qiling: bu uy <em>raqamli</em> — kompyuter, telefon, internet. Ularga kimdir kirib, ma'lumotlaringizni o'g'irlamasligi yoki buzmasligi uchun g'amxo'rlik qilish — bu <strong>kiberxavfsizlik</strong>.</p>
<div class="info-box">
<p><strong>Oddiy ta'rif:</strong> Kiberxavfsizlik — raqamli qurilmalar, tarmoqlar va ma'lumotlarni ruxsatsiz kirishdan himoya qilish san'ati va fani.</p>
</div>
<h3>🏠 Real hayotdan misol</h3>
<p>2023-yilda O'zbekistonda 1 200+ kiberxujum qayd etildi. Banklar, davlat idoralari, oddiy fuqarolar — hamma nishonda. Hujumchilar parollarni o'g'irladi, pullarni yechib oldi, sirlarni fosh qildi.</p>
<h3>🎯 CIA Triada — kiberxavfsizlikning 3 ustuni</h3>
<div class="info-box">
<p><strong>C — Confidentiality (Maxfiylik):</strong> Sizning tibbiy kartangiz faqat sizga va shifokoringizga ko'rinadi, boshqaga emas.</p>
<p><strong>I — Integrity (Yaxlitlik):</strong> Bank o'tkazmangiz yo'lda o'zgartirilmagan — 1 000 000 so'm siz yuborgan, 1 000 000 so'm yetib borgan.</p>
<p><strong>A — Availability (Mavjudlik):</strong> ATM kerak paytda ishlaydi, sayt buzilmagan, xizmat to'xtamagan.</p>
</div>
<h3>💡 Kiberxavfsizlik kim uchun?</h3>
<ul>
<li><strong>Siz uchun</strong> — ijtimoiy tarmoqdagi hisobingizni himoya qilish</li>
<li><strong>Kompaniyalar uchun</strong> — mijozlar ma'lumotlarini saqlash</li>
<li><strong>Davlat uchun</strong> — milliy infratuzilmani qo'riqlash</li>
</ul>
<h3>🚀 Bu sohada nima qilish mumkin?</h3>
<ul>
<li>Penetration Tester — tizimlarni buzib, zaifliklarni topadi (yaxshi niyat bilan!)</li>
<li>Security Analyst — hujumlarni kuzatadi va to'xtatadi</li>
<li>Forensic Analyst — kiberjinoyatlarni tekshiradi</li>
<li>Security Engineer — himoya tizimlarini quradi</li>
</ul>
<p><em>Bu kurs tugaganda siz ushbu kasblarning hammasiga asos yaratgan bo'lasiz.</em></p>`,
          ru:`<h2>Что такое кибербезопасность?</h2>
<p>Представьте: вы живёте в большом доме. Двери заперты, окна закрыты, сигнализация работает. Это — <strong>физическая безопасность</strong>.</p>
<p>Теперь представьте: этот дом <em>цифровой</em> — компьютер, телефон, интернет. Защита от того, чтобы кто-то не вошёл и не украл ваши данные — это <strong>кибербезопасность</strong>.</p>
<div class="info-box">
<p><strong>Простое определение:</strong> Кибербезопасность — это искусство и наука защиты цифровых устройств, сетей и данных от несанкционированного доступа.</p>
</div>
<h3>🏠 Пример из реальной жизни</h3>
<p>В 2023 году в России зафиксировано более 14 000 кибератак на организации. Банки, госструктуры, обычные граждане — все под угрозой. Злоумышленники крали пароли, снимали деньги, раскрывали секреты.</p>
<h3>🎯 Триада CIA — 3 столпа кибербезопасности</h3>
<div class="info-box">
<p><strong>C — Confidentiality (Конфиденциальность):</strong> Ваша медкарта видна только вам и врачу, никому другому.</p>
<p><strong>I — Integrity (Целостность):</strong> Банковский перевод не изменился в пути — вы отправили 10 000 руб., дошло 10 000 руб.</p>
<p><strong>A — Availability (Доступность):</strong> Банкомат работает когда нужно, сайт не упал, сервис не остановлен.</p>
</div>
<h3>💡 Для кого кибербезопасность?</h3>
<ul>
<li><strong>Для вас</strong> — защита аккаунтов в соцсетях</li>
<li><strong>Для компаний</strong> — хранение данных клиентов</li>
<li><strong>Для государства</strong> — защита национальной инфраструктуры</li>
</ul>
<h3>🚀 Что можно делать в этой сфере?</h3>
<ul>
<li>Penetration Tester — взламывает системы, чтобы найти уязвимости (с добрыми намерениями!)</li>
<li>Security Analyst — мониторит и останавливает атаки</li>
<li>Forensic Analyst — расследует киберпреступления</li>
<li>Security Engineer — строит системы защиты</li>
</ul>`,
          en:`<h2>What is Cybersecurity?</h2>
<p>Imagine you live in a big house. Doors are locked, windows are shut, alarm is set. That's <strong>physical security</strong>.</p>
<p>Now imagine that house is <em>digital</em> — your computer, phone, internet. Making sure nobody breaks in and steals your data — that's <strong>cybersecurity</strong>.</p>
<div class="info-box">
<p><strong>Simple definition:</strong> Cybersecurity is the art and science of protecting digital devices, networks, and data from unauthorized access.</p>
</div>
<h3>🏠 Real-world example</h3>
<p>In 2023, over 800,000 cybercrime complaints were filed in the US alone. Banks, governments, and ordinary people are all targets. Attackers steal passwords, drain bank accounts, and expose secrets.</p>
<h3>🎯 The CIA Triad — 3 pillars of cybersecurity</h3>
<div class="info-box">
<p><strong>C — Confidentiality:</strong> Your medical record is visible only to you and your doctor, nobody else.</p>
<p><strong>I — Integrity:</strong> Your bank transfer wasn't changed in transit — you sent $100, $100 arrived.</p>
<p><strong>A — Availability:</strong> The ATM works when you need it, the website is up, the service hasn't stopped.</p>
</div>
<h3>💡 Who is cybersecurity for?</h3>
<ul>
<li><strong>You</strong> — protecting your social media accounts</li>
<li><strong>Companies</strong> — keeping customer data safe</li>
<li><strong>Governments</strong> — guarding national infrastructure</li>
</ul>
<h3>🚀 What can you do in this field?</h3>
<ul>
<li>Penetration Tester — breaks into systems to find vulnerabilities (with permission!)</li>
<li>Security Analyst — monitors and stops attacks</li>
<li>Forensic Analyst — investigates cybercrime</li>
<li>Security Engineer — builds defense systems</li>
</ul>`
        },
        quiz:[
          { q:{uz:"CIA triadasida 'I' harfi nimani anglatadi?",ru:"Что означает буква 'I' в триаде CIA?",en:"What does 'I' stand for in the CIA triad?"},
            options:{uz:["Internet","Integrity (Yaxlitlik)","Intelligence","Injection"],ru:["Internet","Integrity (Целостность)","Intelligence","Injection"],en:["Internet","Integrity","Intelligence","Injection"]}, answer:1 },
          { q:{uz:"Penetration Tester nima qiladi?",ru:"Чем занимается Penetration Tester?",en:"What does a Penetration Tester do?"},
            options:{uz:["Tarmoqni o'rnatadi","Ruxsat bilan tizimlarni sinab buzadi","Parollarni saqlaydi","Internetni tezlashtiradi"],ru:["Устанавливает сеть","Взламывает системы с разрешения","Хранит пароли","Ускоряет интернет"],en:["Sets up networks","Breaks into systems with permission","Stores passwords","Speeds up internet"]}, answer:1 }
        ]
      },
      {
        id:"c1w1l2",
        title:{ uz:"Hacker bo'lish uchun nima kerak?", ru:"Что нужно чтобы стать хакером?", en:"What does it take to become a hacker?" },
        duration:"25 daq",
        content:{
          uz:`<h2>Hacker bo'lish uchun nima kerak?</h2>
<p>Ko'pchilik "hacker" so'zini eshitganida Hollywood kinofilmlarini esga oladi: qorong'i xonada, kapyushonli odam, ekranda matritsa kodi... Haqiqat ancha boshqacha!</p>
<div class="info-box">
<p><strong>Haqiqiy hacker:</strong> — bu qiziqqon, muntazam o'rganadigan, muammolarni hal qilishni yaxshi ko'radigan oddiy inson. Maxsus iste'dod yoki matematika dahosi bo'lish shart emas.</p>
</div>
<h3>🎭 Hacker turlari</h3>
<div class="info-box">
<p><strong>🤍 White Hat (Etik hacker):</strong> Kompaniyalar ularni yollaydi: "Bizni buz, zaifliklarimizni top." Qonuniy, to'lovli ish. Bu siz bo'lishingiz kerak bo'lgan tur!</p>
<p><strong>🖤 Black Hat (Zararli hacker):</strong> Ruxsatsiz, pul o'g'irlash yoki zarar yetkazish maqsadida ishlaydi. Jinoyatchi.</p>
<p><strong>🩶 Grey Hat:</strong> O'rtada — ba'zan ruxsatsiz sinaydi, lekin odatda zarar yetkazmaydi.</p>
</div>
<h3>📚 Kerakli bilimlar (qadamba-qadam)</h3>
<ol>
<li><strong>Asoslar:</strong> Kompyuter qanday ishlaydi, internet nima — bu kurs!</li>
<li><strong>Tarmoqlar:</strong> IP, port, protokol tushunchalari</li>
<li><strong>Operatsion tizimlar:</strong> Linux buyruqlar satri</li>
<li><strong>Dasturlash:</strong> Python asoslari (xavotir olmang — oddiy)</li>
<li><strong>Amaliyot:</strong> CTF (Capture the Flag) musobaqalari</li>
</ol>
<h3>⏱️ Qancha vaqt kerak?</h3>
<div class="info-box">
<p><strong>3-6 oy:</strong> Asosiy tushunchalar va birinchi amaliy ko'nikmalar</p>
<p><strong>1-2 yil:</strong> Junior Pentester darajasi</p>
<p><strong>3-5 yil:</strong> Senior mutaxassis</p>
<p><em>Kuniga 1-2 soat o'rganish yetarli — muhimi muntazamlik!</em></p>
</div>
<h3>🏋️ To'g'ri yo'l: "Hacking is a skill, not a superpower"</h3>
<ul>
<li>Har kuni biroz o'rganing — katta sessiyalardan ko'ra samaraliroq</li>
<li>TryHackMe, HackTheBox platformalarida mashq qiling</li>
<li>Jamoaga qo'shiling — Discord serverlari, forumlar</li>
<li>Sertifikat oling: CompTIA Security+, CEH, OSCP</li>
</ul>`,
          ru:`<h2>Что нужно чтобы стать хакером?</h2>
<p>Многие при слове "хакер" вспоминают голливудские фильмы: тёмная комната, человек в капюшоне, код матрицы на экране... Реальность совсем другая!</p>
<div class="info-box">
<p><strong>Настоящий хакер:</strong> — это любопытный, постоянно учащийся человек, который любит решать проблемы. Не нужно быть гением математики или иметь особый талант.</p>
</div>
<h3>🎭 Типы хакеров</h3>
<div class="info-box">
<p><strong>🤍 White Hat (Этичный хакер):</strong> Компании нанимают их: "Взломай нас, найди наши уязвимости." Законная, оплачиваемая работа. Вот кем вы должны стать!</p>
<p><strong>🖤 Black Hat (Вредоносный хакер):</strong> Действует без разрешения, с целью кражи денег или причинения вреда. Преступник.</p>
<p><strong>🩶 Grey Hat:</strong> Посередине — иногда тестирует без разрешения, но обычно не причиняет вреда.</p>
</div>
<h3>📚 Необходимые знания (шаг за шагом)</h3>
<ol>
<li><strong>Основы:</strong> Как работает компьютер, что такое интернет — этот курс!</li>
<li><strong>Сети:</strong> Понятия IP, порт, протокол</li>
<li><strong>Операционные системы:</strong> Командная строка Linux</li>
<li><strong>Программирование:</strong> Основы Python (не беспокойтесь — это просто)</li>
<li><strong>Практика:</strong> CTF (Capture the Flag) соревнования</li>
</ol>
<h3>⏱️ Сколько времени нужно?</h3>
<div class="info-box">
<p><strong>3-6 месяцев:</strong> Базовые концепции и первые практические навыки</p>
<p><strong>1-2 года:</strong> Уровень Junior Pentester</p>
<p><strong>3-5 лет:</strong> Senior специалист</p>
<p><em>1-2 часа в день достаточно — главное регулярность!</em></p>
</div>
<h3>🏋️ Правильный путь: "Hacking is a skill, not a superpower"</h3>
<ul>
<li>Учитесь каждый день понемногу — эффективнее больших сессий</li>
<li>Практикуйтесь на TryHackMe, HackTheBox</li>
<li>Присоединяйтесь к сообществам — Discord серверы, форумы</li>
<li>Получайте сертификаты: CompTIA Security+, CEH, OSCP</li>
</ul>`,
          en:`<h2>What does it take to become a hacker?</h2>
<p>Most people picture a hooded figure in a dark room with Matrix code on screen when they hear "hacker." Reality is very different!</p>
<div class="info-box">
<p><strong>A real hacker:</strong> is a curious, constantly-learning person who loves solving problems. You don't need to be a math genius or have any special talent.</p>
</div>
<h3>🎭 Types of hackers</h3>
<div class="info-box">
<p><strong>🤍 White Hat (Ethical hacker):</strong> Companies hire them: "Hack us, find our weaknesses." Legal, paid work. This is who you should become!</p>
<p><strong>🖤 Black Hat (Malicious hacker):</strong> Acts without permission, aiming to steal money or cause damage. A criminal.</p>
<p><strong>🩶 Grey Hat:</strong> In-between — sometimes tests without permission but usually doesn't cause harm.</p>
</div>
<h3>📚 Required knowledge (step by step)</h3>
<ol>
<li><strong>Foundations:</strong> How computers and the internet work — this course!</li>
<li><strong>Networks:</strong> IP, ports, protocols</li>
<li><strong>Operating Systems:</strong> Linux command line</li>
<li><strong>Programming:</strong> Python basics (don't worry — it's simple)</li>
<li><strong>Practice:</strong> CTF (Capture the Flag) competitions</li>
</ol>
<h3>⏱️ How long does it take?</h3>
<div class="info-box">
<p><strong>3-6 months:</strong> Core concepts and first practical skills</p>
<p><strong>1-2 years:</strong> Junior Pentester level</p>
<p><strong>3-5 years:</strong> Senior specialist</p>
<p><em>1-2 hours per day is enough — consistency is what matters!</em></p>
</div>
<h3>🏋️ The right path: "Hacking is a skill, not a superpower"</h3>
<ul>
<li>Learn a little every day — more effective than big sessions</li>
<li>Practice on TryHackMe and HackTheBox</li>
<li>Join communities — Discord servers, forums</li>
<li>Get certified: CompTIA Security+, CEH, OSCP</li>
</ul>`
        },
        quiz:[
          { q:{uz:"White Hat hacker kimdan farq qiladi?",ru:"Чем White Hat хакер отличается от других?",en:"What distinguishes a White Hat hacker?"},
            options:{uz:["Ko'proq kod yozadi","Ruxsat bilan ishlaydi","Tezroq hackerlaydi","Parollarni biladi"],ru:["Пишет больше кода","Работает с разрешением","Взламывает быстрее","Знает пароли"],en:["Writes more code","Works with permission","Hacks faster","Knows passwords"]}, answer:1 },
          { q:{uz:"Kiberxavfsizlikni o'rganish uchun kuniga qancha vaqt yetarli?",ru:"Сколько времени в день достаточно для изучения кибербезопасности?",en:"How much daily time is enough to learn cybersecurity?"},
            options:{uz:["10 soat","Butun kun","1-2 soat (muntazam)","Haftada bir marta"],ru:["10 часов","Весь день","1-2 часа (регулярно)","Раз в неделю"],en:["10 hours","All day","1-2 hours (consistently)","Once a week"]}, answer:2 }
        ]
      },
      {
        id:"c1w1l3",
        title:{ uz:"Kompyuter qanday ishlaydi?", ru:"Как работает компьютер?", en:"How does a computer work?" },
        duration:"25 daq",
        content:{
          uz:`<h2>Kompyuter qanday ishlaydi?</h2>
<p>Kiberxavfsizlikni tushunish uchun avvalo kompyuter nima ekanini bilish kerak. Qo'rqmang — bu fizika darsligidagi murakkab tushuntirish emas!</p>
<h3>🏗️ Kompyuterning asosiy qismlari</h3>
<div class="info-box">
<p><strong>CPU (Protsessor):</strong> Kompyuterning "miyasi." Hamma hisob-kitoblarni bajaradi. Analogiya: fabrikadagi bosh ishchi.</p>
<p><strong>RAM (Operativ xotira):</strong> Hozir ishlayotgan narsalar uchun vaqtinchalik joy. Analogiya: ish stolining yuzasi — ko'p narsani yoysangiz, joy qolmaydi.</p>
<p><strong>HDD/SSD (Saqlash):</strong> Doimiy xotira — o'chirsangiz ham saqlanadi. Analogiya: javon yoki shkaf.</p>
<p><strong>OS (Operatsion tizim):</strong> Windows, Linux, macOS — kompyuterni boshqaruvchi dastur. Analogiya: fabrikaning boshqaruv markazi.</p>
</div>
<h3>🔒 Kiberxavfsizlik nuqtai nazaridan muhim</h3>
<ul>
<li><strong>RAM dan xavf:</strong> Kompyuter o'chirilmasa, RAM dagi parollarni o'qish mumkin (cold boot attack)</li>
<li><strong>HDD/SSD xavfi:</strong> O'chirilgan fayllar to'liq yo'qolmaydi — forensic vositalar qaytara oladi</li>
<li><strong>OS zaifliklar:</strong> Yangilanmagan Windows yoki Linux — eng katta xavf manbai</li>
</ul>
<h3>💻 Dastur qanday ishlaydi?</h3>
<pre><code>Siz → [Klaviatura/Sichqoncha]
         ↓
    [Operatsion tizim]
         ↓
    [Dastur kodi] ← bu yerda zaifliklar bo'lishi mumkin!
         ↓
    [Protsessor] → Natija
         ↓
    [Ekran/Tarmoq]</code></pre>
<h3>🌐 Tarmoqqa ulanganda nima bo'ladi?</h3>
<p>Kompyuteringiz internet ga ulanganda, u <strong>paketlar</strong> yuboradi va qabul qiladi. Har bir paket — bu kichik ma'lumot bo'lagi. Xuddi xatni konvertga solib yuborish kabi.</p>
<div class="info-box">
<p><strong>Muhim:</strong> Bu paketlarni yo'lda ushlash mumkin — buni "packet sniffing" deyiladi. Shuning uchun shifrlangan ulanishlar (HTTPS) muhim!</p>
</div>`,
          ru:`<h2>Как работает компьютер?</h2>
<p>Чтобы понять кибербезопасность, нужно сначала понять что такое компьютер. Не бойтесь — это не сложное объяснение из учебника физики!</p>
<h3>🏗️ Основные части компьютера</h3>
<div class="info-box">
<p><strong>CPU (Процессор):</strong> "Мозг" компьютера. Выполняет все вычисления. Аналогия: главный рабочий на заводе.</p>
<p><strong>RAM (Оперативная память):</strong> Временное место для того, с чем работаете сейчас. Аналогия: поверхность рабочего стола — если положить много вещей, места не остаётся.</p>
<p><strong>HDD/SSD (Хранилище):</strong> Постоянная память — сохраняется даже после выключения. Аналогия: полка или шкаф.</p>
<p><strong>OS (Операционная система):</strong> Windows, Linux, macOS — программа, управляющая компьютером. Аналогия: центр управления завода.</p>
</div>
<h3>🔒 Важно с точки зрения кибербезопасности</h3>
<ul>
<li><strong>Угроза от RAM:</strong> Если компьютер не выключен, можно прочитать пароли из RAM (атака cold boot)</li>
<li><strong>Угроза HDD/SSD:</strong> Удалённые файлы не исчезают полностью — форензик инструменты могут восстановить</li>
<li><strong>Уязвимости ОС:</strong> Необновлённые Windows или Linux — главный источник угроз</li>
</ul>
<h3>💻 Как работает программа?</h3>
<pre><code>Вы → [Клавиатура/Мышь]
         ↓
  [Операционная система]
         ↓
    [Код программы] ← здесь могут быть уязвимости!
         ↓
    [Процессор] → Результат
         ↓
    [Экран/Сеть]</code></pre>
<h3>🌐 Что происходит при подключении к сети?</h3>
<p>Когда ваш компьютер подключается к интернету, он отправляет и получает <strong>пакеты</strong>. Каждый пакет — маленький кусочек данных. Как письмо в конверте.</p>
<div class="info-box">
<p><strong>Важно:</strong> Эти пакеты можно перехватить в пути — это называется "packet sniffing". Поэтому зашифрованные соединения (HTTPS) так важны!</p>
</div>`,
          en:`<h2>How does a computer work?</h2>
<p>To understand cybersecurity, you first need to know what a computer is. Don't worry — this isn't a complicated physics textbook explanation!</p>
<h3>🏗️ Main parts of a computer</h3>
<div class="info-box">
<p><strong>CPU (Processor):</strong> The "brain" of the computer. Does all calculations. Analogy: the main worker at a factory.</p>
<p><strong>RAM (Memory):</strong> Temporary space for what you're working on right now. Analogy: the surface of your desk — if you put too many things on it, there's no room left.</p>
<p><strong>HDD/SSD (Storage):</strong> Permanent memory — stays even when turned off. Analogy: a shelf or cabinet.</p>
<p><strong>OS (Operating System):</strong> Windows, Linux, macOS — the program managing the computer. Analogy: the factory's control centre.</p>
</div>
<h3>🔒 Important from a cybersecurity perspective</h3>
<ul>
<li><strong>RAM risk:</strong> If the computer isn't off, passwords in RAM can be read (cold boot attack)</li>
<li><strong>HDD/SSD risk:</strong> Deleted files don't fully disappear — forensic tools can recover them</li>
<li><strong>OS vulnerabilities:</strong> Unpatched Windows or Linux — the biggest threat source</li>
</ul>
<h3>💻 How does a program run?</h3>
<pre><code>You → [Keyboard/Mouse]
         ↓
  [Operating System]
         ↓
  [Program Code] ← this is where vulnerabilities live!
         ↓
  [Processor] → Result
         ↓
  [Screen/Network]</code></pre>
<h3>🌐 What happens when you connect to a network?</h3>
<p>When your computer connects to the internet, it sends and receives <strong>packets</strong>. Each packet is a small piece of data — like a letter in an envelope.</p>
<div class="info-box">
<p><strong>Important:</strong> These packets can be intercepted in transit — this is called "packet sniffing". That's why encrypted connections (HTTPS) matter!</p>
</div>`
        },
        quiz:[
          { q:{uz:"RAM ning asosiy xususiyati nima?",ru:"Какое основное свойство RAM?",en:"What is the key property of RAM?"},
            options:{uz:["Doimiy saqlaydi","Tezroq ishlaydi","O'chirilganda tozalanadi","Internet bilan ishlaydi"],ru:["Хранит постоянно","Работает быстрее","Очищается при выключении","Работает с интернетом"],en:["Stores permanently","Works faster","Clears when powered off","Works with internet"]}, answer:2 },
          { q:{uz:"Packet sniffing nima?",ru:"Что такое packet sniffing?",en:"What is packet sniffing?"},
            options:{uz:["Paketlarni yuborish","Tarmoq paketlarini ushlash va o'qish","Fayllarni o'chirish","Internetni tezlashtirish"],ru:["Отправка пакетов","Перехват и чтение сетевых пакетов","Удаление файлов","Ускорение интернета"],en:["Sending packets","Intercepting and reading network packets","Deleting files","Speeding up internet"]}, answer:1 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 2 — 2-hafta: Internet va Tarmoqlar
  // ─────────────────────────────────────────────
  {
    id:"c1w2", level:1, week:2, icon:"🌐", color:"#00aaff",
    title:{ uz:"Internet va Tarmoqlar", ru:"Интернет и сети", en:"Internet & Networks" },
    desc:{ uz:"Internet qanday ishlaydi, IP manzillar, portlar va protokollar — dasturlash bilimi shart emas", ru:"Как работает интернет, IP адреса, порты и протоколы — знание программирования не требуется", en:"How the internet works, IP addresses, ports and protocols — no coding knowledge required" },
    duration:{ uz:"3 × 30 daqiqa", ru:"3 × 30 минут", en:"3 × 30 minutes" },
    lessons:[
      {
        id:"c1w2l1",
        title:{ uz:"Internet qanday ishlaydi?", ru:"Как работает интернет?", en:"How does the internet work?" },
        duration:"30 daq",
        content:{
          uz:`<h2>Internet qanday ishlaydi?</h2>
<p>Siz "Google.com" ni brauzeringizga yozasiz va bir soniyada sahifa ochiladi. Bu sodda ko'rinsa-da, orqasida juda ko'p narsa sodir bo'ladi!</p>
<h3>📮 Internet = Ko'p kompyuterlar tarmoqi</h3>
<p>Internet — bu dunyo bo'ylab milliardlab qurilmalar (kompyuter, telefon, server) ni bir-biriga ulagan ulkan tarmoq. Har bir qurilma boshqalar bilan "gaplashishi" mumkin.</p>
<h3>🗺️ Veb-saytga kirganda nima bo'ladi? (6 qadam)</h3>
<div class="info-box">
<p><strong>1. Siz "google.com" yozasiz</strong><br>Brauzer: "Bu manzil nima, qaerda joylashgan?"</p>
<p><strong>2. DNS so'rovi</strong><br>DNS server (telefon kitobi kabi) javob beradi: "google.com = 142.250.185.46"</p>
<p><strong>3. Ulanish</strong><br>Brauzeringiz o'sha IP manzilga ulanadi</p>
<p><strong>4. So'rov yuborish</strong><br>"Menga bosh sahifani ber" deb so'raydi</p>
<p><strong>5. Server javob beradi</strong><br>Google serveri HTML kod yuboradi</p>
<p><strong>6. Ko'rsatish</strong><br>Brauzer kodni chiroyli sahifaga aylantiradi</p>
</div>
<h3>🔒 Bu yerda xavf qayerda?</h3>
<ul>
<li><strong>DNS spoofing:</strong> Hujumchi "google.com" ni soxta IP ga yo'naltirishi mumkin</li>
<li><strong>Man-in-the-Middle:</strong> Kimdir siz va server o'rtasiga kirib, ma'lumotni ushlab olishi mumkin</li>
<li><strong>HTTP (shifrlanmagan):</strong> Barcha ma'lumot ochiq — kimdir ko'rishi mumkin</li>
<li><strong>HTTPS (shifrlangan):</strong> Ma'lumot himoyalangan — brauzerda 🔒 belgisi</li>
</ul>
<h3>💡 Amaliy maslahat: HTTPS ni tekshiring</h3>
<pre><code>❌ Xavfli:  http://bank.uz/login
✅ Xavfsiz: https://bank.uz/login  ← 🔒 belgisi bor

Hech qachon HTTP orqali parol kiritmaslik kerak!</code></pre>`,
          ru:`<h2>Как работает интернет?</h2>
<p>Вы вводите "google.com" в браузер и через секунду страница открывается. Хотя это выглядит просто, за этим стоит очень много событий!</p>
<h3>📮 Интернет = Сеть множества компьютеров</h3>
<p>Интернет — это огромная сеть, соединяющая миллиарды устройств по всему миру (компьютеры, телефоны, серверы). Каждое устройство может "общаться" с другими.</p>
<h3>🗺️ Что происходит при открытии сайта? (6 шагов)</h3>
<div class="info-box">
<p><strong>1. Вы вводите "google.com"</strong><br>Браузер: "Что это за адрес, где он находится?"</p>
<p><strong>2. DNS запрос</strong><br>DNS сервер (как телефонный справочник) отвечает: "google.com = 142.250.185.46"</p>
<p><strong>3. Соединение</strong><br>Браузер подключается к этому IP адресу</p>
<p><strong>4. Отправка запроса</strong><br>"Дай мне главную страницу"</p>
<p><strong>5. Ответ сервера</strong><br>Сервер Google отправляет HTML код</p>
<p><strong>6. Отображение</strong><br>Браузер превращает код в красивую страницу</p>
</div>
<h3>🔒 Где здесь угрозы?</h3>
<ul>
<li><strong>DNS spoofing:</strong> Атакующий может перенаправить "google.com" на поддельный IP</li>
<li><strong>Man-in-the-Middle:</strong> Кто-то может встать между вами и сервером и перехватить данные</li>
<li><strong>HTTP (незашифрованный):</strong> Все данные открыты — кто-то может их увидеть</li>
<li><strong>HTTPS (зашифрованный):</strong> Данные защищены — в браузере есть значок 🔒</li>
</ul>
<h3>💡 Практический совет: проверяйте HTTPS</h3>
<pre><code>❌ Опасно:  http://bank.ru/login
✅ Безопасно: https://bank.ru/login  ← есть значок 🔒

Никогда не вводите пароль через HTTP!</code></pre>`,
          en:`<h2>How does the internet work?</h2>
<p>You type "google.com" into your browser and a page opens in a second. It looks simple, but a lot happens behind the scenes!</p>
<h3>📮 Internet = A network of many computers</h3>
<p>The internet is a massive network connecting billions of devices worldwide (computers, phones, servers). Each device can "talk" to others.</p>
<h3>🗺️ What happens when you open a website? (6 steps)</h3>
<div class="info-box">
<p><strong>1. You type "google.com"</strong><br>Browser: "What is this address? Where is it?"</p>
<p><strong>2. DNS query</strong><br>DNS server (like a phone book) answers: "google.com = 142.250.185.46"</p>
<p><strong>3. Connection</strong><br>Your browser connects to that IP address</p>
<p><strong>4. Request</strong><br>"Give me the homepage"</p>
<p><strong>5. Server responds</strong><br>Google's server sends HTML code</p>
<p><strong>6. Display</strong><br>Browser turns code into a pretty page</p>
</div>
<h3>🔒 Where are the dangers here?</h3>
<ul>
<li><strong>DNS spoofing:</strong> An attacker can redirect "google.com" to a fake IP</li>
<li><strong>Man-in-the-Middle:</strong> Someone can sit between you and the server and intercept data</li>
<li><strong>HTTP (unencrypted):</strong> All data is open — someone can see it</li>
<li><strong>HTTPS (encrypted):</strong> Data is protected — browser shows 🔒 icon</li>
</ul>
<h3>💡 Practical tip: check for HTTPS</h3>
<pre><code>❌ Dangerous: http://bank.com/login
✅ Safe:      https://bank.com/login  ← has 🔒 icon

Never enter a password over HTTP!</code></pre>`
        },
        quiz:[
          { q:{uz:"DNS serveri nima vazifani bajaradi?",ru:"Какую функцию выполняет DNS сервер?",en:"What does a DNS server do?"},
            options:{uz:["Parollarni saqlaydi","Domen nomini IP manzilga aylantiradi","Fayllarni ko'chiradi","Tezlikni oshiradi"],ru:["Хранит пароли","Преобразует доменное имя в IP адрес","Копирует файлы","Увеличивает скорость"],en:["Stores passwords","Converts domain name to IP address","Copies files","Increases speed"]}, answer:1 },
          { q:{uz:"HTTP va HTTPS ning farqi nima?",ru:"В чём разница между HTTP и HTTPS?",en:"What's the difference between HTTP and HTTPS?"},
            options:{uz:["HTTPS tezroq","HTTPS ma'lumotlarni shifrlaydi","HTTP yangi versiya","Farqi yo'q"],ru:["HTTPS быстрее","HTTPS шифрует данные","HTTP новая версия","Нет разницы"],en:["HTTPS is faster","HTTPS encrypts data","HTTP is newer","No difference"]}, answer:1 }
        ]
      },
      {
        id:"c1w2l2",
        title:{ uz:"IP manzillar va Portlar", ru:"IP адреса и Порты", en:"IP Addresses and Ports" },
        duration:"30 daq",
        content:{
          uz:`<h2>IP manzillar va Portlar</h2>
<p>Har bir qurilmaning internetdagi o'z manzili bor — xuddi uyingizning pochtaviy manzili kabi. Bu — <strong>IP manzil</strong>.</p>
<h3>🏠 IP manzil = Raqamli manzil</h3>
<div class="info-box">
<p><strong>IPv4:</strong> 192.168.1.100 — 4 ta raqam, har biri 0-255 orasida</p>
<p><strong>IPv6:</strong> 2001:0db8::1 — yangi format, ko'proq manzil imkoniyati</p>
</div>
<h3>🔍 Shaxsiy va Ommaviy IP manzillar</h3>
<pre><code>Ommaviy IP (Internet):  8.8.8.8 (Google DNS)
                        1.1.1.1 (Cloudflare DNS)

Shaxsiy IP (Uy tarmog'i):
  192.168.x.x  — uy routerlari
  10.x.x.x     — korporativ tarmoqlar
  172.16.x.x   — ham shaxsiy

Sizning "localhost": 127.0.0.1  — o'z kompyuteringiz</code></pre>
<h3>🚪 Port = Eshik raqami</h3>
<p>Bir IP manzilda ko'plab xizmatlar ishlashi mumkin. Portlar ularni ajratib turadi — xuddi ko'p qavatli binodagi kvartira raqamlari kabi.</p>
<div class="info-box">
<p><strong>80</strong> → HTTP (web saytlar)</p>
<p><strong>443</strong> → HTTPS (xavfsiz web)</p>
<p><strong>22</strong> → SSH (xavfsiz uzoqdan kirish)</p>
<p><strong>21</strong> → FTP (fayl uzatish)</p>
<p><strong>3306</strong> → MySQL (ma'lumotlar bazasi)</p>
<p><strong>3389</strong> → RDP (Windows uzoqdan boshqarish)</p>
</div>
<h3>⚠️ Kiberxavfsizlik nuqtai nazaridan</h3>
<pre><code># Xujumchi nima qiladi?
nmap 192.168.1.1

PORT     STATE  SERVICE
22/tcp   open   ssh      ← kirish nuqtasi bo'lishi mumkin
80/tcp   open   http     ← web zaifliklar
3306/tcp open   mysql    ← ma'lumotlar bazasi ochiq!!!
3389/tcp open   rdp      ← Windows uzoqdan boshqarish

# Yaxshi amaliyot: kerak bo'lmagan portlarni yoping!</code></pre>
<h3>🛡️ O'zingizni himoya qiling</h3>
<ul>
<li>Router da faqat kerakli portlarni oching</li>
<li>Firewall yoqing</li>
<li>Default (standart) portlarni o'zgartiring</li>
<li>Muntazam port skan qiling — nima ochiq?</li>
</ul>`,
          ru:`<h2>IP адреса и Порты</h2>
<p>Каждое устройство в интернете имеет свой адрес — как почтовый адрес вашего дома. Это — <strong>IP адрес</strong>.</p>
<h3>🏠 IP адрес = Цифровой адрес</h3>
<div class="info-box">
<p><strong>IPv4:</strong> 192.168.1.100 — 4 числа, каждое от 0 до 255</p>
<p><strong>IPv6:</strong> 2001:0db8::1 — новый формат, больше адресов</p>
</div>
<h3>🔍 Частные и публичные IP адреса</h3>
<pre><code>Публичные IP (Интернет):  8.8.8.8 (Google DNS)
                          1.1.1.1 (Cloudflare DNS)

Частные IP (Домашняя сеть):
  192.168.x.x  — домашние роутеры
  10.x.x.x     — корпоративные сети
  172.16.x.x   — тоже частные

Ваш "localhost": 127.0.0.1  — ваш же компьютер</code></pre>
<h3>🚪 Порт = Номер квартиры</h3>
<p>На одном IP адресе может работать много сервисов. Порты их разделяют — как номера квартир в многоэтажном доме.</p>
<div class="info-box">
<p><strong>80</strong> → HTTP (веб-сайты)</p>
<p><strong>443</strong> → HTTPS (защищённый веб)</p>
<p><strong>22</strong> → SSH (защищённый удалённый доступ)</p>
<p><strong>21</strong> → FTP (передача файлов)</p>
<p><strong>3306</strong> → MySQL (база данных)</p>
<p><strong>3389</strong> → RDP (удалённое управление Windows)</p>
</div>
<h3>⚠️ С точки зрения кибербезопасности</h3>
<pre><code># Что делает атакующий?
nmap 192.168.1.1

PORT     STATE  SERVICE
22/tcp   open   ssh      ← может быть точкой входа
80/tcp   open   http     ← веб-уязвимости
3306/tcp open   mysql    ← база данных открыта!!!
3389/tcp open   rdp      ← удалённое управление Windows

# Хорошая практика: закрывайте ненужные порты!</code></pre>`,
          en:`<h2>IP Addresses and Ports</h2>
<p>Every device on the internet has its own address — like your home's postal address. This is an <strong>IP address</strong>.</p>
<h3>🏠 IP address = Digital address</h3>
<div class="info-box">
<p><strong>IPv4:</strong> 192.168.1.100 — 4 numbers, each between 0-255</p>
<p><strong>IPv6:</strong> 2001:0db8::1 — new format, more address space</p>
</div>
<h3>🔍 Private and Public IP addresses</h3>
<pre><code>Public IP (Internet):  8.8.8.8 (Google DNS)
                       1.1.1.1 (Cloudflare DNS)

Private IP (Home network):
  192.168.x.x  — home routers
  10.x.x.x     — corporate networks
  172.16.x.x   — also private

Your "localhost": 127.0.0.1  — your own computer</code></pre>
<h3>🚪 Port = Apartment number</h3>
<p>Many services can run on one IP address. Ports keep them separate — like apartment numbers in a building.</p>
<div class="info-box">
<p><strong>80</strong> → HTTP (websites)</p>
<p><strong>443</strong> → HTTPS (secure web)</p>
<p><strong>22</strong> → SSH (secure remote access)</p>
<p><strong>21</strong> → FTP (file transfer)</p>
<p><strong>3306</strong> → MySQL (database)</p>
<p><strong>3389</strong> → RDP (Windows remote desktop)</p>
</div>
<h3>⚠️ From a cybersecurity perspective</h3>
<pre><code># What does an attacker do?
nmap 192.168.1.1

PORT     STATE  SERVICE
22/tcp   open   ssh      ← possible entry point
80/tcp   open   http     ← web vulnerabilities
3306/tcp open   mysql    ← database is exposed!!!
3389/tcp open   rdp      ← Windows remote desktop

# Best practice: close ports you don't need!</code></pre>`
        },
        quiz:[
          { q:{uz:"HTTPS uchun standart port nechta?",ru:"Какой стандартный порт для HTTPS?",en:"What is the standard port for HTTPS?"},
            options:{uz:["80","443","22","3306"],ru:["80","443","22","3306"],en:["80","443","22","3306"]}, answer:1 },
          { q:{uz:"127.0.0.1 nima?",ru:"Что такое 127.0.0.1?",en:"What is 127.0.0.1?"},
            options:{uz:["Google serveri","O'z kompyuteringiz (localhost)","Router manzili","DNS server"],ru:["Сервер Google","Ваш компьютер (localhost)","Адрес роутера","DNS сервер"],en:["Google's server","Your own computer (localhost)","Router address","DNS server"]}, answer:1 }
        ]
      },
      {
        id:"c1w2l3",
        title:{ uz:"Parollar va Autentifikatsiya", ru:"Пароли и Аутентификация", en:"Passwords and Authentication" },
        duration:"30 daq",
        content:{
          uz:`<h2>Parollar va Autentifikatsiya</h2>
<p>Kiberxavfsizlikning eng ko'p e'tiborga olinadigan lekin ko'pincha noto'g'ri tushunilgan mavzusi — parollar. Ko'pchilik "123456" yoki "password" ishlatadi — bu juda xavfli!</p>
<h3>📊 Eng ko'p ishlatiladigan parollar (va eng xavflilari)</h3>
<pre><code>1. 123456         7. password
2. 123456789      8. 111111
3. qwerty         9. 123123
4. password      10. abc123
5. 12345          11. 1234567890
6. 12345678       12. iloveyou</code></pre>
<h3>🔐 Mustahkam parol qanday bo'ladi?</h3>
<div class="info-box">
<p><strong>Uzunlik:</strong> Kamida 12 belgi (16+ yanada yaxshi)</p>
<p><strong>Aralash belgilar:</strong> Katta/kichik harf + raqam + maxsus belgi</p>
<p><strong>Noyob:</strong> Har bir sayt uchun alohida parol</p>
<p><strong>Ma'nosiz:</strong> Shaxsiy ma'lumot bo'lmasin (tug'ilgan kun, ism)</p>
</div>
<h3>💡 Yaxshi parol yaratish usuli — Passphrase</h3>
<pre><code>❌ Yomon: P@ssw0rd
❌ Yomon: John1990!

✅ Yaxshi: Mening_Mushugim_Ozbekiston_2024!
✅ Yaxshi: Kofe-Kitob-Daryo-Quyosh-7
✅ Yaxshi: tr0ub4dor&3 (random so'zlar)

Passphrase yodda qolishi oson, buzish qiyin!</code></pre>
<h3>🔑 Parol menejerlari</h3>
<p>Yuzlab turli parolni yodda saqlash mumkin emas. Parol menejeri — bu xavfsiz raqamli seyfdir:</p>
<ul>
<li><strong>Bitwarden</strong> — bepul, ochiq manba ✅</li>
<li><strong>1Password</strong> — pullik, professional</li>
<li><strong>KeePass</strong> — offline, mahalliy saqlash</li>
</ul>
<h3>🛡️ Ikki faktorli autentifikatsiya (2FA)</h3>
<p>Parol + yana bir narsa = ancha xavfsiz.</p>
<div class="info-box">
<p><strong>SMS kod</strong> — telefonga kod keladi (zaif, SIM swap xavfi bor)</p>
<p><strong>Authenticator ilova</strong> — Google Auth, Authy — har 30 soniyada yangi kod (yaxshi)</p>
<p><strong>Apparat kaliti</strong> — YubiKey — eng mustahkam (juda yaxshi)</p>
</div>
<pre><code>2FA yoqilganda:
Parolingiz o'g'irlansa ham →
Hujumchi kira olmaydi ← chunki telefon sizda!

Iloji boricha barcha muhim hisobda 2FA yoqing!</code></pre>`,
          ru:`<h2>Пароли и Аутентификация</h2>
<p>Самая обсуждаемая, но часто неправильно понимаемая тема кибербезопасности — пароли. Многие используют "123456" или "password" — это очень опасно!</p>
<h3>📊 Самые используемые пароли (и самые опасные)</h3>
<pre><code>1. 123456         7. password
2. 123456789      8. 111111
3. qwerty         9. 123123
4. password      10. abc123
5. 12345          11. 1234567890
6. 12345678       12. iloveyou</code></pre>
<h3>🔐 Каким должен быть надёжный пароль?</h3>
<div class="info-box">
<p><strong>Длина:</strong> Минимум 12 символов (16+ ещё лучше)</p>
<p><strong>Смешанные символы:</strong> Верхний/нижний регистр + цифры + спецсимволы</p>
<p><strong>Уникальный:</strong> Отдельный пароль для каждого сайта</p>
<p><strong>Безличный:</strong> Без личных данных (день рождения, имя)</p>
</div>
<h3>💡 Метод создания надёжного пароля — Passphrase</h3>
<pre><code>❌ Плохо: P@ssw0rd
❌ Плохо: Ivan1990!

✅ Хорошо: Мой_Кот_Москва_2024!
✅ Хорошо: Кофе-Книга-Река-Солнце-7
✅ Хорошо: tr0ub4dor&3 (случайные слова)

Passphrase легко запомнить, сложно взломать!</code></pre>
<h3>🔑 Менеджеры паролей</h3>
<ul>
<li><strong>Bitwarden</strong> — бесплатный, открытый исходник ✅</li>
<li><strong>1Password</strong> — платный, профессиональный</li>
<li><strong>KeePass</strong> — офлайн, локальное хранение</li>
</ul>
<h3>🛡️ Двухфакторная аутентификация (2FA)</h3>
<div class="info-box">
<p><strong>SMS код</strong> — код приходит на телефон (слабый, риск SIM swap)</p>
<p><strong>Приложение Authenticator</strong> — Google Auth, Authy — новый код каждые 30 сек (хорошо)</p>
<p><strong>Аппаратный ключ</strong> — YubiKey — самый надёжный (отлично)</p>
</div>`,
          en:`<h2>Passwords and Authentication</h2>
<p>The most talked-about but often misunderstood cybersecurity topic — passwords. Many people use "123456" or "password" — this is very dangerous!</p>
<h3>📊 Most common passwords (and most dangerous)</h3>
<pre><code>1. 123456         7. password
2. 123456789      8. 111111
3. qwerty         9. 123123
4. password      10. abc123
5. 12345          11. 1234567890
6. 12345678       12. iloveyou</code></pre>
<h3>🔐 What makes a strong password?</h3>
<div class="info-box">
<p><strong>Length:</strong> At least 12 characters (16+ even better)</p>
<p><strong>Mixed characters:</strong> Upper/lower case + numbers + special chars</p>
<p><strong>Unique:</strong> Different password for every site</p>
<p><strong>Impersonal:</strong> No personal info (birthday, name)</p>
</div>
<h3>💡 Good password method — Passphrase</h3>
<pre><code>❌ Bad: P@ssw0rd
❌ Bad: John1990!

✅ Good: My_Cat_London_2024!
✅ Good: Coffee-Book-River-Sun-7
✅ Good: tr0ub4dor&3 (random words)

Passphrase is easy to remember, hard to crack!</code></pre>
<h3>🔑 Password managers</h3>
<ul>
<li><strong>Bitwarden</strong> — free, open source ✅</li>
<li><strong>1Password</strong> — paid, professional</li>
<li><strong>KeePass</strong> — offline, local storage</li>
</ul>
<h3>🛡️ Two-Factor Authentication (2FA)</h3>
<div class="info-box">
<p><strong>SMS code</strong> — code sent to phone (weak, SIM swap risk)</p>
<p><strong>Authenticator app</strong> — Google Auth, Authy — new code every 30 sec (good)</p>
<p><strong>Hardware key</strong> — YubiKey — strongest (excellent)</p>
</div>`
        },
        quiz:[
          { q:{uz:"Passphrase nima uchun yaxshi?",ru:"Почему passphrase хорош?",en:"Why is a passphrase good?"},
            options:{uz:["Qisqa bo'ladi","Yodda qolishi oson va buzish qiyin","Faqat raqamlardan iborat","Maxsus belgilar shart"],ru:["Короткий","Легко запомнить и сложно взломать","Только из цифр","Требует спецсимволов"],en:["It's short","Easy to remember and hard to crack","Only numbers","Requires special chars"]}, answer:1 },
          { q:{uz:"2FA ning eng kuchli turi qaysi?",ru:"Какой тип 2FA самый надёжный?",en:"Which type of 2FA is strongest?"},
            options:{uz:["SMS kod","Email kod","Authenticator ilova","Apparat kaliti (YubiKey)"],ru:["SMS код","Код на email","Приложение Authenticator","Аппаратный ключ (YubiKey)"],en:["SMS code","Email code","Authenticator app","Hardware key (YubiKey)"]}, answer:3 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 3 — 3-hafta: Linux va Terminal
  // ─────────────────────────────────────────────
  {
    id:"c1w3", level:1, week:3, icon:"🐧", color:"#ff8800",
    title:{ uz:"Linux va Terminal", ru:"Linux и Терминал", en:"Linux and the Terminal" },
    desc:{ uz:"Kali Linux o'rnatish, terminal buyruqlari va fayl tizimi — boshlang'ichlar uchun", ru:"Установка Kali Linux, команды терминала и файловая система — для начинающих", en:"Installing Kali Linux, terminal commands and file system — for beginners" },
    duration:{ uz:"3 × 35 daqiqa", ru:"3 × 35 минут", en:"3 × 35 minutes" },
    lessons:[
      {
        id:"c1w3l1",
        title:{ uz:"Linux nima va uni qanday o'rnatish?", ru:"Что такое Linux и как его установить?", en:"What is Linux and how to install it?" },
        duration:"35 daq",
        content:{
          uz:`<h2>Linux nima va uni qanday o'rnatish?</h2>
<p>Kiberxavfsizlik mutaxassislarining 90% dan ko'pi Linux dan foydalanadi. Nima uchun? Chunki u bepul, kuchli, va xavfsizlik vositalari shu tizim uchun yaratilgan.</p>
<h3>🐧 Linux nima?</h3>
<div class="info-box">
<p>Linux — Windows va macOS ga o'xshash operatsion tizim, lekin <strong>bepul va ochiq manba</strong>. 1991-yilda Linus Torvalds yaratgan.</p>
<p>Android telefonlar ham Linux asosida ishlaydi!</p>
</div>
<h3>📦 Linux distributivlari (versiyalari)</h3>
<ul>
<li><strong>Kali Linux</strong> — kiberxavfsizlik uchun maxsus, 600+ vosita oldindan o'rnatilgan ⭐</li>
<li><strong>Ubuntu</strong> — boshlang'ichlar uchun qulay, Windows ga o'xshash</li>
<li><strong>Parrot OS</strong> — Kali ga o'xshash, yengil versiya</li>
<li><strong>Debian</strong> — barqaror, server uchun</li>
</ul>
<h3>💻 O'rnatish usullari (xavfsiz yo'l)</h3>
<div class="info-box">
<p><strong>1-usul: Virtual mashina (tavsiya etiladi)</strong><br>
Asosiy kompyuterga xavf yo'q. VMware yoki VirtualBox dasturini o'rnating, ichida Kali Linux ishlasin.</p>
<p><strong>2-usul: WSL2 (Windows Subsystem for Linux)</strong><br>
Windows 10/11 da ishlaydi. PowerShell da: <code>wsl --install</code></p>
<p><strong>3-usul: Live USB</strong><br>
Flesh kartaga yozing, kompyuterni u bilan yoqing — o'rnatmasdan sinab ko'rasiz.</p>
</div>
<h3>🚀 VMware bilan Kali Linux o'rnatish (qadamlar)</h3>
<ol>
<li>VMware Player yoki VirtualBox yuklab oling (bepul)</li>
<li>kali.org dan Kali Linux ISO faylini yuklab oling</li>
<li>"New Virtual Machine" tugmasini bosing</li>
<li>RAM: 4GB, Disk: 80GB bering</li>
<li>ISO faylni tanlang va o'rnatish boshlaning</li>
<li>Login: kali / Parol: kali (standart)</li>
</ol>
<h3>🎯 Birinchi marta ochganda nima ko'rasiz?</h3>
<ul>
<li><strong>Desktop</strong> — grafik interfeys (GNOME yoki XFCE)</li>
<li><strong>Terminal</strong> — buyruqlar satri — asosiy ish joyi</li>
<li><strong>Application Menu</strong> — 600+ xavfsizlik vositasi</li>
</ul>`,
          ru:`<h2>Что такое Linux и как его установить?</h2>
<p>Более 90% специалистов по кибербезопасности используют Linux. Почему? Потому что он бесплатный, мощный, и инструменты безопасности созданы именно для него.</p>
<h3>🐧 Что такое Linux?</h3>
<div class="info-box">
<p>Linux — операционная система, похожая на Windows и macOS, но <strong>бесплатная и с открытым исходным кодом</strong>. Создан Линусом Торвальдсом в 1991 году.</p>
<p>Смартфоны на Android тоже работают на Linux!</p>
</div>
<h3>📦 Дистрибутивы Linux (версии)</h3>
<ul>
<li><strong>Kali Linux</strong> — специальный для кибербезопасности, 600+ инструментов предустановлено ⭐</li>
<li><strong>Ubuntu</strong> — удобен для начинающих, похож на Windows</li>
<li><strong>Parrot OS</strong> — похож на Kali, лёгкая версия</li>
<li><strong>Debian</strong> — стабильный, для серверов</li>
</ul>
<h3>💻 Способы установки (безопасный путь)</h3>
<div class="info-box">
<p><strong>Способ 1: Виртуальная машина (рекомендуется)</strong><br>
Нет риска для основного компьютера. Установите VMware или VirtualBox, внутри запустите Kali Linux.</p>
<p><strong>Способ 2: WSL2</strong><br>
Работает на Windows 10/11. В PowerShell: <code>wsl --install</code></p>
<p><strong>Способ 3: Live USB</strong><br>
Запишите на флешку, загрузитесь с неё — тестируйте без установки.</p>
</div>
<h3>🚀 Установка Kali Linux на VMware (шаги)</h3>
<ol>
<li>Скачайте VMware Player или VirtualBox (бесплатно)</li>
<li>Скачайте Kali Linux ISO с kali.org</li>
<li>Нажмите "New Virtual Machine"</li>
<li>RAM: 4GB, Диск: 80GB</li>
<li>Выберите ISO файл и запустите установку</li>
<li>Логин: kali / Пароль: kali (по умолчанию)</li>
</ol>`,
          en:`<h2>What is Linux and how to install it?</h2>
<p>Over 90% of cybersecurity professionals use Linux. Why? Because it's free, powerful, and security tools are built for it.</p>
<h3>🐧 What is Linux?</h3>
<div class="info-box">
<p>Linux is an operating system similar to Windows and macOS, but <strong>free and open source</strong>. Created by Linus Torvalds in 1991.</p>
<p>Android phones also run on Linux!</p>
</div>
<h3>📦 Linux distributions (versions)</h3>
<ul>
<li><strong>Kali Linux</strong> — specialized for cybersecurity, 600+ tools pre-installed ⭐</li>
<li><strong>Ubuntu</strong> — beginner-friendly, similar to Windows</li>
<li><strong>Parrot OS</strong> — similar to Kali, lightweight</li>
<li><strong>Debian</strong> — stable, for servers</li>
</ul>
<h3>💻 Installation methods (safe way)</h3>
<div class="info-box">
<p><strong>Method 1: Virtual machine (recommended)</strong><br>
No risk to your main computer. Install VMware or VirtualBox, run Kali Linux inside.</p>
<p><strong>Method 2: WSL2</strong><br>
Works on Windows 10/11. In PowerShell: <code>wsl --install</code></p>
<p><strong>Method 3: Live USB</strong><br>
Write to a USB drive, boot from it — test without installing.</p>
</div>
<h3>🚀 Installing Kali Linux on VMware (steps)</h3>
<ol>
<li>Download VMware Player or VirtualBox (free)</li>
<li>Download Kali Linux ISO from kali.org</li>
<li>Click "New Virtual Machine"</li>
<li>RAM: 4GB, Disk: 80GB</li>
<li>Select ISO file and start installation</li>
<li>Login: kali / Password: kali (default)</li>
</ol>`
        },
        quiz:[
          { q:{uz:"Kali Linux nima uchun maxsus?",ru:"Для чего специализирован Kali Linux?",en:"What is Kali Linux specialized for?"},
            options:{uz:["O'yin uchun","Video tahrirlash","Kiberxavfsizlik va pen-test","Musiqa tinglash"],ru:["Для игр","Для видеомонтажа","Кибербезопасность и пентест","Для прослушивания музыки"],en:["Gaming","Video editing","Cybersecurity and pen-testing","Music listening"]}, answer:2 },
          { q:{uz:"Boshlang'ich uchun Linux o'rnatishning eng xavfsiz usuli?",ru:"Самый безопасный способ установки Linux для начинающих?",en:"The safest way to install Linux for beginners?"},
            options:{uz:["Asosiy tizimni o'chirish","Virtual mashina","Telefonga o'rnatish","Internetdan foydalanish"],ru:["Удалить основную систему","Виртуальная машина","Установить на телефон","Использовать интернет"],en:["Delete the main OS","Virtual machine","Install on phone","Use internet"]}, answer:1 }
        ]
      },
      {
        id:"c1w3l2",
        title:{ uz:"Terminal buyruqlari — 1-qism", ru:"Команды терминала — часть 1", en:"Terminal commands — Part 1" },
        duration:"35 daq",
        content:{
          uz:`<h2>Terminal buyruqlari — Boshlang'ichlar uchun</h2>
<p>Terminal qo'rqinchli ko'rinadi — qora ekran, faqat matn. Lekin aslida bu eng kuchli vosita! Har bir buyruqni birga o'rganamiz.</p>
<h3>🖥️ Terminal nima?</h3>
<p>Terminal — kompyuter bilan matn orqali gaplashish usuli. "Fayl ko'chirish" uchun sichqon bilan sudrab borish o'rniga buyruq yozasiz.</p>
<div class="info-box">
<p><strong>Prompt (taklif chizig'i) ko'rinishi:</strong></p>
<pre><code>kali@kali:~$ _
   ↑      ↑ ↑
foyda- host  joriy
lanuvchi     papka</code></pre>
</div>
<h3>📂 Navigatsiya buyruqlari</h3>
<pre><code># Joriy papkani ko'rish
pwd
# Natija: /home/kali

# Papka ichini ko'rish
ls
ls -la   # yashirin fayllar ham

# Papkaga o'tish
cd Desktop
cd ..          # yuqoriga qaytish
cd /home/kali  # to'liq yo'l bilan

# Yangi papka yaratish
mkdir MyFolder

# Faylni o'qish
cat file.txt

# Faylni qidirish
find / -name "passwords.txt" 2>/dev/null</code></pre>
<h3>✏️ Fayl operatsiyalari</h3>
<pre><code># Fayl yaratish
touch newfile.txt

# Matn yozish
echo "Salom dunyo" > file.txt
echo "Yana satr" >> file.txt   # qo'shish

# Nusxa olish
cp file.txt backup.txt

# Ko'chirish / Nomini o'zgartirish
mv file.txt /tmp/file.txt
mv oldname.txt newname.txt

# O'chirish (ehtiyotkor bo'ling!)
rm file.txt
rm -rf folder/   # papkani ham ichidagi bilan</code></pre>
<h3>🔍 Qidirish va Filtrlash</h3>
<pre><code># Fayl ichidan qidirish
grep "password" config.txt
grep -r "admin" /etc/   # barcha faylda qidirish

# Natijani filtrlash
cat /etc/passwd | grep root

# Buyruq tarixi
history
!50    # 50-buyruqni qayta ishlatish</code></pre>
<h3>💡 Mashq qiling!</h3>
<pre><code>1. pwd — qayerdasiz?
2. ls -la — nima bor?
3. mkdir Practice — yangi papka
4. cd Practice — kirib oling
5. touch test.txt — fayl yarating
6. echo "Salom" > test.txt — yozing
7. cat test.txt — o'qing</code></pre>`,
          ru:`<h2>Команды терминала — для начинающих</h2>
<p>Терминал выглядит страшно — чёрный экран, только текст. Но на самом деле это самый мощный инструмент! Изучаем каждую команду вместе.</p>
<h3>📂 Команды навигации</h3>
<pre><code># Просмотр текущей папки
pwd
# Результат: /home/kali

# Просмотр содержимого
ls
ls -la   # включая скрытые файлы

# Переход в папку
cd Desktop
cd ..          # вернуться назад
cd /home/kali  # с полным путём

# Создание новой папки
mkdir MyFolder

# Чтение файла
cat file.txt

# Поиск файла
find / -name "passwords.txt" 2>/dev/null</code></pre>
<h3>✏️ Операции с файлами</h3>
<pre><code># Создать файл
touch newfile.txt

# Записать текст
echo "Привет мир" > file.txt
echo "Ещё строка" >> file.txt   # добавить

# Копировать
cp file.txt backup.txt

# Переместить / Переименовать
mv file.txt /tmp/file.txt

# Удалить (осторожно!)
rm file.txt
rm -rf folder/</code></pre>
<h3>🔍 Поиск и Фильтрация</h3>
<pre><code># Поиск в файле
grep "password" config.txt
grep -r "admin" /etc/

# Фильтрация результата
cat /etc/passwd | grep root

# История команд
history</code></pre>`,
          en:`<h2>Terminal commands — for beginners</h2>
<p>The terminal looks scary — black screen, only text. But it's actually the most powerful tool! Let's learn each command together.</p>
<h3>📂 Navigation commands</h3>
<pre><code># Show current directory
pwd
# Output: /home/kali

# List directory contents
ls
ls -la   # including hidden files

# Change directory
cd Desktop
cd ..          # go up
cd /home/kali  # full path

# Create new directory
mkdir MyFolder

# Read a file
cat file.txt

# Find a file
find / -name "passwords.txt" 2>/dev/null</code></pre>
<h3>✏️ File operations</h3>
<pre><code># Create file
touch newfile.txt

# Write text
echo "Hello world" > file.txt
echo "Another line" >> file.txt   # append

# Copy
cp file.txt backup.txt

# Move / Rename
mv file.txt /tmp/file.txt

# Delete (be careful!)
rm file.txt
rm -rf folder/</code></pre>
<h3>🔍 Search and filter</h3>
<pre><code># Search within file
grep "password" config.txt
grep -r "admin" /etc/

# Filter output
cat /etc/passwd | grep root

# Command history
history</code></pre>`
        },
        quiz:[
          { q:{uz:"'ls -la' buyrug'i nima ko'rsatadi?",ru:"Что показывает команда 'ls -la'?",en:"What does 'ls -la' show?"},
            options:{uz:["Faqat papkalar","Yashirin fayllar ham ko'rinadi","Faqat rasm fayllar","Tarmoq ma'lumoti"],ru:["Только папки","Показывает и скрытые файлы","Только изображения","Сетевые данные"],en:["Only folders","Shows hidden files too","Only images","Network info"]}, answer:1 },
          { q:{uz:"'grep -r' nima uchun ishlatiladi?",ru:"Для чего используется 'grep -r'?",en:"What is 'grep -r' used for?"},
            options:{uz:["Bitta faylda qidirish","Barcha papka va fayllarda rekursiv qidirish","Faylni o'chirish","Papka yaratish"],ru:["Поиск в одном файле","Рекурсивный поиск во всех папках и файлах","Удаление файла","Создание папки"],en:["Search one file","Recursively search all folders and files","Delete file","Create folder"]}, answer:1 }
        ]
      },
      {
        id:"c1w3l3",
        title:{ uz:"Linux fayl tizimi va ruxsatlar", ru:"Файловая система Linux и права", en:"Linux file system and permissions" },
        duration:"35 daq",
        content:{
          uz:`<h2>Linux fayl tizimi va Ruxsatlar</h2>
<p>Linux da barcha narsa fayl — hatto qurilmalar ham! Fayl tizimini va ruxsatlarni tushunish — xavfsizlikning asosi.</p>
<h3>🗂️ Linux fayl tizimi tuzilmasi</h3>
<pre><code>/               → Ildiz (root) — hamma narsa shu yerdan boshlanadi
├── /home/      → Foydalanuvchilar papkalari
│   └── /home/kali/    → Sizning papkangiz
├── /etc/       → Sozlamalar fayllari ← muhim!
├── /var/log/   → Log fayllar ← forensic uchun muhim!
├── /tmp/       → Vaqtinchalik fayllar
├── /bin/       → Asosiy buyruqlar
├── /usr/       → O'rnatilgan dasturlar
├── /root/      → Root (admin) foydalanuvchi uyi
└── /dev/       → Qurilmalar (disk, USB)</code></pre>
<h3>🔐 Ruxsatlar tizimi</h3>
<p>Har bir fayl uchun 3 ta guruh mavjud: <strong>Egasi, Guruh, Boshqalar</strong></p>
<pre><code>ls -la ni ko'rganingizda:

-rwxr-xr-- 1 kali kali 1024 May 1 file.txt
 ↑↑↑↑↑↑↑↑↑
 │└┬┘└┬┘└┬┘
 │ │  │  └── Boshqalar: r-- (faqat o'qish)
 │ │  └───── Guruh:    r-x (o'qish+bajarish)
 │ └──────── Egasi:    rwx (hammasi)
 └────────── Fayl turi: - (fayl), d (papka)</code></pre>
<h3>🔢 Ruxsatlarni raqamlar bilan</h3>
<pre><code>r = 4 (read — o'qish)
w = 2 (write — yozish)
x = 1 (execute — bajarish)

chmod 755 file.txt
# 7 = 4+2+1 = rwx (egasi: hammasi)
# 5 = 4+0+1 = r-x (guruh: o'qish+bajarish)
# 5 = 4+0+1 = r-x (boshqalar: o'qish+bajarish)

chmod 600 secrets.txt   # faqat egasi o'qiy oladi
chmod 777 public.txt    # hammaga hamma narsa (XAVFLI!)</code></pre>
<h3>👤 Foydalanuvchilar va Root</h3>
<div class="info-box">
<p><strong>Root (superuser):</strong> Tizimning "xudosi" — hamma narsaga kirish huquqi bor. <code>sudo</code> buyrug'i bilan vaqtincha root bo'lish mumkin.</p>
<p><strong>Oddiy foydalanuvchi:</strong> Cheklangan huquqlar — xavfsizroq!</p>
</div>
<pre><code># Root bo'lish
sudo su
whoami      # kim ekansiz?
id          # foydalanuvchi ID va guruh

# Parolni o'zgartirish
passwd

# Yangi foydalanuvchi yaratish
sudo adduser ali

# Guruhga qo'shish
sudo usermod -aG sudo ali   # ali ni sudo guruhiga qo'sh</code></pre>
<h3>⚠️ Xavfsizlik qoidalari</h3>
<ul>
<li>Root sifatida doimiy ishlamang — faqat kerakda sudo</li>
<li>Muhim fayllarni 600 yoki 700 ruxsat bilan himoyalang</li>
<li>Log fayllarni muntazam tekshiring: <code>tail -f /var/log/syslog</code></li>
</ul>`,
          ru:`<h2>Файловая система Linux и права доступа</h2>
<p>В Linux всё является файлом — даже устройства! Понимание файловой системы и прав — основа безопасности.</p>
<h3>🗂️ Структура файловой системы Linux</h3>
<pre><code>/               → Корень (root) — всё начинается отсюда
├── /home/      → Папки пользователей
│   └── /home/user/    → Ваша папка
├── /etc/       → Файлы конфигурации ← важно!
├── /var/log/   → Лог-файлы ← важно для форензики!
├── /tmp/       → Временные файлы
├── /bin/       → Основные команды
├── /usr/       → Установленные программы
└── /root/      → Домашняя папка root пользователя</code></pre>
<h3>🔐 Система прав доступа</h3>
<pre><code>-rwxr-xr-- 1 user user 1024 May 1 file.txt
 ↑↑↑↑↑↑↑↑↑
 │└┬┘└┬┘└┬┘
 │ │  │  └── Другие: r-- (только чтение)
 │ │  └───── Группа: r-x (чтение+выполнение)
 │ └──────── Владелец: rwx (всё)
 └────────── Тип: - (файл), d (папка)

chmod 755 file.txt
# 7=rwx, 5=r-x, 5=r-x

chmod 600 secrets.txt   # только владелец читает</code></pre>
<h3>👤 Пользователи и Root</h3>
<div class="info-box">
<p><strong>Root (суперпользователь):</strong> "Бог" системы — доступ ко всему. Команда <code>sudo</code> позволяет временно стать root.</p>
<p><strong>Обычный пользователь:</strong> Ограниченные права — безопаснее!</p>
</div>`,
          en:`<h2>Linux file system and permissions</h2>
<p>In Linux, everything is a file — even devices! Understanding the file system and permissions is the foundation of security.</p>
<h3>🗂️ Linux file system structure</h3>
<pre><code>/               → Root — everything starts here
├── /home/      → User home directories
├── /etc/       → Configuration files ← important!
├── /var/log/   → Log files ← important for forensics!
├── /tmp/       → Temporary files
├── /bin/       → Core commands
├── /usr/       → Installed programs
└── /root/      → Root user's home</code></pre>
<h3>🔐 Permissions system</h3>
<pre><code>-rwxr-xr-- 1 user user 1024 May 1 file.txt

r = 4 (read)
w = 2 (write)
x = 1 (execute)

chmod 755 file.txt   # owner: all, group/others: read+exec
chmod 600 secret.txt # owner read+write only
chmod 777 file.txt   # everyone everything (DANGEROUS!)</code></pre>
<h3>👤 Users and Root</h3>
<div class="info-box">
<p><strong>Root (superuser):</strong> The "god" of the system — access to everything. The <code>sudo</code> command lets you temporarily become root.</p>
<p><strong>Regular user:</strong> Limited rights — safer!</p>
</div>`
        },
        quiz:[
          { q:{uz:"chmod 600 nima ma'nosi?",ru:"Что означает chmod 600?",en:"What does chmod 600 mean?"},
            options:{uz:["Hammaga o'qish","Faqat egasi o'qish va yozish","Hammaga hamma narsa","Bajarish huquqi"],ru:["Чтение для всех","Только владелец читает и пишет","Всё для всех","Право выполнения"],en:["Read for all","Owner read+write only","All for everyone","Execute permission"]}, answer:1 },
          { q:{uz:"/var/log/ papkasi nima uchun muhim?",ru:"Почему папка /var/log/ важна?",en:"Why is /var/log/ important?"},
            options:{uz:["Dasturlar saqlanadi","Tizim log fayllari — forensic va monitoring uchun","Vaqtinchalik fayllar","Foydalanuvchi hujjatlari"],ru:["Хранятся программы","Системные логи — для форензики и мониторинга","Временные файлы","Документы пользователя"],en:["Programs stored","System logs — for forensics and monitoring","Temporary files","User documents"]}, answer:1 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 4 — 4-hafta: Birinchi Xavfsizlik Vositalari
  // ─────────────────────────────────────────────
  {
    id:"c1w4", level:1, week:4, icon:"🔧", color:"#aa44ff",
    title:{ uz:"Birinchi Xavfsizlik Vositalari", ru:"Первые инструменты безопасности", en:"First Security Tools" },
    desc:{ uz:"Nmap, Wireshark va Burp Suite ga kirish — amaliy birinchi qadamlar", ru:"Введение в Nmap, Wireshark и Burp Suite — первые практические шаги", en:"Introduction to Nmap, Wireshark and Burp Suite — first practical steps" },
    duration:{ uz:"3 × 35 daqiqa", ru:"3 × 35 минут", en:"3 × 35 minutes" },
    lessons:[
      {
        id:"c1w4l1",
        title:{ uz:"Nmap bilan portlarni skanerlash", ru:"Сканирование портов с Nmap", en:"Port scanning with Nmap" },
        duration:"35 daq",
        content:{
          uz:`<h2>Nmap — Tarmoq Xaritasi</h2>
<p>Nmap (Network Mapper) — xavfsizlik mutaxassisining eng birinchi quroli. U tizimda qanday portlar ochiq, qanday xizmatlar ishlayotganini ko'rsatadi.</p>
<div class="info-box">
<p><strong>⚠️ Muhim eslatma:</strong> Nmap ni faqat o'z tarmog'ingizda yoki maxsus ruxsat berilgan tizimlarda ishlating! Boshqa tizimlarga nisbatan qonunsiz skanerlash — jinoyat.</p>
</div>
<h3>🔧 Asosiy Nmap buyruqlari</h3>
<pre><code># Oddiy skan (eng tez)
nmap 192.168.1.1

# Natija:
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https

# Versiyani aniqlash
nmap -sV 192.168.1.1
# Natija:
22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp  open  http    Apache httpd 2.4.41

# OS aniqlash
nmap -O 192.168.1.1

# To'liq (eng ko'p ma'lumot)
nmap -A 192.168.1.1

# Tarmoq skan (barcha qurilmalar)
nmap 192.168.1.0/24</code></pre>
<h3>📊 Nmap skan turlari</h3>
<div class="info-box">
<p><strong>-sS (SYN skan):</strong> Eng tez va yashirin — to'liq ulanish o'rniga yarim. Root huquqi kerak.</p>
<p><strong>-sT (TCP skan):</strong> To'liq ulanish — sekinroq lekin root shart emas.</p>
<p><strong>-sU (UDP skan):</strong> UDP portlarini tekshirish — sekin lekin muhim.</p>
<p><strong>-p (port):</strong> Faqat muayyan portlarni skan: <code>nmap -p 22,80,443 target</code></p>
</div>
<h3>💾 Natijalarni saqlash</h3>
<pre><code># Matn shaklida
nmap -oN scan.txt 192.168.1.1

# XML shaklida (vositalar uchun)
nmap -oX scan.xml 192.168.1.1

# Barcha formatda
nmap -oA scan 192.168.1.1</code></pre>
<h3>🎯 Amaliy mashq: O'z tarmog'ini skanerlash</h3>
<pre><code># 1. O'z IP manzilini toping
ip addr show   # Linux
ipconfig       # Windows

# 2. O'z kompyuteringizni skanerlang (xavfsiz!)
nmap 127.0.0.1
nmap localhost

# 3. Uy tarmog'ini skanerlang
nmap 192.168.1.0/24</code></pre>`,
          ru:`<h2>Nmap — Картограф сети</h2>
<p>Nmap (Network Mapper) — первый инструмент специалиста по безопасности. Показывает какие порты открыты и какие сервисы работают.</p>
<div class="info-box">
<p><strong>⚠️ Важное замечание:</strong> Используйте Nmap только в своей сети или системах, для которых у вас есть разрешение! Незаконное сканирование — преступление.</p>
</div>
<h3>🔧 Основные команды Nmap</h3>
<pre><code># Простое сканирование
nmap 192.168.1.1

# Определение версий
nmap -sV 192.168.1.1

# Определение ОС
nmap -O 192.168.1.1

# Полное сканирование
nmap -A 192.168.1.1

# Сканирование сети
nmap 192.168.1.0/24

# Конкретные порты
nmap -p 22,80,443 192.168.1.1</code></pre>
<h3>💾 Сохранение результатов</h3>
<pre><code>nmap -oN scan.txt 192.168.1.1   # текст
nmap -oX scan.xml 192.168.1.1   # XML
nmap -oA scan 192.168.1.1       # все форматы</code></pre>`,
          en:`<h2>Nmap — Network Mapper</h2>
<p>Nmap is a security professional's first tool. It shows which ports are open and what services are running.</p>
<div class="info-box">
<p><strong>⚠️ Important:</strong> Only use Nmap on your own network or systems you have explicit permission to test! Unauthorized scanning is a crime.</p>
</div>
<h3>🔧 Core Nmap commands</h3>
<pre><code># Basic scan
nmap 192.168.1.1

# Version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Full aggressive scan
nmap -A 192.168.1.1

# Scan entire network
nmap 192.168.1.0/24

# Specific ports
nmap -p 22,80,443 192.168.1.1</code></pre>
<h3>💾 Saving results</h3>
<pre><code>nmap -oN scan.txt 192.168.1.1   # text
nmap -oX scan.xml 192.168.1.1   # XML
nmap -oA scan 192.168.1.1       # all formats</code></pre>`
        },
        quiz:[
          { q:{uz:"Nmap da '-sV' opsiyasi nima uchun?",ru:"Для чего опция '-sV' в Nmap?",en:"What is the '-sV' option in Nmap for?"},
            options:{uz:["UDP skan","Versiyalarni aniqlash","OS aniqlash","Tezlikni oshirish"],ru:["UDP сканирование","Определение версий","Определение ОС","Увеличение скорости"],en:["UDP scan","Version detection","OS detection","Speed boost"]}, answer:1 },
          { q:{uz:"Nmap ni qaysi tizimda ishlatish qonuniy?",ru:"На каких системах законно использовать Nmap?",en:"On which systems is it legal to use Nmap?"},
            options:{uz:["Istalgan tizimda","Faqat o'z tarmog'ingizda yoki ruxsat berilgan tizimda","Hukumat serverlarida","Banklar serverlarida"],ru:["На любой системе","Только в своей сети или с разрешения","На серверах правительства","На серверах банков"],en:["Any system","Only your own network or with permission","Government servers","Bank servers"]}, answer:1 }
        ]
      },
      {
        id:"c1w4l2",
        title:{ uz:"Wireshark bilan tarmoqni tahlil qilish", ru:"Анализ сети с Wireshark", en:"Network analysis with Wireshark" },
        duration:"35 daq",
        content:{
          uz:`<h2>Wireshark — Tarmoq Tahlilchisi</h2>
<p>Wireshark — tarmoqdan o'tayotgan barcha "paketlarni" ko'rish imkonini beradi. Xuddi tarmoq simidan o'tayotgan barcha ma'lumotni "ko'zga ko'rinadigan" qilib ko'rsatish kabi.</p>
<h3>🎯 Wireshark nimani ko'rsatadi?</h3>
<ul>
<li>Kim kimga ma'lumot yubormoqda</li>
<li>Qaysi protokol ishlatilmoqda (HTTP, DNS, FTP...)</li>
<li>Ma'lumot shifrlangan yoki yo'q</li>
<li>Tarmoqdagi g'ayritabiiy faollik</li>
</ul>
<h3>🖥️ Wireshark interfeysi</h3>
<div class="info-box">
<p><strong>Packet List:</strong> Barcha paketlar ro'yxati — vaqt, manbaa, manzil, protokol</p>
<p><strong>Packet Details:</strong> Tanlangan paket haqida batafsil (OSI qatlamlari bo'yicha)</p>
<p><strong>Packet Bytes:</strong> Xom (raw) ma'lumot — hex va ASCII</p>
</div>
<h3>🔍 Filtrlash — eng muhim ko'nikma</h3>
<pre><code># Protokol bo'yicha
http          → faqat HTTP
dns           → faqat DNS so'rovlar
tcp           → faqat TCP
udp           → faqat UDP

# IP bo'yicha
ip.addr == 192.168.1.1         → bu IP ga aloqador
ip.src == 192.168.1.100        → faqat bu manbaa
ip.dst == 8.8.8.8              → faqat bu manzil

# Port bo'yicha
tcp.port == 80                 → HTTP trafik
tcp.port == 443                → HTTPS trafik

# Kombinatsiya
http && ip.addr == 192.168.1.1
not arp                        → ARP ni ko'rsatma</code></pre>
<h3>⚠️ HTTP da parolni ushlash (demo)</h3>
<pre><code># Filter: http
# HTTP POST so'rovni toping
# "Follow TCP Stream" bosing

# Natijada ko'rasiz:
POST /login HTTP/1.1
username=admin&password=12345   ← OCHIQ MATN!

# HTTPS da esa:
TLSv1.3 Encrypted Data         ← shifrlangan, ko'rinmaydi</code></pre>
<h3>🛡️ Wireshark dan himoya</h3>
<ul>
<li>Har doim HTTPS ishlatng</li>
<li>VPN orqali ulaning ommaviy Wi-Fi da</li>
<li>WPA3 shifrlangan Wi-Fi tarmog'ida ishlang</li>
</ul>`,
          ru:`<h2>Wireshark — Анализатор сети</h2>
<p>Wireshark позволяет видеть все "пакеты" проходящие через сеть. Как будто делает невидимые данные в сетевом кабеле видимыми.</p>
<h3>🔍 Фильтрация — ключевой навык</h3>
<pre><code># По протоколу
http          → только HTTP
dns           → только DNS запросы
tcp           → только TCP

# По IP
ip.addr == 192.168.1.1
ip.src == 192.168.1.100
ip.dst == 8.8.8.8

# По порту
tcp.port == 80     → HTTP трафик
tcp.port == 443    → HTTPS трафик

# Комбинации
http && ip.addr == 192.168.1.1
not arp</code></pre>
<h3>⚠️ Перехват пароля через HTTP (демо)</h3>
<pre><code># Фильтр: http → найдите POST запрос
# "Follow TCP Stream"

POST /login HTTP/1.1
username=admin&password=12345   ← ОТКРЫТЫЙ ТЕКСТ!

# В HTTPS:
TLSv1.3 Encrypted Data         ← зашифровано</code></pre>`,
          en:`<h2>Wireshark — Network Analyser</h2>
<p>Wireshark lets you see all "packets" passing through the network — making invisible network data visible.</p>
<h3>🔍 Filtering — the key skill</h3>
<pre><code># By protocol
http          → HTTP only
dns           → DNS queries only
tcp           → TCP only

# By IP
ip.addr == 192.168.1.1
ip.src == 192.168.1.100

# By port
tcp.port == 80     → HTTP traffic
tcp.port == 443    → HTTPS traffic

# Combined
http && ip.addr == 192.168.1.1</code></pre>
<h3>⚠️ Capturing a password over HTTP (demo)</h3>
<pre><code># Filter: http → find POST request
# Click "Follow TCP Stream"

POST /login HTTP/1.1
username=admin&password=12345   ← PLAIN TEXT!

# Over HTTPS:
TLSv1.3 Encrypted Data         ← encrypted, hidden</code></pre>`
        },
        quiz:[
          { q:{uz:"Wireshark da 'ip.src == 192.168.1.5' filtri nimani ko'rsatadi?",ru:"Что показывает фильтр 'ip.src == 192.168.1.5' в Wireshark?",en:"What does filter 'ip.src == 192.168.1.5' show in Wireshark?"},
            options:{uz:["Bu IP ga kelgan paketlar","Bu IP dan chiqqan paketlar","Barcha tarmoq","DNS so'rovlar"],ru:["Пакеты пришедшие на этот IP","Пакеты отправленные с этого IP","Вся сеть","DNS запросы"],en:["Packets arriving at this IP","Packets sent from this IP","Entire network","DNS queries"]}, answer:1 },
          { q:{uz:"HTTP da parol xavfli bo'lishining sababi?",ru:"Почему пароль в HTTP опасен?",en:"Why is a password in HTTP dangerous?"},
            options:{uz:["Parol juda qisqa","Ma'lumot shifrlangan bo'lmaydi — Wireshark bilan ko'rish mumkin","Server sekin ishlaydi","Parol saqlanmaydi"],ru:["Пароль слишком короткий","Данные не зашифрованы — видны через Wireshark","Сервер работает медленно","Пароль не сохраняется"],en:["Password is too short","Data isn't encrypted — visible with Wireshark","Server is slow","Password isn't saved"]}, answer:1 }
        ]
      },
      {
        id:"c1w4l3",
        title:{ uz:"1-oy yakuniy takrorlash va yo'l xaritasi", ru:"Итоговое повторение 1-го месяца и дорожная карта", en:"Month 1 final review and roadmap" },
        duration:"30 daq",
        content:{
          uz:`<h2>1-oy: Yakuniy takrorlash</h2>
<p>Tabriklaymiz! Siz birinchi oyni muvaffaqiyatli tugatdingiz. Keling, o'rganganlarimiзni eslaylik va oldinda nima borligini ko'raylik.</p>
<h3>✅ 1-oyda o'rganganlaringiz</h3>
<div class="info-box">
<p>✓ Kiberxavfsizlik nima va CIA triada</p>
<p>✓ White/Black/Grey hat farqi</p>
<p>✓ Kompyuter tuzilmasi (CPU, RAM, HDD)</p>
<p>✓ Internet qanday ishlaydi (DNS, HTTP, HTTPS)</p>
<p>✓ IP manzillar va portlar</p>
<p>✓ Mustahkam parol yaratish va 2FA</p>
<p>✓ Linux o'rnatish (VM, WSL)</p>
<p>✓ Terminal asosiy buyruqlari</p>
<p>✓ Fayl tizimi va ruxsatlar</p>
<p>✓ Nmap bilan port skanerlash</p>
<p>✓ Wireshark bilan tarmoq tahlili</p>
</div>
<h3>📊 Bilim darajangizni tekshiring</h3>
<pre><code>Savol 1: Uy routeringizning IP manzilini toping
Javob: ip route | grep default   → 192.168.x.1

Savol 2: O'z kompyutergizdagi ochiq portlarni toping
Javob: nmap localhost yoki nmap 127.0.0.1

Savol 3: /etc/hosts faylini o'qing
Javob: cat /etc/hosts

Savol 4: chmod 644 va chmod 755 farqi nima?
644 → egasi: rw, guruh+boshqa: r
755 → egasi: rwx, guruh+boshqa: rx</code></pre>
<h3>🗺️ 2-oy: Nima o'rganamiz?</h3>
<div class="info-box">
<p><strong>5-hafta: Web xavfsizligi asoslari</strong> — HTML, HTTP metodlari, cookie, session</p>
<p><strong>6-hafta: Web hujumlar</strong> — SQL injection, XSS, CSRF — qanday ishlaydi</p>
<p><strong>7-hafta: Tarmoq hujumlari</strong> — ARP poisoning, MITM, Wi-Fi hujumlar</p>
<p><strong>8-hafta: Kriptografiya</strong> — shifrlash, hash, parol buzish texnikalar</p>
</div>
<h3>🏆 Qo'shimcha mashq resurslari</h3>
<ul>
<li><strong>TryHackMe.com</strong> — boshlang'ich uchun qulay, bepul zalflar</li>
<li><strong>PicoCTF.com</strong> — o'yinbop CTF topshiriqlari</li>
<li><strong>OverTheWire.org</strong> — Bandit wargame (Linux amaliyoti)</li>
<li><strong>Cybrary.it</strong> — bepul video kurslar</li>
</ul>
<h3>💪 Motivatsiya</h3>
<p>Dastlabki oy eng qiyin — tushunchalar ko'p, amaliyot kam. Lekin siz eng muhim qadamni bosib o'tdingiz: <strong>boshladingiz!</strong></p>
<p>Har kuni 1-2 soat davom eting. 4 oydan keyin siz professional kiberxavfsizlik mutaxassisiga aylanishga tayyorlanib bo'lasiz.</p>`,
          ru:`<h2>1-й месяц: Итоговое повторение</h2>
<p>Поздравляем! Вы успешно завершили первый месяц. Давайте вспомним что изучили и посмотрим что впереди.</p>
<h3>✅ Что вы изучили за 1-й месяц</h3>
<div class="info-box">
<p>✓ Что такое кибербезопасность и триада CIA</p>
<p>✓ Разница между White/Black/Grey hat</p>
<p>✓ Устройство компьютера (CPU, RAM, HDD)</p>
<p>✓ Как работает интернет (DNS, HTTP, HTTPS)</p>
<p>✓ IP адреса и порты</p>
<p>✓ Создание надёжных паролей и 2FA</p>
<p>✓ Установка Linux (VM, WSL)</p>
<p>✓ Основные команды терминала</p>
<p>✓ Файловая система и права</p>
<p>✓ Сканирование портов с Nmap</p>
<p>✓ Анализ сети с Wireshark</p>
</div>
<h3>🗺️ 2-й месяц: Что будем изучать?</h3>
<div class="info-box">
<p><strong>5-я неделя: Основы веб-безопасности</strong> — HTML, HTTP методы, cookie, session</p>
<p><strong>6-я неделя: Веб-атаки</strong> — SQL injection, XSS, CSRF</p>
<p><strong>7-я неделя: Сетевые атаки</strong> — ARP poisoning, MITM, Wi-Fi атаки</p>
<p><strong>8-я неделя: Криптография</strong> — шифрование, хеш, взлом паролей</p>
</div>`,
          en:`<h2>Month 1: Final Review</h2>
<p>Congratulations! You've successfully completed month one. Let's recap what we learned and look at what's ahead.</p>
<h3>✅ What you learned in Month 1</h3>
<div class="info-box">
<p>✓ What cybersecurity is and the CIA triad</p>
<p>✓ Difference between White/Black/Grey hat</p>
<p>✓ Computer components (CPU, RAM, HDD)</p>
<p>✓ How the internet works (DNS, HTTP, HTTPS)</p>
<p>✓ IP addresses and ports</p>
<p>✓ Creating strong passwords and 2FA</p>
<p>✓ Installing Linux (VM, WSL)</p>
<p>✓ Basic terminal commands</p>
<p>✓ File system and permissions</p>
<p>✓ Port scanning with Nmap</p>
<p>✓ Network analysis with Wireshark</p>
</div>
<h3>🗺️ Month 2: What's next?</h3>
<div class="info-box">
<p><strong>Week 5: Web security basics</strong> — HTML, HTTP methods, cookies, sessions</p>
<p><strong>Week 6: Web attacks</strong> — SQL injection, XSS, CSRF</p>
<p><strong>Week 7: Network attacks</strong> — ARP poisoning, MITM, Wi-Fi attacks</p>
<p><strong>Week 8: Cryptography</strong> — encryption, hashing, password cracking</p>
</div>`
        },
        quiz:[
          { q:{uz:"1-oyda qaysi vosita tarmoq paketlarini tahlil qiladi?",ru:"Какой инструмент анализирует сетевые пакеты в 1-м месяце?",en:"Which tool from month 1 analyses network packets?"},
            options:{uz:["Nmap","Wireshark","Metasploit","Burp Suite"],ru:["Nmap","Wireshark","Metasploit","Burp Suite"],en:["Nmap","Wireshark","Metasploit","Burp Suite"]}, answer:1 },
          { q:{uz:"TryHackMe.com nima uchun foydali?",ru:"Для чего полезен TryHackMe.com?",en:"What is TryHackMe.com useful for?"},
            options:{uz:["Video ko'rish","Kiberxavfsizlik amaliyoti va CTF","Dastur yuklab olish","Yangiliklar o'qish"],ru:["Просмотр видео","Практика кибербезопасности и CTF","Скачивание программ","Чтение новостей"],en:["Watching videos","Cybersecurity practice and CTF","Downloading programs","Reading news"]}, answer:1 }
        ]
      }
    ]
  }
];
