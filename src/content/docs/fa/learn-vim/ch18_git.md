---
description: این سند به بررسی روش‌های ادغام Vim و Git می‌پردازد و نحوه مقایسه و ویرایش
  فایل‌ها با استفاده از ابزارهای این دو نرم‌افزار را آموزش می‌دهد.
title: Ch18. Git
---

Vim و git دو ابزار عالی برای دو کار متفاوت هستند. Git یک ابزار کنترل نسخه است. Vim یک ویرایشگر متن است.

در این فصل، شما با روش‌های مختلف ادغام Vim و git آشنا خواهید شد.

## مقایسه

به یاد داشته باشید که در فصل قبلی، می‌توانید دستور `vimdiff` را برای نمایش تفاوت‌ها بین چندین فایل اجرا کنید.

فرض کنید شما دو فایل دارید، `file1.txt` و `file2.txt`.

درون `file1.txt`:

```shell
پانکیک
وافل
سیب

شیر
عصاره سیب

ماست
```

درون `file2.txt`:

```shell
پانکیک
وافل
پرتقال

شیر
عصاره پرتقال

ماست
```

برای دیدن تفاوت‌ها بین هر دو فایل، دستور زیر را اجرا کنید:

```shell
vimdiff file1.txt file2.txt
```

به‌طور جایگزین می‌توانید دستور زیر را اجرا کنید:

```shell
vim -d file1.txt file2.txt
```

`vimdiff` دو بافر را به‌صورت کنار هم نمایش می‌دهد. در سمت چپ `file1.txt` و در سمت راست `file2.txt` است. اولین تفاوت‌ها (سیب و پرتقال) در هر دو خط هایلایت شده‌اند.

فرض کنید می‌خواهید بافر دوم دارای سیب باشد، نه پرتقال. برای انتقال محتوا از موقعیت فعلی خود (شما در حال حاضر بر روی `file1.txt` هستید) به `file2.txt`، ابتدا با `]c` به تفاوت بعدی بروید (برای پرش به پنجره تفاوت قبلی، از `[c` استفاده کنید). اکنون باید نشانگر روی سیب باشد. دستور `:diffput` را اجرا کنید. هر دو فایل اکنون باید دارای سیب باشند.

اگر نیاز دارید متن را از بافر دیگر (عصاره پرتقال، `file2.txt`) برای جایگزینی متن در بافر فعلی (عصاره سیب، `file1.txt`) منتقل کنید، با نشانگر خود همچنان در پنجره `file1.txt`، ابتدا با `]c` به تفاوت بعدی بروید. اکنون نشانگر شما باید روی عصاره سیب باشد. دستور `:diffget` را اجرا کنید تا عصاره پرتقال از بافر دیگر به بافر ما منتقل شود.

`:diffput` *متن را از بافر فعلی به بافر دیگر می‌فرستد*. `:diffget` *متن را از بافر دیگر به بافر فعلی می‌گیرد*.

اگر چندین بافر دارید، می‌توانید دستور `:diffput fileN.txt` و `:diffget fileN.txt` را برای هدف قرار دادن بافر fileN اجرا کنید.

## Vim به عنوان یک ابزار ادغام

> "من عاشق حل تعارضات ادغام هستم!" - هیچ‌کس

من کسی را نمی‌شناسم که از حل تعارضات ادغام خوشش بیاید. با این حال، آنها اجتناب‌ناپذیر هستند. در این بخش، شما یاد خواهید گرفت که چگونه از Vim به عنوان یک ابزار حل تعارض ادغام استفاده کنید.

ابتدا ابزار ادغام پیش‌فرض را برای استفاده از `vimdiff` با اجرای دستور زیر تغییر دهید:

```shell
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
```

به‌طور جایگزین، می‌توانید به‌طور مستقیم `~/.gitconfig` را ویرایش کنید (به‌طور پیش‌فرض باید در ریشه باشد، اما ممکن است در مکان دیگری باشد). دستورات بالا باید gitconfig شما را به شکل تنظیمات زیر تغییر دهند، اگر آنها را قبلاً اجرا نکرده‌اید، می‌توانید به‌صورت دستی gitconfig خود را ویرایش کنید.

```shell
[core]
  editor = vim
[merge]
  tool = vimdiff
  conflictstyle = diff3
[difftool]
  prompt = false
```

بیایید یک تعارض ادغام جعلی ایجاد کنیم تا این را آزمایش کنیم. یک دایرکتوری `/food` ایجاد کنید و آن را به یک مخزن git تبدیل کنید:

```shell
git init
```

یک فایل به نام `breakfast.txt` اضافه کنید. درون آن:

```shell
پانکیک
وافل
پرتقال
```

فایل را اضافه کرده و آن را کامیت کنید:

```shell
git add .
git commit -m "کامیت اولیه صبحانه"
```

سپس یک شاخه جدید ایجاد کنید و آن را شاخه سیب نام‌گذاری کنید:

```shell
git checkout -b apples
```

فایل `breakfast.txt` را تغییر دهید:

```shell
پانکیک
وافل
سیب
```

فایل را ذخیره کنید، سپس تغییرات را اضافه و کامیت کنید:

```shell
git add .
git commit -m "سیب نه پرتقال"
```

عالی. اکنون شما پرتقال‌ها را در شاخه اصلی و سیب‌ها را در شاخه سیب دارید. بیایید به شاخه اصلی برگردیم:

```shell
git checkout master
```

درون `breakfast.txt`، باید متن پایه، پرتقال‌ها را ببینید. بیایید آن را به انگور تغییر دهیم زیرا اکنون در فصل آنها هستیم:

```shell
پانکیک
وافل
انگور
```

ذخیره کنید، اضافه کنید و کامیت کنید:

```shell
git add .
git commit -m "انگور نه پرتقال"
```

اکنون شما آماده‌اید تا شاخه سیب را به شاخه اصلی ادغام کنید:

```shell
git merge apples
```

شما باید یک خطا ببینید:

```shell
ادغام خودکار breakfast.txt
CONFLICT (content): تعارض ادغام در breakfast.txt
ادغام خودکار ناموفق بود؛ تعارضات را اصلاح کرده و سپس نتیجه را کامیت کنید.
```

یک تعارض، عالی! بیایید تعارض را با استفاده از `mergetool` جدید پیکربندی شده خود حل کنیم. دستور زیر را اجرا کنید:

```shell
git mergetool
```

Vim چهار پنجره را نمایش می‌دهد. به سه پنجره بالایی توجه کنید:

- `LOCAL` شامل `انگور` است. این تغییر در "محلی" است، آنچه شما در حال ادغام به آن هستید.
- `BASE` شامل `پرتقال` است. این جد ancestor مشترک بین `LOCAL` و `REMOTE` است که برای مقایسه چگونگی انحراف آنها استفاده می‌شود.
- `REMOTE` شامل `سیب` است. این چیزی است که در حال ادغام به آن هستید.

در پایین (پنجره چهارم) شما می‌بینید:

```shell
پانکیک
وافل
<<<<<<< HEAD
انگور
||||||| db63958
پرتقال
=======
سیب
>>>>>>> apples
```

پنجره چهارم شامل متن‌های تعارض ادغام است. با این تنظیمات، دیدن تغییرات هر محیط آسان‌تر است. شما می‌توانید محتوای `LOCAL`، `BASE` و `REMOTE` را همزمان مشاهده کنید.

نشانگر شما باید بر روی پنجره چهارم، در ناحیه هایلایت شده باشد. برای دریافت تغییر از `LOCAL` (انگور)، دستور `:diffget LOCAL` را اجرا کنید. برای دریافت تغییر از `BASE` (پرتقال)، دستور `:diffget BASE` را اجرا کنید و برای دریافت تغییر از `REMOTE` (سیب)، دستور `:diffget REMOTE` را اجرا کنید.

در این مورد، بیایید تغییر را از `LOCAL` بگیریم. دستور `:diffget LOCAL` را اجرا کنید. اکنون پنجره چهارم دارای انگور خواهد بود. وقتی کارتان تمام شد، همه فایل‌ها را ذخیره و خارج شوید (`:wqall`). این بد نبود، درست است؟

اگر متوجه شدید، اکنون یک فایل `breakfast.txt.orig` نیز دارید. Git یک فایل پشتیبان ایجاد می‌کند در صورتی که همه چیز خوب پیش نرود. اگر نمی‌خواهید git در حین ادغام یک پشتیبان ایجاد کند، دستور زیر را اجرا کنید:

```shell
git config --global mergetool.keepBackup false
```

## Git در داخل Vim

Vim به‌طور پیش‌فرض ویژگی git داخلی ندارد. یکی از راه‌های اجرای دستورات git از داخل Vim استفاده از اپراتور bang، `!`، در حالت خط فرمان است.

هر دستور git را می‌توان با `!` اجرا کرد:

```shell
:!git status
:!git commit
:!git diff
:!git push origin master
```

شما همچنین می‌توانید از کنوانسیون‌های `%` (بافر فعلی) یا `#` (بافر دیگر) در Vim استفاده کنید:

```shell
:!git add %         " git add فایل فعلی
:!git checkout #    " git checkout فایل دیگر
```

یک ترفند Vim که می‌توانید برای اضافه کردن چندین فایل در پنجره‌های مختلف Vim استفاده کنید، اجرای دستور زیر است:

```shell
:windo !git add %
```

سپس یک کامیت کنید:

```shell
:!git commit "همه چیز را در پنجره Vim خود git-add کردم، جالب است"
```

دستور `windo` یکی از دستورات "انجام" Vim است، مشابه `argdo` که قبلاً دیدید. `windo` دستور را در هر پنجره اجرا می‌کند.

به‌طور جایگزین، می‌توانید از `bufdo !git add %` برای git add همه بافرها یا `argdo !git add %` برای git add همه آرگومان‌های فایل استفاده کنید، بسته به جریان کار شما.

## پلاگین‌ها

پلاگین‌های زیادی برای پشتیبانی از git در Vim وجود دارد. در زیر فهرستی از برخی از پلاگین‌های محبوب مرتبط با git برای Vim آورده شده است (احتمالاً در زمان خواندن شما بیشتر وجود دارد):

- [vim-gitgutter](https://github.com/airblade/vim-gitgutter)
- [vim-signify](https://github.com/mhinz/vim-signify)
- [vim-fugitive](https://github.com/tpope/vim-fugitive)
- [gv.vim](https://github.com/junegunn/gv.vim)
- [vimagit](https://github.com/jreybert/vimagit)
- [vim-twiggy](https://github.com/sodapopcan/vim-twiggy)
- [rhubarb](https://github.com/tpope/vim-rhubarb)

یکی از محبوب‌ترین‌ها vim-fugitive است. برای باقی‌مانده فصل، من چندین جریان کار git را با استفاده از این پلاگین بررسی می‌کنم.

## Vim-fugitive

پلاگین vim-fugitive به شما اجازه می‌دهد تا CLI git را بدون ترک ویرایشگر Vim اجرا کنید. شما متوجه خواهید شد که برخی از دستورات بهتر است که از داخل Vim اجرا شوند.

برای شروع، پلاگین vim-fugitive را با یک مدیر پلاگین Vim نصب کنید ([vim-plug](https://github.com/junegunn/vim-plug)، [vundle](https://github.com/VundleVim/Vundle.vim)، [dein.vim](https://github.com/Shougo/dein.vim) و غیره).

## وضعیت Git

زمانی که دستور `:Git` را بدون هیچ پارامتری اجرا می‌کنید، vim-fugitive یک پنجره خلاصه git را نمایش می‌دهد. این پنجره فایل‌های غیر پیگیری، غیر مرحله‌ای و مرحله‌ای را نشان می‌دهد. در حالی که در این حالت "`git status`" هستید، می‌توانید چندین کار انجام دهید:
- `Ctrl-N` / `Ctrl-P` برای بالا یا پایین رفتن در لیست فایل.
- `-` برای مرحله‌ای یا غیر مرحله‌ای کردن نام فایلی که نشانگر روی آن است.
- `s` برای مرحله‌ای کردن نام فایلی که نشانگر روی آن است.
- `u` برای غیر مرحله‌ای کردن نام فایلی که نشانگر روی آن است.
- `>` / `<` برای نمایش یا پنهان کردن تفاوت‌های درون‌خطی نام فایلی که نشانگر روی آن است.

برای اطلاعات بیشتر، به `:h fugitive-staging-maps` مراجعه کنید.

## Git Blame

زمانی که شما دستور `:Git blame` را از فایل فعلی اجرا می‌کنید، vim-fugitive یک پنجره بلِیم تقسیم شده نمایش می‌دهد. این می‌تواند برای پیدا کردن شخص مسئول نوشتن آن خط کد مشکل‌دار مفید باشد تا بتوانید به او فریاد بزنید (فقط شوخی).

برخی از کارهایی که می‌توانید در این حالت `"git blame"` انجام دهید:
- `q` برای بستن پنجره بلِیم.
- `A` برای تغییر اندازه ستون نویسنده.
- `C` برای تغییر اندازه ستون کامیت.
- `D` برای تغییر اندازه ستون تاریخ / زمان.

برای اطلاعات بیشتر، به `:h :Git_blame` مراجعه کنید.

## Gdiffsplit

زمانی که شما دستور `:Gdiffsplit` را اجرا می‌کنید، vim-fugitive یک `vimdiff` از آخرین تغییرات فایل فعلی را در مقابل ایندکس یا درخت کار اجرا می‌کند. اگر شما `:Gdiffsplit <commit>` را اجرا کنید، vim-fugitive یک `vimdiff` در مقابل آن فایل در `<commit>` اجرا می‌کند.

زیرا شما در حالت `vimdiff` هستید، می‌توانید تفاوت را با `:diffput` و `:diffget` *بگیرید* یا *بگذارید*.

## Gwrite و Gread

زمانی که شما دستور `:Gwrite` را در یک فایل پس از ایجاد تغییرات اجرا می‌کنید، vim-fugitive تغییرات را مرحله‌ای می‌کند. این مانند اجرای `git add <فایل فعلی>` است.

زمانی که شما دستور `:Gread` را در یک فایل پس از ایجاد تغییرات اجرا می‌کنید، vim-fugitive فایل را به حالت قبل از تغییرات بازمی‌گرداند. این مانند اجرای `git checkout <فایل فعلی>` است. یکی از مزایای اجرای `:Gread` این است که این عمل قابل بازگشت است. اگر بعد از اجرای `:Gread`، نظر شما تغییر کند و بخواهید تغییر قدیمی را نگه دارید، می‌توانید فقط undo (`u`) را اجرا کنید و Vim عمل `:Gread` را بازگرداند. این امکان‌پذیر نیست اگر شما از CLI دستور `git checkout <فایل فعلی>` را اجرا کرده باشید.

## Gclog

زمانی که شما دستور `:Gclog` را اجرا می‌کنید، vim-fugitive تاریخچه کامیت را نمایش می‌دهد. این مانند اجرای دستور `git log` است. vim-fugitive از quickfix Vim برای انجام این کار استفاده می‌کند، بنابراین می‌توانید از `:cnext` و `:cprevious` برای جابجایی به اطلاعات لاگ بعدی یا قبلی استفاده کنید. می‌توانید لیست لاگ را با `:copen` و `:cclose` باز و بسته کنید.

در حالی که در این حالت `"git log"` هستید، می‌توانید دو کار انجام دهید:
- مشاهده درخت.
- بازدید از والد (کامیت قبلی).

شما می‌توانید به `:Gclog` آرگومان‌هایی مانند دستور `git log` پاس دهید. اگر پروژه شما تاریخچه کامیت طولانی دارد و شما فقط نیاز دارید آخرین سه کامیت را مشاهده کنید، می‌توانید دستور `:Gclog -3` را اجرا کنید. اگر نیاز دارید آن را بر اساس تاریخ کامیت فیلتر کنید، می‌توانید چیزی مانند `:Gclog --after="January 1" --before="March 14"` را اجرا کنید.

## بیشتر درباره Vim-fugitive

اینها فقط چند مثال از آنچه vim-fugitive می‌تواند انجام دهد هستند. برای یادگیری بیشتر درباره vim-fugitive، به `:h fugitive.txt` مراجعه کنید. بیشتر دستورات محبوب git احتمالاً با vim-fugitive بهینه شده‌اند. شما فقط باید آنها را در مستندات جستجو کنید.

اگر شما در یکی از "حالت‌های ویژه" vim-fugitive (به عنوان مثال، در حالت `:Git` یا `:Git blame`) هستید و می‌خواهید یاد بگیرید چه میانبرهایی در دسترس هستند، کلید `g?` را فشار دهید. vim-fugitive پنجره `:help` مناسب برای حالتی که در آن هستید را نمایش خواهد داد. جالب است!
## یادگیری Vim و Git به شیوه هوشمند

شما ممکن است vim-fugitive را مکمل خوبی برای جریان کار خود بیابید (یا نه). با این حال، من به شدت شما را تشویق می‌کنم که تمام پلاگین‌های ذکر شده در بالا را بررسی کنید. احتمالاً پلاگین‌های دیگری نیز وجود دارند که من ذکر نکرده‌ام. بروید و آنها را امتحان کنید.

یک راه واضح برای بهبود در ادغام Vim و Git، مطالعه بیشتر در مورد git است. Git به تنهایی موضوعی وسیع است و من تنها بخشی از آن را نشان می‌دهم. با این حال، بیایید *شروع کنیم* (ببخشید که شوخی کردم) و در مورد چگونگی استفاده از Vim برای کامپایل کد خود صحبت کنیم!