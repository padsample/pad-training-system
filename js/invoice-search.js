"use strict";


// ======================================================
// 取引先情報
// ======================================================

const companyData = {

    "V0001": "青葉商事株式会社",
    "V0002": "東都システム株式会社",
    "V0003": "みなと産業株式会社",
    "V0004": "さくら物流株式会社",
    "V0005": "北星サービス株式会社",
    "V0006": "中央設備株式会社",
    "V0007": "光洋ソリューション株式会社"

};


// ======================================================
// 請求書データ
//
// receivedDaysAgo
// 0 = 当日
// 1 = 前日
//
// Webページを開いた日を基準として
// 受領日を自動的に計算します。
//
// pdf
// Webシステム内部で管理しているPDFファイル名です。
// 画面上には表示しません。
// ======================================================

const invoiceData = {

    // --------------------------------------------------
    // V0001 青葉商事株式会社：4件
    // --------------------------------------------------

    "V0001": [

        {
            receivedDaysAgo: 0,
            receivedTime: "09:15",
            invoiceNo: "INV-A001",
            subject: "クラウド型業務システム利用料請求書",
            amount: 88000,
            dueDaysLater: 25,
            pdf: "INV-A001.pdf"
        },

        {
            receivedDaysAgo: 0,
            receivedTime: "14:35",
            invoiceNo: "INV-A002",
            subject: "追加ユーザーライセンス利用料請求書",
            amount: 66000,
            dueDaysLater: 25,
            pdf: "INV-A002.pdf"
        },

        {
            receivedDaysAgo: 1,
            receivedTime: "10:10",
            invoiceNo: "INV-A003",
            subject: "システム保守サービス費請求書",
            amount: 132000,
            dueDaysLater: 28,
            pdf: "INV-A003.pdf"
        },

        {
            receivedDaysAgo: 1,
            receivedTime: "16:20",
            invoiceNo: "INV-A004",
            subject: "データバックアップサービス利用料請求書",
            amount: 49500,
            dueDaysLater: 28,
            pdf: "INV-A004.pdf"
        }

    ],


    // --------------------------------------------------
    // V0002 東都システム株式会社：0件
    // --------------------------------------------------

    "V0002": [],


    // --------------------------------------------------
    // V0003 みなと産業株式会社：1件
    // --------------------------------------------------

    "V0003": [

        {
            receivedDaysAgo: 1,
            receivedTime: "13:40",
            invoiceNo: "INV-C001",
            subject: "OA機器レンタル料請求書",
            amount: 92400,
            dueDaysLater: 27,
            pdf: "INV-C001.pdf"
        }

    ],


    // --------------------------------------------------
    // V0004 さくら物流株式会社：3件
    // --------------------------------------------------

    "V0004": [

        {
            receivedDaysAgo: 0,
            receivedTime: "08:55",
            invoiceNo: "INV-D001",
            subject: "定期配送業務委託費請求書",
            amount: 264000,
            dueDaysLater: 26,
            pdf: "INV-D001.pdf"
        },

        {
            receivedDaysAgo: 0,
            receivedTime: "13:25",
            invoiceNo: "INV-D002",
            subject: "臨時配送業務費請求書",
            amount: 49500,
            dueDaysLater: 26,
            pdf: "INV-D002.pdf"
        },

        {
            receivedDaysAgo: 1,
            receivedTime: "17:05",
            invoiceNo: "INV-D003",
            subject: "商品倉庫保管料請求書",
            amount: 121000,
            dueDaysLater: 27,
            pdf: "INV-D003.pdf"
        }

    ],


    // --------------------------------------------------
    // V0005 北星サービス株式会社：1件
    // --------------------------------------------------

    "V0005": [

        {
            receivedDaysAgo: 0,
            receivedTime: "11:05",
            invoiceNo: "INV-E001",
            subject: "業務システム運用支援費請求書",
            amount: 99000,
            dueDaysLater: 27,
            pdf: "INV-E001.pdf"
        }

    ],


    // --------------------------------------------------
    // V0006 中央設備株式会社：0件
    // --------------------------------------------------

    "V0006": [],


    // --------------------------------------------------
    // V0007 光洋ソリューション株式会社：2件
    // --------------------------------------------------

    "V0007": [

        {
            receivedDaysAgo: 0,
            receivedTime: "12:15",
            invoiceNo: "INV-G001",
            subject: "業務ソフトウェア年間保守費請求書",
            amount: 143000,
            dueDaysLater: 25,
            pdf: "INV-G001.pdf"
        },

        {
            receivedDaysAgo: 1,
            receivedTime: "16:35",
            invoiceNo: "INV-G002",
            subject: "システム技術支援サービス費請求書",
            amount: 187000,
            dueDaysLater: 26,
            pdf: "INV-G002.pdf"
        }

    ]

};


// ======================================================
// HTML要素取得
// ======================================================

const ddlReceiptDateFrom =
    document.getElementById("ddlReceiptDateFrom");


const ddlReceiptDateTo =
    document.getElementById("ddlReceiptDateTo");


const txtCompanyCode =
    document.getElementById("txtCompanyCode");


const btnSearch =
    document.getElementById("btnSearch");


const resultCard =
    document.getElementById("resultCard");


const lblResultCount =
    document.getElementById("lblResultCount");


const divCompanyInfo =
    document.getElementById("divCompanyInfo");


const divMessage =
    document.getElementById("divMessage");


const tableWrapper =
    document.getElementById("tableWrapper");


const tbodyResult =
    document.getElementById("tbodyResult");


// ======================================================
// 日付ドロップダウン生成
// ======================================================

function initializeDateDropdowns() {

    for (let i = 0; i <= 30; i++) {

        const date =
            addDays(
                startOfToday(),
                -i
            );


        const value =
            formatDate(date);


        const displayValue =
            formatDateWithWeekday(date);


        // 開始日

        const fromOption =
            document.createElement("option");


        fromOption.value =
            value;


        fromOption.textContent =
            displayValue;


        setWeekendColor(
            fromOption,
            date
        );


        ddlReceiptDateFrom.appendChild(
            fromOption
        );


        // 終了日

        const toOption =
            document.createElement("option");


        toOption.value =
            value;


        toOption.textContent =
            displayValue;


        setWeekendColor(
            toOption,
            date
        );


        ddlReceiptDateTo.appendChild(
            toOption
        );

    }


    // 初期表示は開始日・終了日ともに当日。
    //
    // PAD実行時に開始日だけ
    // 前回実行日へ変更する。

    ddlReceiptDateFrom.selectedIndex =
        0;


    ddlReceiptDateTo.selectedIndex =
        0;


    updateSelectColor(
        ddlReceiptDateFrom
    );


    updateSelectColor(
        ddlReceiptDateTo
    );

}


// ======================================================
// 検索処理
// ======================================================

function searchInvoice() {

    const companyCode =
        txtCompanyCode.value
            .trim()
            .toUpperCase();


    clearResult();


    resultCard.style.display =
        "block";


    // --------------------------------------------------
    // 取引先コード未入力
    // --------------------------------------------------

    if (companyCode === "") {

        divMessage.textContent =
            "取引先コードを入力してください。";


        return;

    }


    // --------------------------------------------------
    // 存在しない取引先コード
    // --------------------------------------------------

    if (
        !Object.prototype.hasOwnProperty.call(
            companyData,
            companyCode
        )
    ) {

        divMessage.textContent =
            "指定した条件に該当する請求書はありません。";


        return;

    }


    const fromDate =
        parseDate(
            ddlReceiptDateFrom.value
        );


    const toDate =
        parseDate(
            ddlReceiptDateTo.value
        );


    // --------------------------------------------------
    // 開始日が終了日より後
    // --------------------------------------------------

    if (fromDate > toDate) {

        divMessage.textContent =
            "受領期間の開始日が終了日より後になっています。";


        return;

    }


    const source =
        invoiceData[companyCode] || [];


    // --------------------------------------------------
    // 指定された受領期間で絞り込み
    // --------------------------------------------------

    const result =
        source
            .map(
                function (row) {

                    return createDisplayRow(
                        row
                    );

                }
            )
            .filter(
                function (row) {

                    return (
                        row.receivedDate >= fromDate
                        &&
                        row.receivedDate <= toDate
                    );

                }
            );


    // --------------------------------------------------
    // 検索結果0件
    // --------------------------------------------------

    if (result.length === 0) {

        divMessage.textContent =
            "指定した条件に該当する請求書はありません。";


        return;

    }


    // --------------------------------------------------
    // 検索結果がある場合のみ取引先情報・件数を表示
    // --------------------------------------------------

    divCompanyInfo.style.display =
        "block";


    divCompanyInfo.textContent =
        "取引先："
        + companyCode
        + "　"
        + companyData[companyCode];


    lblResultCount.textContent =
        result.length + "件";


    tableWrapper.style.display =
        "block";


    createTable(
        result
    );

}


// ======================================================
// 表示用データ作成
// ======================================================

function createDisplayRow(row) {

    const receivedDate =
        addDays(
            startOfToday(),
            -row.receivedDaysAgo
        );


    const dueDate =
        addDays(
            receivedDate,
            row.dueDaysLater
        );


    return {

        receivedDate:
            receivedDate,

        receivedDateTime:
            formatDate(receivedDate)
            + " "
            + row.receivedTime,

        invoiceNo:
            row.invoiceNo,

        subject:
            row.subject,

        amount:
            row.amount,

        dueDate:
            formatDateWithWeekday(
                dueDate
            ),

        pdf:
            row.pdf

    };

}


// ======================================================
// 検索結果テーブル生成
// ======================================================

function createTable(result) {

    result.forEach(
        function (row) {

            const tr =
                document.createElement("tr");


            // --------------------------------------------------
            // 受領日時
            // --------------------------------------------------

            const tdReceivedDate =
                document.createElement("td");


            tdReceivedDate.textContent =
                row.receivedDateTime;


            // --------------------------------------------------
            // 請求書番号
            // --------------------------------------------------

            const tdInvoiceNo =
                document.createElement("td");


            tdInvoiceNo.textContent =
                row.invoiceNo;


            // --------------------------------------------------
            // 請求内容
            // --------------------------------------------------

            const tdSubject =
                document.createElement("td");


            tdSubject.textContent =
                row.subject;


            tdSubject.className =
                "subject-cell";


            // --------------------------------------------------
            // 請求金額
            // --------------------------------------------------

            const tdAmount =
                document.createElement("td");


            tdAmount.textContent =
                formatAmount(
                    row.amount
                );


            tdAmount.className =
                "amount-cell";


            // --------------------------------------------------
            // 支払期限
            // --------------------------------------------------

            const tdDueDate =
                document.createElement("td");


            tdDueDate.textContent =
                row.dueDate;


            // --------------------------------------------------
            // 表題
            // --------------------------------------------------

            const tdPdf =
                document.createElement("td");


            const pdfLink =
                document.createElement("a");


            // 全行で同じclass。
            //
            // PAD側で行番号を変数化して
            // 1行目、2行目、3行目…を操作できる。

            pdfLink.className =
                "pdf-link";


            // GitHubのpdfフォルダに配置した
            // 管理番号名のPDFへリンクする。

            pdfLink.href =
    "pdf/"
    + encodeURIComponent(
        row.pdf
    );


pdfLink.target =
    "_blank";


pdfLink.rel =
    "noopener";


            // 画面上にはPDFファイル名ではなく
            // 表題を表示する。

            pdfLink.textContent =
                row.subject;


            tdPdf.appendChild(
                pdfLink
            );


            tr.appendChild(
                tdReceivedDate
            );


            tr.appendChild(
                tdInvoiceNo
            );


            tr.appendChild(
                tdSubject
            );


            tr.appendChild(
                tdAmount
            );


            tr.appendChild(
                tdDueDate
            );


            tr.appendChild(
                tdPdf
            );


            tbodyResult.appendChild(
                tr
            );

        }
    );

}


// ======================================================
// 検索結果初期化
// ======================================================

function clearResult() {

    tbodyResult.innerHTML =
        "";


    lblResultCount.textContent =
        "";


    divMessage.textContent =
        "";


    divCompanyInfo.textContent =
        "";


    divCompanyInfo.style.display =
        "none";


    tableWrapper.style.display =
        "none";

}


// ======================================================
// 本日取得
// ======================================================

function startOfToday() {

    const now =
        new Date();


    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

}


// ======================================================
// 日付加算
// ======================================================

function addDays(
    date,
    days
) {

    const result =
        new Date(date);


    result.setDate(
        result.getDate() + days
    );


    return result;

}


// ======================================================
// yyyy/MM/dd形式
// ======================================================

function formatDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year
        + "/"
        + month
        + "/"
        + day
    );

}


// ======================================================
// yyyy/MM/dd(ddd)形式
// ======================================================

function formatDateWithWeekday(date) {

    const weekdays = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ];


    return (
        formatDate(date)
        + "("
        + weekdays[
            date.getDay()
        ]
        + ")"
    );

}


// ======================================================
// yyyy/MM/dd → Date
// ======================================================

function parseDate(text) {

    const parts =
        text.split("/");


    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}


// ======================================================
// ドロップダウン内の日付色
// ======================================================

function setWeekendColor(
    option,
    date
) {

    const day =
        date.getDay();


    // 日曜日

    if (day === 0) {

        option.style.color =
            "#dc2626";

    }


    // 土曜日

    else if (day === 6) {

        option.style.color =
            "#2563eb";

    }


    // 平日

    else {

        option.style.color =
            "#1d2d3d";

    }

}


// ======================================================
// 選択中の日付色
// ======================================================

function updateSelectColor(
    selectElement
) {

    const date =
        parseDate(
            selectElement.value
        );


    const day =
        date.getDay();


    if (day === 0) {

        selectElement.style.color =
            "#dc2626";

    }


    else if (day === 6) {

        selectElement.style.color =
            "#2563eb";

    }


    else {

        selectElement.style.color =
            "#1d2d3d";

    }

}


// ======================================================
// 金額表示
// ======================================================

function formatAmount(amount) {

    return (
        amount.toLocaleString(
            "ja-JP"
        )
        + "円"
    );

}


// ======================================================
// イベント
// ======================================================

btnSearch.addEventListener(
    "click",
    searchInvoice
);


txtCompanyCode.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchInvoice();

        }

    }
);


ddlReceiptDateFrom.addEventListener(
    "change",
    function () {

        updateSelectColor(
            ddlReceiptDateFrom
        );

    }
);


ddlReceiptDateTo.addEventListener(
    "change",
    function () {

        updateSelectColor(
            ddlReceiptDateTo
        );

    }
);


// ======================================================
// 初期表示
// ======================================================

initializeDateDropdowns();
