---
title: 刘夏江 | react | webpack | Node.js | webkit | 最新干货分享
hero:
  title: 每周导读
footer: 本站部署在[腾讯云](https://curl.qcloud.com/nlc1vDH0)，新老用户购买服务器有优惠，[访问链接](https://curl.qcloud.com/nlc1vDH0)
---

> 注： 访问 medium 文章需 FQ，请自备梯子(或在优质资源页扫码加我 WX 获取)；

```jsx | inline
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar, Card } from 'antd';

const data = [
  {
    title: 'ES2020附带的8个新功能',
    originalUrl:
      'https://medium.com/better-programming/8-new-features-shipping-with-es2020-7a2721f710fb',
    createdAt: '2020-01-11',
    likeCount: '-',
    tag: 'Tools',
    user: {
      username: 'Thomas Guibert',
    },
  },
  {
    title: '2020年需要学习的十大按需编程语言',
    originalUrl:
      'https://towardsdatascience.com/top-10-in-demand-programming-languages-to-learn-in-2020-4462eb7d8d3e',
    createdAt: '2020-02-04',
    likeCount: '-',
    tag: 'Tools',
    user: {
      username: 'Md Kamaruzzaman',
    },
  },
  {
    title: '官方GitHub CLI在这里',
    originalUrl:
      'https://medium.com/better-programming/the-official-github-cli-is-here-9fb7276e2e15',
    createdAt: '2020-02-25',
    likeCount: '-',
    tag: 'Tools',
    user: {
      username: 'Nabil Nalakath',
    },
  },
  {
    title: '2020年面向远程团队的7种工具',
    originalUrl:
      'https://blog.bitsrc.io/7-tools-for-distributed-frontend-dev-teams-in-2020-4a8a07d4803',
    createdAt: '2020-01-10',
    likeCount: '-',
    tag: 'Tools',
    user: {
      username: 'Jonathan Saring',
    },
  },
  {
    title: '了解gRPC',
    originalUrl:
      'https://medium.com/better-programming/understanding-grpc-60737b23e79e',
    createdAt: '2020-03-06',
    likeCount: '-',
    tag: 'gRPC',
    user: {
      username: 'Arun Mathew Kurian',
    },
  },
  {
    title: 'Vue.js会在2020年接管React吗?',
    originalUrl:
      'https://medium.com/swlh/is-vue-js-going-to-take-over-react-in-2020-929c19806ac',
    createdAt: '2020-02-27',
    likeCount: '-',
    tag: 'library',
    user: {
      username: 'inVerita',
    },
  },
  {
    title: '为你的下一个网络应用准备的5个前端用户界面套件',
    originalUrl:
      'https://uxdesign.cc/a-curated-list-with-5-frontend-ui-kits-for-your-next-web-app-46b00acd2fe3',
    createdAt: '2020-01-16',
    likeCount: '-',
    tag: 'library',
    user: {
      username: 'Titus Decali',
    },
  },
  {
    title: '我在React和Vue中创建了完全相同的应用。区别如下',
    originalUrl:
      'https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd',
    createdAt: '2018-06-25',
    likeCount: '95000',
    tag: 'react',
    user: {
      username: 'Sunil Sandhu',
    },
  },
  {
    title: '这将使您成为命令行忍者',
    originalUrl:
      'https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981',
    createdAt: '2020-02-25',
    likeCount: '31000',
    tag: 'Unix',
    user: {
      username: 'Tomas Eglinskas',
    },
  },
  {
    title: 'React手册遵循80/20规则:用20%的时间学习一个话题的80%',
    originalUrl:
      'https://medium.com/free-code-camp/the-react-handbook-b71c27b0a795',
    createdAt: '2019-01-09',
    likeCount: '27000',
    tag: 'react',
    user: {
      username: 'Flavio Copes',
    },
  },
];

const weixinData = [
  {
    title: '一二线城市知名 IT 互联网公司名单！',
    originalUrl: 'https://mp.weixin.qq.com/s/UVgHguvaTnotN44DkFN_bg',
    createdAt: '2020-01-11',
    likeCount: '-',
    tag: 'Tools',
    user: {
      username: '前端人',
    },
  },
];

const articleData = [
  {
    title: '您一直面临着同样的问题，因为您害怕成长',
    originalUrl:
      'https://humanparts.medium.com/you-keep-facing-the-same-problems-because-youre-afraid-to-grow-ec40c210f96',
    createdAt: '2020-02-14',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Brianna Wiest',
    },
  },
  {
    title: '7个晚上的习惯可以帮助您在忙碌的一天后减压',
    originalUrl:
      'https://medium.com/mind-cafe/7-habits-you-can-adopt-after-5-pm-to-help-you-decompress-after-a-busy-day-788666984c43?source=extreme_main_feed---------12-73--------------------a4c6bbdc_c945_4122_bd4d_c2c9fb1858f3--5',
    createdAt: '2020-02-20',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Thomas Oppong',
    },
  },
  {
    title: '性格内向与自我孤立之间的区别',
    originalUrl:
      'https://humanparts.medium.com/this-is-the-difference-between-being-an-introvert-and-isolating-yourself-7569d6ccd82a',
    createdAt: '2020-02-13',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Brianna Wiest',
    },
  },
  {
    title: '2020年面向远程团队的7种工具',
    originalUrl:
      'https://blog.bitsrc.io/7-tools-for-distributed-frontend-dev-teams-in-2020-4a8a07d4803',
    createdAt: '2020-01-10',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Jonathan Saring',
    },
  },
  {
    title: '如果您想过着梦想的生活，那么您必须无所畏惧',
    originalUrl:
      'https://humanparts.medium.com/if-you-want-to-live-the-life-of-your-dreams-you-must-be-fearless-c9adfe8c2799',
    createdAt: '2020-01-28',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Brianna Wiest',
    },
  },
  {
    title: '不适意味着您的生活需要新生',
    originalUrl:
      'https://humanparts.medium.com/discomfort-means-your-life-is-demanding-a-new-version-of-you-d55a982c89d8',
    createdAt: '2019-12-10',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'Brianna Wiest',
    },
  },
  {
    title: '语言如何改变我们对世界的看法',
    originalUrl:
      'https://medium.com/mind-cafe/how-language-alters-our-perception-of-the-world-2b7f819f696f',
    createdAt: '2019-12-30',
    likeCount: '-',
    tag: 'others',
    user: {
      username: 'B. Noelle',
    },
  },
  {
    title: '为什么每个初创企业都应该像Billie Eilish这样的品牌',
    originalUrl:
      'https://medium.com/big-hairy-goals/why-every-startup-should-brand-like-billie-eilish-edb7d0d171da',
    createdAt: '2020-02-29',
    likeCount: '95000',
    tag: 'others',
    user: {
      username: 'Sophia Sunwoo',
    },
  },
  {
    title: '开始使用新语言时最常见的3个错误',
    originalUrl:
      'https://medium.com/the-language-learning-hub/the-3-most-common-mistakes-when-starting-a-new-language-d73fa67b7cf',
    createdAt: '2020-03-09',
    likeCount: '31000',
    tag: 'others',
    user: {
      username: 'Mathias Barra',
    },
  },
  {
    title: '为什么无能的经理会得到提升?',
    originalUrl:
      'https://medium.com/better-programming/why-do-incompetent-managers-get-promoted-815165a03bee',
    createdAt: '2019-02-14',
    likeCount: '27000',
    tag: 'react',
    user: {
      username: 'Lance Ng',
    },
  },
];

export default () => {
  return (
    <>
      <Card title={<span>公众号</span>}>
        <List
          itemLayout="horizontal"
          dataSource={weixinData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a
                    style={{ fontSize: '18px' }}
                    target="_blank"
                    href={item.originalUrl}
                  >
                    {item.title}
                  </a>
                }
                description={
                  <div>
                    <span style={{ marginRight: '15px' }}>
                      时间: {item.createdAt.substring(0, 10)}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      作者: {item.user.username}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      分类: {item.tag}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      star: {item.likeCount}{' '}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      <Card title={<span>medium</span>}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a
                    style={{ fontSize: '18px' }}
                    target="_blank"
                    href={item.originalUrl}
                  >
                    {item.title}
                  </a>
                }
                description={
                  <div>
                    <span style={{ marginRight: '15px' }}>
                      时间: {item.createdAt.substring(0, 10)}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      作者: {item.user.username}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      分类: {item.tag}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      star: {item.likeCount}{' '}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      <Card title="诚心(薪)推荐" extra={<span>medium</span>}>
        <List
          itemLayout="horizontal"
          dataSource={articleData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a
                    style={{ fontSize: '18px' }}
                    target="_blank"
                    href={item.originalUrl}
                  >
                    {item.title}
                  </a>
                }
                description={
                  <div>
                    <span style={{ marginRight: '15px' }}>
                      时间: {item.createdAt.substring(0, 10)}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      作者: {item.user.username}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      分类: {item.tag}{' '}
                    </span>
                    <span style={{ marginRight: '15px' }}>
                      star: {item.likeCount}{' '}
                    </span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};
```
