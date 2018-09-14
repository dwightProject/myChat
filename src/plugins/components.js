let MyCom = {}
MyCom.install = function (Vue, opions) {
  let show = false;
  Vue.prototype.$Alert = (type,msg) => {
    let markDoc = Vue.extend({
      template:
        `<el-alert
    title=${msg}
    type=${type}
    show-icon>
  </el-alert>
        `
    });
    //
    if(show){
      return
    }
    let tpl = new markDoc().$mount().$el; // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(tpl); // 3、把创建的实例添加到body中
    show = true
    setTimeout(function () {
      document.body.removeChild(tpl);
      show= false
    },2000)

  }
}
export default MyCom
