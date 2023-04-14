<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4 text-center text-white">Hello, {{$store.getters['manager/managerName']}}!</h1>
      <p class="lead text-center text-white">欢迎进入许可证书管理页面</p>
      <hr class="my-4 bg-secondary">
      <p class="text-center text-white">当前时间： {{clock}}</p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'BusinessIndex',
  data () {
    return {
      clock: ''
    }
  },
  methods: {
    updateTime () {
      // 每秒钟更新一次时钟
      setInterval(() => {
        let now = new Date()
        let year = now.getFullYear()
        // 月份从0开始，所以需要加1
        let month = now.getMonth() + 1
        let date = now.getDate()
        let hours = now.getHours().toString().padStart(2, '0')
        let minutes = now.getMinutes().toString().padStart(2, '0')
        let seconds = now.getSeconds().toString().padStart(2, '0')

        // 在时钟中显示当前时间
        this.clock = year + '年' + month + '月' + date + '日 ' + hours + ':' + minutes + ':' + seconds
      }, 1000)
    }
  },
  mounted () {
    this.updateTime()
  }
}
</script>

<style scoped>
.jumbotron {
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  border-radius: 0.3rem;
  background-color: #15202b;
}

.github-btn-p {
  position: relative;
  top: 2rem;
}
</style>
