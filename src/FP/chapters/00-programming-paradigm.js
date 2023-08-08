// --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
// --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// console.log('courses 원본 데이터\n', courses);

// 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
// 2. 과정 배열을 순환하여 각 과정 이름 대문자화

// ES2015(v6)
// [전개구문(spread syntax)]을 사용하면 배열을 복사할 수 있다.
// 얕은 복사 (shallow copy)
const updateCourses = [] // [...courses];

// [기능 1.] 좌우 공백 제거
// 명령형으로 프로그래밍 한다.
// C, JAVA 문법
// for문
for(let i=0, l=courses.length; i<l; i = i + 1) {
  // 객체 복제는 어떻게???
  // [전개구문(spread syntax)]을 사용한다.
  // 얕은 복사 (shallow copy)
  const course = { ...courses[i] };
  course.name = course.name.trim();
  updateCourses.push(course);
}

// [기능 2.] 대문자화
for(let i=0, l=updateCourses.length; i<l; ++i) {
  const course = updateCourses[i];
  course.name = course.name.toUpperCase();
}

// 3. 배열 원소의 name 속성의 공백을 밑줄(_)로 변경하는 기능 추가
// 명령형 프로그래밍 방식으로
for(let i=0, l=updateCourses.length; i<l; ++i) {
  const course = updateCourses[i];
  course.name = course.name.replaceAll(' ', '_')
}


// console.log('courses 변형된 데이터\n', updateCourses);

console.assert(!Object.is(courses, updateCourses), '🚨 courses와 updateCourses는 동일한 객체이다.');

// --------------------------------------------------------------------------
// 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// console.log('subjects 원본 데이터 \n', subjects)

// 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언
function toTrim(object) {
  const o = {...object};
  o.name = o.name.trim();

  return o;
}

// 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const o = {...object};
  o.name = o.name.toUpperCase();

  return o;
}

// 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가
// 선언형 프로그래밍 방식으로
function convertSpaceToUnderscore(object) {
  const o = {...object};
  o.name = o.name.replace(/\s+/g, '_');

  return o;
}

// 4. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
// ES5의 map을 사용해야 한다.
// - 조건 1. 새로운 배열 반환
// - 조건 2. 배열 순환 후, 기능 처리(적용)

// const updateSubjects = subjects.map(subject => {
//   const copySubject = toTrim(subject);
//   return copySubject;
// }).map(subject => {
//   const copySubject = toUpperCase(subject);
//   return copySubject;
// })

// const updateSubjects = subjects.map(toTrim).map(toUpperCase);

const updateSubjects = subjects.map(toTrim).map(toUpperCase).map(convertSpaceToUnderscore);

// console.log('subjects 업데이트 데이터 \n', updateSubjects)


// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.

function createCountUpButton(container, {count: initialCount = 0, step = 1, max = 100} = {}) { // default parameter
  if(!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error('container는 문서의 요소가 아닙니다.')
  }

  let count = initialCount;

  const countUpbutton = document.createElement('button');

  const render = (newCount) => {
    countUpbutton.textContent = String(newCount);
  }

  const handleCountUp = (e) => {
    count += step; // 2
    if(count >= max) count = max;
    render(count); // 2
  }

  countUpbutton.setAttribute('type', 'button');
  countUpbutton.classList.add('CountUpButton');
  countUpbutton.addEventListener('click', handleCountUp) // 2

  render(count); // 1

  container.append(countUpbutton);
}

const demoContainer = document.getElementById('demo');

// 재사용을 목적으로 하는 컴포넌트(함수로 구현)
// 기본 옵션 : {count: 0, step: 1, max: 10}
createCountUpButton(demoContainer, { count: 1 }); // 사용자 정의 옵션
createCountUpButton(demoContainer, { count: 2 });
createCountUpButton(demoContainer, { count: 3, step: 2 });
createCountUpButton(demoContainer, { count: 3, step: 2, max: 10});

// 과제
// `max` prop을 추가하고, count값이 max보다 커지면 사용자가 더 이상 버튼을 누를 수 없도록 막는다.
// `max` prop을 추가하고, count값이 max보다 커지면 화면의 카운트는 버튼을 눌러도 max 값에 머무른다.





// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

// 붕어빵 틀(생성자함수: 클래스) => 붕어빵(객체: 인스턴스)
// class CountUpButton {
//   constructor(userOptions) {
//     this.#config = {...CountUpButton.defaultProps, ...userOptions}
//     this.init();
//   }

//   init() {
//     console.log(this.#config);
//   }

//   // static field
//   static defaultProps = {
//     count: 0,
//     step: 1,
//   };
// }

// // 전역에서도 defaultProps에 접근하는 방법
// globalThis.CountUpButton = CountUpButton;

// // 새로운 붕어빵(객체 : 인스턴스 ) 생성
// const firstCountUp = new CountUpButton({
//   // defaultProps 사용자 전달 옵션에 접근하겠다..물론 constructor에서
//   count: 2,
//   step: 7
// });

// const demoContainer = document.querySelector('#demo');

// demoContainer.append(firstCountUp.render())


// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)
