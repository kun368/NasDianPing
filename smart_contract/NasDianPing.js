'use strict';


class DianPing {

  from = '';
  txHash = '';
  time = 0;
  dpType = '0';
  link = '';
  name = '';
  score = '';
  content = '';

  constructor(text) {
    if (!text) {
      return;
    }
    const o = JSON.parse(text);
    this.from = o.from;
    this.txHash = o.txHash;
    this.time = o.time;
    this.link = o.link;
    this.name = o.name;
    this.score = o.score;
    this.content = o.content;
  }

  toString() {
    return JSON.stringify(this);
  }
}


const NasDianPing = function () {
  LocalContractStorage.defineMapProperty(this, 'sendMap');
  LocalContractStorage.defineMapProperty(this, 'recvMap');
};

NasDianPing.prototype = {

  init: function () {
  },

  _push(collectionName, key, value) {
    let item = this[collectionName].get(key);
    if (!item) {
      item = [];
    }
    item.push(value);
    this[collectionName].put(key, item);
  },

  createDianPing: function (dpType, link, name, score, content) {
    const item = new DianPing();
    item.from = Blockchain.transaction.from;
    item.txHash = Blockchain.transaction.hash;
    item.time = Blockchain.transaction.timestamp * 1000;
    item.dpType = dpType;
    item.link = link;
    item.name = name;
    item.score = score;
    item.content = content;
    this._push('sendMap', item.from, item);
    this._push('recvMap', item.dpType, item);
    return item;
  },

  queryUserVoucher: function (from) {
    let send = this.sendMap.get(from);
    if (!send) {
      send = [];
    }
    return send;
  },

  queryCatVoucher: function (dpType) {
    let recv = this.recvMap.get(dpType);
    if (!recv) {
      recv = [];
    }
    return recv;
  }
};
module.exports = NasDianPing;
