<template>
  <div>
    <template>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dates" range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="print()"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </template>
    <template>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </template>
  </div>
</template>
<script>
import { whereDateBetween } from "../../assets/firebase/firebase";
export default {
  mounted() {
    // this.getBuses();
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  methods: {
    print() {
      this.$refs.menu.save(this.dates);
      this.getBusBetweenDates(this.dates);
    },
    // getBuses() {
    //   getAllDocuments(
    //     "bus",
    //     (buses) => {
    //       this.buses = buses;
    //       console.log(this.buses);
    //     },
    //     (e) => {
    //       console.log(e);
    //     }
    //   );
    // },
    async getBusBetweenDates(dates) {
      let start = new Date(dates[0]);
      start.setHours(0, 0, 0, 0);

      let end = new Date(dates[1]);
      end.setHours(23, 59, 59, 999);

      await whereDateBetween(
        "bus",
        dates[0],
        dates[1],
        (buses) => {
          this.buses = buses;
        },
        (e) => {
          console.log(e);
        }
      );
      this.desserts = [];
      await this.buses.forEach((element) => {
        var date = new Date(element.created_at.toDate());
        var month_name = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(date);
        if (this.desserts.length == 0) {
          this.desserts.push({
            year: date.getFullYear(),
            month: month_name,
            count: 1,
          });
          console.log(1, this.desserts, this.desserts.length);
        } else {
          this.desserts.forEach((element) => {
            if (
              element.year != date.getFullYear() &&
              element.month !=
                new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
            ) {
              this.desserts.push({
                year: date.getFullYear(),
                month: month_name,
                count: 1,
              });
            } else {
              element.count = element.count + 1;
            }
          });
        }
      });
    },
  },
  data() {
    return {
      dates: [],
      buses: null,
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        {
          text: "Year",
          align: "center",
          sortable: false,
          value: "year",
        },
        {
          text: "Month",
          align: "center",
          sortable: false,
          value: "month",
        },
        { text: "Count", align: "center", value: "count" },
      ],

      desserts: [],
    };
  },
};
</script>
