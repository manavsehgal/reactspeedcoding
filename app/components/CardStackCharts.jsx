import React from 'react';

import Card from './Card.jsx';
import { series, singleSeries, cloudSeries } from '../fixtures/charts/series';

const {
  // main component
  Chart,
  // graphs
  Bars, Cloud, Labels, Lines, Pies, RadialLines, Ticks,
  // wrappers
  Layer, Animate, Transform
} = require('rumble-charts');

export default class CardStack extends React.Component {
  constructor() {
    super();
    this.state = { series, cloudSeries, singleSeries, hovered: {} };
    this.updateSeries = this.updateSeries.bind(this);
  }
  updateSeries = () => {
    /* eslint-disable no-shadow, no-undef */
    const singleSeries = [{
      data: _.map(_.range(3), () => Math.random() * 100)
    }];
    const series = _.map(_.range(3), () => ({
      data: _.map(_.range(3), () => Math.random() * 100)
    }));
    this.setState({ series, cloudSeries, singleSeries, hovered: {} });
    /* eslint-enable no-shadow, no-undef */
  }
  render() {
    const gridClass = `grid grid-gutters grid-full
      grid-flex-cells large-grid-fit u-textCenter`;
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
              series={this.state.cloudSeries}
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
