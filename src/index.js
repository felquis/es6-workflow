import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main({DOM}) {
  const action$ = Cycle.Rx.Observable.merge(
    DOM.get('.decrement', 'click').map(() => -1),
    DOM.get('.increment', 'click').map(() => +1)
  );

  const count$ = action$.startWith(0).scan((x, y) => x + y);

  return {
    DOM: count$.map(count =>
        h('div', [
          h('button.decrement', 'Decrement'),
          h('button.increment', 'Increment'),
          h('p', 'Counter: ' + count)
        ])
      )
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
