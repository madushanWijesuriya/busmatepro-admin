import axios from "axios";
export default {
  data() {
    return {
      apiURL: "http://localhost:8000/api/",
    };
  },
  computed: {
    user() {
      return this.$store.StateUser;
    },
  },
  methods: {
    async api(object, successCallback, errorCallback) {
      try {
        const apiObject = await {
          baseURL: this.apiURL,
          method: object.method || "GET",
          url: object.url,
          headers: {
            Authorization: `Token ${
              this.user && this.user.token
                ? this.user.token
                : object.data && object.data.token
                ? object.data.token
                : ""
            }`,
            ...(object.headers || {}),
          },
        };
        if (object.data) {
          apiObject.data = await object.data;
        }
        const response = await axios(apiObject);
        successCallback(response);
      } catch (error) {
        console.log(error);
        // if (
        //   error &&
        //   error.response &&
        //   error.response.status &&
        //   error.response.status === 401
        // ) {
        //   this.$store.dispatch("logoutUser");
        //   this.$router.push("/");
        // }
        errorCallback(error);
      }
    },
  },
  created() {
    this.apiURL = "http://localhost:3000/api";
  },
};
