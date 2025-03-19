<template>
  <div
      :id="`postCard${post.id}`"
      class="inline-block cursor-pointer rounded-lg bg-white transition-colors duration-300 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] dark:bg-surface-800 dark:hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.15)]"
  >
    <NuxtLink :to="`viewPost/${post.id}`">
      <!--This is to link the post to the single post page-->
<!--      <NuxtImg v-if="postHasImages" class="rounded-xl" :src="post.images[0].url" />-->

      <div id="postDetails">
        <div class="flex posts-center justify-between px-1 pt-3 md:flex-row lg:flex-col">
          <div class="min-w-0 flex-grow overflow-hidden">
            <span class="font-semibold text-[#FD374F]">
              {{ post.title.substring(0, 17) + (post.title.length > 17 ? "..." : "") }}
            </span>
          </div>
          <span class="mt-1 text-xs font-semibold text-[#009A66] md:mt-0">
            {{ post.content }}
          </span>

          <span class="mt-1 text-xs font-semibold text-[#009A66] md:mt-0">
            {{ post.authorId }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(["post"]); //This is to define the props that will be passed to the component.
const { post } = toRefs(props); //This is to make the props reactive which means that if the props change, the component will be updated



</script>
