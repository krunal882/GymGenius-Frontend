import Cookies from "js-cookie";

export default {
    methods: {
        // to send request for bookmark or undo-bookmark
        async bookmarkOrUndo(item, itemType) {
            const token = Cookies.get("token");

            if (!token) {
                // Redirect to authentication page if not logged in
                this.$router.push("/authentication");
                return;
            }

            const userId = this.$store.state.userModule.userId;
            const itemId = item._id;
            if (this.isBookmarked(item, itemType)) {
                await this.$store.dispatch("undoBookmark", {
                    userId,
                    itemId,
                    itemType,
                });
            } else {
                await this.$store.dispatch("bookmarkItem", {
                    userId,
                    item,
                    itemType,
                });
            }
        },
        // to check if item is bookmarked or not
        isBookmarked(item) {
            const bookmarkedItems = this.bookmarked || [];
            return bookmarkedItems.some(
                (bookmarkedItem) => bookmarkedItem._id === item._id
            );
        },
    },
};
