<template>
  <div>
    <v-card class="ml-5 mt-5 mr-5">
      <v-card-title>
        Product Categories
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
          <v-btn color="primary" dark class="mb-2" @click="editItem(item)">
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
            <td>{{ item.isActive ? "YES" : "NO" }}</td>
            <td>
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
        <template v-slot:top>
          <v-toolbar color="secondary" flat>
            <v-toolbar-title>Product Categories</v-toolbar-title>

            <v-dialog v-model="dialog" max-width="500px">
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
              <v-card class="pl-3 pr-3 pb-3 pt-4 ">
                <v-card-title class="text-h5 pa-2"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-table>
    </v-card>
  </div>
</template>

<script>
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
      },
      defaultItem: {
        id: 0,
        name: "",
        image: "",
        isActive: false,
      },
      loading: false,
      loaded: false,
      dialog: false,
      dialogDelete: false,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    initialize() {
      this.categories = [
        {
          id: 1,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 2,
          name: "Drinks",
          image: "#",
          isActive: true,
        },
        {
          id: 3,
          name: "Main Dishes",
          image: "#",
          isActive: true,
        },
        {
          id: 4,
          name: "seafood",
          image: "#",
          isActive: true,
        },
        {
          id: 5,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 6,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 7,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 8,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 9,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
        {
          id: 10,
          name: "Pizza",
          image: "#",
          isActive: true,
        },
      ];
    },

    editItem(item) {
      // this.editedIndex = this.categories.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialog = true;
      this.$router.push('/productCategoryUpdate');
    },

    deleteItem(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.categories.splice(this.editedIndex, 1);
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
