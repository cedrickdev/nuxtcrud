<template>
  <h1>
      single post

    <div class=" grid grid-cols-4 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-4 sm:grid-cols-1">
      <Card class="w-[350px] mx-auto inline-block cursor-pointer " >

          <CardHeader>
            <CardTitle> {{ post.title }} </CardTitle>
          </CardHeader>
          <CardContent>

            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ post.content }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ post.authorId }}
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between px-6 pb-6">
            <div class="flex justify-start">
              <Button variant="outline">
                Update Post
              </Button>
              <Button>Delete</Button>
            </div>
          </CardFooter>

      </Card>
    </div>

  </h1>
</template>
<script setup lang="ts">
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";

 const props = defineProps(["post"]);
 const { post } = toRefs(props);

 console.log(post);

 

</script>
