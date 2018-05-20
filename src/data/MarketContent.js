const MarketData = [
  // 情侣
  {
    'type': 1,
    "img": "smile",
    "title": "逗你笑券",
    "desc": "想方设法让对方笑",
  },
  {
    'type': 1,
    "img": "email-filling",
    "title": "真心话券",
    "desc": "向对方说出真心话/秘密",
  },
  {
    'type': 1,
    "img": "atm",
    "title": "认错券",
    "desc": "无条件向对方认错",
  },
  {
    'type': 1,
    "img": "similar-product",
    "title": "不分手券",
    "desc": "无条件不分手",
  },
  {
    'type': 1,
    "img": "good",
    "title": "捶背按摩券",
    "desc": "无条件给对方捶背按摩",
  },
  {
    'type': 1,
    "img": "mobile-phone",
    "title": "交出私房钱",
    "desc": "无条件交出所有私房钱",
  },
  {
    'type': 1,
    "img": "gifts",
    "title": "不生气券",
    "desc": "无条件停止生气",
  },
  {
    'type': 1,
    "img": "select",
    "title": "洗碗做饭券",
    "desc": "立即洗碗做饭",
  },
  {
    'type': 1,
    "img": "bags",
    "title": "买买买券",
    "desc": "无条件给对方买买买",
  },


  // 朋友
  {
    'type': 2,
    "img": "auto",
    "title": "大保健券",
    "desc": "请对方大保健",
  },
  {
    'type': 2,
    "img": "training",
    "title": "看电影券",
    "desc": "请对方看一场电影",
  },
  {
    'type': 2,
    "img": "filter",
    "title": "喝咖啡券",
    "desc": "请对方喝一杯咖啡",
  },
  {
    'type': 2,
    "img": "success-filling",
    "title": "撸串券",
    "desc": "请对方去撸串",
  },
  {
    'type': 2,
    "img": "cart",
    "title": "逛街券",
    "desc": "和对方一块去逛街",
  },
  {
    'type': 2,
    "img": "box",
    "title": "代拿快递券",
    "desc": "帮对方拿一次快递",
  },
];

MarketData.map((item, id) => {
  item.id = id;
});
export { MarketData };
