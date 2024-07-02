<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const products = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);
const itemsPerPage = 10;

const fetchProducts = async (query = "", page = 1) => {
  const skip = (page - 1) * itemsPerPage;
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${itemsPerPage}&skip=${skip}`
    );
    const data = await response.json();
    products.value = data.products;
    totalItems.value = data.total;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(() => {
  fetchProducts();
});

watch([searchQuery, currentPage], () => {
  fetchProducts(searchQuery.value, currentPage.value);
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
        v-for="(item, i) in products"
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

    <div class="flex justify-center">
      <vue-awesome-paginate
        class="gap-5"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        :max-pages-shown="5"
        v-model="currentPage"
      />
    </div>
  </div>
</template>

<style scoped></style>
