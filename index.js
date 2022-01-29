export default class interrelated {
  constructor() {
    this.channels = new Map()
    this.users = new Map()
  }

  // 将两种类型的不同信息相关连
  set(fid, uid) {
    let channel = this.channels.get(fid) || new Map()
    if (!channel.size) this.channels.set(fid, channel)
    channel.set(uid, true)

    let user = this.users.get(uid) || new Map()
    if (!user.size) this.users.set(uid, user)
    user.set(fid, true)
  }

  // 取消关联
  delete(fid, uid) {
    let channel = this.channels.get(fid)
    if (channel && channel.size) channel.delete(uid)
    if (channel && channel.size === 0) this.channels.delete(fid)

    let user = this.users.get(uid)
    if (user && user.size) user.delete(fid)
    if (user && user.size === 0) this.users.delete(uid)
  }

  // 读取类型 A 关联的 B
  atob(uid, callback) {
    let channel = this.channels.get(uid)
    if (channel && channel.size) {
      channel.forEach((value, key) => {
        callback(key)
      })
    }
  }

  // 读取类型 B 关联的 A
  btoa(fid, callback) {
    let user = this.users.get(fid)
    if (user && user.size) {
      user.forEach((value, key) => {
        callback(key)
      })
    }
  }

  // 移除 A 中所有指定数据
  adelete(uid) {
    let user = this.users.get(uid)
    if (user && user.size) user.forEach((value, key) => {
      let channel = this.channels.get(key)
      if (channel && channel.size) channel.delete(uid)
    })
    this.users.delete(uid)
  }

  // 移除 B 中所有指定数据
  bdelete(fid) {
    let channel = this.channels.get(fid)
    if (channel && channel.size) channel.forEach((value, key) => {
      let user = this.users.get(key)
      if (user && user.size) user.delete(fid)
    })
    this.channels.delete(fid)
  }

  // 读取所有 a
  aall(uid, callback) {
    this.channels.forEach((value, key) => {
      callback(key)
    })
  }

  // 读取所有 b
  ball(fid, callback) {
    this.users.forEach((value, key) => {
      callback(key)
    })
  }
}
