class Sort {
  container = document.getElementsByClassName("chart-container")[0];
  constructor(totalChart = 5, transitionDuration = "500ms") {
    this.totalChart = totalChart;
    this.transitionDuration = transitionDuration;
  }

  getTotalChart() {
    return this.totalChart;
  }

  setTotalChart(totalChart) {
    this.totalChart = totalChart;
  }

  createChart() {
    this.container.style.width = `${50 * this.totalChart}px`;
    for (let i = 0; i < this.totalChart; i++) {
      const height = Math.floor(Math.random() * (400 - 100 + 1) + 100);
      const chart = document.createElement("div");
      chart.className = "chart";
      chart.style.height = `${height}px`;
      chart.style.left = `${i * 50}px`;
      this.container.appendChild(chart);
    }
  }

  resetChart() {
    return () => {
      const charts = document.getElementsByClassName("chart");
      while (charts.length > 0) {
        this.container.removeChild(charts[0]);
      }
      this.createChart();
    };
  }

  updateChart(e) {
    const value = e.target.value > 100 ? 100 : e.target.value;
    this.setTotalChart(value);
    this.resetChart()();
  }

  startSorting() {
    return async () => {
      const charts = document.getElementsByClassName("chart");

      for (let i = 0; i < charts.length; i++) {
        for (let j = 0; j < charts.length - i - 1; j++) {
          const currentChartHeight = parseInt(
            window.getComputedStyle(charts[j]).height
          );
          const nextChartHeight = parseInt(
            window.getComputedStyle(charts[j + 1]).height
          );

          if (currentChartHeight > nextChartHeight) {
            const currentChart = charts[j];
            const nextChart = charts[j + 1];

            const currentChartLeft = parseInt(
              window.getComputedStyle(currentChart).left
            );
            const nextChartLeft = parseInt(
              window.getComputedStyle(nextChart).left
            );

            currentChart.style.transitionDuration = this.transitionDuration;
            nextChart.style.transitionDuration = this.transitionDuration;

            currentChart.style.left = `${nextChartLeft}px`;
            nextChart.style.left = `${currentChartLeft}px`;

            await new Promise((resolve) =>
              setTimeout(resolve, parseInt(this.transitionDuration))
            );
            this.container.insertBefore(nextChart, currentChart);
          }
        }
      }

      //berubah warna hijau
      for (let i = 0; i < charts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        charts[i].style.backgroundColor = "green";
      }
    };
  }
}

const sort = new Sort(10, "100ms");
sort.createChart();

startButton = document.getElementsByClassName("start")[0];
startButton.addEventListener("click", sort.startSorting());

resetButton = document.getElementsByClassName("reset")[0];
resetButton.addEventListener("click", sort.resetChart());

inputTotalChart = document.getElementsByTagName("input")[0];
inputTotalChart.value = sort.getTotalChart();
inputTotalChart.addEventListener("keyup", (e) => {
  sort.updateChart(e);
});
