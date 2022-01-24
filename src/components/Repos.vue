<template>
  <div class="columns">
    <div class="container column is-half">
      <b-navbar>
        <template #end>
          <b-navbar-dropdown :label="welcome">
            <b-navbar-item href="#">
              Logout
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>  
  </div>
</template>

<script>
export default {
  computed: {
    welcome() {
      return `Welcome, ${this.me.name}`
    }
  },
  data() {
    return {
      me: JSON.parse(localStorage.getItem('yuque-me'))
    }
  }
}
</script>
