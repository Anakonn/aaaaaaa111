---
description: В этом документе объясняется, как работают буферы, окна и вкладки в Vim,
  а также как настроить vimrc для удобной работы с ними.
title: Ch02. Buffers, Windows, and Tabs
---

Если вы раньше использовали современный текстовый редактор, вы, вероятно, знакомы с буферами и вкладками. Vim использует три абстракции отображения вместо двух: буферы, окна и вкладки. В этой главе я объясню, что такое буферы, окна и вкладки, и как они работают в Vim.

Перед тем как начать, убедитесь, что у вас есть опция `set hidden` в vimrc. Без нее, когда вы переключаете буферы и ваш текущий буфер не сохранен, Vim предложит вам сохранить файл (вы этого не хотите, если хотите быстро перемещаться). Я еще не охватил vimrc. Если у вас нет vimrc, создайте его. Обычно он размещается в вашем домашнем каталоге и называется `.vimrc`. У меня он находится в `~/.vimrc`. Чтобы узнать, где вам следует создать ваш vimrc, посмотрите `:h vimrc`. Внутри добавьте:

```shell
set hidden
```

Сохраните его, затем загрузите (выполните `:source %` из vimrc).

## Буферы

Что такое *буфер*?

Буфер — это область в памяти, где вы можете писать и редактировать текст. Когда вы открываете файл в Vim, данные связываются с буфером. Когда вы открываете 3 файла в Vim, у вас есть 3 буфера.

Имея два пустых файла, `file1.js` и `file2.js`, (если возможно, создайте их с помощью Vim). Запустите это в терминале:

```bash
vim file1.js
```

То, что вы видите, — это *буфер* `file1.js`. Каждый раз, когда вы открываете новый файл, Vim создает новый буфер.

Выйдите из Vim. На этот раз откройте два новых файла:

```bash
vim file1.js file2.js
```

Сейчас Vim отображает буфер `file1.js`, но на самом деле создает два буфера: буфер `file1.js` и буфер `file2.js`. Выполните `:buffers`, чтобы увидеть все буферы (в качестве альтернативы, вы также можете использовать `:ls` или `:files`). Вы должны увидеть *оба* буфера `file1.js` и `file2.js`. Выполнение `vim file1 file2 file3 ... filen` создает n количество буферов. Каждый раз, когда вы открываете новый файл, Vim создает новый буфер для этого файла.

Существует несколько способов перемещения по буферам:
- `:bnext` для перехода к следующему буферу (`:bprevious` для перехода к предыдущему буферу).
- `:buffer` + имя файла. Vim может автозаполнить имя файла с помощью `<Tab>`.
- `:buffer` + `n`, где `n` — это номер буфера. Например, ввод `:buffer 2` приведет вас к буферу #2.
- Перейти к более старой позиции в списке переходов с помощью `Ctrl-O` и к более новой позиции с помощью `Ctrl-I`. Это не специфичные для буфера методы, но их можно использовать для перехода между разными буферами. Я объясню переходы более подробно в главе 5.
- Перейти к ранее редактируемому буферу с помощью `Ctrl-^`.

Как только Vim создает буфер, он останется в вашем списке буферов. Чтобы удалить его, вы можете ввести `:bdelete`. Он также может принимать номер буфера в качестве параметра (`:bdelete 3` для удаления буфера #3) или имя файла (`:bdelete`, затем используйте `<Tab>` для автозаполнения).

Самым трудным для меня при изучении буферов было визуализировать, как они работают, потому что мой разум был привык к окнам из использования обычного текстового редактора. Хорошая аналогия — это колода игральных карт. Если у меня есть 2 буфера, у меня есть стопка из 2 карт. Карта сверху — это единственная карта, которую я вижу, но я знаю, что под ней есть карты. Если я вижу отображаемый буфер `file1.js`, значит, карта `file1.js` находится на верхней части колоды. Я не вижу другую карту, `file2.js`, здесь, но она есть. Если я переключаюсь на буфер `file2.js`, карта `file2.js` теперь на верхней части колоды, а карта `file1.js` под ней.

Если вы никогда не использовали Vim раньше, это новая концепция. Не спешите, чтобы понять это.

## Выход из Vim

Кстати, если у вас открыто несколько буферов, вы можете закрыть все из них с помощью quit-all:

```shell
:qall
```

Если вы хотите закрыть без сохранения изменений, просто добавьте `!` в конце:

```shell
:qall!
```

Чтобы сохранить и выйти из всех, выполните:

```shell
:wqall
```

## Окна

Окно — это область просмотра буфера. Если вы приходите из обычного редактора, эта концепция может быть вам знакома. Большинство текстовых редакторов имеют возможность отображать несколько окон. В Vim вы также можете иметь несколько окон.

Давайте снова откроем `file1.js` из терминала:

```bash
vim file1.js
```

Ранее я писал, что вы смотрите на буфер `file1.js`. Хотя это было правильно, это утверждение было неполным. Вы смотрите на буфер `file1.js`, отображаемый через **окно**. Окно — это то, как вы просматриваете буфер.

Не выходите из Vim еще. Выполните:

```shell
:split file2.js
```

Теперь вы смотрите на два буфера через **два окна**. Верхнее окно отображает буфер `file2.js`. Нижнее окно отображает буфер `file1.js`.

Если вы хотите перемещаться между окнами, используйте эти сочетания клавиш:

```shell
Ctrl-W H    Перемещает курсор в левое окно
Ctrl-W J    Перемещает курсор в окно ниже
Ctrl-W K    Перемещает курсор в верхнее окно
Ctrl-W L    Перемещает курсор в правое окно
```

Теперь выполните:

```shell
:vsplit file3.js
```

Теперь вы видите три окна, отображающие три буфера. Одно окно отображает буфер `file3.js`, другое окно отображает буфер `file2.js`, а третье окно отображает буфер `file1.js`.

Вы можете иметь несколько окон, отображающих один и тот же буфер. Пока вы находитесь в верхнем левом окне, введите:

```shell
:buffer file2.js
```

Теперь оба окна отображают буфер `file2.js`. Если вы начнете печатать в окне `file2.js`, вы увидите, что оба окна, отображающие буфер `file2.js`, обновляются в реальном времени.

Чтобы закрыть текущее окно, вы можете выполнить `Ctrl-W C` или ввести `:quit`. Когда вы закрываете окно, буфер все еще остается (выполните `:buffers`, чтобы подтвердить это).

Вот несколько полезных команд окон в нормальном режиме:

```shell
Ctrl-W V    Открывает новое вертикальное разделение
Ctrl-W S    Открывает новое горизонтальное разделение
Ctrl-W C    Закрывает окно
Ctrl-W O    Делает текущее окно единственным на экране и закрывает другие окна
```

А вот список полезных команд командной строки для окон:

```shell
:vsplit filename    Разделить окно вертикально
:split filename     Разделить окно горизонтально
:new filename       Создать новое окно
```

Не спешите, чтобы понять их. Для получения дополнительной информации посмотрите `:h window`.

## Вкладки

Вкладка — это коллекция окон. Думайте об этом как о макете для окон. В большинстве современных текстовых редакторов (и современных интернет-браузеров) вкладка означает открытый файл / страницу, и когда вы закрываете ее, этот файл / страница исчезает. В Vim вкладка не представляет собой открытый файл. Когда вы закрываете вкладку в Vim, вы не закрываете файл. Вы просто закрываете макет. Файлы, открытые в этом макете, все еще не закрыты, они все еще открыты в своих буферах.

Давайте посмотрим на вкладки Vim в действии. Откройте `file1.js`:

```bash
vim file1.js
```

Чтобы открыть `file2.js` в новой вкладке:

```shell
:tabnew file2.js
```

Вы также можете позволить Vim автозаполнить файл, который вы хотите открыть в *новой вкладке*, нажав `<Tab>` (без игры слов).

Ниже приведен список полезных навигаций по вкладкам:

```shell
:tabnew file.txt    Открыть file.txt в новой вкладке
:tabclose           Закрыть текущую вкладку
:tabnext            Перейти к следующей вкладке
:tabprevious        Перейти к предыдущей вкладке
:tablast            Перейти к последней вкладке
:tabfirst           Перейти к первой вкладке
```

Вы также можете выполнить `gt`, чтобы перейти к следующей вкладке (вы можете перейти к предыдущей вкладке с помощью `gT`). Вы можете передать количество в качестве аргумента для `gt`, где количество — это номер вкладки. Чтобы перейти к третьей вкладке, выполните `3gt`.

Одно из преимуществ наличия нескольких вкладок — это возможность иметь разные расположения окон в разных вкладках. Возможно, вы хотите, чтобы ваша первая вкладка имела 3 вертикальных окна, а вторая вкладка имела смешанное горизонтальное и вертикальное расположение окон. Вкладка — это идеальный инструмент для этой задачи!

Чтобы начать Vim с несколькими вкладками, вы можете сделать это из терминала:

```bash
vim -p file1.js file2.js file3.js
```

## Перемещение в 3D

Перемещение между окнами похоже на перемещение по двумерной плоскости вдоль осей X-Y в декартовых координатах. Вы можете перемещаться в верхнее, правое, нижнее и левое окно с помощью `Ctrl-W H/J/K/L`.

Перемещение между буферами похоже на перемещение по оси Z в декартовых координатах. Представьте, что ваши файлы буферов выстраиваются вдоль оси Z. Вы можете перемещаться по оси Z по одному буферу за раз с помощью `:bnext` и `:bprevious`. Вы можете прыгнуть к любой координате на оси Z с помощью `:buffer filename/buffernumber`.

Вы можете перемещаться в *трехмерном пространстве*, комбинируя перемещения окон и буферов. Вы можете перемещаться вверх, вправо, вниз или влево (навигация по X-Y) с помощью перемещений окон. Поскольку каждое окно содержит буферы, вы можете перемещаться вперед и назад (навигация по Z) с помощью перемещений буферов.

## Умное использование буферов, окон и вкладок

Вы узнали, что такое буферы, окна и вкладки, и как они работают в Vim. Теперь, когда вы лучше их понимаете, вы можете использовать их в своем рабочем процессе.

У каждого есть свой рабочий процесс, вот, например, мой:
- Сначала я использую буферы, чтобы хранить все необходимые файлы для текущей задачи. Vim может обрабатывать много открытых буферов, прежде чем начнет замедляться. Плюс, наличие множества открытых буферов не загромождает мой экран. Я вижу только один буфер (предполагая, что у меня только одно окно) в любой момент времени, что позволяет мне сосредоточиться на одном экране. Когда мне нужно куда-то пойти, я могу быстро перейти к любому открытому буферу в любое время.
- Я использую несколько окон, чтобы одновременно просматривать несколько буферов, обычно при сравнении файлов, чтении документов или следовании за потоком кода. Я стараюсь держать количество открытых окон не более трех, потому что мой экран будет загроможден (я использую маленький ноутбук). Когда я закончу, я закрываю любые лишние окна. Меньше окон означает меньше отвлечений.
- Вместо вкладок я использую окна [tmux](https://github.com/tmux/tmux/wiki). Я обычно использую несколько окон tmux одновременно. Например, одно окно tmux для клиентского кода и другое для серверного кода.

Мой рабочий процесс может выглядеть иначе, чем ваш, в зависимости от вашего стиля редактирования, и это нормально. Экспериментируйте, чтобы открыть для себя свой собственный поток, соответствующий вашему стилю кодирования.