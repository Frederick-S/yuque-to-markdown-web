<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3>请使用语雀登陆</h3>
        <hr>
        <div class="a">
          <b-button type="is-primary" @click="login">登陆</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios'
import queryString from 'query-string'

export default {
  methods: {
    login() {
      const url = process.env.VUE_APP_API_SERVER_URL + '/oauth2/authorize'
      const popup = window.open(url, 'Authorize', 'popup')
      const interval = setInterval(() => {
        const parameters = queryString.parse(popup.location.search)

        if (parameters.tokenId) {
          axios.get('/api/me', {
            headers: {
              'X-tokenId': parameters.tokenId
            }
          })
          .then((me) => {
            clearInterval(interval)
            popup.close()

            localStorage.setItem('yuque-tokenId', parameters.tokenId)
            localStorage.setItem('yuque-me', JSON.stringify(me))

            this.$router.push('/repos')
          })
        }
      }, 1000);
    }
  }
}
</script>
