//import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';
//Vue.use(VueSocketio, socketio('http://192.168.89.125:8888/'));//与服务端链接
let MySocket ={}
MySocket.install = function (Vue,opions) {
  Vue.prototype.$socket = io.connect('http://192.168.89.125:8888/');
}
export default MySocket
