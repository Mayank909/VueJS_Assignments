<template>
  <div>
    <v-card class="ml-5 mt-5 mr-5">
      <v-card-title>
        <v-spacer></v-spacer>

        <div color="surface" class="d-flex justify-space-around mt-4 mb-4">
          <v-text-field
            v-model="search"
            append-inner-icon="mdi-magnify"
            density="compact"
            variant="outlined"
            label="Search Category"
            single-line
            hide-details
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="editItem()">
            New Product
          </v-btn>
        </div>
      </v-card-title>
      <v-table style="background-color: #090c0f" class="mb-10">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" :class="header">
              <div class="text-capitalize" v-text="header.text" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-avatar v-if="item.downloadImage">
                <v-img width="300" :src="item.downloadImage" alt="your image">
                </v-img>
              </v-avatar>
            </td>
            <td>{{ "₹" + item.price }}</td>
            <td>{{ "₹" + item.discount_price }}</td>
            <td>{{ item.availability ? "YES" : "NO" }}</td>
            <td>{{ item.category }}</td>
            <td>
              <v-chip
                v-for="tag in item.tags"
                :key="tag"
                color="primary"
                class="ma-2"
              >
                {{ tag }}
              </v-chip>
            </td>
            <td>
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
        <DeleteDialog
          v-if="dialogDelete"
          @delete="deleteItemConfirm"
          @closeDialog="closeDelete"
        />
      </v-table>
    </v-card>
  </div>
</template>

<script>
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import firebase from "@/firebase";
import Services from "@/helpers/api";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    DeleteDialog: defineAsyncComponent(() => import("../DeleteDialog.vue")),
  },
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Image", value: "image" },
        { text: "Price", value: "price", sortable: false },
        { text: "Discount_price", value: "discount_price" },
        { text: "Availability", value: "availability", sortable: false },
        { text: "Category", value: "category", sortable: false },
        { text: "Tags", value: "tags", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      products: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        image: "",
        price: 0,
        discount_price: 0,
        detail: "",
        description: "",
        availability: false,
        category: "",
        tags: [],
      },
      defaultItem: {
        id: 0,
        name: "",
        image: "",
        price: 0,
        discount_price: 0,
        detail: "",
        description: "",
        availability: false,
        category: "",
        tags: [],
      },
      loading: false,
      loaded: false,
      dialog: false,
      dialogDelete: false,
    };
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const serviceApi = new Services();
      await serviceApi.getAll("products").then((res) => {
        res = JSON.parse(JSON.stringify(res));
        let result = res.map((data) => {
          return {
            id: data.id,
            name: data.document.name,
            image: data.document.image,
            price: data.document.price,
            discount_price: data.document.discount_price,
            detail: data.document.detail,
            description: data.document.description,
            availability: data.document.availability,
            category: data.document.category,
            tags: data.document.tags,
          };
        });
        this.products = result;
      });
      this.download();
    },

    editItem(item = { id: 0 }) {
      let id = item.id;
      this.$router.push({ name: "product_update", params: { id } });
    },

    deleteItem(item) {
      this.editedItem = this.products.find((element) => element.id === item.id);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.products.splice(this.products.indexOf(this.editedItem), 1);
      this.closeDelete();
      const serviceApi = new Services();
      await serviceApi.delete("products", this.editedItem.id);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    download() {
      // Create a reference to the file we want to download
      const storage = getStorage();
      for (const element of this.products) {
        let file = element.image.split("/");
        const imgRef = ref(storage, `images/${file[1]}`);
        // Get the download URL

        getDownloadURL(imgRef)
          .then((url) => {
            // Insert url into an <img> tag to "download
            // Or inserted into an <img> element
            element["downloadImage"] = url;
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/object-not-found":
                alert("File doesn't exist");
                break;
              case "storage/unauthorized":
                alert("User doesn't have permission to access the object");
                break;
              case "storage/canceled":
                alert("User canceled the upload");
                break;
              case "storage/unknown":
                alert("Unknown error occurred, inspect the server response");
                break;
            }
          });
      }
    },
  },
};
</script>

<style></style>
