
export default {

    methods: {

        async onProductSelected(product) {
            this.$router.push({
                name: "productDetail",
                params: { category: product.category, id: product._id },
            });
        },
        applyFilters(filters) {
            this.currentFilters = filters;
            this.page = 1;
            this.allLoaded = false;
            this.loadMoreProducts();
        },

        handleSearch(searchTerm) {
            this.searchTerm = searchTerm;
            this.page = 1;
            this.allLoaded = false;
            this.loadMoreProducts();
        },

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
        clearField() {
            this.searchTerm = "";
        },
    },
}
