<template>
  <div>
  <section class="hero is-fullheight is-default is-bold">
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="../">
            <img src="https://lh3.googleusercontent.com/kZSVDEzgbZh2_AglD1P7SQLWk9wGGJU6CMRZXrc8-2oVQ4vlGeO_UMLxbFUmT0demw=w300" alt="Logo">
          </a>
          <span class="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenu" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item" href="https://pwneris.me">
              Blog <span class="bd-emoji">❤️</span>
            </a>
            <a class="navbar-item" href="https://github.com/quangio">
              Github
            </a>
            <a class="navbar-item" href="https://www.linkedin.com/in/quangluongtm/">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <p>
          <template v-if="token != null">
            <b-tooltip class="control has-icons-left" label="Username of your perspective employee's Instagram" position="is-top" animated>
            <div class="field has-addons">
              <div class="control has-icons-left">
                  <input type="text" class="input is-info is-large" v-model="hotboy" placeholder="quangluongtm">
                
                <b-icon class="icon is-medium is-left" 
                  pack="fa"
                  icon="user-circle-o">
                </b-icon>
                </div>
                <div class="control">
                <a @click="follow" class="button is-primary is-large">Follow</a>
              </div>
            </div>
            </b-tooltip>
          </template>
        </p>
        </br>
        <div class="columns is-vcentered is-multiline">
          <div v-for="u in followings" :key="u.id" class="column is-3">
            <UserCard :name="u.full_name" :username="u.username" :ava="u.profile_picture" @unf="fetchUserFollowings" :id="u.id"></UserCard>
          </div>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>

import UserCard from './UserCard.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      token: null,
      hotboy: '',
      followings: []
    }
  },
  methods: {
    login() {
      window.location = 'https://api.instagram.com/oauth/authorize/?client_id=d57eea89ffa942fabb1ef34e97a03b93&redirect_uri=' 
          + window.location.origin + '&response_type=token&scope=follower_list+relationships+public_content'
    },
    fetchUserFollowings() {
      let vm = this
      let url = 'https://api.instagram.com/v1/users/self/follows?access_token=' + this.token
      //let url = 'https://api.instagram.com/v1/users/self/?access_token=' + this.token
      $.get(url, function(res) {
        if (res.meta.code == 400) vm.login()
        vm.followings = res.data || []
        if (vm.followings.length == 0) {
          vm.$dialog.alert({
            title: 'Hmm, such empty ?',
            message: 'This app is running in sandbox mode (so it wont list all of your users). Please follow quangluongtm and luongtheminhquang on Instagram to see how it is in action!',
            confirmText: 'Cool!'
          })
        }
      }, 'jsonp')
    },
    follow(){
      let vm = this
      let url = 'https://api.instagram.com/v1/users/search?q=' + this.hotboy + '&access_token=' + this.token
      //let url = 'https://api.instagram.com/v1/users/self/?access_token=' + this.token
      $.get(url, function(res) {
        if (res.meta.code == 400) vm.login()
        let id = res.data[0].id
        //console.log(id)
        $.post('https://api.instagram.com/v1/users/' + id + '/relationship?access_token=' + vm.token, {
          "action": "follow"
        }).fail(function(err){
          vm.fetchUserFollowings()
          vm.hotboy = ''
        })
      }, 'jsonp')
    }
  },
  created() {
    let hash = window.location.hash
    this.token = hash.split('=')[1] || this.token
    if (this.token == null) {
      this.login()
    }
    window.location.hash = ''
    this.fetchUserFollowings()
    console.log(this.followings.length)
  },
  components: {
    UserCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
