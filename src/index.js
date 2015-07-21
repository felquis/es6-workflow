import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main(responses) {
  const requests = {
    DOM: responses.DOM.get('input', 'change')
      .map(event => event.target.checked)
      .startWith(false)
      .map(toggled =>
        h('label', [
          h('input', {type: 'checkbox'}), 'Toggle me',
          h('p', toggled ? 'ON' : 'OFF')
        ])
      )
  };

  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
