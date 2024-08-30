---
description: يستعرض هذا الفصل كيفية استخدام علامات Vim للتنقل السريع إلى تعريفات الكود،
  مما يسهل فهم الشيفرة المصدرية المعقدة.
title: Ch16. Tags
---

ميزة مفيدة في تحرير النصوص هي القدرة على الانتقال بسرعة إلى أي تعريف. في هذا الفصل، ستتعلم كيفية استخدام علامات Vim للقيام بذلك.

## نظرة عامة على العلامات

افترض أن شخصًا ما أعطاك قاعدة شفرة جديدة:

```shell
one = One.new
one.donut
```

`One`؟ `donut`؟ حسنًا، قد تكون هذه الأمور واضحة للمطورين الذين كتبوا الشفرة في ذلك الوقت، لكن الآن لم يعد هؤلاء المطورون هنا، وعليك أن تفهم هذه الرموز الغامضة. إحدى الطرق للمساعدة في فهم ذلك هي متابعة شفرة المصدر حيث تم تعريف `One` و `donut`.

يمكنك البحث عنهما باستخدام `fzf` أو `grep` (أو `vimgrep`)، لكن في هذه الحالة، العلامات أسرع.

فكر في العلامات مثل دفتر العناوين:

```shell
Name    Address
Iggy1   1234 Cool St, 11111
Iggy2   9876 Awesome Ave, 2222
```

بدلاً من وجود زوج من الاسم والعنوان، تخزن العلامات التعريفات المرتبطة بالعناوين.

لنفرض أن لديك هذين الملفين Ruby داخل نفس الدليل:

```shell
## one.rb
class One
  def initialize
    puts "Initialized"
  end

  def donut
    puts "Bar"
  end
end
```

و

```shell
## two.rb
require './one'

one = One.new
one.donut
```

للانتقال إلى تعريف، يمكنك استخدام `Ctrl-]` في وضعية العادي. داخل `two.rb`، انتقل إلى السطر حيث `one.donut` وحرك المؤشر فوق `donut`. اضغط على `Ctrl-]`.

عذرًا، لم يتمكن Vim من العثور على ملف العلامات. تحتاج إلى إنشاء ملف العلامات أولاً.

## مولد العلامات

لا يأتي Vim الحديث مع مولد علامات، لذا سيتعين عليك تنزيل مولد علامات خارجي. هناك عدة خيارات للاختيار من بينها:

- ctags = C فقط. متاح تقريبًا في كل مكان.
- exuberant ctags = واحدة من الأكثر شعبية. تدعم العديد من اللغات.
- universal ctags = مشابه لـ exuberant ctags، لكنه أحدث.
- etags = لـ Emacs. همم...
- JTags = Java
- ptags.py = Python
- ptags = Perl
- gnatxref = Ada

إذا نظرت إلى دروس Vim عبر الإنترنت، سيقوم العديد بالتوصية بـ [exuberant ctags](http://ctags.sourceforge.net/). يدعم [41 لغة برمجة](http://ctags.sourceforge.net/languages.html). لقد استخدمته وعمل بشكل رائع. ومع ذلك، نظرًا لأنه لم يتم صيانته منذ عام 2009، فإن Universal ctags سيكون خيارًا أفضل. يعمل بشكل مشابه لـ exuberant ctags ويتم صيانته حاليًا.

لن أذهب إلى التفاصيل حول كيفية تثبيت universal ctags. تحقق من مستودع [universal ctags](https://github.com/universal-ctags/ctags) للحصول على مزيد من التعليمات.

افترض أنك قمت بتثبيت universal ctags، دعنا ننشئ ملف علامات أساسي. قم بتشغيل:

```shell
ctags -R .
```

خيار `R` يخبر ctags بإجراء مسح تكراري من موقعك الحالي (`.`). يجب أن ترى ملف `tags` في الدليل الحالي. بداخله سترى شيئًا مثل هذا:

```shell
!_TAG_FILE_FORMAT	2	/extended format; --format=1 will not append ;" to lines/
!_TAG_FILE_SORTED	1	/0=unsorted, 1=sorted, 2=foldcase/
!_TAG_OUTPUT_FILESEP	slash	/slash or backslash/
!_TAG_OUTPUT_MODE	u-ctags	/u-ctags or e-ctags/
!_TAG_PATTERN_LENGTH_LIMIT	96	/0 for no limit/
!_TAG_PROGRAM_AUTHOR	Universal Ctags Team	//
!_TAG_PROGRAM_NAME	Universal Ctags	/Derived from Exuberant Ctags/
!_TAG_PROGRAM_URL	<https://ctags.io/>	/official site/
!_TAG_PROGRAM_VERSION	0.0.0	/b43eb39/
One	one.rb	/^class One$/;"	c
donut	one.rb	/^  def donut$/;"	f	class:One
initialize	one.rb	/^  def initialize$/;"	f	class:One
```

قد يبدو ملفك مختلفًا قليلاً اعتمادًا على إعدادات Vim الخاصة بك ومولد ctags. يتكون ملف العلامات من جزئين: بيانات التعريف والعلامات. هذه البيانات (`!TAG_FILE...`) عادة ما يتم التحكم فيها بواسطة مولد ctags. لن أناقش ذلك هنا، لكن لا تتردد في التحقق من الوثائق الخاصة بهم لمزيد من المعلومات! قائمة العلامات هي قائمة بجميع التعريفات المفهرسة بواسطة ctags.

الآن انتقل إلى `two.rb`، ضع المؤشر على `donut`، واكتب `Ctrl-]`. سينقلك Vim إلى الملف `one.rb` على السطر حيث `def donut`. نجاح! لكن كيف فعل Vim ذلك؟

## تشريح العلامات

لننظر إلى عنصر العلامة `donut`:

```shell
donut	one.rb	/^  def donut$/;"	f	class:One
```

يتكون عنصر العلامة أعلاه من أربعة مكونات: `tagname`، `tagfile`، `tagaddress`، وخيارات العلامة.
- `donut` هو `tagname`. عندما يكون المؤشر على "donut"، يبحث Vim في ملف العلامات عن سطر يحتوي على سلسلة "donut".
- `one.rb` هو `tagfile`. يبحث Vim عن ملف `one.rb`.
- `/^ def donut$/` هو `tagaddress`. `/.../` هو مؤشر نمط. `^` هو نمط للعنصر الأول في السطر. يتبعه مسافتان، ثم سلسلة `def donut`. وأخيرًا، `$` هو نمط للعنصر الأخير في السطر.
- `f class:One` هو خيار العلامة الذي يخبر Vim أن الدالة `donut` هي دالة (`f`) وهي جزء من الفئة `One`.

لننظر إلى عنصر آخر في قائمة العلامات:

```shell
One	one.rb	/^class One$/;"	c
```

يعمل هذا السطر بنفس طريقة نمط `donut`:

- `One` هو `tagname`. لاحظ أنه مع العلامات، يكون الفحص الأول حساسًا لحالة الأحرف. إذا كان لديك `One` و `one` في القائمة، سيعطي Vim الأولوية لـ `One` على `one`.
- `one.rb` هو `tagfile`. يبحث Vim عن ملف `one.rb`.
- `/^class One$/` هو نمط `tagaddress`. يبحث Vim عن سطر يبدأ بـ (`^`) `class` وينتهي بـ (`$`) `One`.
- `c` هو أحد خيارات العلامات الممكنة. نظرًا لأن `One` هي فئة روبي وليست إجراءً، فإنه يميزها بـ `c`.

اعتمادًا على مولد العلامات الذي تستخدمه، قد يبدو محتوى ملف العلامات الخاص بك مختلفًا. على الأقل، يجب أن يحتوي ملف العلامات على أحد هذه التنسيقات:

```shell
1.  {tagname} {TAB} {tagfile} {TAB} {tagaddress}
2.  {tagname} {TAB} {tagfile} {TAB} {tagaddress} {term} {field} ..
```

## ملف العلامات

لقد تعلمت أنه يتم إنشاء ملف جديد، `tags`، بعد تشغيل `ctags -R .`. كيف يعرف Vim أين يبحث عن ملف العلامات؟

إذا قمت بتشغيل `:set tags?`، قد ترى `tags=./tags,tags` (اعتمادًا على إعدادات Vim الخاصة بك، قد يكون مختلفًا). هنا يبحث Vim عن جميع العلامات في مسار الملف الحالي في حالة `./tags` والدليل الحالي (جذر مشروعك) في حالة `tags`.

أيضًا في حالة `./tags`، سيبحث Vim أولاً عن ملف علامات داخل مسار الملف الحالي بغض النظر عن مدى تعشيقه، ثم سيبحث عن ملف علامات في الدليل الحالي (جذر المشروع). يتوقف Vim بعد أن يجد أول تطابق.

إذا كان ملف `'tags'` الخاص بك قد قال `tags=./tags,tags,/user/iggy/mytags/tags`، فإن Vim سيبحث أيضًا في دليل `/user/iggy/mytags` عن ملف علامات بعد أن ينتهي Vim من البحث في دليل `./tags` و `tags`. لا تحتاج إلى تخزين ملف العلامات الخاص بك داخل مشروعك، يمكنك الاحتفاظ بها بشكل منفصل.

لإضافة موقع جديد لملف العلامات، استخدم ما يلي:

```shell
set tags+=path/to/my/tags/file
```

## إنشاء علامات لمشروع كبير

إذا حاولت تشغيل ctags في مشروع كبير، فقد يستغرق الأمر وقتًا طويلاً لأن Vim يبحث أيضًا داخل كل الدلائل المتداخلة. إذا كنت مطور Javascript، فأنت تعلم أن `node_modules` يمكن أن تكون كبيرة جدًا. تخيل إذا كان لديك خمسة مشاريع فرعية وكل منها يحتوي على دليل `node_modules` الخاص به. إذا قمت بتشغيل `ctags -R .`، سيحاول ctags المسح عبر جميع 5 `node_modules`. ربما لا تحتاج إلى تشغيل ctags على `node_modules`.

لتشغيل ctags مع استبعاد `node_modules`، قم بتشغيل:

```shell
ctags -R --exclude=node_modules .
```

يجب أن يستغرق هذا أقل من ثانية. بالمناسبة، يمكنك استخدام خيار `exclude` عدة مرات:

```shell
ctags -R --exclude=.git --exclude=vendor --exclude=node_modules --exclude=db --exclude=log .
```

النقطة هي، إذا كنت تريد استبعاد دليل، فإن `--exclude` هو أفضل صديق لك.

## تنقل العلامات

يمكنك الحصول على استخدام جيد باستخدام `Ctrl-]` فقط، لكن دعنا نتعلم بعض الحيل الإضافية. مفتاح القفز للعلامات `Ctrl-]` له بديل في وضع سطر الأوامر: `:tag {tag-name}`. إذا قمت بتشغيل:

```shell
:tag donut
```

سينتقل Vim إلى طريقة `donut`، تمامًا كما لو كنت تفعل `Ctrl-]` على سلسلة "donut". يمكنك أيضًا إكمال الوسيطة باستخدام `<Tab>`:

```shell
:tag d<Tab>
```

سوف يسرد Vim جميع العلامات التي تبدأ بـ "d". في هذه الحالة، "donut".

في مشروع حقيقي، قد تواجه عدة طرق بنفس الاسم. دعنا نحدث الملفين Ruby من السابق. داخل `one.rb`:

```shell
## one.rb
class One
  def initialize
    puts "Initialized"
  end

  def donut
    puts "one donut"
  end

  def pancake
    puts "one pancake"
  end
end
```

داخل `two.rb`:

```shell
## two.rb
require './one.rb'

def pancake
  "Two pancakes"
end

one = One.new
one.donut
puts pancake
```

إذا كنت تبرمج بالتوازي، لا تنسَ تشغيل `ctags -R .` مرة أخرى لأن لديك الآن العديد من الإجراءات الجديدة. لديك حالتين من إجراء `pancake`. إذا كنت داخل `two.rb` وضغطت على `Ctrl-]`، ماذا سيحدث؟

سينتقل Vim إلى `def pancake` داخل `two.rb`، وليس `def pancake` داخل `one.rb`. وذلك لأن Vim يرى إجراء `pancake` داخل `two.rb` على أنه له أولوية أعلى من إجراء `pancake` الآخر.

## أولوية العلامات

ليست جميع العلامات متساوية. بعض العلامات لها أولويات أعلى. إذا تم تقديم أسماء عناصر مكررة إلى Vim، يتحقق Vim من أولوية الكلمة الرئيسية. الترتيب هو:

1. علامة ثابتة مطابقة تمامًا في الملف الحالي.
2. علامة عالمية مطابقة تمامًا في الملف الحالي.
3. علامة عالمية مطابقة تمامًا في ملف مختلف.
4. علامة ثابتة مطابقة تمامًا في ملف آخر.
5. علامة ثابتة مطابقة بدون حساسية لحالة الأحرف في الملف الحالي.
6. علامة عالمية مطابقة بدون حساسية لحالة الأحرف في الملف الحالي.
7. علامة عالمية مطابقة بدون حساسية لحالة الأحرف في ملف مختلف.
8. علامة ثابتة مطابقة بدون حساسية لحالة الأحرف في الملف الحالي.

وفقًا لقائمة الأولويات، يعطي Vim الأولوية للتطابق الدقيق الموجود في نفس الملف. لهذا السبب يختار Vim إجراء `pancake` داخل `two.rb` على إجراء `pancake` داخل `one.rb`. هناك بعض الاستثناءات لقائمة الأولويات المذكورة أعلاه اعتمادًا على إعدادات `'tagcase'` و `'ignorecase'` و `'smartcase'` الخاصة بك، لكنني لن أناقشها هنا. إذا كنت مهتمًا، تحقق من `:h tag-priority`.

## قفزات العلامات الانتقائية

سيكون من الجيد إذا كان بإمكانك اختيار أي عناصر علامات للقفز إليها بدلاً من الذهاب دائمًا إلى عنصر العلامة ذي الأولوية الأعلى. ربما تحتاج فعلاً إلى القفز إلى طريقة `pancake` في `one.rb` وليس في `two.rb`. للقيام بذلك، يمكنك استخدام `:tselect`. قم بتشغيل:

```shell
:tselect pancake
```

سترى، في أسفل الشاشة:
## علامة نوع pri               ملف
1 F C f    pancake           two.rb
             def pancake
2 F   f    pancake           one.rb
             class:One
             def pancake
```

إذا كتبت 2، سيقفز Vim إلى الإجراء في `one.rb`. إذا كتبت 1، سيقفز Vim إلى الإجراء في `two.rb`.

انتبه إلى عمود `pri`. لديك `F C` في المطابقة الأولى و `F` في المطابقة الثانية. هذا ما يستخدمه Vim لتحديد أولوية العلامة. `F C` تعني علامة عالمية مطابقة بالكامل (`F`) في الملف الحالي (`C`). `F` تعني علامة عالمية مطابقة بالكامل فقط (`F`). `F C` دائمًا لها أولوية أعلى من `F`.

إذا قمت بتشغيل `:tselect donut`، سيطلب منك Vim أيضًا اختيار عنصر العلامة الذي تريد القفز إليه، على الرغم من أنه يوجد خيار واحد فقط للاختيار من بينه. هل هناك طريقة لـ Vim لطلب قائمة العلامات فقط إذا كانت هناك تطابقات متعددة والقفز مباشرة إذا تم العثور على علامة واحدة فقط؟

بالطبع! لدى Vim طريقة `:tjump`. قم بتشغيل:

```shell
:tjump donut
```

سيقفز Vim على الفور إلى إجراء `donut` في `one.rb`، تمامًا مثل تشغيل `:tag donut`. الآن قم بتشغيل:

```shell
:tjump pancake
```

سيطلب منك Vim خيارات العلامات للاختيار من بينها، تمامًا مثل تشغيل `:tselect pancake`. مع `tjump` تحصل على أفضل ما في كلا الطريقتين.

لدى Vim مفتاح في وضع العادي لـ `tjump`: `g Ctrl-]`. شخصيًا، أحب `g Ctrl-]` أكثر من `Ctrl-]`.

## الإكمال التلقائي مع العلامات

يمكن أن تساعد العلامات في الإكمال التلقائي. تذكر من الفصل 6، وضع الإدراج، أنه يمكنك استخدام وضع فرعي `Ctrl-X` للقيام بإكمالات تلقائية مختلفة. أحد أوضاع الإكمال التلقائي الفرعية التي لم أذكرها هو `Ctrl-]`. إذا قمت بعمل `Ctrl-X Ctrl-]` أثناء وضع الإدراج، سيستخدم Vim ملف العلامة للإكمال التلقائي.

إذا دخلت وضع الإدراج وكتبت `Ctrl-x Ctrl-]`، سترى:

```shell
One
donut
initialize
pancake
```

## مكدس العلامات

يحتفظ Vim بقائمة بجميع العلامات التي قمت بالقفز إليها ومن مكدس العلامات. يمكنك رؤية هذا المكدس باستخدام `:tags`. إذا كنت قد قفزت أولاً إلى العلامة `pancake`، تليها `donut`، وقمت بتشغيل `:tags`، سترى:

```shell
  # إلى العلامة         من السطر  في الملف/النص
  1  1 pancake            10  ch16_tags/two.rb
  2  1 donut               9  ch16_tags/two.rb
>
```

لاحظ الرمز `>` أعلاه. يظهر موقعك الحالي في المكدس. للعودة إلى المكدس السابق، يمكنك تشغيل `:pop`. جرب ذلك، ثم قم بتشغيل `:tags` مرة أخرى:

```shell
  # إلى العلامة         من السطر  في الملف/النص
  1  1 pancake            10  puts pancake
> 2  1 donut               9  one.donut

```

لاحظ أن الرمز `>` الآن على السطر الثاني، حيث توجد `donut`. قم بـ `pop` مرة أخرى، ثم قم بتشغيل `:tags` مرة أخرى:

```shell
  # إلى العلامة         من السطر  في الملف/النص
> 1  1 pancake            10  puts pancake
  2  1 donut               9  one.donut
```

في وضع العادي، يمكنك تشغيل `Ctrl-t` لتحقيق نفس تأثير `:pop`.

## توليد العلامات تلقائيًا

واحدة من أكبر عيوب علامات Vim هي أنه في كل مرة تقوم فيها بإجراء تغيير كبير، عليك إعادة توليد ملف العلامة. إذا قمت مؤخرًا بإعادة تسمية إجراء `pancake` إلى إجراء `waffle`، لم يكن لدى ملف العلامة علم بأن إجراء `pancake` قد تم إعادة تسميته. لا يزال يحتفظ بـ `pancake` في قائمة العلامات. عليك تشغيل `ctags -R .` لإنشاء ملف علامة محدث. يمكن أن يكون إعادة إنشاء ملف علامة جديد بهذه الطريقة مرهقًا.

لحسن الحظ، هناك عدة طرق يمكنك استخدامها لتوليد العلامات تلقائيًا.

## توليد علامة عند الحفظ

لدى Vim طريقة أمر تلقائي (`autocmd`) لتنفيذ أي أمر عند حدوث حدث معين. يمكنك استخدام ذلك لتوليد العلامات عند كل حفظ. قم بتشغيل:

```shell
:autocmd BufWritePost *.rb silent !ctags -R .
```

تحليل:
- `autocmd` هو أمر في سطر الأوامر. يقبل حدثًا، ونمط ملف، وأمرًا.
- `BufWritePost` هو حدث لحفظ مخزن. في كل مرة تحفظ فيها ملفًا، تقوم بتحفيز حدث `BufWritePost`.
- `.rb` هو نمط ملف لملفات روبي.
- `silent` هو في الواقع جزء من الأمر الذي تمرره. بدون ذلك، سيعرض Vim `اضغط ENTER أو اكتب الأمر للمتابعة` في كل مرة تحفز فيها الأمر التلقائي.
- `!ctags -R .` هو الأمر الذي سيتم تنفيذه. تذكر أن `!cmd` من داخل Vim ينفذ أمرًا في الطرفية.

الآن في كل مرة تحفظ من داخل ملف روبي، سيقوم Vim بتشغيل `ctags -R .`.

## استخدام الإضافات

هناك العديد من الإضافات لتوليد ctags تلقائيًا:

- [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags)
- [vim-tags](https://github.com/szw/vim-tags)
- [vim-easytags](https://github.com/xolox/vim-easytags)
- [vim-autotag](https://github.com/craigemery/vim-autotag)

أستخدم vim-gutentags. إنه سهل الاستخدام وسيعمل مباشرة من الصندوق.

## Ctags و Git Hooks

كتب تيم بوب، مؤلف العديد من إضافات Vim الرائعة، مدونة تقترح استخدام git hooks. [تحقق من ذلك](https://tbaggery.com/2011/08/08/effortless-ctags-with-git.html).

## تعلم العلامات بالطريقة الذكية

تكون العلامة مفيدة بمجرد تكوينها بشكل صحيح. افترض أنك تواجه قاعدة شفرة جديدة وتريد أن تفهم ما تفعله `functionFood`، يمكنك بسهولة قراءتها بالقفز إلى تعريفها. داخلها، تتعلم أنها تستدعي أيضًا `functionBreakfast`. تتبعها وتتعلم أنها تستدعي `functionPancake`. يبدو رسم بياني لاستدعاء الدالة لديك كالتالي:

```shell
functionFood -> functionBreakfast -> functionPancake
```

هذا يمنحك فكرة أن تدفق الشفرة هذا مرتبط بالحصول على فطيرة للإفطار.

لتعلم المزيد عن العلامات، تحقق من `:h tags`. الآن بعد أن عرفت كيفية استخدام العلامات، دعنا نستكشف ميزة مختلفة: الطي.