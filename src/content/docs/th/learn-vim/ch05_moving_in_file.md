---
description: เอกสารนี้แนะนำการนำทางใน Vim โดยใช้การเคลื่อนไหวพื้นฐาน เพื่อเพิ่มประสิทธิภาพในการทำงานและความเร็วในการแก้ไขไฟล์.
title: Ch05. Moving in a File
---

เริ่มต้นการเคลื่อนไหวด้วยแป้นพิมพ์อาจรู้สึกช้าและอึดอัด แต่จงอย่ายอมแพ้! เมื่อคุณชินกับมันแล้ว คุณสามารถไปที่ใดก็ได้ในไฟล์ได้เร็วกว่าเมื่อใช้เมาส์

ในบทนี้ คุณจะได้เรียนรู้การเคลื่อนไหวที่จำเป็นและวิธีการใช้มันอย่างมีประสิทธิภาพ โปรดจำไว้ว่านี่ **ไม่ใช่** การเคลื่อนไหวทั้งหมดที่ Vim มี เป้าหมายที่นี่คือการแนะนำการเคลื่อนไหวที่มีประโยชน์เพื่อให้คุณสามารถทำงานได้อย่างรวดเร็ว หากคุณต้องการเรียนรู้เพิ่มเติม ให้ตรวจสอบ `:h motion.txt`

## การนำทางตัวอักษร

หน่วยการเคลื่อนไหวพื้นฐานที่สุดคือการเคลื่อนที่ไปทางซ้าย ลง ขึ้น และขวา

```shell
h   ซ้าย
j   ลง
k   ขึ้น
l   ขวา
gj  ลงในบรรทัดที่ห่อแบบนุ่ม
gk  ขึ้นในบรรทัดที่ห่อแบบนุ่ม
```

คุณยังสามารถเคลื่อนที่ด้วยลูกศรทิศทาง หากคุณเพิ่งเริ่มต้น อย่าลังเลที่จะใช้วิธีใดก็ตามที่คุณรู้สึกสะดวกที่สุด

ฉันชอบ `hjkl` เพราะมือขวาของฉันสามารถอยู่ในแถวหลักได้ การทำเช่นนี้ทำให้ฉันเข้าถึงปุ่มรอบข้างได้สั้นลง เพื่อให้ชินกับ `hjkl` ฉันได้ปิดปุ่มลูกศรเมื่อเริ่มต้นโดยการเพิ่มสิ่งเหล่านี้ใน `~/.vimrc`:

```shell
noremap <Up> <NOP>
noremap <Down> <NOP>
noremap <Left> <NOP>
noremap <Right> <NOP>
```

ยังมีปลั๊กอินที่ช่วยในการหยุดนิสัยที่ไม่ดีนี้ หนึ่งในนั้นคือ [vim-hardtime](https://github.com/takac/vim-hardtime) ที่ทำให้ฉันประหลาดใจว่าฉันใช้เวลาไม่ถึงสัปดาห์ในการชินกับ `hjkl`

หากคุณสงสัยว่าทำไม Vim ถึงใช้ `hjkl` ในการเคลื่อนที่ นั่นเป็นเพราะเทอร์มินัล Lear-Siegler ADM-3A ซึ่ง Bill Joy เขียน Vi ไม่ได้มีปุ่มลูกศรและใช้ `hjkl` เป็นซ้าย/ลง/ขึ้น/ขวา*

## การตั้งค่าหมายเลขสัมพัทธ์

ฉันคิดว่าการมี `number` และ `relativenumber` ตั้งค่าเป็นสิ่งที่มีประโยชน์ คุณสามารถทำได้โดยการเพิ่มสิ่งนี้ใน `.vimrc`:

```shell
set relativenumber number
```

สิ่งนี้จะแสดงหมายเลขบรรทัดปัจจุบันของฉันและหมายเลขบรรทัดสัมพัทธ์

มันง่ายที่จะเข้าใจว่าการมีหมายเลขในคอลัมน์ซ้ายมีประโยชน์ แต่บางคนอาจถามว่าการมีหมายเลขสัมพัทธ์ในคอลัมน์ซ้ายมีประโยชน์อย่างไร การมีหมายเลขสัมพัทธ์ช่วยให้ฉันเห็นได้อย่างรวดเร็วว่าหมายเลขบรรทัดของเคอร์เซอร์ห่างจากข้อความเป้าหมายกี่บรรทัด ด้วยสิ่งนี้ ฉันสามารถเห็นได้อย่างง่ายดายว่าข้อความเป้าหมายของฉันอยู่ 12 บรรทัดด้านล่างฉัน ดังนั้นฉันจึงสามารถทำ `d12j` เพื่อลบมัน มิฉะนั้น หากฉันอยู่ที่บรรทัด 69 และเป้าหมายของฉันอยู่ที่บรรทัด 81 ฉันต้องทำการคำนวณทางจิต (81 - 69 = 12) การทำคณิตศาสตร์ในขณะที่แก้ไขใช้ทรัพยากรทางจิตมากเกินไป ยิ่งฉันต้องคิดน้อยลงเกี่ยวกับที่ที่ฉันต้องไป ยิ่งดี

นี่คือความชอบส่วนบุคคล 100% ทดลองใช้ `relativenumber` / `norelativenumber`, `number` / `nonumber` และใช้สิ่งที่คุณพบว่ามีประโยชน์ที่สุด!

## นับการเคลื่อนไหวของคุณ

มาพูดคุยเกี่ยวกับอาร์กิวเมนต์ "นับ" การเคลื่อนไหวของ Vim ยอมรับอาร์กิวเมนต์ตัวเลขที่มาก่อน ฉันได้กล่าวไว้ข้างต้นว่าคุณสามารถลงไป 12 บรรทัดด้วย `12j` ตัวเลข 12 ใน `12j` คือหมายเลขนับ

ไวยากรณ์ในการใช้จำนวนกับการเคลื่อนไหวของคุณคือ:

```shell
[count] + motion
```

คุณสามารถใช้สิ่งนี้กับการเคลื่อนไหวทั้งหมด หากคุณต้องการเคลื่อนที่ 9 ตัวอักษรไปทางขวา แทนที่จะกด `l` 9 ครั้ง คุณสามารถทำ `9l`

## การนำทางคำ

มาพูดถึงหน่วยการเคลื่อนไหวที่ใหญ่ขึ้น: *คำ* คุณสามารถเคลื่อนที่ไปยังจุดเริ่มต้นของคำถัดไป (`w`), ไปยังจุดสิ้นสุดของคำถัดไป (`e`), ไปยังจุดเริ่มต้นของคำก่อนหน้า (`b`), และไปยังจุดสิ้นสุดของคำก่อนหน้า (`ge`)

นอกจากนี้ยังมี *WORD* ซึ่งแตกต่างจากคำ คุณสามารถเคลื่อนที่ไปยังจุดเริ่มต้นของ WORD ถัดไป (`W`), ไปยังจุดสิ้นสุดของ WORD ถัดไป (`E`), ไปยังจุดเริ่มต้นของ WORD ก่อนหน้า (`B`), และไปยังจุดสิ้นสุดของ WORD ก่อนหน้า (`gE`) เพื่อให้ง่ายต่อการจำ WORD ใช้ตัวอักษรเดียวกันกับคำ แต่เป็นตัวพิมพ์ใหญ่

```shell
w     เคลื่อนที่ไปข้างหน้าถึงจุดเริ่มต้นของคำถัดไป
W     เคลื่อนที่ไปข้างหน้าถึงจุดเริ่มต้นของ WORD ถัดไป
e     เคลื่อนที่ไปข้างหน้าหนึ่งคำถึงจุดสิ้นสุดของคำถัดไป
E     เคลื่อนที่ไปข้างหน้าหนึ่งคำถึงจุดสิ้นสุดของ WORD ถัดไป
b     เคลื่อนที่ถอยหลังไปยังจุดเริ่มต้นของคำก่อนหน้า
B     เคลื่อนที่ถอยหลังไปยังจุดเริ่มต้นของ WORD ก่อนหน้า
ge    เคลื่อนที่ถอยหลังไปยังจุดสิ้นสุดของคำก่อนหน้า
gE    เคลื่อนที่ถอยหลังไปยังจุดสิ้นสุดของ WORD ก่อนหน้า
```

แล้วความคล้ายคลึงและความแตกต่างระหว่างคำและ WORD คืออะไร? ทั้งคำและ WORD ถูกแยกออกจากกันด้วยอักขระว่าง คำคือชุดของอักขระที่ประกอบด้วย *เฉพาะ* `a-zA-Z0-9_` ส่วน WORD คือชุดของอักขระทั้งหมดที่ไม่รวมอักขระว่าง (อักขระว่างหมายถึงพื้นที่, แท็บ, และ EOL) หากต้องการเรียนรู้เพิ่มเติม ให้ตรวจสอบ `:h word` และ `:h WORD`

ตัวอย่างเช่น สมมติว่าคุณมี:

```shell
const hello = "world";
```

เมื่อเคอร์เซอร์ของคุณอยู่ที่จุดเริ่มต้นของบรรทัด การไปยังจุดสิ้นสุดของบรรทัดด้วย `l` จะใช้เวลา 21 การกดปุ่ม ใช้ `w` จะใช้เวลา 6 การกด ใช้ `W` จะใช้เวลาเพียง 4 การเคลื่อนที่ทั้งคำและ WORD เป็นตัวเลือกที่ดีในการเดินทางระยะสั้น

อย่างไรก็ตาม คุณสามารถไปจาก "c" ถึง ";" ในการกดปุ่มเดียวด้วยการนำทางบรรทัดปัจจุบัน

## การนำทางบรรทัดปัจจุบัน

เมื่อแก้ไข คุณมักจะต้องนำทางในแนวนอนในบรรทัด เพื่อกระโดดไปยังตัวอักษรแรกในบรรทัดปัจจุบัน ใช้ `0` เพื่อไปยังตัวอักษรสุดท้ายในบรรทัดปัจจุบัน ใช้ `$` นอกจากนี้ คุณสามารถใช้ `^` เพื่อไปยังตัวอักษรที่ไม่ว่างตัวแรกในบรรทัดปัจจุบันและ `g_` เพื่อไปยังตัวอักษรที่ไม่ว่างตัวสุดท้ายในบรรทัดปัจจุบัน หากคุณต้องการไปยังคอลัมน์ `n` ในบรรทัดปัจจุบัน คุณสามารถใช้ `n|`

```shell
0     ไปยังตัวอักษรแรกในบรรทัดปัจจุบัน
^     ไปยังตัวอักษรที่ไม่ว่างตัวแรกในบรรทัดปัจจุบัน
g_    ไปยังตัวอักษรที่ไม่ว่างตัวสุดท้ายในบรรทัดปัจจุบัน
$     ไปยังตัวอักษรสุดท้ายในบรรทัดปัจจุบัน
n|    ไปยังคอลัมน์ n ในบรรทัดปัจจุบัน
```

คุณสามารถค้นหาบรรทัดปัจจุบันด้วย `f` และ `t` ความแตกต่างระหว่าง `f` และ `t` คือ `f` จะพาคุณไปยังตัวอักษรแรกของการจับคู่และ `t` จะพาคุณไปจนถึง (ก่อน) ตัวอักษรแรกของการจับคู่ ดังนั้นหากคุณต้องการค้นหา "h" และลงจอดที่ "h" ใช้ `fh` หากคุณต้องการค้นหาตัว "h" แรกและลงจอดก่อนการจับคู่ ใช้ `th` หากคุณต้องการไปยังการเกิดขึ้น *ถัดไป* ของการค้นหาบรรทัดปัจจุบันล่าสุด ใช้ `;` หากต้องการไปยังการเกิดขึ้นก่อนหน้าของการจับคู่บรรทัดปัจจุบันล่าสุด ใช้ `,`

`F` และ `T` เป็นคู่ถอยหลังของ `f` และ `t` หากต้องการค้นหาย้อนกลับสำหรับ "h" ให้รัน `Fh` หากต้องการค้นหาต่อไปสำหรับ "h" ในทิศทางเดียวกัน ใช้ `;` โปรดทราบว่า `;` หลังจาก `Fh` จะค้นหาย้อนกลับและ `,` หลังจาก `Fh` จะค้นหาข้างหน้า 

```shell
f    ค้นหาข้างหน้าสำหรับการจับคู่ในบรรทัดเดียวกัน
F    ค้นหาย้อนกลับสำหรับการจับคู่ในบรรทัดเดียวกัน
t    ค้นหาข้างหน้าสำหรับการจับคู่ในบรรทัดเดียวกัน หยุดก่อนการจับคู่
T    ค้นหาย้อนกลับสำหรับการจับคู่ในบรรทัดเดียวกัน หยุดก่อนการจับคู่
;    ทำซ้ำการค้นหาครั้งล่าสุดในบรรทัดเดียวกันโดยใช้ทิศทางเดียวกัน
,    ทำซ้ำการค้นหาครั้งล่าสุดในบรรทัดเดียวกันโดยใช้ทิศทางตรงกันข้าม
```

กลับไปที่ตัวอย่างก่อนหน้า:

```shell
const hello = "world";
```

เมื่อเคอร์เซอร์ของคุณอยู่ที่จุดเริ่มต้นของบรรทัด คุณสามารถไปยังตัวอักษรสุดท้ายในบรรทัดปัจจุบัน (";") ด้วยการกดปุ่มเดียว: `$` หากคุณต้องการไปที่ "w" ใน "world" คุณสามารถใช้ `fw` เคล็ดลับที่ดีในการไปที่ใดก็ได้ในบรรทัดคือการมองหาตัวอักษรที่พบได้น้อยที่สุด เช่น "j", "x", "z" ใกล้กับเป้าหมายของคุณ

## การนำทางประโยคและย่อหน้า

หน่วยการนำทางถัดไปคือประโยคและย่อหน้า

มาพูดถึงว่าประโยคคืออะไร ประโยคจะสิ้นสุดด้วย `. ! ?` ตามด้วย EOL, ช่องว่าง หรือแท็บ คุณสามารถกระโดดไปยังประโยคถัดไปด้วย `)` และประโยคก่อนหน้าด้วย `(`

```shell
(    กระโดดไปยังประโยคก่อนหน้า
)    กระโดดไปยังประโยคถัดไป
```

มาดูตัวอย่างกัน คุณคิดว่าวลีไหนเป็นประโยคและวลีไหนไม่ใช่? ลองนำทางด้วย `(` และ `)` ใน Vim!

```shell
I am a sentence. I am another sentence because I end with a period. I am still a sentence when ending with an exclamation point! What about question mark? I am not quite a sentence because of the hyphen - and neither semicolon ; nor colon :

There is an empty line above me.
```

โดยวิธีการ หากคุณมีปัญหากับ Vim ที่ไม่ได้นับประโยคสำหรับวลีที่แยกด้วย `.` ตามด้วยบรรทัดเดียว คุณอาจอยู่ในโหมด `'compatible'` เพิ่ม `set nocompatible` ลงใน vimrc ใน Vi ประโยคคือ `.` ตามด้วย **สอง** ช่องว่าง คุณควรตั้งค่า `nocompatible` ตลอดเวลา

มาพูดถึงว่าย่อหน้าคืออะไร ย่อหน้าจะเริ่มต้นหลังจากแต่ละบรรทัดว่างและยังเริ่มต้นที่แต่ละชุดของแมโครย่อหน้าที่กำหนดโดยคู่ของอักขระในตัวเลือกย่อหน้า

```shell
{    กระโดดไปยังย่อหน้าก่อนหน้า
}    กระโดดไปยังย่อหน้าถัดไป
```

หากคุณไม่แน่ใจว่าแมโครย่อหน้าคืออะไร อย่ากังวล สิ่งสำคัญคือย่อหน้าจะเริ่มต้นและสิ้นสุดหลังจากบรรทัดว่าง สิ่งนี้ควรเป็นจริงในเกือบทุกกรณี

มาดูตัวอย่างนี้ ลองนำทางรอบ ๆ ด้วย `}` และ `{` (นอกจากนี้ เล่นรอบ ๆ กับการนำทางประโยค `( )` เพื่อเคลื่อนที่ไปรอบ ๆ ด้วย!)

```shell
Hello. How are you? I am great, thanks!
Vim is awesome.
It may not easy to learn it at first...- but we are in this together. Good luck!

Hello again.

Try to move around with ), (, }, and {. Feel how they work.
You got this.
```

ตรวจสอบ `:h sentence` และ `:h paragraph` เพื่อเรียนรู้เพิ่มเติม

## การนำทางการจับคู่

โปรแกรมเมอร์เขียนและแก้ไขโค้ด โค้ดมักใช้วงเล็บ, ปีกกา, และวงเล็บเหลี่ยม คุณสามารถหลงทางในนั้นได้ง่าย หากคุณอยู่ภายในหนึ่ง คุณสามารถกระโดดไปยังคู่ที่อื่น (ถ้ามี) ด้วย `%` คุณยังสามารถใช้สิ่งนี้เพื่อตรวจสอบว่าคุณมีวงเล็บ, ปีกกา, และวงเล็บเหลี่ยมที่ตรงกันหรือไม่

```shell
%    นำทางไปยังการจับคู่ที่อื่น โดยปกติจะใช้สำหรับ (), [], {}
```

มาดูตัวอย่างโค้ด Scheme เพราะมันใช้วงเล็บอย่างกว้างขวาง เคลื่อนที่ไปรอบ ๆ ด้วย `%` ภายในวงเล็บต่าง ๆ

```shell
(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
        (else
          (+ (fib (- n 1)) (fib (- n 2)))
        )))
```

ฉันชอบที่จะเสริม `%` ด้วยปลั๊กอินตัวบ่งชี้ภาพเช่น [vim-rainbow](https://github.com/frazrepo/vim-rainbow) สำหรับข้อมูลเพิ่มเติม ตรวจสอบ `:h %`

## การนำทางหมายเลขบรรทัด

คุณสามารถกระโดดไปยังหมายเลขบรรทัด `n` ด้วย `nG` ตัวอย่างเช่น หากคุณต้องการกระโดดไปยังบรรทัด 7 ใช้ `7G` หากต้องการกระโดดไปยังบรรทัดแรก ใช้ `1G` หรือ `gg` หากต้องการกระโดดไปยังบรรทัดสุดท้าย ใช้ `G`

บ่อยครั้งที่คุณไม่รู้ว่าหมายเลขบรรทัดที่เป้าหมายของคุณคืออะไร แต่คุณรู้ว่ามันอยู่ประมาณ 70% ของไฟล์ทั้งหมด ในกรณีนี้ คุณสามารถทำ `70%` หากต้องการกระโดดไปยังกลางไฟล์ คุณสามารถทำ `50%`

```shell
gg    ไปยังบรรทัดแรก
G     ไปยังบรรทัดสุดท้าย
nG    ไปยังบรรทัด n
n%    ไปยัง n% ในไฟล์
```

โดยวิธีการ หากคุณต้องการดูจำนวนบรรทัดทั้งหมดในไฟล์ คุณสามารถใช้ `Ctrl-g`

## การนำทางหน้าต่าง

เพื่อไปยังด้านบน กลาง หรือด้านล่างของ *หน้าต่าง* ของคุณอย่างรวดเร็ว คุณสามารถใช้ `H`, `M`, และ `L`

คุณยังสามารถส่งจำนวนไปยัง `H` และ `L` หากคุณใช้ `10H` คุณจะไป 10 บรรทัดด้านล่างสุดของหน้าต่าง หากคุณใช้ `3L` คุณจะไป 3 บรรทัดด้านบนสุดของบรรทัดสุดท้ายของหน้าต่าง

```shell
H     ไปยังด้านบนของหน้าจอ
M     ไปยังกลางหน้าจอ
L     ไปยังด้านล่างของหน้าจอ
nH    ไป n บรรทัดจากด้านบน
nL    ไป n บรรทัดจากด้านล่าง
```

## การเลื่อน

ในการเลื่อน คุณมีการเพิ่มความเร็ว 3 ระดับ: เต็มหน้าจอ (`Ctrl-F/Ctrl-B`), ครึ่งหน้าจอ (`Ctrl-D/Ctrl-U`), และบรรทัด (`Ctrl-E/Ctrl-Y`)

```shell
Ctrl-E    เลื่อนลงหนึ่งบรรทัด
Ctrl-D    เลื่อนลงครึ่งหน้าจอ
Ctrl-F    เลื่อนลงทั้งหน้าจอ
Ctrl-Y    เลื่อนขึ้นหนึ่งบรรทัด

## การนำทางค้นหา

บ่อยครั้งที่คุณรู้ว่ามีวลีอยู่ภายในไฟล์ คุณสามารถใช้การนำทางค้นหาเพื่อไปยังเป้าหมายของคุณได้อย่างรวดเร็ว เพื่อค้นหาวลี คุณสามารถใช้ `/` เพื่อค้นหาข้างหน้าและ `?` เพื่อค้นหาข้างหลัง เพื่อทำซ้ำการค้นหาครั้งล่าสุดคุณสามารถใช้ `n` และเพื่อทำซ้ำการค้นหาครั้งล่าสุดในทิศทางตรงกันข้ามคุณสามารถใช้ `N`

```shell
/    ค้นหาข้างหน้าสำหรับการจับคู่
?    ค้นหาข้างหลังสำหรับการจับคู่
n    ทำซ้ำการค้นหาครั้งล่าสุดในทิศทางเดียวกับการค้นหาครั้งก่อน
N    ทำซ้ำการค้นหาครั้งล่าสุดในทิศทางตรงกันข้ามกับการค้นหาครั้งก่อน
```

สมมติว่าคุณมีข้อความนี้:

```shell
let one = 1;
let two = 2;
one = "01";
one = "one";
let onetwo = 12;
```

ถ้าคุณกำลังค้นหา "let" ให้รัน `/let` เพื่อค้นหา "let" อีกครั้งอย่างรวดเร็ว คุณสามารถทำได้เพียงแค่ `n` เพื่อค้นหา "let" อีกครั้งในทิศทางตรงกันข้าม ให้รัน `N` หากคุณรัน `?let` มันจะค้นหา "let" ย้อนกลับ หากคุณใช้ `n` มันจะค้นหา "let" ย้อนกลับ (`N` จะค้นหา "let" ข้างหน้าในตอนนี้)

คุณสามารถเปิดใช้งานการเน้นการค้นหาด้วย `set hlsearch` ตอนนี้เมื่อคุณค้นหา `/let` มันจะเน้น *ทุก* วลีที่ตรงกันในไฟล์ นอกจากนี้คุณสามารถตั้งค่าการค้นหาแบบเพิ่มขึ้นด้วย `set incsearch` ซึ่งจะเน้นรูปแบบขณะพิมพ์ โดยค่าเริ่มต้น วลีที่ตรงกันของคุณจะยังคงถูกเน้นจนกว่าคุณจะค้นหาวลีอื่น นี่อาจกลายเป็นความรำคาญได้อย่างรวดเร็ว เพื่อปิดการเน้น คุณสามารถรัน `:nohlsearch` หรือเพียงแค่ `:noh` เนื่องจากฉันใช้ฟีเจอร์ไม่เน้นนี้บ่อยครั้ง ฉันจึงสร้างแผนที่ใน vimrc:

```shell
nnoremap <esc><esc> :noh<return><esc>
```

คุณสามารถค้นหาข้อความใต้เคอร์เซอร์ได้อย่างรวดเร็วด้วย `*` เพื่อค้นหาข้างหน้าและ `#` เพื่อค้นหาข้างหลัง หากเคอร์เซอร์ของคุณอยู่ที่สตริง "one" การกด `*` จะเหมือนกับการทำ `/\<one\>`

ทั้ง `\<` และ `\>` ใน `/\<one\>` หมายถึงการค้นหาคำทั้งหมด มันจะไม่ตรงกับ "one" หากมันเป็นส่วนหนึ่งของคำที่ใหญ่กว่า มันจะตรงกับคำว่า "one" แต่ไม่ใช่ "onetwo" หากเคอร์เซอร์ของคุณอยู่เหนือ "one" และคุณต้องการค้นหาข้างหน้าเพื่อตรงกับคำทั้งหมดหรือบางส่วนเช่น "one" และ "onetwo" คุณจำเป็นต้องใช้ `g*` แทน `*`

```shell
*     ค้นหาคำทั้งหมดใต้เคอร์เซอร์ข้างหน้า
#     ค้นหาคำทั้งหมดใต้เคอร์เซอร์ย้อนกลับ
g*    ค้นหาคำใต้เคอร์เซอร์ข้างหน้า
g#    ค้นหาคำใต้เคอร์เซอร์ย้อนกลับ
```

## การทำเครื่องหมายตำแหน่ง

คุณสามารถใช้เครื่องหมายเพื่อบันทึกตำแหน่งปัจจุบันของคุณและกลับไปที่ตำแหน่งนี้ในภายหลัง มันเหมือนกับการทำเครื่องหมายสำหรับการแก้ไขข้อความ คุณสามารถตั้งค่าเครื่องหมายด้วย `mx` โดยที่ `x` สามารถเป็นตัวอักษรภาษาอังกฤษใด ๆ `a-zA-Z` มีสองวิธีในการกลับไปที่เครื่องหมาย: แบบแม่นยำ (บรรทัดและคอลัมน์) ด้วย `` `x `` และแบบบรรทัด (`'x`)

```shell
ma    ทำเครื่องหมายตำแหน่งด้วยเครื่องหมาย "a"
`a    กระโดดไปยังบรรทัดและคอลัมน์ "a"
'a    กระโดดไปยังบรรทัด "a"
```

มีความแตกต่างระหว่างการทำเครื่องหมายด้วยตัวอักษรตัวพิมพ์เล็ก (a-z) และตัวพิมพ์ใหญ่ (A-Z) ตัวอักษรตัวพิมพ์เล็กเป็นเครื่องหมายท้องถิ่นและตัวอักษรตัวพิมพ์ใหญ่เป็นเครื่องหมายทั่วโลก (บางครั้งเรียกว่าเครื่องหมายไฟล์)

มาพูดคุยเกี่ยวกับเครื่องหมายท้องถิ่นกัน แต่ละบัฟเฟอร์สามารถมีชุดเครื่องหมายท้องถิ่นของตนเอง หากฉันมีไฟล์สองไฟล์เปิดอยู่ ฉันสามารถตั้งค่าเครื่องหมาย "a" (`ma`) ในไฟล์แรกและอีกเครื่องหมาย "a" (`ma`) ในไฟล์ที่สอง

แตกต่างจากเครื่องหมายท้องถิ่นที่คุณสามารถมีชุดเครื่องหมายในแต่ละบัฟเฟอร์ คุณจะได้รับเพียงชุดเดียวของเครื่องหมายทั่วโลก หากคุณตั้งค่า `mA` ภายใน `myFile.txt` ครั้งถัดไปที่คุณรัน `mA` ในไฟล์ที่แตกต่างกัน มันจะเขียนทับเครื่องหมาย "A" แรก เครื่องหมายทั่วโลกมีข้อดีคือคุณสามารถกระโดดไปยังเครื่องหมายทั่วโลกใด ๆ แม้ว่าคุณจะอยู่ภายในโปรเจ็กต์ที่แตกต่างกันโดยสิ้นเชิง เครื่องหมายทั่วโลกสามารถเดินทางข้ามไฟล์ได้

เพื่อดูเครื่องหมายทั้งหมด ใช้ `:marks` คุณอาจสังเกตเห็นจากรายการเครื่องหมายว่ามีเครื่องหมายมากกว่าที่ `a-zA-Z` บางส่วนของพวกเขาคือ:

```shell
''    กระโดดกลับไปยังบรรทัดสุดท้ายในบัฟเฟอร์ปัจจุบันก่อนกระโดด
``    กระโดดกลับไปยังตำแหน่งสุดท้ายในบัฟเฟอร์ปัจจุบันก่อนกระโดด
`[    กระโดดไปยังจุดเริ่มต้นของข้อความที่เปลี่ยนแปลง / คัดลอกก่อนหน้า
`]    กระโดดไปยังจุดสิ้นสุดของข้อความที่เปลี่ยนแปลง / คัดลอกก่อนหน้า
`<    กระโดดไปยังจุดเริ่มต้นของการเลือกแบบวิชวลล่าสุด
`>    กระโดดไปยังจุดสิ้นสุดของการเลือกแบบวิชวลล่าสุด
`0    กระโดดกลับไปยังไฟล์ที่แก้ไขล่าสุดเมื่อออกจาก vim
```

มีเครื่องหมายมากกว่าที่ระบุไว้ข้างต้น ฉันจะไม่กล่าวถึงที่นี่เพราะฉันคิดว่าพวกเขาไม่ค่อยได้ใช้ แต่ถ้าคุณสงสัยให้ตรวจสอบ `:h marks`

## กระโดด

ใน Vim คุณสามารถ "กระโดด" ไปยังไฟล์ที่แตกต่างกันหรือส่วนที่แตกต่างกันของไฟล์ด้วยการเคลื่อนไหวบางอย่าง ไม่ใช่การเคลื่อนไหวทั้งหมดที่นับเป็นการกระโดด การลงด้วย `j` ไม่ถือเป็นการกระโดด การไปที่บรรทัด 10 ด้วย `10G` ถือเป็นการกระโดด

นี่คือคำสั่งที่ Vim ถือว่าเป็นคำสั่ง "กระโดด":

```shell
'       ไปยังบรรทัดที่ทำเครื่องหมาย
`       ไปยังตำแหน่งที่ทำเครื่องหมาย
G       ไปยังบรรทัด
/       ค้นหาข้างหน้า
?       ค้นหาข้างหลัง
n       ทำซ้ำการค้นหาครั้งล่าสุดในทิศทางเดียวกัน
N       ทำซ้ำการค้นหาครั้งล่าสุดในทิศทางตรงกันข้าม
%       หาแมตช์
(       ไปยังประโยคสุดท้าย
)       ไปยังประโยคถัดไป
{       ไปยังย่อหน้าสุดท้าย
}       ไปยังย่อหน้าถัดไป
L       ไปยังบรรทัดสุดท้ายของหน้าต่างที่แสดง
M       ไปยังบรรทัดกลางของหน้าต่างที่แสดง
H       ไปยังบรรทัดบนสุดของหน้าต่างที่แสดง
[[      ไปยังส่วนก่อนหน้า
]]      ไปยังส่วนถัดไป
:s      แทนที่
:tag    กระโดดไปยังการกำหนดแท็ก
```

ฉันไม่แนะนำให้จดจำรายการนี้ กฎที่ดีคือ การเคลื่อนไหวใด ๆ ที่เคลื่อนที่ไกลกว่าหนึ่งคำและการนำทางบรรทัดปัจจุบันน่าจะเป็นการกระโดด Vim จะติดตามว่าคุณเคยไปที่ไหนเมื่อคุณเคลื่อนที่ไปรอบ ๆ และคุณสามารถดูรายการนี้ภายใน `:jumps` 

สำหรับข้อมูลเพิ่มเติมให้ตรวจสอบ `:h jump-motions`

ทำไมการกระโดดถึงมีประโยชน์? เพราะคุณสามารถนำทางรายการกระโดดด้วย `Ctrl-O` เพื่อเลื่อนขึ้นในรายการกระโดดและ `Ctrl-I` เพื่อเลื่อนลงในรายการกระโดด `hjkl` ไม่ใช่คำสั่ง "กระโดด" แต่คุณสามารถเพิ่มตำแหน่งปัจจุบันไปยังรายการกระโดดด้วย `m'` ก่อนการเคลื่อนไหว ตัวอย่างเช่น `m'5j` จะเพิ่มตำแหน่งปัจจุบันไปยังรายการกระโดดและไปข้างล่าง 5 บรรทัด และคุณสามารถกลับมาได้ด้วย `Ctrl-O` คุณสามารถกระโดดข้ามไฟล์ที่แตกต่างกัน ซึ่งฉันจะพูดถึงเพิ่มเติมในส่วนถัดไป

## เรียนรู้การนำทางอย่างชาญฉลาด

หากคุณเป็นมือใหม่ใน Vim นี่คือสิ่งที่ต้องเรียนรู้มากมาย ฉันไม่คาดหวังให้ใครจำทุกอย่างได้ทันที มันต้องใช้เวลาจนกว่าคุณจะสามารถดำเนินการได้โดยไม่ต้องคิด

ฉันคิดว่าวิธีที่ดีที่สุดในการเริ่มต้นคือการจดจำการเคลื่อนไหวที่จำเป็นไม่กี่อย่าง ฉันแนะนำให้เริ่มต้นด้วยการเคลื่อนไหว 10 อย่างนี้: `h, j, k, l, w, b, G, /, ?, n` ทำซ้ำพวกมันให้เพียงพอจนกว่าคุณจะสามารถใช้พวกมันได้โดยไม่ต้องคิด

เพื่อปรับปรุงทักษะการนำทางของคุณ นี่คือคำแนะนำของฉัน:
1. สังเกตการกระทำที่ทำซ้ำ หากคุณพบว่าตัวเองทำ `l` ซ้ำ ๆ ให้มองหาการเคลื่อนไหวที่จะพาคุณไปข้างหน้าได้เร็วขึ้น คุณจะพบว่าคุณสามารถใช้ `w` หากคุณจับได้ว่าตัวเองทำ `w` ซ้ำ ๆ ให้ดูว่ามีการเคลื่อนไหวที่สามารถพาคุณข้ามบรรทัดปัจจุบันได้อย่างรวดเร็ว คุณจะพบว่าคุณสามารถใช้ `f` หากคุณสามารถอธิบายความต้องการของคุณได้อย่างกระชับ มีโอกาสดีที่ Vim จะมีวิธีทำมัน
2. ทุกครั้งที่คุณเรียนรู้การเคลื่อนไหวใหม่ ใช้เวลาสักครู่จนกว่าคุณจะสามารถทำได้โดยไม่ต้องคิด

สุดท้ายนี้ ตระหนักว่าคุณไม่จำเป็นต้องรู้คำสั่ง Vim ทุกคำสั่งเพื่อให้มีประสิทธิภาพ ผู้ใช้ Vim ส่วนใหญ่ไม่รู้ ฉันก็ไม่รู้ เรียนรู้คำสั่งที่ช่วยให้คุณทำงานให้สำเร็จในขณะนั้น

ใช้เวลาของคุณ ทักษะการนำทางเป็นทักษะที่สำคัญมากใน Vim เรียนรู้สิ่งเล็ก ๆ หนึ่งอย่างทุกวันและเรียนรู้ให้ดี