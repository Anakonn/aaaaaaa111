---
description: این سند به شما آموزش می‌دهد که چگونه از دستورات حالت خط فرمان در ویم
  استفاده کنید و نکات و ترفندهای مفیدی را برای کار با آن‌ها ارائه می‌دهد.
title: Ch15. Command-line Mode
---

در سه فصل گذشته، شما یاد گرفتید که چگونه از دستورات جستجو (`/`, `?`)، دستور جایگزینی (`:s`)، دستور جهانی (`:g`) و دستور خارجی (`!`) استفاده کنید. اینها نمونه‌هایی از دستورات حالت خط فرمان هستند.

در این فصل، شما نکات و ترفندهای مختلفی برای حالت خط فرمان یاد خواهید گرفت.

## ورود و خروج از حالت خط فرمان

حالت خط فرمان یک حالت مستقل است، درست مانند حالت عادی، حالت وارد کردن و حالت بصری. زمانی که در این حالت هستید، نشانگر به پایین صفحه می‌رود و می‌توانید دستورات مختلفی را وارد کنید.

شما می‌توانید از ۴ دستور مختلف برای ورود به حالت خط فرمان استفاده کنید:
- الگوهای جستجو (`/`, `?`)
- دستورات خط فرمان (`:`)
- دستورات خارجی (`!`)

شما می‌توانید از حالت عادی یا حالت بصری به حالت خط فرمان وارد شوید.

برای خروج از حالت خط فرمان، می‌توانید از `<Esc>`، `Ctrl-C` یا `Ctrl-[` استفاده کنید.

*سایر متون ممکن است "دستور خط فرمان" را به عنوان "دستور Ex" و "دستور خارجی" را به عنوان "دستور فیلتر" یا "عملگر bang" ارجاع دهند.*

## تکرار دستور قبلی

شما می‌توانید دستور خط فرمان قبلی یا دستور خارجی را با `@:` تکرار کنید.

اگر شما به تازگی `:s/foo/bar/g` را اجرا کرده‌اید، اجرای `@:` آن جایگزینی را تکرار می‌کند. اگر شما به تازگی `:.!tr '[a-z]' '[A-Z]'` را اجرا کرده‌اید، اجرای `@:` آخرین فیلتر ترجمه دستور خارجی را تکرار می‌کند.

## میانبرهای حالت خط فرمان

در حالی که در حالت خط فرمان هستید، می‌توانید به چپ یا راست، یک کاراکتر در هر بار، با استفاده از کلیدهای جهت‌دار `چپ` یا `راست` حرکت کنید.

اگر نیاز به حرکت به سمت کلمات دارید، از `Shift-Left` یا `Shift-Right` استفاده کنید (در برخی سیستم‌عامل‌ها، ممکن است نیاز باشد از `Ctrl` به جای `Shift` استفاده کنید).

برای رفتن به ابتدای خط، از `Ctrl-B` استفاده کنید. برای رفتن به انتهای خط، از `Ctrl-E` استفاده کنید.

مشابه حالت وارد کردن، در داخل حالت خط فرمان، شما سه راه برای حذف کاراکترها دارید:

```shell
Ctrl-H    حذف یک کاراکتر
Ctrl-W    حذف یک کلمه
Ctrl-U    حذف کل خط
```
در نهایت، اگر می‌خواهید دستور را مانند یک فایل متنی عادی ویرایش کنید، از `Ctrl-F` استفاده کنید.

این همچنین به شما اجازه می‌دهد تا از طریق دستورات قبلی جستجو کنید، آنها را ویرایش کنید و با فشار دادن `<Enter>` در "حالت ویرایش خط فرمان عادی" دوباره اجرا کنید.

## ثبت و تکمیل خودکار

در حالی که در حالت خط فرمان هستید، می‌توانید متن‌ها را از ثبت Vim با `Ctrl-R` به همان شیوه‌ای که در حالت وارد کردن استفاده می‌شود، وارد کنید. اگر شما رشته "foo" را در ثبت a ذخیره کرده‌اید، می‌توانید آن را با اجرای `Ctrl-R a` وارد کنید. هر چیزی که می‌توانید از ثبت در حالت وارد کردن بگیرید، می‌توانید به همان شکل از حالت خط فرمان نیز انجام دهید.

علاوه بر این، می‌توانید کلمه زیر نشانگر را با `Ctrl-R Ctrl-W` بگیرید (`Ctrl-R Ctrl-A` برای WORD زیر نشانگر). برای دریافت خط زیر نشانگر، از `Ctrl-R Ctrl-L` استفاده کنید. برای دریافت نام فایل زیر نشانگر، از `Ctrl-R Ctrl-F` استفاده کنید.

شما همچنین می‌توانید دستورات موجود را تکمیل خودکار کنید. برای تکمیل خودکار دستور `echo`، در حالی که در حالت خط فرمان هستید، "ec" را تایپ کنید، سپس `<Tab>` را فشار دهید. شما باید در پایین سمت چپ دستورات Vim را که با "ec" شروع می‌شوند، ببینید (مثال: `echo echoerr echohl echomsg econ`). برای رفتن به گزینه بعدی، یا `<Tab>` یا `Ctrl-N` را فشار دهید. برای رفتن به گزینه قبلی، یا `<Shift-Tab>` یا `Ctrl-P` را فشار دهید.

برخی از دستورات خط فرمان نام فایل‌ها را به عنوان آرگومان می‌پذیرند. یک مثال `edit` است. شما می‌توانید در اینجا نیز تکمیل خودکار کنید. پس از تایپ دستور، `:e ` (فراموش نکنید که فاصله را بگذارید)، `<Tab>` را فشار دهید. Vim تمام نام‌های فایل مرتبط را که می‌توانید از آنها انتخاب کنید، لیست می‌کند تا نیازی به تایپ از ابتدا نداشته باشید.

## پنجره تاریخ و پنجره خط فرمان

شما می‌توانید تاریخ دستورات خط فرمان و اصطلاحات جستجو را مشاهده کنید (این نیاز به ویژگی `+cmdline_hist` دارد).

برای باز کردن تاریخ خط فرمان، دستور `:his :` را اجرا کنید. شما باید چیزی شبیه به زیر ببینید:

```shell
## Cmd history
2  e file1.txt
3  g/foo/d
4  s/foo/bar/g
```

Vim تاریخچه تمام دستورات `:` که اجرا کرده‌اید را لیست می‌کند. به طور پیش‌فرض، Vim آخرین ۵۰ دستور را ذخیره می‌کند. برای تغییر تعداد ورودی‌هایی که Vim به خاطر می‌سپارد به ۱۰۰، دستور `set history=100` را اجرا کنید.

استفاده مفیدتر از تاریخچه خط فرمان از طریق پنجره خط فرمان، `q:` است. این پنجره‌ای قابل جستجو و ویرایش را باز می‌کند. فرض کنید شما این عبارات را در تاریخچه دارید وقتی که `q:` را فشار می‌دهید:

```shell
51  s/verylongsubstitutionpattern/pancake/g
52  his :
53  wq
```

اگر کار فعلی شما انجام `s/verylongsubstitutionpattern/donut/g` باشد، به جای تایپ دستور از ابتدا، چرا از `s/verylongsubstitutionpattern/pancake/g` دوباره استفاده نکنید؟ بعد از همه، تنها چیزی که متفاوت است، کلمه جایگزین است، "donut" در مقابل "pancake". همه چیز دیگر یکسان است.

پس از اینکه `q:` را اجرا کردید، `s/verylongsubstitutionpattern/pancake/g` را در تاریخچه پیدا کنید (شما می‌توانید از ناوبری Vim در این محیط استفاده کنید) و آن را به طور مستقیم ویرایش کنید! "pancake" را در پنجره تاریخچه به "donut" تغییر دهید، سپس `<Enter>` را فشار دهید. بوم! Vim `s/verylongsubstitutionpattern/donut/g` را برای شما اجرا می‌کند. بسیار راحت!

به همین ترتیب، برای مشاهده تاریخچه جستجو، دستور `:his /` یا `:his ?` را اجرا کنید. برای باز کردن پنجره تاریخچه جستجو که می‌توانید در آن جستجو و ویرایش کنید، دستور `q/` یا `q?` را اجرا کنید.

برای خروج از این پنجره، `Ctrl-C`، `Ctrl-W C` یا تایپ `:quit` را فشار دهید.

## دستورات بیشتر خط فرمان

Vim صدها دستور داخلی دارد. برای دیدن تمام دستورات موجود در Vim، به `:h ex-cmd-index` یا `:h :index` مراجعه کنید.

## یادگیری حالت خط فرمان به شیوه هوشمند

در مقایسه با سه حالت دیگر، حالت خط فرمان مانند چاقوی چندکاره سوئیسی در ویرایش متن است. شما می‌توانید متن را ویرایش کنید، فایل‌ها را تغییر دهید و دستورات را اجرا کنید، فقط برای نام بردن چند مورد. این فصل مجموعه‌ای از نکات و ترفندهای حالت خط فرمان است. همچنین حالت‌های Vim را به پایان می‌رساند. حالا که می‌دانید چگونه از حالت عادی، وارد کردن، بصری و خط فرمان استفاده کنید، می‌توانید متن را با Vim سریع‌تر از همیشه ویرایش کنید.

وقت آن است که از حالت‌های Vim دور شوید و یاد بگیرید که چگونه با استفاده از برچسب‌های Vim، ناوبری سریع‌تری داشته باشید.