<template>
  <div>
    <ShowPosts v-if="posts.length > 0" :posts="posts">{{ tag }}</ShowPosts>
    <div v-else class="text-center">
      <strong>Nie udało się załadować wpisów z tagiem {{ tag }}</strong>
    </div>
  </div>
</template>

<script>
import SEO from '~/mixins/SEO.js'

export default {
  mixins: [SEO],
  async asyncData({ $content, params }) {
    const tag = params.tag
    let posts = []

    try {
      posts = await $content('articles')
        // .only(['title', 'img', 'alt, 'tags', 'slug'])
        .without('body')
        .sortBy('createdAt', 'desc')
        .where({ tags: { $contains: tag } })
        .fetch()
    } catch (error) {
      console.error(error)
    }

    return { tag, posts }
  },
  data() {
    return {
      heroUnitImg: '/logo.png',
    }
  },
  computed: {
    rawPageTitle() {
      return this.tag
    },
    rawPageDescription() {
      return 'Posty z tagiem ' + this.tag
    },
    keywords() {
      return [this.tag]
    },
  },
}
</script>
