<!-- this component is parent component of product for the admin actions -->
<template>
  <h3 class="text-center">Your Products</h3>
  <div>
    <!-- component to handle search action by admin -->
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <!-- component to add new product by admin -->
    <AddProduct :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="products.length > 0">
      <!-- component for options of edit and delete  -->
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <ProductAction
          :products="products"
          @edit-product="openEditDialog"
          @remove-product="openRemoveDialog"
        />
        <template v-slot:empty>
          <v-alert type="warning">No more products!</v-alert>
        </template>
      </v-infinite-scroll>
      <!-- component for edit operation -->
      <ProductDialog
        :productData="selectedProduct"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <!-- component for delete operation -->
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
      loading: false,
      searchTerm: "",
      allLoaded: false,
    };
  },
  computed: {
    // data request sent to show some result when page first loads
    products() {
      return this.$store.state.productsModule.adminProduct;
    },
  },
  methods: {
    //to open the edit dialog
    openEditDialog(product) {
      this.selectedProduct = product;
      this.dialogOpen = true;
    },
    // to close edit dialog
    closeEditDialog() {
      this.dialogOpen = false;
    },
    // to open delete dialog
    openRemoveDialog(product) {
      this.selectedProduct = product;
      this.removeDialogOpen = true;
    },
    //to close delete dialog
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    //to open add new dialog
    openAddDialog() {
      this.addDialogOpen = true;
    },
    //to close add new dialog
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    //to handle search operation by admin
    handleSearch(selectedItem) {
      this.selectedItem = selectedItem;
      this.page = 1;
      this.allLoaded = false;

      this.fetchProductsWithFilters();
    },

    //load more products when scroll
    async loadMoreProducts({ done }) {
      if (this.allLoaded || this.loading) {
        done("empty");
        return;
      }

      this.loading = true;
      try {
        let filter = {};
        if (this.selectedItem) {
          filter.name = this.selectedItem;
        }
        const url = "http://localhost:3000/store";
        const response = await this.$store.dispatch("fetchProduct", {
          filteredFilters: filter,
          limit: 10,
          page: this.page,
          url,
          role: "admin",
        });
        if (response.length === 0) {
          this.allLoaded = true;
        } else {
          this.page += 1;
        }
      } catch (error) {
        console.error("Error loading more products:", error);
        done("error");
      } finally {
        this.loading = false;
        done(this.allLoaded ? "empty" : null);
      }
    },
    //fetch data
    async fetchProductsWithFilters() {
      try {
        this.loading = true;
        const filter = {};
        if (this.selectedItem) {
          filter.name = this.selectedItem;
        }
        const url = "http://localhost:3000/store";
        await this.$store.dispatch("fetchProduct", {
          filteredFilters: filter,
          page: this.page,
          url,
          limit: 10,
          role: "admin",
        });

        this.page += 1;
      } catch (error) {
        console.error("Error fetching product with filters:", error);
      } finally {
        this.loading = false;
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
