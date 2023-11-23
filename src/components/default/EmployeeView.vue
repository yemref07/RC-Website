<template>
  <pageHeader :title="$t('menu.employee')" :sub-title="companyName" />
  <div class="container-fluid px-md-3 px-lg-5">
    <div class="row">
        
      <div class="col-md-6 mb-2">
        <div class="card employee-card mb-3" style="max-width: 100%">
          <div class="row g-0">
            <div
              class="col-lg-4 d-flex flex-column justify-content-center align-items-center p-2 bg-azure"
            >
              <h4 class="card-title mb-3 text-light">Karen Doe</h4>
              <img src="/employee1.jpg" class="img-fluid rounded-circle" alt="..." />
              <div class="d-flex mt-3 gap-1">
                <a href="">
                  <Icon icon="ri:instagram-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:twitter-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:facebook-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:linkedin-fill" width="25" height="25" color="white" />
                </a>
              </div>
            </div>

            <div class="col-lg-8">
              <div class="card-body employee-card-body">
                <div class="card-title fw-bold">Who is Karen Doe?</div>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This content is a little bit longer.
                </p>

                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deleniti.
                  Modi, ab. Vero cum, voluptas adipisci labore in nulla aspernatur est id. Nobis
                  itaque voluptas
                </p>

                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deleniti.
                  Modi, ab. Vero cum, voluptas adipisci labore in nulla aspernatur est id. Nobis
                  itaque voluptas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-2">
        <div class="card employee-card mb-3" style="max-width: 100%">
          <div class="row g-0">
            <div
              class="col-lg-4 d-flex flex-column justify-content-center align-items-center p-2 bg-azure"
            >
              <h4 class="card-title mb-3 text-light">Karen Doe</h4>
              <img src="/employee1.jpg" class="img-fluid rounded-circle" alt="..." />
              <div class="d-flex mt-3 gap-1">
                <a href="">
                  <Icon icon="ri:instagram-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:twitter-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:facebook-fill" width="25" height="25" color="white" />
                </a>
                <a href="">
                  <Icon icon="ri:linkedin-fill" width="25" height="25" color="white" />
                </a>
              </div>
            </div>

            <div class="col-lg-8">
              <div class="card-body employee-card-body">
                <div class="card-title fw-bold">Who is Karen Doe?</div>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content. This content is a little bit longer.
                </p>

                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deleniti.
                  Modi, ab. Vero cum, voluptas adipisci labore in nulla aspernatur est id. Nobis
                  itaque voluptas
                </p>

                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, deleniti.
                  Modi, ab. Vero cum, voluptas adipisci labore in nulla aspernatur est id. Nobis
                  itaque voluptas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import pageHeader from './components/pageHeader.vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const companyName = computed(() => {
  if (data.value?.title) {
    return data.value.title
  } else {
    return ''
  }
})
</script>

<style lang="css" scoped>
.employee-card {
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
}

.employee-card-body {
  padding: 15px 30px;
  border-right: 5px solid #00a100;
}
.bg-azure {
  background-color: gray;
}

@media only screen and (max-width: 768px) {
  .employee-card-body {
    padding: 10px 10px;
  }
}
</style>
