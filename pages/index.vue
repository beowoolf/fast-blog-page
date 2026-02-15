<template>
  <div>
    <ShowPosts v-if="posts.length > 0" :posts="posts"
      >Nowości na blogu</ShowPosts
    >
    <div v-else class="text-center">
      <strong>Nie udało się załadować nowości z bloga</strong>
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
        // .only(['title', 'img', 'alt', 'tags', 'slug'])
        .without('body')
        .sortBy('createdAt', 'desc')
        .limit(3)
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
      rawPageTitle: 'Strona główna',
      rawPageDescription: 'Witamy na stronie dotyczącej naszej działalności',
      keywords: ['tworzenie', 'strony', 'internetowe'],
    }
  },
  jsonld() {
    return {
      '@context': 'http://schema.org/',
      '@type': 'WebSite',
      name: 'MojeZapiski.pl',
      image: 'https://mojezapiski.pl/logo.png',
      url: 'https://mojezapiski.pl/',
    }
  },
}
</script>
