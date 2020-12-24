import { Colors, Layout, Metrics } from 'constants';

export default {
  container: {
    ...Layout.fill,
    ...Metrics.mediumPadding,
    ...Metrics.hugeTopPadding,
    backgroundColor: Colors.background,
  },
  scrollView: {
    ...Layout.fill,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    ...Metrics.mediumPadding,
    ...Metrics.hugeTopPadding,
  },
  text: {
    color: Colors.text,
  },
};
