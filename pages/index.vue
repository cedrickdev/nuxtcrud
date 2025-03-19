<template>


  <!-- Debugging: Display the raw posts data -->
  <!--  <pre>{{ posts }}</pre>-->
  <!--

    <div>
      <ul>

        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.id }}</h3>
          <p>{{ post.title }}</p>
          <p>{{ post.content }}</p>
          <p>{{ post.published }}</p>
          <p>{{ post.authorId }}</p>
        </li>
      </ul>
    </div>
  -->
  <h1 class="text-3xl text-slate-900 text-center">
    All posts
  </h1>
  <div v-for="post in posts" :key="post.id" :post="post">
   <postCard :post="post" />



<!--    <Card class="w-[350px] mx-auto inline-block cursor-pointer " v-for="post in posts" :key="post.id" :post="post" >-->
<!--      <NuxtLink :to="`/viewPost/${post.id}`">-->
<!--      <CardHeader>-->
<!--        <CardTitle> {{ post.title }} </CardTitle>-->
<!--      </CardHeader>-->
<!--      <CardContent>-->

<!--        <div class="flex-1 space-y-1">-->
<!--          <p class="text-sm font-medium leading-none">-->
<!--            {{ post.content }}-->
<!--          </p>-->
<!--          <p class="text-sm text-muted-foreground">-->
<!--            {{ post.authorId }}-->
<!--          </p>-->
<!--        </div>-->
<!--      </CardContent>-->
<!--      <CardFooter class="flex justify-between px-6 pb-6">-->
<!--        <div class="flex justify-start">-->
<!--        <Button variant="outline">-->
<!--          Update Post-->
<!--        </Button>-->
<!--        <Button>Delete</Button>-->
<!--        </div>-->
<!--      </CardFooter>-->
<!--      </NuxtLink>-->
<!--    </Card>-->
  </div>



</template>


<script setup>

import postCard from "~/components/postCard.vue";

import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


const {data} = await useFetch('/api/post/showAllPosts');
const posts = data.value.Posts;
 // console.table(posts);



</script>
