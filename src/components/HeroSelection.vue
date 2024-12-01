<template>
    <div class="popup">
      <div id="alert" class="alert" v-show="showAlert">請選擇職業並輸入名稱！</div>
      <div class="button-group">
        <button 
          v-for="job in jobs" 
          :key="job" 
          :class="['job-button', { selected: selectedJob === job }]" 
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
  
  <script setup>
  import { ref } from 'vue';
  
  const jobs = ['戰士', '遊俠', '牧師'];
  const selectedJob = ref(null);
  const heroName = ref('');
  const showAlert = ref(false);
  
  const selectJob = (job) => {
    selectedJob.value = selectedJob.value === job ? null : job;
  };
  
  const confirmSelection = () => {
    const isValidName = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(heroName.value.trim());
    if (!selectedJob.value || !heroName.value.trim() || !isValidName) {
      showAlert.value = true;
      setTimeout(() => (showAlert.value = false), 1000);
    } else {
      alert(`職業: ${selectedJob.value}\n名稱: ${heroName.value}`);
      // 這裡可以跳轉到第二步畫面
    }
  };
  </script>
  
  <style scoped>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        .popup {
            background-color: #d3c5ad;
            border-radius: 10px;
            padding: 20px;
            width: 80%;
            max-width: 400px;
            text-align: center;
            position: relative;
        }
        .button-group {
            margin: 20px 0;
        }
        .job-button {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            font-size: 20px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            background-color: white;
            color: black;
            transition: background-color 0.3s, color 0.3s;
        }
        .job-button.selected {
            background-color: green;
            color: white;
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
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: red;
            color: white;
            padding: 10px;
            border-radius: 5px;
            display: none;
            animation: fadeOut 1s forwards;
        }
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; display: none; }
        }
    </style>
  