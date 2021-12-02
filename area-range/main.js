import { ranges, averages } from './data.js';
const chart = document.createElement('div');
document.body.appendChild(chart);
const form = document.getElementById('form');
const date = document.getElementById('date');
const higher = document.getElementById('higher');
const lower = document.getElementById('lower');

document.addEventListener('DOMContentLoaded', () => highChart());
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    date.value.trim() === '' ||
    higher.value.trim() === '' ||
    lower.value.trim() === ''
  )
    return alert('Hay campos por completar fecha');
  const newDate = Date.parse(date.value);
  const temHigher = parseFloat(higher.value);
  const tempLower = parseFloat(lower.value);
  const newRange = [newDate,tempLower,temHigher];
  const average = (temHigher + tempLower) / 2;
  const newAverange = [newDate, average];
  console.log(average);
  ranges.push(newRange);
  averages.push(newAverange);
  console.log(average);

  highChart();
});

const highChart = () => {
  window.chart = new Highcharts.chart({
    chart: {
      renderTo: chart,
      height: 400,
    },
    title: {
      text: 'December temperatures',
    },

    xAxis: {
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Range: Jan 1st 2021 to Dem 31st 2021.',
      },
    },

    yAxis: {
      title: {
        text: null,
      },
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '°C',
    },

    series: [
      {
        name: 'Temperature',
        data: averages,
        zIndex: 1,
        marker: {
          fillColor: 'white',
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[0],
        },
      },
      {
        name: 'Range',
        data: ranges,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  });
};
