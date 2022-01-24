<template>
  <div class="columns">
    <div class="container column is-half">
      <b-navbar>
        <template #end>
          <b-navbar-item href="#">
            Welcome, {{ me.name }}
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      me: JSON.parse(localStorage.getItem('yuque-me'))
    }
  }
}
</script>
