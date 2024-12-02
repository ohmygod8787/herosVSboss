<template>
  <div class="popup">
    <div id="alert" class="alert" v-show="showAlert">請選擇職業並輸入名稱！</div>
    <div class="popupTitle">勇者大人&nbsp;&nbsp;請選擇你的職業</div>
    <div class="button-group">
      <button
        v-for="job in jobs"
        :key="job"
        :class="['job-button', { 'selected-warrior': job === '戰士' && selectedJob === job, 'selected-rogue': job === '遊俠' && selectedJob === job, 'selected-priest': job === '牧師' && selectedJob === job }]"
        @click="selectJob(job)"
      >
        {{ job }}
      </button>
    </div>
    <div class="input-group">
      <input
        id="heroName"
        type="text"
        maxlength="9"
        placeholder="請輸入您的勇者名稱"
        v-model="heroName"
      />
    </div>
    <button class="ok-button" @click="confirmSelection">OK</button>
  </div>
</template>

<script>
export default {
  name: "HeroSelection",
  data() {
    return {
      jobs: ["戰士", "遊俠", "牧師"],
      selectedJob: null,
      heroName: "",
      showAlert: false,
    };
  },
  methods: {
    selectJob(job) {
      this.selectedJob = this.selectedJob === job ? null : job;
      console.log("Selected Job:", this.selectedJob); // 檢查按鈕點擊
    },
    confirmSelection() {
      const isValidName = /^[a-zA-Z0-9一-龥]+$/.test(this.heroName.trim());
      if (!this.selectedJob || !this.heroName.trim() || !isValidName) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1000);
      } else {
        console.log("Emitting job and name:", this.selectedJob, this.heroName); // 檢查事件輸出
        this.$emit("hero-selected", { job: this.selectedJob });
      }
    },
  },
};
</script>

<style scoped>
.popup {
  background-color: #d3cfd8;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button-group {
  margin: 20px 0;
}
.job-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 1.4rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}
.job-button.selected-warrior {
  background-color: black;
  color: white;
}
.job-button.selected-rogue {
  background-color: #008000;
  color: white;
}
.job-button.selected-priest {
  background-color: papayawhip;
  color: black;
}
.input-group {
  margin: 20px 0;
}
.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.ok-button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.alert {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  width: 13rem;
}
.popupTitle {
  color: #000;
  font-size: 1.1rem;
}
</style>
