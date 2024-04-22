/* eslint-disable */

export default {

    methods: {
        async applyFilters(filteredFilters) {
            try {
                await this.fetchProductWithFilters(filteredFilters);
            } catch (error) {
                console.error('Error fetching product with filters:', error);
            }
        },
        async fetchProductWithFilters(filteredFilters) {
            try {
                // Dispatch the fetchProduct action with the filtered filters
                await this.$store.dispatch('fetchProduct', filteredFilters);
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
    mounted() {
        const filteredFilters = {}; // Initialize with an empty object

        this.$store
            .dispatch("fetchProduct", { filteredFilters }) // Pass the filteredFilters object
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    },
}
