<template>
  <div>
    <v-card class="ml-5 mt-5 mr-5">
      <v-card-title>
        <v-spacer></v-spacer>

        <div color="surface" class="d-flex justify-space-around mt-4 mb-4">
          <component
            :is="searchComponent"
            :labelName="componentName"
            @searchQuery="
              (value) => {
                this.search = value;
              }
            "
          />

          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="editItem()">
            New Product
          </v-btn>
          <v-combobox
            v-model="selectCategory"
            label="Category Filter"
            hide-details
            dense
            filled
            :items="category"
            class="mb-2 ml-4"
            persistent-hint
            chips
          ></v-combobox>
        </div>
      </v-card-title>
      <v-table style="background-color: #090c0f" class="mb-10">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" >
              <div
                class="text-capitalize"
                @click="sortByColumn(header)"
              >
              {{ header.text }}
              <v-icon dense v-if="header.sortable" >mdi-arrow-up</v-icon>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filterProducts" :key="item.name">
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
        <component
          :is="deleteComponent"
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
import Search from "@/components/Search.vue";
export default {
  components: {
    DeleteDialog: defineAsyncComponent(() => import("../DeleteDialog.vue")),
    Search,
  },
  data() {
    return {
      search: "",
      dialogDelete: false,
      deleteComponent: "",
      searchComponent: "Search",
      componentName: "Product",
      selectCategory: "",
      category: [],
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Image", value: "image", sortable: false },
        { text: "Price", value: "price" },
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
        category: [],
        tags: [],
      },
      loading: false,
      loaded: false,
      dialogDelete: false,
    };
  },
  computed: {
    filterProducts() {
      let result = this.products.filter((element) => {
        if (!this.search == "" && this.selectCategory == "") {
          return element.name.toLowerCase().includes(this.search.toLowerCase());
        } else if (!this.selectCategory == "") {
          return element.category === this.selectCategory;
        } else {
          return element;
        }
      });
      result = result.filter((element) => {
        if (!this.selectCategory == "" && !this.search == "") {
          return element.name.toLowerCase().includes(this.search.toLowerCase());
        } else {
          return element;
        }
      });
      return result;
    },
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
        //For Unique category selection.
        this.products = result;
        this.category = [
          ...new Set(result.map((response) => response.category)),
        ];
        //For sorted category options
        this.category.sort((first, second)=>first.toLowerCase() < second.toLowerCase()? -1 : 1);
      });
      this.download();
    },

    editItem(item = { id: 0 }) {
      let id = item.id;
      this.$router.push({ name: "product_update", params: { id } });
    },
    sortByColumn(column) {
      const serviceApi = new Services();
      this.products =  serviceApi.sortData(column, this.headers , this.products);
    },
    deleteItem(item) {
      this.editedItem = this.products.find((element) => element.id === item.id);
      this.dialogDelete = true;
      this.deleteComponent = "DeleteDialog";
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
