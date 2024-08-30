---
description: 이 문서에서는 터미널에서 Vim을 시작하는 다양한 방법과 설치 방법에 대해 설명합니다. Vim 8.2를 기준으로 작성되었습니다.
title: Ch01. Starting Vim
---

이 장에서는 터미널에서 Vim을 시작하는 다양한 방법을 배울 것입니다. 이 가이드를 작성할 때 저는 Vim 8.2를 사용하고 있었습니다. Neovim이나 이전 버전의 Vim을 사용하는 경우 대부분 괜찮겠지만, 일부 명령은 사용할 수 없을 수도 있습니다.

## 설치

특정 기계에 Vim을 설치하는 방법에 대한 자세한 설명은 하지 않겠습니다. 좋은 소식은 대부분의 Unix 기반 컴퓨터에는 Vim이 설치되어 있어야 한다는 것입니다. 그렇지 않은 경우, 대부분의 배포판에는 Vim을 설치하는 방법에 대한 지침이 있을 것입니다.

Vim 설치 과정에 대한 더 많은 정보를 다운로드하려면 Vim의 공식 다운로드 웹사이트나 Vim의 공식 GitHub 저장소를 확인하세요:
- [Vim 웹사이트](https://www.vim.org/download.php)
- [Vim GitHub](https://github.com/vim/vim)

## Vim 명령

이제 Vim이 설치되었으니, 터미널에서 다음을 실행하세요:

```bash
vim
```

소개 화면이 표시됩니다. 여기서 새 파일 작업을 하게 됩니다. 대부분의 텍스트 편집기 및 IDE와 달리 Vim은 모달 편집기입니다. "hello"를 입력하려면 `i`로 삽입 모드로 전환해야 합니다. `ihello<Esc>`를 눌러 "hello"라는 텍스트를 삽입하세요.

## Vim 종료

Vim을 종료하는 방법에는 여러 가지가 있습니다. 가장 일반적인 방법은 다음을 입력하는 것입니다:

```shell
:quit
```

짧게 `:q`를 입력할 수도 있습니다. 이 명령은 명령줄 모드 명령입니다(또 다른 Vim 모드 중 하나). 일반 모드에서 `:`를 입력하면 커서가 화면 하단으로 이동하여 명령을 입력할 수 있습니다. 명령줄 모드에 대해서는 15장에서 배울 것입니다. 삽입 모드에 있는 경우 `:`를 입력하면 화면에 문자 ":"가 표시됩니다. 이 경우 일반 모드로 다시 전환해야 합니다. `<Esc>`를 입력하여 일반 모드로 전환하세요. 참고로, 명령줄 모드에서도 `<Esc>`를 눌러 일반 모드로 돌아갈 수 있습니다. 여러 Vim 모드에서 일반 모드로 "탈출"할 수 있다는 것을 알 수 있습니다.

## 파일 저장

변경 사항을 저장하려면 다음을 입력하세요:

```shell
:write
```

짧게 `:w`를 입력할 수도 있습니다. 새 파일인 경우 저장하기 전에 이름을 지정해야 합니다. `file.txt`라는 이름을 지정해 보겠습니다. 다음을 실행하세요:

```shell
:w file.txt
```

저장하고 종료하려면 `:w`와 `:q` 명령을 결합할 수 있습니다:

```shell
:wq
```

변경 사항을 저장하지 않고 종료하려면 `:q` 뒤에 `!`를 추가하여 강제로 종료하세요:

```shell
:q!
```

Vim을 종료하는 다른 방법도 있지만, 이것들이 일상적으로 사용할 방법입니다.

## 도움말

이 가이드 전반에 걸쳐 다양한 Vim 도움말 페이지를 참조할 것입니다. 도움말 페이지로 가려면 `:help {some-command}`(`:h`로 짧게) 입력하세요. `:h` 명령에 주제나 명령 이름을 인수로 전달할 수 있습니다. 예를 들어, Vim 종료 방법에 대해 배우려면 다음을 입력하세요:

```shell
:h write-quit
```

"write-quit"를 검색해야 한다는 것을 어떻게 알았나요? 사실 저는 몰랐습니다. 그냥 `:h`를 입력한 다음 "quit"를 입력하고 `<Tab>`를 눌렀습니다. Vim이 선택할 수 있는 관련 키워드를 표시했습니다. 무언가를 찾아봐야 할 때("Vim이 이렇게 할 수 있었으면 좋겠다...")는 `:h`를 입력하고 몇 가지 키워드를 시도한 다음 `<Tab>`을 눌러보세요.

## 파일 열기

터미널에서 Vim으로 파일(`hello1.txt`)을 열려면 다음을 실행하세요:

```bash
vim hello1.txt
```

한 번에 여러 파일을 열 수도 있습니다:

```bash
vim hello1.txt hello2.txt hello3.txt
```

Vim은 `hello1.txt`, `hello2.txt`, `hello3.txt`를 별도의 버퍼에서 엽니다. 다음 장에서 버퍼에 대해 배울 것입니다.

## 인수

다양한 플래그와 옵션을 사용하여 `vim` 터미널 명령을 전달할 수 있습니다.

현재 Vim 버전을 확인하려면 다음을 실행하세요:

```bash
vim --version
```

이 명령은 현재 Vim 버전과 사용 가능한 모든 기능을 `+` 또는 `-`로 표시합니다. 이 가이드의 일부 기능은 특정 기능이 필요합니다. 예를 들어, 나중 장에서 `:history` 명령으로 Vim의 명령줄 기록을 탐색할 것입니다. 이 명령이 작동하려면 Vim에 `+cmdline_history` 기능이 필요합니다. 방금 설치한 Vim이 필요한 모든 기능을 갖추었을 가능성이 높습니다. 특히 인기 있는 다운로드 소스에서 가져온 경우에는 더욱 그렇습니다.

터미널에서 수행하는 많은 작업은 Vim 내부에서도 수행할 수 있습니다. Vim 내부에서 버전을 보려면 다음을 실행하세요:

```shell
:version
```

`hello.txt` 파일을 열고 즉시 Vim 명령을 실행하려면 `vim` 명령에 `+{cmd}` 옵션을 전달할 수 있습니다.

Vim에서는 `:s` 명령(짧게 `:substitute`)를 사용하여 문자열을 대체할 수 있습니다. `hello.txt`를 열고 모든 "pancake"를 "bagel"로 대체하려면 다음을 실행하세요:

```bash
vim +%s/pancake/bagel/g hello.txt
```

이러한 Vim 명령은 쌓을 수 있습니다:

```bash
vim +%s/pancake/bagel/g +%s/bagel/egg/g +%s/egg/donut/g hello.txt
```

Vim은 "pancake"의 모든 인스턴스를 "bagel"로 대체한 다음, "bagel"을 "egg"로 대체하고, "egg"를 "donut"로 대체합니다(대체에 대해서는 나중 장에서 배울 것입니다).

`+` 구문 대신 Vim 명령 뒤에 `-c` 옵션을 전달할 수도 있습니다:

```bash
vim -c %s/pancake/bagel/g hello.txt
vim -c %s/pancake/bagel/g -c %s/bagel/egg/g -c %s/egg/donut/g hello.txt
```

## 여러 창 열기

`-o` 및 `-O` 옵션을 사용하여 수평 및 수직 분할 창에서 Vim을 실행할 수 있습니다.

두 개의 수평 창으로 Vim을 열려면 다음을 실행하세요:

```bash
vim -o2
```

5개의 수평 창으로 Vim을 열려면 다음을 실행하세요:

```bash
vim -o5
```

5개의 수평 창을 열고 첫 두 개를 `hello1.txt`와 `hello2.txt`로 채우려면 다음을 실행하세요:

```bash
vim -o5 hello1.txt hello2.txt
```

두 개의 수직 창, 5개의 수직 창, 2개의 파일로 5개의 수직 창을 열려면 다음을 실행하세요:

```bash
vim -O2
vim -O5
vim -O5 hello1.txt hello2.txt
```

## 일시 중단

편집 중에 Vim을 일시 중단해야 하는 경우 `Ctrl-z`를 누를 수 있습니다. `:stop` 또는 `:suspend` 명령을 실행할 수도 있습니다. 일시 중단된 Vim으로 돌아가려면 터미널에서 `fg`를 실행하세요.

## 스마트하게 Vim 시작하기

`vim` 명령은 다른 터미널 명령과 마찬가지로 다양한 옵션을 사용할 수 있습니다. 두 가지 옵션을 사용하여 Vim 명령을 매개변수로 전달할 수 있습니다: `+{cmd}` 및 `-c cmd`. 이 가이드 전반에 걸쳐 더 많은 명령을 배우면서 Vim을 시작할 때 적용할 수 있는지 확인하세요. 또한 터미널 명령이므로 `vim`을 다른 많은 터미널 명령과 결합할 수 있습니다. 예를 들어, `ls` 명령의 출력을 Vim에서 편집하도록 리디렉션할 수 있습니다:

```bash
ls -l | vim -
```

터미널에서 `vim` 명령에 대해 더 알아보려면 `man vim`을 확인하세요. Vim 편집기에 대해 더 알아보려면 이 가이드를 계속 읽고 `:help` 명령을 사용하세요.