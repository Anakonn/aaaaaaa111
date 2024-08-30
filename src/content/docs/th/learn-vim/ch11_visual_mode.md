---
description: เอกสารนี้สอนการใช้โหมดวิชวลใน Vim เพื่อจัดการข้อความอย่างมีประสิทธิภาพ
  รวมถึงโหมดวิชวลสามประเภทที่แตกต่างกัน
title: Ch11. Visual Mode
---

การเน้นและปรับเปลี่ยนข้อความในเนื้อหาเป็นฟีเจอร์ทั่วไปในโปรแกรมแก้ไขข้อความและโปรเซสเซอร์คำหลายตัว Vim สามารถทำสิ่งนี้ได้โดยใช้โหมดวิชวล ในบทนี้ คุณจะได้เรียนรู้วิธีใช้โหมดวิชวลเพื่อจัดการข้อความอย่างมีประสิทธิภาพ

## ประเภทของโหมดวิชวลสามประเภท

Vim มีโหมดวิชวลที่แตกต่างกันสามประเภท ได้แก่:

```shell
v         โหมดวิชวลแบบอักขระ
V         โหมดวิชวลแบบบรรทัด
Ctrl-V    โหมดวิชวลแบบบล็อก
```

หากคุณมีข้อความ:

```shell
one
two
three
```

โหมดวิชวลแบบอักขระทำงานกับอักขระแต่ละตัว กด `v` ที่อักขระแรก จากนั้นเลื่อนลงไปที่บรรทัดถัดไปด้วย `j` มันจะเน้นข้อความทั้งหมดจาก "one" จนถึงตำแหน่งของเคอร์เซอร์ของคุณ หากคุณกด `gU` Vim จะทำให้ตัวอักษรที่เน้นเป็นตัวพิมพ์ใหญ่

โหมดวิชวลแบบบรรทัดทำงานกับบรรทัด กด `V` และดูว่า Vim เลือกทั้งบรรทัดที่เคอร์เซอร์ของคุณอยู่ เช่นเดียวกับโหมดวิชวลแบบอักขระ หากคุณรัน `gU` Vim จะทำให้ตัวอักษรที่เน้นเป็นตัวพิมพ์ใหญ่

โหมดวิชวลแบบบล็อกทำงานกับแถวและคอลัมน์ มันให้คุณมีอิสระในการเคลื่อนไหวมากกว่าโหมดทั้งสองแบบ หากคุณกด `Ctrl-V` Vim จะเน้นอักขระใต้เคอร์เซอร์เหมือนกับโหมดวิชวลแบบอักขระ ยกเว้นว่าแทนที่จะเน้นแต่ละอักขระจนถึงจุดสิ้นสุดของบรรทัดก่อนที่จะเลื่อนไปยังบรรทัดถัดไป มันจะไปยังบรรทัดถัดไปโดยมีการเน้นน้อยที่สุด ลองเคลื่อนไหวด้วย `h/j/k/l` และดูว่าเคอร์เซอร์เคลื่อนที่อย่างไร

ที่มุมล่างซ้ายของหน้าต่าง Vim ของคุณ คุณจะเห็นว่า `-- VISUAL --`, `-- VISUAL LINE --`, หรือ `-- VISUAL BLOCK --` แสดงขึ้นเพื่อระบุว่าอยู่ในโหมดวิชวลประเภทใด

ในขณะที่คุณอยู่ในโหมดวิชวล คุณสามารถสลับไปยังโหมดวิชวลอื่นได้โดยการกด `v`, `V`, หรือ `Ctrl-V` ตัวอย่างเช่น หากคุณอยู่ในโหมดวิชวลแบบบรรทัดและต้องการสลับไปยังโหมดวิชวลแบบบล็อก ให้รัน `Ctrl-V` ลองดู!

มีสามวิธีในการออกจากโหมดวิชวล: `<Esc>`, `Ctrl-C`, และกดปุ่มเดียวกันกับโหมดวิชวลปัจจุบันของคุณ สิ่งที่หมายถึงคือหากคุณอยู่ในโหมดวิชวลแบบบรรทัด (`V`) คุณสามารถออกจากมันได้โดยการกด `V` อีกครั้ง หากคุณอยู่ในโหมดวิชวลแบบอักขระ คุณสามารถออกจากมันได้โดยการกด `v`

จริงๆ แล้วมีอีกวิธีหนึ่งในการเข้าสู่โหมดวิชวล:

```shell
gv    กลับไปที่โหมดวิชวลก่อนหน้า
```

มันจะเริ่มโหมดวิชวลเดียวกันในบล็อกข้อความที่เน้นเหมือนที่คุณทำครั้งที่แล้ว

## การนำทางในโหมดวิชวล

ในขณะที่อยู่ในโหมดวิชวล คุณสามารถขยายบล็อกข้อความที่เน้นด้วยการเคลื่อนไหวของ Vim

มาลองใช้ข้อความเดียวกันที่คุณใช้ก่อนหน้านี้:

```shell
one
two
three
```

ครั้งนี้ให้เริ่มจากบรรทัด "two" กด `v` เพื่อไปยังโหมดวิชวลแบบอักขระ (ที่นี่วงเล็บสี่เหลี่ยม `[]` แทนการเน้นอักขระ):

```shell
one
[t]wo
three
```

กด `j` และ Vim จะเน้นข้อความทั้งหมดจากบรรทัด "two" ลงไปยังอักขระแรกของบรรทัด "three"

```shell
one
[two
t]hree
```

สมมติจากตำแหน่งนี้ คุณต้องการเพิ่มบรรทัด "one" ด้วย หากคุณกด `k` คุณจะผิดหวังเพราะการเน้นจะเคลื่อนออกจากบรรทัด "three"

```shell
one
[t]wo
three
```

มีวิธีใดบ้างที่จะขยายการเลือกวิชวลได้อย่างอิสระเพื่อเคลื่อนไหวในทิศทางที่คุณต้องการ? แน่นอน มาย้อนกลับไปเล็กน้อยที่คุณมีบรรทัด "two" และ "three" ที่เน้นอยู่

```shell
one
[two
t]hree    <-- เคอร์เซอร์
```

การเน้นวิชวลจะติดตามการเคลื่อนไหวของเคอร์เซอร์ หากคุณต้องการขยายขึ้นไปยังบรรทัด "one" คุณต้องเลื่อนเคอร์เซอร์ขึ้นไปที่บรรทัด "two" ตอนนี้เคอร์เซอร์อยู่ที่บรรทัด "three" คุณสามารถสลับตำแหน่งเคอร์เซอร์ด้วย `o` หรือ `O`

```shell
one
[two     <-- เคอร์เซอร์
t]hree
```

ตอนนี้เมื่อคุณกด `k` มันจะไม่ลดการเลือก แต่จะขยายขึ้นไป

```shell
[one
two
t]hree
```

ด้วย `o` หรือ `O` ในโหมดวิชวล เคอร์เซอร์จะกระโดดจากจุดเริ่มต้นไปยังจุดสิ้นสุดของบล็อกที่เน้น ทำให้คุณสามารถขยายพื้นที่ที่เน้นได้

## ไวยากรณ์ในโหมดวิชวล

โหมดวิชวลแชร์การดำเนินการหลายอย่างกับโหมดปกติ

ตัวอย่างเช่น หากคุณมีข้อความต่อไปนี้และต้องการลบบรรทัดแรกสองบรรทัดจากโหมดวิชวล:

```shell
one
two
three
```

เน้นบรรทัด "one" และ "two" ด้วยโหมดวิชวลแบบบรรทัด (`V`):

```shell
[one
two]
three
```

การกด `d` จะลบการเลือก คล้ายกับโหมดปกติ สังเกตกฎไวยากรณ์จากโหมดปกติ คำกริยา + คำนาม จะไม่ใช้ได้ผล คำกริยาเดียวกันยังคงอยู่ (`d`) แต่ไม่มีคำนามในโหมดวิชวล กฎไวยากรณ์ในโหมดวิชวลคือ คำนาม + คำกริยา โดยที่คำนามคือข้อความที่เน้น เลือกบล็อกข้อความก่อน จากนั้นคำสั่งจะตามมา

ในโหมดปกติ มีคำสั่งบางอย่างที่ไม่ต้องการการเคลื่อนไหว เช่น `x` เพื่อลบอักขระเดียวใต้เคอร์เซอร์ และ `r` เพื่อแทนอักขระใต้เคอร์เซอร์ (`rx` แทนอักขระใต้เคอร์เซอร์ด้วย "x") ในโหมดวิชวล คำสั่งเหล่านี้จะถูกนำไปใช้กับข้อความที่เน้นทั้งหมดแทนที่จะเป็นอักขระเดียว กลับไปที่ข้อความที่เน้น:

```shell
[one
two]
three
```

การรัน `x` จะลบข้อความที่เน้นทั้งหมด

คุณสามารถใช้พฤติกรรมนี้เพื่อสร้างหัวข้อในข้อความ markdown ได้อย่างรวดเร็ว สมมติว่าคุณต้องการเปลี่ยนข้อความต่อไปนี้ให้เป็นหัวข้อระดับหนึ่ง ("==="):

```shell
Chapter One
```

ก่อนอื่นให้คัดลอกข้อความด้วย `yy` จากนั้นวางด้วย `p`:

```shell
Chapter One
Chapter One
```

ตอนนี้ไปที่บรรทัดที่สองและเลือกด้วยโหมดวิชวลแบบบรรทัด:

```shell
Chapter One
[Chapter One]
```

หัวข้อระดับหนึ่งคือชุดของ "=" ใต้ข้อความ รัน `r=`, วอล่า! นี่ช่วยให้คุณไม่ต้องพิมพ์ "=" ด้วยมือ

```shell
Chapter One
===========
```

เพื่อเรียนรู้เพิ่มเติมเกี่ยวกับตัวดำเนินการในโหมดวิชวล ให้ตรวจสอบ `:h visual-operators`

## โหมดวิชวลและคำสั่งในบรรทัดคำสั่ง

คุณสามารถใช้คำสั่งในบรรทัดคำสั่งอย่างเลือกสรรบนบล็อกข้อความที่เน้น หากคุณมีคำสั่งเหล่านี้และต้องการแทนที่ "const" ด้วย "let" เฉพาะในสองบรรทัดแรก:

```shell
const one = "one";
const two = "two";
const three = "three";
```

เน้นสองบรรทัดแรกด้วย *โหมดวิชวลใดๆ* และรันคำสั่งแทนที่ `:s/const/let/g`:

```shell
let one = "one";
let two = "two";
const three = "three";
```

สังเกตว่าฉันบอกว่าคุณสามารถทำสิ่งนี้ด้วย *โหมดวิชวลใดๆ* คุณไม่จำเป็นต้องเน้นทั้งบรรทัดเพื่อรันคำสั่งในบรรทัดนั้น ตราบใดที่คุณเลือกอย่างน้อยหนึ่งอักขระในแต่ละบรรทัด คำสั่งจะถูกนำไปใช้

## การเพิ่มข้อความในหลายบรรทัด

คุณสามารถเพิ่มข้อความในหลายบรรทัดใน Vim โดยใช้โหมดวิชวลแบบบล็อก หากคุณต้องการเพิ่มเซมิโคลอนที่ท้ายแต่ละบรรทัด:

```shell
const one = "one"
const two = "two"
const three = "three"
```

เมื่อเคอร์เซอร์ของคุณอยู่ที่บรรทัดแรก:
- รันโหมดวิชวลแบบบล็อกและเลื่อนลงสองบรรทัด (`Ctrl-V jj`).
- เน้นไปที่จุดสิ้นสุดของบรรทัด (`$`).
- เพิ่ม (`A`) แล้วพิมพ์ ";".
- ออกจากโหมดวิชวล (`<Esc>`).

คุณควรเห็นเซมิโคลอนที่เพิ่มเข้ามา ";" ในแต่ละบรรทัดแล้ว เจ๋งมาก! มีสองวิธีในการเข้าสู่โหมดแทรกจากโหมดวิชวลแบบบล็อก: `A` เพื่อเข้าสู่ข้อความหลังเคอร์เซอร์ หรือ `I` เพื่อเข้าสู่ข้อความก่อนเคอร์เซอร์ อย่าสับสนกับ `A` (เพิ่มข้อความที่ท้ายบรรทัด) และ `I` (แทรกข้อความก่อนบรรทัดแรกที่ไม่ว่าง) จากโหมดปกติ

อีกทางเลือกหนึ่ง คุณยังสามารถใช้คำสั่ง `:normal` เพื่อเพิ่มข้อความในหลายบรรทัด:
- เน้นทั้ง 3 บรรทัด (`vjj`).
- พิมพ์ `:normal! A;`.

จำไว้ว่าคำสั่ง `:normal` จะดำเนินการคำสั่งในโหมดปกติ คุณสามารถสั่งให้มันรัน `A;` เพื่อเพิ่มข้อความ ";" ที่ท้ายบรรทัด

## การเพิ่มหมายเลข

Vim มีคำสั่ง `Ctrl-X` และ `Ctrl-A` เพื่อทำให้หมายเลขลดลงและเพิ่มขึ้น เมื่อใช้กับโหมดวิชวล คุณสามารถเพิ่มหมายเลขในหลายบรรทัด

หากคุณมีองค์ประกอบ HTML เหล่านี้:

```shell
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
<div id="app-1"></div>
```

มันเป็นการปฏิบัติที่ไม่ดีที่จะมีหลาย id ที่มีชื่อเดียวกัน ดังนั้นให้เราทำให้มันเพิ่มขึ้นเพื่อทำให้มันไม่ซ้ำกัน:
- ย้ายเคอร์เซอร์ของคุณไปที่ "1" ในบรรทัดที่สอง
- เริ่มโหมดวิชวลแบบบล็อกและเลื่อนลง 3 บรรทัด (`Ctrl-V 3j`). นี่จะเน้น "1" ที่เหลือ ตอนนี้ "1" ทั้งหมดควรจะถูกเน้น (ยกเว้นบรรทัดแรก)
- รัน `g Ctrl-A`.

คุณควรเห็นผลลัพธ์นี้:

```shell
<div id="app-1"></div>
<div id="app-2"></div>
<div id="app-3"></div>
<div id="app-4"></div>
<div id="app-5"></div>
```

`g Ctrl-A` จะเพิ่มหมายเลขในหลายบรรทัด `Ctrl-X/Ctrl-A` สามารถเพิ่มตัวอักษรได้เช่นกัน โดยมีตัวเลือกรูปแบบหมายเลข:

```shell
set nrformats+=alpha
```

ตัวเลือก `nrformats` จะสั่งให้ Vim พิจารณาว่าฐานใดบ้างที่ถือว่าเป็น "หมายเลข" สำหรับ `Ctrl-A` และ `Ctrl-X` เพื่อเพิ่มและลดลง โดยการเพิ่ม `alpha` ตัวอักษรตามตัวอักษรจะถือว่าเป็นหมายเลข หากคุณมีองค์ประกอบ HTML ต่อไปนี้:

```shell
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
<div id="app-a"></div>
```

วางเคอร์เซอร์ของคุณบน "app-a" ตัวที่สอง ใช้เทคนิคเดียวกันกับด้านบน (`Ctrl-V 3j` แล้ว `g Ctrl-A`) เพื่อเพิ่ม id

```shell
<div id="app-a"></div>
<div id="app-b"></div>
<div id="app-c"></div>
<div id="app-d"></div>
<div id="app-e"></div>
```

## การเลือกพื้นที่โหมดวิชวลล่าสุด

ก่อนหน้านี้ในบทนี้ ฉันได้กล่าวถึงว่า `gv` สามารถเน้นพื้นที่โหมดวิชวลล่าสุดได้อย่างรวดเร็ว คุณยังสามารถไปยังตำแหน่งเริ่มต้นและสิ้นสุดของโหมดวิชวลล่าสุดด้วยเครื่องหมายพิเศษสองตัวนี้:

```shell
`<    ไปยังตำแหน่งแรกของการเน้นโหมดวิชวลก่อนหน้า
`>    ไปยังตำแหน่งสุดท้ายของการเน้นโหมดวิชวลก่อนหน้า
```

ก่อนหน้านี้ฉันยังได้กล่าวถึงว่าคุณสามารถดำเนินการคำสั่งในบรรทัดคำสั่งอย่างเลือกสรรบนข้อความที่เน้น เช่น `:s/const/let/g` เมื่อคุณทำเช่นนั้น คุณจะเห็นสิ่งนี้ด้านล่าง:

```shell
:`<,`>s/const/let/g
```

คุณกำลังดำเนินการคำสั่ง `s/const/let/g` แบบ *มีช่วง* (โดยมีเครื่องหมายทั้งสองเป็นที่อยู่) น่าสนใจ!

คุณสามารถแก้ไขเครื่องหมายเหล่านี้ได้ทุกเมื่อที่คุณต้องการ หากคุณต้องการแทนที่จากจุดเริ่มต้นของข้อความที่เน้นไปจนถึงจุดสิ้นสุดของไฟล์ คุณเพียงแค่เปลี่ยนคำสั่งเป็น:

```shell
:`<,$s/const/let/g
```

## การเข้าสู่โหมดวิชวลจากโหมดแทรก

คุณยังสามารถเข้าสู่โหมดวิชวลจากโหมดแทรก เพื่อไปยังโหมดวิชวลแบบอักขระในขณะที่คุณอยู่ในโหมดแทรก:

```shell
Ctrl-O v
```

จำไว้ว่าการรัน `Ctrl-O` ขณะอยู่ในโหมดแทรกจะทำให้คุณสามารถดำเนินการคำสั่งในโหมดปกติได้ ในขณะที่อยู่ในโหมดรอคำสั่งในโหมดปกตินี้ ให้รัน `v` เพื่อเข้าสู่โหมดวิชวลแบบอักขระ สังเกตว่าที่มุมล่างซ้ายของหน้าจอ จะเขียนว่า `--(insert) VISUAL--` เทคนิคนี้ใช้ได้กับตัวดำเนินการโหมดวิชวลใดๆ: `v`, `V`, และ `Ctrl-V`

## โหมดเลือก

Vim มีโหมดที่คล้ายกับโหมดวิชวลเรียกว่าโหมดเลือก เช่นเดียวกับโหมดวิชวล มันยังมีสามโหมดที่แตกต่างกัน:

```shell
gh         โหมดเลือกแบบอักขระ
gH         โหมดเลือกแบบบรรทัด
gCtrl-h    โหมดเลือกแบบบล็อก
```

โหมดเลือกจำลองพฤติกรรมการเน้นข้อความของโปรแกรมแก้ไขทั่วไปใกล้เคียงกว่าโหมดวิชวลของ Vim

ในโปรแกรมแก้ไขทั่วไป หลังจากที่คุณเน้นบล็อกข้อความและพิมพ์ตัวอักษร เช่น ตัวอักษร "y" มันจะลบข้อความที่เน้นและแทรกตัวอักษร "y" หากคุณเน้นบรรทัดด้วยโหมดเลือกแบบบรรทัด (`gH`) และพิมพ์ "y" มันจะลบข้อความที่เน้นและแทรกตัวอักษร "y"

เปรียบเทียบโหมดเลือกนี้กับโหมดวิชวล: หากคุณเน้นบรรทัดของข้อความด้วยโหมดวิชวลแบบบรรทัด (`V`) และพิมพ์ "y" ข้อความที่เน้นจะไม่ถูกลบและแทนที่ด้วยตัวอักษร "y" มันจะถูกคัดลอก คุณไม่สามารถดำเนินการคำสั่งในโหมดปกติกับข้อความที่เน้นในโหมดเลือก

ฉันส่วนตัวไม่เคยใช้โหมดเลือก แต่ก็ดีที่รู้ว่ามันมีอยู่

## เรียนรู้โหมดวิชวลอย่างช