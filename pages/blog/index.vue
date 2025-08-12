<template>
  <div>
    <ShowPosts v-if="posts.length > 0" :posts="posts"
      >Wpisy na blogu w 2025</ShowPosts
    >
    <div v-else class="text-center">
      <strong>Nie udało się załadować wpisów z bloga</strong>
    </div>
  </div>
</template>

<script>
import SEO from '~/mixins/SEO.js'

export default {
  mixins: [SEO],
  async asyncData({ $content }) {
    let posts = []

    try {
      posts = await $content('articles')
        // .only(['title', 'img', 'alt, 'tags', 'slug'])
        .without('body')
        .sortBy('createdAt', 'desc')
        .fetch()
    } catch (error) {
      console.error(error)
    }

    return {
      posts,
    }
  },
  data() {
    return {
      heroUnitImg: '/logo.png',
      rawPageTitle: 'Blog',
      rawPageDescription: 'Tutaj możesz poczytać nasze posty',
      keywords: ['działania', 'content', 'marketingowe'],
    }
  },
}
</script>
