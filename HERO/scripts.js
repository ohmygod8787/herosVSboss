$(document).ready(function () {
    let selectedJob = null; // 儲存選擇的職業
    let currentHp = 10; // 初始化當前 HP
    const baseMaxHp = 10;   // 基礎最大 HP
    let currentMaxHp = baseMaxHp; // 當前最大 HP

    let currentMana = 4; // 初始化當前魔力值
    const maxMana = 4;   // 最大魔力值
    const minMana = 0;   // 最小魔力值

    let tempHpAdd = 4; // 預設 HP ADD 數值為 4
    let currentHpAdd = tempHpAdd; // 紀錄目前的 HP ADD 值
    let currentLevel = 1; // 初始化等級
    let tempLevel = currentLevel; // 用於暫存等級調整

    // 更新 HP 顯示的函數
    function updateHpDisplay() {
        $(".current-hp").text(currentHp);
        $(".max-hp").text("/ " + currentMaxHp);
    }

    // 更新等級顯示在主內容
    function updateMainLevelDisplay() {
        $(".level").text("LV " + currentLevel);
    }

    // 更新魔力顯示的函數
    function updateManaDisplay() {
        $(".current-mana").text(currentMana);
        if (currentMana === maxMana) {
            $(".mana-add-button").css("opacity", ".3");
        } else {
            $(".mana-add-button").css("opacity", "1");
        }

        if (currentMana === minMana) {
            $(".mana-SUB-button").css("opacity", ".3");
        } else {
            $(".mana-SUB-button").css("opacity", "1");
        }
    }

    // 更新 HP ADD 顯示
    function updateHpAddDisplay() {
        $(".adjust-hp-display").text(tempHpAdd);
    }

    // 更新等級顯示
    function updateLevelDisplay() {
        $(".adjust-level-display").text(tempLevel);
    }

    // 顯示遮罩和指定的彈窗
    function showPopup(popupSelector) {
        $(".overlay").fadeIn(); // 顯示遮罩
        $(popupSelector).fadeIn(); // 顯示指定的彈窗
    }

    // 隱藏遮罩和彈窗
    function hidePopup() {
        $(".overlay").fadeOut(); // 隱藏遮罩
        $(".menu-popup").fadeOut(); // 隱藏所有彈窗
    }

    // 隱藏遮罩和確定彈窗
    function hidePopup2() {
        $(".overlay").fadeOut(); // 隱藏遮罩
        $(".menu-popup2").fadeOut(); // 隱藏所有彈窗
    }

    // 初始化主內容頁面的狀態
    function initializeMainContent() {
        if (selectedJob === "戰士") {
            $(".shield").trigger("click"); // 自動點擊一次盾牌
        }
    }

    // 職業按鈕點擊事件
    $(".job-button").click(function () {
        $(".job-button").removeClass("selected-warrior selected-rogue selected-priest");
        const job = $(this).data("job");
        if (job === "戰士") {
            $(this).addClass("selected-warrior");
            $("body").css("background-color", "black");
        } else if (job === "遊俠") {
            $(this).addClass("selected-rogue");
            $("body").css("background-color", "#008000");
        } else if (job === "牧師") {
            $(this).addClass("selected-priest");
            $("body").css("background-color", "#acabab");
        }
        selectedJob = job;
    });

    // OK 按鈕點擊事件
    $(".ok-button").click(function () {
        const heroName = $("#heroName").val().trim();
        if (!selectedJob || heroName === "") {
            $("#alert").fadeIn().delay(2000).fadeOut();
            return;
        }

        $(".popup").hide();
        $(".main-content").show();

        const heroInfo = `${selectedJob} - ${heroName}`;
        $("#hero-info").text(heroInfo);

        initializeMainContent(); // 初始化主內容狀態
    });

    // 增加 HP 按鈕點擊事件
    $('.hp-add-button').on('click', function () {
        const increment = parseInt($(this).text().replace('+', ''), 10);
        currentHp = Math.min(currentHp + increment, currentMaxHp);
        updateHpDisplay();
    });

    // 減少 HP 按鈕點擊事件
    $(".hp-SUB-button").click(function () {
        const currentHpElement = $(".current-hp");
        if (currentHpElement.hasClass("yellow-style")) {
            currentHpElement.removeClass("yellow-style");
        } else {
            const decrement = parseInt($(this).text(), 10);
            currentHp = Math.max(currentHp + decrement, 0);
            updateHpDisplay();
        }
    });

    // 盾牌按鈕點擊事件
    $(".shield").click(function () {
        const currentHpElement = $(".current-hp");
        if (currentHp === 0) {
            return;
        }
        currentHpElement.toggleClass("yellow-style");
    });

    // 點擊增加魔力的按鈕事件（Add 1 Mana）
    $(".add-mana").click(function () {
        if (currentMana < maxMana) {
            currentMana += 1;
            updateManaDisplay();
        }
    });

    // 點擊增加魔力的按鈕事件（> 按鈕）
    $(".mana-add-button").click(function () {
        if (currentMana < maxMana) {
            currentMana += 1;
            updateManaDisplay();
        }
    });

    // 點擊減少魔力的按鈕事件（< 按鈕）
    $(".mana-SUB-button").click(function () {
        if (currentMana > minMana) {
            currentMana -= 1;
            updateManaDisplay();
        }
    });

    // 點擊設定按鈕，打開 MENU 彈窗
    $(".settings").click(function () {
        showPopup(".menu-popup");
    });

    // 點擊 MENU 的「更換職業/姓名」
    $(".menu-change-job").click(function () {
        hidePopup();
        showPopup(".confirm-popup"); // 顯示確認彈窗
    });

    // 點擊確認彈窗的「確定」按鈕
    $(".confirm-yes").click(function () {
    location.reload(); // 確定後重整網頁
    });

    // 點擊確認彈窗的「取消」按鈕
    $(".confirm-no").click(function () {
        hidePopup2(); // 關閉確認彈窗
    });

    // 點擊 MENU 的「取消」
    $(".menu-cancel").click(function () {
        hidePopup(); // 關閉 Menu 彈窗
    });

    // 點擊「被動技能」按鈕事件
    $(".menu-passive-skill").click(function () {
        hidePopup();
        let skillDescription = "";
        let skillTitle = "";
    
        switch (selectedJob) {
            case "戰士":
                skillTitle = "戰士被動";
                skillDescription = `
                    戰鬥開始時獲得護盾。當你使勇者獲得護盾時，若目標已有護盾；則使舊的護盾造成盾爆。
                    <br><span class="annotation-text">*注:盾爆會造成BOSS 3點傷害，盾爆後舊護盾消失。</span>`;
                break;
            case "遊俠":
                skillTitle = "遊俠被動";
                skillDescription = `
                    若你的回合內裝備的道具效果或打出的牌有使你移動至另一環，則在你的回合結束時；環內所有勇者魔力恢復1點。`;
                break;
            case "牧師":
                skillTitle = "牧師被動";
                skillDescription = `
                    當你的勇者牌庫抽完時，可以決定是否結束或轉換成聖焰型態。
                    <br><span class="annotation-text">*注1:聖焰型態下對所有角色的恢復生命都會轉化成對BOSS的傷害，回合結算時你的總傷害最高上限為15點。</span>
                    <br><span class="annotation-text">*注2:聖焰型態下死亡時，立即結束聖焰型態。</span>`;
                break;
            default:
                skillTitle = "未知被動";
                skillDescription = "請先選擇職業。";
        }
    
        $(".passive-skill-popup h2").text(skillTitle); // 更新彈窗標題文字
        $(".passive-skill-popup .skill-description").html(skillDescription); // 更新技能描述
        $(".passive-skill-popup").fadeIn();
        $(".overlay").fadeIn(); // 顯示遮罩
    });
    
    // 點擊關閉按鈕事件
    $(".close-passive-skill").click(function () {
        $(".passive-skill-popup").fadeOut();
        $(".overlay").fadeOut(); // 隱藏遮罩
    });

    // 點擊「調整等級」按鈕
    $(".menu-adjust-level").click(function () {
        tempLevel = currentLevel; // 恢復原本等級
        tempHpAdd = currentHpAdd; // 恢復原本 HP ADD 值
        hidePopup();
        $(".black-overlay").fadeIn();
        $(".adjust-level-popup").fadeIn();
        updateLevelDisplay();
        updateHpAddDisplay();
    });

    // 增加等級
    $(".adjust-increase-level").click(function () {
        if (tempLevel < 5) {
            tempLevel++;
            updateLevelDisplay();
        }
    });

    // 減少等級
    $(".adjust-decrease-level").click(function () {
        if (tempLevel > 1) {
            tempLevel--;
            updateLevelDisplay();
        }
    });

    // 增加 HP ADD
    $(".adjust-increase-hp").click(function () {
        if (tempHpAdd < 10) { // 限制最大值為 10
            tempHpAdd++;
            updateHpAddDisplay();
        }
    });

    // 減少 HP ADD
    $(".adjust-decrease-hp").click(function () {
        if (tempHpAdd > 0) { // 限制最小值為 0
            tempHpAdd--;
            updateHpAddDisplay();
        }
    });

    // 確定按鈕計算新最大 HP 並更新主內容
    $(".adjust-confirm").click(function () {
        const currentHpElement = $(".current-hp");

        if (tempLevel === currentLevel && tempHpAdd === currentHpAdd) {
            // 如果等級和 HP ADD 沒有改變
            if (selectedJob !== "戰士" && currentHpElement.hasClass("yellow-style")) {
                currentHpElement.removeClass("yellow-style"); // 移除黃色效果
            }
            $(".adjust-level-popup").fadeOut(); // 關閉彈窗
            $(".black-overlay").fadeOut(); // 關閉黑色遮罩
            return;
        }

        currentLevel = tempLevel; // 更新實際等級
        currentHpAdd = tempHpAdd; // 確認新的 HP ADD 值
        currentMaxHp = baseMaxHp + ((currentLevel - 1) * currentHpAdd); // 計算新的最大 HP
        currentHp = currentMaxHp; // 將當前 HP 更新為最大 HP
        currentMana = maxMana; // 魔力回滿
        if (selectedJob === "戰士") {
            currentHpElement.addClass("yellow-style"); // 為戰士增加黃色效果
        } else {
            currentHpElement.removeClass("yellow-style"); // 移除黃色效果
        }
        updateHpDisplay(); // 更新主內容顯示
        updateManaDisplay(); // 更新魔力顯示
        updateMainLevelDisplay(); // 更新主內容的等級顯示
        $(".adjust-level-popup").fadeOut(); // 關閉彈窗
        $(".black-overlay").fadeOut(); // 關閉黑色遮罩
    });

    // 取消按鈕
    $(".adjust-cancel").click(function () {
        tempLevel = currentLevel; // 恢復原本等級
        tempHpAdd = currentHpAdd; // 恢復原本 HP ADD 值
        $(".adjust-level-popup").fadeOut(); // 關閉彈窗
        $(".black-overlay").fadeOut(); // 關閉黑色遮罩
    });

    // 點擊黑色遮罩
    $(".black-overlay").click(function () {
        tempLevel = currentLevel; // 恢復原本等級
        tempHpAdd = currentHpAdd; // 恢復原本 HP ADD 值
        $(".adjust-level-popup").fadeOut();
        $(this).fadeOut(); // 關閉黑色遮罩
    });

    // 點擊遮罩時，隱藏所有彈窗
    $(".overlay").click(function () {
        hidePopup();
        hidePopup2();
    });

    // 初始化
    $(".main-content").hide();
    $(".menu-popup, .confirm-popup").hide();
    updateHpDisplay();
    updateManaDisplay();
    updateHpAddDisplay();
    updateMainLevelDisplay();
});
