//@ts-check


const gallery = document.querySelector('#gallery');
const nbBots = document.querySelector('#nb-bots');

getContributors();

async function getContributors() {
    const response = await fetch('./contributors.json');
    const json = await response.json();
    const contributors = shuffle(json.contributors);
    
    nbBots.innerText = contributors.length;
    buildContributorsList(contributors);
}

function buildContributorsList(contributors) {

    for (const contributor of contributors) {
        gallery.insertBefore(createBot(contributor), gallery.lastChild);
    }
}

function createBot(contributor) {
    const template = `
        <div class="bot">
            <img src="./bots/${contributor.username}.png" loading="lazy"/>
            <a href="http://github.com/${contributor.username}" target="_new">${contributor.username}</a>
            <div class="message">
                ${contributor.message}
            </div>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(template);

    return fragment;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
  
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }