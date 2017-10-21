<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="ava" alt="User avatar">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ name }}</p>
          <p class="subtitle is-6" ><a :href="'https://www.instagram.com/' + username">@{{username}}</a></p>
        </div>
      </div>

      <div class="content">
        <button @click="unfollow" class="button is-danger is-outlined">
          <span>Unfollow</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['name', 'username', 'ava', 'id'],
  methods: {
    unfollow() {
      let vm = this
      //https://api.instagram.com/v1/users/{user-id}/relationship?access_token=ACCESS-TOKEN this.$parent.someData
      $.post('https://api.instagram.com/v1/users/' + this.id + '/relationship?access_token=' + this.$parent.token, {
        "action": "unfollow"
      }).done(function(data){
        vm.$emit('unf')
        console.log('hui')
      }).fail(function(err){
        vm.$emit('unf')
        console.log('bug')
      })
    }
  }
}
</script>

<style>

</style>
