/*
 * @Author: lumdzeehol
 * @Date: 2020-07-09 23:22:48
 * @LastEditors: lumdzeehol
 */ 
class RomaticTalk {
  constructor() {
    this._updateTime = null;
    this._talk = null;
  }

  isFresh() {
    if(!this._updateTime) return false;
    var to = new Date();
    var toDay = `${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`
    return this._updateTime !== toDay;
  }

  setTalk(talk) {
    var current = new Date();
    var currentDay = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
    this._updateTime = currentDay;
    this._talk = talk;
  }

  getTalk() {
    return this._talk;
  }
}

module.exports = RomaticTalk;