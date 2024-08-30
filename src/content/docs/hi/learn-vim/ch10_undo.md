---
description: यह दस्तावेज़ Vim के अंडू सिस्टम के बारे में है, जिसमें अंडू, रीडू, अंडू
  शाखाओं में नेविगेट करने और समय के साथ यात्रा करने की विधियाँ शामिल हैं।
title: Ch10. Undo
---

हम सभी विभिन्न प्रकार की टाइपिंग गलतियाँ करते हैं। यही कारण है कि किसी भी आधुनिक सॉफ़्टवेयर में.undo एक आवश्यक विशेषता है। Vim का.undo सिस्टम न केवल सरल गलतियों को पूर्ववत और पुनः करने में सक्षम है, बल्कि विभिन्न पाठ राज्यों तक पहुँचने की भी क्षमता रखता है, जिससे आपको उन सभी पाठों पर नियंत्रण मिलता है जो आपने कभी टाइप किए हैं। इस अध्याय में, आप सीखेंगे कि.undo कैसे करें, पुनः कैसे करें,.undo शाखा में कैसे नेविगेट करें,.undo को स्थायी कैसे करें, और समय में कैसे यात्रा करें।

## Undo, Redo, और UNDO

एक बुनियादी.undo करने के लिए, आप `u` का उपयोग कर सकते हैं या `:undo` चला सकते हैं।

यदि आपके पास यह पाठ है (नीचे "one" के बाद खाली पंक्ति पर ध्यान दें):

```shell
one

```

फिर आप एक और पाठ जोड़ते हैं:

```shell
one
two
```

यदि आप `u` दबाते हैं, तो Vim पाठ "two" को पूर्ववत कर देता है।

Vim को कैसे पता चलता है कि कितना.undo करना है? Vim एक समय में एकल "परिवर्तन" को.undo करता है, जो कि बिंदु आदेश के परिवर्तन के समान है (बिंदु आदेश के विपरीत, कमांड-लाइन कमांड भी एक परिवर्तन के रूप में गिना जाता है)।

अंतिम परिवर्तन को पुनः करने के लिए, `Ctrl-R` दबाएँ या `:redo` चलाएँ। जब आप ऊपर दिए गए पाठ को.undo करते हैं ताकि "two" हट जाए, तो `Ctrl-R` चलाने पर हटाया गया पाठ वापस आ जाएगा।

Vim में UNDO भी है जिसे आप `U` के साथ चला सकते हैं। यह सभी नवीनतम परिवर्तनों को.undo करता है।

`U` `u` से कैसे अलग है? सबसे पहले, `U` नवीनतम परिवर्तित पंक्ति पर *सभी* परिवर्तनों को हटा देता है, जबकि `u` केवल एक समय में एक परिवर्तन को हटा देता है। दूसरा, जबकि `u` करना परिवर्तन के रूप में नहीं गिना जाता, `U` करना परिवर्तन के रूप में गिना जाता है।

इस उदाहरण पर वापस आते हैं:

```shell
one
two
```

दूसरी पंक्ति को "three" में बदलें:

```shell
one
three
```

दूसरी पंक्ति को फिर से बदलें और इसे "four" से बदलें:

```shell
one
four
```

यदि आप `u` दबाते हैं, तो आप "three" देखेंगे। यदि आप फिर से `u` दबाते हैं, तो आप "two" देखेंगे। यदि आप "four" पाठ होने पर `u` दबाने के बजाय `U` दबाते, तो आप देखेंगे:

```shell
one

```

`U` सभी मध्यवर्ती परिवर्तनों को बायपास करता है और उस मूल स्थिति पर चला जाता है जब आपने शुरुआत की थी (एक खाली पंक्ति)। इसके अलावा, चूंकि UNDO वास्तव में Vim में एक नया परिवर्तन बनाता है, आप अपने UNDO को UNDO कर सकते हैं। `U` के बाद `U` अपने आप को.undo करेगा। आप `U`, फिर `U`, फिर `U`, आदि दबा सकते हैं। आप वही दो पाठ राज्यों को आगे-पीछे टॉगल करते हुए देखेंगे।

मैं व्यक्तिगत रूप से `U` का उपयोग नहीं करता क्योंकि इसे मूल स्थिति को याद रखना कठिन होता है (मुझे शायद ही कभी इसकी आवश्यकता होती है)।

Vim एक अधिकतम संख्या निर्धारित करता है कि आप कितनी बार.undo कर सकते हैं `undolevels` विकल्प चर में। आप इसे `:echo &undolevels` के साथ जांच सकते हैं। मैंने इसे 1000 पर सेट किया है। यदि आप इसे 1000 पर बदलना चाहते हैं, तो `:set undolevels=1000` चलाएँ। इसे किसी भी संख्या पर सेट करने के लिए स्वतंत्र महसूस करें।

## ब्लॉकों को तोड़ना

मैंने पहले उल्लेख किया था कि `u` एकल "परिवर्तन" को.undo करता है जो बिंदु आदेश के परिवर्तन के समान है: पाठ जो आप इनसर्ट मोड में प्रवेश करने से लेकर बाहर निकलने तक डालते हैं, वह परिवर्तन के रूप में गिना जाता है।

यदि आप `ione two three<Esc>` करते हैं और फिर `u` दबाते हैं, तो Vim पूरे "one two three" पाठ को हटा देता है क्योंकि पूरा पाठ एक परिवर्तन के रूप में गिना जाता है। यदि आपने छोटे पाठ लिखे हैं, तो यह कोई बड़ी बात नहीं है, लेकिन अगर आपने एक इनसर्ट मोड सत्र में कई पैराग्राफ लिखे हैं बिना बाहर निकले और बाद में आपको एहसास हुआ कि आपने गलती की है? यदि आप `u` दबाते हैं, तो आपने जो कुछ भी लिखा है वह हटा दिया जाएगा। क्या यह उपयोगी नहीं होगा यदि आप केवल अपने पाठ के एक खंड को हटाने के लिए `u` दबा सकें?

सौभाग्य से, आप.undo ब्लॉकों को तोड़ सकते हैं। जब आप इनसर्ट मोड में टाइप कर रहे होते हैं, तो `Ctrl-G u` दबाने से एक.undo ब्रेकपॉइंट बनता है। उदाहरण के लिए, यदि आप `ione <Ctrl-G u>two <Ctrl-G u>three<Esc>` करते हैं, तो फिर `u` दबाने पर, आप केवल "three" पाठ खो देंगे (दो हटाने के लिए एक बार और `u` दबाएँ)। जब आप एक लंबा पाठ लिखते हैं, तो `Ctrl-G u` का रणनीतिक रूप से उपयोग करें। प्रत्येक वाक्य के अंत में, दो पैराग्राफ के बीच, या प्रत्येक कोड की पंक्ति के बाद.undo ब्रेकपॉइंट जोड़ने के लिए प्रमुख स्थान होते हैं ताकि यदि आप कभी गलती करें तो अपने परिवर्तनों को.undo करना आसान हो।

इनसर्ट मोड में `Ctrl-W` (कर्सर से पहले का शब्द हटाएँ) और `Ctrl-U` (कर्सर से पहले का सभी पाठ हटाएँ) के साथ चंक्स को हटाते समय.undo ब्रेकपॉइंट बनाना भी उपयोगी होता है। एक मित्र ने निम्नलिखित मैप्स का उपयोग करने का सुझाव दिया:

```shell
inoremap <c-u> <c-g>u<c-u>
inoremap <c-w> <c-g>u<c-w>
```

इनके साथ, आप आसानी से हटाए गए पाठ को पुनः प्राप्त कर सकते हैं।

## Undo Tree

Vim हर परिवर्तन को.undo ट्री में संग्रहीत करता है। एक नया खाली फ़ाइल शुरू करें। फिर एक नया पाठ जोड़ें:

```shell
one

```

एक नया पाठ जोड़ें:

```shell
one
two
```

एक बार.undo करें:

```shell
one

```

एक अलग पाठ जोड़ें:

```shell
one
three
```

फिर से.undo करें:

```shell
one

```

और एक और अलग पाठ जोड़ें:

```shell
one
four
```

अब यदि आप.undo करते हैं, तो आप अभी जोड़े गए "four" पाठ को खो देंगे:

```shell
one

```

यदि आप एक बार और.undo करते हैं:

```shell

```

तो आप "one" पाठ को खो देंगे। अधिकांश पाठ संपादकों में, "two" और "three" पाठ को वापस पाना असंभव होता, लेकिन Vim के साथ नहीं! `g+` दबाएँ और आप अपना "one" पाठ वापस पा लेंगे:

```shell
one

```

एक बार फिर `g+` टाइप करें और आप एक पुराने मित्र को देखेंगे:

```shell
one
two
```

आगे बढ़ते हैं। फिर से `g+` दबाएँ:

```shell
one
three
```

एक बार और `g+` दबाएँ:

```shell
one
four
```

Vim में, हर बार जब आप `u` दबाते हैं और फिर एक अलग परिवर्तन करते हैं, तो Vim पिछले राज्य के पाठ को "undo शाखा" बनाकर संग्रहीत करता है। इस उदाहरण में, जब आपने "two" टाइप किया, फिर `u` दबाया, फिर "three" टाइप किया, तो आपने एक पत्ते की शाखा बनाई जो "two" पाठ को संग्रहीत करती है। उस क्षण में,.undo ट्री में कम से कम दो पत्ते के नोड थे: मुख्य नोड जिसमें "three" पाठ (सबसे हाल का) और.undo शाखा नोड जिसमें "two" पाठ था। यदि आपने एक और.undo किया और "four" पाठ टाइप किया, तो आपके पास तीन नोड होंगे: एक मुख्य नोड जिसमें "four" पाठ और दो नोड जिसमें "three" और "two" पाठ होंगे।

प्रत्येक.undo ट्री नोड को पार करने के लिए, आप नए राज्य में जाने के लिए `g+` का उपयोग कर सकते हैं और पुराने राज्य में जाने के लिए `g-` का उपयोग कर सकते हैं। `u`, `Ctrl-R`, `g+`, और `g-` के बीच का अंतर यह है कि `u` और `Ctrl-R` केवल.undo ट्री में *मुख्य* नोड्स को पार करते हैं जबकि `g+` और `g-`.undo ट्री में *सभी* नोड्स को पार करते हैं।

.undo ट्री को दृश्य रूप में देखना आसान नहीं है। मुझे [vim-mundo](https://github.com/simnalamburt/vim-mundo) प्लगइन बहुत उपयोगी लगता है जो Vim के.undo ट्री को दृश्य बनाने में मदद करता है। इसके साथ खेलने के लिए कुछ समय दें।

## स्थायी.undo

यदि आप Vim शुरू करते हैं, एक फ़ाइल खोलते हैं, और तुरंत `u` दबाते हैं, तो Vim शायद "*Already at oldest change*" चेतावनी दिखाएगा।.undo करने के लिए कुछ नहीं है क्योंकि आपने कोई परिवर्तन नहीं किया है।

पिछले संपादन सत्र से.undo इतिहास को रोलओवर करने के लिए, Vim आपके.undo इतिहास को एक.undo फ़ाइल के साथ संरक्षित कर सकता है `:wundo` के साथ।

एक फ़ाइल `mynumbers.txt` बनाएँ। टाइप करें:

```shell
one
```

फिर एक और पंक्ति टाइप करें (सुनिश्चित करें कि प्रत्येक पंक्ति एक परिवर्तन के रूप में गिनी जाती है):

```shell
one
two
```

एक और पंक्ति टाइप करें:

```shell
one
two
three
```

अब अपनी.undo फ़ाइल बनाएं `:wundo {my-undo-file}` के साथ। यदि आपको मौजूदा.undo फ़ाइल को ओवरराइट करने की आवश्यकता है, तो आप `wundo` के बाद `!` जोड़ सकते हैं।

```shell
:wundo! mynumbers.undo
```

फिर Vim से बाहर निकलें।

अब आपके पास आपके डायरेक्टरी में `mynumbers.txt` और `mynumbers.undo` फ़ाइलें होनी चाहिए। फिर से `mynumbers.txt` खोलें और `u` दबाने की कोशिश करें। आप नहीं कर सकते। आपने फ़ाइल खोलने के बाद कोई परिवर्तन नहीं किया है। अब.undo फ़ाइल को पढ़कर अपने.undo इतिहास को लोड करें `:rundo` के साथ:

```shell
:rundo mynumbers.undo
```

अब यदि आप `u` दबाते हैं, तो Vim "three" को हटा देगा। "two" को हटाने के लिए फिर से `u` दबाएँ। यह ऐसा है जैसे आपने Vim को बंद ही नहीं किया!

यदि आप स्वचालित.undo स्थिरता प्राप्त करना चाहते हैं, तो इसे करने का एक तरीका है कि आप अपने vimrc में ये जोड़ें:

```shell
set undodir=~/.vim/undo_dir
set undofile
```

उपरोक्त सेटिंग सभी.undo फ़ाइलों को एक केंद्रीकृत निर्देशिका, `~/.vim` निर्देशिका में रखेगी। नाम `undo_dir` मनमाना है। `set undofile` Vim को `undofile` सुविधा को चालू करने के लिए बताता है क्योंकि यह डिफ़ॉल्ट रूप से बंद है। अब जब भी आप सहेजते हैं, Vim स्वचालित रूप से `undo_dir` निर्देशिका के भीतर संबंधित फ़ाइल बनाता और अपडेट करता है (सुनिश्चित करें कि आप इसे चलाने से पहले `~/.vim` निर्देशिका के भीतर वास्तविक `undo_dir` निर्देशिका बनाते हैं)।

## समय यात्रा

कौन कहता है कि समय यात्रा मौजूद नहीं है? Vim `:earlier` कमांड-लाइन कमांड के साथ अतीत में एक पाठ स्थिति में यात्रा कर सकता है।

यदि आपके पास यह पाठ है:

```shell
one

```
फिर बाद में आप जोड़ते हैं:

```shell
one
two
```

यदि आपने "two" टाइप किया है तो दस सेकंड से कम समय में, आप उस स्थिति में वापस जा सकते हैं जहाँ "two" दस सेकंड पहले मौजूद नहीं था:

```shell
:earlier 10s
```

आप `:undolist` का उपयोग करके देख सकते हैं कि अंतिम परिवर्तन कब किया गया था। `:earlier` विभिन्न तर्कों को भी स्वीकार करता है:

```shell
:earlier 10s    10 सेकंड पहले की स्थिति में जाएँ
:earlier 10m    10 मिनट पहले की स्थिति में जाएँ
:earlier 10h    10 घंटे पहले की स्थिति में जाएँ
:earlier 10d    10 दिन पहले की स्थिति में जाएँ
```

इसके अलावा, यह एक नियमित `count` को तर्क के रूप में भी स्वीकार करता है ताकि Vim को बताए कि उसे `count` बार पुरानी स्थिति में जाना है। उदाहरण के लिए, यदि आप `:earlier 2` करते हैं, तो Vim दो परिवर्तनों पहले की पुरानी पाठ स्थिति में वापस जाएगा। यह `g-` को दो बार करने के समान है। आप इसे दस सहेजने पहले की पुरानी पाठ स्थिति में जाने के लिए भी कह सकते हैं `:earlier 10f` के साथ।

उसी तर्कों का सेट `:earlier` के समकक्ष `:later` के साथ काम करता है।

```shell
:later 10s    10 सेकंड बाद की स्थिति में जाएँ
:later 10m    10 मिनट बाद की स्थिति में जाएँ
:later 10h    10 घंटे बाद की स्थिति में जाएँ
:later 10d    10 दिन बाद की स्थिति में जाएँ
:later 10     नए स्थिति में 10 बार जाएँ
:later 10f    10 सहेजने बाद की स्थिति में जाएँ
```

## स्मार्ट तरीके से.undo सीखें

`u` और `Ctrl-R` दो अनिवार्य Vim कमांड हैं जो गलतियों को सुधारने के लिए हैं। पहले इन्हें सीखें। फिर, समय तर्कों का उपयोग करके `:earlier` और `:later` का उपयोग करना सीखें। उसके बाद,.undo ट्री को समझने के लिए अपना समय लें। [vim-mundo](https://github.com/simnalamburt/vim-mundo) प्लगइन ने मेरी बहुत मदद की। इस अध्याय में पाठों के साथ टाइप करें और जैसे-जैसे आप प्रत्येक परिवर्तन करते हैं,.undo ट्री की जाँच करें। एक बार जब आप इसे समझ लें, तो आप कभी भी.undo प्रणाली को उसी तरह नहीं देखेंगे।

इस अध्याय से पहले, आपने किसी प्रोजेक्ट स्पेस में किसी भी पाठ को खोजने का तरीका सीखा, अब.undo के साथ, आप अब किसी भी पाठ को एक समय आयाम में खोज सकते हैं। आप अब किसी भी पाठ को इसके स्थान और लिखे गए समय के अनुसार खोजने में सक्षम हैं। आपने Vim-omnipresence प्राप्त कर ली है।