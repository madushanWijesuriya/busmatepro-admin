<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <template>
          <v-card-title class="text-h5"> Passangers Reviews </v-card-title>

          <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :icon="item.icon"
              fill-dot
            >
              <v-card>
                <v-card-title class="text-h6">
                  <v-rating
                    v-model="item.rating"
                    background-color="dark"
                    color="yellow accent-4"
                    dense
                    half-increments
                    readonly
                    hover
                    size="18"
                  ></v-rating
                ></v-card-title>
                <v-card-text class="white text--primary">
                  <p>
                    {{ item.comment }}
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </template>
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
    items: [],
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
        "busReview",
        "bus_id",
        "==",
        id,
        (review) => {
          let data = [];
          review.forEach((doc) => {
            this.items.push({
              color: "red lighten-2",
              icon: "mdi-star",
              rating: doc.rate,
              comment: doc.comment,
            });
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
