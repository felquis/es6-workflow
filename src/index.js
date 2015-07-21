import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';

function main(drivers) {
  return {
    DOM: drivers.DOM.get('input', 'click')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        h('div', [
          h('input', {type: 'checkbox', checked: toggled}), 'Toggle me',
          h('p', toggled ? 'ON' : 'off')
        ])
      )
  };
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
