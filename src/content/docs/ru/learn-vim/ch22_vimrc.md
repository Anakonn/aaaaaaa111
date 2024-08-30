---
description: В этой главе вы узнаете, как организовать и настроить vimrc, а также
  как Vim находит файл конфигурации vimrc в различных местах.
title: Ch22. Vimrc
---

В предыдущих главах вы узнали, как использовать Vim. В этой главе вы научитесь организовывать и настраивать vimrc.

## Как Vim находит Vimrc

Общепринятое мнение о vimrc заключается в том, чтобы добавить файл `.vimrc` в домашний каталог `~/.vimrc` (он может отличаться в зависимости от вашей ОС).

За кулисами Vim проверяет несколько мест для файла vimrc. Вот места, которые проверяет Vim:
- `$VIMINIT`
- `$HOME/.vimrc`
- `$HOME/.vim/vimrc`
- `$EXINIT`
- `$HOME/.exrc`
- `$VIMRUNTIME/defaults.vim`

Когда вы запускаете Vim, он проверяет указанные шесть мест в этом порядке на наличие файла vimrc. Первый найденный файл vimrc будет использован, а остальные игнорируются.

Сначала Vim будет искать `$VIMINIT`. Если там ничего нет, Vim проверит `$HOME/.vimrc`. Если там ничего нет, Vim проверит `$HOME/.vim/vimrc`. Если Vim его найдет, он прекратит поиск и использует `$HOME/.vim/vimrc`.

Первое место, `$VIMINIT`, является переменной окружения. По умолчанию она не определена. Если вы хотите использовать `~/dotfiles/testvimrc` в качестве значения `$VIMINIT`, вы можете создать переменную окружения, содержащую путь к этому vimrc. После выполнения `export VIMINIT='let $MYVIMRC="$HOME/dotfiles/testvimrc" | source $MYVIMRC'`, Vim теперь будет использовать `~/dotfiles/testvimrc` в качестве вашего файла vimrc.

Второе место, `$HOME/.vimrc`, является общепринятым путем для многих пользователей Vim. `$HOME` в большинстве случаев — это ваш домашний каталог (`~`). Если у вас есть файл `~/.vimrc`, Vim будет использовать его в качестве вашего файла vimrc.

Третье, `$HOME/.vim/vimrc`, находится внутри каталога `~/.vim`. У вас может уже быть каталог `~/.vim` для ваших плагинов, пользовательских скриптов или файлов View. Обратите внимание, что в имени файла vimrc нет точки (`$HOME/.vim/.vimrc` не сработает, но `$HOME/.vim/vimrc` сработает).

Четвертое, `$EXINIT`, работает аналогично `$VIMINIT`.

Пятое, `$HOME/.exrc`, работает аналогично `$HOME/.vimrc`.

Шестое, `$VIMRUNTIME/defaults.vim`, является стандартным vimrc, который идет с вашей сборкой Vim. В моем случае у меня установлена Vim 8.2 с помощью Homebrew, поэтому мой путь (`/usr/local/share/vim/vim82`). Если Vim не найдет ни один из предыдущих шести файлов vimrc, он будет использовать этот файл.

В оставшейся части этой главы я предполагаю, что vimrc использует путь `~/.vimrc`.

## Что положить в мой Vimrc?

Вопрос, который я задавал, когда начинал, был: "Что мне положить в мой vimrc?"

Ответ: "все, что вы хотите". Искушение копировать vimrc других людей реально, но вы должны противостоять ему. Если вы настаиваете на использовании чужого vimrc, убедитесь, что вы понимаете, что он делает, почему и как он используется, и, что наиболее важно, актуален ли он для вас. Просто потому, что кто-то использует его, не означает, что вы тоже будете его использовать.

## Основное содержание Vimrc

В общем, vimrc — это коллекция:
- Плагинов
- Настроек
- Пользовательских функций
- Пользовательских команд
- Привязок

Есть и другие вещи, не упомянутые выше, но в целом это охватывает большинство случаев использования.

### Плагины

В предыдущих главах я упоминал разные плагины, такие как [fzf.vim](https://github.com/junegunn/fzf.vim), [vim-mundo](https://github.com/simnalamburt/vim-mundo) и [vim-fugitive](https://github.com/tpope/vim-fugitive).

Десять лет назад управление плагинами было настоящим кошмаром. Однако с появлением современных менеджеров плагинов установка плагинов теперь может занять всего несколько секунд. В настоящее время я использую [vim-plug](https://github.com/junegunn/vim-plug) в качестве менеджера плагинов, поэтому я буду использовать его в этом разделе. Концепция должна быть похожа на другие популярные менеджеры плагинов. Я настоятельно рекомендую вам ознакомиться с различными из них, такими как:
- [vundle.vim](https://github.com/VundleVim/Vundle.vim)
- [vim-pathogen](https://github.com/tpope/vim-pathogen)
- [dein.vim](https://github.com/Shougo/dein.vim)

Существует больше менеджеров плагинов, чем перечисленные выше, не стесняйтесь исследовать. Чтобы установить vim-plug, если у вас есть Unix-машина, выполните:

```shell
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Чтобы добавить новые плагины, вставьте имена ваших плагинов (`Plug 'github-username/repository-name'`) между строками `call plug#begin()` и `call plug#end()`. Если вы хотите установить `emmet-vim` и `nerdtree`, вставьте следующий фрагмент в ваш vimrc:

```shell
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
```

Сохраните изменения, выполните `:source %` и запустите `:PlugInstall`, чтобы установить их.

В будущем, если вам нужно удалить неиспользуемые плагины, просто удалите имена плагинов из блока `call`, сохраните и выполните `:PlugClean`, чтобы удалить их с вашего компьютера.

Vim 8 имеет свои собственные встроенные менеджеры пакетов. Вы можете ознакомиться с `:h packages` для получения дополнительной информации. В следующей главе я покажу вам, как его использовать.

### Настройки

Обычно в любом vimrc можно увидеть множество опций `set`. Если вы выполните команду set из командного режима, это не будет постоянным. Вы потеряете это, когда закроете Vim. Например, вместо того чтобы каждый раз запускать `:set relativenumber number` из командного режима, вы можете просто вставить это в vimrc:

```shell
set relativenumber number
```

Некоторые настройки требуют, чтобы вы передали им значение, например, `set tabstop=2`. Ознакомьтесь со страницей справки для каждой настройки, чтобы узнать, какие значения она принимает.

Вы также можете использовать `let` вместо `set` (убедитесь, что вы добавили `&` перед ним). С помощью `let` вы можете использовать выражение в качестве значения. Например, чтобы установить опцию `'dictionary'` на путь только в том случае, если путь существует:

```shell
let s:english_dict = "/usr/share/dict/words"

if filereadable(s:english_dict)
  let &dictionary=s:english_dict
endif
```

Вы узнаете о присваивании и условных операторах Vimscript в следующих главах.

Для получения списка всех возможных опций в Vim ознакомьтесь с `:h E355`.

### Пользовательские функции

Vimrc — это хорошее место для пользовательских функций. Вы узнаете, как писать собственные функции Vimscript в следующей главе.

### Пользовательские команды

Вы можете создать пользовательскую команду командной строки с помощью `command`.

Чтобы создать базовую команду `GimmeDate`, чтобы отобразить сегодняшнюю дату:

```shell
:command! GimmeDate echo call("strftime", ["%F"])
```

Когда вы выполните `:GimmeDate`, Vim отобразит дату, например "2021-01-1".

Чтобы создать базовую команду с вводом, вы можете использовать `<args>`. Если вы хотите передать `GimmeDate` конкретный формат времени/даты:

```shell
:command! GimmeDate echo call("strftime", [<args>])

:GimmeDate "%F"
" 2020-01-01

:GimmeDate "%H:%M"
" 11:30
```

Если вы хотите ограничить количество аргументов, вы можете передать флаг `-nargs`. Используйте `-nargs=0`, чтобы не передавать аргументы, `-nargs=1`, чтобы передать один аргумент, `-nargs=+`, чтобы передать как минимум один аргумент, `-nargs=*`, чтобы передать любое количество аргументов, и `-nargs=?`, чтобы передать 0 или один аргумент. Если вы хотите передать n-й аргумент, используйте `-nargs=n` (где `n` — любое целое число).

`<args>` имеет два варианта: `<f-args>` и `<q-args>`. Первый используется для передачи аргументов в функции Vimscript. Второй используется для автоматического преобразования пользовательского ввода в строки.

Используя `args`:

```shell
:command! -nargs=1 Hello echo "Hello " . <args>
:Hello "Iggy"
" возвращает 'Hello Iggy'

:Hello Iggy
" Ошибка неопределенной переменной
```

Используя `q-args`:

```shell
:command! -nargs=1 Hello echo "Hello " . <q-args>
:Hello Iggy
" возвращает 'Hello Iggy'
```

Используя `f-args`:

```shell
:function! PrintHello(person1, person2)
:  echo "Hello " . a:person1 . " and " . a:person2
:endfunction

:command! -nargs=* Hello call PrintHello(<f-args>)

:Hello Iggy1 Iggy2
" возвращает "Hello Iggy1 and Iggy2"
```

Функции выше станут гораздо более понятными, когда вы дойдете до главы о функциях Vimscript.

Чтобы узнать больше о командах и аргументах, ознакомьтесь с `:h command` и `:args`.
### Карты

Если вы постоянно выполняете одну и ту же сложную задачу, это хороший индикатор того, что вам следует создать сопоставление для этой задачи.

Например, у меня есть эти два сопоставления в моем vimrc:

```shell
nnoremap <silent> <C-f> :GFiles<CR>

nnoremap <Leader>tn :call ToggleNumber()<CR>
```

В первом сопоставлении я связываю `Ctrl-F` с командой `:Gfiles` плагина [fzf.vim](https://github.com/junegunn/fzf.vim) (быстрый поиск Git файлов). Во втором сопоставлении я связываю `<Leader>tn` с вызовом пользовательской функции `ToggleNumber` (переключает параметры `norelativenumber` и `relativenumber`). Сопоставление `Ctrl-F` перезаписывает родное прокручивание страниц Vim. Ваше сопоставление перезапишет управление Vim, если они совпадают. Поскольку я почти никогда не использовал эту функцию, я решил, что безопасно ее перезаписать.

Кстати, что такое "лидер" клавиша в `<Leader>tn`?

Vim имеет клавишу лидера для помощи в сопоставлениях. Например, я сопоставил `<Leader>tn` для выполнения функции `ToggleNumber()`. Без клавиши лидера я бы использовал `tn`, но в Vim уже есть `t` (навигация поиска "до"). С клавишей лидера я теперь могу нажать клавишу, назначенную как лидер, затем `tn`, не мешая существующим командам. Клавиша лидера — это клавиша, которую вы можете настроить для начала вашего комбинации сопоставлений. По умолчанию Vim использует обратный слэш в качестве клавиши лидера (так что `<Leader>tn` становится "обратный слэш-t-n").

Лично я предпочитаю использовать `<Space>` в качестве клавиши лидера вместо стандартного обратного слэша. Чтобы изменить вашу клавишу лидера, добавьте это в ваш vimrc:

```shell
let mapleader = "\<space>"
```

Команда `nnoremap`, использованная выше, может быть разбита на три части:
- `n` представляет нормальный режим.
- `nore` означает не рекурсивный.
- `map` — это команда сопоставления.

В минимуме вы могли бы использовать `nmap` вместо `nnoremap` (`nmap <silent> <C-f> :Gfiles<CR>`). Однако хорошей практикой является использование не рекурсивного варианта, чтобы избежать потенциального бесконечного цикла.

Вот что может произойти, если вы не сопоставите не рекурсивно. Предположим, вы хотите добавить сопоставление к `B`, чтобы добавить точку с запятой в конце строки, затем вернуться на одно СЛОВО (помните, что `B` в Vim — это клавиша навигации нормального режима для возврата на одно СЛОВО).

```shell
nmap B A;<esc>B
```

Когда вы нажимаете `B`... о нет! Vim добавляет `;` неконтролируемо (прервите это с помощью `Ctrl-C`). Почему это произошло? Потому что в сопоставлении `A;<esc>B` `B` не относится к родной функции `B` Vim (вернуться на одно СЛОВО), а относится к сопоставленной функции. То, что у вас есть, на самом деле это:

```shell
A;<esc>A;<esc>A;<esc>A;esc>...
```

Чтобы решить эту проблему, вам нужно добавить не рекурсивное сопоставление:

```shell
nnoremap B A;<esc>B
```

Теперь попробуйте снова вызвать `B`. На этот раз он успешно добавляет `;` в конце строки и возвращается на одно СЛОВО. `B` в этом сопоставлении представляет собой оригинальную функциональность `B` Vim.

Vim имеет разные сопоставления для разных режимов. Если вы хотите создать сопоставление для режима вставки, чтобы выйти из режима вставки, когда вы нажимаете `jk`:

```shell
inoremap jk <esc>
```

Другие режимы сопоставления: `map` (Нормальный, Визуальный, Выбор и Ожидание оператора), `vmap` (Визуальный и Выбор), `smap` (Выбор), `xmap` (Визуальный), `omap` (Ожидание оператора), `map!` (Вставка и Командная строка), `lmap` (Вставка, Командная строка, Lang-arg), `cmap` (Командная строка) и `tmap` (терминальная работа). Я не буду подробно их обсуждать. Чтобы узнать больше, ознакомьтесь с `:h map.txt`.

Создайте сопоставление, которое будет наиболее интуитивным, последовательным и легким для запоминания.

## Организация Vimrc

Со временем ваш vimrc станет большим и запутанным. Есть два способа, чтобы ваш vimrc выглядел чистым:
- Разделите ваш vimrc на несколько файлов.
- Сложите ваш vimrc файл.

### Разделение вашего Vimrc

Вы можете разделить ваш vimrc на несколько файлов, используя команду `source` Vim. Эта команда читает команды командной строки из указанного аргумента файла.

Давайте создадим файл в директории `~/.vim` и назовем его `/settings` (`~/.vim/settings`). Само название произвольно, и вы можете назвать его как угодно.

Вы собираетесь разделить его на четыре компонента:
- Плагины третьих сторон (`~/.vim/settings/plugins.vim`).
- Общие настройки (`~/.vim/settings/configs.vim`).
- Пользовательские функции (`~/.vim/settings/functions.vim`).
- Клавишные сопоставления (`~/.vim/settings/mappings.vim`).

Внутри `~/.vimrc`:

```shell
source $HOME/.vim/settings/plugins.vim
source $HOME/.vim/settings/configs.vim
source $HOME/.vim/settings/functions.vim
source $HOME/.vim/settings/mappings.vim
```

Вы можете редактировать эти файлы, поставив курсор под путь и нажав `gf`.

Внутри `~/.vim/settings/plugins.vim`:

```shell
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
```

Внутри `~/.vim/settings/configs.vim`:

```shell
set nocompatible
set relativenumber
set number
```

Внутри `~/.vim/settings/functions.vim`:

```shell
function! ToggleNumber()
  if(&relativenumber == 1)
    set norelativenumber
  else
    set relativenumber
  endif
endfunc
```

Внутри `~/.vim/settings/mappings.vim`:

```shell
inoremap jk <esc>
nnoremap <silent> <C-f> :GFiles<CR>
nnoremap <Leader>tn :call ToggleNumber()<CR>
```

Ваш vimrc должен работать как обычно, но теперь он состоит всего из четырех строк!

С этой настройкой вы легко знаете, куда идти. Если вам нужно добавить больше сопоставлений, добавьте их в файл `/mappings.vim`. В будущем вы всегда можете добавлять больше директорий по мере роста вашего vimrc. Например, если вам нужно создать настройку для ваших цветовых схем, вы можете добавить `~/.vim/settings/themes.vim`.

### Сохранение одного файла Vimrc

Если вы предпочитаете сохранить один файл vimrc, чтобы он был портативным, вы можете использовать маркерные склады, чтобы поддерживать его организованным. Добавьте это в верхнюю часть вашего vimrc:

```shell
" настройка складов {{{
augroup filetype_vim
  autocmd!
  autocmd FileType vim setlocal foldmethod=marker
augroup END
" }}}
```

Vim может определить, какой тип файла имеет текущий буфер (`:set filetype?`). Если это файл типа `vim`, вы можете использовать метод маркерного складывания. Напомню, что маркерный склад использует `{{{` и `}}}` для обозначения начала и конца складов.

Добавьте склады `{{{` и `}}}` в остальную часть вашего vimrc (не забудьте прокомментировать их с помощью `"`):

```shell
" настройка складов {{{
augroup filetype_vim
  autocmd!
  autocmd FileType vim setlocal foldmethod=marker
augroup END
" }}}

" плагины {{{
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
" }}}

" настройки {{{
set nocompatible
set relativenumber
set number
" }}}

" функции {{{
function! ToggleNumber()
  if(&relativenumber == 1)
    set norelativenumber
  else
    set relativenumber
  endif
endfunc
" }}}

" сопоставления {{{
inoremap jk <esc>
nnoremap <silent> <C-f> :GFiles<CR>
nnoremap <Leader>tn :call ToggleNumber()<CR>
" }}}
```

Ваш vimrc должен выглядеть так:

```shell
+-- 6 строк: настройка складов -----

+-- 6 строк: плагины ---------

+-- 5 строк: настройки ---------

+-- 9 строк: функции -------

+-- 5 строк: сопоставления --------
```

## Запуск Vim с или без Vimrc и плагинов

Если вам нужно запустить Vim без vimrc и плагинов, выполните:

```shell
vim -u NONE
```

Если вам нужно запустить Vim без vimrc, но с плагинами, выполните:

```shell
vim -u NORC
```

Если вам нужно запустить Vim с vimrc, но без плагинов, выполните:

```shell
vim --noplugin
```

Если вам нужно запустить Vim с *другим* vimrc, скажем `~/.vimrc-backup`, выполните:

```shell
vim -u ~/.vimrc-backup
```

Если вам нужно запустить Vim только с `defaults.vim` и без плагинов, что полезно для исправления сломанного vimrc, выполните:

```shell
vim --clean
```

## Умная настройка Vimrc

Vimrc — это важный компонент настройки Vim. Хороший способ начать создание вашего vimrc — это читать vimrc других людей и постепенно строить его со временем. Лучший vimrc — это не тот, который использует разработчик X, а тот, который точно соответствует вашей системе мышления и стилю редактирования.