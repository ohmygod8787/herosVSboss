$(document).ready(function () {
    let selectedJob = null; // 儲存選擇的職業
    let currentHp = 100; // 初始化當前 HP
    const baseMaxHp = 100;   // 基礎最大 HP
    let currentMaxHp = baseMaxHp; // 當前最大 HP

    let lastHpBeforeAll = null;  // 記錄按 All 前的 HP
    let hadShieldBeforeAll = false;  // 記錄按 All 前是否有護盾
    let lastActionIsAll = false;  // 判斷是否是連續點擊 All

    // 更新 HP 顯示
    function updateHpDisplay() {
        $(".current-hp").text(currentHp);
        $(".max-hp").text("/ " + currentMaxHp);
    }

    // 顯示遮罩和指定的彈窗
    function showPopup(popupSelector) {
        $(".overlay").fadeIn();
        $(popupSelector).fadeIn();
    }

    // 隱藏遮罩和彈窗
    function hidePopup() {
        $(".overlay").fadeOut();
        $(".menu-popup").fadeOut();
    }

    // 隱藏確定彈窗
    function hidePopup2() {
        $(".overlay").fadeOut();
        $(".menu-popup2").fadeOut();
    }

    // 職業按鈕點擊事件
    $(".job-button").click(function () {
        $(".job-button").removeClass("selected-warrior selected-rogue selected-priest selected-boss"); // 先清除所有選中狀態
        const job = $(this).data("job");

        if (job === "黑色") {
            $(this).addClass("selected-warrior");
            $("body").css("background-color", "black");
        } else if (job === "綠色") {
            $(this).addClass("selected-rogue");
            $("body").css("background-color", "#008000");
        } else if (job === "灰色") {
            $(this).addClass("selected-priest");
            $("body").css("background-color", "#acabab");
        } else if (job === "BOSS") {
            $(this).addClass("selected-boss");
            $("body").css("background-color", "#4B0082"); // 深紫色
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
    });

    // 增加 HP 按鈕點擊事件
    $(".hp-add-button").click(function () {
        const increment = parseInt($(this).text().replace('+', ''), 10);
        currentHp = Math.min(currentHp + increment, currentMaxHp);
        lastActionIsAll = false;  // 重置 All 狀態
        updateHpDisplay();
    });

    // 盾牌按鈕點擊事件
    $(".shield").click(function () {
        const currentHpElement = $(".current-hp");
        if (currentHp === 0) {
            return;
        }
        currentHpElement.toggleClass("yellow-style");
    });

    // HP 減少按鈕 (-5 至 -80、All)
    $(".hp-SUB-button").click(function () {
        const currentHpElement = $(".current-hp");
        const buttonValue = $(this).text().trim();

        if (buttonValue === "All") {
            if (lastActionIsAll) {
                // 連續點擊 All
                if (hadShieldBeforeAll) {
                    currentHpElement.addClass("yellow-style"); // 恢復護盾
                }
                currentHp = lastHpBeforeAll; // 恢復按 All 之前的 HP
                lastActionIsAll = false; // 重置狀態
            } else {
                // 第一次點擊 All，記錄狀態
                lastHpBeforeAll = currentHp;  // 記錄當前 HP
                hadShieldBeforeAll = currentHpElement.hasClass("yellow-style");  // 記錄是否有護盾

                if (hadShieldBeforeAll) {
                    currentHpElement.removeClass("yellow-style");  // 有護盾則移除
                }
                currentHp = 0;  // HP 變為 0
                lastActionIsAll = true;  // 標記為 All 點擊狀態
            }
        } else {
            // 其他按鈕（-5 至 -80）
            lastActionIsAll = false;  // 如果按其他按鈕，則重置 All 點擊狀態
            const decrement = parseInt(buttonValue, 10);

            if (decrement === -5) {
                if (currentHpElement.hasClass("yellow-style")) {
                    currentHpElement.removeClass("yellow-style");
                }
            } else {
                if (currentHpElement.hasClass("yellow-style")) {
                    currentHpElement.removeClass("yellow-style");
                    currentHp = Math.max(currentHp - Math.abs(decrement / 2), 0);
                } else {
                    currentHp = Math.max(currentHp - Math.abs(decrement), 0);
                }
            }
        }

        updateHpDisplay();
    });

    // 確保「狀態列表」按鈕存在
    if ($(".menu-status-list").length === 0) {
        $(".menu-popup .menu-game-rules").after('<button class="menu-option menu-status-list">狀態列表</button>');
    }

    // 監聽「狀態列表」按鈕點擊
    $(".menu-status-list").click(function () {
        $(".overlay").fadeIn();
        $(".status-list-popup").fadeIn();
    });

    // 監聽「關閉」按鈕
    $(".close-status-popup").click(function () {
        $(".status-list-popup").fadeOut();
        $(".overlay").fadeOut();
        $(".menu-popup").fadeOut();
    });

    $(".settings").click(function () {
        showPopup(".menu-popup");
    });

    // 確保「遊戲規則」按鈕存在
    if ($(".menu-game-rules").length === 0) {
        $(".menu-popup").prepend('<button class="menu-option menu-game-rules">遊戲規則</button>');
    }

    // 監聽「遊戲規則」按鈕點擊
    $(".menu-game-rules").click(function () {
        $(".overlay").fadeIn();
        $(".game-rules-popup").fadeIn();
    });

    // 監聽「關閉」按鈕
    $(".close-rules-popup").click(function () {
        $(".game-rules-popup").fadeOut();
        $(".overlay").fadeOut(); 
        $(".menu-popup").fadeOut();
    });

    // 點擊遮罩時，關閉「menu-popup、遊戲規則、狀態列表」
    $(".overlay").click(function () {
        $(".game-rules-popup, .status-list-popup, .menu-popup, .confirm-popup").fadeOut();
        $(this).fadeOut(); // 隱藏遮罩
    });

    $(".menu-change-job").click(function () {
        hidePopup();
        showPopup(".confirm-popup");
    });

    $(".confirm-yes").click(function () {
        location.reload();
    });

    $(".confirm-no").click(function () {
        hidePopup2();
    });

    $(".menu-cancel").click(function () {
        hidePopup();
    });

    $(".menu-adjust-hp").click(function () {
        hidePopup();
        $(".black-overlay").fadeIn();
        $(".adjust-hp-popup").fadeIn();
    });

    $(".adjust-confirm-hp").click(function () {
        let newHp = parseInt($("#hp-input").val(), 10);

        if (isNaN(newHp) || newHp < 5 || newHp > 995 || newHp % 5 !== 0) {
            $(".hp-alert").fadeIn();
            setTimeout(function () {
                $(".hp-alert").fadeOut();
            }, 2000);
            return;
        }

        currentHp = newHp;
        currentMaxHp = newHp;
        updateHpDisplay();

        $(".adjust-hp-popup").fadeOut();
        $(".black-overlay").fadeOut();
    });

    $(".adjust-cancel-hp").click(function () {
        $(".adjust-hp-popup").fadeOut();
        $(".black-overlay").fadeOut();
    });

    $(".black-overlay").click(function () {
        $(".adjust-hp-popup").fadeOut();
        $(this).fadeOut();
    });

    $(".main-content").hide();
    $(".menu-popup, .confirm-popup").hide();
    updateHpDisplay();
});
