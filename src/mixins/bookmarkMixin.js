export default {
    methods: {
        toggleBookmark(item, itemType) {
            const userId = this.$store.state.userModule.userId;
            const itemId = item._id;
            if (this.isBookmarked(item, itemType)) {
                this.$store.dispatch("undoBookmark", {
                    userId,
                    itemId,
                    itemType,
                });
            } else {
                this.$store.dispatch("bookmarkItem", {
                    userId,
                    item,
                    itemType,
                });
            }
        },
        isBookmarked(item) {
            const bookmarkedItems = this.bookmarked || [];
            return bookmarkedItems.some((bookmarkedItem) => bookmarkedItem._id === item._id);
        },
    },
};
