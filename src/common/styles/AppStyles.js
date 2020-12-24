import { Colors, Layout, Metrics } from 'constants';

export default {
  container: {
    ...Layout.fill,
    ...Metrics.bigPadding,
    ...Metrics.hugeTopPadding,
    backgroundColor: Colors.background,
  },
  scrollView: {
    ...Layout.fill,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    ...Metrics.bigPadding,
    ...Metrics.hugeTopPadding,
  },
  text: {
    color: Colors.text,
  },
};
