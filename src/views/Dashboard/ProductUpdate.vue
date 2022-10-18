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
                  Reset
                </v-btn>
              </v-col>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mt-2 mb-3">Image Upload</h3>
            <ImageOperation :pageName="collection" @selectedImage="getImage" />
            <p
              style="color: #b00a20"
              class="mr-2 mt-2 text-caption"
              v-for="error of v$.imageUrl.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mt-3">
              <form action="" method="post">
                <v-row class="pa-2">
                  <v-col cols="12" md="12">
                    <v-text-field
                      label="Product Name"
                      :rules="rules"
                      hide-details="auto"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model="productName"
                      :error="v$.productName.$error"
                    ></v-text-field>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.productName.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Product Price"
                      hide-details="auto"
                      type="number"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model.number="productPrice"
                      :error="v$.productPrice.$error"
                    ></v-text-field>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.productPrice.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Discount Price"
                      hide-details="auto"
                      type="number"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model.number="discountPrice"
                      :error="v$.discountPrice.$error"
                    ></v-text-field>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.discountPrice.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      label="Product Detail"
                      auto-grow
                      :rules="textRule"
                      filled
                      rows="1"
                      hide-details="auto"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model="productDetail"
                      :error="v$.productDetail.$error"
                    ></v-textarea>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.productDetail.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      label="Product Description"
                      auto-grow
                      :rules="textRule"
                      filled
                      rows="1"
                      hide-details="auto"
                      color="primary"
                      class="ma-2 mt-4"
                      v-model="productDescription"
                      :error="v$.productDescription.$error"
                    ></v-textarea>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.productDetail.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-autocomplete
                      label="Select Category"
                      hide-details="auto"
                      :items="catvalues"
                      dense
                      filled
                      color="primary"
                      class="ma-2 mt-4"
                      v-model="category"
                      :error="v$.category.$error"
                    ></v-autocomplete>
                    <p
                      style="color: #b00a20"
                      class="mr-2 ml-2 text-caption"
                      v-for="error of v$.category.$errors"
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
                      hide-details
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
                      :label="isActive ? 'Active' : 'Inactive'"
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
import { required, helpers, url } from "@vuelidate/validators";
import Services from "@/helpers/api";
export default {
  name: "productUpdate",
  components: {
    Banner,
    ImageOperation,
  },
  data() {
    return {
      v$: useVuelidate(),
      docId: "",
      productName: "",
      productPrice: null,
      discountPrice: null,
      productDetail: "",
      productDescription: "",
      collection: "products",
      alert: false,
      isActive: false,
      imageUrl: "",
      loading: [],
      pageAction: this.productCheck(),
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
      category: null,
      catvalues: ["Florida", "drinks", "sweets", "Pizza", "Coffee"],
      rules: [
        (value) => !!value || "",
        (value) => (value && value.length >= 3) || "Minimun 3 characters",
        (value) => (value && value.length <= 128) || "Maximum 128 characters",
      ],
      textRule: [
        (value) => !!value || "",
        (value) => (value && value.length <= 255) || "Maximum 255 characters",
      ],
    };
  },
  validations() {
    return {
      productName: {
        required: helpers.withMessage("Product Name is Required!", required),
        $autoDirty: true,
      },
      selectedTags: {
        required: helpers.withMessage("Product Tag is Required!", required),
        $autoDirty: true,
      },
      productPrice: {
        required: helpers.withMessage("Product Price is Required!", required),
        $autoDirty: true,
      },
      discountPrice: {
        required: helpers.withMessage(
          "Product Discount Price is Required!",
          required
        ),
        $autoDirty: true,
      },
      productDetail: {
        required: helpers.withMessage("Product Detail is Required!", required),
        $autoDirty: true,
      },
      productDescription: {
        required: helpers.withMessage(
          "Product Description is Required!",
          required
        ),
        $autoDirty: true,
      },
      category: {
        required: helpers.withMessage(
          "Product Category is Required!",
          required
        ),
        $autoDirty: true,
      },
      imageUrl: {
        required: helpers.withMessage("Image is Required!", required),
        $autoDirty: true,
      },
    };
  },
  mounted() {
    if (this.pageAction === "Edit Product") {
      this.displayEditedProduct();
    }
  },
  methods: {
    load(i) {
      this.loading[i] = true;
      this.submitForm();
      setTimeout(() => (this.loading[i] = false), 3000);
    },
    async submitForm() {
      this.v$.$touch();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!this.v$.$error) {
        this.alert = true;
        setTimeout(() => (this.alert = false), 3000);
        // actually submit form
        this.pageAction === "Add Product"
          ? this.writeProductData()
          : this.editProduct();
      }
    },
    clearFields() {
      this.productName = "";
      this.selectedTags = [];
      this.isActive = false;
      this.productDescription = "";
      this.productDetail = "";
      this.discountPrice = null;
      this.productPrice = null;
      this.category = [];
      this.emitter.emit("formSubmit");
      this.v$.$reset();
    },
    productCheck() {
      return this.$route.params.id === "0" ? "Add Product" : "Edit Product";
    },
    getImage(imageName) {
      this.imageUrl = imageName;
    },
    getRandomId() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    //Database Operations
    async writeProductData() {
      this.docId = "prod" + this.getRandomId().trim();
      const product = {
        availability: Boolean(this.isActive),
        image: this.imageUrl,
        name: this.productName,
        description: this.productDescription,
        detail: this.productDetail,
        discount_price: this.discountPrice,
        price: this.productPrice,
        category: this.category,
        tags: this.selectedTags,
      };
      const serviceApi = new Services();
      await serviceApi
        .post("products", this.docId, product)
        .then((res) => {
          console.log("added data successfully. " + res);
          this.emitter.emit("formSubmit");
        })
        .catch((err) => {
          console.log(err);
        });
      this.clearFields();
    },
    async displayEditedProduct() {
      let id = this.$route.params.id;
      const serviceApi = new Services();
      await serviceApi.get("products", id).then((res) => {
        res = JSON.parse(JSON.stringify(res));
        this.isActive = Boolean(res.availability);
        this.imageUrl = res.image;
        this.productName = res.name;
        this.productDescription = res.description;
        this.productDetail = res.detail;
        this.discountPrice = res.discount_price;
        this.productPrice = res.price;
        this.category = res.category;
        this.selectedTags = res.tags;
      });
    },
    async editProduct() {
      const product = {
        availability: this.isActive,
        image: this.imageUrl,
        name: this.productName,
        description: this.productDescription,
        detail: this.productDetail,
        discount_price: this.discountPrice,
        price: this.productPrice,
        category: this.category,
        tags: this.selectedTags,
      };
      let id = this.$route.params.id;
      const serviceApi = new Services();
      await serviceApi
        .put("products", id, product)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(error);
        });
      this.$router.push("/product");
    },
  },
};
</script>

<style></style>
