import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload：新添加的商品
      //数组常用的方法有哪些？push/pop/unshift/shift/sort/reverse/map/filter/reduce/join/...
      //方法一.1
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      //方法二.1
      // let index = state.cartList.indexOf(payload)

      //方法三.1
      //find : 如果为true，就把当前item赋值给product
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //判断oldProduct是否有值
      //方法一.2/方法三.2
      if (oldProduct) {
        // oldProduct.count += 1
        // context.commit('addCounter', oldProduct)
        context.commit(ADD_COUNTER, oldProduct)

        //方法二.2
        // if (index === -1) {
        //   let oldProduct = state.cartList[index]
        //   oldProduct.count += 1

        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        // context.cartList.push(payload)
        // context.commit('addToCart', payload)
        context.commit(ADD_TO_CART, payload)

        resolve('添加了新的商品')
      }
    })
  }
}
