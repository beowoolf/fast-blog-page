<template>
  <div class="mt-2">
    <span v-for="tag in tags" :key="tag" class="text-muted">
      <InternalLink
        class="btn btn-link font-weight-bold"
        :class="
          $colorMode.preference == 'light' ? 'text-primary' : 'text-warning'
        "
        :page="`/blog/category/${tag}`"
        :anchor="tag"
      >
        {{ tag }}
      </InternalLink>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
}
</script>
