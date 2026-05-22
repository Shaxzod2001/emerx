const courses = [
  // ==================== LEVEL 1: BEGINNER ====================
  {
    id: "c1",
    level: 1,
    levelName: { uz: "Boshlang'ich", ru: "Начальный", en: "Beginner" },
    icon: "🛡️",
    color: "#00ff88",
    title: { uz: "Kiberxavfsizlikka Kirish", ru: "Введение в кибербезопасность", en: "Introduction to Cybersecurity" },
    desc: {
      uz: "Kiberxavfsizlikning asosiy tushunchalari va soha haqida umumiy bilim",
      ru: "Основные понятия кибербезопасности и общее знание отрасли",
      en: "Core concepts of cybersecurity and general industry knowledge"
    },
    duration: { uz: "4 soat", ru: "4 часа", en: "4 hours" },
    lessons: [
      {
        id: "c1l1", title: { uz: "Kiberxavfsizlik nima?", ru: "Что такое кибербезопасность?", en: "What is Cybersecurity?" },
        duration: "20 min",
        content: {
          uz: `<h2>Kiberxavfsizlik nima?</h2>
<p>Kiberxavfsizlik — bu kompyuter tizimlari, tarmoqlar va ma'lumotlarni ruxsatsiz kirish, o'g'irlash yoki shikastlanishdan himoya qilish amaliyotidir.</p>

<h3>🎯 Asosiy maqsad: CIA Triada</h3>
<div class="info-box">
<p><strong>C — Confidentiality (Maxfiylik):</strong> Ma'lumotlarga faqat vakolatli shaxslar kirishi mumkin</p>
<p><strong>I — Integrity (Yaxlitlik):</strong> Ma'lumotlar o'zgartirilmagan bo'lishi kerak</p>
<p><strong>A — Availability (Mavjudlik):</strong> Tizimlar va ma'lumotlar kerak bo'lganda ishlab turishi kerak</p>
</div>

<h3>📊 Kiberxavfsizlik sohalari</h3>
<ul>
<li><strong>Network Security</strong> — Tarmoq xavfsizligi</li>
<li><strong>Application Security</strong> — Dastur xavfsizligi</li>
<li><strong>Cloud Security</strong> — Bulut xavfsizligi</li>
<li><strong>Cryptography</strong> — Kriptografiya</li>
<li><strong>Incident Response</strong> — Hodisalarga javob berish</li>
<li><strong>Forensics</strong> — Raqamli ekspertiza</li>
</ul>

<h3>💡 Haker turlari</h3>
<div class="info-box">
<p><strong>White Hat (Oq shapka):</strong> Qonuniy, etik xakerlar — kompaniyalar uchun ishlaydi</p>
<p><strong>Black Hat (Qora shapka):</strong> Noqonuniy, zararli xakerlar</p>
<p><strong>Grey Hat (Kulrang shapka):</strong> O'rta holatdagilar</p>
</div>

<h3>🚀 Karyera yo'llari</h3>
<ul>
<li>Penetration Tester — $80,000-$150,000/yil</li>
<li>Security Analyst — $70,000-$130,000/yil</li>
<li>Incident Responder — $75,000-$140,000/yil</li>
<li>Security Engineer — $90,000-$160,000/yil</li>
</ul>`,
          ru: `<h2>Что такое кибербезопасность?</h2>
<p>Кибербезопасность — это практика защиты компьютерных систем, сетей и данных от несанкционированного доступа, кражи или повреждения.</p>

<h3>🎯 Основная цель: Триада CIA</h3>
<div class="info-box">
<p><strong>C — Confidentiality (Конфиденциальность):</strong> К данным могут обращаться только авторизованные лица</p>
<p><strong>I — Integrity (Целостность):</strong> Данные должны быть неизменными</p>
<p><strong>A — Availability (Доступность):</strong> Системы и данные должны работать когда нужно</p>
</div>

<h3>📊 Области кибербезопасности</h3>
<ul>
<li><strong>Network Security</strong> — Безопасность сети</li>
<li><strong>Application Security</strong> — Безопасность приложений</li>
<li><strong>Cloud Security</strong> — Безопасность облака</li>
<li><strong>Cryptography</strong> — Криптография</li>
<li><strong>Incident Response</strong> — Реагирование на инциденты</li>
<li><strong>Forensics</strong> — Цифровая криминалистика</li>
</ul>

<h3>💡 Типы хакеров</h3>
<div class="info-box">
<p><strong>White Hat (Белая шляпа):</strong> Законные, этичные хакеры — работают для компаний</p>
<p><strong>Black Hat (Чёрная шляпа):</strong> Незаконные, вредоносные хакеры</p>
<p><strong>Grey Hat (Серая шляпа):</strong> Промежуточное положение</p>
</div>

<h3>🚀 Карьерные пути</h3>
<ul>
<li>Penetration Tester — $80,000-$150,000/год</li>
<li>Security Analyst — $70,000-$130,000/год</li>
<li>Incident Responder — $75,000-$140,000/год</li>
<li>Security Engineer — $90,000-$160,000/год</li>
</ul>`,
          en: `<h2>What is Cybersecurity?</h2>
<p>Cybersecurity is the practice of protecting computer systems, networks, and data from unauthorized access, theft, or damage.</p>

<h3>🎯 Core Goal: The CIA Triad</h3>
<div class="info-box">
<p><strong>C — Confidentiality:</strong> Only authorized individuals can access data</p>
<p><strong>I — Integrity:</strong> Data must remain unaltered</p>
<p><strong>A — Availability:</strong> Systems and data must be accessible when needed</p>
</div>

<h3>📊 Cybersecurity Domains</h3>
<ul>
<li><strong>Network Security</strong> — Protecting network infrastructure</li>
<li><strong>Application Security</strong> — Securing software</li>
<li><strong>Cloud Security</strong> — Protecting cloud environments</li>
<li><strong>Cryptography</strong> — Encryption and hashing</li>
<li><strong>Incident Response</strong> — Handling breaches</li>
<li><strong>Forensics</strong> — Digital investigation</li>
</ul>

<h3>💡 Hacker Types</h3>
<div class="info-box">
<p><strong>White Hat:</strong> Legal, ethical hackers — work for companies</p>
<p><strong>Black Hat:</strong> Illegal, malicious hackers</p>
<p><strong>Grey Hat:</strong> In between</p>
</div>

<h3>🚀 Career Paths</h3>
<ul>
<li>Penetration Tester — $80,000-$150,000/year</li>
<li>Security Analyst — $70,000-$130,000/year</li>
<li>Incident Responder — $75,000-$140,000/year</li>
<li>Security Engineer — $90,000-$160,000/year</li>
</ul>`
        },
        quiz: [
          {
            q: { uz: "CIA triadasi nimalardan iborat?", ru: "Из чего состоит триада CIA?", en: "What does the CIA triad consist of?" },
            options: { uz: ["Maxfiylik, Yaxlitlik, Mavjudlik", "Shifrlaш, Identifikatsiya, Autentifikatsiya", "Kompyuter, Internet, Dastur", "Qayta tiklash, Arxivlash, Tekshirish"], ru: ["Конфиденциальность, Целостность, Доступность", "Шифрование, Идентификация, Аутентификация", "Компьютер, Интернет, Программа", "Восстановление, Архив, Аудит"], en: ["Confidentiality, Integrity, Availability", "Encryption, Identification, Authentication", "Computer, Internet, Application", "Recovery, Archiving, Auditing"] },
            answer: 0
          },
          {
            q: { uz: "Qonuniy xakerlar qanday nomlanadi?", ru: "Как называются законные хакеры?", en: "What are legal hackers called?" },
            options: { uz: ["Black Hat", "White Hat", "Grey Hat", "Red Hat"], ru: ["Black Hat", "White Hat", "Grey Hat", "Red Hat"], en: ["Black Hat", "White Hat", "Grey Hat", "Red Hat"] },
            answer: 1
          }
        ]
      },
      {
        id: "c1l2", title: { uz: "Kompyuter tarmoqlari asoslari", ru: "Основы компьютерных сетей", en: "Computer Networks Basics" },
        duration: "25 min",
        content: {
          uz: `<h2>Kompyuter tarmoqlari asoslari</h2>
<p>Tarmoq — bu ma'lumot almashish uchun ulangan qurilmalar majmui. Kiberxavfsizlik mutaxassisi uchun tarmoqni tushunish juda muhim.</p>

<h3>📡 OSI Modeli (7 qatlam)</h3>
<div class="info-box">
<p><strong>7 — Application (Ilova):</strong> HTTP, FTP, DNS, SMTP</p>
<p><strong>6 — Presentation (Taqdimot):</strong> SSL/TLS, shifrlaш</p>
<p><strong>5 — Session (Sessiya):</strong> Ulanishlarni boshqarish</p>
<p><strong>4 — Transport (Transport):</strong> TCP, UDP</p>
<p><strong>3 — Network (Tarmoq):</strong> IP, router</p>
<p><strong>2 — Data Link (Ma'lumot havolasi):</strong> MAC, switch</p>
<p><strong>1 — Physical (Fizik):</strong> Simlar, optik tolalar</p>
</div>

<h3>🔑 Muhim protokollar</h3>
<ul>
<li><strong>TCP/IP</strong> — Internetning asosi</li>
<li><strong>HTTP/HTTPS</strong> — Web trafik</li>
<li><strong>DNS</strong> — Domen nomlari tizimi</li>
<li><strong>SSH</strong> — Xavfsiz uzoqdan kirish</li>
<li><strong>FTP/SFTP</strong> — Fayl uzatish</li>
</ul>

<h3>🌐 IP manzillar</h3>
<pre><code>IPv4: 192.168.1.1 (4 oktet, 32 bit)
IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 bit)

Shaxsiy IP diapazoni:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16</code></pre>

<h3>🛡️ Tarmoq xavfsizligi asoslari</h3>
<ul>
<li><strong>Firewall</strong> — Trafik filtri</li>
<li><strong>VPN</strong> — Virtual xususiy tarmoq</li>
<li><strong>IDS/IPS</strong> — Hujumlarni aniqlash/oldini olish</li>
<li><strong>DMZ</strong> — Demilitarizatsiya zonasi</li>
</ul>`,
          ru: `<h2>Основы компьютерных сетей</h2>
<p>Сеть — это совокупность устройств, подключённых для обмена данными. Понимание сетей критически важно для специалиста по кибербезопасности.</p>

<h3>📡 Модель OSI (7 уровней)</h3>
<div class="info-box">
<p><strong>7 — Application (Приложение):</strong> HTTP, FTP, DNS, SMTP</p>
<p><strong>6 — Presentation (Представление):</strong> SSL/TLS, шифрование</p>
<p><strong>5 — Session (Сеанс):</strong> Управление соединениями</p>
<p><strong>4 — Transport (Транспорт):</strong> TCP, UDP</p>
<p><strong>3 — Network (Сеть):</strong> IP, маршрутизатор</p>
<p><strong>2 — Data Link (Канальный):</strong> MAC, коммутатор</p>
<p><strong>1 — Physical (Физический):</strong> Кабели, оптоволокно</p>
</div>

<h3>🔑 Важные протоколы</h3>
<ul>
<li><strong>TCP/IP</strong> — Основа интернета</li>
<li><strong>HTTP/HTTPS</strong> — Веб трафик</li>
<li><strong>DNS</strong> — Система доменных имён</li>
<li><strong>SSH</strong> — Защищённый удалённый доступ</li>
<li><strong>FTP/SFTP</strong> — Передача файлов</li>
</ul>

<h3>🌐 IP адреса</h3>
<pre><code>IPv4: 192.168.1.1 (4 октета, 32 бита)
IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 бит)

Частные диапазоны IP:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16</code></pre>

<h3>🛡️ Основы сетевой безопасности</h3>
<ul>
<li><strong>Firewall</strong> — Фильтр трафика</li>
<li><strong>VPN</strong> — Виртуальная частная сеть</li>
<li><strong>IDS/IPS</strong> — Обнаружение/предотвращение вторжений</li>
<li><strong>DMZ</strong> — Демилитаризованная зона</li>
</ul>`,
          en: `<h2>Computer Networks Basics</h2>
<p>A network is a collection of devices connected to share data. Understanding networks is critical for cybersecurity professionals.</p>

<h3>📡 OSI Model (7 Layers)</h3>
<div class="info-box">
<p><strong>7 — Application:</strong> HTTP, FTP, DNS, SMTP</p>
<p><strong>6 — Presentation:</strong> SSL/TLS, encryption</p>
<p><strong>5 — Session:</strong> Connection management</p>
<p><strong>4 — Transport:</strong> TCP, UDP</p>
<p><strong>3 — Network:</strong> IP, routers</p>
<p><strong>2 — Data Link:</strong> MAC, switches</p>
<p><strong>1 — Physical:</strong> Cables, fiber optics</p>
</div>

<h3>🔑 Key Protocols</h3>
<ul>
<li><strong>TCP/IP</strong> — The backbone of the Internet</li>
<li><strong>HTTP/HTTPS</strong> — Web traffic</li>
<li><strong>DNS</strong> — Domain Name System</li>
<li><strong>SSH</strong> — Secure remote access</li>
<li><strong>FTP/SFTP</strong> — File transfer</li>
</ul>

<h3>🌐 IP Addresses</h3>
<pre><code>IPv4: 192.168.1.1 (4 octets, 32 bits)
IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 bits)

Private IP ranges:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16</code></pre>

<h3>🛡️ Network Security Basics</h3>
<ul>
<li><strong>Firewall</strong> — Traffic filter</li>
<li><strong>VPN</strong> — Virtual Private Network</li>
<li><strong>IDS/IPS</strong> — Intrusion Detection/Prevention</li>
<li><strong>DMZ</strong> — Demilitarized Zone</li>
</ul>`
        },
        quiz: [
          {
            q: { uz: "OSI modeli necha qavatdan iborat?", ru: "Из скольки уровней состоит модель OSI?", en: "How many layers does the OSI model have?" },
            options: { uz: ["5", "6", "7", "8"], ru: ["5", "6", "7", "8"], en: ["5", "6", "7", "8"] },
            answer: 2
          },
          {
            q: { uz: "Qaysi protokol xavfsiz uzoqdan kirishni ta'minlaydi?", ru: "Какой протокол обеспечивает безопасный удалённый доступ?", en: "Which protocol provides secure remote access?" },
            options: { uz: ["FTP", "HTTP", "SSH", "DNS"], ru: ["FTP", "HTTP", "SSH", "DNS"], en: ["FTP", "HTTP", "SSH", "DNS"] },
            answer: 2
          }
        ]
      },
      {
        id: "c1l3", title: { uz: "Linux asoslari", ru: "Основы Linux", en: "Linux Fundamentals" },
        duration: "30 min",
        content: {
          uz: `<h2>Linux asoslari — Kiberxavfsizlik uchun</h2>
<p>Linux — kiberxavfsizlik sohasida eng ko'p ishlatiladigan operatsion tizim. Kali Linux, Ubuntu, Parrot OS kabi distributivlar keng qo'llaniladi.</p>

<h3>📁 Asosiy buyruqlar</h3>
<pre><code># Navigatsiya
ls -la          # Fayl ro'yxati
cd /etc         # Papkaga o'tish
pwd             # Joriy papka
find / -name "*.conf"  # Fayl qidirish

# Fayl operatsiyalari
cat file.txt    # Faylni o'qish
nano file.txt   # Fayl tahrirlash
cp src dst      # Nusxa olish
mv old new      # Ko'chirish
rm -rf dir/     # O'chirish

# Tarmoq
ifconfig        # IP manzil
netstat -an     # Ulanishlar
ping 8.8.8.8    # Ping
nmap -sV target # Port skanerlash

# Tizim
ps aux          # Jarayonlar
top             # Resurslar
chmod 755 file  # Ruxsatlar
sudo su         # Root kirish</code></pre>

<h3>🔒 Fayl ruxsatlari</h3>
<pre><code>chmod 777 - barcha uchun to'liq
chmod 755 - egasi to'liq, boshqalar o'qish
chmod 644 - egasi yozish, boshqalar o'qish

rwxrwxrwx = 777
r=4, w=2, x=1</code></pre>

<h3>🛠️ Kiberxavfsizlik vositalari</h3>
<ul>
<li><strong>Kali Linux</strong> — Pen-test uchun maxsus distributiv</li>
<li><strong>Wireshark</strong> — Tarmoq analizatori</li>
<li><strong>Nmap</strong> — Port skaneri</li>
<li><strong>Metasploit</strong> — Ekspluatatsiya framework</li>
<li><strong>Burp Suite</strong> — Web app tester</li>
</ul>`,
          ru: `<h2>Основы Linux для кибербезопасности</h2>
<p>Linux — наиболее используемая ОС в кибербезопасности. Дистрибутивы Kali Linux, Ubuntu, Parrot OS широко применяются.</p>

<h3>📁 Основные команды</h3>
<pre><code># Навигация
ls -la          # Список файлов
cd /etc         # Перейти в папку
pwd             # Текущая папка
find / -name "*.conf"  # Поиск файлов

# Файловые операции
cat file.txt    # Читать файл
nano file.txt   # Редактировать файл
cp src dst      # Копировать
mv old new      # Переместить
rm -rf dir/     # Удалить

# Сеть
ifconfig        # IP адрес
netstat -an     # Соединения
ping 8.8.8.8    # Пинг
nmap -sV target # Сканирование портов

# Система
ps aux          # Процессы
top             # Ресурсы
chmod 755 file  # Права
sudo su         # Root доступ</code></pre>

<h3>🔒 Права на файлы</h3>
<pre><code>chmod 777 - полный доступ для всех
chmod 755 - владелец полный, остальные чтение
chmod 644 - владелец запись, остальные чтение

rwxrwxrwx = 777
r=4, w=2, x=1</code></pre>

<h3>🛠️ Инструменты кибербезопасности</h3>
<ul>
<li><strong>Kali Linux</strong> — Специальный дистрибутив для пентеста</li>
<li><strong>Wireshark</strong> — Анализатор сети</li>
<li><strong>Nmap</strong> — Сканер портов</li>
<li><strong>Metasploit</strong> — Фреймворк эксплуатации</li>
<li><strong>Burp Suite</strong> — Тестер веб-приложений</li>
</ul>`,
          en: `<h2>Linux Fundamentals for Cybersecurity</h2>
<p>Linux is the most used OS in cybersecurity. Distributions like Kali Linux, Ubuntu, and Parrot OS are widely used.</p>

<h3>📁 Essential Commands</h3>
<pre><code># Navigation
ls -la          # List files
cd /etc         # Change directory
pwd             # Current directory
find / -name "*.conf"  # Search files

# File Operations
cat file.txt    # Read file
nano file.txt   # Edit file
cp src dst      # Copy
mv old new      # Move
rm -rf dir/     # Delete

# Networking
ifconfig        # IP address
netstat -an     # Connections
ping 8.8.8.8    # Ping
nmap -sV target # Port scanning

# System
ps aux          # Processes
top             # Resources
chmod 755 file  # Permissions
sudo su         # Root access</code></pre>

<h3>🔒 File Permissions</h3>
<pre><code>chmod 777 - full access for all
chmod 755 - owner full, others read
chmod 644 - owner write, others read

rwxrwxrwx = 777
r=4, w=2, x=1</code></pre>

<h3>🛠️ Cybersecurity Tools</h3>
<ul>
<li><strong>Kali Linux</strong> — Dedicated pen-test distro</li>
<li><strong>Wireshark</strong> — Network analyzer</li>
<li><strong>Nmap</strong> — Port scanner</li>
<li><strong>Metasploit</strong> — Exploitation framework</li>
<li><strong>Burp Suite</strong> — Web app tester</li>
</ul>`
        },
        quiz: [
          {
            q: { uz: "chmod 755 nima ma'noni anglatadi?", ru: "Что означает chmod 755?", en: "What does chmod 755 mean?" },
            options: {
              uz: ["Barcha uchun to'liq ruxsat", "Egasi to'liq, boshqalar faqat o'qish va bajarish", "Faqat o'qish", "Hech kimga ruxsat yo'q"],
              ru: ["Полный доступ для всех", "Владелец полный, остальные чтение и выполнение", "Только чтение", "Нет доступа"],
              en: ["Full access for all", "Owner full, others read+execute only", "Read only", "No access"]
            },
            answer: 1
          }
        ]
      }
    ]
  },

  // ==================== LEVEL 2: INTERMEDIATE ====================
  {
    id: "c2",
    level: 2,
    levelName: { uz: "O'rta daraja", ru: "Средний уровень", en: "Intermediate" },
    icon: "⚔️",
    color: "#00aaff",
    title: { uz: "Web Ilovalar Xavfsizligi", ru: "Безопасность веб-приложений", en: "Web Application Security" },
    desc: {
      uz: "OWASP Top 10, SQL Injection, XSS va boshqa web zaifliklar",
      ru: "OWASP Top 10, SQL инъекции, XSS и другие веб-уязвимости",
      en: "OWASP Top 10, SQL Injection, XSS and other web vulnerabilities"
    },
    duration: { uz: "6 soat", ru: "6 часов", en: "6 hours" },
    lessons: [
      {
        id: "c2l1", title: { uz: "OWASP Top 10", ru: "OWASP Top 10", en: "OWASP Top 10" },
        duration: "35 min",
        content: {
          uz: `<h2>OWASP Top 10 — Web Zaifliklar</h2>
<p>OWASP (Open Web Application Security Project) — web ilovalar xavfsizligining eng katta tashkiloti. Top 10 — eng keng tarqalgan zaifliklar ro'yxati.</p>

<h3>📋 OWASP Top 10 (2021)</h3>
<div class="info-box">
<p><strong>A01 — Broken Access Control:</strong> Ruxsat boshqaruvining buzilishi</p>
<p><strong>A02 — Cryptographic Failures:</strong> Kriptografik muvaffaqiyatsizliklar</p>
<p><strong>A03 — Injection:</strong> SQL, OS, LDAP injeksiyalari</p>
<p><strong>A04 — Insecure Design:</strong> Xavfsiz bo'lmagan dizayn</p>
<p><strong>A05 — Security Misconfiguration:</strong> Noto'g'ri xavfsizlik sozlamalari</p>
<p><strong>A06 — Vulnerable Components:</strong> Zaif komponentlar</p>
<p><strong>A07 — Identification Failures:</strong> Autentifikatsiya muammolari</p>
<p><strong>A08 — Software Integrity Failures:</strong> Dasturiy ta'minot yaxlitlik muammolari</p>
<p><strong>A09 — Logging Failures:</strong> Jurnallashtirish muammolari</p>
<p><strong>A10 — SSRF:</strong> Server-Side Request Forgery</p>
</div>

<h3>🔍 SQL Injection misoli</h3>
<pre><code># Zaif SQL so'rov:
"SELECT * FROM users WHERE name='" + input + "'"

# Hujum:
input = "' OR '1'='1"

# Natija: barcha foydalanuvchilar qaytariladi!

# Himoya — Prepared Statements:
stmt = conn.prepare("SELECT * FROM users WHERE name = ?")
stmt.execute([input])</code></pre>

<h3>🛡️ XSS (Cross-Site Scripting)</h3>
<pre><code># Zaif kod:
document.write("Salom, " + req.query.name)

# Hujum URL:
?name=&lt;script&gt;alert('XSS')&lt;/script&gt;

# Himoya:
name = escapeHtml(req.query.name)
// yoki Content-Security-Policy header</code></pre>`,
          ru: `<h2>OWASP Top 10 — Веб-уязвимости</h2>
<p>OWASP (Open Web Application Security Project) — крупнейшая организация по безопасности веб-приложений. Top 10 — список наиболее распространённых уязвимостей.</p>

<h3>📋 OWASP Top 10 (2021)</h3>
<div class="info-box">
<p><strong>A01 — Broken Access Control:</strong> Нарушение контроля доступа</p>
<p><strong>A02 — Cryptographic Failures:</strong> Криптографические сбои</p>
<p><strong>A03 — Injection:</strong> SQL, OS, LDAP инъекции</p>
<p><strong>A04 — Insecure Design:</strong> Небезопасный дизайн</p>
<p><strong>A05 — Security Misconfiguration:</strong> Неправильная настройка безопасности</p>
<p><strong>A06 — Vulnerable Components:</strong> Уязвимые компоненты</p>
<p><strong>A07 — Identification Failures:</strong> Проблемы аутентификации</p>
<p><strong>A08 — Software Integrity Failures:</strong> Проблемы целостности ПО</p>
<p><strong>A09 — Logging Failures:</strong> Проблемы логирования</p>
<p><strong>A10 — SSRF:</strong> Подделка запросов на стороне сервера</p>
</div>

<h3>🔍 Пример SQL инъекции</h3>
<pre><code># Уязвимый SQL запрос:
"SELECT * FROM users WHERE name='" + input + "'"

# Атака:
input = "' OR '1'='1"

# Результат: возвращаются все пользователи!

# Защита — Prepared Statements:
stmt = conn.prepare("SELECT * FROM users WHERE name = ?")
stmt.execute([input])</code></pre>

<h3>🛡️ XSS (Cross-Site Scripting)</h3>
<pre><code># Уязвимый код:
document.write("Привет, " + req.query.name)

# Атака через URL:
?name=&lt;script&gt;alert('XSS')&lt;/script&gt;

# Защита:
name = escapeHtml(req.query.name)
// или заголовок Content-Security-Policy</code></pre>`,
          en: `<h2>OWASP Top 10 — Web Vulnerabilities</h2>
<p>OWASP (Open Web Application Security Project) is the largest web application security organization. The Top 10 lists the most common vulnerabilities.</p>

<h3>📋 OWASP Top 10 (2021)</h3>
<div class="info-box">
<p><strong>A01 — Broken Access Control:</strong> Authorization failures</p>
<p><strong>A02 — Cryptographic Failures:</strong> Weak/missing encryption</p>
<p><strong>A03 — Injection:</strong> SQL, OS, LDAP injections</p>
<p><strong>A04 — Insecure Design:</strong> Missing security by design</p>
<p><strong>A05 — Security Misconfiguration:</strong> Wrong security settings</p>
<p><strong>A06 — Vulnerable Components:</strong> Outdated/insecure libraries</p>
<p><strong>A07 — Identification Failures:</strong> Authentication issues</p>
<p><strong>A08 — Software Integrity Failures:</strong> Unverified updates/CI</p>
<p><strong>A09 — Logging Failures:</strong> Insufficient monitoring</p>
<p><strong>A10 — SSRF:</strong> Server-Side Request Forgery</p>
</div>

<h3>🔍 SQL Injection Example</h3>
<pre><code># Vulnerable SQL query:
"SELECT * FROM users WHERE name='" + input + "'"

# Attack:
input = "' OR '1'='1"

# Result: all users returned!

# Defense — Prepared Statements:
stmt = conn.prepare("SELECT * FROM users WHERE name = ?")
stmt.execute([input])</code></pre>

<h3>🛡️ XSS (Cross-Site Scripting)</h3>
<pre><code># Vulnerable code:
document.write("Hello, " + req.query.name)

# Attack URL:
?name=&lt;script&gt;alert('XSS')&lt;/script&gt;

# Defense:
name = escapeHtml(req.query.name)
// or use Content-Security-Policy header</code></pre>`
        },
        quiz: [
          {
            q: { uz: "SQL Injection'dan himoyalanishning eng yaxshi usuli?", ru: "Лучший способ защиты от SQL инъекций?", en: "Best defense against SQL Injection?" },
            options: { uz: ["Input uzunligini cheklash", "Prepared Statements ishlatish", "HTTPS ishlatish", "Parolni shifrlash"], ru: ["Ограничить длину ввода", "Использовать Prepared Statements", "Использовать HTTPS", "Шифровать пароль"], en: ["Limit input length", "Use Prepared Statements", "Use HTTPS", "Encrypt passwords"] },
            answer: 1
          }
        ]
      },
      {
        id: "c2l2", title: { uz: "Kriptografiya asoslari", ru: "Основы криптографии", en: "Cryptography Basics" },
        duration: "30 min",
        content: {
          uz: `<h2>Kriptografiya asoslari</h2>
<p>Kriptografiya — ma'lumotlarni himoya qilish uchun matematik usullar yig'indisi.</p>

<h3>🔐 Shifrlash turlari</h3>
<div class="info-box">
<p><strong>Simmetrik shifrlash:</strong> Bir xil kalit shifrlash va deshifrlash uchun (AES, DES, 3DES)</p>
<p><strong>Asimmetrik shifrlash:</strong> Ochiq/yopiq kalit jufti (RSA, ECC, ElGamal)</p>
<p><strong>Hash funksiyalar:</strong> Bir tomonlama (MD5, SHA-1, SHA-256, SHA-3)</p>
</div>

<h3>🔑 AES shifrlash (Simmetrik)</h3>
<pre><code>from Crypto.Cipher import AES
import base64

key = b'16bytekey1234567'  # 128-bit kalit
cipher = AES.new(key, AES.MODE_CBC)
encrypted = cipher.encrypt(b'Hello World!!!!!')
print(base64.b64encode(encrypted))</code></pre>

<h3>📝 Hash funksiyalar</h3>
<pre><code">import hashlib

text = "password123"
# SHA-256
h = hashlib.sha256(text.encode()).hexdigest()
print(h)
# 64 ta hex belgisi

# MD5 (zaif, ishlatmang!)
h2 = hashlib.md5(text.encode()).hexdigest()
# 32 ta hex belgisi</code></pre>

<h3>🌐 HTTPS qanday ishlaydi?</h3>
<ol>
<li>Client "Hello" yuboradi + qo'llab-quvvatlanadigan sifralash ro'yxati</li>
<li>Server sertifikat yuboradi (ochiq kalit bilan)</li>
<li>Client sertifikatni tekshiradi</li>
<li>Simmetrik kalit asimmetrik kalit orqali almashiladi</li>
<li>Barcha trafik simmetrik kalit bilan shifrlanadi</li>
</ol>`,
          ru: `<h2>Основы криптографии</h2>
<p>Криптография — набор математических методов защиты информации.</p>

<h3>🔐 Типы шифрования</h3>
<div class="info-box">
<p><strong>Симметричное шифрование:</strong> Один ключ для шифрования и дешифрования (AES, DES, 3DES)</p>
<p><strong>Асимметричное шифрование:</strong> Пара открытый/закрытый ключ (RSA, ECC, ElGamal)</p>
<p><strong>Хеш-функции:</strong> Одностороннее (MD5, SHA-1, SHA-256, SHA-3)</p>
</div>

<h3>🔑 Шифрование AES (Симметричное)</h3>
<pre><code>from Crypto.Cipher import AES
import base64

key = b'16bytekey1234567'  # 128-битный ключ
cipher = AES.new(key, AES.MODE_CBC)
encrypted = cipher.encrypt(b'Hello World!!!!!')
print(base64.b64encode(encrypted))</code></pre>

<h3>📝 Хеш-функции</h3>
<pre><code>import hashlib

text = "password123"
# SHA-256
h = hashlib.sha256(text.encode()).hexdigest()
print(h)
# 64 hex символа

# MD5 (слабый, не используйте!)
h2 = hashlib.md5(text.encode()).hexdigest()</code></pre>

<h3>🌐 Как работает HTTPS?</h3>
<ol>
<li>Клиент отправляет "Hello" + список поддерживаемых шифров</li>
<li>Сервер отправляет сертификат (с открытым ключом)</li>
<li>Клиент проверяет сертификат</li>
<li>Симметричный ключ передаётся через асимметричный</li>
<li>Весь трафик шифруется симметричным ключом</li>
</ol>`,
          en: `<h2>Cryptography Basics</h2>
<p>Cryptography is a set of mathematical methods to protect information.</p>

<h3>🔐 Types of Encryption</h3>
<div class="info-box">
<p><strong>Symmetric encryption:</strong> One key for both encryption and decryption (AES, DES, 3DES)</p>
<p><strong>Asymmetric encryption:</strong> Public/private key pair (RSA, ECC, ElGamal)</p>
<p><strong>Hash functions:</strong> One-way (MD5, SHA-1, SHA-256, SHA-3)</p>
</div>

<h3>🔑 AES Encryption (Symmetric)</h3>
<pre><code>from Crypto.Cipher import AES
import base64

key = b'16bytekey1234567'  # 128-bit key
cipher = AES.new(key, AES.MODE_CBC)
encrypted = cipher.encrypt(b'Hello World!!!!!')
print(base64.b64encode(encrypted))</code></pre>

<h3>📝 Hash Functions</h3>
<pre><code>import hashlib

text = "password123"
# SHA-256
h = hashlib.sha256(text.encode()).hexdigest()
print(h)  # 64 hex chars

# MD5 (weak, don't use!)
h2 = hashlib.md5(text.encode()).hexdigest()</code></pre>

<h3>🌐 How HTTPS Works</h3>
<ol>
<li>Client sends "Hello" + list of supported ciphers</li>
<li>Server sends certificate (with public key)</li>
<li>Client verifies certificate</li>
<li>Symmetric key is exchanged via asymmetric key</li>
<li>All traffic encrypted with symmetric key</li>
</ol>`
        },
        quiz: [
          {
            q: { uz: "RSA qaysi shifrlash turiga kiradi?", ru: "К какому типу шифрования относится RSA?", en: "What type of encryption is RSA?" },
            options: { uz: ["Simmetrik", "Asimmetrik", "Hash", "Gisrid"], ru: ["Симметричное", "Асимметричное", "Хеш", "Гибридное"], en: ["Symmetric", "Asymmetric", "Hash", "Hybrid"] },
            answer: 1
          }
        ]
      }
    ]
  },

  // ==================== LEVEL 3: ADVANCED ====================
  {
    id: "c3",
    level: 3,
    levelName: { uz: "Ilg'or daraja", ru: "Продвинутый уровень", en: "Advanced" },
    icon: "🔴",
    color: "#ff4444",
    title: { uz: "Penetratsion Test", ru: "Тестирование на проникновение", en: "Penetration Testing" },
    desc: {
      uz: "Professional pen-test metodologiyasi va real dunyo stsenariylari",
      ru: "Профессиональная методология пентеста и реальные сценарии",
      en: "Professional pen-test methodology and real-world scenarios"
    },
    duration: { uz: "8 soat", ru: "8 часов", en: "8 hours" },
    lessons: [
      {
        id: "c3l1", title: { uz: "Pen-test metodologiyasi", ru: "Методология пентеста", en: "Penetration Testing Methodology" },
        duration: "40 min",
        content: {
          uz: `<h2>Penetratsion Test Metodologiyasi</h2>
<p>Pen-test — ruxsat bilan tizimlarga hujum qilib, zaifliklarni topish jarayoni.</p>

<h3>📋 Pen-test bosqichlari</h3>
<div class="info-box">
<p><strong>1. Recon (Razvedka):</strong> Ma'lumot to'plash — OSINT, DNS, Shodan</p>
<p><strong>2. Scanning (Skanerlash):</strong> Portlar, xizmatlar, OS aniqlash</p>
<p><strong>3. Enumeration (Ro'yxatlash):</strong> Xizmatlar, foydalanuvchilar, resurslar</p>
<p><strong>4. Exploitation (Ekspluatatsiya):</strong> Zaifliklarni ishlatish</p>
<p><strong>5. Post-Exploitation:</strong> Tizimda qolish, lateral movement</p>
<p><strong>6. Reporting (Hisobot):</strong> Topilmalarni hujjatlashtirish</p>
</div>

<h3>🔍 Razvedka vositalari</h3>
<pre><code># OSINT
whois target.com          # Domain ma'lumoti
nslookup target.com       # DNS yozuvlari
dig target.com ANY        # Kengaytirilgan DNS

# Faol skanerlash
nmap -sC -sV -oN scan.txt target.com
# -sC: standart skriptlar
# -sV: versiyalarni aniqlash
# -oN: natijalarni saqlash

# Web razvedka
gobuster dir -u http://target.com -w /wordlist.txt
nikto -h http://target.com</code></pre>

<h3>⚔️ Metasploit Framework</h3>
<pre><code>msfconsole

# Exploit qidirish
search eternalblue

# Modulni tanlash
use exploit/windows/smb/ms17_010_eternalblue

# Sozlamalarni ko'rish
show options

# Nishon belgilash
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50

# Ishga tushirish
run</code></pre>

<h3>📝 Pen-test hisobot tuzilmasi</h3>
<ol>
<li>Xulosa (Executive Summary)</li>
<li>Texnik tafsilotlar</li>
<li>Topilgan zaifliklar (CVSS ball bilan)</li>
<li>Dalillar (screenshots, loglar)</li>
<li>Tavsiyalar</li>
<li>Ilovalar</li>
</ol>`,
          ru: `<h2>Методология тестирования на проникновение</h2>
<p>Пентест — процесс атаки на системы с разрешения для поиска уязвимостей.</p>

<h3>📋 Этапы пентеста</h3>
<div class="info-box">
<p><strong>1. Recon (Разведка):</strong> Сбор информации — OSINT, DNS, Shodan</p>
<p><strong>2. Scanning (Сканирование):</strong> Порты, службы, ОС</p>
<p><strong>3. Enumeration (Перечисление):</strong> Службы, пользователи, ресурсы</p>
<p><strong>4. Exploitation (Эксплуатация):</strong> Использование уязвимостей</p>
<p><strong>5. Post-Exploitation:</strong> Закрепление, lateral movement</p>
<p><strong>6. Reporting (Отчётность):</strong> Документирование находок</p>
</div>

<h3>🔍 Инструменты разведки</h3>
<pre><code># OSINT
whois target.com          # Информация о домене
nslookup target.com       # DNS записи
dig target.com ANY        # Расширенный DNS

# Активное сканирование
nmap -sC -sV -oN scan.txt target.com
# -sC: стандартные скрипты
# -sV: определение версий
# -oN: сохранить результаты

# Веб-разведка
gobuster dir -u http://target.com -w /wordlist.txt
nikto -h http://target.com</code></pre>

<h3>⚔️ Metasploit Framework</h3>
<pre><code>msfconsole

# Поиск эксплойта
search eternalblue

# Выбор модуля
use exploit/windows/smb/ms17_010_eternalblue

# Просмотр опций
show options

# Установка цели
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50

# Запуск
run</code></pre>

<h3>📝 Структура отчёта пентеста</h3>
<ol>
<li>Краткое изложение (Executive Summary)</li>
<li>Технические детали</li>
<li>Найденные уязвимости (с баллом CVSS)</li>
<li>Доказательства (скриншоты, логи)</li>
<li>Рекомендации</li>
<li>Приложения</li>
</ol>`,
          en: `<h2>Penetration Testing Methodology</h2>
<p>A pen test is the process of attacking systems with permission to find vulnerabilities.</p>

<h3>📋 Pen-Test Stages</h3>
<div class="info-box">
<p><strong>1. Recon (Reconnaissance):</strong> Information gathering — OSINT, DNS, Shodan</p>
<p><strong>2. Scanning:</strong> Ports, services, OS detection</p>
<p><strong>3. Enumeration:</strong> Services, users, shares</p>
<p><strong>4. Exploitation:</strong> Using vulnerabilities</p>
<p><strong>5. Post-Exploitation:</strong> Persistence, lateral movement</p>
<p><strong>6. Reporting:</strong> Documenting findings</p>
</div>

<h3>🔍 Reconnaissance Tools</h3>
<pre><code># OSINT
whois target.com          # Domain info
nslookup target.com       # DNS records
dig target.com ANY        # Extended DNS

# Active scanning
nmap -sC -sV -oN scan.txt target.com
# -sC: default scripts
# -sV: version detection
# -oN: save results

# Web recon
gobuster dir -u http://target.com -w /wordlist.txt
nikto -h http://target.com</code></pre>

<h3>⚔️ Metasploit Framework</h3>
<pre><code>msfconsole

# Search for exploit
search eternalblue

# Select module
use exploit/windows/smb/ms17_010_eternalblue

# View options
show options

# Set target
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50

# Run
run</code></pre>

<h3>📝 Pen-test Report Structure</h3>
<ol>
<li>Executive Summary</li>
<li>Technical Details</li>
<li>Vulnerabilities Found (with CVSS scores)</li>
<li>Evidence (screenshots, logs)</li>
<li>Recommendations</li>
<li>Appendices</li>
</ol>`
        },
        quiz: [
          {
            q: { uz: "Pen-test birinchi bosqichi qaysi?", ru: "Какой первый этап пентеста?", en: "What is the first stage of pen-testing?" },
            options: { uz: ["Exploitation", "Scanning", "Reconnaissance", "Reporting"], ru: ["Эксплуатация", "Сканирование", "Разведка", "Отчётность"], en: ["Exploitation", "Scanning", "Reconnaissance", "Reporting"] },
            answer: 2
          }
        ]
      }
    ]
  },

  // ==================== LEVEL 4: SENIOR ====================
  {
    id: "c4",
    level: 4,
    levelName: { uz: "Senior daraja", ru: "Уровень Senior", en: "Senior Level" },
    icon: "👑",
    color: "#ffd700",
    title: { uz: "Red Team va SOC Operatsiyalari", ru: "Операции Red Team и SOC", en: "Red Team & SOC Operations" },
    desc: {
      uz: "Professional red team operatsiyalari, threat hunting va xavfsizlik arxitekturasi",
      ru: "Профессиональные операции red team, threat hunting и архитектура безопасности",
      en: "Professional red team operations, threat hunting and security architecture"
    },
    duration: { uz: "10 soat", ru: "10 часов", en: "10 hours" },
    lessons: [
      {
        id: "c4l1", title: { uz: "MITRE ATT&CK Framework", ru: "Фреймворк MITRE ATT&CK", en: "MITRE ATT&CK Framework" },
        duration: "45 min",
        content: {
          uz: `<h2>MITRE ATT&CK Framework</h2>
<p>MITRE ATT&CK — haqiqiy hujumlarga asoslangan taktika va texnikalar bazasi. Butun dunyo bo'yicha xavfsizlik jamoalari tomonidan qo'llaniladi.</p>

<h3>📊 ATT&CK Taktikalari (Tactics)</h3>
<div class="info-box">
<p><strong>TA0001 — Initial Access:</strong> Tizimga dastlabki kirish</p>
<p><strong>TA0002 — Execution:</strong> Zararli kod bajarish</p>
<p><strong>TA0003 — Persistence:</strong> Tizimda qolish</p>
<p><strong>TA0004 — Privilege Escalation:</strong> Huquqlarni kengaytirish</p>
<p><strong>TA0005 — Defense Evasion:</strong> Himoyadan qochish</p>
<p><strong>TA0006 — Credential Access:</strong> Hisob ma'lumotlari olish</p>
<p><strong>TA0007 — Discovery:</strong> Tizim tadqiqi</p>
<p><strong>TA0008 — Lateral Movement:</strong> Tarmoqda harakat</p>
<p><strong>TA0009 — Collection:</strong> Ma'lumot to'plash</p>
<p><strong>TA0010 — Exfiltration:</strong> Ma'lumot chiqarish</p>
<p><strong>TA0011 — Command & Control:</strong> Boshqaruv</p>
<p><strong>TA0040 — Impact:</strong> Ta'sir</p>
</div>

<h3>🔍 Threat Hunting</h3>
<pre><code># Windows Event Log tahlili
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4624  # Kirish hodisalari
} | Select TimeCreated, Message

# Splunk SIEM so'rovi
index=windows EventCode=4688
| stats count by ParentImage, Image
| sort -count

# Sigma qoidasi misoli
title: Suspicious PowerShell Execution
logsource:
  product: windows
  service: system
detection:
  selection:
    EventID: 4688
    CommandLine|contains: 'powershell -enc'
  condition: selection</code></pre>

<h3>🏗️ Xavfsizlik Arxitekturasi</h3>
<ul>
<li><strong>Zero Trust:</strong> "Hech kimga ishonma, hammasini tekshir"</li>
<li><strong>Defense in Depth:</strong> Ko'p qatlamli himoya</li>
<li><strong>Security by Design:</strong> Loyihalash bosqichida xavfsizlik</li>
<li><strong>Least Privilege:</strong> Minimal zarur ruxsatlar</li>
</ul>

<h3>📊 SOC Metrics</h3>
<pre><code>MTTD (Mean Time to Detect): &lt; 1 soat
MTTR (Mean Time to Respond): &lt; 4 soat
False Positive Rate: &lt; 10%
Alert Fatigue: minimallashtirilishi kerak</code></pre>`,
          ru: `<h2>Фреймворк MITRE ATT&CK</h2>
<p>MITRE ATT&CK — база тактик и техник на основе реальных атак. Используется командами безопасности по всему миру.</p>

<h3>📊 Тактики ATT&CK</h3>
<div class="info-box">
<p><strong>TA0001 — Initial Access:</strong> Первоначальный доступ к системе</p>
<p><strong>TA0002 — Execution:</strong> Выполнение вредоносного кода</p>
<p><strong>TA0003 — Persistence:</strong> Закрепление в системе</p>
<p><strong>TA0004 — Privilege Escalation:</strong> Повышение привилегий</p>
<p><strong>TA0005 — Defense Evasion:</strong> Обход защиты</p>
<p><strong>TA0006 — Credential Access:</strong> Доступ к учётным данным</p>
<p><strong>TA0007 — Discovery:</strong> Исследование системы</p>
<p><strong>TA0008 — Lateral Movement:</strong> Горизонтальное перемещение</p>
<p><strong>TA0009 — Collection:</strong> Сбор данных</p>
<p><strong>TA0010 — Exfiltration:</strong> Утечка данных</p>
<p><strong>TA0011 — Command & Control:</strong> Управление</p>
<p><strong>TA0040 — Impact:</strong> Воздействие</p>
</div>

<h3>🔍 Threat Hunting</h3>
<pre><code># Анализ Windows Event Log
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4624  # События входа
} | Select TimeCreated, Message

# Запрос Splunk SIEM
index=windows EventCode=4688
| stats count by ParentImage, Image
| sort -count

# Пример правила Sigma
title: Suspicious PowerShell Execution
logsource:
  product: windows
  service: system
detection:
  selection:
    EventID: 4688
    CommandLine|contains: 'powershell -enc'
  condition: selection</code></pre>

<h3>🏗️ Архитектура безопасности</h3>
<ul>
<li><strong>Zero Trust:</strong> "Никому не доверяй, всё проверяй"</li>
<li><strong>Defense in Depth:</strong> Многоуровневая защита</li>
<li><strong>Security by Design:</strong> Безопасность на этапе проектирования</li>
<li><strong>Least Privilege:</strong> Минимально необходимые права</li>
</ul>`,
          en: `<h2>MITRE ATT&CK Framework</h2>
<p>MITRE ATT&CK is a knowledge base of tactics and techniques based on real-world attacks, used globally by security teams.</p>

<h3>📊 ATT&CK Tactics</h3>
<div class="info-box">
<p><strong>TA0001 — Initial Access:</strong> Getting into the target system</p>
<p><strong>TA0002 — Execution:</strong> Running malicious code</p>
<p><strong>TA0003 — Persistence:</strong> Maintaining access</p>
<p><strong>TA0004 — Privilege Escalation:</strong> Gaining higher privileges</p>
<p><strong>TA0005 — Defense Evasion:</strong> Bypassing defenses</p>
<p><strong>TA0006 — Credential Access:</strong> Stealing credentials</p>
<p><strong>TA0007 — Discovery:</strong> Exploring the system</p>
<p><strong>TA0008 — Lateral Movement:</strong> Moving through the network</p>
<p><strong>TA0009 — Collection:</strong> Gathering data</p>
<p><strong>TA0010 — Exfiltration:</strong> Data theft</p>
<p><strong>TA0011 — Command & Control:</strong> Controlling compromised systems</p>
<p><strong>TA0040 — Impact:</strong> Causing damage</p>
</div>

<h3>🔍 Threat Hunting</h3>
<pre><code># Windows Event Log analysis
Get-WinEvent -LogName Security | Where-Object {
  $_.Id -eq 4624  # Logon events
} | Select TimeCreated, Message

# Splunk SIEM query
index=windows EventCode=4688
| stats count by ParentImage, Image
| sort -count

# Sigma rule example
title: Suspicious PowerShell Execution
logsource:
  product: windows
  service: system
detection:
  selection:
    EventID: 4688
    CommandLine|contains: 'powershell -enc'
  condition: selection</code></pre>

<h3>🏗️ Security Architecture</h3>
<ul>
<li><strong>Zero Trust:</strong> "Never trust, always verify"</li>
<li><strong>Defense in Depth:</strong> Multiple layers of protection</li>
<li><strong>Security by Design:</strong> Bake in security from the start</li>
<li><strong>Least Privilege:</strong> Minimum necessary permissions</li>
</ul>`
        },
        quiz: [
          {
            q: { uz: "MITRE ATT&CK'da qancha taktika mavjud?", ru: "Сколько тактик в MITRE ATT&CK?", en: "How many tactics are in MITRE ATT&CK?" },
            options: { uz: ["8", "10", "12", "14"], ru: ["8", "10", "12", "14"], en: ["8", "10", "12", "14"] },
            answer: 2
          },
          {
            q: { uz: "Zero Trust prinsipi qanday?", ru: "Каков принцип Zero Trust?", en: "What is the Zero Trust principle?" },
            options: { uz: ["Hammasiga ishon", "Hech kimga ishonma, hammasini tekshir", "Ichki tarmoqqa ishon", "Faqat admin'ga ishon"], ru: ["Доверяй всем", "Никому не доверяй, всё проверяй", "Доверяй внутренней сети", "Доверяй только админу"], en: ["Trust everyone", "Never trust, always verify", "Trust internal network", "Trust only admins"] },
            answer: 1
          }
        ]
      }
    ]
  }
];

module.exports = courses;
