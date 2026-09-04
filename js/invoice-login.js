// ======================================================
// 請求書受領管理システム
// invoice-login.js
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

    const confidentiality =
        document.getElementById("chkConfidentiality").checked;


    // -----------------------------
    // ログイン情報チェック
    // -----------------------------

    if (loginId !== "0000" || password !== "0000") {

        window.location.href =
            "invoice-error.html?type=login";

        return;
    }


    // -----------------------------
    // 守秘義務チェック
    // -----------------------------

    if (!confidentiality) {

        window.location.href =
            "invoice-error.html?type=confidentiality";

        return;
    }


    // -----------------------------
    // ログイン成功
    // -----------------------------

    window.location.href =
        "invoice-search.html";

});
