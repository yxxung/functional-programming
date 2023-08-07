// --------------------------------------------------------------------------
// 📌 [함수형 프로그래밍 기본 원칙]
// --------------------------------------------------------------------------
// - 함수는 하나 이상의 기능을 제공할 수 있습니다.
// - 하지만 FP에서 함수는 단 하나의 기능에 집중합니다.
// - 변하지 않는 변수에 대한 함수를 작성합니다.
// --------------------------------------------------------------------------


const dummyDocument = {
  body: {
    innerHTML: '',
  },
};


// --------------------------------------------------------------------------
// 함수는 하나 이상의 기능을 제공할 수 있습니다.
// - 일반적으로 함수를 작성할 때 여러 일을 처리하도록 구성합니다.

function fetchAndRenderAndLogAlbumList() {
  fetch('https://jsonplaceholder.typicode.com/album/1/photos?_start=0&_limit=4')
    .then((response) => response.json())
    .then((data) => {
      dummyDocument.body.innerHTML = `
        <ul class="albumList">
          ${data
            .map(
              ({ albumId, id, title, url, thumbnailUrl }) => 
              `
                <li class="albumItem">
                  <a class="albumLink" href="${url}">
                    <img class="albumThumbnail" src="${thumbnailUrl}" alt="" />
                    <div role="group" class="albumInfo">
                      <strong class="albumTitle">${title}</strong>
                      <span class="albumId">${albumId}</span>
                    </div>
                  </a>
                </li>
              `
            )
            .join('')}
        </ul>
      `;

      console.log(dummyDocument.body.innerHTML);
    })
    .catch((error) => console.error(error.message));
}

// fetchAndRenderAndLogAlbumList();


// --------------------------------------------------------------------------
// 함수는 단 하나의 기능에 집중합니다.
// - 위 함수 로직을 단 하나의 기능에 집중하도록 분리 구성해봅니다.

function fetchData() {}

function render() {}

function log() {}


function run() {
  // 데이터 패치(가져오기)
  // 데이터 기반 렌더링
  // 로그
}

// run();


// --------------------------------------------------------------------------
// 변하지 않는 변수에 대한 함수를 작성합니다.
// - 원본 데이터를 변형하지 않고, 새로운 데이터를 생성합니다.

const initialArray = ['c', 'd', 'a', 'e', 'b'];

// 정렬 함수를 구현합니다.
// sortBy<T>(data: T[], type: 'asc' | 'desc' = 'asc') => T[]
function sortBy(data) {
  return data;
}

const sortedArray = sortBy(initialArray);

console.assert(
	!Object.is(initialArray, sortedArray), 
	'🚨 initialArray와 sortedArray가 동일한 배열 객체입니다.'
);

console.log('initialArray\n', initialArray);
console.log('sortedArray\n', sortedArray);