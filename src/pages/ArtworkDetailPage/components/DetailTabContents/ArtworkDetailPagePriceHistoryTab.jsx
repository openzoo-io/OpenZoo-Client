import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
  Line,
} from 'recharts';

import styles from '../../styles.module.scss';

export function ArtworkDetailPagePriceHistoryTab(props) {
  const { data } = props;

  return (
    <ReactResizeDetector>
      {({ width }) =>
        width > 0 ? (
          <div className={styles.chartWrapper}>
            <div className={styles.chart}>
              <LineChart
                width={width}
                height={250}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip />
                <CartesianGrid stroke="#eee" />
                <Line type="monotone" dataKey="price" stroke="#00a59a" />
              </LineChart>
            </div>
          </div>
        ) : (
          <div>{width}</div>
        )
      }
    </ReactResizeDetector>
  );
}
