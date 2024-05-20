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
        async fetchProductWithFilters(filteredFilters, page) {
            try {
                const url = 'http://localhost:3000/store/filtered'
                await this.$store.dispatch('fetchProduct', { filteredFilters, page, url });
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
        applyFilters(filters) {
            this.currentFilters = filters;
            this.page = 1;
            this.allLoaded = false;
            this.fetchProductWithFilters({ name: this.searchTerm, ...filters });
        },

        handleSearch(searchTerm) {
            this.searchTerm = searchTerm;
            this.page = 1;
            this.allLoaded = false;
            this.fetchProductWithFilters({
                name: searchTerm,
                ...this.currentFilters,
                page: this.page,
                limit: 15,
            });
        },

        async loadMoreProducts({ done }) {
            if (this.allLoaded || this.loading) {
                done("empty");
                return;
            }
            this.loading = true;
            try {
                const url = "http://localhost:3000/store";
                await this.$store.dispatch("fetchProduct", {
                    filteredFilters: { ...this.currentFilters },
                    limit: 15,
                    page: this.page,
                    url,
                });
                this.page += 1;
                const allProducts = this.$store.state.productsModule.product;
                this.allLoaded = allProducts.length === 0;
            } catch (error) {
                console.error("Error loading more products:", error);
            } finally {
                this.loading = false;
                done(this.allLoaded ? "empty" : null);
            }
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
        const url = "http://localhost:3000/store"
        this.$store
            .dispatch("fetchProduct", { filteredFilters, limit, page: this.page, url })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    },

}
