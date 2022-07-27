<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="text-h5"> Bus Reviews </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { whereDoc } from "../../assets/firebase/firebase";

export default {
  data: () => ({
    dialog: false,
    rating: 4.3,
  }),
  methods: {
    openModel(id) {
      this.getReviews(id);
      this.dialog = true;
    },
    closeModel() {
      this.dialog = false;
    },
    async getReviews(id) {
      await whereDoc(
        "bus review",
        "bus_id",
        "==",
        id,
        (review) => {
          let data = [];
          review.forEach((doc) => {
            data.push({ id: doc.id, rating: doc.rate, comment: doc.comment });
          });
          console.log(data);
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
};
</script>
