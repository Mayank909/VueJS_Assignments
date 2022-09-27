<template>
  <v-app id="inspire">
    <v-navigation-drawer
      permanent
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 pa-md-2">
            <v-img
              :aspect-ratio="20 / 4"
              :width="width"
              src="../../assets/applogo.png"
            ></v-img>
          </v-list-item-title>
          <v-list-item-subtitle class="text-center pa-md-1 text-h6">
            Restaurant
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        >
        </v-list-item>
      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><v-img
          :aspect-ratio="20 / 3"
          :width="width"
          src="../../assets/applogo.png"
        ></v-img
      ></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "HOME", icon: "mdi-view-dashboard", to: "/" },
      { title: "ABOUT", icon: "mdi-help-box", to: "/about" },
      { title: "MENU", icon: "mdi-silverware", to: "/menu" },
      { title: "PRODUCT", icon: "mdi-food", to: "/product" },
    ],
    width: 300,
  }),
};
</script>
