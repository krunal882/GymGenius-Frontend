import {
  mutations,
  State,
  Product,
} from "../src/Infostore/modules/productsModule";

describe("Vuex Store Mutations", () => {
  let state: State;
  const productData: Product[] = [
    {
      _id: "1",
      category: "Men",
      src: "/images/product1.jpg",
      title: "Product 1",
      price: 100,
      original_price: "120",
      off: "20",
      state: "available",
    },
    {
      _id: "2",
      category: "Women",
      src: "/images/product2.jpg",
      title: "Product 2",
      price: 50,
      original_price: "60",
      off: "10",
      state: "available",
    },
  ];
  const adminProductData: Product[] = [
    {
      _id: "1",
      category: "Accessories",
      src: "/images/product3.jpg",
      title: "Product 3",
      price: 80,
      original_price: "100",
      off: "20",
      state: "available",
    },
    {
      _id: "2",
      category: "Equipments",
      src: "/images/product4.jpg",
      title: "Product 4",
      price: 120,
      original_price: "150",
      off: "20",
      state: "available",
    },
  ];

  beforeEach(() => {
    state = {
      product: [],
      productSearch: [],
      adminProduct: [],
      men: [],
      women: [],
      accessories: [],
      cardio: [],
      cycles: [],
      equipments: [],
      running: [],
      strength: [],
      supplements: [],
      yoga: [],
      detail: [],
      equipmentCarousal: [],
      supplementCarousal: [],
      cycleCarousal: [],
      cardioCarousal: [],
    };
  });

  it("setProduct mutation sets the specified category in state correctly", () => {
    const payload = { data: productData, category: "Men", store: "men" };
    mutations.setProduct(state, payload);
    expect(state.men).toEqual(productData);
  });

  it("setProduct mutation sets the specified category in state correctly", () => {
    const payload = { data: productData, category: "women", store: "women" };
    mutations.setProduct(state, payload);
    expect(state.women).toEqual(productData);
  });

  it("appendProducts mutation appends products to the specified category in state correctly", () => {
    state.men = [...productData];
    const newProducts: Product[] = [
      {
        _id: "3",
        category: "Men",
        src: "/images/product5.jpg",
        title: "Product 5",
        price: 150,
        original_price: "180",
        off: "20",
        state: "available",
      },
    ];
    const payload = { data: newProducts, category: "Men", store: "men" };
    mutations.appendProducts(state, payload);
    expect(state.men).toEqual([...productData, ...newProducts]);
  });

  it("resetProducts mutation resets the state.product to an empty array", () => {
    state.product = [...productData];
    mutations.resetProducts(state);
    expect(state.product).toEqual([]);
  });

  it("setAdminProduct mutation sets the admin products in state correctly", () => {
    mutations.setAdminProduct(state, adminProductData);
    expect(state.adminProduct).toEqual(adminProductData);
  });

  it("appendAdminProduct mutation appends admin products to state correctly", () => {
    state.adminProduct = [...adminProductData];
    const newAdminProducts: Product[] = [
      {
        _id: "3",
        category: "Equipments",
        src: "/images/product6.jpg",
        title: "Product 6",
        price: 90,
        original_price: "110",
        off: "20",
        state: "available",
      },
    ];
    mutations.appendAdminProduct(state, newAdminProducts);
    expect(state.adminProduct).toEqual([
      ...adminProductData,
      ...newAdminProducts,
    ]);
  });

  it("editProduct mutation edits an admin product in state correctly", () => {
    state.adminProduct = [...adminProductData];
    const editedProduct: Product = {
      _id: "2",
      category: "Equipments",
      src: "/images/edited_product.jpg",
      title: "Edited Product",
      price: 130,
      original_price: "160",
      off: "20",
      state: "available",
    };
    mutations.editProduct(state, editedProduct);
    const editedIndex = state.adminProduct.findIndex(
      (item) => item._id === "2"
    );
    expect(editedIndex).not.toBe(-1);
    if (editedIndex !== -1) {
      expect(state.adminProduct[editedIndex]).toEqual(editedProduct);
    }
  });

  it("removeProduct mutation removes an admin product from state correctly", () => {
    state.adminProduct = [...adminProductData];
    const productIdToRemove = "1";
    mutations.removeProduct(state, productIdToRemove);
    const remainingProducts = state.adminProduct.filter(
      (item) => item._id !== productIdToRemove
    );
    expect(state.adminProduct).toEqual(remainingProducts);
  });
});
