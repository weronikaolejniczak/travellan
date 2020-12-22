import { Colors, Layout, Metrics } from 'constants';

export default {
  container: {
    ...Layout.fill,
    ...Metrics.bigPadding,
    backgroundColor: Colors.background,
  },
  scrollView: {
    ...Layout.fill,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    ...Metrics.bigPadding,
  },
  text: {
    color: Colors.text,
  },
};
