<template>
  <v-container>
    <!-- Cart Items -->
    <v-row class="mb-5" v-if="product.length > 0">
      <v-col cols="12" v-for="(item, index) in product" :key="index">
        <v-card class="cart-item">
          <v-row>
            <!-- product image -->
            <v-col cols="4">
              <v-img
                :src="imgPath(item.src, item.category)"
                aspect-ratio="1"
              ></v-img>
            </v-col>
            <!-- product information -->
            <v-col cols="8">
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <v-card-text class="pt-0">
                  <div class="d-flex flex-wrap">
                    <span
                      >Price:
                      <v-chip color="green">{{ item.price }}</v-chip></span
                    >
                    <span class="mx-4">
                      <v-chip
                        color="red"
                        style="text-decoration: line-through"
                        >{{ item.original_price }}</v-chip
                      >
                    </span>
                  </div>
                </v-card-text>
                <v-card-text>
                  <span
                    >Discount:
                    <v-chip color="blue">{{ item.off }}</v-chip></span
                  >
                </v-card-text>
                <!-- product return option -->
                <v-btn
                  @click="confirmReturn(item)"
                  :disabled="loading && currentItem === item"
                  color="success"
                  small
                >
                  Return
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty Cart Message -->
    <v-alert v-else type="info" class="mb-5">
      You haven't purchased any products yet. Browse our collection and find
      something you love!
    </v-alert>

    <!-- Confirmation Dialog -->
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <template v-slot:default="{ isActive }">
        <v-card class="dialog-card">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="text-uppercase"
              >Confirm Return</v-toolbar-title
            >
          </v-toolbar>

          <v-card-text class="text-body-1 pa-12">
            Are you sure you want to return this item?
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn color="primary" text @click="isActive.value = false"
              >Cancel</v-btn
            >
            <v-btn
              color="error"
              text
              @click="executeReturn"
              :disabled="loading"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="white"
                size="20"
              ></v-progress-circular>
              <span v-else> Confirm </span></v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    product: { type: Array, required: true },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      currentItem: null, // Keep track of the current item being returned
    };
  },
  methods: {
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
      return imgPath;
    },
    confirmReturn(item) {
      this.currentItem = item;
      this.dialog = true;
    },
    async executeReturn() {
      this.loading = true;
      try {
        await this.$store.dispatch("return", this.currentItem);
      } catch (error) {
        console.error("Return request failed:", error);
      } finally {
        this.loading = false;
        this.dialog = false;
        this.currentItem = null;
      }
    },
  },
};
</script>

<style scoped>
.headline {
  font-size: 2rem;
}

.cart-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-details h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.dialog-card {
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card__text {
  padding: 16px;
}

.v-btn {
  margin-left: 8px;
}
</style>
