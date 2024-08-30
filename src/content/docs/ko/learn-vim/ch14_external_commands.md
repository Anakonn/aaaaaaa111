---
description: 이 문서는 Vim에서 외부 명령어를 사용하여 작업을 확장하는 방법과 Bang 명령어를 활용하는 방법을 설명합니다.
title: Ch14. External Commands
---

Unix 시스템 내부에는 하나의 작업을 잘 수행하는 많은 작은, 하이퍼 전문화된 명령어들이 있습니다. 이러한 명령어들을 연결하여 복잡한 문제를 해결할 수 있습니다. Vim 내부에서 이러한 명령어들을 사용할 수 있다면 얼마나 좋을까요?

확실히 그렇습니다. 이 장에서는 Vim을 확장하여 외부 명령어와 원활하게 작업하는 방법을 배웁니다.

## 뱅 명령어

Vim에는 세 가지 작업을 수행할 수 있는 뱅(`!`) 명령어가 있습니다:

1. 외부 명령어의 STDOUT을 현재 버퍼로 읽어옵니다.
2. 버퍼의 내용을 외부 명령어의 STDIN으로 씁니다.
3. Vim 내부에서 외부 명령어를 실행합니다.

각각을 살펴보겠습니다.

## Vim으로 명령어의 STDOUT 읽기

외부 명령어의 STDOUT을 현재 버퍼로 읽어오는 구문은 다음과 같습니다:

```shell
:r !cmd
```

`:r`은 Vim의 읽기 명령어입니다. `!` 없이 사용하면 파일의 내용을 가져오는 데 사용할 수 있습니다. 현재 디렉토리에 `file1.txt`라는 파일이 있는 경우 다음과 같이 실행하면:

```shell
:r file1.txt
```

Vim은 `file1.txt`의 내용을 현재 버퍼에 넣습니다.

`!`와 외부 명령어를 뒤에 붙여 `:r` 명령어를 실행하면 해당 명령어의 출력이 현재 버퍼에 삽입됩니다. `ls` 명령어의 결과를 얻으려면 다음과 같이 실행합니다:

```shell
:r !ls
```

다음과 같은 결과가 반환됩니다:

```shell
file1.txt
file2.txt
file3.txt
```

`curl` 명령어로 데이터를 읽을 수 있습니다:

```shell
:r !curl -s 'https://jsonplaceholder.typicode.com/todos/1'
```

`r` 명령어는 주소도 받을 수 있습니다:

```shell
:10r !cat file1.txt
```

이제 `cat file1.txt`를 실행한 STDOUT이 10번째 줄 다음에 삽입됩니다.

## 버퍼 내용을 외부 명령어로 쓰기

`:w` 명령어는 파일을 저장하는 것 외에도 현재 버퍼의 텍스트를 외부 명령어의 STDIN으로 전달하는 데 사용할 수 있습니다. 구문은 다음과 같습니다:

```shell
:w !cmd
```

다음과 같은 표현이 있다고 가정해 보겠습니다:

```shell
console.log("Hello Vim");
console.log("Vim is awesome");
```

컴퓨터에 [node](https://nodejs.org/en/)가 설치되어 있는지 확인한 후 다음과 같이 실행합니다:

```shell
:w !node
```

Vim은 `node`를 사용하여 자바스크립트 표현식을 실행하고 "Hello Vim"과 "Vim is awesome"을 출력합니다.

`:w` 명령어를 사용할 때, Vim은 현재 버퍼의 모든 텍스트를 사용합니다. 특정 주소를 `:w`에 전달하면:

```shell
:2w !node
```

Vim은 두 번째 줄의 텍스트만 `node` 인터프리터에 사용합니다.

`:w !node`와 `:w! node` 사이에는 미세하지만 중요한 차이가 있습니다. `:w !node`는 현재 버퍼의 텍스트를 외부 명령어 `node`에 "쓰기"입니다. `:w! node`는 파일을 강제로 저장하고 파일 이름을 "node"로 지정하는 것입니다.

## 외부 명령어 실행하기

Vim 내부에서 뱅 명령어를 사용하여 외부 명령어를 실행할 수 있습니다. 구문은 다음과 같습니다:

```shell
:!cmd
```

현재 디렉토리의 내용을 긴 형식으로 보려면 다음과 같이 실행합니다:

```shell
:!ls -ls
```

PID 3456에서 실행 중인 프로세스를 종료하려면 다음과 같이 실행합니다:

```shell
:!kill -9 3456
```

Vim을 떠나지 않고도 외부 명령어를 실행할 수 있어 작업에 집중할 수 있습니다.

## 텍스트 필터링

`!`에 범위를 주면 텍스트를 필터링하는 데 사용할 수 있습니다. 다음과 같은 텍스트가 있다고 가정해 보겠습니다:

```shell
hello vim
hello vim
```

현재 줄을 대문자로 바꾸려면 `tr` (변환) 명령어를 사용합니다. 다음과 같이 실행합니다:

```shell
:.!tr '[:lower:]' '[:upper:]'
```

결과는 다음과 같습니다:

```shell
HELLO VIM
hello vim
```

분해:
- `.!`는 현재 줄에 필터 명령어를 실행합니다.
- `tr '[:lower:]' '[:upper:]'`는 `tr` 명령어를 호출하여 모든 소문자를 대문자로 바꿉니다.

외부 명령어를 필터로 실행하려면 범위를 전달하는 것이 필수적입니다. 위 명령어를 `.` 없이 실행하면 (`:!tr '[:lower:]' '[:upper:]'`), 오류가 발생합니다.

두 줄에서 두 번째 열을 제거해야 한다고 가정해 보겠습니다. `awk` 명령어를 사용하여:

```shell
:%!awk "{print $1}"
```

결과는 다음과 같습니다:

```shell
hello
hello
```

분해:
- `:%!`는 모든 줄에 필터 명령어를 실행합니다 (`%`).
- `awk "{print $1}"`는 일치하는 첫 번째 열만 출력합니다.

터미널에서처럼 체인 연산자(`|`)를 사용하여 여러 명령어를 연결할 수 있습니다. 다음과 같은 맛있는 아침 메뉴가 있는 파일이 있다고 가정해 보겠습니다:

```shell
name price
chocolate pancake 10
buttermilk pancake 9
blueberry pancake 12
```

가격을 기준으로 정렬하고 고른 간격으로 메뉴만 표시하려면 다음과 같이 실행합니다:

```shell
:%!awk 'NR > 1' | sort -nk 3 | column -t
```

결과:
```shell
buttermilk pancake 9
chocolate pancake 10
blueberry pancake 12
```

분해:
- `:%!`는 모든 줄에 필터를 적용합니다 (`%`).
- `awk 'NR > 1'`는 두 번째 행부터 텍스트만 표시합니다.
- `|`는 다음 명령어를 연결합니다.
- `sort -nk 3`는 세 번째 열의 값을 기준으로 숫자적으로 정렬합니다 (`n`).
- `column -t`는 텍스트를 고른 간격으로 정리합니다.

## 일반 모드 명령어

Vim에는 일반 모드에서 필터 연산자(`!`)가 있습니다. 다음과 같은 인사말이 있다고 가정해 보겠습니다:

```shell
hello vim
hola vim
bonjour vim
salve vim
```

현재 줄과 그 아래 줄을 대문자로 바꾸려면 다음과 같이 실행합니다:
```shell
!jtr '[a-z]' '[A-Z]'
```

분해:
- `!j`는 현재 줄과 그 아래 줄을 대상으로 하는 일반 명령 필터 연산자(`!`)를 실행합니다. 일반 모드 연산자이므로 문법 규칙 `동사 + 명사`가 적용됩니다. `!`는 동사이고 `j`는 명사입니다.
- `tr '[a-z]' '[A-Z]'`는 소문자를 대문자로 바꿉니다.

필터 일반 명령은 최소한 한 줄 이상의 동작/텍스트 객체에서만 작동합니다. `!iwtr '[a-z]' '[A-Z]'` (내부 단어에서 `tr` 실행)를 실행하려고 하면, 전체 줄에 `tr` 명령이 적용되는 것을 알 수 있습니다.

## 외부 명령어를 스마트하게 배우기

Vim은 IDE가 아닙니다. 그것은 설계상 매우 확장 가능한 경량 모드 편집기입니다. 이러한 확장성 덕분에 시스템의 모든 외부 명령어에 쉽게 접근할 수 있습니다. 이러한 외부 명령어로 무장한 Vim은 IDE에 한 걸음 더 가까워집니다. 누군가는 Unix 시스템이 최초의 IDE라고 말했습니다.

뱅 명령어는 당신이 아는 외부 명령어의 수만큼 유용합니다. 외부 명령어에 대한 지식이 제한적이라도 걱정하지 마세요. 저도 아직 배울 것이 많습니다. 이를 지속적인 학습의 동기로 삼으세요. 텍스트를 수정해야 할 때마다 문제를 해결할 수 있는 외부 명령어가 있는지 확인하세요. 모든 것을 마스터하는 것에 대해 걱정하지 말고, 현재 작업을 완료하는 데 필요한 것만 배우세요.