// ======================================================
// 企業情報管理システム
// login.js
// ======================================================

// ログインフォーム
const loginForm = document.getElementById("loginForm");

// ログインボタン押下
loginForm.addEventListener("submit", function (event) {

    // フォーム送信を停止
    event.preventDefault();

    // 入力値取得
    const loginId =
        document.getElementById("txtLoginId").value.trim();

    const password =
        document.getElementById("txtPassword").value.trim();


    // -----------------------------
    // 入力チェック
    // -----------------------------

    if (loginId === "" || password === "") {

        // エラー画面へ
        window.location.href = "error.html";

        return;

    }


    // -----------------------------
    // ログイン成功
    // -----------------------------

    window.location.href = "search.html";

});