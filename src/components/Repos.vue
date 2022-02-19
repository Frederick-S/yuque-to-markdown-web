<template>
  <div class="columns">
    <div class="container column is-half">
      <b-navbar>
        <template #end>
          <b-navbar-dropdown :label="welcome">
            <b-navbar-item href="#" @click="logout">
              退出
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>  
  </div>
</template>

<script>
import axios from '../axios'
import toast from '../toast'

export default {
  computed: {
    welcome() {
      return `欢迎, ${this.me.name}`
    }
  },
  data() {
    return {
      me: JSON.parse(localStorage.getItem('yuque-me'))
    }
  },
  methods: {
    logout() {
      const tokenId = localStorage.getItem('yuque-tokenId')

      axios.post('/logout', null, {
        headers: {
          'X-tokenId': tokenId
        }
      })
      .then(() => {
        localStorage.removeItem('yuque-tokenId')
        localStorage.removeItem('yuque-me')

        this.$router.push('/login')
      })
      .catch((error) => {
        if (error.status === 401) {
          this.$router.push('/login')
        } else {
          toast.danger('Internal Server Error')
        }
      })
    }
  }
}
</script>
