<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>Oops!</h1>
        <h2>404 - No se pudo encontrar la página</h2>
      </div>
      <v-btn @click="back" color="primary">Ir a la página principal</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      const type = localStorage.getItem("type");
      if (!type) {
        this.$router.push({name: "LoginAdmin"});
        return;
      }
      if (type == "Admin") {
        this.$router.push("/");
        return;
      } else {
        this.$router.push("/products");
        return;
      }
    },
  },
};
</script>

<style scoped>
.paragraph-text {
  font-size: 18px;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
}

.notfound .notfound-404 {
  position: relative;
  height: 200px;
  margin: 0px auto 20px;
  z-index: -1;
}

.notfound .notfound-404 h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 200px;
  font-weight: 200;
  margin: 0px;
  color: #211b19;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound .notfound-404 h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  font-weight: 350;
  text-transform: uppercase;
  color: #211b19;
  background: #f5d8cf;
  padding: 5px 5px;
  margin: auto;
  display: inline-block;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}

.notfound button {
  font-family: "Montserrat", sans-serif;
  display: inline-block;
  font-weight: 700;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  padding: 13px 23px;
  background: #ff6300;
  font-size: 18px;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  color: #ff6300;
  background: #211b19;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 h1 {
    font-size: 148px;
  }
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 {
    height: 148px;
    margin: 0px auto 10px;
  }

  .notfound .notfound-404 h1 {
    font-size: 86px;
  }

  .notfound .notfound-404 h2 {
    font-size: 10px;
  }

  .notfound a {
    padding: 7px 15px;
    font-size: 14px;
  }
}
</style>