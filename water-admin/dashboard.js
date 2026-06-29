const SCORE_API = "http://127.0.0.1:8000/data/score?token=mE7yG0kI";
const HISTORY_API = "http://127.0.0.1:8000/data/all?token=mE7yG0kI";

let phChart = null;
let tdsChart = null;
let turbidityChart = null;

/* ===========================
   Create Chart
=========================== */

function createChart(chart, title, color) {

    chart.setOption({

        animation: true,

        tooltip: {
            trigger: "axis"
        },

        grid: {
            left: 55,
            right: 25,
            top: 30,
            bottom: 40
        },

        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
            axisLabel: {
                color: "#666"
            }
        },

        yAxis: {
            type: "value",
            scale: true,
            axisLabel: {
                color: "#666"
            },
            splitLine: {
                lineStyle: {
                    color: "#e6e6e6"
                }
            }
        },

        series: [{
            name: title,
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
                width: 3,
                color: color
            },
            areaStyle: {
                opacity: 0.15,
                color: color
            },
            data: []
        }]

    });

}

/* ===========================
   Init Charts
=========================== */

function initCharts() {

    phChart = echarts.init(document.getElementById("phChart"));
    tdsChart = echarts.init(document.getElementById("tdsChart"));
    turbidityChart = echarts.init(document.getElementById("turbidityChart"));

    createChart(phChart, "pH", "#2196f3");
    createChart(tdsChart, "TDS", "#4caf50");
    createChart(turbidityChart, "浊度", "#ff9800");

}

/* ===========================
   Update Item
=========================== */

function setItem(name, data) {

    document.getElementById(name + "-value").innerHTML =
        Number(data.value).toFixed(2);

    document.getElementById(name + "-level").innerHTML =
        "等级：" + data.level;

    document.getElementById(name + "-score").innerHTML =
        "评分：" + data.score;

}

/* ===========================
   Load Score
=========================== */

async function loadData() {

    try {

        const res = await fetch(SCORE_API);

        const data = await res.json();

        document.getElementById("score").innerHTML = data.score;

        document.getElementById("level").innerHTML = data.level;

        document.getElementById("time").innerHTML =
            data.time.substring(11, 19);

        const abnormal =
            document.getElementById("abnormal");

        abnormal.innerHTML =
            data.abnormal ? "异常" : "正常";

        abnormal.className =
            "card-value " +
            (data.abnormal ? "abnormal" : "normal");

        setItem("ph", data.ph);
        setItem("tds", data.tds);
        setItem("turbidity", data.turbidity);

    }
    catch (e) {

        console.error("Load Score Error:", e);

    }

}

/* ===========================
   Load History
=========================== */

async function loadHistory() {

    try {

        const res = await fetch(HISTORY_API);

        const all = await res.json();

        if (!Array.isArray(all) || all.length === 0)
            return;

        const history = all.slice(-100);

        const time = history.map(item =>
            item.time.substring(11, 19));

        phChart.setOption({

            xAxis: {
                data: time
            },

            series: [{

                data: history.map(item => item.ph)

            }]

        });

        tdsChart.setOption({

            xAxis: {
                data: time
            },

            series: [{

                data: history.map(item => item.tds)

            }]

        });

        turbidityChart.setOption({

            xAxis: {
                data: time
            },

            series: [{

                data: history.map(item => item.turbidity)

            }]

        });

    }
    catch (e) {

        console.error("Load History Error:", e);

    }

}

/* ===========================
   Clock
=========================== */

function updateClock() {

    document.getElementById("clock").innerHTML =
        new Date().toLocaleString("zh-CN");

}

/* ===========================
   Resize
=========================== */

window.addEventListener("resize", () => {

    requestAnimationFrame(() => {

        if (phChart) phChart.resize();

        if (tdsChart) tdsChart.resize();

        if (turbidityChart) turbidityChart.resize();

    });

});

/* ===========================
   Start
=========================== */

window.addEventListener("load", async () => {

    initCharts();

    requestAnimationFrame(() => {

        phChart.resize();
        tdsChart.resize();
        turbidityChart.resize();

    });

    updateClock();

    await loadData();

    await loadHistory();

    setInterval(updateClock, 1000);

    setInterval(async () => {

        await loadData();

        await loadHistory();

    }, 3000);

});