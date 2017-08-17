const refreshButtton = document.querySelector('.refresh');

const refreshClickStream = Rx.Observable.fromEvent(refreshButtton, 'click');

const startupRequestStream = Rx.Observable.of('https://api.github.com/users');

const requestOnRefreshStream = refreshClickStream
  .map(() => {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

// -----a---b---c---d---->
// s--------------------->
//         merge
// s----a---b---c---d---->


const responseStream = requestOnRefreshStream.merge(startupRequestStream)
  .flatMap(requestUrl => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));

responseStream.subscribe(response => console.log(response));

function createSuggestionStream(responseStream) {
  return responseStream.map(listUser => {
    return listUser[Math.floor(Math.random() * listUser.length)];
  });
}

const suggestion1Stream = createSuggestionStream(responseStream);
const suggestion2Stream = createSuggestionStream(responseStream);
const suggestion3Stream = createSuggestionStream(responseStream);

function renderSuggestion(userData, selector) {
  const element = document.querySelector(selector);

  const usernameEl = element.querySelector('.username');
  usernameEl.href = userData.html_url;
  usernameEl.textContent = userData.login;

  const imgEl = element.querySelector('img');
  imgEl.src = userData.avatar_url;
}

suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});
suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
});
suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion3');
});