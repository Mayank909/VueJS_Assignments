<template>
  <v-card class="container" width="250" height="190">
    <form action="" method="post" enctype="multipart/form-data">
      <div class="image-area">
        <input
          type="file"
          accept="image/*"
          @change="updateImg"
          id="imgfile"
          name="file"
          @input="$emit('selectedImage', userData.split(`/`)[2])"
        />
        <label for="file">
          <v-card
            @click="imageUploader"
            color="secondary"
            width="250"
            height="190"
          >
            <v-img
              cover
              :aspect-ratio="12 / 9"
              width="400"
              :src="userData"
              id="imgPreview"
              alt="your image"
            >
            </v-img>
          </v-card>
        </label>
        <v-btn
          v-if="!isDisable"
          class="image-remove ma-2"
          x-small
          fab
          @click="deleteImage"
          size="35"
          color="secondary"
        >
          <v-icon dark size="20">mdi-delete</v-icon>
        </v-btn>
      </div>
    </form>
  </v-card>
</template>

<script>
import { ref, uploadBytes, getStorage, deleteObject } from "firebase/storage";
import firebase from "../firebase";
export default {
  data() {
    return {
      isDisable: true,
      userData: require("../assets/default.png"),
      defaultText: "Upload",
    };
  },
  mounted() {
    this.emitter.on("formSubmit", (event) => {
      this.clearImage();
    });
  },
  unmounted() {
    this.emitter.off("formSubmit");
  },
  methods: {
    msgUpdate() {
      //For Uploding the image to the servers
      const [imageUpload] = imgfile.files;
      const storage = getStorage();
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload)
        .then((response) => {
          //  $emit( 'selectedImage', response);
          console.log(response.metadata.fullPath);
        })
        .catch((err) => {
          // $emit('selectedImage', response)
        });
    },
    //For deletion on selected image
    deleteImage() {
      const [imageUpload] = imgfile.files;
      const storage = getStorage();
      // Create a reference to the file to delete
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      // Delete the file
      deleteObject(imageRef)
        .then(() => {
          alert("Image is Deleted Successfully.");
          this.clearImage();
        })
        .catch((error) => {
          console.log(error);
        });
    },
     //For Download the image file
    download() {
      // Create a reference to the file we want to download
      const storage = getStorage();
      const [imageUpload] = imgfile.files;
      const imgRef = ref(storage, `images/${imageUpload.name}`);
      // Get the download URL
      getDownloadURL(imgRef)
        .then((url) => {
          // Insert url into an <img> tag to "download
          // Or inserted into an <img> element
          console.log(url);
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              alert("File doesn't exist");
              break;
            case "storage/unauthorized":
              alert("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              alert("User canceled the upload");
              break;
            case "storage/unknown":
              alert("Unknown error occurred, inspect the server response");
              break;
          }
        });
    },
    clearImage() {
      this.userData = require("../assets/default.png");
      this.isDisable = true;
    },
    //For previewing the image file
    updateImg() {
      const [file] = imgfile.files;
      if (file) {
        this.userData = URL.createObjectURL(file);
        console.log(this.userData);
        this.isDisable = false;
        this.msgUpdate();
      }
    },
    imageUploader() {
      imgfile.click();
    },
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
.image-area {
  width: 30%;
}
.image-remove {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  border-radius: 20px;
}
</style>
