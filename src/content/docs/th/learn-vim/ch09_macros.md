---
description: เรียนรู้การใช้มาโครใน Vim เพื่อทำงานซ้ำๆ อัตโนมัติ ช่วยให้การแก้ไขไฟล์ของคุณรวดเร็วและมีประสิทธิภาพมากขึ้น
title: Ch09. Macros
---

เมื่อคุณแก้ไขไฟล์ คุณอาจพบว่าตัวเองทำซ้ำการกระทำเดียวกันอยู่บ่อยๆ จะดีแค่ไหนถ้าคุณสามารถทำการกระทำเหล่านั้นเพียงครั้งเดียวและเล่นซ้ำเมื่อคุณต้องการ? ด้วยมาโครของ Vim คุณสามารถบันทึกการกระทำและเก็บไว้ในรีจิสเตอร์ของ Vim เพื่อให้สามารถเรียกใช้งานเมื่อคุณต้องการ

ในบทนี้ คุณจะได้เรียนรู้วิธีการใช้มาโครเพื่อทำให้การทำงานที่น่าเบื่อเป็นอัตโนมัติ (นอกจากนี้ยังดูเท่เมื่อคุณเห็นไฟล์ของคุณแก้ไขตัวเอง)

## มาโครพื้นฐาน

นี่คือไวยากรณ์พื้นฐานของมาโครใน Vim:

```shell
qa                     เริ่มบันทึกมาโครในรีจิสเตอร์ a
q (ขณะบันทึก)         หยุดบันทึกมาโคร
```

คุณสามารถเลือกตัวอักษรตัวพิมพ์เล็ก (a-z) ใดๆ เพื่อเก็บมาโคร นี่คือวิธีที่คุณสามารถเรียกใช้มาโคร:

```shell
@a    เรียกใช้มาโครจากรีจิสเตอร์ a
@@    เรียกใช้มาโครที่เพิ่งเรียกใช้ล่าสุด
```

สมมติว่าคุณมีข้อความนี้และคุณต้องการทำให้ตัวอักษรทั้งหมดในแต่ละบรรทัดเป็นตัวพิมพ์ใหญ่:

```shell
hello
vim
macros
are
awesome
```

เมื่อเคอร์เซอร์ของคุณอยู่ที่จุดเริ่มต้นของบรรทัด "hello" ให้รัน:

```shell
qa0gU$jq
```

การวิเคราะห์:
- `qa` เริ่มบันทึกมาโครในรีจิสเตอร์ a
- `0` ไปที่จุดเริ่มต้นของบรรทัด
- `gU$` ทำให้ข้อความจากตำแหน่งปัจจุบันของคุณจนถึงจุดสิ้นสุดของบรรทัดเป็นตัวพิมพ์ใหญ่
- `j` ลงไปหนึ่งบรรทัด
- `q` หยุดการบันทึก

เพื่อเล่นซ้ำ ให้รัน `@a` เช่นเดียวกับคำสั่ง Vim อื่นๆ คุณสามารถส่งอาร์กิวเมนต์นับไปยังมาโครได้ ตัวอย่างเช่น การรัน `3@a` จะเรียกใช้มาโครสามครั้ง

## การป้องกันความปลอดภัย

การเรียกใช้มาโครจะสิ้นสุดโดยอัตโนมัติเมื่อพบข้อผิดพลาด สมมติว่าคุณมีข้อความนี้:

```shell
a. chocolate donut
b. mochi donut
c. powdered sugar donut
d. plain donut
```

หากคุณต้องการทำให้คำแรกในแต่ละบรรทัดเป็นตัวพิมพ์ใหญ่ มาโครนี้ควรทำงาน:

```shell
qa0W~jq
```

นี่คือการวิเคราะห์ของคำสั่งข้างต้น:
- `qa` เริ่มบันทึกมาโครในรีจิสเตอร์ a
- `0` ไปที่จุดเริ่มต้นของบรรทัด
- `W` ไปที่คำถัดไป
- `~` เปลี่ยนเคสของตัวอักษรที่อยู่ใต้เคอร์เซอร์
- `j` ลงไปหนึ่งบรรทัด
- `q` หยุดการบันทึก

ฉันชอบที่จะนับมาโครของฉันมากกว่าที่จะนับน้อย ดังนั้นฉันมักจะเรียกใช้มันเก้าสิบเก้าครั้ง (`99@a`) ด้วยคำสั่งนี้ Vim จะไม่ทำงานนี้จริงๆ เก้าสิบเก้าครั้ง เมื่อ Vim ถึงบรรทัดสุดท้ายและรันการเคลื่อนไหว `j` มันจะไม่พบบรรทัดอีกต่อไปที่จะลงไป ทำให้เกิดข้อผิดพลาดและหยุดการเรียกใช้มาโคร

การที่การเรียกใช้มาโครหยุดเมื่อพบข้อผิดพลาดครั้งแรกเป็นฟีเจอร์ที่ดี มิฉะนั้น Vim จะทำการเรียกใช้มาโครนี้เก้าสิบเก้าครั้งแม้ว่ามันจะถึงจุดสิ้นสุดของบรรทัดแล้ว

## มาโครในบรรทัดคำสั่ง

การรัน `@a` ในโหมดปกติไม่ใช่วิธีเดียวที่คุณสามารถเรียกใช้มาโครใน Vim คุณยังสามารถรันคำสั่ง `:normal @a` ในบรรทัดคำสั่ง `:normal` อนุญาตให้ผู้ใช้เรียกใช้คำสั่งในโหมดปกติใดๆ ที่ส่งเป็นอาร์กิวเมนต์ ในกรณีข้างต้น มันเหมือนกับการรัน `@a` จากโหมดปกติ

คำสั่ง `:normal` ยอมรับช่วงเป็นอาร์กิวเมนต์ คุณสามารถใช้สิ่งนี้เพื่อเรียกใช้มาโครในช่วงที่เลือก หากคุณต้องการเรียกใช้มาโครของคุณระหว่างบรรทัดที่ 2 และ 3 คุณสามารถรัน `:2,3 normal @a`

## การเรียกใช้มาโครข้ามไฟล์หลายไฟล์

สมมติว่าคุณมีไฟล์ `.txt` หลายไฟล์ ซึ่งแต่ละไฟล์มีข้อความบางอย่าง งานของคุณคือทำให้คำแรกเป็นตัวพิมพ์ใหญ่เฉพาะในบรรทัดที่มีคำว่า "donut" สมมติว่าคุณมี `0W~j` ในรีจิสเตอร์ a (มาโครเดียวกันกับก่อนหน้านี้) คุณจะทำสิ่งนี้ได้อย่างรวดเร็วอย่างไร?

ไฟล์แรก:

```shell
## savory.txt
a. cheddar jalapeno donut
b. mac n cheese donut
c. fried dumpling
```

ไฟล์ที่สอง:

```shell
## sweet.txt
a. chocolate donut
b. chocolate pancake
c. powdered sugar donut
```

ไฟล์ที่สาม:

```shell
## plain.txt
a. wheat bread
b. plain donut
```

นี่คือวิธีที่คุณสามารถทำได้:
- `:args *.txt` เพื่อค้นหาไฟล์ `.txt` ทั้งหมดในไดเรกทอรีปัจจุบันของคุณ
- `:argdo g/donut/normal @a` เรียกใช้คำสั่งทั่วโลก `g/donut/normal @a` ในแต่ละไฟล์ภายใน `:args`
- `:argdo update` เรียกใช้คำสั่ง `update` เพื่อบันทึกแต่ละไฟล์ภายใน `:args` เมื่อบัฟเฟอร์มีการแก้ไข

หากคุณไม่คุ้นเคยกับคำสั่งทั่วโลก `:g/donut/normal @a` มันจะเรียกใช้คำสั่งที่คุณให้ (`normal @a`) ในบรรทัดที่ตรงกับรูปแบบ (`/donut/`) ฉันจะพูดถึงคำสั่งทั่วโลกในบทถัดไป

## มาโครแบบเรียกซ้ำ

คุณสามารถเรียกใช้มาโครซ้ำได้โดยการเรียกใช้รีจิสเตอร์มาโครเดียวกันขณะบันทึกมาโครนั้น สมมติว่าคุณมีรายการนี้อีกครั้งและคุณต้องการเปลี่ยนเคสของคำแรก:

```shell
a. chocolate donut
b. mochi donut
c. powdered sugar donut
d. plain donut
```

ครั้งนี้ให้ทำแบบเรียกซ้ำ รัน:

```shell
qaqqa0W~j@aq
```

นี่คือการวิเคราะห์ของขั้นตอน:
- `qaq` บันทึกมาโครว่าง a จำเป็นต้องเริ่มต้นด้วยรีจิสเตอร์ว่างเพราะเมื่อคุณเรียกใช้มาโครซ้ำ มันจะรันสิ่งที่อยู่ในรีจิสเตอร์นั้น
- `qa` เริ่มบันทึกในรีจิสเตอร์ a
- `0` ไปที่ตัวอักษรแรกในบรรทัดปัจจุบัน
- `W` ไปที่คำถัดไป
- `~` เปลี่ยนเคสของตัวอักษรที่อยู่ใต้เคอร์เซอร์
- `j` ลงไปหนึ่งบรรทัด
- `@a` เรียกใช้มาโคร a
- `q` หยุดการบันทึก

ตอนนี้คุณสามารถเพียงแค่รัน `@a` และดู Vim เรียกใช้มาโครซ้ำ

มาโครรู้ได้อย่างไรเมื่อจะหยุด? เมื่อมาโครอยู่ที่บรรทัดสุดท้าย มันพยายามที่จะรัน `j` เนื่องจากไม่มีบรรทัดอื่นให้ลงไป มันจึงหยุดการเรียกใช้มาโคร

## การเพิ่มมาโคร

หากคุณต้องการเพิ่มการกระทำไปยังมาโครที่มีอยู่ แทนที่จะสร้างมาโครใหม่จากศูนย์ คุณสามารถเพิ่มการกระทำไปยังมาโครที่มีอยู่ ในบทที่เกี่ยวกับรีจิสเตอร์ คุณได้เรียนรู้ว่าคุณสามารถเพิ่มรีจิสเตอร์ที่ตั้งชื่อได้โดยใช้สัญลักษณ์ตัวพิมพ์ใหญ่ของมัน กฎเดียวกันนี้ใช้ได้เช่นกัน เพื่อเพิ่มการกระทำไปยังมาโครในรีจิสเตอร์ a ให้ใช้รีจิสเตอร์ A

บันทึกมาโครในรีจิสเตอร์ a: `qa0W~q` (ลำดับนี้เปลี่ยนเคสของคำถัดไปในบรรทัด) หากคุณต้องการเพิ่มลำดับใหม่เพื่อเพิ่มจุดที่ท้ายบรรทัด ให้รัน:

```shell
qAA.<Esc>q
```

การวิเคราะห์:
- `qA` เริ่มบันทึกมาโครในรีจิสเตอร์ A
- `A.<Esc>` แทรกที่ท้ายบรรทัด (ที่นี่ `A` คือคำสั่งโหมดแทรก ไม่ควรสับสนกับมาโคร A) จุด จากนั้นออกจากโหมดแทรก
- `q` หยุดการบันทึกมาโคร

ตอนนี้เมื่อคุณเรียกใช้ `@a` มันไม่เพียงแต่เปลี่ยนเคสของคำถัดไป แต่ยังเพิ่มจุดที่ท้ายบรรทัดด้วย

## การแก้ไขมาโคร

จะเกิดอะไรขึ้นหากคุณต้องการเพิ่มการกระทำใหม่ในกลางของมาโคร?

สมมติว่าคุณมีมาโครที่เปลี่ยนเคสของคำแรกและเพิ่มจุดที่ท้ายบรรทัด `0W~A.<Esc>` ในรีจิสเตอร์ a สมมติว่าระหว่างการทำให้คำแรกเป็นตัวพิมพ์ใหญ่และการเพิ่มจุดที่ท้ายบรรทัด คุณต้องการเพิ่มคำว่า "deep fried" ก่อนคำว่า "donut" *(เพราะสิ่งเดียวที่ดีกว่าลูกชิ้นธรรมดาคือ ลูกชิ้นทอด)*

ฉันจะนำข้อความจากส่วนก่อนหน้านี้มาใช้:
```shell
a. chocolate donut
b. mochi donut
c. powdered sugar donut
d. plain donut
```

ก่อนอื่นให้เรียกใช้มาโครที่มีอยู่ (สมมติว่าคุณได้เก็บมาโครจากส่วนก่อนหน้านี้ในรีจิสเตอร์ a) ด้วย `:put a`:

```shell
0W~A.^[
```

นี่คือ `^[` คืออะไร? คุณไม่ได้ทำ `0W~A.<Esc>` หรือ? `<Esc>` หายไปไหน? `^[` คือการแทนรหัสภายในของ Vim สำหรับ `<Esc>` ด้วยคีย์พิเศษบางตัว Vim จะแสดงการแทนรหัสของคีย์เหล่านั้นในรูปแบบของรหัสภายใน คีย์ทั่วไปบางตัวที่มีการแทนรหัสภายใน ได้แก่ `<Esc>`, `<Backspace>`, และ `<Enter>` ยังมีคีย์พิเศษอื่นๆ แต่ไม่อยู่ในขอบเขตของบทนี้

กลับมาที่มาโคร หลังจากตัวดำเนินการเปลี่ยนเคส (`~`) ให้เราเพิ่มคำสั่งเพื่อไปที่ท้ายบรรทัด (`$`), กลับไปหนึ่งคำ (`b`), ไปที่โหมดแทรก (`i`), พิมพ์ "deep fried " (อย่าลืมเว้นวรรคหลัง "fried "), และออกจากโหมดแทรก (`<Esc>`)

นี่คือสิ่งที่คุณจะได้:

```shell
0W~$bideep fried <Esc>A.^[
```

มีปัญหาเล็กน้อย Vim ไม่เข้าใจ `<Esc>` คุณไม่สามารถพิมพ์ `<Esc>` ได้จริงๆ คุณจะต้องเขียนการแทนรหัสภายในสำหรับคีย์ `<Esc>` ขณะอยู่ในโหมดแทรก คุณกด `Ctrl-V` ตามด้วย `<Esc>` Vim จะแสดง `^[` `Ctrl-V` คือคำสั่งโหมดแทรกเพื่อแทรกตัวอักษรถัดไปที่ไม่ใช่ตัวเลข *ตามตัวอักษร* โค้ดมาโครของคุณควรมีลักษณะดังนี้:

```shell
0W~$bideep fried ^[A.^[
```

เพื่อเพิ่มคำสั่งที่แก้ไขลงในรีจิสเตอร์ a คุณสามารถทำได้ในลักษณะเดียวกับการเพิ่มรายการใหม่ลงในรีจิสเตอร์ที่ตั้งชื่อ ในจุดเริ่มต้นของบรรทัดให้รัน `"ay$` เพื่อเก็บข้อความที่คัดลอกในรีจิสเตอร์ a

ตอนนี้เมื่อคุณเรียกใช้ `@a` มาโครของคุณจะเปลี่ยนเคสของคำแรก เพิ่ม "deep fried " ก่อน "donut" และเพิ่ม "." ที่ท้ายบรรทัด อร่อย!

วิธีทางเลือกในการแก้ไขมาโครคือการใช้คำสั่งในบรรทัดคำสั่ง ทำ `:let @a="`, จากนั้นทำ `Ctrl-R a` ซึ่งจะวางเนื้อหาของรีจิสเตอร์ a ลงไปในนั้น สุดท้ายอย่าลืมปิดเครื่องหมายคำพูดคู่ (`"`). คุณอาจมีอะไรบางอย่างเช่น `:let @a="0W~$bideep fried ^[A.^["`.

## ความซ้ำซ้อนของมาโคร

คุณสามารถทำซ้ำมาโครจากรีจิสเตอร์หนึ่งไปยังอีกรีจิสเตอร์หนึ่งได้อย่างง่ายดาย ตัวอย่างเช่น เพื่อทำซ้ำมาโครในรีจิสเตอร์ a ไปยังรีจิสเตอร์ z คุณสามารถทำ `:let @z = @a` `@a` แทนเนื้อหาของรีจิสเตอร์ a ตอนนี้หากคุณรัน `@z` มันจะทำการกระทำเดียวกันกับ `@a`

ฉันพบว่าการสร้างความซ้ำซ้อนมีประโยชน์ในมาโครที่ใช้บ่อยที่สุด ในการทำงานของฉัน ฉันมักจะบันทึกมาโครในตัวอักษรภาษาอังกฤษเจ็ดตัวแรก (a-g) และมักจะเปลี่ยนพวกมันโดยไม่ต้องคิดมาก หากฉันย้ายมาโครที่มีประโยชน์ไปยังตัวอักษรที่อยู่ปลายสุดของอักษร ฉันสามารถเก็บรักษาไว้ได้โดยไม่ต้องกังวลว่าฉันอาจจะเปลี่ยนพวกมันโดยไม่ตั้งใจ

## มาโครแบบอนุกรมกับขนาน

Vim สามารถเรียกใช้มาโครในรูปแบบอนุกรมและขนาน สมมติว่าคุณมีข้อความนี้:

```shell
import { FUNC1 } from "library1";
import { FUNC2 } from "library2";
import { FUNC3 } from "library3";
import { FUNC4 } from "library4";
import { FUNC5 } from "library5";
```

หากคุณต้องการบันทึกมาโครเพื่อทำให้ "FUNC" ที่เป็นตัวพิมพ์ใหญ่ทั้งหมดเป็นตัวพิมพ์เล็ก มาโครนี้ควรทำงาน:

```shell
qa0f{gui{jq
```

การวิเคราะห์:
- `qa` เริ่มบันทึกในรีจิสเตอร์ a
- `0` ไปที่บรรทัดแรก
- `f{` ค้นหาตัวอย่างแรกของ "{"
- `gui{` ทำให้ตัวอักษรภายในวัตถุข้อความในวงเล็บ (`i{`) เป็นตัวพิมพ์เล็ก
- `j` ลงไปหนึ่งบรรทัด
- `q` หยุดการบันทึกมาโคร

ตอนนี้คุณสามารถรัน `99@a` เพื่อเรียกใช้มันในบรรทัดที่เหลือ อย่างไรก็ตาม ถ้าคุณมีนิพจน์นำเข้าภายในไฟล์ของคุณ:

```shell
import { FUNC1 } from "library1";
import { FUNC2 } from "library2";
import { FUNC3 } from "library3";
import foo from "bar";
import { FUNC4 } from "library4";
import { FUNC5 } from "library5";
```

การรัน `99@a` จะเรียกใช้มาโครเพียงสามครั้งเท่านั้น มันจะไม่เรียกใช้มาโครในสองบรรทัดสุดท้ายเพราะการเรียกใช้ล้มเหลวในการรัน `f{` ในบรรทัด "foo" นี่เป็นเรื่องปกติเมื่อเรียกใช้มาโครในรูปแบบอนุกรม คุณสามารถไปยังบรรทัดถัดไปที่มี "FUNC4" และเล่นซ้ำมาโครนั้นอีกครั้ง แต่ถ้าคุณต้องการทำทุกอย่างในครั้งเดียวล่ะ?

เรียกใช้มาโครในรูปแบบขนาน

จำได้จากส่วนก่อนหน้านี้ว่า มาโครสามารถเรียกใช้ได้โดยใช้คำสั่งในบรรทัดคำสั่ง `:normal` (เช่น `:3,5 normal @a` เรียกใช้มาโคร a ในบรรทัดที่ 3-5) หากคุณรัน `:1,$ normal @a` คุณจะเห็นว่ามาโครกำลังถูกเรียกใช้ในทุกบรรทัดยกเว้นบรรทัด "foo" มันใช้ได้ผล!

แม้ว่าภายใน Vim จะไม่ได้เรียกใช้มาโครในรูปแบบขนานจริงๆ แต่ภายนอกมันทำตัวเหมือนว่าเป็นเช่นนั้น Vim จะเรียกใช้ `@a` *อย่างอิสระ* ในแต่ละบรรทัดตั้งแต่บรรทัดแรกถึงบรรทัดสุดท้าย (`1,$`) เนื่อง
## เรียนรู้มาโครอย่างชาญฉลาด

หลายสิ่งที่คุณทำในการแก้ไขเป็นสิ่งที่ทำซ้ำ ๆ เพื่อให้เก่งขึ้นในการแก้ไข ให้ทำให้เป็นนิสัยในการตรวจจับการกระทำที่ทำซ้ำ ใช้มาโคร (หรือคำสั่งจุด) เพื่อที่คุณจะไม่ต้องทำการกระทำเดียวกันซ้ำสองเกือบทุกอย่างที่คุณสามารถทำใน Vim สามารถทำซ้ำได้ด้วยมาโคร

ในตอนแรก ฉันรู้สึกแปลกมากที่จะเขียนมาโคร แต่ไม่ต้องยอมแพ้ ด้วยการฝึกฝนเพียงพอ คุณจะทำให้เป็นนิสัยในการทำให้ทุกอย่างเป็นอัตโนมัติ

คุณอาจพบว่าการใช้คำช่วยจำจะช่วยให้คุณจำมาโครของคุณได้ หากคุณมีมาโครที่สร้างฟังก์ชัน ให้ใช้ "f register (`qf`) หากคุณมีมาโครสำหรับการดำเนินการทางตัวเลข "n register ควรทำงานได้ (`qn`) ตั้งชื่อมันด้วย *register ที่มีชื่อแรก* ที่เข้ามาในใจเมื่อคุณนึกถึงการดำเนินการนั้น ฉันยังพบว่า "q register เป็นมาโครที่ดีในการตั้งค่าเริ่มต้นเพราะ `qq` ต้องใช้พลังสมองน้อยกว่าในการคิดออก สุดท้าย ฉันยังชอบที่จะเพิ่มมาโครของฉันในลำดับตัวอักษร เช่น `qa` จากนั้น `qb` จากนั้น `qc` และต่อไป

ค้นหาวิธีที่เหมาะสมที่สุดสำหรับคุณ