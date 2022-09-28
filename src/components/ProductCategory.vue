<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="ml-15 mr-15 mt-8"
            :loading="loading"
            density="compact"
            variant="outlined"
            label="Search Products..."
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-sheet color="#0E1317"
  elevation="2"
  height="300"
  cols="12"
  rounded="rounded"
  class="border ml-15 mr-15 mt-10 pl-8 pr-10 pt-10 pb-10" >
    <h1 class="pl-4 " >Product categories</h1>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item> 
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loaded: false,
    };
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>

<style></style>
