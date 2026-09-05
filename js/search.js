// ======================================================
// 企業情報管理システム
// search.js
// ======================================================

"use strict";

//======================================================
// データ
//======================================================

const documentData = {

    "100001": [

        {
            companyCode: "100001",
            companyName: "AAA株式会社",
            documentNo: "DOC001",
            documentName: "会社概要",
            status: "非公開",
            publishDate: "2026/06/01",
            pdf: null
        },

        {
            companyCode: "100001",
            companyName: "AAA株式会社",
            documentNo: "DOC002",
            documentName: "契約書",
            status: "非公開",
            publishDate: "2026/06/10",
            pdf: null
        },

        {
            companyCode: "100001",
            companyName: "AAA株式会社",
            documentNo: "DOC003",
            documentName: "監査資料",
            status: "非公開",
            publishDate: "2026/06/20",
            pdf: null
        },
        
        {
		    companyCode: "100001",
		    companyName: "AAA株式会社",
		    documentNo: "DOC004",
		    documentName: "決算報告書",
		    status: "公開",
		    publishDate: "2026/07/25",
		    pdf: "sample.pdf"
		}

    ],

    "100004": [

        {
            companyCode: "100004",
            companyName: "DDD株式会社",
            documentNo: "DOC001",
            documentName: "会社概要",
            status: "非公開",
            publishDate: "2026/06/01",
            pdf: null
        },

        {
            companyCode: "100004",
            companyName: "DDD株式会社",
            documentNo: "DOC002",
            documentName: "決算報告書",
            status: "公開",
            publishDate: "2026/07/20",
            pdf: "sample.pdf"
        },

        {
            companyCode: "100004",
            companyName: "DDD株式会社",
            documentNo: "DOC003",
            documentName: "IR資料",
            status: "非公開",
            publishDate: "2026/06/10",
            pdf: null
        }

    ]

};

//======================================================
// 要素取得
//======================================================

const txtCompanyCode =
    document.getElementById("txtCompanyCode");

const btnSearch =
    document.getElementById("btnSearch");

const tbodyResult =
    document.getElementById("tbodyResult");

const lblResultCount =
    document.getElementById("lblResultCount");

const divLoading =
    document.getElementById("divLoading");

const divMessage =
    document.getElementById("divMessage");

//======================================================
// 検索ボタン
//======================================================

btnSearch.addEventListener("click", searchDocument);

// Enterキー対応
txtCompanyCode.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchDocument();

    }

});

//======================================================
// 検索処理
//======================================================

function searchDocument() {

    const companyCode =
        txtCompanyCode.value.trim();

    tbodyResult.innerHTML = "";

    divMessage.textContent = "";

    lblResultCount.textContent = "";

    divLoading.style.display = "block";

    setTimeout(function () {

        divLoading.style.display = "none";

        if (companyCode === "") {

            lblResultCount.textContent = "0件";

            divMessage.textContent =
                "企業コードを入力してください。";

            return;

        }

        const result =
            documentData[companyCode];

        if (!result) {

            lblResultCount.textContent = "0件";

            divMessage.textContent =
                "検索結果はありません。";

            return;

        }

        lblResultCount.textContent =
            result.length + "件見つかりました。";

        createTable(result);

    }, 500);

}

//======================================================
// テーブル生成
//======================================================

function createTable(result) {

    tbodyResult.innerHTML = "";

    result.forEach(function (row, index) {

        const tr =
            document.createElement("tr");
            tr.setAttribute("data-row", index + 1);

        tr.innerHTML =
    "<td>" + row.companyCode + "</td>" +
    "<td>" + row.companyName + "</td>" +
    "<td>" + row.documentNo + "</td>" +
    "<td>" + row.documentName + "</td>" +
    "<td>" + createStatusBadge(row.status) + "</td>" +
    "<td>" + row.publishDate + "</td>" +
    "<td>" + createPdfButton(
        row.pdf,
        row.companyCode + "_" + row.documentNo + "_" + row.documentName + ".pdf"
    ) + "</td>";

        tbodyResult.appendChild(tr);

    });

}

//======================================================
// 公開状態表示
//======================================================

function createStatusBadge(status) {

    if (status === "公開") {

        return "<span class='status-public'>公開</span>";

    }

    return "<span class='status-private'>非公開</span>";

}

//======================================================
// PDFボタン生成
//======================================================

function createPdfButton(pdf, displayFileName) {

    // 公開
    if (pdf) {

        return `
<a
    href="pdf/${pdf}"
    class="download-button"
    target="_blank"
    aria-label="ダウンロード"
    data-file="${displayFileName}">

    <span class="legacy-download-label">📄 ダウンロード</span>

</a>
`;

    }

    // 非公開
    return `
<a
    href="#"
    class="download-button disabled"
    aria-label="ダウンロード"
    data-file="${displayFileName}">

    <span class="legacy-download-label">📄 ダウンロード</span>

</a>
`;

}

//======================================================
// 初期表示
//======================================================

lblResultCount.textContent = "検索してください。";

divMessage.textContent = "";

//======================================================
// 画像認識練習用キャンバス
//======================================================

const cnvImageTarget =
    document.getElementById("cnvImageTarget");

if (cnvImageTarget) {

    const ctx = cnvImageTarget.getContext("2d");

    // 背景
    const gradient = ctx.createLinearGradient(0, 0, 360, 120);
    gradient.addColorStop(0, "#0f4c81");
    gradient.addColorStop(1, "#1368aa");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 360, 120);

    // 左側アイコン背景
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(18, 18, 86, 84, 10);
    ctx.fill();

    // 虫眼鏡アイコン
    ctx.strokeStyle = "#0f72c8";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(61, 54, 23, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(78, 71);
    ctx.lineTo(95, 89);
    ctx.stroke();

    // 右側ラベル背景
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(128, 34, 205, 54, 9);
    ctx.fill();

    // 文字
    ctx.fillStyle = "#153b63";
    ctx.font = "bold 18px 'Yu Gothic UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("画像認識サンプル", 230, 60);

    ctx.fillStyle = "#6f7b87";
    ctx.font = "12px 'Segoe UI', sans-serif";
    ctx.fillText("PAD Image Target", 230, 78);

}
