<template>
  <div>
    <article v-if="post.length !== 0">
      <nuxt-img
        id="pic"
        class="rounded img-fluid"
        preload
        quality="80"
        :src="post.img"
        sizes="sm:90vw md:90vw lg:90vw"
        :alt="post.alt"
        :title="post.alt"
        format="webp"
      />
      <ShowPostTags :tags="post.tags" />
      <h1 class="mt-2">{{ post.title }}</h1>
      <nav class="mt-8 p-2">
        <ul>
          <li v-for="link of post.toc" :key="link.id">
            <InternalLink
              class="btn btn-link text-muted"
              :anchor="link.text"
              :page="`#${link.id}`"
              >{{ link.text }}</InternalLink
            >
          </li>
        </ul>
        <InternalLink
          page="/"
          anchor="Wróć"
          class="btn btn-link text-muted mt-8"
          >← Wróć</InternalLink
        >
        <InternalLink
          page="/blog/"
          class="btn btn-link text-secondary font-weight-bold mt-8"
          anchor="Wszystkie wpisy"
          >Wszystkie wpisy</InternalLink
        >
        <PrevNext :prev="prev" :next="next" />
      </nav>
      <nuxt-content class="mt-1" :document="post" />
    </article>
    <div v-else class="text-center">
      <strong>Nie udało się załadować wpisu z bloga</strong>
    </div>
  </div>
</template>

<script>
import SEO from '~/mixins/SEO.js'

export default {
  mixins: [SEO],
  async asyncData({ $content, params }) {
    let post = []

    try {
      post = await $content('articles', params.slug).fetch()
    } catch (error) {
      console.error(error)
    }

    let prev = []
    let next = []

    try {
      const x = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()
      prev = x.prev
      next = x.next
    } catch (error) {
      console.error(error)
    }

    return {
      post,
      prev,
      next,
    }
  },
  computed: {
    heroUnitImg() {
      return '/' + this.post.img || 'logo.png'
    },
    rawPageTitle() {
      return this.post.title || ''
    },
    rawPageDescription() {
      return this.post.description || ''
    },
    keywords() {
      return this.post.tags || []
    },
  },
  mounted() {
    const pic = document.getElementById('pic')
    if (pic) {
      pic.setAttribute('width', '100%')
      pic.setAttribute('height', '100%')
    }
  },
}
</script>
