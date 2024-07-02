<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const products = ref([]);

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  return products.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const router = useRouter();
</script>
<template>
  <Navbar />
  <div class="container mt-32">
    <div class="flex justify-center">
      <input
        v-model="searchQuery"
        placeholder="Search products..."
        class="mb-[20px] p-[10px] border outline-none border-gray-300 rounded"
      />
    </div>

    <div class="grid md:grid-cols-5 grid-cols-2 gap-[20px]">
      <router-link
        :to="`/products/${item.id}`"
        v-for="(item, i) in filteredProducts"
        :key="i"
        class="mb-[30px] bg-k_oq shadow-xl pb-5 relative"
      >
        <img :src="item?.thumbnail" alt="" />
        <p
          class="font-normal text-[14px] leading-[16.41px] opacity-[70%] mx-[16px] mt-[10px] mb-[70px]"
        >
          {{ item?.brand }}
        </p>
        <p
          class="font-medium text-[16px] leading-[16px] mx-[16px] mt-[10px] absolute bottom-[75px] md:bottom-[90px]"
        >
          {{ item?.title }}
        </p>
        <p
          class="font-bold text-[14px] text-red-500 leading-[14px] mx-[16px] mt-[40px] text-k_asosiy line-through"
        >
          ${{ item?.discountPercentage }}
        </p>
        <p
          class="font-bold text-[20px] leading-[20px] mx-[16px] mt-[10px] text-k_moviy"
        >
          ${{ item?.price }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
.input {
  margin-bottom: 20px;
}
</style>
