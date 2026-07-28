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
        }
        
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
    "<td>" + createPdfButton(row.pdf, index + 1) + "</td>";

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

function createPdfButton(pdf, rowNo) {

    if (!pdf) {

        return "-";

    }

    return `
<a
    href="pdf/${pdf}"
    class="download-button"
    data-row="${rowNo}"
    target="_blank">

    📄 ダウンロード

</a>
`;

}

//======================================================
// 初期表示
//======================================================

lblResultCount.textContent = "検索してください。";

divMessage.textContent = "";
