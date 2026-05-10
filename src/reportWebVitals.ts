import { onCLS, onFCP, onLCP, onTTFB, onINP, type MetricType } from 'web-vitals';

type ReportHandler = (metric: MetricType) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry);
  }
};

export default reportWebVitals;
