<template>
  <div class="ChatHome" @click="misImgBox">
    <div class="top">
      <span>{{num}}人在线</span>
      <div class="userHead">
        <img :src="userSrc ? userSrc : src " alt="">
        <input type="file" accept="image/*" @change="onFile">
      </div>
      <h3>{{nickName}}</h3>
    </div>
    <div class="talk-box" ref="tbox">
      <p v-for="(item,index) in msgArr" :key="index" :style="{color:item.color}">
        <span>{{item.per}}:</span>
        <span v-html="item.msg"></span>
        <span>{{item.date}}</span>
      </p>
    </div>

    <div class="btn-box">
      <button class="img-btn" @click.stop="showImg">表情包</button>
    </div>
    <ul class="img-box" v-if="showImgBox" @click.stop>
      <li v-for="(item,index) in imgUrl" :key="index">
        <img :src="item" alt="" @click="selectImg(index)">
      </li>
    </ul>
    <div class="send-box">
      <textarea v-model.trim="postMsg" @keyup.enter="postNewMsg">

      </textarea>
    </div>
    <button class="send" @click="postNewMsg">发送</button>
  </div>
</template>

<script>
  export default {
    name: 'ChatHome',
    data() {
      return {
        num: 0,
        src: require('../../assets/images/download.jpg'),
        userSrc: '',
        nickName: '',
        msgArr: [],
        postMsg: '',
        showImgBox: false,
        imgUrl: []
      }
    },
    mounted() {
      this.$socket.on('showInfo', (nickName, num, type) => {
        this.num = num;
        this.nickName = nickName
        let msg = nickName + (type == 'login' ? ' joined' : ' left');
        this.newMsg('showInfo', msg, 'red')
      })
      this.$socket.on('broadNewMsg', (nickName, msg) => {
        this.newMsg(nickName, msg)
      })
      this.getImageUrl()
    },
    methods: {
      onFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (files.length <= 0) {
          return;
        }
        this.createImage(files[0])
      },
      createImage(files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.userSrc = e.target.result
        }
        reader.readAsDataURL(files)
      },
      newMsg(per, msg, color) {
        if (per == 'showInfo') per = 'system'
        if (!color) color = '#000';
        let obj = {
          color,
          per,
          msg,
          date: new Date().toTimeString().substr(0, 8),
        }
        obj.msg = this.showEmoji(msg)

        this.msgArr.push(obj)
        this.postMsg = ''
      },
      postNewMsg() {
        if (!this.postMsg) return
        this.$socket.emit('postMsg', this.postMsg)
        this.newMsg(this.nickName, this.postMsg, 'blue')
        console.log(this.$refs.tbox.scrollHeight)
        this.$refs.tbox.scrollTop = this.$refs.tbox.scrollHeight;
        console.log(this.$refs.tbox.scrollTop)
      },
      showImg() {
        this.showImgBox = !this.showImgBox
      },
      getImageUrl() {
        for (let i = 1; i < 70; i++) {
          this.imgUrl.push(require(`../../assets/emoji/${i}.gif`))
        }
      },
      misImgBox(e) {
        this.showImgBox = false
      },
      selectImg(index) {
        this.postMsg = this.postMsg + `[emoji:${index}]`
      },
      showEmoji(msg) {
        let emojiIndex, match;
        let reg = /\[emoji:\d+\]/g;
        while (match = reg.exec(msg)) {
          emojiIndex = match[0].slice(7, -1);
          if (emojiIndex > this.imgUrl.length) {
            msg = msg.replace(match[0], '[x]')
          } else {
            let ss = this.imgUrl[emojiIndex]
            msg = msg.replace(match[0], `<img class="emoji" src="${ss}" style="float: left"/>`);
          }
        }
        return msg
      }
    }
  }
</script>
<style scoped lang="scss">
  .ChatHome {
    width: 660px;
    height: 780px;
    background: #f1f1f1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    .top {
      height: 74px;
      background: #ccc;
      padding: 10px;
      position: relative;
      > span {
        float: right;
        color: darkred;
      }
      .userHead {
        width: 70px;
        height: 70px;
        background: #dfdfdf;
        cursor: pointer;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
        input {
          width: 70px;
          height: 70px;
          position: absolute;
          left: 10px;
          top: 10px;
          opacity: 0;
          cursor: pointer;
        }
      }
      > h3 {
        width: 100px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
      }
    }
    .talk-box {
      height: 520px;
      background: white;
      margin: 0 auto;
      padding: 20px;
      overflow: auto;
      p {
        width: 100%;
        overflow: hidden;
        min-height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 4px;
        span {
          flex: 1;
        }
        span:nth-child(2) {
          flex: 6;
          width: 300px;
          word-break:break-all;
          margin-right: 20px;
        }
      }
    }
    .send-box {
      width: 540px;
      height: 74px;
      background: white;
      position: absolute;
      left: 10px;
      bottom: 10px;
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
      }
    }
    button.send {
      position: absolute;
      right: 36px;
      bottom: 14px;
      width: 40px;
      height: 60px;
      font-size: 24px;
      cursor: pointer;
    }
    .btn-box {
      width: 90%;
      height: 38px;
      margin: 0 auto;
      button.img-btn {
        width: 80px;
        height: 32px;
        cursor: pointer;
        margin-top: 5px;
      }
    }
    .img-box {
      width: 590px;
      height: 400px;
      background: #4f4f4f;
      position: absolute;
      left: 0;
      top: 250px;
      right: 0;
      margin: auto;
      border-radius: 5px;
      overflow: auto;
      padding-left: 14px;
      li {
        float: left;
        width: 40px;
        height: 40px;
        margin: 6px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>

