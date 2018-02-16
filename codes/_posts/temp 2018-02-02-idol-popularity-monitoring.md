---
layout: post
title: "สำรวจความนิยมของเหล่าไอดอล BNK48 แบบ real-time ด้วย Python"
date: 2018-02-02
categories: code_python
---

## test using gist
{% gist 10a56d51913459ba2c6afe338c9b1779 %}

{% gist 10a56d51913459ba2c6afe338c9b1779 twitterstream.py %}

<script src="https://gist.github.com/clumdee/10a56d51913459ba2c6afe338c9b1779.js"></script>


## สำรวจความนิยมของเหล่าไอดอล BNK48 แบบ real-time จาก Twitter's hashtags ด้วย Python

สำหรับคนที่สนใจเพียงแค่ผลการจับลำดับความนิยมของสาวๆ BNK48 ที่ได้จาก code ก็อ่านเพียงแค่หัวข้อนี้กับหัวข้อถัดไปและข้ามไปดูส่วน conclusion ที่มีตัว video บันทึกภาพการจัดลำดับความนิยมของสมาชิกวงจากการทำ Twitter streaming ที่ส่วนล่างสุดของ post นะครับ


{% highlight python linenos %}
from pyspark.sql import SparkSession
from pyspark.sql.functions import lower, split, explode, substring, count, split, explode, substring, count, split, explode, substring, count
from datetime import datetime
{% endhighlight %}

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import lower, split, explode, substring, count, split, explode, substring, count, split, explode, substring, count
from datetime import datetime
```
