---
title: 十三先生 | react | webpack | Node.js | webkit | 最新干货分享
hero:
  title: 精品资源
  desc: '持续更新中...'
footer: 本站部署在[腾讯云](https://curl.qcloud.com/nlc1vDH0)，新老用户购买服务器有优惠，[访问链接](https://curl.qcloud.com/nlc1vDH0)
---

<br/>
<br/>

```jsx | inline

import React from 'react';
import { Card ,List , Modal, Button} from 'antd';

const { Meta } = Card;

const data = [
  {
    url:"https://static001.geekbang.org/static/gmtc2019/img/banner-top.446da47.png",
    title: "GMTC全球大前端技术大会-2019·深圳站",
    href:"https://gmtc.infoq.cn/2019/shenzhen/schedule"
  }
];


export default () => {
  return (
  <>
    <List
      grid = {{ gutter: 20, column:1 }}
      dataSource = {data}
      renderItem = {item => (
        <List.Item>
          <a href={item.href} target="_blank">
           <Card
              hoverable
              cover={<img height="400px"alt="example" src={item.url}/>}
            >
              <Meta title={<span>{item.title}</span>} />
            </Card>
          </a>
        </List.Item>
        
      )}
    />
  </>
)}

```
