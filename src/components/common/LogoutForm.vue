<template>
    <div>
      
    </div>
  </template>
  
  <script>
  import { firebaseSignOut } from "../../assets/firebase/auth";

  export default {
created() {
  firebaseSignOut()
  },
    
  }
  </script>
  