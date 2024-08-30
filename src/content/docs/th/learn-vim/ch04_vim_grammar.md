---
description: บทนี้อธิบายโครงสร้างคำสั่ง Vim อย่างง่าย เพื่อให้คุณสามารถเข้าใจและใช้คำสั่งต่างๆ
  ได้อย่างมั่นใจและมีประสิทธิภาพ
title: Ch04. Vim Grammar
---

มันง่ายที่จะรู้สึกหวาดกลัวกับความซับซ้อนของคำสั่ง Vim หากคุณเห็นผู้ใช้ Vim ทำ `gUfV` หรือ `1GdG` คุณอาจไม่รู้ทันทีว่าคำสั่งเหล่านี้ทำอะไร ในบทนี้ ฉันจะอธิบายโครงสร้างทั่วไปของคำสั่ง Vim ให้เป็นกฎไวยากรณ์ที่ง่าย

นี่คือบทที่สำคัญที่สุดในคู่มือทั้งหมด เมื่อคุณเข้าใจโครงสร้างทางไวยากรณ์ที่อยู่เบื้องหลัง คุณจะสามารถ "พูด" กับ Vim ได้ โดยที่เมื่อฉันพูดถึง *ภาษา Vim* ในบทนี้ ฉันไม่ได้พูดถึงภาษา Vimscript (ภาษาการเขียนโปรแกรมในตัวของ Vim ซึ่งคุณจะได้เรียนรู้ในบทถัดไป)

## วิธีการเรียนรู้ภาษา

ฉันไม่ใช่เจ้าของภาษาอังกฤษ ฉันเรียนรู้ภาษาอังกฤษเมื่อฉันอายุ 13 ปีเมื่อฉันย้ายไปที่สหรัฐอเมริกา มีสามสิ่งที่คุณต้องทำเพื่อเรียนรู้การพูดภาษาใหม่:

1. เรียนรู้กฎไวยากรณ์
2. เพิ่มคำศัพท์
3. ฝึกฝน ฝึกฝน ฝึกฝน

เช่นเดียวกัน เพื่อที่จะพูดภาษา Vim คุณต้องเรียนรู้กฎไวยากรณ์ เพิ่มคำศัพท์ และฝึกฝนจนกว่าคุณจะสามารถรันคำสั่งได้โดยไม่ต้องคิด

## กฎไวยากรณ์

มีเพียงกฎไวยากรณ์เดียวในภาษา Vim:

```shell
verb + noun
```

แค่นั้นเอง!

นี่เหมือนกับการพูดประโยคภาษาอังกฤษเหล่านี้:

- *"กิน (verb) โดนัท (noun)"*
- *"เตะ (verb) บอล (noun)"*
- *"เรียนรู้ (verb) โปรแกรมแก้ไข Vim (noun)"*

ตอนนี้คุณต้องสร้างคำศัพท์ของคุณด้วยคำกริยาและคำนามพื้นฐานใน Vim

## คำนาม (การเคลื่อนไหว)

คำนามคือการเคลื่อนไหวใน Vim การเคลื่อนไหวใช้เพื่อเคลื่อนที่ไปรอบๆ ใน Vim ด้านล่างนี้คือรายการของการเคลื่อนไหวบางส่วนใน Vim:

```shell
h    ซ้าย
j    ลง
k    ขึ้น
l    ขวา
w    เคลื่อนที่ไปข้างหน้าถึงจุดเริ่มต้นของคำถัดไป
}    กระโดดไปยังย่อหน้าถัดไป
$    ไปยังจุดสิ้นสุดของบรรทัด
```

คุณจะได้เรียนรู้เพิ่มเติมเกี่ยวกับการเคลื่อนไหวในบทถัดไป ดังนั้นอย่ากังวลมากเกินไปหากคุณไม่เข้าใจบางส่วน

## คำกริยา (ตัวดำเนินการ)

ตามที่ `:h operator` Vim มี 16 ตัวดำเนินการ อย่างไรก็ตาม จากประสบการณ์ของฉัน การเรียนรู้ตัวดำเนินการ 3 ตัวนี้เพียงพอสำหรับ 80% ของความต้องการในการแก้ไขของฉัน:

```shell
y    คัดลอกข้อความ (copy)
d    ลบข้อความและบันทึกลงในรีจิสเตอร์
c    ลบข้อความ บันทึกลงในรีจิสเตอร์ และเริ่มโหมดแทรก
```

โดยที่ หลังจากที่คุณคัดลอกข้อความแล้ว คุณสามารถวางมันด้วย `p` (หลังเคอร์เซอร์) หรือ `P` (ก่อนเคอร์เซอร์)

## คำกริยาและคำนาม

ตอนนี้ที่คุณรู้จักคำนามและคำกริยาพื้นฐานแล้ว มาลองใช้กฎไวยากรณ์กัน, verb + noun! สมมติว่าคุณมีนิพจน์นี้:

```javascript
const learn = "vim";
```

- เพื่อคัดลอกทุกอย่างจากตำแหน่งปัจจุบันของคุณไปยังจุดสิ้นสุดของบรรทัด: `y$`.
- เพื่อลบจากตำแหน่งปัจจุบันของคุณไปยังจุดเริ่มต้นของคำถัดไป: `dw`.
- เพื่อเปลี่ยนจากตำแหน่งปัจจุบันของคุณไปยังจุดสิ้นสุดของย่อหน้าปัจจุบัน, กล่าวคือ `c}`.

การเคลื่อนไหวยังรับหมายเลขนับเป็นอาร์กิวเมนต์ (ฉันจะพูดคุยเกี่ยวกับเรื่องนี้ในบทถัดไป) หากคุณต้องการขึ้นไป 3 บรรทัด แทนที่จะกด `k` 3 ครั้ง คุณสามารถทำ `3k` ได้ หมายเลขนับทำงานร่วมกับไวยากรณ์ Vim
- เพื่อคัดลอกสองตัวอักษรไปทางซ้าย: `y2h`.
- เพื่อลบคำถัดไปสองคำ: `d2w`.
- เพื่อเปลี่ยนสองบรรทัดถัดไป: `c2j`.

ตอนนี้ คุณอาจต้องคิดนานและหนักเพื่อดำเนินการแม้แต่คำสั่งง่ายๆ คุณไม่ได้อยู่คนเดียว เมื่อฉันเริ่มต้นครั้งแรก ฉันมีปัญหาคล้ายกัน แต่ฉันก็เร็วขึ้นเมื่อเวลาผ่านไป คุณก็จะเช่นกัน การทำซ้ำ การทำซ้ำ การทำซ้ำ

เป็นการบันทึกเพิ่มเติม การดำเนินการแบบบรรทัด (การดำเนินการที่มีผลต่อทั้งบรรทัด) เป็นการดำเนินการทั่วไปในการแก้ไขข้อความ โดยทั่วไปแล้ว โดยการพิมพ์คำสั่งตัวดำเนินการสองครั้ง Vim จะดำเนินการแบบบรรทัดสำหรับการกระทำนั้น ตัวอย่างเช่น `dd`, `yy`, และ `cc` ทำการ **ลบ**, **คัดลอก**, และ **เปลี่ยน** บนทั้งบรรทัด ลองทำเช่นนี้กับตัวดำเนินการอื่นๆ!

นี่มันเจ๋งมาก ฉันเห็นรูปแบบที่นี่ แต่ฉันยังไม่เสร็จสิ้น Vim มีคำนามอีกประเภทหนึ่ง: วัตถุข้อความ

## คำนามเพิ่มเติม (วัตถุข้อความ)

จินตนาการว่าคุณอยู่ที่ไหนสักแห่งภายในวงเล็บคู่เช่น `(hello Vim)` และคุณต้องลบทั้งวลีภายในวงเล็บ คุณจะทำอย่างไรให้รวดเร็ว? มีวิธีลบ "กลุ่ม" ที่คุณอยู่ภายในหรือไม่?

คำตอบคือใช่ ข้อความมักจะมีโครงสร้าง มันมักจะมีวงเล็บ, เครื่องหมายคำพูด, สัญลักษณ์, และอื่นๆ Vim มีวิธีการจับโครงสร้างนี้ด้วยวัตถุข้อความ

วัตถุข้อความใช้ร่วมกับตัวดำเนินการ มีสองประเภทของวัตถุข้อความ: วัตถุข้อความภายในและภายนอก

```shell
i + object    วัตถุข้อความภายใน
a + object    วัตถุข้อความภายนอก
```

วัตถุข้อความภายในเลือกวัตถุภายใน *โดยไม่รวม* ช่องว่างหรือวัตถุที่ล้อมรอบ วัตถุข้อความภายนอกเลือกวัตถุภายใน *รวมถึง* ช่องว่างหรือวัตถุที่ล้อมรอบ โดยทั่วไปแล้ว วัตถุข้อความภายนอกจะเลือกข้อความมากกว่าวัตถุข้อความภายในเสมอ หากเคอร์เซอร์ของคุณอยู่ที่ไหนสักแห่งภายในวงเล็บในนิพจน์ `(hello Vim)`:
- เพื่อลบข้อความภายในวงเล็บโดยไม่ลบวงเล็บ: `di(`.
- เพื่อลบวงเล็บและข้อความภายใน: `da(`.

มาดูตัวอย่างที่แตกต่างกัน สมมติว่าคุณมีฟังก์ชัน Javascript นี้และเคอร์เซอร์ของคุณอยู่ที่ "H" ใน "Hello":

```javascript
const hello = function() {
  console.log("Hello Vim");
  return true;
}
```

- เพื่อลบ "Hello Vim" ทั้งหมด: `di(`.
- เพื่อลบเนื้อหาของฟังก์ชัน (ที่ล้อมรอบด้วย `{}`): `di{`.
- เพื่อลบสตริง "Hello": `diw`.

วัตถุข้อความมีพลังเพราะคุณสามารถกำหนดเป้าหมายวัตถุต่างๆ จากตำแหน่งเดียว คุณสามารถลบวัตถุภายในวงเล็บ บล็อกฟังก์ชัน หรือคำปัจจุบัน โดยใช้หลักการช่วยจำ เมื่อคุณเห็น `di(`, `di{`, และ `diw` คุณจะได้แนวคิดที่ดีว่ามันแทนวัตถุข้อความใด: วงเล็บคู่, สัญลักษณ์คู่, และคำ

มาดูตัวอย่างสุดท้าย สมมติว่าคุณมีแท็ก HTML เหล่านี้:

```html
<div>
  <h1>Header1</h1>
  <p>Paragraph1</p>
  <p>Paragraph2</p>
</div>
```

หากเคอร์เซอร์ของคุณอยู่ที่ข้อความ "Header1":
- เพื่อลบ "Header1": `dit`.
- เพื่อลบ `<h1>Header1</h1>`: `dat`.

หากเคอร์เซอร์ของคุณอยู่ที่ "div":
- เพื่อลบ `h1` และทั้งสองบรรทัด `p`: `dit`.
- เพื่อลบทุกอย่าง: `dat`.
- เพื่อลบ "div": `di<`.

ด้านล่างนี้คือรายการของวัตถุข้อความทั่วไป:

```shell
w         คำหนึ่งคำ
p         ย่อหน้าหนึ่งย่อหน้า
s         ประโยคหนึ่งประโยค
( หรือ )  คู่ของ ( )
{ หรือ }  คู่ของ { }
[ หรือ ]  คู่ของ [ ]
< หรือ >  คู่ของ < >
t         แท็ก XML
"         คู่ของ " "
'         คู่ของ ' '
`         คู่ของ ` `
```

เพื่อเรียนรู้เพิ่มเติม ตรวจสอบที่ `:h text-objects`.

## ความสามารถในการรวมกันและไวยากรณ์

ไวยากรณ์ Vim เป็นชุดย่อยของฟีเจอร์ความสามารถในการรวมกันของ Vim มาพูดคุยเกี่ยวกับความสามารถในการรวมกันใน Vim และทำไมมันถึงเป็นฟีเจอร์ที่ยอดเยี่ยมในการมีอยู่ในโปรแกรมแก้ไขข้อความ

ความสามารถในการรวมกันหมายถึงการมีชุดคำสั่งทั่วไปที่สามารถรวมกัน (ประกอบ) เพื่อดำเนินการคำสั่งที่ซับซ้อนมากขึ้น เช่นเดียวกับในโปรแกรมมิ่งที่คุณสามารถสร้างนามธรรมที่ซับซ้อนมากขึ้นจากนามธรรมที่ง่ายกว่า ใน Vim คุณสามารถดำเนินการคำสั่งที่ซับซ้อนจากคำสั่งที่ง่ายกว่า ไวยากรณ์ Vim เป็นการแสดงออกถึงธรรมชาติที่สามารถรวมกันได้ของ Vim

พลังที่แท้จริงของความสามารถในการรวมกันของ Vim จะส่องแสงเมื่อมันรวมเข้ากับโปรแกรมภายนอก Vim มีตัวดำเนินการกรอง (`!`) เพื่อใช้โปรแกรมภายนอกเป็นตัวกรองสำหรับข้อความของเรา สมมติว่าคุณมีข้อความที่ยุ่งเหยิงด้านล่างและคุณต้องการทำให้มันเป็นตาราง:

```shell
Id|Name|Cuteness
01|Puppy|Very
02|Kitten|Ok
03|Bunny|Ok
```

สิ่งนี้ไม่สามารถทำได้ง่ายๆ ด้วยคำสั่ง Vim แต่คุณสามารถทำได้อย่างรวดเร็วด้วยคำสั่งเทอร์มินัล `column` (สมมติว่าเทอร์มินัลของคุณมีคำสั่ง `column`) โดยให้เคอร์เซอร์ของคุณอยู่ที่ "Id" ให้รัน `!}column -t -s "|"`. ว้าว! ตอนนี้คุณมีข้อมูลในรูปแบบตารางที่สวยงามด้วยคำสั่งเดียว

```shell
Id  Name    Cuteness
01  Puppy   Very
02  Kitten  Ok
03  Bunny   Ok
```

มาดูคำสั่งนี้กัน ตัวกริยาคือ `!` (ตัวดำเนินการกรอง) และคำนามคือ `}` (ไปยังย่อหน้าถัดไป) ตัวดำเนินการกรอง `!` ยอมรับอาร์กิวเมนต์อีกตัวหนึ่ง คำสั่งเทอร์มินัล ดังนั้นฉันจึงให้มัน `column -t -s "|"`. ฉันจะไม่พูดถึงวิธีการทำงานของ `column` แต่ในทางปฏิบัติ มันทำให้ข้อความเป็นตาราง

สมมติว่าคุณต้องการไม่เพียงแค่ทำให้ข้อความของคุณเป็นตาราง แต่ยังแสดงเฉพาะแถวที่มี "Ok" คุณรู้ว่า `awk` สามารถทำงานนี้ได้ง่าย คุณสามารถทำเช่นนี้แทน:

```shell
!}column -t -s "|" | awk 'NR > 1 && /Ok/ {print $0}'
```

ผลลัพธ์:

```shell
02  Kitten  Ok
03  Bunny   Ok
```

ยอดเยี่ยม! ตัวดำเนินการคำสั่งภายนอกยังสามารถใช้ท่อ (`|`)

นี่คือพลังของความสามารถในการรวมกันของ Vim ยิ่งคุณรู้จักตัวดำเนินการ การเคลื่อนไหว และคำสั่งเทอร์มินัลมากเท่าไหร่ ความสามารถในการประกอบการกระทำที่ซับซ้อนของคุณก็จะ *เพิ่มขึ้น*

สมมติว่าคุณรู้จักการเคลื่อนไหวเพียงสี่แบบ `w, $, }, G` และตัวดำเนินการเพียงหนึ่งตัว `d` คุณสามารถทำได้ 8 การกระทำ: *เคลื่อนที่* 4 วิธีที่แตกต่างกัน (`w, $, }, G`) และ *ลบ* 4 เป้าหมายที่แตกต่างกัน (`dw, d$, d}, dG`). แล้ววันหนึ่งคุณเรียนรู้เกี่ยวกับตัวดำเนินการตัวพิมพ์ใหญ่ (`gU`). คุณไม่ได้เพิ่มเพียงความสามารถใหม่หนึ่งอย่างในเข็มขัดเครื่องมือ Vim ของคุณ แต่ *สี่*: `gUw, gU$, gU}, gUG`. นี่ทำให้คุณมีเครื่องมือ 12 ชิ้นในเข็มขัดเครื่องมือ Vim ของคุณ ทุกความรู้ใหม่คือการเพิ่มพูนความสามารถของคุณ หากคุณรู้จัก 10 การเคลื่อนไหวและ 5 ตัวดำเนินการ คุณจะมี 60 การเคลื่อนไหว (50 การดำเนินการ + 10 การเคลื่อนไหว) ในอ arsenal ของคุณ Vim มีการเคลื่อนไหวหมายเลขบรรทัด (`nG`) ที่ให้คุณ `n` การเคลื่อนไหว โดยที่ `n` คือจำนวนบรรทัดที่คุณมีในไฟล์ของคุณ (เพื่อไปยังบรรทัดที่ 5 ให้รัน `5G`). การเคลื่อนไหวค้นหา (`/`) แทบจะให้คุณมีการเคลื่อนไหวไม่จำกัดเพราะคุณสามารถค้นหาอะไรก็ได้ ตัวดำเนินการคำสั่งภายนอก (`!`) ให้คุณมีเครื่องมือกรองเท่ากับจำนวนคำสั่งเทอร์มินัลที่คุณรู้ การใช้เครื่องมือที่สามารถรวมกันได้เช่น Vim ทุกสิ่งที่คุณรู้สามารถเชื่อมโยงกันเพื่อทำการดำเนินการที่มีความซับซ้อนมากขึ้น ยิ่งคุณรู้มากเท่าไหร่ คุณก็ยิ่งมีพลังมากขึ้นเท่านั้น

พฤติกรรมที่สามารถรวมกันนี้สะท้อนถึงปรัชญา Unix: *ทำสิ่งหนึ่งให้ดี*. ตัวดำเนินการมีงานเดียว: ทำ Y. การเคลื่อนไหวมีงานเดียว: ไปที่ X. โดยการรวมตัวดำเนินการกับการเคลื่อนไหว คุณจะได้ YX: ทำ Y บน X.

การเคลื่อนไหวและตัวดำเนินการสามารถขยายได้ คุณสามารถสร้างการเคลื่อนไหวและตัวดำเนินการที่กำหนดเองเพื่อเพิ่มในเข็มขัดเครื่องมือ Vim ของคุณ ปลั๊กอิน [`vim-textobj-user`](https://github.com/kana/vim-textobj-user) ช่วยให้คุณสร้างวัตถุข้อความของคุณเอง มันยังมี [รายการ](https://github.com/kana/vim-textobj-user/wiki) ของวัตถุข้อความที่สร้างโดยผู้ใช้

## เรียนรู้ไวยากรณ์ Vim อย่างชาญฉลาด

คุณเพิ่งเรียนรู้เกี่ยวกับกฎของไวยากรณ์ Vim: `verb + noun`. หนึ่งในช่วงเวลาที่ทำให้ฉัน "AHA!" ใน Vim คือเมื่อฉันเพิ่งเรียนรู้เกี่ยวกับตัวดำเนินการตัวพิมพ์ใหญ่ (`gU`) และต้องการทำให้คำปัจจุบันเป็นตัวพิมพ์ใหญ่ ฉัน *ทำโดยสัญชาตญาณ* รัน `gUiw` และมันได้ผล! คำนั้นถูกทำให้เป็นตัวพิมพ์ใหญ่ ในขณะนั้น ฉันเริ่มเข้าใจ Vim จริงๆ ความหวังของฉันคือคุณจะมีช่วงเวลา "AHA!" ของคุณเองในไม่ช้า หากยังไม่เกิดขึ้น

เป้าหมายของบทนี้คือการแสดงให้คุณเห็นถึงรูปแบบ `verb + noun` ใน Vim เพื่อที่คุณจะได้เข้าหาการเรียนรู้ Vim เหมือนกับการเรียนรู้ภาษาใหม่แทนที่จะจดจำการรวมคำสั่งทุกคำสั่ง

เรียนรู้รูปแบบและเข้าใจผลกระทบ นี่คือวิธีที่ชาญฉลาดในการเรียนรู้