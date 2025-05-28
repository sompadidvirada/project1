import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getProduct } from "../api/product";
import { updateBasicUser } from "../api/authen";

const BakeryStore = (set, get) => ({
  user: null,
  token: null,
  categorys: null,
  products: null,
  brach: null,
  data: null,
  dataLine: null,
  dataPie: null,
  dataTrack: null,
  totalData: null,
  queryForm: {
    startDate: "", // New state for queryForm
    endDate: "",
  },

  // Action to update queryForm
  setQueryForm: (key, value) => {
    set((state) => ({
      queryForm: {
        ...state.queryForm,
        [key]: value,
      },
    }));
  },
  setData: (newData) => {
    set({ data: newData }); // <-- Add function to update data
  },
  setDataLine: (newData) => {
    set({ dataLine: newData }); // <-- Add function to update data
  },
  setDataPie: (newData) => {
    set({ dataPie: newData }); // <-- Add function to update data
  },
  setDataTrack: (newData) => {
    set({ dataTrack: newData }); // <-- Add function to update data
  },
  setTotalData: (newData) => {
    set({ totalData: newData }); // <-- Add function to update data
  },
  logout: () => {
    set({
      user: null,
      token: null,
      categorys: null,
      products: null,
      brach: null,
      data: null,
      dataLine: null,
      queryForm: {
        startDate: "", // New state for queryForm
        endDate: "",
      },
    });
  },
  actionLogin: async (form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      form
    );
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    const token = get().token;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getcategorys`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    set({
      categorys: res.data,
    });
  },
  getProducts: async () => {
    const token = get().token;
    const res = await getProduct(token);
    set({
      products: res.data,
    });
  },
  getBrach: async () => {
    const token = get().token;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getbrachs`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // optional, depending on your backend
          },
        }
      );
      set({ brach: res.data });
    } catch (err) {
      console.error("Failed to fetch brachs:", err.message);
    }
  },
  updateUser: async (form) => {
    // Accept form as a parameter
    const token = get().token;
    const user = get().user;

    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      const res = await updateBasicUser(user.id, form, token);
      set({
        user: res.data.payload,
        token: res.data.token, // Update token if needed
      });
      return res;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
});

const usePersist = {
  name: "bakery-store",
  storage: createJSONStorage(() => localStorage),
};

const useBakeryStore = create(persist(BakeryStore, usePersist));

export default useBakeryStore;
