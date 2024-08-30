---
description: این سند به شما آموزش می‌دهد که چگونه با استفاده از قابلیت Fold در Vim،
  متن‌های غیرضروری را پنهان کرده و تمرکز خود را افزایش دهید.
title: Ch17. Fold
---

وقتی که شما یک فایل را می‌خوانید، اغلب متن‌های غیر مرتبط زیادی وجود دارد که مانع از درک شما از عملکرد آن فایل می‌شود. برای پنهان کردن نویز غیرضروری، از Vim fold استفاده کنید.

در این فصل، شما با روش‌های مختلفی برای تا کردن یک فایل آشنا خواهید شد.

## تا کردن دستی

تصور کنید که شما یک ورق کاغذ را تا می‌کنید تا برخی از متن‌ها را بپوشانید. متن واقعی از بین نمی‌رود، هنوز هم آنجا است. Vim fold به همین روش کار می‌کند. این یک بازه از متن را تا می‌کند و آن را از نمایش پنهان می‌کند بدون اینکه واقعاً آن را حذف کند.

عملگر تا کردن `z` است (زمانی که یک کاغذ تا می‌شود، به شکل حرف z در می‌آید).

فرض کنید شما این متن را دارید:

```shell
Fold me
Hold me
```

با قرار دادن نشانگر در خط اول، `zfj` را تایپ کنید. Vim هر دو خط را به یک خط تا می‌کند. شما باید چیزی شبیه به این ببینید:

```shell
+-- 2 lines: Fold me -----
```

این تجزیه و تحلیل است:
- `zf` عملگر تا کردن است.
- `j` حرکت برای عملگر تا کردن است.

شما می‌توانید یک متن تا شده را با `zo` باز کنید. برای بستن تا، از `zc` استفاده کنید.

تا کردن یک عملگر است، بنابراین از قاعده گرامری (`فعل + اسم`) پیروی می‌کند. شما می‌توانید عملگر تا کردن را با یک حرکت یا شیء متنی عبور دهید. برای تا کردن یک پاراگراف داخلی، `zfip` را اجرا کنید. برای تا کردن تا انتهای یک فایل، `zfG` را اجرا کنید. برای تا کردن متون بین `{` و `}`، `zfa{` را اجرا کنید.

شما می‌توانید از حالت بصری برای تا کردن استفاده کنید. ناحیه‌ای را که می‌خواهید تا کنید هایلایت کنید (`v`، `V` یا `Ctrl-v`)، سپس `zf` را اجرا کنید.

شما می‌توانید یک تا کردن را از حالت خط فرمان با دستور `:fold` اجرا کنید. برای تا کردن خط فعلی و خط بعدی، اجرا کنید:

```shell
:,+1fold
```

`,+1` بازه است. اگر پارامترهایی به بازه ندهید، به طور پیش‌فرض به خط فعلی برمی‌گردد. `+1` نشانگر بازه برای خط بعدی است. برای تا کردن خطوط ۵ تا ۱۰، `:5,10fold` را اجرا کنید. برای تا کردن از موقعیت فعلی تا انتهای خط، `:,$fold` را اجرا کنید.

دستورات تا و باز کردن زیادی وجود دارد. من آنها را در ابتدای کار خیلی زیاد می‌دانم که به خاطر بسپارم. مفیدترین آنها عبارتند از:
- `zR` برای باز کردن تمام تاها.
- `zM` برای بستن تمام تاها.
- `za` برای تغییر وضعیت یک تا.

شما می‌توانید `zR` و `zM` را در هر خطی اجرا کنید، اما `za` فقط زمانی کار می‌کند که شما روی یک خط تا شده / باز شده باشید. برای یادگیری دستورات بیشتر تا کردن، به `:h fold-commands` مراجعه کنید.

## روش‌های مختلف تا کردن

بخش بالا به تا کردن دستی Vim می‌پردازد. در Vim شش روش مختلف برای تا کردن وجود دارد:
1. دستی
2. تورفتگی
3. عبارت
4. نحو
5. تفاوت
6. نشانگر

برای دیدن اینکه کدام روش تا کردن را در حال حاضر استفاده می‌کنید، `:set foldmethod?` را اجرا کنید. به طور پیش‌فرض، Vim از روش `manual` استفاده می‌کند.

در ادامه فصل، شما با پنج روش دیگر تا کردن آشنا خواهید شد. بیایید با تا کردن تورفتگی شروع کنیم.

## تا کردن تورفتگی

برای استفاده از تا کردن تورفتگی، `'foldmethod'` را به تورفتگی تغییر دهید:

```shell
:set foldmethod=indent
```

فرض کنید که شما متن زیر را دارید:

```shell
One
  Two
  Two again
```

اگر `:set foldmethod=indent` را اجرا کنید، خواهید دید:

```shell
One
+-- 2 lines: Two -----
```

با تا کردن تورفتگی، Vim به تعداد فضاهایی که هر خط در ابتدا دارد نگاه می‌کند و آن را با گزینه `'shiftwidth'` مقایسه می‌کند تا قابلیت تا شدن آن را تعیین کند. `'shiftwidth'` تعداد فضاهای مورد نیاز برای هر مرحله از تورفتگی را برمی‌گرداند. اگر شما اجرا کنید:

```shell
:set shiftwidth?
```

مقدار پیش‌فرض `'shiftwidth'` در Vim ۲ است. در متن بالا، دو فضا بین شروع خط و متن "Two" و "Two again" وجود دارد. وقتی Vim تعداد فضاها را می‌بیند و می‌بیند که مقدار `'shiftwidth'` برابر با ۲ است، Vim آن خط را دارای سطح تا کردن تورفتگی یک در نظر می‌گیرد.

فرض کنید این بار فقط یک فضا بین شروع خط و متن وجود داشته باشد:

```shell
One
 Two
 Two again
```

در حال حاضر اگر `:set foldmethod=indent` را اجرا کنید، Vim خط تورفته را تا نمی‌کند زیرا فضای کافی در هر خط وجود ندارد. یک فضا به عنوان تورفتگی در نظر گرفته نمی‌شود. با این حال، اگر `'shiftwidth'` را به ۱ تغییر دهید:

```shell
:set shiftwidth=1
```

متن اکنون قابل تا شدن است. اکنون به عنوان یک تورفتگی در نظر گرفته می‌شود.

مقدار `shiftwidth` را به ۲ برگردانید و فضاهای بین متون را دوباره به دو تغییر دهید. علاوه بر این، دو متن اضافی اضافه کنید:

```shell
One
  Two
  Two again
    Three
    Three again
```

تا کردن را اجرا کنید (`zM`)، شما خواهید دید:

```shell
One
+-- 4 lines: Two -----
```

خطوط تا شده را باز کنید (`zR`)، سپس نشانگر خود را روی "Three" قرار دهید و وضعیت تا کردن متن را تغییر دهید (`za`):

```shell
One
  Two
  Two again
+-- 2 lines: Three -----
```

این چیست؟ یک تا درون یک تا؟

تاهای تو در تو معتبر هستند. متن "Two" و "Two again" دارای سطح تا کردن یک هستند. متن "Three" و "Three again" دارای سطح تا کردن دو هستند. اگر شما یک متن قابل تا شدن با سطح تا کردن بالاتر درون یک متن قابل تا شدن داشته باشید، چندین لایه تا خواهید داشت.

## تا کردن عبارت

تا کردن عبارت به شما اجازه می‌دهد که یک عبارت برای تطابق با یک تا تعریف کنید. پس از تعریف عبارات تا، Vim هر خط را برای مقدار `'foldexpr'` اسکن می‌کند. این متغیری است که شما باید پیکربندی کنید تا مقدار مناسب را برگرداند. اگر `'foldexpr'` مقدار ۰ را برگرداند، آن خط تا نمی‌شود. اگر ۱ را برگرداند، آن خط دارای سطح تا کردن ۱ است. اگر ۲ را برگرداند، آن خط دارای سطح تا کردن ۲ است. مقادیر دیگری غیر از اعداد صحیح وجود دارد، اما من به آنها نمی‌پردازم. اگر کنجکاو هستید، به `:h fold-expr` مراجعه کنید.

اول، بیایید روش تا کردن را تغییر دهیم:

```shell
:set foldmethod=expr
```

فرض کنید شما یک لیست از غذاهای صبحانه دارید و می‌خواهید تمام اقلام صبحانه که با "p" شروع می‌شوند را تا کنید:

```shell
donut
pancake
pop-tarts
protein bar
salmon
scrambled eggs
```

سپس، `foldexpr` را تغییر دهید تا عبارات شروع شده با "p" را ضبط کند:

```shell
:set foldexpr=getline(v:lnum)[0]==\\"p\\"
```

عبارت بالا به نظر پیچیده می‌رسد. بیایید آن را تجزیه و تحلیل کنیم:
- `:set foldexpr` گزینه `'foldexpr'` را برای پذیرش یک عبارت سفارشی تنظیم می‌کند.
- `getline()` یک تابع Vimscript است که محتوای هر خط داده شده را برمی‌گرداند. اگر شما `:echo getline(5)` را اجرا کنید، محتوای خط ۵ را برمی‌گرداند.
- `v:lnum` متغیر ویژه Vim برای عبارت `'foldexpr'` است. Vim هر خط را اسکن می‌کند و در آن لحظه شماره هر خط را در متغیر `v:lnum` ذخیره می‌کند. در خط ۵، `v:lnum` دارای مقدار ۵ است. در خط ۱۰، `v:lnum` دارای مقدار ۱۰ است.
- `[0]` در زمینه `getline(v:lnum)[0]` اولین کاراکتر هر خط است. وقتی Vim یک خط را اسکن می‌کند، `getline(v:lnum)` محتوای هر خط را برمی‌گرداند. `getline(v:lnum)[0]` اولین کاراکتر هر خط را برمی‌گرداند. در اولین خط لیست ما، "donut"، `getline(v:lnum)[0]` "d" را برمی‌گرداند. در خط دوم لیست ما، "pancake"، `getline(v:lnum)[0]` "p" را برمی‌گرداند.
- `==\\"p\\"` نیمه دوم عبارت برابری است. این بررسی می‌کند که آیا عبارتی که شما تازه ارزیابی کرده‌اید برابر با "p" است یا خیر. اگر درست باشد، ۱ را برمی‌گرداند. اگر نادرست باشد، ۰ را برمی‌گرداند. در Vim، ۱ درست و ۰ نادرست است. بنابراین در خطوطی که با "p" شروع می‌شوند، ۱ را برمی‌گرداند. به یاد داشته باشید اگر `'foldexpr'` مقداری برابر با ۱ داشته باشد، پس دارای سطح تا کردن ۱ است.

پس از اجرای این عبارت، شما باید ببینید:

```shell
donut
+-- 3 lines: pancake -----
salmon
scrambled eggs
```

## تا کردن نحو

تا کردن نحو توسط هایلایت زبان نحو تعیین می‌شود. اگر شما از یک افزونه نحو زبان مانند [vim-polyglot](https://github.com/sheerun/vim-polyglot) استفاده کنید، تا کردن نحو به طور خودکار کار می‌کند. فقط روش تا کردن را به نحو تغییر دهید:

```shell
:set foldmethod=syntax
```

فرض کنید شما در حال ویرایش یک فایل JavaScript هستید و افزونه vim-polyglot را نصب کرده‌اید. اگر شما یک آرایه مانند زیر داشته باشید:

```shell
const nums = [
  one,
  two,
  three,
  four
]
```

این با یک تا کردن نحو تا خواهد شد. وقتی شما یک هایلایت نحو برای یک زبان خاص تعریف می‌کنید (معمولاً در دایرکتوری `syntax/`)، می‌توانید یک ویژگی `fold` اضافه کنید تا آن را قابل تا کردن کنید. در زیر یک قطعه کد از فایل نحو JavaScript vim-polyglot آمده است. به کلمه کلیدی `fold` در انتها توجه کنید.

```shell
syntax region  jsBracket                      matchgroup=jsBrackets            start=/\[/ end=/\]/ contains=@jsExpression,jsSpreadExpression extend fold
```

این راهنما به ویژگی `syntax` نمی‌پردازد. اگر کنجکاو هستید، به `:h syntax.txt` مراجعه کنید.

## تا کردن تفاوت

Vim می‌تواند یک رویه تفاوت برای مقایسه دو یا چند فایل انجام دهد.

اگر شما `file1.txt` را داشته باشید:

```shell
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
```

و `file2.txt`:

```shell
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
emacs is ok
```

دستور `vimdiff file1.txt file2.txt` را اجرا کنید:

```shell
+-- 3 lines: vim is awesome -----
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
[vim is awesome] / [emacs is ok]
```

Vim به طور خودکار برخی از خطوط مشابه را تا می‌کند. وقتی شما دستور `vimdiff` را اجرا می‌کنید، Vim به طور خودکار از `foldmethod=diff` استفاده می‌کند. اگر شما `:set foldmethod?` را اجرا کنید، `diff` را برمی‌گرداند.

## تا کردن نشانگر

برای استفاده از تا کردن نشانگر، اجرا کنید:

```shell
:set foldmethod=marker
```

فرض کنید شما متن زیر را دارید:

```shell
Hello

{{{
world
vim
}}}
```

دستور `zM` را اجرا کنید، شما خواهید دید:

```shell
hello

+-- 4 lines: -----
```

Vim `{{{` و `}}}` را به عنوان نشانگرهای تا در نظر می‌گیرد و متون بین آنها را تا می‌کند. با تا کردن نشانگر، Vim به دنبال نشانگرهای ویژه‌ای می‌گردد که توسط گزینه `'foldmarker'` تعریف شده‌اند تا نواحی تا کردن را علامت‌گذاری کند. برای دیدن اینکه Vim از چه نشانگرهایی استفاده می‌کند، اجرا کنید:

```shell
:set foldmarker?
```

به طور پیش‌فرض، Vim از `{{{` و `}}}` به عنوان نشانگرها استفاده می‌کند. اگر می‌خواهید نشانگر را به متون دیگری مانند "coffee1" و "coffee2" تغییر دهید:

```shell
:set foldmarker=coffee1,coffee2
```

اگر شما متن زیر را داشته باشید:

```shell
hello

coffee1
world
vim
coffee2
```

اکنون Vim از `coffee1` و `coffee2` به عنوان نشانگرهای جدید تا استفاده می‌کند. به عنوان یک نکته جانبی، یک نشانگر باید یک رشته ادبی باشد و نمی‌تواند یک regex باشد.

## حفظ تا

شما تمام اطلاعات تا را زمانی که جلسه Vim را ببندید از دست می‌دهید. اگر شما این فایل، `count.txt` را داشته باشید:

```shell
one
two
three
four
five
```

سپس از خط "three" به پایین یک تا دستی انجام دهید (`:3,$fold`):

```shell
one
two
+-- 3 lines: three ---
```

زمانی که شما از Vim خارج می‌شوید و `count.txt` را دوباره باز می‌کنید، تاها دیگر وجود ندارند!

برای حفظ تاها، پس از تا کردن، اجرا کنید:

```shell
:mkview
```

سپس وقتی `count.txt` را باز می‌کنید، اجرا کنید:

```shell
:loadview
```

تاهای شما بازیابی می‌شوند. با این حال، شما باید به صورت دستی `mkview` و `loadview` را اجرا کنید. من می‌دانم که یکی از این روزها، فراموش می‌کنم که قبل از بستن فایل `mkview` را اجرا کنم و تمام تاها را از دست می‌دهم. چگونه می‌توانیم این فرآیند را خودکار کنیم؟

برای اینکه به طور خودکار `mkview` را زمانی که یک فایل `.txt` را می‌بندید و `loadview` را زمانی که یک فایل `.txt` را باز می‌کنید، اجرا کنید، این را در vimrc خود اضافه کنید:

```shell
autocmd BufWinLeave *.txt mkview
autocmd BufWinEnter *.txt silent loadview
```

به یاد داشته باشید که `autocmd` برای اجرای یک دستور در یک رویداد خاص استفاده می‌شود. دو رویداد در اینجا عبارتند از:
- `BufWinLeave` برای زمانی که شما یک بافر را از یک پنجره حذف می‌کنید.
- `BufWinEnter` برای زمانی که شما یک بافر را در یک پنجره بارگذاری می‌کنید.

اکنون پس از اینکه شما در یک فایل `.txt` تا کردید و از Vim خارج شدید، دفعه بعد که آن فایل را باز کنید، اطلاعات تا شما بازیابی خواهد شد.

به طور پیش‌فرض، Vim اطلاعات تا را زمانی که `mkview` را در `~/.vim/view` در سیستم Unix اجرا می‌کند، ذخیره می‌کند. برای اطلاعات بیشتر، به `:h 'viewdir'` مراجعه کنید.
## یادگیری تا کردن به روش هوشمند

زمانی که من برای اولین بار Vim را شروع کردم، یادگیری تا کردن را نادیده گرفتم زیرا فکر نمی‌کردم که مفید باشد. با این حال، هر چه بیشتر کدنویسی می‌کنم، بیشتر متوجه می‌شوم که تا کردن چقدر مفید است. تاهای استراتژیک می‌توانند نمای بهتری از ساختار متن به شما بدهند، مانند فهرست مطالب یک کتاب.

زمانی که یادگیری تا کردن را شروع می‌کنید، با تا کردن دستی شروع کنید زیرا می‌توان از آن در حین حرکت استفاده کرد. سپس به تدریج ترفندهای مختلفی برای انجام تاهای تو رفتگی و علامت‌گذاری یاد بگیرید. در نهایت، یاد بگیرید که چگونه تاهای نحو و عبارت را انجام دهید. حتی می‌توانید از دو مورد آخر برای نوشتن پلاگین‌های Vim خود استفاده کنید.