---
layout: post
title: "Blockchain DIY: สร้างและแสดงแผนผัง blockchain network ของคุณเองด้วย Python"
date: 2017-07-28
category: coding
---

<div class="my-4 text-center">
  <img class="w-50" src="{{ site.url }}/coding/img/blockchain/cover.png">
</div>

##### คำขอบคุณ:  
เนื้อหาที่เขียนขึ้นได้รับแรงบันดาลใจจากบทความ [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b) โดย Gerald Nash ซึ่งตัว code ที่ผมเขียนนั้นสร้างต่อจาก code ที่นำเสนอไว้ในบทความดังกล่าว

##### Credit:  
The content is inspired by [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b) by Gerald Nash. The code presented here is an expansion of what provided in the original article.

## บทนำ
ณ เวลานี้กระแสเรื่อง blockchain กำลังได้รับการพูดถึงอย่างมาก มีการคาดหมายว่าเทคโนโลยีนี้จะเปลี่ยนรูปแบบการดำเนินงานของหลายภาคส่วน ทั้งภาครัฐและเอกชน ตัวอย่างเช่น ภาคการเงินที่สร้างสกุลเงินที่มีระบบบัญชีกลางเพื่อกระจายความน่าเชื่อถือ (เช่น [BitCoin](https://www.bitcoin.com/), [Ethereum](https://www.ethereum.org/), [IOTA](https://iota.org/)), ระบบบันทึกข้อมูลและแหล่งที่มาของสินค้า, ระบบการเลือกตั้งออนไลน์, ระบบบัญชีตรวจสอบการใช้จ่ายงบประมาณของรัฐบาล, และอีกมากมาย

Blockchain ทำงานอย่างไร? ส่วนนี้ไม่ใช่เนื้อหาหลักของบทความนี้ แต่ขออธิบายสั้นๆ เพื่อเพิ่มความสมบูรณ์ว่า blockchain นั้นวางบนหลักการที่สร้างระบบบัญชีกลางที่มีการเข้ารหัสเพื่อให้ยากต่อการถูกเปลี่ยนแปลง โดยผู้ใช้ทุกคนสามารถเข้าถึงและยืนยันระบบบัญชีกลางนี้ร่วมกัน ยิ่งมีผู้ใช้ระบบบัญชีกลางนี้มาก การที่จะมีผู้มาปลอมแปลงข้อมูลนั้นก็จะยิ่งยาก เพราะรหัสที่เข้าของแต่ละ transaction นั้นมีความเชื่อมโยงกับทั้งข้อมูลเฉพาะของ transaction นั้นๆ (เช่น เลขอ้างอิง, เวลา) และ transactions ในอดีต รวมทั้งยังต้องได้รับการยอมรับจากผู้ใช้คนอื่นๆ ที่ถือบัญชีกลางร่วมกันอยู่

มีหลายบทความที่เขียนอธิบายเรื่องนี้ในเชิงลึก เช่น ฉบับภาษาไทย [*Blockchain คืออะไร? อธิบายแบบละเอียด แต่เข้าใจง่าย(มั้ง)*](https://nuuneoi.com/blog/blog.php?read_id=900) นี้

บทความน่าสนใจอื่นๆ ในเรื่องนี้ เช่น  
[*Blockchain: the revolution we’re not ready for*](https://medium.freecodecamp.org/blockchain-is-our-first-22nd-century-technology-d4ad45fca2ce),  
[*Can Blockchain Technology Secure Your Vote?*](http://www.govtech.com/blogs/lohrmann-on-cybersecurity/can-blockchain-technology-secure-your-vote.html),  
[*กสิกรไทยจัดสัมมนาฟินเทค เปิดตัวหนังสือค้ำประกันผ่าน Blockchain ตัวแรกของโลก*](https://siamblockchain.com/2017/07/19/%E0%B8%81%E0%B8%AA%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B9%84%E0%B8%97%E0%B8%A2-blockchain-seminar/),  
[*ธนาคารไทยพาณิชย์เปิดให้บริการระบบโอนเงินด้วย Ripple ระหว่างประเทศไทยและญี่ปุ่น*](https://siamblockchain.com/2017/06/30/scb-launches-ripple-blockchain-money-transfer-platform/)

{% include image.html
  img='coding/img/blockchain/blockchain_and_tech.jpg'
  title='Blockchain and technologies'
  caption='Blockchain and technologies -- Thank <a href="www.monito.com">www.monito.com</a> for the  illustration.'
  url='https://c1.staticflickr.com/1/324/32190820722_467c172a2d_b.jpg'
%}



## สร้าง blockchain network ของเราเอง

การจะเข้าใจระบบ blockchain ให้ดีขึ้นนั้น นอกจากการอ่านบทความต่างๆ แล้ว การลงมือลองเขียนมันขึ้นมาเองเลยก็เป็นอีกช่องทางหนึ่ง โดยเฉพาะผู้มีพื้นฐานและชอบด้านการเขียน program ซึ่งเราจะมาสร้างและวาดผัง blockchain ด้วยภาษา Python

ผู้สนใจด้าน blockchain แต่ไม่ถนัดด้าน programming ก็ลองอ่านตามดูได้ครับ จะเน้นการอธิบายให้เห็นภาพรวมและจะแสดงผัง blockchain ที่เราสร้างเองในส่วนต่อๆ ไป ซึ่งจะช่วยให้เข้าใจระบบของ blockchain ได้ดียิ่งขึ้น



## ทำความเข้าใจ code จาก  [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b)

ก่อนอื่นมาทำความเข้าใจตัว code เดิมบน [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b) ก่อน ขออนุญาตไม่นำมาโพสต์ใหม่ ให้เข้าไปดูในหน้านั้นประกอบการอธิบายนะครับ

ในบทความที่อ้างถึงนั้นมี code อยู่ 4 ส่วน เราจะมาพูดถึงไปทีละส่วน

1. เนื่องจากเรากำลังจะสร้าง blockchain network ก็ควรจะเริ่มต้น**นิยาม block และส่วนประกอบต่างๆ** ก่อน
  * code ส่วนแรกนี้นิยาม *class* `Block` ขึ้นมาโดยบอกว่า แต่ละ block ประกอบด้วยข้อมูล `index` (ลำดับ), `timestamp` (เวลาที่ถูกสร้าง), `data` (ข้อมูลเฉพาะ เช่น ถ้าทางการเงินก็อาจจะเป็นยอดโอน), `previous hash` (รหัสประจำตัวของ block ก่อนหน้า), และ `hash` (รหัสประจำตัวของ block)
  * ตัว `hash` นั้นสร้างโดยการเข้ารหัสผ่าน *class method* `hash_block()` ซึ่งนำข้อมูลทั้งหมดของ block (ยกเว้นตัว `hash` เอง) มาใช้ โดยป้อนข้อมูลเหล่านี้เข้า SHA-256 hash function (BitCoin ก็ใช้ SHA-256 ในการทำงานเช่นกัน -- [https://en.bitcoin.it/wiki/SHA-256](https://en.bitcoin.it/wiki/SHA-256))
  * เจ้า `hash` นี้ล่ะคือ รหัสประจำตัวของ block ที่พูดถึงใน **บทนำ** ว่าเป็นตัวที่ทำให้ blockchain นั้นยากต่อการถูกปลอมแปลง
2. ส่วนที่สองเป็นการสร้าง *method* `create_genesis_block()` เพื่อ**แก้ปัญหาการนิยาม block แรกในระบบ**
  * เนื่องจาก blockchain เป็นโครงสร้างของ block จำนวนมากต่อๆ กัน โดยเราเห็นแล้วว่า `hash` ของแต่ละ block นั้นขึ้นกับ `hash` ของ block ก่อนหน้าด้วย คำถามก็คือ แล้ว block แรกที่ถูกสร้าง (นิยมเรียกกันว่า **genesis**, `index=0`) นั้นจะเอาข้อมูลนี้มาจากไหน ในเมื่อไม่มี block ก่อนหน้า?
  * ทางแก้ก็คือกำหนดมันขึ้นมาเองเลย (เป็นข้อยกเว้นสำหรับ genesis) โดยเราตั้งค่า `previous_hash` เป็นอะไรก็ได้ (ใน code นี้ใช้ค่า `"0"`) เพื่อสร้าง genesis ขึ้นมา
3. เมื่อทำ method สำหรับสร้าง genesis แล้ว เราก็ต่อด้วยการ**สร้าง method เพื่อที่จะสร้าง block ต่อจาก genesis ลงไปเรื่อยๆ** โดยให้ชื่อเป็น `next_block(last_block)`
  * *method* นี้ก็เก็บข้อมูลต่างๆ ที่จำเป็นในการสร้าง block ตามนิยามของ *class* `Block` แล้วสุดท้ายก็ส่งค่าเพื่อสร้าง block ใหม่ เมื่อถูกเรียก
4. เมื่อมีครบทั้งนิยามของ *class* และ *method* ในการสร้าง block แล้ว คราวนี้ก็ได้เวลา**สร้าง blockchain network**
  * เริ่มด้วยการสร้าง *list* `blockchain` ไว้เก็บข้อมูล block ที่ถูกสร้างขึ้นทั้งหมดโดยเริ่มแรกให้มีเพียง genesis เท่านั้น
  * ตามด้วยการเลือกว่าอยากเติม block ลงไปกี่ block โดยการตั้งค่า `num_of_blocks_to_add` ซึ่งในตัวอย่างนี้ตั้งไว้ที่ 20
  * หลังจากนั้นเราก็เติม block ต่อจาก genesis โดยการทำ *for-loop* ซึ่งแต่ละรอบจะอัพเดต *list* `blockchain` ที่โปรแกรมสร้างขึ้น และตัวแปร `previuos_block` เพื่อใช้สร้าง block ใหม่ในรอบถัดไปของ loop ปิดท้ายด้วยการพิมพ์ `index` และ `hash` ของ block ที่ถูกสร้างขึ้น

เมื่อสั่งประมวล code ทั้งสี่ส่วนนี้แล้ว blockchain ก็ได้ถูกสร้างขึ้นมาเรียบร้อยครับ



## แผนผัง blockchain network ที่สร้างโดย code จาก [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b)

เมื่อดูไฟล์ภาพที่ต่อจาก code ส่วนที่ 4 ในหน้าบทความเดิม ซึ่งแสดงผลที่พิมพ์โดยคำสั่ง **`print`** ใน *for-loop* ก็จะเห็นได้ว่า blocks ได้ถูกสร้างขึ้นพร้อมเลข `hash` ประจำตัว แต่เพื่อที่จะแสดงผล blockchain network ที่สร้างขึ้นนี้ให้เห็นภาพชัดเจนยิ่งขึ้น ผู้เขียนจึงเติม code ลงไปในส่วนเดิมเล็กน้อย โดยใช้ [Graphviz](http://www.graphviz.org/) ซึ่งเป็นโปรแกรมที่ช่วยในการวาดผังความเชื่อมโยงที่มี python package ชื่อเดียวกันเป็นตัวจัดการ ([Graphviz-python](http://graphviz.readthedocs.io/en/stable/index.html))

ขอพูดถึง code ใหม่ ที่เขียนและแสดงไว้ข้างล่างนิดหน่อยว่ามีการต่อเติมอะไรบ้าง
*  **ADDED PART 1**: สร้าง *graphviz Digraph object* ชื่อ `dot` เพื่อเป็นตัวเก็บข้อมูลของ blocks ใน blockchain เพื่อจะวาดแผนผัง (diagram)
*  **ADDED PART 2**: เติมคำสั่งใน *for-loop* ให้สร้างเส้นเชื่อมโยง (edge) ระหว่าง block ใหม่ที่สร้างและ block ก่อนหน้า และเก็บค่าเข้า `dot` ที่เราสร้างไว้

นอกจากนั้นผมได้ลดค่า `num_of_blocks_to_add` เป็น 5 เพื่อให้แสดงภาพได้ง่ายขึ้นครับ


```python
## ADDED PART 1
from graphviz import Digraph
dot = Digraph(comment='blockchain')
dot.attr(rankdir='RL')
## END ADDED PART 1

# Create the blockchain and add the genesis block
blockchain = [create_genesis_block()]
previous_block = blockchain[0]

# How many blocks should we add to the chain after the genesis block
num_of_blocks_to_add = 5

for i in range(1, num_of_blocks_to_add+1):
    block_to_add = next_block(previous_block)
    blockchain.append(block_to_add)
    previous_block = block_to_add

    # Tell everyone about it!
    print("Block #{} has been added to the blockchain!".format(block_to_add.index))
    print("Hash: {}\n".format(block_to_add.hash))

    ## ADDED PART 2
    # Draw blocks
    dot.edge(str(blockchain[i].index),str(blockchain[i-1].index), label='{:.4}...'.format(blockchain[i].hash))
    ## END ADDED PART 2
```

เมื่อประมวล code นี้ คำสั่ง **`print`** ที่แสดงข้อมูลและ `hash` ของ block ก็อ่านค่าออกมาคล้ายๆ เดิมนะครับ แต่ค่า hash ต่างกัน เพราะ code ถูกประมวลคนละเวลา (ค่า `datetime` ที่ป้อนเข้า hash function generator ไม่เหมือนกัน)

    Block #1 has been added to the blockchain!
    Hash: f42c0da4378a023a65c0142c2044744e0baa53cc5a219f5608b25fddfe7a66b2

    Block #2 has been added to the blockchain!
    Hash: da30cfc8e83c9c33049418d5dfac6f872d486fb7c72777e97243dd30dcbb07e9

    Block #3 has been added to the blockchain!
    Hash: 128dfc672d0086bb46c23fce4bb068cb0ad5e81168538e43c17b4f16f185bab6

    Block #4 has been added to the blockchain!
    Hash: 8370eecc16a4f9a3ff67cd66fde05afbc4f1d73e41383b8afe69af20165bb108

    Block #5 has been added to the blockchain!
    Hash: e3e319fc25be0f3b85f2dae0bff9813cb64e561ce3f3eb3964d1fa05c5825b65

ทีนี้เมื่อเราสั่งให้แสดงตัว `dot` diagram ก็จะเห็นผังของ blockchain ที่เราสร้างเป็นแบบนี้ครับ


<div class="my-2 text-center">
  <img class="w-75" src="{{ site.url }}/coding/img/blockchain/block_01.svg">
</div>


blockchain ที่สร้างจาก ตัว code ที่กล่าวมานั้นเป็น blockchain แบบเส้นตรง (linear) ที่สมบูรณ์แบบ เนื่องจาก code ที่เราทดสอบนั้นบังคับให้การสร้าง block ใหม่ต้องใช้ข้อมูลจาก block ก่อนหน้าที่เพิ่งถูกสร้างเท่านั้น โดยตัวผังนั้นแสดงความเชื่อมโยงของ network ว่าให้แต่ละ block มีลูกศรชี้ไปยัง *`previous_block`*  ของมันเอง เป็นการบอกว่า block นั้นๆ สร้างต่อจาก block ไหน และ ที่ลูกศรก็จะแสดงค่า `hash` (แสดงค่าแค่ 4 หลักแรก) ของแต่ละ block เช่น ลูกศรที่ชี้จาก  block 1 ไป block 0 นั้นมีค่า `hash` ของ block 1 กำกับอยู่

แผนผังนี้แสดง blockchain network ในอุดมคติ ซึ่งในความเป็นจริงแล้ว blockchain network สามารถมีสาย chain ย่อยๆ ถูกทำให้เกิดขึ้นมาได้



## Blockchain network ที่สมจริงมากขึ้น

ระบบ blockchain ที่ใช้งานจริงและประสบความสำเร็จ (มีผู้ใช้มาก) นั้น มีความเป็นเป็นไปได้สูงที่จะมีพฤติกรรมที่ไม่เป็นไปตามอุดมคติ โดยอาจจะมีพฤติกรรมเช่นตัวอย่างข้างล่างนี้


<div class="my-2 text-center">
  <img class="w-75" src="{{ site.url }}/coding/img/blockchain/block_02.svg">
</div>


เห็นได้ว่า blockchain นี้มีโครงสร้างที่ซับซ้อนขึ้น ผู้เขียนจึงให้มีตัวแปรที่กำกับ blockchain เพิ่มขึ้น คือ ชั้น (`layer`) เพื่อประกอบการอธิบาย โดยให้ genesis (`index=0`) อยู่ใน `layer=0` ซึ่งใน linear blockchain ก่อนหน้านั้น ค่า `layer = index` ตายตัว จึงไม่จำเป็นต้องนิยาม

โดยในตัวอย่างข้างบนนั้นมี block ทั้งหมด 12 blocks (รวม genesis) แต่มีเพียง 8 layers (รวม `layer=0`) เช่น block 3 และ block 5 นั้นอยู่บน layer=2 ร่วมกัน  

ข้อสังเกตอีกอย่าง คือ block ที่ถูกสร้างนั้นไม่จำเป็นต้องถูกสร้างต่อจาก `previous_block` เช่น  block 5 ไม่ได้ถูกสร้างต่อจาก block 4 แต่ถูกสร้างต่อจาก block 1 ดังนั้น block 1 จะถือว่าเป็น `parent_block` ของ block 5

พฤติกรรมที่ซับซ้อนขึ้นของ blockchain นั้นเป็นผลเนื่องมาจากหลายสาเหตุ เช่น
* ผู้ใช้ไม่สนใจช่วยเพิ่มความแข็งแกร่งของ blockchain (ยิ่งต่อยาวยิ่งมีแนวโน้มว่าระบบจะปลอดภัยขึ้น)
* ผู้ใช้จำนวนมากส่งคำสั่งพร้อมกัน เช่น block 3 และ block 5 ส่งคำสั่งว่าจะขอต่อกับ block 1 ในเวลาเดียวกัน
* มีผู้ต้องการรบกวนระบบเพื่อผลประโยชน์ตัวเอง เช่น รับรองการทำธุรกรรมซ้อน (double spending)

นอกจากนี้ระบบ blockchain ยังมีรายละเอียด อื่นๆ เช่น เรื่อง **proof of work** และค่าความยากที่จะมีผลต่อการตัดสินใจของผู้ใช้ว่าจะส่ง block ของตัวเองไปต่อกับที่ไหน แต่ในที่นี้ขอสรุปอย่างสั้นๆ ไว้เท่านี้ก่อนนะครับ



## ต่อเติม code เพื่อจำลอง blockchain network ที่สมจริง

หากเราอยากสร้างแบบจำลอง blockchain ที่สมจริงขึ้น เราก็ต้องลงมือต่อเติม code จาก [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b) โดยเฉพาะในเรื่องการสร้าง block ใหม่ โดยใช้ `parent_block` แทน `previous_block`

ผู้เขียนทำการเปลี่ยนแปลงดังนี้ครับ

### 1. ต่อเติมนิยามของ class *`Block`*

* **PART 1**: สร้าง *2 class attrubutes* คือ `class_index` และ `class_layer` เพื่อเก็บค่าว่า blockchain ที่สร้างขึ้นนั้นมีทั้งหมดเท่าไหร่ และ จัดเรียงตัวแล้วกี่ชั้น ตามลำดับ

* **PART 2**: อัพเดตให้แต่ละ block จัดเก็บค่า `parent_index` และ `layer` ของ block นั้นๆ ด้วย

ข้อมูลที่เก็บเพิ่มนี้จะถูกนำมาใช้เพื่อสร้าง algorithm สำหรับเลือก `parent_block` ในการสร้าง blockchain


```python
import hashlib as hasher

# Define a 'Block' class
class Block:

    ## PART 1
    # Create class attributes for parent selection algorithm
    class_index = 0
    class_layer = 0
    ## END PART 1

    # Instantiation method
    def __init__(self, index, timestamp, data, parent_hash, parent_index, layer):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.parent_hash = parent_hash
        self.hash = self.hash_block()
        ## PART 2
        # Add instance attributes for parent selection algorithm and creating DataFrame summary
        self.parent_index = parent_index
        self.layer = layer
        ## END PART 2

    # Create block's hash
    def hash_block(self):
        sha = hasher.sha256()
        sha.update((str(self.index) + str(self.timestamp) + str(self.data) + str(self.parent_hash)).encode('utf-8'))
        return sha.hexdigest()
```

### 2. อัพเดตการสร้าง genesis

ส่วนนี้ไม่ได้เพิ่มอะไรมาก เพียงแค่ป้อนข้อมูลเพิ่มในการสร้าง genesis เพื่อให้รับกับนิยามของ *class* `Block` ใหม่ โดยให้ genesis มี `parent_index='NaN'` และ `layer=0`


```python
# Create genesis

import datetime as date

def create_genesis_block():
    return Block(0, date.datetime.now(), "Genesis Block", "0", 'NaN', 0)
```

### 3. อัพเดต *method* สำหรับต่อ block ใน blockchain

* **PART 1**: ให้ *method* `next_block()` รับค่า `parent_block` จากเดิมใช้ `last_block`
* **PART 2**: เมื่อมี block ใหม่ถูกสร้าง (*method* ถูกเรียก) ให้ +1 ค่า *class attribute* `class_index` และใช้ค่านั้นเป็น `index` ของ block นั้น
* **PART 3**: ตั้งค่า `layer` ของ block ให้เท่ากับ +1 ค่า `layer` ของ `parent_block` พร้อมอัพเดตค่า *class attribute* `class_layer` หากการสร้าง block นี้ทำให้จำนวน `layer` ของ blockchain ทั้งระบบเพิ่มขึ้น

หลังจากนั้นก็คืนค่า block ใหม่ที่ต้องการสร้างในบรรทัดสุดท้าย


```python
# Create next block

## PART 1
def next_block(parent_block):

    ## PART 2
    # +1 to the 'class_index' class attribute to keep track of the number of blocks created
    Block.class_index = Block.class_index + 1
    this_index = Block.class_index
    ## END PART 2

    # More data to be assigned when instantiate a block. Specific for each block/transaction
    this_timestamp = date.datetime.now()
    this_data = "Hey! I'm block " + str(this_index)
    this_hash = parent_block.hash

    ## PART 3
    # Check if the new block's layer is higher than the 'class_layer' class attribute, then update 'class_layer'
    this_layer = parent_block.layer + 1
    if this_layer > Block.class_layer:
        Block.class_layer = this_layer
    ## END PART 3

    return Block(this_index, this_timestamp, this_data, this_hash, parent_block.index, this_layer)
```

### 4. สร้าง *method* สำหรับเลือก `parent_block`

code ส่วนนี้ ไม่มีใน [*Let’s Build the Tiniest Blockchain*](https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b) ซึ่งเจ้าตัวนี้เองที่จะช่วยให้สามารถจำลอง blockchain network ที่สมจริงมากขึ้นอย่างที่แนะนำไว้ก่อนหน้า

ก่อนจะสร้าง *method* ขึ้นมา เราก็มาตั้งสมมติฐานไว้กันก่อนว่าผู้ใช้มีจะแนวทางการเลือก `parent_block` สำหรับจะสร้าง block ของต่ออย่างไร โดยเราตั้งไว้สองข้อ ดังนี้

1. ผู้ใช้โดยทั่วไปจะเลือกต่อ block กับ `parent_block` ที่ยังว่างอยู่ แต่อาจมีข้อยกเว้น เช่น ส่งคำสั่งซ้อน อย่างที่กล่าวไปแล้ว โดยขอตั้งชื่อตัวแปรความน่าจะเป็นที่จะเลือกต่อกับ parent ที่ยังว่างอยู่ (nonchained parent) ว่า `nonchained_parent_prob` มีค่าระหว่าง 0-1

2. ถึงจะมีคำสั่งซ้อนเพื่อจะต่อกับ parent ที่มีคนอื่นมาต่อแล้ว (chained parent) แต่คำสั่งนั้นต้องไม่ช้า (delay) เกินไป ส่วนนี้จะควบคุมด้วยการดูค่า `layer` ของ `parent_block`ให้มีค่าใกล้เคียงกับจำนวน layer ของทั้งระบบ (total layer = *class attribute* `class_layer`) โดยกำหนดให้ parent's layer มีค่าระหว่าง  (total layer - layer_span) ถึง total layer ซึ่งตัว `layer_span` นี้จะเป็นตัวแปรใหม่ที่เราป้อนลง code  
   ข้อจำกัดนี้ยังช่วยให้ blockchain ไม่วุ่นวายจนเกินไป เช่น ในผัง blockchain ที่แสดงไว้ก่อนหน้า หากมีผู้ใช้จะต่อ block 12 จะไม่สามารถข้ามไปต่อกับ block 2 ได้ ทำใหั blockchain ในภาพรวมยังมีเส้น chain หลักอยู่

เมื่อตั้งสมมติฐานดังนี้แล้ว ก็ได้เวลาสร้าง *method* `select_parent_block()` เพื่อเลือก `parent_block` โดยการหาค่า `parent_index`

* **PART 1**: สร้าง *method* โดยให้รับค่า `block_total` (จำนวน blocks ทั้งหมดในขณะนั้น), `nonchained_parent_prob`, และ `layer_span`
* **PART 2** (*if-else* ชั้นนอก): ใช้เพื่อให้ตอนสร้าง block แรก ที่ใน blockchain ยังมีแค่ genesisเท่านั้น (`block_total=1`) โดยให้ข้ามไปใช้ `parent_index=0` เลย เพราะจะต้องต่อกับ genesis แน่นอน ถ้าไม่มีส่วนนี้อาจจะเกิด error ได้ (ลองหาดูว่าเพราะอะไรครับ)
* **PART 3**: <สืบเนื่องจากสมมติฐานที่ 1>  
  สุ่มว่าจะได้ `parent_block` ที่เป็น nonchained (ยังไม่มีคนต่อ) หรือ chained (มีคนต่อแล้ว) จากนั้นก็มาดูว่า มี block ไหนบ้างที่ตรงกับเงื่อนไข โดยดูค่า `parent_index_cand_byChain`
* **PART 4**: <สืบเนื่องจากสมมติฐานที่ 2>  
  ดูว่ามี block ไหนบ้างที่มีค่า `layer` อยู่ระหว่าง `class_layer` ของทั้ง blockchain และ `class_layer - layer_span` โดยดูค่า `parent_index_cand_byLayer`
* **PART 5**: สุ่มเลือกค่า `parent_index` ที่จะใช้มาหนึ่งค่า จาก `parent_index` ที่ผ่านเงื่อนไขทั้งสองข้างต้น
* **`return`**: คืนค่า `parent_index` เพื่อใช้สร้าง block ใหม่


```python
# Parent selection

## PART 1
def select_parent_block(block_total, nonchained_parent_prob, layer_span):

    ## PART 2 (outer if-else)
    # This first 'if' block will be skipped when there is only the genesis block, and return parent_index=0
    if block_total > 1:

        ## PART 3
        # High nonchained_parent_prob value = likely to get a parent block that has not beed chained
        get_chained_parent = np.random.choice([False,True], p=[nonchained_parent_prob, 1-nonchained_parent_prob])
        if ~get_chained_parent:
            # Block_indices that satisfy a (non)chain constrain
            parent_index_cand_byChain = np.where(~blockchain_chained)[0]
        else:
            # Block_indices that satisfy a chain constrain
            parent_index_cand_byChain = np.where(blockchain_chained)[0]
        ## END PART 3

        ## PART 4
        # Limit a parent block's layer to be close to the most recent layer created
        layer_floor = max(0, Block.class_layer + 1 - layer_span)
        # Block_indices that satisfy the layer selection constrain
        parent_index_cand_byLayer = np.where(blockchain_layer>=layer_floor)[0]
        ## END PART 4

        ## PART 5
        # Block_indices that satisfy both the layer and chain constrain
        parent_index_cand = np.intersect1d(parent_index_cand_byLayer, parent_index_cand_byChain)
        # Randomly select a parent block from the candidates
        parent_index = np.random.choice(parent_index_cand)
        ## END PART 5

    else:
        parent_index = 0

    return parent_index
```

### 5. สร้าง blockchain

มาถึงตอนนี้เราก็มี *class* และ *method* พร้อมสำหรับจะสร้าง blockchain ของเราแล้ว เหลือเพียงแค่สร้างตัวแปรอีกนิดหน่อยเพื่อบันทึกค่า และประมวล code

* **PART 1**: ตั้งค่า `class_index` และ `class_layer` เป็น 0 เพื่อเริ่มสร้าง blockchain
* **PART 2**: ตั้งค่าว่าเราต้องการต่อ block ทั้งหมดกี่ block (ในที่นี้เราจะต่อ 30 blocks) และตัวแปรสองตัวที่ใช้สำหรับเลือก `parent_block` ตามสมมติฐานที่เราตั้งไว้
* **PART 3**: กำหนดตัวแปรสำหรับเก็บข้อมูล (ในที่นี้ใช้ *numpy array*) เพื่อเก็บข้อมูลของ blockchain โดยตัวแปร `blockchain` นั้นใช้เก็บข้อมูลทั้งหมด ส่วนตัวอื่นๆ สร้างไว้ช่วยตอนเรียกแสดงผลในขั้นต่อไป
* **PART 4**: ทำ *for-loop* ให้สร้าง blockchain และเก็บข้อมูลลงตัวแปรที่ทำไว้


```python
import numpy as np

## PART 1
# Set starting condition
Block.class_index = 0
Block.class_layer = 0
## END PART 1

## PART 2
# How many blocks should we add to the chain after the genesis block and parent selection conditions
num_of_blocks_to_add = 30
nonchained_parent_prob = 0.85
layer_span = 3
## END PART 2

## PART 3
# Create the blockchain and add the genesis block
blockchain = np.array([create_genesis_block()])
# Create numpy arrays to store data for parent selection algorithm and building DataFrame summary
blockchain_parent_index = np.array([blockchain[0].parent_index])
blockchain_layer = np.array([blockchain[0].layer])
blockchain_hash = np.array([blockchain[0].hash])
blockchain_chained = np.array([False])
## END PART 3

## PART 4
# Add blocks to the chain
for i in range(0, num_of_blocks_to_add):
    # Get how many blocks are currently in the blockchain
    block_total = Block.class_index + 1

    # Select parent block
    parent_index= select_parent_block(block_total, nonchained_parent_prob, layer_span)
    parent_block = blockchain[parent_index]

    # Create new block
    block_to_add = next_block(parent_block)

    # Update information arrays
    blockchain = np.append(blockchain, [block_to_add], axis=0)
    blockchain_parent_index = np.append(blockchain_parent_index, [block_to_add.parent_index])
    blockchain_layer = np.append(blockchain_layer, [block_to_add.layer])
    blockchain_hash = np.append(blockchain_hash, [block_to_add.hash])
    # A newly created block is not yet chained, its parent block must be chained
    blockchain_chained = np.append(blockchain_chained, [False])
    blockchain_chained[parent_index] = True
## END PART 4
```

### 6. จัดค่าลงตารางแสดงข้อมูล

ตอนนี้เราสร้าง blockchain เสร็จแล้ว ก็มาจัดข้อมูลลงตาราง (*pandas DataFrame*) ดูครับ

```python
import pandas as pd

# Organize block details in DataFrame
block_table = pd.DataFrame(columns = ['parent_index', 'layer', 'chained', 'hash'])
block_table.parent_index = blockchain_parent_index
block_table.layer = blockchain_layer
block_table.chained = blockchain_chained
block_table.hash = blockchain_hash

# Show some block indices and their attributes
block_table.sample(10)
```

เมื่อให้สุ่มแสดงผล block มา 10 blocks ก็ได้ตารางออกมาหน้าตาแบบนี้ โดยตัวเลขประจำตัวของ block (`index`) อยู่แถวซ้ายสุด จากนั้นก็บอกว่าแต่ละ block นั้น สร้างต่อจาก `parent_index` ไหน, อยู่ใน `layer` ที่เท่าไหร่ของ blockchain, มี block อื่นมาต่อด้วยรึเปล่า, และค่า `hash` เป็นอะไร

<!-- <style  type="text/css" >
    #T_350d94da_720e_11e7_890b_e2977e6fb8fa tr {
          font-size: 100%;
          text-align: center;
    }</style>  
<table id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" > -->
<table>
<thead>    <tr>
        <th class="blank level0" ></th>
        <th class="col_heading level0 col0" >parent_index</th>
        <th class="col_heading level0 col1" >layer</th>
        <th class="col_heading level0 col2" >chained</th>
        <th class="col_heading level0 col3" >hash</th>
    </tr></thead>
<tbody>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row0" >28</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow0_col0" class="data row0 col0" >26</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow0_col1" class="data row0 col1" >16</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow0_col2" class="data row0 col2" >False</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow0_col3" class="data row0 col3" >00b3ed042d608c6831969b679677b188d1d368cc322516568d4ff429aa2797e3</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row1" >26</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow1_col0" class="data row1 col0" >25</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow1_col1" class="data row1 col1" >15</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow1_col2" class="data row1 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow1_col3" class="data row1 col3" >e52a891075c8fc9bae64342f2204a5769366496559848a40d4b55a2c2a10020d</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row2" >8</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow2_col0" class="data row2 col0" >5</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow2_col1" class="data row2 col1" >3</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow2_col2" class="data row2 col2" >False</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow2_col3" class="data row2 col3" >8896e24920386e0b8b3aae8828545eb14bfee464d18254be42172d130be47898</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row3" >15</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow3_col0" class="data row3 col0" >13</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow3_col1" class="data row3 col1" >7</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow3_col2" class="data row3 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow3_col3" class="data row3 col3" >0613a395b344854a95c543bc64ea6b06bd71d616fbb564da241f4c6fff04227d</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row4" >0</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow4_col0" class="data row4 col0" >NaN</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow4_col1" class="data row4 col1" >0</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow4_col2" class="data row4 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow4_col3" class="data row4 col3" >ad6187edff00e350b21d430d165865d1699e7255a724ec6e3b6ef5a3d9f7b00c</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row5" >20</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow5_col0" class="data row5 col0" >18</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow5_col1" class="data row5 col1" >9</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow5_col2" class="data row5 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow5_col3" class="data row5 col3" >7540618fe82e420034918d6eb93008a7285fc067706476c7f4620c697f48138c</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row6" >29</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow6_col0" class="data row6 col0" >27</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow6_col1" class="data row6 col1" >17</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow6_col2" class="data row6 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow6_col3" class="data row6 col3" >3295a7ec1ca39fd5a75dab712181861dfcfb9b61e977a7f9984863df98ac1805</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row7" >10</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow7_col0" class="data row7 col0" >9</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow7_col1" class="data row7 col1" >5</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow7_col2" class="data row7 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow7_col3" class="data row7 col3" >ae4651586d1a2412ca5080f76345beaa83a1ae602ec3ead21995ef0584bf4fb9</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row8" >13</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow8_col0" class="data row8 col0" >10</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow8_col1" class="data row8 col1" >6</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow8_col2" class="data row8 col2" >True</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow8_col3" class="data row8 col3" >7288dad61e2c278b6e84183c2bca84002f9347c4bd9c27481489b605a65c5980</td>
    </tr>    <tr>
        <th id="T_350d94da_720e_11e7_890b_e2977e6fb8fa" class="row_heading level0 row9" >4</th>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow9_col0" class="data row9 col0" >1</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow9_col1" class="data row9 col1" >2</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow9_col2" class="data row9 col2" >False</td>
        <td id="T_350d94da_720e_11e7_890b_e2977e6fb8farow9_col3" class="data row9 col3" >c492fc812f839f0b159ed3302d858787780e330ba2e8f732db3b053cc32a777a</td>
    </tr></tbody>
</table>



### 7. หน้าตา blockchain network

หลังจากดูตารางแล้วก็มาดูผังหน้าตาของ blockchain ที่เราสร้างขึ้นนี้กัน โดยใช้ [Graphviz](http://www.graphviz.org/) เช่นเดิม ได้ผลแสดงออกมาแบบนี้ครับ


```python
# Draw blockchain network

from graphviz import Digraph

# Create a Digraph element 'new_dot'
new_dot = Digraph(comment='blockchain')
new_dot.attr(rankdir='BT')

# Construct a diagram by spelling all the edges that connect the nodes
for i in range(1, num_of_blocks_to_add+1):
    new_dot.edge(str(block_table.index[i]), str(block_table.parent_index[i]), label='{:.5}...'.format(block_table.hash[i]))

# Display the diagram
new_dot
```

<div class="my-2 text-center">
  <img class="w-75" src="{{ site.url }}/coding/img/blockchain/block_03.svg">
</div>


เมื่อเลื่อนดูจนสุด ก็สรุปได้ว่า blockchain network ถูกสร้างออกมาเรียบร้อยจริงๆ และเป็นไปตามที่เราคิดไว้ว่ามันจะมี side chains บ้าง แต่รวมๆ แล้วก็ยังคงมี chain หลักที่จะสร้างยาวต่อไปเรื่อยๆ ครับ



## บทส่งท้าย

หากอ่านมาถึงตรงนี้ ก่อนอื่นก็ขอบคุณมากครับ เขียนออกมายาวกว่าที่คิด  
หวังว่าบทความนี้จะช่วยให้ผู้อ่านเข้าใจระบบ blockchain ดีขึ้น, เห็นภาพรวมการทำงาน, และช่วยในการมองว่า blockchain นั้นจะสามารถถูกนำมาประยุกต์ใช้ในด้านต่างๆ อย่างไร

สุดท้ายหากเนื้อหาที่เขียนส่วนไหนไม่ถูกต้อง, code หรือการอธิบายตรงไหนควรแก้ไข ปรับปรุง, หรือมีความเห็นอื่นๆ ก็ช่วยส่งข้อความมาแจ้งได้นะครับ ทั้ง [Facebook](https://facebook.com/chatdanai.lumdee), [LinkedIn](https://linkedin.com/in/chatdanai-lumdee) หรือ <chatdanai.l@gmail.com>
