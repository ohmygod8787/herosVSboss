<template>
  <div :class="[`app`, `background-${selectedJobColor}`]">
    <HeroSelection v-if="!isHeroSelected" @hero-selected="setHero" />
    <div v-else class="main-content">
      <header>
        <div class="level">LV 1</div>
        <div class="settings">⚙️</div>
      </header>
      <div class="mana-container">
        <div class="mana-button" v-for="(mana, index) in manaButtons" :key="index">+{{ mana }}</div>
        <div class="shield">🛡️</div>
      </div>
      <div class="mana-display">
        <span class="current-mana">10</span>
        <span class="max-mana">/10</span>
      </div>
      <div class="number-buttons">
        <div class="number-button" v-for="(number, index) in numberButtons" :key="index">{{ number }}</div>
      </div>
      <div class="footer">
        <button class="add-mana">Add 1 Mana</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSelection from "./components/HeroSelection.vue";

export default {
  name: "App",
  components: {
    HeroSelection,
  },
  data() {
    return {
      isHeroSelected: false,
      selectedJobColor: "",
      manaButtons: [1, 3, 5],
      numberButtons: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
    };
  },
  methods: {
    setHero({ job }) {
      console.log("Received job:", job); // 檢查收到的職業資料
      this.isHeroSelected = true;
      switch (job) {
        case "戰士":
          this.selectedJobColor = "warrior";
          break;
        case "遊俠":
          this.selectedJobColor = "rogue";
          break;
        case "牧師":
          this.selectedJobColor = "priest";
          break;
        default:
          this.selectedJobColor = "default";
      }
      console.log("isHeroSelected:", this.isHeroSelected); // 確認狀態更新
      console.log("selectedJobColor:", this.selectedJobColor); // 檢查背景顏色
    },
  },
};
</script>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.background-warrior {
  background-color: black;
}
.background-rogue {
  background-color: #008000;
}
.background-priest {
  background-color: papayawhip;
}
.background-default {
  background-color: white;
}
.main-content {
  width: 100%;
  height: 100%;
  color: white;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ccc;
}
.level {
  font-size: 1.5rem;
}
.settings {
  font-size: 1.5rem;
}
.mana-container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.mana-button {
  background-color: red;
  padding: 10px;
  border-radius: 50%;
  color: white;
}
.shield {
  background-color: white;
  padding: 10px;
  border-radius: 50%;
  color: black;
}
.mana-display {
  text-align: center;
  font-size: 3rem;
}
.number-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 20px;
}
.number-button {
  background-color: gray;
  padding: 10px;
  border-radius: 50%;
  text-align: center;
  color: white;
}
.footer {
  text-align: center;
  margin-top: auto;
}
.add-mana {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
}
</style>
