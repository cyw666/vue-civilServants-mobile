/**
 * Created by admin on 2017/6/30.
 */
import Vue from 'vue'
import {formatDate} from '../plugins/utils'
Vue.filter('wordLimit', function(value,num) {
  if (!value) { return ''}
  let des='';
  if (value.length>num){
    des = value.substring(0,num)+"...";
    return des;
  }else {
    return value;
  }
})
Vue.filter('dateFilter', function(value,formate) {
  if (!value) { return ''}
  let timeNum =  value;
  let date = new Date(timeNum);
  return formatDate(date,formate);

})
Vue.filter('dateFilter2', function(value,formate) {
  if (!value) { return ''}
  let timeNum =  value.replace(/[^0-9-]/ig, "");
  let date = new Date(Number(timeNum));
  // console.log(date,formate);
  return formatDate(date,formate);

})
Vue.filter('formatSeconds', function(value,formate) {
  if (!value) return
  var theTime = parseInt(value*60);// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;

})


export const wordLimit = Vue.filter('wordLimit');
export const dateFilter = Vue.filter('dateFilter');
export const dateFilter2 = Vue.filter('dateFilter2');
export const formatSeconds = Vue.filter('formatSeconds');
