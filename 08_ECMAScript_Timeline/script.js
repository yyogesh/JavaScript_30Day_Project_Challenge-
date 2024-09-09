// JavaScript evolution events
const jsEvents = [
    {
        year: 1995,
        title: "JavaScript is Born",
        event: "Brendan Eich creates JavaScript in 10 days",
        description: "Brendan Eich developed JavaScript (initially called Mocha, then LiveScript) for Netscape Navigator. It was designed to add interactivity to web pages.",
        image: "images/1.png"
    },
    {
        year: 1997,
        title: "ECMAScript 1",
        event: "First edition of the ECMAScript specification is released",
        description: "ECMAScript 1 established the basic syntax and features of the language, including variables, functions, and basic control structures.",
        image: "images/2.png"
    },
    {
        year: 1998,
        title: "ECMAScript 2",
        event: "Minor update to align with ISO/IEC 16262 international standard",
        description: "This version made only editorial changes to keep the specification fully aligned with ISO/IEC 16262 international standard.",
        image: "images/3.png"
    },
    {
        year: 1999,
        title: "ECMAScript 3",
        event: "Added regular expressions, better string handling, new control statements, try/catch exception handling, and more",
        description: "ECMAScript 3 brought significant improvements and became the baseline for modern JavaScript. It was widely supported by major browsers for many years.",
        image: "images/4.png"
    },
    {
        year: 2009,
        title: "ECMAScript 5",
        event: "Introduced strict mode, JSON support, and various new methods",
        description: "ES5 added features like strict mode, JSON support, Array methods (forEach, map, filter, etc.), Object methods (create, defineProperty), and more.",
        image: "images/5.png"
    },
    {
        year: 2015,
        title: "ECMAScript 2015 (ES6)",
        event: "Major update with many new features and syntax improvements",
        description: "ES6 was a landmark release, introducing features like let/const, arrow functions, classes, modules, promises, template literals, destructuring, and more.",
        image: "images/6.png"
    },
    {
        year: 2016,
        title: "ECMAScript 2016",
        event: "Introduced exponentiation operator and Array.prototype.includes",
        description: "This release added the ** exponentiation operator and the Array.prototype.includes method for checking if an array includes a certain value.",
        image: "images/7.png"
    },
    {
        year: 2017,
        title: "ECMAScript 2017",
        event: "Added async/await, Object.values/Object.entries, and more",
        description: "ES2017 introduced async/await for better asynchronous programming, along with Object.values, Object.entries, and string padding methods.",
        image: "images/8.png"
    },
    {
        year: 2018,
        title: "ECMAScript 2018",
        event: "Added rest/spread properties, asynchronous iteration, and more",
        description: "This version introduced rest/spread properties, asynchronous iteration, Promise.finally(), and improvements to RegExp.",
        image: "images/9.png"
    },
    {
        year: 2019,
        title: "ECMAScript 2019",
        event: "Added Array.prototype.flat, Object.fromEntries, and more",
        description: "ES2019 brought Array.flat and flatMap, Object.fromEntries, String.prototype.trimStart/trimEnd, optional catch binding, and more.",
        image: "images/10.png"
    },
    {
        year: 2020,
        title: "ECMAScript 2020",
        event: "Introduced optional chaining, nullish coalescing, and BigInt",
        description: "ES2020 added features like optional chaining (?.), nullish coalescing (??), BigInt, Promise.allSettled, and the globalThis object.",
        image: "images/11.png"
    },
    {
        year: 2021,
        title: "ECMAScript 2021",
        event: "Added logical assignment operators, replaceAll, and more",
        description: "ES2021 introduced logical assignment operators (??=, &&=, ||=), String.prototype.replaceAll, Promise.any, and numeric separators.",
        image: "images/12.png"
    },
    {
        year: 2022,
        title: "ECMAScript 2022",
        event: "Top-level await, Private instance fields, methods and Static class fields and more",
        description: "2022 introduced Top-level await, Private instance fields, methods, Object: .hasOwn(), Erro cause property and Static class fields",
        image: "images/13.png"
    },
    {
        year: 2023,
        title: "ECMAScript 2023",
        event: "Added Array findLast(), findLastIndex(), toReversed(), toSorted(), Symbols as WeakMap Keys and more",
        description: "ES2023 added the findLast(), Hashbang Comments Array findLast(), findLastIndex(), toReversed(), toSorted() and Symbols as WeakMap Keys",
        image: "images/14.png"
    },
    {
        year: 2024,
        title: "ECMAScript 2024",
        event: "Added Object.groupBy(), Map.groupBy(),Temporal.PlainDate() and more",
        description: "ES2024 Grouping synchronous iterables, Promise.withResolvers(), New features for ArrayBuffers and SharedArrayBuffers and Atomics.waitAsync",
        image: "images/15.png"
    }
];


// Generate timeline events
const timeline = document.getElementById('timeline');
const infoPanel = document.getElementById('info-panel');
const infoPanelTitle = infoPanel.querySelector('h2');
const infoPanelImage = infoPanel.querySelector('img');
const infoPanelDescription = infoPanel.querySelector('p');

jsEvents.forEach(item => {
    const event = document.createElement('div');
    event.classList.add('event');
    event.innerHTML = `
      <div class="event-content">
            <span class="event-date">${item.year}</span>
            <h3 class="event-title">${item.title}</h3>
            <p>${item.event}</p>
            <div class="event-description">${item.description}</div>
        </div>
    `
    timeline.appendChild(event);

    event.addEventListener('click', () => {
        infoPanelTitle.textContent = item.title;
        infoPanelImage.src = item.image;
        infoPanelImage.alt = item.title;
        infoPanelDescription.textContent = item.description;
        infoPanel.classList.add('active');
    });
})

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,  // 50% of the element is visible
}


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    })
}, observerOptions)

document.querySelectorAll('.event').forEach(event => {
    observer.observe(event);
})

// Progress bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
}); 

// Add a "Back to Top" button
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #7b68ee;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    transition: opacity 0.3s ease;
    opacity: 0;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        setTimeout(() => {
            backToTopButton.style.opacity = '1';
        }, 50);
    } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => {
            backToTopButton.style.display = 'none';
        }, 300);
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


const title = document.querySelector('h1');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    title.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});