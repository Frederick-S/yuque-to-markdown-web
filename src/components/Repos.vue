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
      <div class="column is-4 is-offset-4">
        <section>
          <b-field label="请选择知识库" grouped>
            <b-select expanded v-model="selectedRepoId">
              <option v-for="repo in repos" :value="repo.id" :key="repo.id">{{ repo.name }}</option>
            </b-select>
            <p class="control">
              <b-button type="is-primary" @click="exportDocs">导出</b-button>
            </p>
          </b-field>
        </section>
      </div>
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
      repos: [],
      selectedRepoId: 0,
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
    },
    exportDocs() {
      
    }
  },
  created() {
    const tokenId = localStorage.getItem('yuque-tokenId')
      
    axios.get(`/api/users/${this.me.id}/repos`, {
      headers: {
        'X-tokenId': tokenId
      }
    })
    .then((repos) => {
      this.repos = repos

      if (repos) {
        this.selectedRepoId = repos[0].id
      }
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
</script>
