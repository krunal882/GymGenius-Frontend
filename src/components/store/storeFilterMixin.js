/* eslint-disable */

export default {

    methods: {
        search() {
            this.fetchProductWithFilters({ name: this.selectedItem });
        },
        async applyFilters(filteredFilters) {
            try {
                await this.fetchProductWithFilters(filteredFilters);
            } catch (error) {
                console.error('Error fetching product with filters:', error);
            }
        },
        async fetchProductWithFilters(filteredFilters) {
            try {

                await this.$store.dispatch('fetchProduct', { filteredFilters, limit: 15 });
            } catch (error) {
                console.error('Error fetching product with filters:', error);
            }
        },

        onProductSelected(product) {
            this.$router.push({
                name: "productDetail",
                params: { category: product.category, id: product._id },
            });

        },
    },
    computed: {
        filteredProducts() {
            const allProducts = this.$store.state.productsModule.product;
            const filteredProducts = allProducts.filter(
                (product) => product.category === this.category
            );
            return filteredProducts;
        }
    },
    created() {
        const filteredFilters = {};
        const limit = 15;
        this.$store
            .dispatch("fetchProduct", { filteredFilters, limit })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    },
}
