<template>
  <v-card>
    <Banner :titleName="pageAction" />
    <v-card-text>
      <v-container color="primary">
        <v-row no-gutters justify="end">
          <v-col cols="12">
            <v-card outline>
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
                <v-btn class="ma-2" color="primary"> Cancel </v-btn>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mt-2 mb-3">Image Upload</h3>
            <ImageOperation />
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
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-combobox
                      class="ma-2 mt-4"
                      v-model="select"
                      :items="items"
                      label="Tags"
                      color="primary"
                      multiple
                      chips
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="isActive"
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
export default {
  name: "productCategoryUpdate",
  components: {
    Banner,
    ImageOperation,
  },
  data() {
    return {
      loading: [],
      pageAction: this.categoryCheck(),
      select: ["pizza"],
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
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      isActive: "Inactive",
    };
  },
  methods: {
    load(i) {
      this.loading[i] = true;
      setTimeout(() => (this.loading[i] = false), 3000);
    },
    categoryCheck() {
      return Number(this.$route.params.id) ? "Edit Category" : "Add Category";
    },
  },
};
</script>

<style></style>
