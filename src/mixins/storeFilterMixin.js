// mixin component for the products that contains methods related to products
export default {

    methods: {
        // to navigate to product detail page
        async onProductSelected(product) {
            this.$router.push({
                name: "productDetail",
                params: { category: product.category, id: product._id },
            });
        },

        // to apply selected filters on the product
        applyFilters(filters) {
            this.currentFilters = filters;
            this.page = 1;
            this.allLoaded = false;
            this.loadMoreProducts();
        },

        // to search any product
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm;
            this.page = 1;
            this.allLoaded = false;
            this.loadMoreProducts();
        },

        // to load more products when scrolling
        async loadMoreProducts({ done } = {}) {
            if (this.allLoaded || this.loading) {
                if (done) done("empty");
                return;
            }

            this.loading = true;

            try {
                const url = "http://localhost:3000/store";
                const response = await this.$store.dispatch("fetchProduct", {
                    filteredFilters: { ...this.currentFilters, name: this.searchTerm },
                    page: this.page,
                    url,
                    category: this.category,
                    limit: 15,
                    store: this.category,
                });
                if (response.length < 15) {
                    this.allLoaded = true;
                    if (done) done("empty");
                } else {
                    this.page += 1;
                }
            } catch (error) {
                console.error("Error loading more products:", error);
            } finally {
                this.loading = false;
                if (done) done(this.allLoaded ? "empty" : null);
            }
        },

        // to empty search field
        clearField() {
            this.searchTerm = "";
        },
    },
}
