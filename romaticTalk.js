/*
 * @Author: lumdzeehol
 * @Date: 2020-07-09 23:22:48
 * @LastEditors: lumdzeehol
 */ 
class RomaticTalk {
  constructor() {
    this._updateTime = null;
    this._talk = null;
    this._isToday = false;
  }

  isFresh() {
    if(!this._updateTime) return false;
    var to = new Date();
    var toDay = `${to.getFullYear()}-${to.getMonth()}-${to.getDate()}`
    return this._isToday !== toDay;
  }

  setTalk(talk) {
    var current = new Date();
    var currentDay = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
    this._updateTime = currentDay;
    console.log(this._updateTime);
    this._talk = talk;
  }

  getTalk() {
    return this._talk;
  }
}

module.exports = RomaticTalk;