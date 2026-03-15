<template>
  <div>
    <h1 class="text-center"><slot>Wpisy</slot></h1>
    <BootstrapRow>
      <div
        v-for="post in posts"
        :key="post.slug"
        class="transition-all duration-500 ease-in-out col-sm-4 col-12"
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
        <InternalLink
          :page="`/blog/${post.slug}`"
          :anchor="post.title"
          :class="$colorMode.preference == 'light' ? 'text-dark' : 'text-white'"
        >
          <h2 class="mt-2">
            {{ post.title }}
          </h2>
        </InternalLink>
      </div>
    </BootstrapRow>
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
