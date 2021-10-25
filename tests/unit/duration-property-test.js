import { isEqual } from '@ember/utils';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';

import durationProperty from 'ember-railio-duration';

// eslint-disable-next-line ember/no-classic-classes
const DurationModel = EmberObject.extend({
  start: null,
  end: null,

  duration: durationProperty('start', 'end'),
});

module('Unit | Computed Duration Property', function () {
  test('Duration is computed', function (assert) {
    let object = DurationModel.create({
      start: new Date(2000, 1, 1),
      end: new Date(2000, 1, 1, 12, 15),
    });

    assert.equal(object.get('duration'), 12.25);
  });

  test('Setting duration computes end time', function (assert) {
    let object = DurationModel.create({
      start: new Date(2000, 1, 1),
      end: new Date(2000, 1, 1, 12),
    });

    object.set('duration', 20);
    assert.ok(isEqual(object.get('end'), new Date(2000, 1, 1, 20)));
  });
});
