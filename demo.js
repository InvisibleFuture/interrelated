import fmhub from './index.js'

const fm = new fmhub()
const users = ["0001", '0002', "0003", "0004"]

// 一组用户全部订阅频道一
users.forEach((item) => {
  fm.set("频道一号", item)
})

// 操作所有订阅了频道一的用户
fm.atob("频道一号", (data) => {
  console.log(data)
})

fm.btoa("0002", (data) => {
  console.log(data)
})

// console print:
//
// 0001
// 0002
// 0003
// 0004
// 频道一号
//