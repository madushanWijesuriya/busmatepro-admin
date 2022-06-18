<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 red lighten-2">
          Are you sure you want to delete?
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="deleteItem(id)"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { deleteDocuments } from "../../assets/firebase/firebase";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: ["id", "docName", "successMsg", "errorMsg", "successDelMsg"],
  methods: {
    async deleteItem(id) {
      this.dialog = false;
      await deleteDocuments(
        this.docName,
        id,
        () => {
          console.log(this.successDelMsg);
          this.$toast.success(this.successDelMsg);
        },
        () => {
          this.$toast.error("some thing went wrong");
        }
      );
      this.$emit("refreshTable");
    },
  },
};
</script>
