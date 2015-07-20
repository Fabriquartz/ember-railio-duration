import Ember from 'ember';
import convertUnit from 'ember-railio-convert-unit';

const { computed } = Ember;

function add(a, b)        { return a.valueOf() + b.valueOf(); }
function difference(a, b) { return b.valueOf() - a.valueOf(); }

export default function(startPropName, endPropName) {
  return computed(startPropName, endPropName, {
    get: function() {
      const start = this.get(startPropName);
      const end   = this.get(endPropName);

      if (start instanceof Date && end instanceof Date) {
        return convertUnit(difference(start, end), 'milliseconds', 'hours');
      }
    },

    set: function(key, value) {
      const start = this.get(startPropName);

      if (start instanceof Date) {
        const milliseconds = convertUnit(value, 'hours', 'milliseconds');
        const end          = new Date(add(start, milliseconds));

        this.set(endPropName, end);

        return convertUnit(difference(start, end), 'milliseconds', 'hours');
      }
    }
  });
}
