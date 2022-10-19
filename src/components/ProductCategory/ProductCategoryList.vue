<template>
  <div>
    <v-card class="ml-5 mt-5 mr-5">
      <v-card-title>
        <v-spacer></v-spacer>

        <div color="surface" class="d-flex justify-space-around mt-4 mb-4">
          <Search
            @searchQuery="
              (value) => {
                this.search = value;
              }
            "
          />
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="editItem()">
            New Category
          </v-btn>
        </div>
      </v-card-title>
      <v-table style="background-color: #090c0f" :search="search" class="mb-10">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" :class="header">
              <div
                class="text-capitalize"
                @click="sortByColumn(header)"
                v-text="header.text"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filterCategories" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-avatar v-if="item.downloadImage">
                <v-img width="300" :src="item.downloadImage" alt="your image">
                </v-img>
              </v-avatar>
            </td>
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
            <td>{{ item.isActive ? "YES" : "NO" }}</td>
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
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Image", value: "image", sortable: false },
        { text: "Tags", value: "Tags", sortable: false },
        { text: "Active", value: "active" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      categories: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        image: "",
        isActive: false,
        tags: [],
        descriptions: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        image: "",
        isActive: false,
        tags: [],
        descriptions: "",
      },
      loading: false,
      loaded: false,
      dialogDelete: false,
    };
  },
  computed: {
    filterCategories() {
      let result = this.categories.filter((element) =>
        element.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
      await serviceApi.getAll("categories").then((res) => {
        res = JSON.parse(JSON.stringify(res));
        let result = res.map((data) => {
          return {
            id: data.id,
            name: data.document.name,
            image: data.document.image,
            isActive: data.document.active,
            tags: data.document.tags,
          };
        });
        this.categories = result;
      });
      this.download();
    },
    sortByColumn(column) {
      switch (column.value) {
        case "name":
          this.categories.sort( (first, second) => (first.name.toLowerCase() < second.name.toLowerCase()) ? -1 : 1 );
            // -1 for not require to sort 
            // 1 for require a sort 
          break;
        case "active":
          this.categories.sort((element) => (element.isActive ? -1 : 1));
          // -1 for not require to sort 
          // 1 for require a sort 
          break;
        default:
          break;
      }
    },

    editItem(item = { id: 0 }) {
      let id = item.id;
      this.$router.push({ name: "product_category_update", params: { id } });
    },
    deleteItem(item) {
      this.editedItem = this.categories.find(
        (element) => element.id === item.id
      );
      this.dialogDelete = true;
      this.deleteComponent = "DeleteDialog";
    },

    async deleteItemConfirm() {
      this.categories.splice(this.categories.indexOf(this.editedItem), 1);
      this.closeDelete();
      const serviceApi = new Services();
      await serviceApi.delete("categories", this.editedItem.id);
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
      for (const element of this.categories) {
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
