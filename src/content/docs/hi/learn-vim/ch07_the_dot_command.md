---
description: इस दस्तावेज़ में डॉट कमांड का उपयोग कैसे करें, यह बताया गया है, जो पिछले
  परिवर्तन को आसानी से दोहराने में मदद करता है। सरल पुनरावृत्ति के लिए एक बहुपरकारी
  आदेश है।
title: Ch07. the Dot Command
---

सामान्यतः, आपको जब भी संभव हो, जो आपने अभी किया है उसे फिर से करने से बचना चाहिए। इस अध्याय में, आप सीखेंगे कि डॉट कमांड का उपयोग करके पिछले परिवर्तन को आसानी से फिर से कैसे किया जाए। यह सरल पुनरावृत्तियों को कम करने के लिए एक बहुपरकारी कमांड है।

## उपयोग

इसके नाम की तरह, आप डॉट कमांड का उपयोग डॉट कुंजी (`.`) दबाकर कर सकते हैं।

उदाहरण के लिए, यदि आप निम्नलिखित अभिव्यक्तियों में सभी "let" को "const" से बदलना चाहते हैं:

```shell
let one = "1";
let two = "2";
let three = "3";
```

- मेल पर जाने के लिए `/let` के साथ खोजें।
- "let" को "const" से बदलने के लिए `cwconst<Esc>` के साथ बदलें।
- पिछले खोज का उपयोग करके अगले मेल को खोजने के लिए `n` के साथ नेविगेट करें।
- डॉट कमांड (`.`) के साथ आपने जो किया है उसे दोहराएं।
- हर शब्द को बदलने तक `n . n .` दबाते रहें।

यहां डॉट कमांड ने `cwconst<Esc>` अनुक्रम को दोहराया। इसने आपको केवल एक के बदले आठ कीस्ट्रोक टाइप करने से बचाया।

## परिवर्तन क्या है?

यदि आप डॉट कमांड की परिभाषा (`:h .`) को देखें, तो यह कहता है कि डॉट कमांड अंतिम परिवर्तन को दोहराता है। परिवर्तन क्या है?

जब भी आप वर्तमान बफर की सामग्री को अपडेट (जोड़ना, संशोधित करना, या हटाना) करते हैं, आप एक परिवर्तन कर रहे हैं। अपवाद हैं कमांड-लाइन कमांड द्वारा किए गए अपडेट (जो कमांड `:` से शुरू होते हैं) जो परिवर्तन के रूप में नहीं गिने जाते।

पहले उदाहरण में, `cwconst<Esc>` परिवर्तन था। अब मान लीजिए कि आपके पास यह पाठ है:

```shell
pancake, potatoes, fruit-juice,
```

लाइन की शुरुआत से लेकर अगले अल्पविराम के होने तक के पाठ को हटाने के लिए, पहले अल्पविराम तक हटाएं, फिर इसे `df,..` के साथ दो बार दोहराएं।

आइए एक और उदाहरण आजमाएं:

```shell
pancake, potatoes, fruit-juice,
```

इस बार, आपका कार्य अल्पविराम को हटाना है, न कि नाश्ते की वस्तुओं को। कर्सर को लाइन की शुरुआत में रखते हुए, पहले अल्पविराम पर जाएं, इसे हटाएं, फिर `f,x..` के साथ दो बार दोहराएं। आसान है, है ना? एक मिनट रुको, यह काम नहीं किया! क्यों?

एक परिवर्तन गति को बाहर करता है क्योंकि यह बफर की सामग्री को अपडेट नहीं करता है। कमांड `f,x` में दो क्रियाएँ शामिल थीं: कमांड `f,` कर्सर को "," पर ले जाने के लिए और `x` एक वर्ण को हटाने के लिए। केवल अंतिम, `x`, ने एक परिवर्तन का कारण बना। इसे पहले उदाहरण में `df,` के साथ तुलना करें। इसमें, `f,` हटाने वाले ऑपरेटर `d` के लिए एक निर्देश है, न कि कर्सर को स्थानांतरित करने के लिए एक गति। `df,` और `f,x` में `f,` की दो बहुत अलग भूमिकाएँ हैं।

आइए अंतिम कार्य को पूरा करें। `f,` फिर `x` चलाने के बाद, अगली अल्पविराम पर जाने के लिए `;` का उपयोग करें ताकि नवीनतम `f` को दोहराया जा सके। अंततः, कर्सर के नीचे के वर्ण को हटाने के लिए `.` का उपयोग करें। सब कुछ हटाने तक `; . ; .` को दोहराएं। पूरा कमांड है `f,x;.;.`।

आइए एक और प्रयास करें:

```shell
pancake
potatoes
fruit-juice
```

आइए प्रत्येक पंक्ति के अंत में एक अल्पविराम जोड़ें। पहले लाइन से शुरू करते हुए, `A,<Esc>j` करें। अब तक, आप समझ गए हैं कि `j` परिवर्तन का कारण नहीं बनता। यहाँ परिवर्तन केवल `A,` है। आप `j . j .` के साथ परिवर्तन को स्थानांतरित और दोहराने के लिए आगे बढ़ सकते हैं। पूरा कमांड है `A,<Esc>j.j.`।

आपके द्वारा इन्सर्ट कमांड ऑपरेटर (`A`) दबाने के क्षण से लेकर इन्सर्ट कमांड से बाहर निकलने (`<Esc>`) तक हर क्रिया को परिवर्तन के रूप में माना जाता है।

## मल्टी-लाइन पुनरावृत्ति

मान लीजिए कि आपके पास यह पाठ है:

```shell
let one = "1";
let two = "2";
let three = "3";
const foo = "bar';
let four = "4";
let five = "5";
let six = "6";
let seven = "7";
let eight = "8";
let nine = "9";
```

आपका लक्ष्य "foo" पंक्ति को छोड़कर सभी पंक्तियों को हटाना है। पहले `d2j` के साथ पहले तीन पंक्तियों को हटाएं, फिर "foo" पंक्ति के नीचे की पंक्ति पर जाएं। अगली पंक्ति में, डॉट कमांड का उपयोग दो बार करें। पूरा कमांड है `d2jj..`।

यहां परिवर्तन `d2j` था। इस संदर्भ में, `2j` गति नहीं थी, बल्कि हटाने वाले ऑपरेटर का एक भाग था।

आइए एक और उदाहरण देखें:

```shell
zlet zzone = "1";
zlet zztwo = "2";
zlet zzthree = "3";
let four = "4";
```

आइए सभी z को हटा दें। पहले लाइन पर पहले वर्ण से शुरू करते हुए, ब्लॉकवाइज विजुअल मोड (`Ctrl-Vjj`) के साथ पहले तीन लाइनों में केवल पहले z का दृश्य चयन करें। यदि आप ब्लॉकवाइज विजुअल मोड से परिचित नहीं हैं, तो मैं इसे एक बाद के अध्याय में कवर करूंगा। जब आपके पास तीन z का दृश्य चयन हो जाए, तो उन्हें हटाने वाले ऑपरेटर (`d`) के साथ हटा दें। फिर अगले z पर जाने के लिए अगले शब्द (`w`) पर जाएं। परिवर्तन को दो बार दोहराएं (`..`)। पूरा कमांड है `Ctrl-vjjdw..`।

जब आपने तीन z का एक कॉलम हटाया (`Ctrl-vjjd`), इसे परिवर्तन के रूप में गिना गया। विजुअल मोड ऑपरेशन का उपयोग कई पंक्तियों को लक्ष्य बनाने के लिए परिवर्तन के भाग के रूप में किया जा सकता है।

## परिवर्तन में गति को शामिल करना

आइए इस अध्याय में पहले उदाहरण पर फिर से गौर करें। याद रखें कि कमांड `/letcwconst<Esc>` के बाद `n . n .` ने निम्नलिखित अभिव्यक्तियों में सभी "let" को "const" से बदल दिया:

```shell
let one = "1";
let two = "2";
let three = "3";
```

इसे पूरा करने का एक तेज़ तरीका है। जब आप `/let` की खोज करते हैं, तो `cgnconst<Esc>` चलाएं फिर `. .`।

`gn` एक गति है जो अंतिम खोज पैटर्न (इस मामले में, `/let`) के लिए आगे खोजती है और स्वचालित रूप से एक दृश्य हाइलाइट करती है। अगले उदाहरण को बदलने के लिए, आपको अब स्थानांतरित करने और परिवर्तन को दोहराने की आवश्यकता नहीं है (`n . n .`), बल्कि केवल दोहराना (`. .`) है। अब आपको खोज गति का उपयोग करने की आवश्यकता नहीं है क्योंकि अगली मेल की खोज अब परिवर्तन का हिस्सा है!

जब आप संपादित कर रहे हों, तो हमेशा उन गति के लिए देखें जो एक साथ कई चीजें कर सकती हैं जैसे कि `gn` जब भी संभव हो।

## डॉट कमांड को स्मार्ट तरीके से सीखें

डॉट कमांड की शक्ति कई कीस्ट्रोक को एक के लिए बदलने से आती है। यह शायद एकल कुंजी ऑपरेशनों जैसे `x` के लिए डॉट कमांड का उपयोग करना लाभदायक नहीं है। यदि आपका अंतिम परिवर्तन एक जटिल ऑपरेशन की आवश्यकता करता है जैसे `cgnconst<Esc>`, तो डॉट कमांड नौ कीस्ट्रोक को एक में घटित कर देती है, जो एक बहुत ही लाभदायक व्यापार है।

संपादन करते समय, पुनरावृत्तता के बारे में सोचें। उदाहरण के लिए, यदि मुझे अगले तीन शब्दों को हटाना है, तो क्या `d3w` का उपयोग करना अधिक आर्थिक है या `dw` फिर `.` दो बार करना? क्या आप फिर से एक शब्द को हटाने वाले हैं? यदि हां, तो फिर `dw` का उपयोग करना और इसे कई बार दोहराना समझ में आता है बजाय `d3w` के क्योंकि `dw` `d3w` की तुलना में अधिक पुन: उपयोग योग्य है।

डॉट कमांड एक बहुपरकारी कमांड है जो एकल परिवर्तनों को स्वचालित करने के लिए है। एक बाद के अध्याय में, आप सीखेंगे कि टेक्स्ट को स्टोर और पुनर्प्राप्त करने के लिए रजिस्टर कैसे स्वचालित करें।