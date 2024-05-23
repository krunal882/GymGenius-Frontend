<template>
  <h3 class="text-center">Your Products</h3>
  <div>
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <AddProduct :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="products.length > 0">
      <ProductAction
        :products="products"
        @edit-product="openEditDialog"
        @remove-product="openRemoveDialog"
      />
      <ProductDialog
        :productData="selectedProduct"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <RemoveItem
        action="removeProduct"
        :item="selectedProduct"
        :dialogOpen="removeDialogOpen"
        @close-dialog="closeRemoveDialog"
      />
    </div>
    <div v-else class="no-item-container">
      <p class="no-item-text">Search something for result</p>
    </div>
  </div>
</template>

<script>
import ItemSearch from "@/components/common-components/ItemSearch.vue";
import AddProduct from "./information/actions/addItem/AddProduct.vue";
import ProductAction from "./information/actions/ProductAction.vue";
import ProductDialog from "./information/actions/ProductDialog.vue";
import RemoveItem from "./information/actions/removeItem/RemoveItem.vue";
export default {
  components: {
    ItemSearch,
    AddProduct,
    ProductAction,
    ProductDialog,
    RemoveItem,
  },
  data() {
    return {
      selectedItem: null,
      product: [],
      selectedProduct: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
      page: 1,
    };
  },
  computed: {
    products() {
      return this.$store.state.productsModule.product;
    },
  },
  methods: {
    openEditDialog(product) {
      this.selectedProduct = product;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    openRemoveDialog(product) {
      this.selectedProduct = product;
      this.removeDialogOpen = true;
    },
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    openAddDialog() {
      this.addDialogOpen = true;
    },
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchProductsWithFilters({ name: this.selectedItem });
    },
    async fetchProductsWithFilters(filteredFilters) {
      try {
        const url = "http://localhost:3000/store/filtered";
        await this.$store.dispatch("fetchProduct", {
          filteredFilters,
          page: this.page,
          url,
          limit: 10,
        });
        this.page += 1;
      } catch (error) {
        console.error("Error fetching product with filters:", error);
      }
    },
  },
};
</script>

<style scoped>
.no-item-container {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.no-item-text {
  font-size: 24px;
  color: #000000;
}
</style>
