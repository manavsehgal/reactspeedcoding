import React from 'react';

import Card from './Card.jsx';

const {
  // main component
  Chart,
  // graphs
  Bars, Dots, Lines, Pies, Labels, Ticks, Cloud,
  Transform, Handlers, Layer, Animate, RadialLines
} = require('rumble-charts');

const singleSeries = [{
  data: [1, 2, 4]
}];

const series = [{
  data: [1, 2, 3]
}, {
  data: [5, 7, 11]
}, {
  data: [13, 17, 19]
}];

const cloudSeries = [{
  data: [
    { label: 'Highcharts', y: 30 },
    { label: 'amCharts', y: 13 },
    { label: 'Google Charts', y: 31 },
    { label: 'ChartJS', y: 15 },
    { label: 'TauCharts', y: 8 },
    { label: 'FusionCharts', y: 2 },
    { label: 'ZingChart', y: 2 },
    { label: 'uvCharts', y: 1 },
    { label: 'jQuery Sparklines', y: 1 },
    { label: 'Ember Charts', y: 2 },
    { label: 'Canvas.js', y: 16 },
    { label: 'Flot', y: 1 },
    { label: 'D3.js', y: 27 },
    { label: 'n3-charts', y: 3 },
    { label: 'NVD3', y: 3 },
    { label: 'Chartist.js', y: 3 },
    { label: 'C3.js', y: 14 },
    { label: 'Cubism.js', y: 1 },
    { label: 'Rickshaw', y: 2 }
  ]
}];

export default class CardStack extends React.Component {
  constructor() {
    super();
    this.state = { series, cloudSeries, singleSeries };

    this.updateSeries = () => {
      /* eslint-disable no-shadow, no-undef */
      const singleSeries = [{
        data: _.map(_.range(3), () => Math.random() * 100)
      }];
      const series = _.map(_.range(3), () => ({
        data: _.map(_.range(3), () => Math.random() * 100)
      }));
      this.setState({ series, singleSeries });
      /* eslint-enable no-shadow, no-undef */
    };
  }
  render() {
    const gridClass = `grid grid-gutters grid-full
      grid-flex-cells large-grid-fit u-textCenter`;

    let hovered = null;
    function hideHovered() {
      if (hovered && hovered.circle) {
        hovered.circle.setAttribute('r', hovered.radius);
        hovered.circle.style.fillOpacity = hovered.opacity;
        if (hovered.label) {
          hovered.label.style.display = 'none';
        }
      }
    }

    function handleMouseMove({ closestPoints }) {
      const closest = closestPoints[0];
      if (!closest) {
        return;
      }
      const { seriesIndex, pointIndex } = closest;
      const circle = document.querySelector(`circle.dots-circle-${seriesIndex}-${pointIndex}`);
      if (!circle) {
        return;
      }
      hideHovered();
      const label = document.querySelector(`.labels-label-${seriesIndex}-${pointIndex}`);
      hovered
        = { circle, label, radius: circle.getAttribute('r'), opacity: circle.style.fillOpacity };
      circle.setAttribute('r', 5);
      circle.style.fillOpacity = 1;
      if (label) {
        label.style.display = 'block';
      }
    }

    function handleMouseLeave() {
      hideHovered();
    }
    return (
      <div>
        <h1>Chart Components</h1>
        <div className={gridClass}>
          <Card>
            <Chart onClick={this.updateSeries} width={300} height={200} series={this.state.series}>
              <Transform method={['transpose', 'stackNormalized']}>
                <Pies
                  colors="category10"
                  combined
                  innerRadius="33%"
                  padAngle={0.025}
                  cornerRadius={5}
                  innerPadding={2}
                  pieAttributes={{
                    /* eslint-disable no-return-assign, no-param-reassign */
                    onMouseMove: (e) => e.target.style.opacity = 1,
                    onMouseLeave: (e) => e.target.style.opacity = 0.5
                    /* eslint-enable no-return-assign, no-param-reassign */
                  }}
                  pieStyle={{ opacity: 0.5 }}
                />
              </Transform>
            </Chart>

          </Card>
          <Card>
            <Chart
              onClick={this.updateSeries}
              width={300}
              height={200}
              series={this.state.series}
              minY={0}
            >
              <Animate _ease="bounce" _ease="elastic">
                <Layer width="80%" height="80%" position="middle center">
                  <Handlers
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Ticks
                      axis="y"
                      ticks={{ maxTicks: 4 }}
                      tickVisible={({ tick }) => tick.y > 0}
                      lineLength="100%"
                      lineVisible
                      lineStyle={{ stroke: 'lightgray' }}
                      labelStyle={{
                        textAnchor: 'end',
                        alignmentBaseline: 'middle',
                        fontSize: '0.5em',
                        fill: 'lightgray'
                      }}
                      labelAttributes={{ x: -5 }}
                    />
                    <Ticks
                      axis="x"
                      label={({ tick }) => tick.x + 1}
                      labelStyle={{
                        textAnchor: 'middle',
                        alignmentBaseline: 'before-edge',
                        fontSize: '0.5em',
                        fill: 'lightgray'
                      }}
                      labelAttributes={{ y: 3 }}
                    />
                    <Bars
                      groupPadding="3%"
                      innerPadding="0.5%"
                      barAttributes={{
                        /* eslint-disable no-return-assign, no-param-reassign */
                        onMouseMove: e => e.target.style.fillOpacity = 1,
                        onMouseLeave: e => e.target.style.fillOpacity = 0.5
                        /* eslint-enable no-return-assign, no-param-reassign */
                      }}
                      barStyle={{
                        fillOpacity: 0.5
                      }}
                    />
                    <Lines lineWidth={2} />
                    <Dots className="dots" dotStyle={{ transition: 'all 250ms', fillOpacity: 0 }} />
                    <Labels
                      label={({ point }) => (`y=${Math.round(point.y)}`)}
                      dotStyle={{
                        textAnchor: 'middle',
                        dominantBaseline: 'text-after-edge',
                        fontFamily: 'sans-serif',
                        fontSize: '0.65em'
                      }}
                      labelAttributes={{
                        y: -4
                      }}
                    />
                  </Handlers>
                </Layer>
              </Animate>
            </Chart>
          </Card>
          <Card>
            <Chart
              onClick={this.updateSeries}
              width={300}
              height={200}
              series={this.state.series}
              minY={0}
            >
              <RadialLines />
            </Chart>
          </Card>
        </div>

        <div className={gridClass}>
          <Card>
            <Chart
              onClick={this.updateSeries}
              width={300}
              height={200}
              series={this.state.singleSeries}
              minY={0}
            >
              <Transform method={['transpose']}>
                <Layer width="80%" height="80%">
                  <Bars />
                </Layer>
                <Layer width="25%" height="25%" position="right bottom">
                  <Transform method="stack">
                    <Pies
                      combined
                      colors="category10"
                      pieStyle={{ opacity: 0.8 }}
                    />
                  </Transform>
                </Layer>
              </Transform>
            </Chart>
          </Card>
          <Card>
            <Chart
              onClick={this.updateSeries}
              width={300}
              height={200}
              series={this.state.series}
              minY={0}
            >
              <Transform method={['transpose', 'stack']}>
                <Pies
                  combined
                  innerPadding="3%"
                  innerRadius="20%"
                />
              </Transform>
            </Chart>
          </Card>
          <Card>
            <Chart
              onClick={this.updateSeries}
              width={300}
              height={200}
              series={cloudSeries}
              minY={0}
            >
              <Transform method="transpose">
                <Cloud
                  font="Arial"
                  minFontSize={12}
                  maxFontSize={36}
                  padding={2}
                />
              </Transform>
            </Chart>
          </Card>
        </div>
      </div>
    );
  }
}
