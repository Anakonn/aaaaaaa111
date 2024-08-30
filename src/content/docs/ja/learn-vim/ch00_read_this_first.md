---
description: Vimの基本機能を短時間で学ぶためのガイド。初心者向けに重要なテクニックと豊富な例を紹介します。
title: Ch00. Read This First
---

## なぜこのガイドが書かれたのか

Vimを学ぶ場所はたくさんあります。`vimtutor`は素晴らしいスタート地点であり、`:help`マニュアルには必要なすべてのリファレンスが含まれています。

しかし、平均的なユーザーは`vimtutor`よりも多く、`:help`マニュアルよりも少ないものが必要です。このガイドは、Vimの最も便利な部分を最短時間で学ぶための重要な機能のみを強調することで、そのギャップを埋めようとしています。

Vimの機能の100%を必要とすることはほとんどありません。おそらく、強力なVimmerになるためには、そのうちの20%を知っていれば十分です。このガイドでは、最も役立つVimの機能を示します。

これは意見が反映されたガイドです。私がVimを使用する際によく使うテクニックをカバーしています。章は、初心者がVimを学ぶために最も論理的だと思う順序で構成されています。

このガイドは例が豊富です。新しいスキルを学ぶ際には、例が不可欠であり、多くの例があればこれらの概念をより効果的に定着させることができます。

中には、なぜVimscriptを学ぶ必要があるのか疑問に思う方もいるかもしれません。私がVimを使い始めた最初の年は、Vimの使い方を知っているだけで満足していました。時間が経つにつれて、特定の編集ニーズのためにカスタムコマンドを書くためにVimscriptがますます必要になりました。Vimを習得するにつれて、早かれ遅かれVimscriptを学ぶ必要があります。だったら、早く学んでしまいましょう。Vimscriptは小さな言語です。このガイドの4章だけで基本を学ぶことができます。

Vimを知らなくても遠くまで行くことができますが、Vimscriptを知っていればさらに優れた成果を上げることができます。

このガイドは初心者と上級者の両方のVimmerのために書かれています。広く簡単な概念から始まり、特定の高度な概念で終わります。すでに上級ユーザーであれば、このガイドを最初から最後まで読むことをお勧めします。新しいことを学ぶことができるからです！

## 他のテキストエディタからVimへの移行方法

Vimを学ぶことは満足のいく経験ですが、難しいものです。Vimを学ぶための主なアプローチは2つあります：

1. コールドターキー
2. 徐々に

コールドターキーとは、使用していたエディタ/IDEをすべてやめて、今からVimのみを使用することを意味します。この方法の欠点は、最初の1週間または2週間の間に深刻な生産性の損失があることです。フルタイムのプログラマーであれば、この方法は実行可能ではないかもしれません。だからこそ、ほとんどの人にとって、Vimへの移行の最良の方法は徐々に使用することだと思います。

Vimを徐々に使用するには、最初の2週間、1日1時間Vimをエディタとして使用し、残りの時間は他のエディタを使用します。多くの現代的なエディタにはVimプラグインが付属しています。私が最初に始めたとき、私はVSCodeの人気のVimプラグインを1日1時間使用していました。Vimプラグインを使用する時間を徐々に増やし、最終的には1日中使用するようになりました。これらのプラグインはVimの機能の一部しかエミュレートできないことに注意してください。Vimscript、コマンドライン（Ex）コマンド、外部コマンドの統合など、Vimの完全な力を体験するには、Vim自体を使用する必要があります。

私がVimを100%使用し始めるきっかけとなった2つの重要な瞬間がありました。それは、Vimが文法のような構造を持っていることを理解したとき（第4章参照）と、[fzf.vim](https://github.com/junegunn/fzf.vim)プラグイン（第3章参照）です。

最初の瞬間、Vimの文法のような構造を理解したときが、Vimユーザーが何を話しているのかをやっと理解した決定的な瞬間でした。数百のユニークなコマンドを学ぶ必要はありませんでした。少数のコマンドを学ぶだけで、非常に直感的な方法で多くのことを連結して行うことができました。

2つ目は、ファジーファイル検索を迅速に実行できる能力が、私が最も使用したIDE機能でした。Vimでそれを行う方法を学んだとき、私は大きな速度向上を得て、それ以来振り返ることはありませんでした。

誰もが異なる方法でプログラムをします。内省すると、あなたが好きなエディタ/IDEから常に使用している1つまたは2つの機能があることに気づくでしょう。おそらくそれはファジー検索、定義へのジャンプ、またはクイックコンパイルだったかもしれません。それらが何であれ、迅速に特定し、Vimでそれらを実装する方法を学びましょう（おそらくVimでもできるでしょう）。あなたの編集速度は大幅に向上します。

元の速度の50%で編集できるようになったら、フルタイムでVimを使用する時です。

## このガイドの読み方

これは実用的なガイドです。Vimが上手になるためには、頭の知識ではなく筋肉の記憶を発展させる必要があります。

自転車の乗り方を学ぶために、自転車の乗り方に関するガイドを読むだけではありません。実際に自転車に乗る必要があります。

このガイドで言及されているすべてのコマンドを入力する必要があります。それだけでなく、何度も繰り返し、さまざまな組み合わせを試す必要があります。あなたが学んだばかりのコマンドには他にどんな機能があるのかを調べてください。`:help`コマンドと検索エンジンはあなたの親友です。あなたの目標は、コマンドについてすべてを知ることではなく、そのコマンドを自然に直感的に実行できるようになることです。

このガイドを線形にしようとする一方で、いくつかの概念は順序を無視して提示する必要があります。たとえば、第1章では置換コマンド（`:s`）に言及していますが、第12章までカバーされません。これを解決するために、まだカバーされていない新しい概念が早期に言及された場合、詳細な説明なしに簡単な使い方ガイドを提供しますので、ご了承ください :).

## さらなるヘルプ

ヘルプマニュアルを使用するための追加のヒントがあります。たとえば、挿入モードで`Ctrl-P`が何をするのかもっと学びたいとします。単に`:h CTRL-P`を検索すると、通常モードの`Ctrl-P`に誘導されます。これは、あなたが探している`Ctrl-P`のヘルプではありません。この場合は、代わりに`:h i_CTRL-P`を検索してください。付加された`i_`は挿入モードを表します。どのモードに属しているかに注意してください。

## 構文

コマンドやコード関連のフレーズのほとんどはコードケース（`like this`）で表記されています。

文字列は一対のダブルクォーテーションで囲まれています（"like this"）。

Vimコマンドは省略できます。たとえば、`:join`は`:j`と省略できます。このガイド全体で、短縮形と長い形の説明を混ぜて使用します。このガイドであまり頻繁に使用されないコマンドには長い形を使用し、頻繁に使用されるコマンドには短縮形を使用します。不一致についてお詫び申し上げます。一般的に、新しいコマンドを見つけたら、常に`:help`でその省略形を確認してください。

## Vimrc

ガイドのさまざまなポイントで、vimrcオプションについて言及します。Vimが初めての方にとって、vimrcは設定ファイルのようなものです。

vimrcは第21章までカバーされません。明確にするために、ここで簡単に設定方法を示します。

たとえば、数値オプションを設定する必要があるとします（`set number`）。まだvimrcがない場合は、作成してください。通常、ホームディレクトリに配置され、名前は`.vimrc`です。OSによって場所が異なる場合があります。macOSでは、`~/.vimrc`にあります。自分のvimrcをどこに置くべきかを確認するには、`:h vimrc`を参照してください。

その中に`set number`を追加します。保存して（`:w`）、次にソースします（`:source %`）。これで左側に行番号が表示されるようになります。

また、永続的な設定変更を行いたくない場合は、常にインラインで`set`コマンドを実行することができます。`set number`を実行してください。このアプローチの欠点は、この設定が一時的であることです。Vimを閉じると、オプションは消えてしまいます。

私たちはVimを学んでいるのであってViを学んでいるわけではないので、必ず持っておくべき設定は`nocompatible`オプションです。vimrcに`set nocompatible`を追加してください。`compatible`オプションで実行されているとき、多くのVim特有の機能が無効になります。

一般的に、パッセージがvimrcオプションに言及するたびに、そのオプションをvimrcに追加し、保存し、ソースします。

## 将来、エラー、質問

今後の更新を期待してください。エラーを見つけたり、質問があれば、気軽にお問い合わせください。

さらにいくつかの章を計画していますので、お楽しみに！

## もっとVimのトリックが知りたい

Vimについてもっと学ぶには、[＠learnvim](https://twitter.com/learnvim)をフォローしてください。

## 感謝の言葉

このガイドは、Vimを作成したBram Moleenar、旅の間ずっと忍耐強く支えてくれた妻、[learn-vimプロジェクトのすべての貢献者](https://github.com/iggredible/Learn-Vim/graphs/contributors)、Vimコミュニティ、そして多くの他の人々がいなければ実現できませんでした。

ありがとうございます。皆さんのおかげでテキスト編集が楽しくなりました :)