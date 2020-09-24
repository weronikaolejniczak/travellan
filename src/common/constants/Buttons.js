import * as Colors from './Colors';
import * as Metrics from './Metrics';
import * as Typography from './Typography';

export const base = {
  alignItems: 'center',
  marginRight: Metrics.smallest,
  marginVertical: Metrics.tiny,
}

export const text = {
  color: Colors.white,
  fontSize: Typography.smallestFontSize,
  fontWeight: 'bold',
  letterMetrics: 1,
}

export const textUnselected = {
  ...text,
  color: Colors.mediumGray,
}

export const small = {
  paddingHorizontal: Metrics.small,
  paddingVertical: Metrics.small + 2,
  width: 75,
}

export const large = {
  paddingHorizontal: Metrics.large,
  paddingVertical: Metrics.large + 4,
}

export const rounded = {
  borderRadius: 50,
}

export const selected = {
  backgroundColor: Colors.selected,
}

export const unselected = {
  backgroundColor: Colors.unselected,
}

export const smallRounded = {
  ...base,
  ...small,
  ...rounded,
};
