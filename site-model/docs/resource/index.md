---
title: 刘夏江 | react | webpack | Node.js | webkit | 最新干货分享
hero:
  title: 博主出品
  desc: '持续更新中...'
footer: 本站部署在[腾讯云](https://curl.qcloud.com/nlc1vDH0)，新老用户购买服务器有优惠，[访问链接](https://curl.qcloud.com/nlc1vDH0)
---

<br/>
<br/>

```jsx | inline
import React from 'react';
import { Card, List, Modal, Button } from 'antd';
import jk_node from '../assets/jk_node.jpeg';
import jk_web from '../assets/jk_web.jpeg';
import xc_coder from '../assets/xc_coder.png';
import xc_git from '../assets/xc_git.png';
import xc_mianshi from '../assets/xc_mianshi.png';
import xc_perfermance from '../assets/xc_perfermance.png';
import xc_react from '../assets/xc_react.png';
import xc_ts from '../assets/xc_ts.png';

const { Meta } = Card;

const data = [
  {
    url:
      'https://freemen-test.oss-cn-zhangjiakou.aliyuncs.com/files/dev/blog/WechatIMG71.jpeg',
    title: '加学习群获取更多资源',
  },
  {
    url:
      'https://freemen-test.oss-cn-zhangjiakou.aliyuncs.com/files/dev/blog/WechatIMG85.jpg',
    title: '深入浅出 Node.js 模块系统',
  },
  {
    url:
      'https://freemen-test.oss-cn-zhangjiakou.aliyuncs.com/669A2CA74D562415E5156716AC89AD1C.jpg',
    title: 'nginx 那些事儿',
  },
];

export default () => {
  return (
    <>
      <List
        grid={{ gutter: 20, column: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              cover={<img height="500px" alt="example" src={item.url} />}
            >
              <Meta title={item.title} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
```
