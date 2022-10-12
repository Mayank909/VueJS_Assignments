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
            New Item
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
            <td>{{ item.image }}</td>
            <td>{{ item.tags }}</td>
            <td>{{ item.isActive ? "YES" : "NO" }}</td>
            <td>
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
        <template v-slot:top>
          <v-dialog v-model="dialog" color="secondary" max-width="500px">
            <!-- Running... Code -->
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Catagory name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.image"
                        label="Image"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.active"
                        label="Active"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
  computed: {
    formTitle() {
      return "New Item" 
    },
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
    },

    editItem(item = { id: 0 }) {
      // this.editedIndex = this.categories.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
      let id = item.id;
      this.$router.push({ name: "productCategoryUpdate", params: { id } });
    },

     deleteItem(item) {
      this.editedItem = this.categories.find((element)=> element.id === item.id
    );
      this.dialogDelete = true;
    },

   async deleteItemConfirm() {
      const serviceApi = new Services();
      await serviceApi.delete("collections", this.editedItem.id);
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
  },
};
</script>

<style></style>
