<template>
  <v-card>
    <Banner :titleName="pageAction" />
    <v-card-text>
      <v-container class="d-flex flex-wrap justify-space-between">
        <ImageOperation />
        <v-card class="mt-3">
          <form action="" method="post">
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
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Catagory name"
                  :rules="rules"
                  hide-details="auto"
                  class="ma-2 mt-4"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="select"
                  :items="items"
                  label="Tags"
                  multiple
                  chips
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="switch1"
                  inset
                  :label="`Switch 1: ${switch1.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
          </form>
        </v-card>
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
      select: ["Vue"],
      items: ["Programming", "Design", "Vue", "Vuetify"],
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      switch1: true,
      switch2: false,
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
