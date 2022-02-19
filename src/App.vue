<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from './axios'
import toast from './toast'
import queryString from 'query-string'

export default {
  name: 'App',
  created() {
    const parameters = queryString.parse(location.search)

    // If there is a token id in parameters, then we assume that the page is opened in a popup window and the user will be authorized if the token id is valid
    if (parameters.tokenId) {
      axios.get('/api/me', {
        headers: {
          'X-tokenId': parameters.tokenId
        }
      })
      .then(() => {
        this.$router.push('/authorized')
      })
      .catch(error => {
        if (error.status === 401) {
          toast.danger('Unauthorized')
        } else {
          toast.danger('Internal Server Error')
        }
      })

      return
    }

    const tokenId = localStorage.getItem('yuque-tokenId')

    // If there is a token id, then the user is already authorized, but we still need to check if the token id is valid
    if (tokenId) {
      axios.get('/api/me', {
        headers: {
          'X-tokenId': tokenId
        }
      })
      .then(() => {
        this.$router.push('/repos')
      })
      .catch(error => {
        if (error.status === 401) {
          this.$router.push('/login')
        } else {
          toast.danger('Internal Server Error')
        }
      })
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
