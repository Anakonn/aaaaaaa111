---
description: Vimのビジュアルモードを使って、テキストを効率的に操作する方法を学びます。3つのモードの使い方を紹介します。
title: Ch11. Visual Mode
---

テキストの一部に変更を加えたり、強調表示したりすることは、多くのテキストエディタやワードプロセッサで一般的な機能です。Vimは、ビジュアルモードを使用してこれを行うことができます。この章では、ビジュアルモードを使用してテキストを効率的に操作する方法を学びます。

## ビジュアルモードの3つのタイプ

Vimには3つの異なるビジュアルモードがあります。それは：

```shell
v         文字単位のビジュアルモード
V         行単位のビジュアルモード
Ctrl-V    ブロック単位のビジュアルモード
```

テキストがあるとします：

```shell
one
two
three
```

文字単位のビジュアルモードは、個々の文字で動作します。最初の文字で`v`を押します。次に、`j`で次の行に移動します。これにより、「one」からカーソルの位置までのすべてのテキストが強調表示されます。`gU`を押すと、Vimは強調表示された文字を大文字にします。

行単位のビジュアルモードは、行単位で動作します。`V`を押すと、カーソルがある行全体が選択されます。文字単位のビジュアルモードと同様に、`gU`を実行すると、Vimは強調表示された文字を大文字にします。

ブロック単位のビジュアルモードは、行と列で動作します。これは、他の2つのモードよりも移動の自由度が高くなります。`Ctrl-V`を押すと、Vimはカーソルの下の文字を強調表示しますが、文字単位のビジュアルモードとは異なり、次の行に移動する際に最小限の強調表示で行います。`h/j/k/l`で移動して、カーソルの動きを見てみましょう。

Vimウィンドウの左下には、現在のビジュアルモードを示す`-- VISUAL --`、`-- VISUAL LINE --`、または`-- VISUAL BLOCK --`のいずれかが表示されます。

ビジュアルモード内にいる間は、`v`、`V`、または`Ctrl-V`を押すことで別のビジュアルモードに切り替えることができます。たとえば、行単位のビジュアルモードにいるときにブロック単位のビジュアルモードに切り替えたい場合は、`Ctrl-V`を実行します。試してみてください！

ビジュアルモードを終了する方法は3つあります：`<Esc>`、`Ctrl-C`、および現在のビジュアルモードと同じキーです。後者は、現在行単位のビジュアルモード（`V`）にいる場合、再度`V`を押すことで終了できることを意味します。文字単位のビジュアルモードにいる場合は、`v`を押すことで終了できます。

実際、ビジュアルモードに入るもう1つの方法があります：

```shell
gv    前のビジュアルモードに戻る
```

これは、前回と同じ強調表示されたテキストブロックで同じビジュアルモードを開始します。

## ビジュアルモードのナビゲーション

ビジュアルモード中は、Vimの動作を使って強調表示されたテキストブロックを拡張できます。

先ほど使用したのと同じテキストを使いましょう：

```shell
one
two
three
```

今回は「two」行から始めましょう。`v`を押して文字単位のビジュアルモードに移動します（ここで角括弧`[]`は文字の強調表示を表します）：

```shell
one
[t]wo
three
```

`j`を押すと、Vimは「two」行から「three」行の最初の文字までのすべてのテキストを強調表示します。

```shell
one
[two
t]hree
```

この位置から「one」行も追加したいとします。`k`を押すと、残念ながら強調表示は「three」行から離れてしまいます。

```shell
one
[t]wo
three
```

任意の方向に自由にビジュアル選択を拡張する方法はありますか？もちろんです。「two」と「three」行が強調表示されているところまで戻りましょう。

```shell
one
[two
t]hree    <-- カーソル
```

ビジュアルハイライトはカーソルの動きに従います。上に「one」行まで拡張したい場合は、カーソルを「two」行に移動する必要があります。現在、カーソルは「three」行にあります。`o`または`O`でカーソルの位置を切り替えることができます。

```shell
one
[two     <-- カーソル
t]hree
```

今、`k`を押すと、選択が減少するのではなく、上に拡張されます。

```shell
[one
two
t]hree
```

ビジュアルモードで`o`または`O`を使用すると、カーソルは強調表示されたブロックの先頭から末尾にジャンプし、ハイライトエリアを拡張できます。

## ビジュアルモードの文法

ビジュアルモードは、通常モードと多くの操作を共有しています。

たとえば、次のテキストがあり、ビジュアルモードから最初の2行を削除したい場合：

```shell
one
two
three
```

行単位のビジュアルモード（`V`）で「one」と「two」行を強調表示します：

```shell
[one
two]
three
```

`d`を押すと、選択が削除され、通常モードと同様に動作します。通常モードの文法ルール、動詞 + 名詞は適用されないことに注意してください。同じ動詞はまだ存在します（`d`）が、ビジュアルモードには名詞がありません。ビジュアルモードの文法ルールは名詞 + 動詞であり、名詞は強調表示されたテキストです。まずテキストブロックを選択し、その後にコマンドが続きます。

通常モードでは、カーソルの下の単一の文字を削除するための`x`や、カーソルの下の文字を置き換えるための`r`など、動作を必要としないコマンドがあります（`rx`はカーソルの下の文字を"x"に置き換えます）。ビジュアルモードでは、これらのコマンドは単一の文字ではなく、強調表示されたテキスト全体に適用されます。強調表示されたテキストに戻ると：

```shell
[one
two]
three
```

`x`を実行すると、すべての強調表示されたテキストが削除されます。

この動作を利用して、Markdownテキストでヘッダーを迅速に作成できます。次のテキストを第一レベルのMarkdownヘッダー（"==="）に変換する必要があるとします：

```shell
Chapter One
```

まず、`yy`でテキストをコピーし、`p`で貼り付けます：

```shell
Chapter One
Chapter One
```

次に、2行目に移動し、行単位のビジュアルモードで選択します：

```shell
Chapter One
[Chapter One]
```

第一レベルのヘッダーは、テキストの下にある一連の"="です。`r=`を実行すると、手動で"="を入力する手間が省けます。

```shell
Chapter One
===========
```

ビジュアルモードの演算子について詳しく学ぶには、`:h visual-operators`を確認してください。

## ビジュアルモードとコマンドラインコマンド

強調表示されたテキストブロックに対してコマンドラインコマンドを選択的に適用できます。次の文があり、最初の2行の"const"を"let"に置き換えたい場合：

```shell
const one = "one";
const two = "two";
const three = "three";
```

*任意の*ビジュアルモードで最初の2行を強調表示し、置換コマンド`:s/const/let/g`を実行します：

```shell
let one = "one";
let two = "two";
const three = "three";
```

*任意の*ビジュアルモードでこれができると言ったことに注意してください。その行の全体を強調表示する必要はありません。各行の少なくとも1文字を選択すれば、コマンドが適用されます。

## 複数行にテキストを追加する

Vimでは、ブロック単位のビジュアルモードを使用して複数行にテキストを追加できます。各行の末尾にセミコロンを追加する必要がある場合：

```shell
const one = "one"
const two = "two"
const three = "three"
```

最初の行にカーソルを置きます：
- ブロック単位のビジュアルモードを実行し、2行下に移動します（`Ctrl-V jj`）。
- 行の末尾まで強調表示します（`$`）。
- 追加（`A`）して、";"を入力します。
- ビジュアルモードを終了します（`<Esc>`）。

これで、各行の末尾に追加された";"が表示されるはずです。素晴らしいですね！ブロック単位のビジュアルモードから挿入モードに入る方法は2つあります：カーソルの後にテキストを追加するための`A`またはカーソルの前にテキストを追加するための`I`です。これらを通常モードの行末にテキストを追加する`A`（行の末尾にテキストを追加）や、最初の非空行の前にテキストを挿入する`I`と混同しないでください。

また、`:normal`コマンドを使用して複数行にテキストを追加することもできます：
- すべての3行を強調表示します（`vjj`）。
- `:normal! A;`と入力します。

`:normal`コマンドは通常モードのコマンドを実行します。`A;`を実行して、行の末尾にテキスト";"を追加するように指示できます。

## 数字をインクリメントする

Vimには、数字を減算および加算するための`Ctrl-X`および`Ctrl-A`コマンドがあります。ビジュアルモードで使用すると、複数行にわたって数字をインクリメントできます。

次のHTML要素があるとします：

```shell
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
```

同じ名前の複数のIDを持つのは悪い習慣なので、ユニークにするためにインクリメントしましょう：
- カーソルを2行目の"1"に移動します。
- ブロック単位のビジュアルモードを開始し、3行下に移動します（`Ctrl-V 3j`）。これにより、残りの"1"が強調表示されます。これで、すべての"1"が強調表示されるはずです（最初の行を除く）。
- `g Ctrl-A`を実行します。

次の結果が得られるはずです：

```shell
<div id="app-1"></div>
<div id="app-2"></div>
<div id="app-3"></div>
<div id="app-4"></div>
<div id="app-5"></div>
```

`g Ctrl-A`は複数行の数字をインクリメントします。`Ctrl-X/Ctrl-A`は、数字形式オプションで文字もインクリメントできます：

```shell
set nrformats+=alpha
```

`nrformats`オプションは、Vimにとって`Ctrl-A`および`Ctrl-X`でインクリメントおよびデクリメントされる「数字」と見なされる基数を指示します。`alpha`を追加すると、アルファベットの文字も数字と見なされます。次のHTML要素があるとします：

```shell
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
```

2番目の"app-a"にカーソルを置き、上記と同じ手法（`Ctrl-V 3j`、次に`g Ctrl-A`）を使用してIDをインクリメントします。

```shell
<div id="app-a"></div>
<div id="app-b"></div>
<div id="app-c"></div>
<div id="app-d"></div>
<div id="app-e"></div>
```

## 最後のビジュアルモードエリアを選択する

この章の初めに、`gv`が最後のビジュアルモードのハイライトを迅速に強調表示できることを述べました。前のビジュアルモードの開始位置と終了位置に移動するための2つの特別なマークもあります：

```shell
`<    前のビジュアルモードのハイライトの最初の位置に移動
`>    前のビジュアルモードのハイライトの最後の位置に移動
```

以前に、強調表示されたテキストに対してコマンドラインコマンドを選択的に実行できることも述べました。たとえば、`:s/const/let/g`のように。これを実行すると、次のようになります：

```shell
:`<,`>s/const/let/g
```

実際には、*範囲*の`s/const/let/g`コマンドを実行していました（2つのマークがアドレスとして使用されています）。興味深いですね！

これらのマークは、いつでも編集できます。強調表示されたテキストの開始からファイルの終わりまで置き換えたい場合は、コマンドを次のように変更します：

```shell
:`<,$s/const/let/g
```

## 挿入モードからビジュアルモードに入る

挿入モードからビジュアルモードに入ることもできます。挿入モードにいるときに文字単位のビジュアルモードに移動するには：

```shell
Ctrl-O v
```

挿入モードで`Ctrl-O`を実行すると、通常モードのコマンドを実行できることを思い出してください。この通常モードコマンド待機モードの間に、`v`を実行して文字単位のビジュアルモードに入ります。画面の左下には`--(insert) VISUAL--`と表示されます。このトリックは、任意のビジュアルモードオペレーター（`v`、`V`、`Ctrl-V`）で機能します。

## セレクトモード

Vimには、ビジュアルモードに似たセレクトモードがあります。ビジュアルモードと同様に、3つの異なるモードがあります：

```shell
gh         文字単位のセレクトモード
gH         行単位のセレクトモード
gCtrl-h    ブロック単位のセレクトモード
```

セレクトモードは、通常のエディタのテキスト強調表示の動作をVimのビジュアルモードよりも近く模倣します。

通常のエディタでは、テキストブロックを強調表示した後、文字を入力すると、たとえば文字"y"を入力すると、強調表示されたテキストが削除され、文字"y"が挿入されます。行単位のセレクトモード（`gH`）で行を強調表示し、"y"を入力すると、強調表示されたテキストが削除され、文字"y"が挿入されます。

このセレクトモードとビジュアルモードを対比させてみましょう：行単位のビジュアルモード（`V`）でテキストの行を強調表示し、"y"を入力すると、強調表示されたテキストは削除されず、文字"y"に置き換えられるのではなく、ヤンクされます。セレクトモードでは、強調表示されたテキストに対して通常モードのコマンドを実行することはできません。

私は個人的にセレクトモードを使用したことはありませんが、存在することを知っておくのは良いことです。

## ビジュアルモードを賢く学