const btn = document.getElementById('btn');
document.addEventListener('DOMContentLoaded', () => chart());

const chart = () => {
  Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
    (data) => {
      Highcharts.chart('container', {
        chart: {
          zoomType: 'x',
        },
        title: {
          text: 'USD to EUR exchange rate over time',
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? 'Click and drag in the plot area to zoom in'
              : 'Pinch the chart to zoom in',
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: 'Exchange rate',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get('rgba'),
                ],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [
          {
            type: 'area',
            name: 'USD to EUR',
            data: data,
          },
        ],
      });
    }
  );
};

btn.addEventListener('click', async (e) => {
  let data = Highcharts.charts[0].series[0].data;
  let excel = [];
  for (let item of data) {
    let date = item.options.x;
    let value = item.options.y;
    let newDate = new Date(date);
    const obj = { DATE: newDate, 'USD TO EUR': value };
    excel.push(obj);
  }
  let ws = XLSX.utils.json_to_sheet(excel);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Time Series');

  XLSX.writeFile(wb, 'data.xlsx');
});
