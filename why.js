const streamA = Rx.Observable.of(3, 4);
const streamB = streamA.map(a => a * 10);

streamB.subscribe((b) => console.log(b));