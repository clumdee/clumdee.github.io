---
layout: post
title: "สำรวจความนิยมของเหล่าไอดอล BNK48 แบบ real-time ด้วย Python"
date: 2018-02-16
categories: code_python
---

## บทนำ
สำหรับผู้ที่สนใจเฉพาะส่วนผลการจับลำดับความนิยมของสาวๆ BNK48 (วัดจากจำนวน hashtag ที่เกิดขึ้นในคืนวันวาเลนไทน์, 14-02-2018) ก็อ่านเพียงแค่หัวข้อนี้กับหัวข้อถัดไปและข้ามไปดูส่วน conclusion ที่มี 1. ตัวไฟล์ GIF บันทึกภาพการจัดลำดับความนิยมของสมาชิกวงจากการทำ Twitter streaming (ไฟล์เดียวกับตัวข้างล่างนี้) และ 2. กราฟข้อมูลจำนวนครั้งที่ถูกพูดถึงของ top hashtags แบบเทียบเวลาที่ส่วนล่างของ post นะครับ

![Animated ranking results]({{ site.url }}/assets/img/twitterBNK48/bnk_stream-2018-02-14_21-16-10.gif)

post นี้จะไม่ลงรายละเอียดมาก สำหรับผู้เขียน Python เป็นอยู่แล้ว และอยากศึกษาการทำ data streaming แบบง่ายๆ โดยเป็นการแสดงตัวอย่างขั้นตอน ในการใช้ Python

1. การดึงข้อมูลจาก Twitter
2. การ Streaming และการจัดการข้อมูล
3. แสดงผลข้อมูลแบบ real-time

ขั้นตอนส่วนที่ 1 นั้น นำมาจากจากคอร์ส [Spark and Python for Big Data with PySpark](https://www.udemy.com/spark-and-python-for-big-data-with-pyspark/) บน [Udemy](https://www.udemy.com/)

ขอบคุณพี่ต้า ([Ta Virot Chiraphadhanakul](https://www.facebook.com/ta.chiraphadhanakul)) แห่ง [Skoodio](https://www.facebook.com/skooldio/) ที่ช่วยให้ feedback ของ draft แรก ด้วยครับ


## Twitter กับ BNK48
คาดว่าทุกคนรู้จัก Twitter กันอยู่แล้ว ก็ขอเพิ่มเติมเพียงว่า Twitter นี่เป็น platform ที่เหมาะกับผู้ที่อยากฝึกทำ data streaming มากๆ ทั้งเรื่อง API support และ supply of data

จากนั้นผู้เขียนก็มาคิดดูว่า data ชุดไหนที่น่าสนใจจะดึงมาลองเล่นดูและมีผู้พูดถึงอยู่เรื่อยๆ (continuous supply of data) ก็สรุปว่าจะเลือกสำรวจข้อความบน Twitter (tweets) ที่เกี่ยวกับกลุ่มไอดอลหญิงของไทยที่มาแรงและมีกลุ่มผู้ติดตามใน Twitter เป็นจำนวนมาก ซึ่งก็คือ BNK48

เราก็มารู้จักกับสาวๆ BNK48 กันสักเล็กน้อย สั้นๆ คือ -- "BNK48 เป็นกลุ่มไอดอลหญิงของประเทศไทย และเป็นวงน้องสาวของกลุ่มไอดอลญี่ปุ่น AKB48 ภายใต้แนวคิดร่วมกันคือ "ไอดอลที่คุณสามารถไปพบได้" (จาก [th.wikipedia.org/wiki/บีเอ็นเคโฟร์ตีเอต](https://th.wikipedia.org/wiki/%E0%B8%9A%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%84%E0%B9%82%E0%B8%9F%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B5%E0%B9%80%E0%B8%AD%E0%B8%95))

{% include image.html
  img='assets/img/twitterBNK48/BNK48.jpg'
  title='BNK48'
  caption='ฝากภาพเหล่าสมาชิก BNK48 ไว้เป็นที่ระลึก -- Thank <a href="http://www.metalbridges.com/bnk48/">www.metalbridges.com</a> for the image.'
%}


## Techical part 0 -- Workflow

ก่อนเริ่มส่วน technical ก็มาดู workflow กันก่อน สั้นๆ เราก็จะทำการ
1. ดึงข้อมูลจาก Twitter ด้วย Tweepy
2. เชื่อมต่อและเรียกข้อมูล Tweet streaming
3. จัดลำดับ hashtags และทำหน้าจอแสดงผลแบบ real-time

**environment ที่ใช้**
* python 3.5.2
* jupyter 4.4.0
* tweepy 3.5.0
* pandas 0.21.0
* matplotlib 2.1.0


## Techical part 1 -- ดึงข้อมูลจาก Twitter ด้วย Tweepy

สำหรับผู้ที่ไม่เคยมี account กับ Twitter ก่อนอื่นก็ต้องสร้าง Twitter account ก่อนนะครับ

เมื่อมี Twitter account แล้ว ก็เข้าไปที่นี่ [https://apps.twitter.com/](https://apps.twitter.com/) แล้วก็ login ตามกระบวนการปกติครับ จะเห็นหน้าต่างประมาณนี้

<img src="https://raw.githubusercontent.com/clumdee/clumdee.github.io/master/assets/img/twitterBNK48/twitterApp_01.png" alt="twitterApp_firstPage" style="width: 700px;"/>

จากนั้นก็เลือก **Create New App** เพื่อสร้างตัว Twitter app ที่เราจะใช้เป็นตัวกลางในการ Streaming ข้อมูล จาก Twitter -- เติมแค่ fields ที่จำเป็นต้องเติมก็พอ (ตรง Website ใส่เว็บตัวเองหรือ placeholder เช่น [https://www.google.com](https://www.google.com) ไปก็ได้)

<img src="https://raw.githubusercontent.com/clumdee/clumdee.github.io/master/assets/img/twitterBNK48/twitterApp_02.png" alt="twitterApp_createApp" style="width: 700px;"/>

เมื่อสร้าง app แล้ว ก็เข้าไปดูใน app นั้น จากนั้นเลือก **Keys and Access Tokens** โดยในหน้านี้จะมี 4 fields ที่เราจะนำค่าออกมาใช้ผูกกับ code ของเราเพื่อเรียกข้อมูล ประกอบด้วย Consumer Key (API Key), Consumer Secret (API Secret), Access Token, Access Token Secret

<img src="https://raw.githubusercontent.com/clumdee/clumdee.github.io/master/assets/img/twitterBNK48/twitterApp_03.png" alt="twitterApp_keys" style="width: 700px;"/>

#### หลังจากนั้นก็สร้างและบันทึก Python script ตามไฟล์ที่แนบไว้นี้ครับ ([คลิกเพื่อดูไฟล์](https://github.com/clumdee/clumdee.github.io/blob/master/assets/img/twitterBNK48/streamingTwitterTags.py) -- ในตัวอย่างตั้งชื่อว่า streamingTwitterTags.py)

ส่วนที่แต่ละคนต้องปรับเองคือ บรรทัดที่ 12-15 โดยเติม consumer_key, consumer_secret, access_token, และ access_secret ของตัวเองลงไปครับ (บรรทัดที่ 53 จะเปลี่ยนหรือไม่เปลี่ยนก็ตามสะดวกครับ, บรรทัดที่ 51 ก็ต้องเปลี่ยนหากไม่ต้องการให้ script ประมวลบน local host ครับ, บรรทัดที่ 44 ตั้งเป็น '#bnk48' ที่เราจะใช้เป็น keyword สำหรับคัดกรอง)


ตอนนี้เราก็ได้ script ที่จะใช้ดึงข้อมูลจาก Twitter แล้วครับ ต่อไปก็เป็นการเตรียม PySpark code สำหรับทำ data streaming ครับ


## Technical part 2 -- เชื่อมต่อและเรียกข้อมูล Tweet streaming

ต่อไปเราก็ทำ code เพื่อเชื่อมต่อ streaming channel จาก script ก่อนหน้ากับตัว Jupyter Notebook ที่จะใช้จัดการข้อมูลครับ โดยใช้ networking interface ของ Python

**ปล.**
ส่วน technical part 2 และ 3 ใน blog post นี้ใช้ internal Python networking interface -- สำหรับผู้สนใจตัวอย่าง code ที่ทำแบบเดียวกันโดยใช้ PySpark (สำหรับทำ distributed computation) [ดูได้ที่นี่](https://github.com/clumdee/clumdee.github.io/blob/master/assets/img/twitterBNK48/code_with_pyspark.ipynb)

หน้าตาของ code ก็มีดังข้างล่าง โดยกรอกค่า "host" และ ค่า "port" ที่เราตั้งไว้ตามบรรทัดที่ 51 และ 53 ใน streamingTwitterTags.py


```python
import socket

# connect to a streaming socket
s = socket.socket()
host = '127.0.0.1' # needs to be in quote
port = 5555
s.connect((host, port))
```

ทีนี้เราก็พร้อมที่จะทดสอบระบบ โดยเริ่มจากสั่ง run script สำหรับ streaming ก่อน

<img src="https://raw.githubusercontent.com/clumdee/clumdee.github.io/master/assets/img/twitterBNK48/twitterStreaming_run.png" alt="twitterStreaming_run" style="width: 700px;"/>

จากนั้นก็ run code เชื่อมต่อที่เตรียมไว้ บน Jupyter Notebook เท่านี้ code ของเราก็พร้อมเริ่มดึง tweet stream มาจัดการต่อ

การเรียก tweets ที่อยู่บน stream ที่เราเปิดไว้ ณ ขณะนั้นๆ ทำได้โดยการ run คำสั่งชุดต่อไปด้านล่างนี้

**ปล 2.**
ตัว code ส่วนเชื่อมต่อด้านบนนั้นกด run เพียงครั้งเดียว ถ้า run ซ้ำการเชื่อมต่อจะโดนยกเลิก (ต้องเริ่ม run ไฟล์ script ใหม่ด้วย) ส่วน code ที่ใช้ดึง tweets ด้านล่างนั้น เมื่อเชื่อมต่อแล้วสามารถ run ซ้ำได้เรื่อยๆ

**ปล 3.**
เลข 4096 คือ จำกัดขนาดของ byte size ที่เราจะเรียกมาแต่ละครั้ง ถ้าข้อมูลบน stream ของเรา ณ เวลานั้นๆ มีมากกว่าขนาดที่จำกัดไว้ ส่วนที่ไม่ถูกเรียกมาในครั้งนั้นๆ จะถูกเก็บไว้และถูกเรียกมาในครั้งต่อไป -- ถ้าไม่คิดมากใส่ 4096 ไว้ก็เพียงพอสำหรับเรื่องที่เราจะทดสอบ


```python
# get tweets
tweets = s.recv(4096).decode("utf-8", errors='ignore')
tweets
```

  *'RT @5k8_ea: ทอล์ก-กะ-เทย Tonight วันที่ 18 ก.พ. \n\n#talkwithtoey #BNK48 \n\nhttps://t.co/ps8L5i6o8o https://t.co/6UPYvWpEDpRT @zi_patpat: ถ่ายโอชิตัวเองมันก็จะประมาณนี้แหล่ะ #bnk48 #KateBNK48 https://t.co/bzMs7QmaYIRT @nlessblogger: อาจารย์\u200bเจษฎ์น\u200bี่\u200bเองเป็นแกนนำ ^_^\n :เปิดใจ ตัวแทนกลุ่มคนรักมิวสิค BNK48 ขั้นตอนทำป้าย VR เบิร์ดเดย์ ส่งกำลังใจถึง มิวสิค…RT @Shimuzik: น้ำใส ไหลเย็น เห็นตัวปลาาาาาาาา ~~~~~~ (ฅΦωΦ)ฅ\n#BNK48 #NamsaiBNK48 https://t.co/ZbEyu22T0sRT @punjennis_th: [IG Jennis] พรุ่งนี้มี 2 งานเลย ไปเจอน้องกันนะคะ😍 #JennisBNK48 #BNK48 https://t.co/vTsQeo0mB7RT @jorhorkor48: ฮิ ฮิ~ 😆 ทำไมนี่ยิ้มตาม #KaewBNK48 #BNK48 https://t.co/cI1QFDQ1njRT @cholthiS: นี่ไอดอลหรือคณะตลก\n ก. มิวสิคมีแปรงสีฟัน แต่จิ้งจกขโมยยาสีฟัน\n ข. ปัญกับเจนนิษส์ไม่มียาสีฟันทั้งคู่\n ค. เฌอมียาสีฟัน แต่ไม่มี…RT @fontaku_: กระจกแถวนั้นแตกหมดยังคะ... \n#BNK48 #OrnBNK48 https://t.co/YSZRF8ncq1RT @jnptt_: โอ้โหยอมแล้ว ตายตายไปแล้ว #OrnBNK48 #BNK48 #BNK48Sweetcall https://t.co/hYGIV3J59GRT @rightmen0w: น้องสาวครับ~  อึ๋ย    ไม่ทันได้ตั้งรับเธอก็เข้ามาโจมตี  #BNK48  #JennisBNK48 https://t.co/AXzDfhLlmuRT @Teeny_SD: รีแอคชั่นของกันและกันระหว่างน้ำหนึ่งกับตาวานตอนออดิชั่น ต่างคนต่างทึ่งอีกฝ่าย5555555555\n\nนน: ดูสกิลตาวานอ่ะ นี่ถึงขนาดอึ้ง หา…RT @genjii_i: ทำไม ทำไม ทำกับน้องแบบนี้ 55555 เฌอของเกน #BNK48 #cherprangbnk48 https://t.co/rp67s4SAtA'*


ทีนี้เราก็เห็น tweets เกี่ยวกับ '#bnk48' ที่เค้ากำลังคุยกันบน Twitter ได้แล้วครับ
จากนั้น เราก็กรองเฉพาะ hashtags ออกจากข้อความใน tweets ครับ


```python
# get hashtags from tweets
import re

hashtags = [hashtag.lower() for hashtag in re.split('\s+', tweets) if len(hashtag)>0 and hashtag[0]=="#"]
hashtags
```

    ['#talkwithtoey',
     '#bnk48',
     '#bnk48',
     '#katebnk48',
     '#bnk48',
     '#namsaibnk48',
     '#jennisbnk48',
     '#bnk48',
     '#kaewbnk48',
     '#bnk48',
     '#bnk48',
     '#ornbnk48',
     '#ornbnk48',
     '#bnk48',
     '#bnk48sweetcall',
     '#bnk48',
     '#jennisbnk48',
     '#bnk48',
     '#cherprangbnk48']


## Technical part 3 -- จัดลำดับ hashtags และทำหน้าจอแสดงผลแบบ real-time

เมื่อเราดึงข้อมูล tweets/hashtags ได้แล้ว เราก็จะนำข้อมูลมาจัดลำดับครับ โดยทำง่ายๆ ก็คือ วน loop เก็บค่า แล้วทำ chart ออกมา โดย chart ของเราคอย update เรื่อยๆ ตามช่วงเวลาที่เรากำหนดไว้

ตัว code ก็เป็นแบบนี้ครับ
1. บันทึกค่า start_time, ตั้งค่า stream_period ที่เราจะทำการ stream, บันทึกค่า finish_time
2. สร้าง blank Pandas DataFrame ไว้เก็บค่า hashtags และเวลาที่ทำการดึงข้อมูลเทียบกับ start_time ตอนวน while-loop
3. while-loop ที่จะสิ้นสุดเมื่อครบระยะ stream_period
    * ตั้งค่า wait time ของแต่ละรอบและบันทึกเวลาก่อนเริ่มดึงข้อมูล
    * ดึง tweet stream และกรอง hashtags อย่างที่ทำในส่วน Technical part 2
    * จัดเก็บข้อมูล hashtags ลง DataFrame ที่เตรียมไว้ และบันทึกการจัดลำดับ hashtags ลง DataFrame ใหม่
    * บันทึกจำนวน '#bnk48' hashtag ไว้เป็นตัวอ้างอิง
    * สร้าง bar chart ที่แสดงลำดับและจำนวนครั้งที่มีคนกล่าวถึงของ hashtags 10 ลำดับแรกที่เกี่ยวกับ '#bnk48'
    * clear ส่วนแสดงผลของรอบก่อนหน้า, แสดงเวลาเริ่มต้นดึงข้อมูลและเวลาปัจจุบัน, แสดง bar chart การจัดลำดับที่ทำไว้


```python
import time
import re
from datetime import datetime, timedelta
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
from IPython import display

%matplotlib inline

# record start time and set streaming period
start_time = datetime.now()
stream_period = 60  # in minutes
finish_time = start_time + timedelta(minutes=stream_period)

# create a blank Pandas DataFrame
df = pd.DataFrame([], columns=['hashtag','time_(s)'])

# iterative streaming and plotting
while datetime.now() < finish_time:

    # set wait time between iteration
    wait_time = 10 # in seconds
    time.sleep(wait_time)    
    stream_time = datetime.now()

    # get tweets and hashtags
    tweets = s.recv(4096).decode("utf-8", errors='ignore')
    hashtags = [hashtag.lower() for hashtag in re.split('\s+', tweets) if len(hashtag)>0 and hashtag[0]=="#"]

    # store and count hashtags in Pandas DataFrame
    temp_df = pd.DataFrame({'hashtag':hashtags,'time_(s)':(stream_time-start_time).seconds})
    df = pd.concat([df, temp_df])
    results = df.groupby('hashtag')['hashtag'].count().sort_values(ascending=False).reset_index(name='count').head(11)

    # number of '#bnk48'
    bnk48_count = results[results['hashtag']=='#bnk48']['count'].values

    # create bar chart ranking top ten hashtags related to '#bnk48'
    fig, ax = plt.subplots(1,1,figsize=(12,6))
    results[results['hashtag']!='#bnk48'].plot(kind='bar', x='hashtag', y='count', legend=False, ax=ax)
    ax.set_title("Top 10 hashtags related to #BNK48 (%d counts)" % bnk48_count, fontsize=18)
    ax.set_xlabel("Hashtag", fontsize=18)
    ax.set_ylabel("Count", fontsize=18)
    ax.set_xticklabels(ax.get_xticklabels(), {"fontsize":14}, rotation=30)
    ax.yaxis.set_major_locator(MaxNLocator(integer=True)) # show only integer yticks
    plt.yticks(fontsize=14)

    # clear previous output, print start time and current time, and plot the current chart
    display.clear_output(wait=True)
    print("start time:", start_time.strftime('%Y-%m-%d %H:%M:%S'))
    print("stream time:", stream_time.strftime('%Y-%m-%d %H:%M:%S'))
    plt.show()

```

## สำรวจความนิยมของเหล่าไอดอล BNK48 ในคืนวัน Valentine

หลังจากเรามี code ทุกอย่างเรียบร้อยแล้วก็ทำการ run ทุกอย่างตามที่เขียนไว้ในส่วน **Technical part 2** และ **Technical part 3** ได้เลยครับ โดยก็จะได้ chart ที่ update ตัวเองเรื่อยๆ ตามที่ตั้งไว้

ผมก็ได้ทดสอบ code ที่เราทำขึ้นในคืนวันวาเลนไทน์ ช่วงเวลา 21.15-22.15 นะครับ เรามาดูกันว่าสาวๆ BNK48 คนไหนบ้างที่มีชาว Twitter พูดถึงกันมากที่สุดในช่วงค่ำของวันวาเลนไทน์ (ย่นเวลาแสดงผลเหลือ 30 วินาที)

![Animated ranking results]({{ site.url }}/assets/img/twitterBNK48/bnk_stream-2018-02-14_21-16-10.gif)

จากไฟล์ GIF นะครับ ก็จะเห็นว่าในช่วงระยะเวลาหนึ่งชั่วโมงที่เราทำการดึงข้อมูลนั้น มีผู้ใช้ hashtag #bnk48 ทั้งหมด 2489 ครั้ง โดยมี #cherprangbnk48 กับ #punbnk48 ที่ขับเคี่ยวกันมาสองคน แล้วก็มี #musicbnk48 ที่ตามมาห่างๆ เป็นอันดับที่สาม ส่วนอีกสามคนที่ตามมาก็เป็น #jennisbnk48, #mobilebnk48, และ #ornbnk48 แล้วก็มีอีกคนที่ตามมาแบบเว้นระยะหน่อยคือ #janbnk48

เนื่องจาก bar chart ด้านบนเปลี่ยนแปลงเร็ว ถ้าเราอยากเห็นละเอียดขึ้นว่าใครมี hashtag ที่แฟนๆ พูดถึง แซงกันในช่วงไหนบ้างก็คงไม่ทัน เราก็มาดูเป็น line plot ที่ทำเทียบกับเวลาที่เริ่มทำการ stream กันครับ (ใช้ข้อมูลเวลาที่เก็บไว้ใน DataFrame) โดยเลือกเฉพาะเจ็ดสมาชิกที่มีคนพูดถึงเยอะที่สุดที่กล่าวไว้ด้านบน โดยใน line plot ผมเติม scatter plot ลงไปด้วยทุกสิบนาที โดยให้ขนาดของ scatter plot เปลี่ยนไปตามจำนวนที่มีผู้เรียกแต่ละ hashtag จนถึงเวลานั้นๆ

![bnk_ranking_with_time]({{ site.url }}/assets/img/twitterBNK48/bnk_ranking_with_time.png)

โดยใน line plot นะครับ ก็จะเห็นว่าการขับเคี่ยวระหว่าง #cherprangbnk48 กับ #punbnk48 นั้น มีช่วงที่ #cherprangbnk48 โดนทิ้งห่างไปเป็นระยะเวลานานกว่า 20 นาทีเลยทีเดียว แต่ก็กลับมาสูสีกันอีกครั้งในตอนท้ายๆ นอกจากนี้ก็ยังเห็นข้อสังเกตอื่นๆ เช่น จำนวนคนพูดถึง #musicbnk48 ที่เกิดขี้นในระยะเวลา 60 นาทีนั้น อยู่ในระดับเดียวกับจำนวนคนพูดถึง #cherprangbnk48 กับ #punbnk48 ในเวลาเพียงแค่ 40 นาที


#### เมื่อเราทำการ streaming จนพอใจแล้วก็ปิดการ streaming ด้วยคำสั่งนี้ครับ

```python
# close the connection
s.close()
```

ปล. อย่าลืมไปปิดตัว terminal ที่รัน python script (streamingTwitterTags.py) เชื่อมต่อกับ Twitter API ด้วยนะครับ


## ส่งท้าย

จบแล้วครับสำหรับการทำ code และตัวอย่างการสำรวจความนิยมของสาวๆ BNK48 โดยใช้ Twitter API + Python

เป็นไงบ้างครับ โอชิใครขึ้นแท่นสมาชิกสุดฮอทของวงบ้าง โอชิใครหลุดลำดับไปก็ชวนเพื่อนๆ ไปช่วยกันทำคะแนนความนิยมเพิ่มได้โดยการไป flood Twitter กันนะครับ XD

{% include image.html
  img='assets/img/twitterBNK48/otaku_power.jpg'
  title='otaku_power'
  caption='Otaku Power -- Thank <a href="https://holyonthenet.webnode.es/news/cafes-cosplay-/">https://holyonthenet.webnode.es/news/cafes-cosplay-/</a> for the image.'
%}

หวังว่าตัวอย่างนี้จะพอเป็นประโยชน์กับผู้ที่สนใจจะทำ data streaming ด้วย Python บ้างนะครับ

หากส่วนไหนผิดพลาดหรือมีข้อแนะนำเพิ่มเติมตรงไหนก็ช่วยแจ้งได้เลยนะครับ ขอบคุณครับผม
