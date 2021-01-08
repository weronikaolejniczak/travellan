import { Colors, Layout, Metrics } from 'constants';

export default {
  container: {
    ...Layout.fullSize,
    ...Metrics.bigPadding,
    ...Metrics.hugeTopPadding,
    backgroundColor: Colors.background,
  },
  scrollView: {
    ...Layout.fullSize,
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
