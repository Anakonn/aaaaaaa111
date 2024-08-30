---
description: เอกสารนี้อธิบายเกี่ยวกับการใช้บัฟเฟอร์ หน้าต่าง และแท็บใน Vim รวมถึงการตั้งค่าเพื่อเพิ่มประสิทธิภาพในการทำงานกับไฟล์.
title: Ch02. Buffers, Windows, and Tabs
---

หากคุณเคยใช้โปรแกรมแก้ไขข้อความสมัยใหม่มาก่อน คุณอาจคุ้นเคยกับหน้าต่างและแท็บอยู่แล้ว Vim ใช้การแสดงผล 3 แบบแทนที่จะเป็น 2 แบบ: บัฟเฟอร์, หน้าต่าง, และแท็บ ในบทนี้ ฉันจะอธิบายว่าบัฟเฟอร์, หน้าต่าง, และแท็บคืออะไรและทำงานอย่างไรใน Vim

ก่อนที่คุณจะเริ่ม ให้แน่ใจว่าคุณมีตัวเลือก `set hidden` ใน vimrc หากไม่มี เมื่อใดก็ตามที่คุณสลับบัฟเฟอร์และบัฟเฟอร์ปัจจุบันของคุณยังไม่ได้บันทึก Vim จะขอให้คุณบันทึกไฟล์ (คุณไม่ต้องการแบบนั้นหากคุณต้องการเคลื่อนที่อย่างรวดเร็ว) ฉันยังไม่ได้พูดถึง vimrc หากคุณไม่มี vimrc ให้สร้างหนึ่งอัน โดยปกติจะอยู่ในไดเรกทอรีบ้านของคุณและมีชื่อว่า `.vimrc` ฉันมีของฉันอยู่ที่ `~/.vimrc` เพื่อดูว่าคุณควรสร้าง vimrc ที่ไหน ให้ตรวจสอบ `:h vimrc` ภายในนั้นให้เพิ่ม:

```shell
set hidden
```

บันทึกมัน จากนั้น source มัน (รัน `:source %` จากภายใน vimrc)

## บัฟเฟอร์

บัฟเฟอร์คืออะไร?

บัฟเฟอร์คือพื้นที่ในหน่วยความจำที่คุณสามารถเขียนและแก้ไขข้อความได้ เมื่อคุณเปิดไฟล์ใน Vim ข้อมูลจะถูกผูกกับบัฟเฟอร์ เมื่อคุณเปิดไฟล์ 3 ไฟล์ใน Vim คุณจะมีบัฟเฟอร์ 3 ตัว

มีไฟล์ว่าง 2 ไฟล์คือ `file1.js` และ `file2.js` พร้อมใช้งาน (ถ้าเป็นไปได้ ให้สร้างด้วย Vim) รันคำสั่งนี้ในเทอร์มินัล:

```bash
vim file1.js
```

สิ่งที่คุณเห็นคือบัฟเฟอร์ของ `file1.js` เมื่อใดก็ตามที่คุณเปิดไฟล์ใหม่ Vim จะสร้างบัฟเฟอร์ใหม่

ออกจาก Vim ตอนนี้ให้เปิดไฟล์ใหม่ 2 ไฟล์:

```bash
vim file1.js file2.js
```

Vim แสดงบัฟเฟอร์ `file1.js` แต่จริงๆ แล้วมันสร้างบัฟเฟอร์ 2 ตัว: บัฟเฟอร์ `file1.js` และบัฟเฟอร์ `file2.js` รัน `:buffers` เพื่อดูบัฟเฟอร์ทั้งหมด (ทางเลือกอื่น คุณสามารถใช้ `:ls` หรือ `:files` ได้เช่นกัน) คุณควรเห็นทั้ง `file1.js` และ `file2.js` อยู่ในรายการ การรัน `vim file1 file2 file3 ... filen` จะสร้างบัฟเฟอร์ n จำนวน ตัวอย่างเช่น การเปิดไฟล์ใหม่แต่ละครั้ง Vim จะสร้างบัฟเฟอร์ใหม่สำหรับไฟล์นั้น

มีหลายวิธีที่คุณสามารถเดินทางระหว่างบัฟเฟอร์:
- `:bnext` เพื่อไปยังบัฟเฟอร์ถัดไป (`:bprevious` เพื่อไปยังบัฟเฟอร์ก่อนหน้า)
- `:buffer` + ชื่อไฟล์ Vim สามารถเติมชื่อไฟล์อัตโนมัติด้วย `<Tab>`
- `:buffer` + `n` โดยที่ `n` คือหมายเลขบัฟเฟอร์ ตัวอย่างเช่น การพิมพ์ `:buffer 2` จะพาคุณไปยังบัฟเฟอร์ #2
- กระโดดไปยังตำแหน่งเก่ากว่าในรายการกระโดดด้วย `Ctrl-O` และไปยังตำแหน่งใหม่กว่าด้วย `Ctrl-I` วิธีเหล่านี้ไม่เฉพาะเจาะจงกับบัฟเฟอร์ แต่สามารถใช้เพื่อกระโดดระหว่างบัฟเฟอร์ที่แตกต่างกัน ฉันจะอธิบายการกระโดดในรายละเอียดเพิ่มเติมในบทที่ 5
- ไปยังบัฟเฟอร์ที่แก้ไขก่อนหน้านี้ด้วย `Ctrl-^`

เมื่อ Vim สร้างบัฟเฟอร์ มันจะยังคงอยู่ในรายการบัฟเฟอร์ของคุณ หากต้องการลบมัน คุณสามารถพิมพ์ `:bdelete` มันยังสามารถรับหมายเลขบัฟเฟอร์เป็นพารามิเตอร์ (`:bdelete 3` เพื่อลบบัฟเฟอร์ #3) หรือชื่อไฟล์ (`:bdelete` จากนั้นใช้ `<Tab>` เพื่อเติมอัตโนมัติ)

สิ่งที่ยากที่สุดสำหรับฉันเมื่อเรียนรู้เกี่ยวกับบัฟเฟอร์คือการมองเห็นว่ามันทำงานอย่างไรเพราะจิตใจของฉันคุ้นเคยกับหน้าต่างจากการใช้โปรแกรมแก้ไขข้อความที่เป็นที่นิยม อนาล็อกที่ดีคือสำรับไพ่ หากฉันมีบัฟเฟอร์ 2 ตัว ฉันมีสแต็คของไพ่ 2 ใบ ไพ่ที่อยู่ด้านบนคือไพ่ใบเดียวที่ฉันเห็น แต่ฉันรู้ว่ามีไพ่ด้านล่าง หากฉันเห็นบัฟเฟอร์ `file1.js` แสดงอยู่ ไพ่ `file1.js` จะอยู่ด้านบนของสำรับ ฉันไม่สามารถเห็นไพ่ใบอื่น `file2.js` ที่นี่ แต่ก็ยังมีอยู่ หากฉันสลับบัฟเฟอร์ไปที่ `file2.js` ไพ่ `file2.js` จะอยู่ด้านบนของสำรับและไพ่ `file1.js` จะอยู่ด้านล่าง

หากคุณยังไม่เคยใช้ Vim มาก่อน นี่คือแนวคิดใหม่ ใช้เวลาของคุณในการทำความเข้าใจมัน

## การออกจาก Vim

โดยวิธีการ หากคุณมีบัฟเฟอร์หลายตัวเปิดอยู่ คุณสามารถปิดทั้งหมดได้ด้วย quit-all:

```shell
:qall
```

หากคุณต้องการปิดโดยไม่บันทึกการเปลี่ยนแปลงของคุณ เพียงแค่เพิ่ม `!` ที่ท้าย:

```shell
:qall!
```

เพื่อบันทึกและออกทั้งหมด รัน:

```shell
:wqall
```

## หน้าต่าง

หน้าต่างคือมุมมองบนบัฟเฟอร์ หากคุณมาจากโปรแกรมแก้ไขที่เป็นที่นิยม แนวคิดนี้อาจคุ้นเคยกับคุณ โปรแกรมแก้ไขข้อความส่วนใหญ่มีความสามารถในการแสดงหลายหน้าต่าง ใน Vim คุณยังสามารถมีหลายหน้าต่างได้

มาลองเปิด `file1.js` จากเทอร์มินัลอีกครั้ง:

```bash
vim file1.js
```

ก่อนหน้านี้ฉันเขียนว่าคุณกำลังดูบัฟเฟอร์ `file1.js` ขณะที่มันถูกต้อง คำแถลงนั้นไม่สมบูรณ์ คุณกำลังดูบัฟเฟอร์ `file1.js` ที่แสดงผ่าน **หน้าต่าง** หน้าต่างคือวิธีที่คุณกำลังมองเห็นบัฟเฟอร์

อย่าออกจาก Vim ยัง รัน:

```shell
:split file2.js
```

ตอนนี้คุณกำลังดูบัฟเฟอร์สองตัวผ่าน **หน้าต่างสองตัว** หน้าต่างด้านบนแสดงบัฟเฟอร์ `file2.js` หน้าต่างด้านล่างแสดงบัฟเฟอร์ `file1.js`

หากคุณต้องการนำทางระหว่างหน้าต่าง ใช้ทางลัดเหล่านี้:

```shell
Ctrl-W H    ย้ายเคอร์เซอร์ไปยังหน้าต่างด้านซ้าย
Ctrl-W J    ย้ายเคอร์เซอร์ไปยังหน้าต่างด้านล่าง
Ctrl-W K    ย้ายเคอร์เซอร์ไปยังหน้าต่างด้านบน
Ctrl-W L    ย้ายเคอร์เซอร์ไปยังหน้าต่างด้านขวา
```

ตอนนี้รัน:

```shell
:vsplit file3.js
```

คุณกำลังเห็นหน้าต่างสามบานที่แสดงบัฟเฟอร์สามตัว หนึ่งหน้าต่างแสดงบัฟเฟอร์ `file3.js` หนึ่งหน้าต่างแสดงบัฟเฟอร์ `file2.js` และอีกหนึ่งหน้าต่างแสดงบัฟเฟอร์ `file1.js`

คุณสามารถมีหลายหน้าต่างที่แสดงบัฟเฟอร์เดียวกัน ขณะที่คุณอยู่ในหน้าต่างด้านซ้ายบน ให้พิมพ์:

```shell
:buffer file2.js
```

ตอนนี้หน้าต่างทั้งสองแสดงบัฟเฟอร์ `file2.js` หากคุณเริ่มพิมพ์ในหน้าต่าง `file2.js` คุณจะเห็นว่าทั้งสองหน้าต่างที่แสดงบัฟเฟอร์ `file2.js` จะถูกอัปเดตแบบเรียลไทม์

เพื่อปิดหน้าต่างปัจจุบัน คุณสามารถรัน `Ctrl-W C` หรือพิมพ์ `:quit` เมื่อคุณปิดหน้าต่าง บัฟเฟอร์จะยังคงอยู่ (รัน `:buffers` เพื่อยืนยันสิ่งนี้)

นี่คือคำสั่งหน้าต่างในโหมดปกติที่มีประโยชน์:

```shell
Ctrl-W V    เปิดการแบ่งหน้าต่างแนวตั้งใหม่
Ctrl-W S    เปิดการแบ่งหน้าต่างแนวนอนใหม่
Ctrl-W C    ปิดหน้าต่าง
Ctrl-W O    ทำให้หน้าต่างปัจจุบันเป็นหน้าต่างเดียวบนหน้าจอและปิดหน้าต่างอื่นๆ
```

และนี่คือรายการคำสั่งบรรทัดคำสั่งหน้าต่างที่มีประโยชน์:

```shell
:vsplit filename    แบ่งหน้าต่างแนวตั้ง
:split filename     แบ่งหน้าต่างแนวนอน
:new filename       สร้างหน้าต่างใหม่
```

ใช้เวลาของคุณในการทำความเข้าใจพวกเขา สำหรับข้อมูลเพิ่มเติม ให้ตรวจสอบ `:h window`

## แท็บ

แท็บคือการรวบรวมหน้าต่าง คิดว่ามันเหมือนกับเลย์เอาต์สำหรับหน้าต่าง ในโปรแกรมแก้ไขข้อความสมัยใหม่ส่วนใหญ่ (และเบราว์เซอร์อินเทอร์เน็ตสมัยใหม่) แท็บหมายถึงไฟล์ / หน้าเว็บที่เปิดอยู่และเมื่อคุณปิดมัน ไฟล์ / หน้านั้นจะหายไป ใน Vim แท็บไม่ได้แสดงถึงไฟล์ที่เปิดอยู่ เมื่อคุณปิดแท็บใน Vim คุณไม่ได้ปิดไฟล์ คุณแค่ปิดเลย์เอาต์ ไฟล์ที่เปิดอยู่ในเลย์เอาต์นั้นยังไม่ได้ถูกปิด มันยังเปิดอยู่ในบัฟเฟอร์ของพวกเขา

มาดูแท็บใน Vim ทำงานกัน เปิด `file1.js`:

```bash
vim file1.js
```

เพื่อเปิด `file2.js` ในแท็บใหม่:

```shell
:tabnew file2.js
```

คุณยังสามารถให้ Vim เติมชื่อไฟล์ที่คุณต้องการเปิดใน *แท็บใหม่* โดยการกด `<Tab>` (ไม่มีความหมายแฝง)

ด้านล่างนี้คือรายการการนำทางแท็บที่มีประโยชน์:

```shell
:tabnew file.txt    เปิด file.txt ในแท็บใหม่
:tabclose           ปิดแท็บปัจจุบัน
:tabnext            ไปยังแท็บถัดไป
:tabprevious        ไปยังแท็บก่อนหน้า
:tablast            ไปยังแท็บสุดท้าย
:tabfirst           ไปยังแท็บแรก
```

คุณยังสามารถรัน `gt` เพื่อไปยังแท็บถัดไป (คุณสามารถไปยังแท็บก่อนหน้าด้วย `gT`) คุณสามารถส่งจำนวนเป็นพารามิเตอร์ไปยัง `gt` โดยที่จำนวนคือหมายเลขแท็บ เพื่อไปยังแท็บที่สาม ให้ทำ `3gt`

หนึ่งในข้อดีของการมีแท็บหลายแท็บคือคุณสามารถมีการจัดเรียงหน้าต่างที่แตกต่างกันในแท็บที่แตกต่างกัน บางทีคุณอาจต้องการให้แท็บแรกมีหน้าต่างแนวตั้ง 3 บานและแท็บที่สองมีเลย์เอาต์หน้าต่างแนวนอนและแนวตั้งผสมกัน แท็บคือเครื่องมือที่เหมาะสมสำหรับงานนี้!

เพื่อเริ่ม Vim ด้วยแท็บหลายแท็บ คุณสามารถทำได้จากเทอร์มินัล:

```bash
vim -p file1.js file2.js file3.js
```

## การเคลื่อนที่ใน 3D

การเคลื่อนที่ระหว่างหน้าต่างเหมือนการเดินทางในสองมิติในแกน X-Y ในพิกัดคาร์ทีเซียน คุณสามารถเคลื่อนที่ไปยังหน้าต่างด้านบน ขวา ล่าง และซ้ายด้วย `Ctrl-W H/J/K/L`

การเคลื่อนที่ระหว่างบัฟเฟอร์เหมือนการเดินทางข้ามแกน Z ในพิกัดคาร์ทีเซียน จินตนาการว่าบัฟเฟอร์ไฟล์ของคุณเรียงกันตามแกน Z คุณสามารถเดินทางตามแกน Z หนึ่งบัฟเฟอร์ในแต่ละครั้งด้วย `:bnext` และ `:bprevious` คุณสามารถกระโดดไปยังพิกัดใดๆ ในแกน Z ด้วย `:buffer filename/buffernumber`

คุณสามารถเคลื่อนที่ใน *พื้นที่สามมิติ* โดยการรวมการเคลื่อนไหวของหน้าต่างและบัฟเฟอร์ คุณสามารถเคลื่อนที่ไปยังหน้าต่างด้านบน ขวา ล่าง หรือซ้าย (การนำทาง X-Y) ด้วยการเคลื่อนไหวของหน้าต่าง เนื่องจากแต่ละหน้าต่างมีบัฟเฟอร์ คุณจึงสามารถเคลื่อนที่ไปข้างหน้าและถอยหลัง (การนำทาง Z) ด้วยการเคลื่อนไหวของบัฟเฟอร์

## การใช้บัฟเฟอร์, หน้าต่าง, และแท็บอย่างชาญฉลาด

คุณได้เรียนรู้ว่าบัฟเฟอร์, หน้าต่าง, และแท็บคืออะไรและทำงานอย่างไรใน Vim ตอนนี้ที่คุณเข้าใจพวกเขาดีขึ้น คุณสามารถใช้พวกเขาในกระบวนการทำงานของคุณเอง

ทุกคนมีวิธีการทำงานที่แตกต่างกัน นี่คือตัวอย่างของฉัน:
- ก่อนอื่น ฉันใช้บัฟเฟอร์เพื่อเก็บไฟล์ที่จำเป็นทั้งหมดสำหรับงานปัจจุบัน Vim สามารถจัดการบัฟเฟอร์ที่เปิดอยู่หลายตัวก่อนที่จะเริ่มช้าลง นอกจากนี้การมีบัฟเฟอร์หลายตัวเปิดอยู่จะไม่ทำให้หน้าจอของฉันแน่น ฉันเห็นเพียงบัฟเฟอร์เดียว (สมมติว่าฉันมีหน้าต่างเดียว) ในแต่ละครั้งทำให้ฉันสามารถมุ่งเน้นไปที่หน้าจอเดียว เมื่อฉันต้องการไปที่ไหน ฉันสามารถบินไปยังบัฟเฟอร์ที่เปิดอยู่ได้อย่างรวดเร็วทุกเมื่อ
- ฉันใช้หลายหน้าต่างเพื่อดูบัฟเฟอร์หลายตัวในครั้งเดียว โดยปกติเมื่อเปรียบเทียบไฟล์ อ่านเอกสาร หรือทำตามโค้ด ฉันพยายามรักษาจำนวนหน้าต่างที่เปิดไม่ให้เกินสามเพราะหน้าจอของฉันจะแน่น (ฉันใช้แล็ปท็อปขนาดเล็ก) เมื่อฉันเสร็จแล้ว ฉันจะปิดหน้าต่างที่เกินมา หน้าต่างน้อยลงหมายถึงการลดการรบกวน
- แทนที่จะใช้แท็บ ฉันใช้หน้าต่าง [tmux](https://github.com/tmux/tmux/wiki) ฉันมักจะใช้หลายหน้าต่าง tmux พร้อมกัน ตัวอย่างเช่น หนึ่งหน้าต่าง tmux สำหรับโค้ดฝั่งลูกค้าและอีกหนึ่งสำหรับโค้ดฝั่งแบ็คเอนด์

กระบวนการทำงานของฉันอาจดูแตกต่างจากของคุณตามสไตล์การแก้ไขของคุณ และนั่นก็ไม่เป็นไร ลองทดลองเพื่อค้นหากระบวนการทำงานของคุณเองที่เหมาะสมกับสไตล์การเขียนโค้ดของคุณ