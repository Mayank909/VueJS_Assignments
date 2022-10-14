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
            New Category
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
          <tr v-for="item in categories" :key="item.name">
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
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="pl-3 pr-3 pb-3 pt-4">
              <v-card-title class="text-h5 pa-2"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
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
export default {
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
      dialog: false,
      dialogDelete: false,
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
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

    editItem(item = { id: 0 }) {
      // this.editedIndex = this.categories.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
      let id = item.id;
      this.$router.push({ name: "product_category_update", params: { id } });
    },

    deleteItem(item) {
      this.editedItem = this.categories.find(
        (element) => element.id === item.id
      );
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const serviceApi = new Services();
      await serviceApi.delete("categories", this.editedItem.id);
      this.categories.splice(this.editedItem, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.categories[this.editedIndex], this.editedItem);
      } else {
        this.categories.push(this.editedItem);
      }
      this.close();
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
