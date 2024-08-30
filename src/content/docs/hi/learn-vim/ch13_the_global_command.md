---
description: यह दस्तावेज़ Vim के वैश्विक आदेश का परिचय देता है, जो एक साथ कई पंक्तियों
  पर कमांड-लाइन कमांड चलाने की विधि को समझाता है।
title: Ch13. the Global Command
---

अब तक आपने डॉट कमांड (`.`) के साथ अंतिम परिवर्तन को दोहराना, मैक्रोज़ (`q`) के साथ क्रियाएँ पुनः चलाना, और रजिस्टर में पाठ को संग्रहीत करना (`"`) सीखा है।

इस अध्याय में, आप वैश्विक कमांड के साथ कमांड-लाइन कमांड को दोहराना सीखेंगे।

## वैश्विक कमांड का अवलोकन

Vim का वैश्विक कमांड एक कमांड-लाइन कमांड को एक साथ कई लाइनों पर चलाने के लिए उपयोग किया जाता है।

वैसे, आपने पहले "Ex Commands" शब्द सुना होगा। इस गाइड में, मैं उन्हें कमांड-लाइन कमांड के रूप में संदर्भित करता हूँ। Ex कमांड और कमांड-लाइन कमांड समान हैं। ये वे कमांड हैं जो कोलन (`:`) से शुरू होते हैं। पिछले अध्याय में सब्स्टिट्यूट कमांड एक Ex कमांड का उदाहरण था। इन्हें Ex कहा जाता है क्योंकि ये मूल रूप से Ex टेक्स्ट संपादक से आए थे। मैं इस गाइड में उन्हें कमांड-लाइन कमांड के रूप में संदर्भित करना जारी रखूंगा। Ex कमांड की पूरी सूची के लिए, `:h ex-cmd-index` देखें।

वैश्विक कमांड का निम्नलिखित सिंटैक्स है:

```shell
:g/pattern/command
```

`pattern` उस पैटर्न को मिलाने वाली सभी लाइनों से मेल खाता है, जो सब्स्टिट्यूट कमांड में पैटर्न के समान है। `command` कोई भी कमांड-लाइन कमांड हो सकता है। वैश्विक कमांड `command` को प्रत्येक लाइन पर लागू करता है जो `pattern` से मेल खाता है।

यदि आपके पास निम्नलिखित अभिव्यक्तियाँ हैं:

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

"console" शामिल करने वाली सभी लाइनों को हटाने के लिए, आप चला सकते हैं:

```shell
:g/console/d
```

परिणाम:

```shell
const one = 1;

const two = 2;

const three = 3;
```

वैश्विक कमांड "console" पैटर्न से मेल खाने वाली सभी लाइनों पर डिलीट कमांड (`d`) को लागू करता है।

`g` कमांड चलाते समय, Vim फ़ाइल के माध्यम से दो बार स्कैन करता है। पहले रन पर, यह प्रत्येक लाइन को स्कैन करता है और `/console/` पैटर्न से मेल खाने वाली लाइन को चिह्नित करता है। एक बार सभी मेल खाने वाली लाइनों को चिह्नित करने के बाद, यह दूसरी बार जाता है और चिह्नित लाइनों पर `d` कमांड को लागू करता है।

यदि आप इसके बजाय "const" शामिल करने वाली सभी लाइनों को हटाना चाहते हैं, तो चलाएँ:

```shell
:g/const/d
```

परिणाम:

```shell
console.log("one: ", one);

console.log("two: ", two);

console.log("three: ", three);
```

## विपरीत मिलान

गैर-मिलान वाली लाइनों पर वैश्विक कमांड चलाने के लिए, आप चला सकते हैं:

```shell
:g!/pattern/command
```

या

```shell
:v/pattern/command
```

यदि आप `:v/console/d` चलाते हैं, तो यह सभी लाइनों को हटा देगा जो "console" *नहीं* शामिल करती हैं।

## पैटर्न

वैश्विक कमांड सब्स्टिट्यूट कमांड के समान पैटर्न प्रणाली का उपयोग करता है, इसलिए यह अनुभाग एक रिफ्रेशर के रूप में कार्य करेगा। अगले अनुभाग पर जाने के लिए स्वतंत्र महसूस करें या साथ पढ़ें!

यदि आपके पास ये अभिव्यक्तियाँ हैं:

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

"one" या "two" शामिल करने वाली लाइनों को हटाने के लिए, चलाएँ:

```shell
:g/one\|two/d
```

किसी भी एकल अंक शामिल करने वाली लाइनों को हटाने के लिए, चलाएँ:

```shell
:g/[0-9]/d
```

या

```shell
:g/\d/d
```

यदि आपके पास यह अभिव्यक्ति है:

```shell
const oneMillion = 1000000;
const oneThousand = 1000;
const one = 1;
```

तीन से छह ज़ीरो शामिल करने वाली लाइनों से मेल खाने के लिए, चलाएँ:

```shell
:g/0\{3,6\}/d
```

## रेंज पास करना

आप `g` कमांड से पहले एक रेंज पास कर सकते हैं। इसे करने के कुछ तरीके हैं:
- `:1,5g/console/d`  लाइनों 1 और 5 के बीच "console" स्ट्रिंग से मेल खाता है और उन्हें हटा देता है।
- `:,5g/console/d` यदि कॉमा के पहले कोई पता नहीं है, तो यह वर्तमान लाइन से शुरू होता है। यह वर्तमान लाइन और लाइन 5 के बीच "console" स्ट्रिंग की तलाश करता है और उन्हें हटा देता है।
- `:3,g/console/d` यदि कॉमा के बाद कोई पता नहीं है, तो यह वर्तमान लाइन पर समाप्त होता है। यह लाइन 3 और वर्तमान लाइन के बीच "console" स्ट्रिंग की तलाश करता है और उन्हें हटा देता है।
- `:3g/console/d` यदि आप केवल एक पता पास करते हैं बिना कॉमा के, तो यह केवल लाइन 3 पर कमांड को लागू करता है। यह लाइन 3 पर देखता है और इसे हटा देता है यदि इसमें "console" स्ट्रिंग है।

संख्याओं के अलावा, आप रेंज के रूप में इन प्रतीकों का भी उपयोग कर सकते हैं:
- `.` का अर्थ है वर्तमान लाइन। `.,3` की रेंज का अर्थ है वर्तमान लाइन और लाइन 3 के बीच।
- `$` का अर्थ है फ़ाइल में अंतिम लाइन। `3,$` रेंज का अर्थ है लाइन 3 और अंतिम लाइन के बीच।
- `+n` का अर्थ है वर्तमान लाइन के बाद n लाइनें। आप इसे `.` के साथ या बिना उपयोग कर सकते हैं। `3,+1` या `3,.+1` का अर्थ है लाइन 3 और वर्तमान लाइन के बाद की लाइन के बीच।

यदि आप कोई रेंज नहीं देते हैं, तो डिफ़ॉल्ट रूप से यह पूरे फ़ाइल पर प्रभाव डालता है। यह वास्तव में सामान्य नहीं है। अधिकांश Vim के कमांड-लाइन कमांड केवल वर्तमान लाइन पर चलते हैं यदि आप इसे कोई रेंज नहीं देते हैं। दो उल्लेखनीय अपवाद वैश्विक (`:g`) और सहेजें (`:w`) कमांड हैं।

## सामान्य कमांड

आप वैश्विक कमांड के साथ सामान्य कमांड को `:normal` कमांड-लाइन कमांड के साथ चला सकते हैं।

यदि आपके पास यह पाठ है:
```shell
const one = 1
console.log("one: ", one)

const two = 2
console.log("two: ", two)

const three = 3
console.log("three: ", three)
```

प्रत्येक लाइन के अंत में ";" जोड़ने के लिए, चलाएँ:

```shell
:g/./normal A;
```

आइए इसे तोड़ते हैं:
- `:g` वैश्विक कमांड है।
- `/./` "गैर-खाली लाइनों" के लिए एक पैटर्न है। यह कम से कम एक वर्ण वाली लाइनों से मेल खाता है, इसलिए यह "const" और "console" वाली लाइनों से मेल खाता है और यह खाली लाइनों से मेल नहीं खाता।
- `normal A;` `:normal` कमांड-लाइन कमांड को चलाता है। `A;` सामान्य मोड कमांड है जो लाइन के अंत में ";" जोड़ता है।

## मैक्रो निष्पादित करना

आप वैश्विक कमांड के साथ एक मैक्रो भी निष्पादित कर सकते हैं। एक मैक्रो को `normal` कमांड के साथ निष्पादित किया जा सकता है। यदि आपके पास ये अभिव्यक्तियाँ हैं:

```shell
const one = 1
console.log("one: ", one);

const two = 2
console.log("two: ", two);

const three = 3
console.log("three: ", three);
```

ध्यान दें कि "const" वाली लाइनों में सेमी-कोलन नहीं हैं। आइए रजिस्टर a में उन लाइनों के अंत में एक सेमी-कोलन जोड़ने के लिए एक मैक्रो बनाते हैं:

```shell
qaA;<Esc>q
```

यदि आपको रिफ्रेशर की आवश्यकता है, तो मैक्रो पर अध्याय देखें। अब चलाएँ:

```shell
:g/const/normal @a
```

अब "const" वाली सभी लाइनों के अंत में ";" होगा।

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

यदि आपने इस कदम को चरण-दर-चरण अनुसरण किया है, तो आपकी पहली लाइन पर दो सेमी-कोलन होंगे। इससे बचने के लिए, दूसरी लाइन से आगे वैश्विक कमांड चलाएँ, `:2,$g/const/normal @a`।

## पुनरावृत्त वैश्विक कमांड

वैश्विक कमांड स्वयं एक प्रकार का कमांड-लाइन कमांड है, इसलिए आप तकनीकी रूप से एक वैश्विक कमांड के अंदर वैश्विक कमांड चला सकते हैं।

दिए गए निम्नलिखित अभिव्यक्तियों के साथ, यदि आप दूसरे `console.log` कथन को हटाना चाहते हैं:

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

यदि आप चलाते हैं:

```shell
:g/console/g/two/d
```

पहले, `g` "console" पैटर्न वाली लाइनों की तलाश करेगा और 3 मेल पाएगा। फिर दूसरा `g` उन तीन मेलों में "two" पैटर्न वाली लाइन की तलाश करेगा। अंततः, यह उस मेल को हटा देगा।

आप सकारात्मक और नकारात्मक पैटर्न खोजने के लिए `g` को `v` के साथ भी जोड़ सकते हैं। उदाहरण के लिए:

```shell
:g/console/v/two/d
```

इसके बजाय "two" पैटर्न वाली लाइन की तलाश करने के बजाय, यह "two" पैटर्न *नहीं* शामिल करने वाली लाइनों की तलाश करेगा।

## डिलिमिटर बदलना

आप सब्स्टिट्यूट कमांड की तरह वैश्विक कमांड का डिलिमिटर बदल सकते हैं। नियम समान हैं: आप किसी भी एकल बाइट वर्ण का उपयोग कर सकते हैं सिवाय वर्णमाला, संख्याएँ, `"`, `|`, और `\`।

"console" शामिल करने वाली लाइनों को हटाने के लिए:

```shell
:g@console@d
```

यदि आप वैश्विक कमांड के साथ सब्स्टिट्यूट कमांड का उपयोग कर रहे हैं, तो आपके पास दो अलग-अलग डिलिमिटर हो सकते हैं:

```shell
g@one@s+const+let+g
```

यहाँ वैश्विक कमांड सभी लाइनों की तलाश करेगा जो "one" शामिल करती हैं। सब्स्टिट्यूट कमांड उन मेलों में से "const" स्ट्रिंग को "let" के साथ बदल देगा।

## डिफ़ॉल्ट कमांड

यदि आप वैश्विक कमांड में कोई कमांड-लाइन कमांड निर्दिष्ट नहीं करते हैं तो क्या होता है?

वैश्विक कमांड वर्तमान लाइन के पाठ को प्रिंट करने के लिए प्रिंट (`:p`) कमांड का उपयोग करेगा। यदि आप चलाते हैं:

```shell
:g/console
```

यह स्क्रीन के नीचे सभी लाइनों को प्रिंट करेगा जो "console" शामिल करती हैं।

वैसे, यहाँ एक दिलचस्प तथ्य है। चूंकि वैश्विक कमांड द्वारा उपयोग किया जाने वाला डिफ़ॉल्ट कमांड `p` है, इसलिए `g` सिंटैक्स इस प्रकार है:

```shell
:g/re/p
```

- `g` = वैश्विक कमांड
- `re` = नियमित अभिव्यक्ति पैटर्न
- `p` = प्रिंट कमांड

यह *"grep"* बनाता है, वही `grep` जो कमांड लाइन से है। यह **संयोग** नहीं है। `g/re/p` कमांड मूल रूप से Ed संपादक से आया था, जो मूल लाइन टेक्स्ट संपादकों में से एक था। `grep` कमांड का नाम Ed से पड़ा।

आपके कंप्यूटर में शायद अभी भी Ed संपादक है। टर्मिनल से `ed` चलाएँ (संकेत: बाहर निकलने के लिए, `q` टाइप करें)।

## पूरे बफर को उलटना

पूरे फ़ाइल को उलटने के लिए, चलाएँ:

```shell
:g/^/m 0
```

`^` एक लाइन की शुरुआत के लिए पैटर्न है। सभी लाइनों से मेल खाने के लिए `^` का उपयोग करें, जिसमें खाली लाइनें भी शामिल हैं।

यदि आपको केवल कुछ लाइनों को उलटना है, तो इसे एक रेंज पास करें। लाइन पांच से लाइन दस के बीच की लाइनों को उलटने के लिए, चलाएँ:

```shell
:5,10g/^/m 0
```

मूव कमांड के बारे में अधिक जानने के लिए, `:h :move` देखें।

## सभी TODOs को एकत्रित करना

कोडिंग करते समय, कभी-कभी मैं उस फ़ाइल में TODOs लिखता हूँ जिसे मैं संपादित कर रहा हूँ:

```shell
const one = 1;
console.log("one: ", one);
// TODO: feed the puppy

const two = 2;
// TODO: feed the puppy automatically
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
// TODO: create a startup selling an automatic puppy feeder
```

सभी बनाए गए TODOs को ट्रैक करना कठिन हो सकता है। Vim के पास सभी मेलों को एक पते पर कॉपी करने के लिए `:t` (कॉपी) विधि है। कॉपी विधि के बारे में अधिक जानने के लिए, `:h :copy` देखें।

सभी TODOs को फ़ाइल के अंत में कॉपी करने के लिए, ताकि उन्हें आसानी से देखा जा सके, चलाएँ:

```shell
:g/TODO/t $
```

परिणाम:

```shell
const one = 1;
console.log("one: ", one);
// TODO: feed the puppy

const two = 2;
// TODO: feed the puppy automatically
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
// TODO: create a startup selling an automatic puppy feeder

// TODO: feed the puppy
// TODO: feed the puppy automatically
// TODO: create a startup selling an automatic puppy feeder
```

अब मैं सभी TODOs की समीक्षा कर सकता हूँ, उन्हें करने का समय ढूंढ सकता हूँ या उन्हें किसी और को सौंप सकता हूँ, और अपने अगले कार्य पर काम करना जारी रख सकता हूँ।

यदि आप उन्हें कॉपी करने के बजाय सभी TODOs को अंत में ले जाना चाहते हैं, तो मूव कमांड का उपयोग करें, `:m`:

```shell
:g/TODO/m $
```

परिणाम:

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);

// TODO: feed the puppy
// TODO: feed the puppy automatically
// TODO: create a startup selling an automatic puppy feeder
```

## ब्लैक होल डिलीट

रजिस्टर अध्याय से याद रखें कि हटाए गए पाठ संख्या रजिस्टर में संग्रहीत होते हैं (यदि वे पर्याप्त बड़े हैं)। जब भी आप `:g/console/d` चलाते हैं, Vim हटाई गई लाइनों को संख्या रजिस्टर में संग्रहीत करता है। यदि आप कई लाइनों को हटाते हैं, तो आप जल्दी से सभी संख्या रजिस्टर भर सकते हैं। इससे बचने के लिए, आप हमेशा ब्लैक होल रजिस्टर (`"_`) का उपयोग कर सकते हैं ताकि *आपकी हटाई गई लाइनों को रजिस्टर में* न रखा जाए। चलाएँ:

```shell
:g/console/d_
```

`d` के बाद `_` पास करके, Vim आपके स्क्रैच रजिस्टर का उपयोग नहीं करेगा।
## कई खाली लाइनों को एक खाली लाइन में कम करें

यदि आपके पास कई खाली लाइनों वाला पाठ है:

```shell
const one = 1;
console.log("one: ", one);


const two = 2;
console.log("two: ", two);





const three = 3;
console.log("three: ", three);
```

आप जल्दी से खाली लाइनों को एक खाली लाइन में कम कर सकते हैं:

```shell
:g/^$/,/./-1j
```

परिणाम:

```shell
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

सामान्यतः वैश्विक आदेश निम्नलिखित रूप को स्वीकार करता है: `:g/pattern/command`। हालाँकि, आप वैश्विक आदेश को निम्नलिखित रूप में भी चला सकते हैं: `:g/pattern1/,/pattern2/command`। इसके साथ, Vim `pattern1` और `pattern2` के भीतर `command` लागू करेगा।

इसको ध्यान में रखते हुए, चलिए आदेश `:g/^$/,/./-1j` को `:g/pattern1/,/pattern2/command` के अनुसार तोड़ते हैं:
- `/pattern1/` है `/^$/`। यह एक खाली लाइन का प्रतिनिधित्व करता है (एक लाइन जिसमें शून्य वर्ण हैं)।
- `/pattern2/` है `/./` के साथ `-1` लाइन संशोधक। `/./` एक गैर-खाली लाइन का प्रतिनिधित्व करता है (एक लाइन जिसमें कम से कम एक वर्ण है)। `-1` का अर्थ है उस ऊपर की लाइन।
- `command` है `j`, जो जोड़ने का आदेश है (`:j`)। इस संदर्भ में, यह वैश्विक आदेश सभी दिए गए लाइनों को जोड़ता है।

वैसे, यदि आप कई खाली लाइनों को कोई लाइन नहीं में कम करना चाहते हैं, तो इसके बजाय यह चलाएँ:

```shell
:g/^$/,/./j
```

एक सरल विकल्प:

```shell
:g/^$/-j
```

आपका पाठ अब इस प्रकार कम हो गया है:

```shell
const one = 1;
console.log("one: ", one);
const two = 2;
console.log("two: ", two);
const three = 3;
console.log("three: ", three);
```

## उन्नत क्रमबद्धता

Vim में एक `:sort` आदेश है जो एक सीमा के भीतर लाइनों को क्रमबद्ध करता है। उदाहरण के लिए:

```shell
d
b
a
e
c
```

आप इसे `:sort` चलाकर क्रमबद्ध कर सकते हैं। यदि आप इसे एक सीमा देते हैं, तो यह केवल उस सीमा के भीतर की लाइनों को क्रमबद्ध करेगा। उदाहरण के लिए, `:3,5sort` केवल तीसरी और पांचवीं लाइनों को क्रमबद्ध करता है।

यदि आपके पास निम्नलिखित अभिव्यक्तियाँ हैं:

```shell
const arrayB = [
  "i",
  "g",
  "h",
  "b",
  "f",
  "d",
  "e",
  "c",
  "a",
]

const arrayA = [
  "h",
  "b",
  "f",
  "d",
  "e",
  "a",
  "c",
]
```

यदि आपको ऐरे के अंदर तत्वों को क्रमबद्ध करने की आवश्यकता है, लेकिन स्वयं ऐरे को नहीं, तो आप यह चला सकते हैं:

```shell
:g/\[/+1,/\]/-1sort
```

परिणाम:

```shell
const arrayB = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
]

const arrayA = [
  "a"
  "b",
  "c",
  "d",
  "e",
  "f",
  "h",
]
```

यह बहुत अच्छा है! लेकिन आदेश जटिल लगता है। चलिए इसे तोड़ते हैं। यह आदेश भी `:g/pattern1/,/pattern2/command` के रूप का पालन करता है।

- `:g` वैश्विक आदेश पैटर्न है।
- `/\[/+1` पहला पैटर्न है। यह एक वास्तविक बाएँ वर्ग ब्रैकेट "[" से मेल खाता है। `+1` इसका नीचे की लाइन को संदर्भित करता है।
- `/\]/-1` दूसरा पैटर्न है। यह एक वास्तविक दाएँ वर्ग ब्रैकेट "]" से मेल खाता है। `-1` इसका ऊपर की लाइन को संदर्भित करता है।
- `/\[/+1,/\]/-1` तब "[" और "]" के बीच की किसी भी लाइनों को संदर्भित करता है।
- `sort` एक कमांड-लाइन आदेश है जो क्रमबद्ध करता है।

## स्मार्ट तरीके से वैश्विक आदेश सीखें

वैश्विक आदेश सभी मेल खाने वाली लाइनों के खिलाफ कमांड-लाइन आदेश को निष्पादित करता है। इसके साथ, आपको केवल एक बार आदेश चलाने की आवश्यकता होती है और Vim बाकी सब कुछ आपके लिए करेगा। वैश्विक आदेश में कुशल बनने के लिए, दो चीजें आवश्यक हैं: कमांड-लाइन आदेशों का एक अच्छा शब्दावली और नियमित अभिव्यक्तियों का ज्ञान। जैसे-जैसे आप Vim का अधिक समय तक उपयोग करते हैं, आप स्वाभाविक रूप से अधिक कमांड-लाइन आदेश सीखेंगे। नियमित अभिव्यक्ति का ज्ञान अधिक सक्रिय दृष्टिकोण की आवश्यकता होगी। लेकिन एक बार जब आप नियमित अभिव्यक्तियों के साथ सहज हो जाते हैं, तो आप कई लोगों से आगे होंगे।

यहाँ कुछ उदाहरण जटिल हैं। डरें नहीं। वास्तव में उन्हें समझने के लिए अपना समय लें। पैटर्न पढ़ना सीखें। हार मत मानो।

जब भी आपको कई आदेश चलाने की आवश्यकता हो, रुकें और देखें कि क्या आप `g` आदेश का उपयोग कर सकते हैं। काम के लिए सबसे अच्छा आदेश पहचानें और एक पैटर्न लिखें ताकि एक बार में कई चीजों को लक्षित किया जा सके।

अब जब आप जानते हैं कि वैश्विक आदेश कितना शक्तिशाली है, तो चलिए सीखते हैं कि बाहरी आदेशों का उपयोग कैसे करें ताकि आपके उपकरणों का भंडार बढ़ सके।