---
description: इस दस्तावेज़ में, हम Vim रजिस्टर के 10 प्रकारों और उनके कुशल उपयोग के
  तरीकों पर चर्चा करेंगे, जो आपके टाइपिंग को आसान बनाएंगे।
title: Ch08. Registers
---

Vim रजिस्टर सीखना पहली बार बीजगणित सीखने के समान है। आपको नहीं लगा कि आपको इसकी आवश्यकता है जब तक कि आपको इसकी आवश्यकता नहीं हुई।

आपने शायद Vim रजिस्टर का उपयोग तब किया जब आपने किसी टेक्स्ट को यांक किया या हटाया और फिर इसे `p` या `P` के साथ चिपकाया। हालाँकि, क्या आप जानते थे कि Vim में 10 विभिन्न प्रकार के रजिस्टर होते हैं? सही तरीके से उपयोग करने पर, Vim रजिस्टर आपको दोहराए जाने वाले टाइपिंग से बचा सकते हैं।

इस अध्याय में, मैं सभी Vim रजिस्टर प्रकारों और उनका कुशलता से उपयोग कैसे करें, के बारे में चर्चा करूंगा।

## दस रजिस्टर प्रकार

यहाँ 10 Vim रजिस्टर प्रकार हैं:

1. अनाम रजिस्टर (`""`).
2. संख्या रजिस्टर (`"0-9`).
3. छोटा हटाने वाला रजिस्टर (`"-`).
4. नामित रजिस्टर (`"a-z`).
5. केवल पढ़ने योग्य रजिस्टर (`":`, `".`, और `"%`).
6. वैकल्पिक फ़ाइल रजिस्टर (`"#`).
7. अभिव्यक्ति रजिस्टर (`"=`).
8. चयन रजिस्टर (`"*` और `"+`).
9. काले छिद्र रजिस्टर (`"_`).
10. अंतिम खोज पैटर्न रजिस्टर (`"/`).

## रजिस्टर ऑपरेटर

रजिस्टर का उपयोग करने के लिए, आपको पहले उन्हें ऑपरेटर के साथ स्टोर करना होगा। यहाँ कुछ ऑपरेटर हैं जो रजिस्टर में मान स्टोर करते हैं:

```shell
y    यांक (कॉपी)
c    टेक्स्ट हटाएं और इनसर्ट मोड शुरू करें
d    टेक्स्ट हटाएं
```

और भी ऑपरेटर हैं (जैसे `s` या `x`), लेकिन ऊपर दिए गए उपयोगी हैं। सामान्य नियम यह है कि, यदि कोई ऑपरेटर टेक्स्ट हटा सकता है, तो यह शायद टेक्स्ट को रजिस्टर में स्टोर करता है।

रजिस्टर से टेक्स्ट चिपकाने के लिए, आप उपयोग कर सकते हैं:

```shell
p    कर्सर के बाद टेक्स्ट चिपकाएं
P    कर्सर के पहले टेक्स्ट चिपकाएं
```

दोनों `p` और `P` एक गिनती और एक रजिस्टर प्रतीक को तर्क के रूप में स्वीकार करते हैं। उदाहरण के लिए, दस बार चिपकाने के लिए, `10p` करें। रजिस्टर a से टेक्स्ट चिपकाने के लिए, `"ap` करें। रजिस्टर a से टेक्स्ट को दस बार चिपकाने के लिए, `10"ap` करें। वैसे, `p` वास्तव में तकनीकी रूप से "put" के लिए खड़ा है, "paste" के लिए नहीं, लेकिन मुझे लगता है कि चिपकाना एक अधिक पारंपरिक शब्द है।

विशिष्ट रजिस्टर से सामग्री प्राप्त करने के लिए सामान्य सिंटैक्स `"a` है, जहाँ `a` रजिस्टर प्रतीक है।

## इनसर्ट मोड से रजिस्टर कॉल करना

इस अध्याय में आप जो कुछ भी सीखते हैं, उसे इनसर्ट मोड में भी निष्पादित किया जा सकता है। रजिस्टर a से टेक्स्ट प्राप्त करने के लिए, सामान्यतः आप `"ap` करते हैं। लेकिन यदि आप इनसर्ट मोड में हैं, तो `Ctrl-R a` चलाएँ। इनसर्ट मोड से रजिस्टर को कॉल करने का सिंटैक्स है:

```shell
Ctrl-R a
```

जहाँ `a` रजिस्टर प्रतीक है। अब जब आप जानते हैं कि रजिस्टर को कैसे स्टोर और पुनः प्राप्त करना है, तो चलिए आगे बढ़ते हैं!

## अनाम रजिस्टर

अनाम रजिस्टर से टेक्स्ट प्राप्त करने के लिए, `""p` करें। यह आपके द्वारा यांक किए गए, बदले गए, या हटाए गए अंतिम टेक्स्ट को स्टोर करता है। यदि आप एक और यांक, परिवर्तन, या हटाते हैं, तो Vim स्वचालित रूप से पुराने टेक्स्ट को बदल देगा। अनाम रजिस्टर एक कंप्यूटर के मानक कॉपी / पेस्ट ऑपरेशन के समान है।

डिफ़ॉल्ट रूप से, `p` (या `P`) अनाम रजिस्टर से जुड़ा होता है (अब से मैं अनाम रजिस्टर को `p` के साथ संदर्भित करूंगा बजाय `""p` के)।

## संख्या रजिस्टर

संख्यात्मक रजिस्टर स्वचालित रूप से बढ़ते क्रम में भरते हैं। दो विभिन्न संख्या रजिस्टर हैं: यांक किया गया रजिस्टर (`0`) और संख्या रजिस्टर (`1-9`)। पहले हम यांक किया गया रजिस्टर पर चर्चा करते हैं।

### यांक किया गया रजिस्टर

यदि आप टेक्स्ट की पूरी लाइन को यांक करते हैं (`yy`), तो Vim वास्तव में उस टेक्स्ट को दो रजिस्टर में सहेजता है:

1. अनाम रजिस्टर (`p`).
2. यांक किया गया रजिस्टर (`"0p`).

जब आप एक अलग टेक्स्ट यांक करते हैं, तो Vim दोनों यांक किए गए रजिस्टर और अनाम रजिस्टर को अपडेट करेगा। कोई अन्य ऑपरेशन (जैसे हटाना) रजिस्टर 0 में स्टोर नहीं किया जाएगा। इसका उपयोग आपके लाभ के लिए किया जा सकता है, क्योंकि जब तक आप एक और यांक नहीं करते, यांक किया गया टेक्स्ट हमेशा वहाँ रहेगा, चाहे आप कितने भी परिवर्तन और हटाने करें।

उदाहरण के लिए, यदि आप:
1. एक लाइन यांक करें (`yy`)
2. एक लाइन हटाएं (`dd`)
3. एक और लाइन हटाएं (`dd`)

तो यांक किया गया रजिस्टर पहले चरण से टेक्स्ट रखेगा।

यदि आप:
1. एक लाइन यांक करें (`yy`)
2. एक लाइन हटाएं (`dd`)
3. एक और लाइन यांक करें (`yy`)

तो यांक किया गया रजिस्टर तीसरे चरण से टेक्स्ट रखेगा।

एक अंतिम टिप, इनसर्ट मोड में रहते हुए, आप `Ctrl-R 0` का उपयोग करके तुरंत उस टेक्स्ट को चिपका सकते हैं जिसे आपने अभी यांक किया है।

### गैर-शून्य संख्या रजिस्टर

जब आप एक टेक्स्ट को बदलते या हटाते हैं जो कम से कम एक लाइन लंबा होता है, तो वह टेक्स्ट संख्या रजिस्टर 1-9 में सबसे हाल के क्रम में स्टोर किया जाएगा।

उदाहरण के लिए, यदि आपके पास ये लाइनें हैं:

```shell
line three
line two
line one
```

जब आपका कर्सर "line three" पर हो, तो उन्हें एक-एक करके `dd` के साथ हटाएं। जब सभी लाइनें हटा दी जाएँ, तो रजिस्टर 1 में "line one" (सबसे हाल का), रजिस्टर दो में "line two" (दूसरा सबसे हाल का), और रजिस्टर तीन में "line three" (सबसे पुराना) होना चाहिए। रजिस्टर एक से सामग्री प्राप्त करने के लिए, `"1p` करें।

एक साइड नोट के रूप में, ये संख्या रजिस्टर डॉट कमांड का उपयोग करते समय स्वचालित रूप से बढ़ाए जाते हैं। यदि आपका संख्या रजिस्टर एक (`"1`) "line one" रखता है, रजिस्टर दो (`"2`) "line two", और रजिस्टर तीन (`"3`) "line three", तो आप इस ट्रिक के साथ उन्हें अनुक्रम में चिपका सकते हैं:
- `"1P` करें रजिस्टर एक ("1) से सामग्री चिपकाने के लिए।
- `.` करें रजिस्टर दो ("2) से सामग्री चिपकाने के लिए।
- `.` करें रजिस्टर तीन ("3) से सामग्री चिपकाने के लिए।

यह ट्रिक किसी भी संख्या रजिस्टर के साथ काम करती है। यदि आपने `"5P` से शुरू किया, तो `.` `"6P` करेगा, `.` फिर `"7P` करेगा, और इसी तरह।

शब्द हटाने जैसे छोटे हटाने (`dw`) या शब्द परिवर्तन (`cw`) संख्या रजिस्टर में स्टोर नहीं होते। इन्हें छोटे हटाने वाले रजिस्टर (`"-`) में स्टोर किया जाता है, जिसके बारे में मैं अगली बार चर्चा करूंगा।

## छोटा हटाने वाला रजिस्टर

एक लाइन से कम परिवर्तन या हटाने संख्या रजिस्टर 0-9 में स्टोर नहीं होते, बल्कि छोटे हटाने वाले रजिस्टर (`"-`) में होते हैं।

उदाहरण के लिए:
1. एक शब्द हटाएं (`diw`)
2. एक लाइन हटाएं (`dd`)
3. एक लाइन हटाएं (`dd`)

`"-p` आपको पहले चरण से हटाए गए शब्द को देता है।

एक और उदाहरण:
1. मैं एक शब्द हटाता हूँ (`diw`)
2. मैं एक लाइन हटाता हूँ (`dd`)
3. मैं एक शब्द हटाता हूँ (`diw`)

`"-p` आपको तीसरे चरण से हटाए गए शब्द को देता है। `"1p` आपको दूसरे चरण से हटाई गई लाइन देता है। दुर्भाग्य से, पहले चरण से हटाए गए शब्द को पुनः प्राप्त करने का कोई तरीका नहीं है क्योंकि छोटा हटाने वाला रजिस्टर केवल एक आइटम स्टोर करता है। हालाँकि, यदि आप पहले चरण से टेक्स्ट को संरक्षित करना चाहते हैं, तो आप इसे नामित रजिस्टर के साथ कर सकते हैं।

## नामित रजिस्टर

नामित रजिस्टर Vim के सबसे बहुपरकारी रजिस्टर हैं। यह रजिस्टर a-z में यांक किए गए, बदले गए, और हटाए गए टेक्स्ट को स्टोर कर सकता है। पिछले 3 रजिस्टर प्रकारों के विपरीत जो स्वचालित रूप से टेक्स्ट को रजिस्टर में स्टोर करते हैं, आपको स्पष्ट रूप से Vim को नामित रजिस्टर का उपयोग करने के लिए बताना होगा, जिससे आपको पूर्ण नियंत्रण मिलता है।

एक शब्द को रजिस्टर a में यांक करने के लिए, आप `"ayiw` कर सकते हैं।
- `"a` Vim को बताता है कि अगली क्रिया (हटाना / बदलना / यांक करना) रजिस्टर a में स्टोर की जाएगी।
- `yiw` शब्द को यांक करता है।

रजिस्टर a से टेक्स्ट प्राप्त करने के लिए, `"ap` चलाएँ। आप नामित रजिस्टर के साथ बाईस अलग-अलग टेक्स्ट को स्टोर करने के लिए सभी छब्बीस वर्णमाला के अक्षरों का उपयोग कर सकते हैं।

कभी-कभी आप अपने मौजूदा नामित रजिस्टर में जोड़ना चाह सकते हैं। इस मामले में, आप अपने टेक्स्ट को जोड़ सकते हैं बजाय इसके कि आप फिर से शुरू करें। ऐसा करने के लिए, आप उस रजिस्टर का अपरकेस संस्करण उपयोग कर सकते हैं। उदाहरण के लिए, मान लीजिए कि आपके पास रजिस्टर a में पहले से "Hello " शब्द स्टोर है। यदि आप रजिस्टर a में "world" जोड़ना चाहते हैं, तो आप टेक्स्ट "world" खोज सकते हैं और इसे A रजिस्टर (`"Ayiw`) का उपयोग करके यांक कर सकते हैं।

## केवल पढ़ने योग्य रजिस्टर

Vim में तीन केवल पढ़ने योग्य रजिस्टर होते हैं: `.`, `:`, और `%`। उनका उपयोग करना काफी सरल है:

```shell
.    अंतिम डाले गए टेक्स्ट को स्टोर करता है
:    अंतिम निष्पादित कमांड-लाइन को स्टोर करता है
%    वर्तमान फ़ाइल का नाम स्टोर करता है
```

यदि आपका अंतिम लिखा गया टेक्स्ट "Hello Vim" था, तो `".p` चलाने पर "Hello Vim" टेक्स्ट प्रिंट होगा। यदि आप वर्तमान फ़ाइल का नाम प्राप्त करना चाहते हैं, तो `"%p` चलाएँ। यदि आप `:s/foo/bar/g` कमांड चलाते हैं, तो `":p` चलाने पर "s/foo/bar/g" टेक्स्ट प्रिंट होगा।

## वैकल्पिक फ़ाइल रजिस्टर

Vim में, `#` आमतौर पर वैकल्पिक फ़ाइल का प्रतिनिधित्व करता है। एक वैकल्पिक फ़ाइल वह अंतिम फ़ाइल है जिसे आपने खोला था। वैकल्पिक फ़ाइल का नाम डालने के लिए, आप `"#p` का उपयोग कर सकते हैं।

## अभिव्यक्ति रजिस्टर

Vim में एक अभिव्यक्ति रजिस्टर है, `"=`, जो अभिव्यक्तियों का मूल्यांकन करता है।

गणितीय अभिव्यक्तियों `1 + 1` का मूल्यांकन करने के लिए, चलाएँ:

```shell
"=1+1<Enter>p
```

यहाँ, आप Vim को बता रहे हैं कि आप अभिव्यक्ति रजिस्टर का उपयोग कर रहे हैं `"=` के साथ। आपकी अभिव्यक्ति है (`1 + 1`). परिणाम प्राप्त करने के लिए आपको `p` टाइप करना होगा। जैसा कि पहले उल्लेख किया गया है, आप इनसर्ट मोड से भी रजिस्टर तक पहुँच सकते हैं। इनसर्ट मोड से गणितीय अभिव्यक्ति का मूल्यांकन करने के लिए, आप कर सकते हैं:

```shell
Ctrl-R =1+1
```

आप किसी भी रजिस्टर से मान प्राप्त कर सकते हैं अभिव्यक्ति रजिस्टर के साथ `@` जोड़कर। यदि आप रजिस्टर a से टेक्स्ट प्राप्त करना चाहते हैं:

```shell
"=@a
```

फिर `<Enter>` दबाएँ, फिर `p`। इसी तरह, इनसर्ट मोड में रजिस्टर a से मान प्राप्त करने के लिए:

```shell
Ctrl-r =@a
```

अभिव्यक्ति Vim में एक विशाल विषय है, इसलिए मैं यहाँ केवल मूल बातें कवर करूंगा। मैं बाद में Vimscript अध्यायों में अभिव्यक्तियों पर अधिक विस्तार से चर्चा करूंगा।

## चयन रजिस्टर

क्या आपको कभी-कभी यह इच्छा नहीं होती कि आप बाहरी कार्यक्रमों से टेक्स्ट कॉपी कर सकें और उसे स्थानीय रूप से Vim में चिपका सकें, और इसके विपरीत? Vim के चयन रजिस्टर के साथ, आप ऐसा कर सकते हैं। Vim में दो चयन रजिस्टर होते हैं: `quotestar` (`"*`) और `quoteplus` (`"+`)। आप इन्हें बाहरी कार्यक्रमों से कॉपी किए गए टेक्स्ट तक पहुँचने के लिए उपयोग कर सकते हैं।

यदि आप एक बाहरी कार्यक्रम (जैसे Chrome ब्राउज़र) पर हैं और आप `Ctrl-C` (या `Cmd-C`, आपके OS के आधार पर) के साथ टेक्स्ट का एक ब्लॉक कॉपी करते हैं, तो सामान्यतः आप Vim में टेक्स्ट चिपकाने के लिए `p` का उपयोग नहीं कर पाएंगे। हालाँकि, Vim के दोनों `"+` और `"*` आपके क्लिपबोर्ड से जुड़े होते हैं, इसलिए आप वास्तव में टेक्स्ट को `"+p` या `"*p` के साथ चिपका सकते हैं। इसके विपरीत, यदि आप Vim से `"+yiw` या `"*yiw` के साथ एक शब्द यांक करते हैं, तो आप उस टेक्स्ट को बाहरी कार्यक्रम में `Ctrl-V` (या `Cmd-V`) के साथ चिपका सकते हैं। ध्यान दें कि यह केवल तभी काम करता है जब आपका Vim प्रोग्राम `+clipboard` विकल्प के साथ आता है (इसे जांचने के लिए, `:version` चलाएँ)।

आप सोच सकते हैं कि यदि `"*` और `"+` एक ही काम करते हैं, तो Vim में दो अलग-अलग रजिस्टर क्यों हैं? कुछ मशीनें X11 विंडो सिस्टम का उपयोग करती हैं। इस सिस्टम में 3 प्रकार के चयन होते हैं: प्राथमिक, द्वितीयक, और क्लिपबोर्ड। यदि आपकी मशीन X11 का उपयोग करती है, तो Vim X11 के *प्राथमिक* चयन के साथ `quotestar` (`"*`) रजिस्टर और X11 के *क्लिपबोर्ड* चयन के साथ `quoteplus` (`"+`) रजिस्टर का उपयोग करता है। यह केवल तभी लागू होता है जब आपके Vim बिल्ड में `+xterm_clipboard` विकल्प उपलब्ध हो। यदि आपके Vim में `xterm_clipboard` नहीं है, तो यह कोई बड़ी बात नहीं है। इसका मतलब है कि दोनों `quotestar` और `quoteplus` एक दूसरे के स्थान पर उपयोग किए जा सकते हैं (मेरे पास भी नहीं है)।

मुझे `=*p` या `=+p` (या `"*p` या `"+p`) करना cumbersome लगता है। बाहरी कार्यक्रम से कॉपी किए गए टेक्स्ट को केवल `p` के साथ चिपकाने के लिए, आप अपने vimrc में यह जोड़ सकते हैं:

```shell
set clipboard=unnamed
```

अब जब मैं बाहरी कार्यक्रम से टेक्स्ट कॉपी करता हूँ, तो मैं इसे अनाम रजिस्टर `p` के साथ चिपका सकता हूँ। मैं Vim से टेक्स्ट कॉपी कर सकता हूँ और उसे बाहरी कार्यक्रम में चिपका सकता हूँ। यदि आपके पास `+xterm_clipboard` है, तो आप दोनों `unnamed` और `unnamedplus` क्लिपबोर्ड विकल्पों का उपयोग करना चाह सकते हैं।

## काले छिद्र रजिस्टर

हर बार जब आप टेक्स्ट को हटाते या बदलते हैं, तो वह टेक्स्ट स्वचालित रूप से Vim रजिस्टर में स्टोर होता है। ऐसे समय होंगे जब आप रजिस्टर में कुछ भी सहेजना नहीं चाहते। आप यह कैसे कर सकते हैं?

आप काले छिद्र रजिस्टर (`"_`) का उपयोग कर सकते हैं। एक लाइन को हटाने के लिए और यह सुनिश्चित करने के लिए कि Vim हटाई गई लाइन को किसी भी रजिस्टर में स्टोर न करे, `"_dd` का उपयोग करें।

काले छिद्र रजिस्टर रजिस्टरों के `/dev/null` के समान है।

## अंतिम खोज पैटर्न रजिस्टर

आपकी अंतिम खोज (`/` या `?`) को चिपकाने के लिए, आप अंतिम खोज पैटर्न रजिस्टर (`"/`) का उपयोग कर सकते हैं। अंतिम खोज शब्द को चिपकाने के लिए, `"/p` का उपयोग करें।

## रजिस्टर देखना

अपने सभी रजिस्टर देखने के लिए, `:register` कमांड का उपयोग करें। केवल रजिस्टर "a, "1, और "- देखने के लिए, `:register a 1 -` का उपयोग करें।

एक प्लगइन है जिसे [vim-peekaboo](https://github.com/junegunn/vim-peekaboo) कहा जाता है जो आपको सामान्य मोड में `"` या `@` और इनसर्ट मोड में `Ctrl-R` दबाने पर रजिस्टर की सामग्री में झाँक
## एक रजिस्टर को साफ करना

तकनीकी रूप से, किसी भी रजिस्टर को साफ करने की आवश्यकता नहीं है क्योंकि अगला टेक्स्ट जो आप उसी रजिस्टर नाम के तहत स्टोर करते हैं, उसे ओवरराइट कर देगा। हालाँकि, आप एक खाली मैक्रो रिकॉर्ड करके किसी भी नामित रजिस्टर को जल्दी से साफ कर सकते हैं। उदाहरण के लिए, यदि आप `qaq` चलाते हैं, तो Vim रजिस्टर a में एक खाली मैक्रो रिकॉर्ड करेगा।

एक और विकल्प है कमांड `:call setreg('a', 'hello register a')` चलाना जहाँ a रजिस्टर a है और "hello register a" वह टेक्स्ट है जिसे आप स्टोर करना चाहते हैं।

रजिस्टर को साफ करने का एक और तरीका है "a रजिस्टर की सामग्री को खाली स्ट्रिंग के साथ सेट करना `:let @a = ''` के साथ।

## एक रजिस्टर की सामग्री डालना

आप किसी भी एक रजिस्टर की सामग्री को पेस्ट करने के लिए `:put` कमांड का उपयोग कर सकते हैं। उदाहरण के लिए, यदि आप `:put a` चलाते हैं, तो Vim वर्तमान पंक्ति के नीचे रजिस्टर a की सामग्री प्रिंट करेगा। यह `"ap` की तरह व्यवहार करता है, जिसमें अंतर यह है कि सामान्य मोड कमांड `p` रजिस्टर सामग्री को कर्सर के बाद प्रिंट करता है और कमांड `:put` रजिस्टर सामग्री को नई पंक्ति पर प्रिंट करता है।

चूंकि `:put` एक कमांड-लाइन कमांड है, आप इसे एक पता पास कर सकते हैं। `:10put a` रजिस्टर a से टेक्स्ट को पंक्ति 10 के नीचे पेस्ट करेगा।

`:put` को ब्लैक होल रजिस्टर (`"_`) के साथ पास करने का एक अच्छा ट्रिक है। चूंकि ब्लैक होल रजिस्टर कोई टेक्स्ट स्टोर नहीं करता है, `:put _` एक खाली पंक्ति डाल देगा। आप इसे कई खाली पंक्तियाँ डालने के लिए वैश्विक कमांड के साथ मिला सकते हैं। उदाहरण के लिए, सभी पंक्तियों के नीचे खाली पंक्तियाँ डालने के लिए जो "end" टेक्स्ट को शामिल करती हैं, `:g/end/put _` चलाएँ। आप बाद में वैश्विक कमांड के बारे में जानेंगे।

## स्मार्ट तरीके से रजिस्टर सीखना

आप अंत तक पहुँच गए। बधाई हो! यदि आप जानकारी की प्रचुरता से अभिभूत महसूस कर रहे हैं, तो आप अकेले नहीं हैं। जब मैंने पहली बार Vim रजिस्टर के बारे में सीखना शुरू किया, तो एक बार में लेने के लिए बहुत अधिक जानकारी थी।

मुझे नहीं लगता कि आपको तुरंत सभी रजिस्टरों को याद करना चाहिए। उत्पादक बनने के लिए, आप केवल इन 3 रजिस्टरों का उपयोग करके शुरू कर सकते हैं:
1. अनाम रजिस्टर (`""`).
2. नामित रजिस्टर (`"a-z`).
3. संख्या वाले रजिस्टर (`"0-9`).

चूंकि अनाम रजिस्टर डिफ़ॉल्ट रूप से `p` और `P` पर सेट होता है, आपको केवल दो रजिस्टर सीखने की आवश्यकता है: नामित रजिस्टर और संख्या वाले रजिस्टर। जब आपको अधिक रजिस्टरों की आवश्यकता हो, तो धीरे-धीरे अधिक रजिस्टर सीखें। अपना समय लें।

औसत मानव की सीमित शॉर्ट-टर्म मेमोरी क्षमता होती है, लगभग 5 - 7 आइटम एक बार में। यही कारण है कि मेरी रोज़मर्रा की संपादन में, मैं केवल लगभग 5 - 7 नामित रजिस्टरों का उपयोग करता हूँ। मैं अपने सिर में सभी छब्बीस को याद नहीं रख सकता। मैं सामान्यतः रजिस्टर a से शुरू करता हूँ, फिर b, वर्णानुक्रम में बढ़ते हुए। इसे आजमाएँ और देखें कि कौन सी तकनीक आपके लिए सबसे अच्छी काम करती है।

Vim रजिस्टर शक्तिशाली हैं। रणनीतिक रूप से उपयोग किए जाने पर, यह आपको अनगिनत दोहराए गए टेक्स्ट टाइप करने से बचा सकता है। अगला, चलिए मैक्रोज़ के बारे में सीखते हैं।