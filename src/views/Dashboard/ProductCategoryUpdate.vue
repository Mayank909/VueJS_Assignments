<template>
  <v-card>
    <Banner :titleName="pageAction" />
    <v-card-text>
      <v-container color="primary">
        <v-row no-gutters justify="end">
          <v-col cols="12">
            <v-alert type="success" v-model="alert">
              {{ pageAction.split(" ").join("ed ") }} Sussessfully.
            </v-alert>
            <v-alert type="warning" v-model="warnAlert">
              Image is Required!
            </v-alert>
            <div>
              <v-col class="text-right">
                <v-btn
                  :loading="loading[1]"
                  :disabled="loading[1]"
                  class="ma-2"
                  color="primary"
                  @click="load(1)"
                >
                  {{ pageAction }}
                </v-btn>
                <v-btn class="ma-2" color="primary" @click="clearFields">
                  Cancel
                </v-btn>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mt-2 mb-3">Image Upload</h3>
            <ImageOperation @selectedImage="getImage" />
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mt-3">
              <form action="" method="post">
                <v-row class="pa-2">
                  <v-col cols="12" md="12">
                    <v-text-field
                      label="Catagory name"
                      :rules="rules"
                      hide-details="auto"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model="categoryName"
                      :error="v$.categoryName.$error"
                    ></v-text-field>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.categoryName.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-combobox
                      class="ma-2 mt-4"
                      v-model="selectedTags"
                      :items="items"
                      label="Tags"
                      color="primary"
                      :error="v$.selectedTags.$error"
                      multiple
                      chips
                    ></v-combobox>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      :class="error.$color"
                      v-for="error of v$.selectedTags.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="isActive"
                      class="ma-2"
                      color="primary"
                      inset
                      true-value="Active"
                      false-value="Inactive"
                      :label="isActive"
                    ></v-switch>
                  </v-col>
                </v-row>
              </form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Banner from "@/components/Banner.vue";
import ImageOperation from "@/components/ImageOperation.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  name: "productCategoryUpdate",
  components: {
    Banner,
    ImageOperation,
  },
  data() {
    return {
      v$: useVuelidate(),
      docId: "",
      categoryName: "",
      selectedTags: [],
      alert: false,
      warnAlert: false,
      isActive: false,
      imageUrl: "",
      loading: [],
      pageAction: this.categoryCheck(),
      selectedTags: [],
      items: [
        "burger",
        "chicken",
        "dishes",
        "italian",
        "menu",
        "pizza",
        "seafood",
      ],
      rules: [
        (value) => !!value || "",
        (value) => (value && value.length >= 3) || "Minimun 3 characters",
        (value) => (value && value.length <= 128) || "Maximum 128 characters",
      ],
      isActive: "Inactive",
    };
  },
  validations() {
    return {
      categoryName: {
        required: helpers.withMessage("Category Name is Required!", required),
        $autoDirty: true,
      },
      selectedTags: {
        required: helpers.withMessage("Category Tag is Required!", required),
        $autoDirty: true,
      },
      imageUrl: {
        required,
        $autoDirty: true,
      },
    };
  },
  methods: {
    load(i) {
      this.loading[i] = true;
      this.submitForm();
      setTimeout(() => (this.loading[i] = false), 3000);
    },
    async submitForm() {
      this.v$.$touch();
      if (this.imageUrl === "") {
        this.warnAlert = true;
        setTimeout(() => (this.warnAlert = false), 3000);
      }
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!this.v$.$error) {
        this.alert = true;
        setTimeout(() => (this.alert = false), 3000);
        // actually submit form
        this.writeCategoryData();
      }
    },
    clearFields() {
      this.categoryName = "";
      this.selectedTags = [];
      this.isActive = false;
      this.isSubmit = true;
    },
    categoryCheck() {
      return Number(this.$route.params.id) ? "Edit Category" : "Add Category";
    },
    getImage(imageName) {
      this.imageUrl = `/images/${imageName}`;
    },
    getRandomId() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    //Database Operations
    writeCategoryData() {
      this.docId = "cat" + this.getRandomId().trim();
      const category = {
        active: Boolean(this.isActive),
        image: this.imageUrl,
        name: this.categoryName,
        tags: this.selectedTags,
      };
      const docRef = doc(db, "categories", this.docId);
      setDoc(docRef, category)
        .then(() => {
          console.log("added data successfully. " + this.docId);
          this.emitter.emit("formSubmit");
        })
        .catch((err) => {
          console.log(err);
        });
      this.clearFields();
    },
  },
};
</script>

<style></style>
