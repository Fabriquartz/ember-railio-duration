import Ember from 'ember';
import qUnit  from 'qunit';
import { test } from 'ember-qunit';

import durationProperty from 'ember-railio-duration';

const { isEqual } = Ember;

const DurationModel = Ember.Object.extend({
  start: null,
  end:   null,

  duration: durationProperty('start', 'end')
});

qUnit.module('Unit | Computed Duration Property');

test('Duration is computed', function(assert) {
  const object = DurationModel.create({
    start: new Date(2000, 1, 1),
    end:   new Date(2000, 1, 1, 12, 15)
  });

  assert.equal(object.get('duration'), 12.25);
});

test('Setting duration computes end time', function(assert) {
  const object = DurationModel.create({
    start: new Date(2000, 1, 1),
    end:   new Date(2000, 1, 1, 12)
  });

  object.set('duration', 20);
  assert.ok(isEqual(object.get('end'), new Date(2000, 1, 1, 20)));
});
