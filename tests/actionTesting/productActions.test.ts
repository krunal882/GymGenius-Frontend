import { actions, Product } from "../../src/Infostore/modules/productsModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("productModule actions", () => {
  let mockAxios: MockAdapter;
  let mockToast: any;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };

    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it("fetchProduct commits data correctly", async () => {
    const commit = jest.fn();
    const filteredFilters = { category: "accessories" };
    const page = 1;
    const limit = 10;
    const url = "http://localhost:3000/store";
    const role = "admin";
    const category = "accessories";
    const store = "product";

    const mockProduct: Product = {
      _id: "6603b05810e52067a82c40dc",
      category: "accessories",
      src: "rqFrmhQat5ajC62f7rKCPU6m",
      title: "Signature Boxing Hand Wraps",
      price: 389,
      original_price: "599",
      off: "35% Off",
      state: "active",
    };

    mockAxios
      .onGet(`${url}/filtered?category=${category}&limit=${limit}&page=${page}`)
      .reply(200, [mockProduct]);

    await actions.fetchProduct(
      { commit },
      { filteredFilters, limit, page, url, role, category, store }
    );

    expect(commit).toHaveBeenCalledWith("setAdminProduct", [mockProduct]);
    expect(commit).toHaveBeenCalledWith("setProduct", {
      data: [mockProduct],
      category,
      store,
    });
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("addProduct commits data correctly", async () => {
    const commit = jest.fn();
    const newProduct: Product = {
      _id: "6603b05810e52067a82c40dc",
      category: "accessories",
      src: "rqFrmhQat5ajC62f7rKCPU6m",
      title: "Signature Boxing Hand Wraps",
      price: 389,
      original_price: "599",
      off: "35% Off",
      state: "active",
    };

    mockAxios
      .onPost("http://localhost:3000/store/addProduct")
      .reply(201, newProduct);

    await actions.addProduct({ commit }, { product: newProduct });

    expect(mockToast.success).toHaveBeenCalledWith(
      "New Product added successfully"
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("editProduct commits data correctly", async () => {
    const commit = jest.fn();
    const updatedProduct: Product = {
      _id: "6603b05810e52067a82c40dc",
      category: "accessories",
      src: "rqFrmhQat5ajC62f7rKCPU6m",
      title: "Signature Boxing Hand Wraps",
      price: 350, // Updated price
      original_price: "599",
      off: "35% Off",
      state: "active",
    };

    mockAxios
      .onPatch(
        `http://localhost:3000/store/updateProduct?id=${updatedProduct._id}`
      )
      .reply(200, updatedProduct);

    await actions.editProduct({ commit }, { product: updatedProduct });

    expect(commit).toHaveBeenCalledWith("editProduct", updatedProduct);
    expect(mockToast.success).toHaveBeenCalledWith(
      " Product updated successfully"
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("removeProduct commits data correctly", async () => {
    const commit = jest.fn();
    const idToRemove = "6603b05810e52067a82c40dc";

    mockAxios
      .onDelete(`http://localhost:3000/store/removeProduct?id=${idToRemove}`)
      .reply(200);

    await actions.removeProduct({ commit }, { id: idToRemove });

    expect(commit).toHaveBeenCalledWith("removeProduct", idToRemove);
    expect(mockToast.success).toHaveBeenCalledWith(
      " Product removed successfully"
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });
});
