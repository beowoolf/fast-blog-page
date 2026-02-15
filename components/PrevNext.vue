<template>
  <div class="d-flex justify-content-between">
    <InternalLink
      v-if="next"
      :anchor="'Nowszy: ' + next.title"
      class="text-secondary"
      :page="{ name: 'blog-slug', params: { slug: next.slug } }"
    >
      Nowszy: {{ next.title }}
    </InternalLink>
    <span v-else>&nbsp;</span>
    <InternalLink
      v-if="prev"
      :anchor="'Starszy: ' + prev.title"
      class="text-secondary"
      :page="{ name: 'blog-slug', params: { slug: prev.slug } }"
    >
      Starszy: {{ prev.title }}
    </InternalLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
