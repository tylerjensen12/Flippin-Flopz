console.log('hello world')
const trickContainer = document.querySelector('ul')
const form = document.querySelector('form')
/*
// const trickInput = document.getElementById('input')
// const trickDiff = document.querySelector('span')


// const trickCallback = ({data: tricks}) => getTrick(tricks)

// function createTrick(body){
//     axios.post('/tricks', body)
//     .then(trickCallback)
//     .catch((error) => {
//         console.log(error)
//         })
// }
*/
function updateTrick(id, type){
    axios.put(`/tricks/${id}`, {type})
    .then(res => {
        trickContainer.innerHTML = ''
        console.log(res.data)
        makeTrickCard(res.data)
    })
    .catch((error) => {
    console.log(error)
    })
}

function makeTrickCard(tricks){
    let trickCard = document.createElement('div')
    trickCard.innerHTML = `<h2>${tricks.name}</h2>
    <div class="next">
    <button onclick="updateTrick(${tricks.id}, 'minus')">-</button>
    <p class="difficulty">Difficulty: </p>
    <p id="counter">${tricks.difficulty}</p>
    <button onclick="updateTrick(${tricks.id}, 'plus')">+</button>
    <button id="next" class="nextTrick" onclick="getTrick()">Next Trick</button>
    </div>
    <img src="/${tricks.gifAddress}">`
    trickCard.classList.add('trick')

    trickContainer.appendChild(trickCard)
    }
    
function submitTrick(event){
    event.preventDefault()

    let title = document.querySelector('#input')
    const rating = document.querySelector('input[name="difficulty"]:checked')
    const gif = document.querySelector('#gif')

    let bodyObj = {
        name: title.value,
        difficulty: rating.value,
        gif: gif.value
    }

    // createTrick(bodyObj)

    title.value = ''
    rating.checked = false
    gif.value = ''
}
    
    
function getTrick(){
    trickContainer.innerHTML = ''

    axios.get('/tricks')
    .then((res) => {
         let rand = Math.floor(Math.random() * res.data.length)
         console.log(rand)
        makeTrickCard(res.data[rand])
    })
    .catch((error) => {
        console.log(error)
    })
}

form.addEventListener('submit', submitTrick)

getTrick()