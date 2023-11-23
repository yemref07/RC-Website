<template>
  <pageHeader :title="$t('menu.blog')" :sub-title="companyName"  />
  <div class="container">
    <div class="row">
      <div class="col-lg-9">
        <div class="row">

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="card blog-card" style="width: 100%">
              <router-link to="/">
                <img src="/placeholder.png" class="card-img-top" alt="..." />
              </router-link>

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text line-clamp">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi nihil deleniti ex
                  eos eligendi aperiam atque laboriosam blanditiis, esse temporibus.
                </p>
                <router-link to="/" class="btn btn-primary">Devamını Oku</router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="col-lg-3">
        <div class="other-posts">
          <h3 class="other-posts-title">Diğer Paylaşımlar</h3>
          <ul>
            <li>
              <router-link to="/" class="post-link text-dark"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus,
                optio?</router-link
              >
            </li>
            <li>
              <router-link to="/" class="post-link text-dark"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus,
                optio?</router-link
              >
            </li>
            <li>
              <router-link to="/" class="post-link text-dark"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus,
                optio?</router-link
              >
            </li>
            <li>
              <router-link to="/" class="post-link text-dark"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus,
                optio?</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import pageHeader from './components/pageHeader.vue'
import { useThemeStore } from '../../stores/themeInfo'

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const companyName = computed(() => {
  if (data.value.title) {
    return data.value.title
  } else {
    return ''
  }
})
</script>

<style lang="css" scoped>
.blog-card {
  border: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  padding: 15px;
  transition: 0.3s;
}

.other-posts-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.other-posts {
  border: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  padding: 40px 30px;
  position: -webkit-sticky;
  position: sticky;
  top: 20%;
}

.other-posts ul {
  padding: 0;
}

.other-posts li {
  list-style: none;
  margin-bottom: 15px;
}

.post-link {
  font-size: 14px;
  text-decoration: none;
}

.post-link:hover {
  color: blue !important;
  transition: all 0.3s ease-in-out;
}

.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
