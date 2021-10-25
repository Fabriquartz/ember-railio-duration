import { computed } from '@ember/object';
import convertUnit from 'ember-railio-convert-unit';

function add(a, b) {
  return a.valueOf() + b.valueOf();
}
function difference(a, b) {
  return b.valueOf() - a.valueOf();
}

export default function (startPropName, endPropName) {
  return computed(startPropName, endPropName, {
    get() {
      let start = this.get(startPropName);
      let end = this.get(endPropName);

      if (start instanceof Date && end instanceof Date) {
        return convertUnit(difference(start, end), 'milliseconds', 'hours');
      }

      return null;
    },

    set(key, value) {
      let start = this.get(startPropName);

      if (start instanceof Date) {
        let milliseconds = convertUnit(value, 'hours', 'milliseconds');
        let end = new Date(add(start, milliseconds));

        this.set(endPropName, end);

        return convertUnit(difference(start, end), 'milliseconds', 'hours');
      }
      return null;
    },
  });
}
