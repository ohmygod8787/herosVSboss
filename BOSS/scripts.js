$(document).ready(function () {
    let selectedJob = null; // 儲存選擇的職業
    let currentHp = 26; // 初始化當前 HP
    const baseMaxHp = 26;   // 基礎最大 HP
    let currentMaxHp = baseMaxHp; // 當前最大 HP

    let tempHpAdd = 6; // 預設 HP ADD 數值為 4
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

    // 職業按鈕點擊事件
    $(".job-button").click(function () {
        const job = $(this).data("job");
        $("body").css("background-color", "#470347");
        $(".job-button").addClass("selected-boss");
        selectedJob = job;
    });

    // OK 按鈕點擊事件
    $(".ok-button").click(function () {

        if (!selectedJob) {
            $("#alert").fadeIn().delay(2000).fadeOut();
            return;
        }

        $(".popup").hide();
        $(".main-content").show();
    });

    // 增加 HP 按鈕點擊事件
    $('.hp-add-button').on('click', function () {
        const increment = parseInt($(this).text().replace('+', ''), 10);
        currentHp = Math.min(currentHp + increment, currentMaxHp);
        updateHpDisplay();
    });

    // 減少 HP 按鈕點擊事件
    $(".hp-SUB-button").click(function () {
        const decrement = parseInt($(this).text(), 10);
        currentHp = Math.max(currentHp + decrement, 0);
        updateHpDisplay();
    });

    // BOSS狀態表
    $(".boss-status-item button").click(function () {
        $(this).toggleClass("active");

        // 找到按鈕內的 span.count
        const $countSpan = $(this).find(".count");

        // 如果 active，顯示 (2)；否則清空
        if ($(this).hasClass("active")) {
            $countSpan.text("(2)");
        } else {
            $countSpan.text("");
        }
    });

    // 點擊 END TURN 按鈕
    $(".end-turn").click(function () {
        $(".casting-mode button.active").each(function () {
            const $countSpan = $(this).find(".count");
            let count = parseInt($countSpan.text().replace(/[()]/g, ""), 10);

            if (!isNaN(count) && count > 0) {
                count--;
                if (count === 0) {
                    $(this).removeClass("active");
                    $countSpan.text("");
                } else {
                    $countSpan.text(`(${count})`);
                }
            }
        });
        $(".debuff button.active").removeClass("active");
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
            $(".adjust-level-popup").fadeOut(); // 關閉彈窗
            $(".black-overlay").fadeOut(); // 關閉黑色遮罩
            return;
        }

        currentLevel = tempLevel; // 更新實際等級
        currentHpAdd = tempHpAdd; // 確認新的 HP ADD 值
        currentMaxHp = baseMaxHp + ((currentLevel - 1) * currentHpAdd); // 計算新的最大 HP
        currentHp = currentMaxHp; // 將當前 HP 更新為最大 HP

        updateHpDisplay(); // 更新主內容顯示
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
    updateHpAddDisplay();
    updateMainLevelDisplay();
});
