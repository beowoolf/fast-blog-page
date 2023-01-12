<template>
  <div>
    <h1 class="text-center"><slot>Wpisy</slot></h1>
    <b-row>
      <b-col
        v-for="post in posts"
        :key="post.slug"
        cols="12"
        sm="4"
        class="transition-all duration-500 ease-in-out"
      >
        <InternalLink
          class="text-muted"
          :page="`/blog/${post.slug}`"
          :anchor="post.title"
        >
          <nuxt-img
            class="img-fluid"
            :src="post.img"
            :alt="post.alt"
            :title="post.alt"
            preset="preview"
            format="webp"
            width="800"
            height="600"
            preload
          />
        </InternalLink>
        <ShowPostTags :tags="post.tags" />
        <InternalLink :page="`/blog/${post.slug}`" :anchor="post.title">
          <h2
            class="mt-2"
            :class="
              $colorMode.preference == 'light' ? 'text-dark' : 'text-white'
            "
          >
            {{ post.title }}
          </h2>
        </InternalLink>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>
