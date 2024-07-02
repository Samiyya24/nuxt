<template>
  <Navbar />
  <div class="container mt-32">
    <div class="grid md:grid-cols-5 grid-cols-2 gap-[20px]">
      <div v-if="products" class="mb-[30px] bg-k_oq shadow-xl pb-5 relative">
        <img :src="products.thumbnail" alt="" />
        <p
          class="font-normal text-[14px] leading-[16.41px] opacity-[70%] mx-[16px] mt-[10px] mb-[70px]"
        >
          {{ products.brand }}
        </p>
        <p
          class="font-medium text-[16px] leading-[16px] mx-[16px] mt-[10px] absolute bottom-[75px] md:bottom-[90px]"
        >
          {{ products.title }}
        </p>
        <p
          class="font-bold text-[14px] text-red-500 leading-[14px] mx-[16px] mt-[40px] text-k_asosiy line-through"
        >
          ${{ products.discountPercentage }}
        </p>
        <p
          class="font-bold text-[20px] leading-[20px] mx-[16px] mt-[10px] text-k_moviy"
        >
          ${{ products.price }}
        </p>
      </div>
    </div>
    <div class="flex justify-center">
      <nuxt-link class="bg-blue-400 px-5 py-2 rounded text-white" to="/">
        <- back</nuxt-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const route = useRoute();
onMounted(async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${route.params.id}`
    );
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>
