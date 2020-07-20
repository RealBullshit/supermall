import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// //函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// //函数调用结束 -> 弹出函数栈（有效函数的所有变量）
// function test() {
//   const names = ['baby', 'bbb']
// }
//
// //函数结束变量被销毁
// test()
//
// //再次调用再次创建
// test()

//
// let totalNums = []
//
// const nums1 = [20, 11, 222]
// const nums2 = [111, 22, 333]
//
// //1.
// // for (let n of nums1) {
// //   totalNums.push(n)
// // }
//
// //2.将数组中的数据一个个解析出来放入新数组中
// totalNums.push(...nums1)
