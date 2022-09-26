<template>
  <v-row>
    <v-rating
      v-model="rating"
      background-color="dark"
      color="yellow accent-4"
      dense
      half-increments
      readonly
      hover
      size="18"
    ></v-rating>
    <h6 style="margin-top: 5px">({{ rating }})</h6>
    <div>
      <a
        v-if="rating > 0"
        style="margin-left: 30px; margin-top: 5px; text-decoration: underline"
        @click="$emit('showReviews')"
      >
        see all
      </a>
    </div>
  </v-row>
</template>
<script>
import { whereDoc } from "../../assets/firebase/firebase";

export default {
  data: () => ({
    rating: 5,
  }),
  props: ["item"],
  methods: {
    async getBusReviews(bus_id) {
      await whereDoc(
        "bus review",
        "bus_id",
        "==",
        bus_id,
        (review) => {
          let rate = 0;
          let count = 0;
          review.forEach((doc) => {
            rate += doc.rate;
            count++;
          });
          this.rating = rate / count;
          if (!this.rating) {
            this.rating = 0;
          }
        },
        (e) => {
          console.log(e);
        }
      );
    },
  },
  async mounted() {
    await this.getBusReviews(this.item.id);
  },
};
</script>
