<template>
  <v-card>
    <Banner />
    <v-card-text>
      <v-container>
       <form action="" method="post">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Catagory name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Active"
            ></v-text-field>
          </v-col>
        </v-row>
        <image-operation />
        <v-btn
      :loading="loading[1]"
      :disabled="loading[1]"
      class="ma-2"
      color="primary"
      @click="load(1)"
    >
      {{ action? "Edit Category" : "Add Category" }}
    </v-btn>
    <v-btn class="ma-2"
      color="primary"
    >
      Cancel
    </v-btn>
    </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Banner from "@/components/Banner.vue"
import ImageOperation from '@/components/ImageOperation.vue';
export default {
  name: "productCategoryUpdate",
  components: {
    Banner,
    ImageOperation,
  },
  data () {
      return {
        loading: [],
        action: false,
      }
    },
    methods: {
      load (i) {
        this.loading[i] = true
        setTimeout(() => (this.loading[i] = false), 3000)
      },
    },
};
</script>

<style></style>
