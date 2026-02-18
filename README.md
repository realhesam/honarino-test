<div align="center">
  <h1>هنرینو</h1>
  <h3>پلتفرم وب هنری – ساخته‌شده با تکنولوژی‌های مدرن</h3>

  <p>
    <strong>Backend:</strong> Rust 🦀 • 
    <strong>Frontend:</strong> Next.js 16+ ⚡ • 
    <strong>Database:</strong> PostgreSQL 🐘 • 
    <strong>Infrastructure:</strong> Docker • Nginx • Compose • MinIO
  </p>

  <p>
    <img src="https://img.shields.io/badge/Rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" />
    <img src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </p>
</div>

## <br>

<div align="right" dir="rtl">
  <h6>یک وب‌اپلیکیشن برای به اشتراک‌گذاری، کشف و نمایش آثار هنری با تمرکز بر سرعت، امنیت و تجربه توسعه‌دهندهٔ راحت.</h6>
</div>

<div align="center">
  <h1>معماری پروژه</h1>
</div>

```

                             ┌──────────────────┐
                             │      Browser     │
                             └─────────┬────────┘
                                       │
                             ┌─────────▼────────┐
                             │       Nginx      │  ← http://localhost
                             └─────────┬────────┘
            ┌──────────────────────────┼───────────────────────────────┐
            │                          │                               │
┌───────────▼──────────┐  ┌────────────▼─────────────┐  ┌──────────────▼──────────────┐
│     Next.js App      │  │       Rust Backend       │  │            MinIO            │
│     (port 3000)      │◄─│        (port 8000)       │◄─│         (port 9000)         │
│  http://localhost/*  │  │   http://localhost/api   │  │   http://localhost/storage  │
└──────────────────────┘  └──────────────────────────┘  └─────────────────────────────┘
                                       │
                                       │
                               ┌───────▼───────┐
                               │   PostgreSQL  │
                               │   (database)  │
                               └───────────────┘

```

<div align="center">
  <h1>پیش نیاز ها</h1>
</div>

- Docker + Docker Compose (نسخه جدید)
- Make
- Git

**نصب Make:**

```bash
# لینوکس (اوبونتو/دبیان)
sudo apt update && sudo apt install -y make

# فدورا
sudo dnf install -y make

# macOS
brew install make

# ویندوز → پیشنهاد: WSL2 یا Git Bash
```

<div align="center">
  <h1>شروع سریع</h1>
</div>

```bash
# لاگین کردن روی dockerhub
make init

# ران کردن پروژه بدون deamon
make run

# ران کردن پروژه با deamon
make run-prod
```

<div align="right" dir="rtl">
بعد از اجرا:

- آدرس اصلی پروژه → http://localhost  
  (Nginx همه چیز را مدیریت می‌کند)
- API مستقیم (برای تست) → http://localhost/api
- minio → http://localhost/storage
    </div>

<div align="center">
<h1>متغیر های محیطی</h1>
</div>

<div dir="rtl" align="right">
تمام فایل‌های محیطی داخل پوشهٔ `config/` قرار دارند:
</div>

```
config/
├── .dockerhub.env          # برای لاگین به Docker Hub (اختیاری)
├── .api.env                # متغیرهای بک‌اند (Rust)
├── .frontend.env           # متغیرهای فرانت‌اند (Next.js)
├── .minio.env              # متغیر های مربوط به Storage
└── .postgres.env           # تنظیمات دیتابیس (postgres)
```

<div align="center">
  <h1>دستورات اصلی</h1>
</div>

```bash
make init           # لاگین به Docker Hub
make frontend       # بیلد کردن فرانت اند در صورت تغییر در کد
make backend        # بیلد کردن بک اند در صورت تغییر در کد
make run            # اجرای پروژه
make run-prod       # اجرای production (detached)
make down           # خاموش کردن همه سرویس‌ها
make logs           # نمایش لاگ زنده (Ctrl+C برای خروج)
make ps             # وضعیت کانتینرها
make clean          # حذف volumeها + پرون سیستم (احتیاط!)
```
