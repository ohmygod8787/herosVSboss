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
                    戰鬥開始時獲得護盾。當你使勇者獲得護盾時，若目標已有護盾則造成盾爆。注
                    <br><span class="annotation-text">*注:盾爆會造成BOSS 3點傷害，盾爆後護盾不會消失。</span>`;
                break;
            case "遊俠":
                skillTitle = "遊俠被動";
                skillDescription = `
                    若你的回合打出具有移動效果的牌，則在你的回合結束時；環內所有勇者魔力恢復1點。`;
                break;
            case "牧師":
                skillTitle = "牧師被動";
                skillDescription = `
                    你的棄牌移動附加功能【型態轉換】，可以決定是否轉換或結束聖焰型態 (被動)注1注2
                    <br><span class="annotation-text">注1:聖焰型態下所有角色禁療。你對他們的恢復生命都會轉化成對BOSS的傷害，結算時你的傷害最高上限為15點。</span>
                    <br><span class="annotation-text">*注2:當你死亡時，則結束聖焰狀態。</span>`;
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

    // 在文件頂部添加新的彈窗內容變量
    const gameRulesPopupContent = `
    <h2>遊戲規則</h2>
    <p class="game-rules">
        <span class="blue-text">【棋子】</span>代表勇者，共有三個分別為黑(戰士)、綠(遊俠)、灰色(牧師)棋子。<br>
        <span class="blue-text">【生命】</span>代表角色生命，生命為零的角色死亡。死亡後該角色無法被恢復生命/魔力、抽牌及出牌。<br>
        <span class="blue-text">【護盾】</span>格擋一次對你造成的傷害，使傷害降為零點；每個角色最多擁有一個護盾。<br>
        <span class="blue-text">【環】</span>分為一環與二環，有些牌需要依照牌上的限制在規定環內才能打出。<br>
        <span class="blue-text">【魔力】</span>代表勇者魔力，若有足夠的魔力在可以你的回合依手牌上標示的魔力消耗打出手牌。<br>
        <span class="blue-text">【移動棄牌】</span>捨棄你打出的牌來移動，無牌可出或想移動時可以打出。將你移動到目前所處位置的另一環，若處於無法移動的勇者仍可以打出，但會停留在原本所處的位置。<br>
        <span class="blue-text">【寶藏牌庫】</span>由零到三費牌組成的牌庫，勇者在獲得勝利時可以抽取寶藏牌庫。<br>
        <span class="blue-text">【初始】</span>每人選擇一個顏色的棋子，獲得對應顏色的勇者牌庫(十三張牌)、10點生命、4點魔力。<br>
        <span class="blue-text">【開場】</span>將你的勇者牌庫洗牌，洗完後抽取五張牌。<br>
        <span class="blue-text">【勇者回合】</span>回合開始時，從你的勇者牌庫抽取一張牌並恢復一點魔力。若暈眩或施法狀態下無法抽牌僅能獲取魔力；若勇者牌庫無牌時則將棄牌堆洗回勇者牌庫。選擇一張手牌並以覆蓋的方式打出。所有勇者都打出覆蓋牌後一同打開結算。<br>
        <span class="blue-text">【BOSS回合】</span>回合開始時，從BOSS牌庫抽取一張牌。若有BOSS被動可能在此時執行。<br>
        <span class="blue-text">【戰鬥勝利】</span>若造成BOSS生命為零點以下，勇者即為勝利。死亡的勇者復活且所有勇者生命恢復至全滿！從寶藏牌庫抽取三張牌，可以選擇最多兩張保留。保留的牌加進你的勇者牌庫，不被保留的牌統一洗回寶藏牌庫。<br>
        <span class="blue-text">【戰鬥失敗】</span>所有勇者生命為零點，遊戲結束。<br>
        <span class="blue-text">【牌種表】</span><br>
        瞬發牌：打出牌後的效果會立即生效。<br>
        蓄力牌：打出牌後進入施法狀態，牌的效果不會立即生效；直至下個你的回合結算時生效並解除施法狀態。<br>
        持續牌：打出後進入施法狀態，牌的效果會立即生效持續至下個你的回合結算；結算後解除施法狀態。<br>
        道具牌：打出後裝備此道具，每個角色僅能裝備一個道具。<br>

        <span class="blue-text">【狀態表】</span><br>
        <strong>1.負面狀態1型</strong><br>
        負面狀態1型:會立刻發動效果，且會持續至目標的回合結束時；才會恢復為正常狀態。<br>
        1-1暈眩狀態：無法抽牌、出牌。若處於施法狀態下暈眩，則會被中斷施法。<br>
        1-2禁療：無法恢復生命<br>
        1-3限制移動：無法移動至另一環<br>
        <strong>2.負面狀態2型</strong><br>
        負面狀態2型: 會立刻發動效果，但不會持續。<br>
        2-1中斷施法：結束施法狀態，並將剛剛被中斷施法的蓄力或持續牌丟棄至棄牌堆。<br>
        2-2繳械：裝備的道具會被丟棄至棄牌堆<br>
        2-3擊退：往外移動一環，若已在最外環則會停留在原本所處的位置。<br>
        <strong>3.其他</strong><br>
        3-1施法狀態：無法移動、抽牌及出牌(但能獲取魔力)。
    </p>
    
    <button class="close-rules-popup">關閉</button>
`;



$(document).ready(function () {
    // 添加遊戲規則按鈕到設定彈窗
    $(".menu-popup").prepend('<button class="menu-option menu-game-rules">遊戲規則</button>');

    // 處理遊戲規則按鈕點擊
    $(".menu-game-rules").click(function () {
        $(".overlay").fadeIn(); // 顯示遮罩
        $("body").append(`<div class="game-rules-popup">${gameRulesPopupContent}</div>`); // 添加彈窗到頁面
        $(".game-rules-popup").fadeIn(); // 顯示彈窗
    });

    // 處理關閉遊戲規則彈窗
    $(document).on('click', '.close-rules-popup', function () {
        $(".game-rules-popup").fadeOut(function() { $(this).remove(); }); // 移除彈窗
        $(".overlay").fadeOut(); // 隱藏遮罩
    });

    // 點擊遮罩時，隱藏遊戲規則彈窗和遮罩
    $(".overlay").click(function() {
        if ($(".game-rules-popup").is(":visible")) {
            $(".game-rules-popup").fadeOut(function() { $(this).remove(); }); // 移除彈窗
            $(this).fadeOut(); // 隱藏遮罩
        }
    });
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
