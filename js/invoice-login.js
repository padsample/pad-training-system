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

        sessionStorage.setItem(
            "loginError",
            "ログインIDまたはパスワードが正しくありません。"
        );

        window.location.href =
            "invoice-error.html";

        return;
    }


    // -----------------------------
    // 守秘義務チェック
    // -----------------------------

    if (!confidentiality) {

        sessionStorage.setItem(
            "loginError",
            "守秘義務に同意してください。"
        );

        window.location.href =
            "invoice-error.html";

        return;
    }


    // -----------------------------
    // ログイン成功
    // -----------------------------

    window.location.href =
        "invoice-search.html";

});
