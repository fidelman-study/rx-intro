const requestStream = Rx.Observable.of('https://api.github.com/users');

const responseStream = requestStream
  .flatMap(requestUrl => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));

responseStream.subscribe(response => console.log(response));