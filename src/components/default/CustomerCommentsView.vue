<template>
  <pageHeader :title="$t('customerReview.title')" :subTitle="companyName" />
  <div class="container">
    <div class="row">
      <sendComment />
    </div>

    <div class="row" v-if="comments.length > 0">
      <div
        class="col-md-6 mt-5 align-items-start justify-content-center"
        v-for="(item, index) in slicedComments"
        :key="index"
      >
        <div class="card-content comment-card">
          <h4>{{ item.name }}</h4>

          <div class="">
            <Icon
              v-for="(item, index) in item.star"
              :key="index"
              icon="solar:star-bold"
              width="16"
              height="16"
              color="#ffa737"
              class="align-middle"
            />
            <span class="ms-3 text-muted">{{ item.date }}</span>
          </div>

          <div class="w-75 mt-4">
            <p>{{ item.message }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <p class="text-center">{{$t('customerReview.fallback')}}</p>
    </div>

    <div class="row">
      <div class="col-sm-12 justify-content-center align-items-center">
        <button class="btn btn-primary mt-3" @click="loadMoreComments">
          {{ $t('customerReview.loadMore') }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useReviewStore } from '../../stores/reviews'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import sendComment from './components/sendComment.vue'
import pageHeader from './components/pageHeader.vue'

const reviewsStore = useReviewStore()
const { reviews } = storeToRefs(reviewsStore)
const { fetchReviews } = reviewsStore

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const companyName = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return ''
  }
})

const comments = computed(() => {
  if (reviews.value) {
    return reviews.value
  } else {
    return []
  }
})

const slicedComments = computed(() => {
  const start = commentsLimit.start
  const end = commentsLimit.end

  if (end > comments.value.length) {
    return comments.value.slice(start)
  }

  return comments.value.slice(start, end)
})

const commentsLimit = reactive({
  start: 0,
  end: 12
})

const loadMoreComments = () => {
  commentsLimit.end += 12
}

onMounted(async () => {
  await fetchReviews()
})
</script>

<style scoped>
.comment-card {
  min-height: 250px;
}

@media only screen and (max-width: 1200px) {
  .comment-card {
    min-height: 275px;
  }
}

@media only screen and (max-width: 991px) {
  .comment-card {
    min-height: 340px;
  }
}
</style>
