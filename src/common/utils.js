//防抖
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    //setTimeout函数里的操作会加到事件循环的尾部执行，就算不加延时也会在平行的操作完成后再执行
    timer = setTimeout(() => {
      // func.apply(this, args)
      func(...args)
    }, delay)
  }
}

//日期格式转换
export function formatDate(date, fmt) {
  //1.获取年份
  //2019
  //yy -> 19
  //yyyy -> 2019
  //y -> 9
  //yyy -> 019
  //y+ -> 至少一个y
  if (/(y+)/.test(fmt)) {
    //RegExp.$1 即匹配到的y的格式
    //date.getFullYear() + '' 在数字后加一个空字符将数字变为字符串
    //substr 对字符串做一个截取 从左往右
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  //M+ -> 正则表达式中的规则
  //正则表达式 -> 字符串匹配利器
  //+ 1个或多个
  //* 0个或多个
  //? 0个或1个
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  //如果传过来的数为单位数 如4 在其前补00 再截取传过来的数的长度 即为04
  return ('00' + str).substr(str.length);
}


