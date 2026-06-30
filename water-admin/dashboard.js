const API_BASE = "http://127.0.0.1:8000";
const DATA_API = API_BASE + "/data/integration";

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
   Update Card
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
   Load Data
=========================== */

async function loadData() {

    try {

        const res = await fetch(DATA_API);

        const result = await res.json();

        if (result.code !== 200) {

            console.error(result.message);
            return;

        }

        /* ===========================
           Score
        =========================== */

        const score = result.score;

        document.getElementById("score").innerHTML =
            score.score;

        document.getElementById("level").innerHTML =
            score.level;

        document.getElementById("time").innerHTML =
            result.time.substring(11, 19);

        const abnormal =
            document.getElementById("abnormal");

        abnormal.innerHTML =
            score.abnormal ? "异常" : "正常";

        abnormal.className =
            "card-value " +
            (score.abnormal ? "abnormal" : "normal");

        setItem("ph", score.ph);
        setItem("tds", score.tds);
        setItem("turbidity", score.turbidity);

        /* ===========================
           History
        =========================== */

        const history = result.data.slice(-100);

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

        console.error("Load Data Error:", e);

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

        if (phChart)
            phChart.resize();

        if (tdsChart)
            tdsChart.resize();

        if (turbidityChart)
            turbidityChart.resize();

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

    setInterval(updateClock, 1000);

    setInterval(async () => {

        await loadData();

    }, 3000);

});