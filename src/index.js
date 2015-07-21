import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main({DOM}) {
  const changeWeight$ = DOM.get('#weight', 'input')
    .map(ev => ev.target.value);

  const changeHeight$ = DOM.get('#height', 'input')
    .map(ev => ev.target.value);

  const state$ = Cycle.Rx.Observable.combineLatest(
    changeWeight$.startWith(70),
    changeHeight$.startWith(170),
    (weight, height) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));

      return {weight, height, bmi};
    }
  );

  return {
    DOM: state$.map(({weight, height, bmi}) =>
      h('div', [
        h('div', [
          'Weight ' + weight + 'kg',
          h('input#weight', {type: 'range', min: 40, max: 140, value: weight})
        ]),
        h('div', [
          'Height ' + height + 'cm',
          h('input#height', {type: 'range', min: 140, max: 210, value: height})
        ]),
        h('h2', 'BMI is ' + bmi)
      ])
    )
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
