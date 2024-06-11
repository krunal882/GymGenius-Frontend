<!-- this component is for admin to see all received orders of the product -->
<template>
  <div class="container pr-0 pl-0 ml-0 mr-0 mt-5">
    <v-row v-if="product.length != 0" class="d-flex">
      <v-col v-for="product in product?.length" :key="product.id" cols="12">
        <v-row>
          <v-col
            v-for="data in this.product[product - 1].productData?.length"
            :key="data.index"
            cols="12"
          >
            <v-card class="mx-auto image-hover-effect" max-width="600">
              <v-row>
                <v-col>
                  <!-- product image  -->
                  <v-img
                    class="align-end text-white"
                    height="346"
                    :src="
                      imgPath(
                        this.product[product - 1].productData[data - 1]
                          .productInfo[0].src,
                        this.product[product - 1].productData[data - 1]
                          .productInfo[0].category
                      )
                    "
                    cover
                  ></v-img>
                </v-col>
                <!-- product and user details  -->
                <v-col cols="6">
                  <div class="details-container ml-4">
                    <v-card-title class="pt-4">Product Title</v-card-title>

                    <v-card-text>
                      <strong>Brand Name</strong>

                      <div class="d-flex flex-wrap">
                        <div>
                          <span>Price: <v-chip color="green">$25</v-chip></span>
                          <span class="mx-4">
                            <v-chip
                              color="red"
                              style="text-decoration: line-through"
                            >
                              $30
                            </v-chip>
                          </span>
                        </div>
                        <span>
                          Discount: <v-chip color="blue">10% Off</v-chip>
                        </span>
                      </div>
                    </v-card-text>

                    <v-card-text>
                      <div style="margin-top: 1rem">
                        <div style="font-weight: bold">
                          Customer Information:
                        </div>
                        <div style="margin-top: 0.5rem">
                          <span style="text-transform: capitalize">
                            {{ this.product[product - 1].user[0].name }}
                          </span>
                        </div>
                        <div>
                          <div
                            href="mailto:krunalvekariya254@gmail.com"
                            style="color: #2196f3"
                          >
                            {{ this.product[product - 1].user[0].email }}
                          </div>
                        </div>
                        <div>
                          <div href="tel:9265635978" style="color: #2196f3">
                            {{ this.product[product - 1].user[0].number }}
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-else>
      <div class="text-center">
        <h1>No Orders Found</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
  methods: {
    //to  display image stored in local
    imgPath(src, category) {
      const imgPath = `../../assets/img/products/${category}/${src}.jpg`;
      return imgPath;
    },
    number() {
      return this.product.products.length;
    },
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.image-hover-effect {
  cursor: pointer;
}
</style>
