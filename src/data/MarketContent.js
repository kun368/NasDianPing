const MarketData = [
  // 情侣
  {
    "title": "淘宝商品",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/69269036.jpg",
    "support": true,
  },
  {
    "title": "天猫商品",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/38693618.jpg",
    "support": true,
  },
  {
    "title": "京东商品",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/31325644.jpg",
    "support": true,
  },
  {
    "title": "虚拟货币",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/11158999.jpg",
    "support": true,
  },
  {
    "title": "一号店商品",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/31014086.jpg",
    "support": false,
  },
  {
    "title": "线下实体店家",
    "img": "http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-20/80000501.jpg",
    "support": false,
  },

];

MarketData.map((item, id) => {
  item.id = id;
});
export { MarketData };
