<template>
  <div class="container-fluid mt-150 mb-5">
    <div class="row">
      <div class="col-sm-12 hero-section text-center">
        <h2>{{ props.title }}</h2>
        <h1 class="company-title text-muted">{{ props.subTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subTitle: String
})
</script>

<style scoped>
.hero-section {
  padding: 10px 20px;
  background-color: #0d6efd1c;
  padding-bottom: 4rem;
  padding-top: 4rem;
}

@media only screen and (max-width: 768px) {
  .hero-section {
    padding-bottom: 2rem;
    padding-top: 2rem;
  }
}

.company-title{
  font-size: 16px;
  font-weight: 500;
}
</style>
