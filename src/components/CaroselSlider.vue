<template>
  <v-carousel hide-delimiters cycle class="mt-10">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    >
     <v-row class="d-flex flex-column ml-15 mt-15 flex-wrap fill-height justify-left align-start flex-wrap">
            <p class="text-uppercase">
              <span class="text-brown darken-4 font-weight-black "> ~ </span>
              Welcom to the Kaffen
            </p>
            <div class=" text-h2 font-weight-black text-break" style="max-width: 25rem">
              {{ item.title }}
            </div>
     </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: "CaroselSlider",
    data () {
      return {
        items: [
          {
            src: require("../assets/started_img5.jpg"),
            title: "Premium Meat Kaffen"
          },
          {
            src: require("../assets/started_img6.jpg"),
            title: "Explore The Lobsters"
          },
          {
            src: require("../assets/started_img7.jpg"),
            title: "Reserve Your Table Today"
          },
        ],
      }
    },
  }


</script>

