import moment from  'moment'

/**
 * 时间字符串格式化
 * @param  datetime 查询返回的时间字符串，如：“2018-01-16T12:24:03.364Z”
 * @param  fmt 格式，如：“YYYY-MM-DD HH:mm:ss”
 * @returns {String} 格式化后的时间字符串 如：“2018-01-16 20:24:03”
 */
function timeFormat(datetime,fmt){
   if(datetime){
      return moment(datetime).format(fmt);
   }
}

/**
 * 将字符串中的回车换成<br/>
 * @param  text 需要处理的字符串
 * @returns {String}
 */
function newLineText(text){
  if(/\n/.test(text)){
    return text.replace(/\n/g,"<br/>")
  }else{
    return text;
  }
}

function cutText(){

}

var util = {
  timeFormat:timeFormat,
  newLineText:newLineText,
  cutText:cutText
}

export {util}
