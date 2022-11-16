const trickContainer = document.querySelector('ul')
const form = document.querySelector('form')


function updateTrick(id, type){
    axios.put(`/tricks/${id}`, {type})
    .then(res => {
        trickContainer.innerHTML = ''
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
    <iframe src="${tricks.gifAddress}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    // <img src="/${tricks.gifAddress}">
    trickCard.classList.add('trick')
    
    trickContainer.appendChild(trickCard)
}

function submitTrick(event){
    event.preventDefault()

    const title = document.querySelector('#input')
    const gif = document.getElementById('gif')
    const rating = document.getElementsByName('difficulty')
    
    function displayValue() {
        let ans = 0
        for(let i = 0; i < rating.length; i++){
            if(rating[i].checked){
                ans = rating[i].value
            }
        }
        return ans
    }

    // function submitFile() {
    //     let theFile = gif.files[0]
    
    //     let formData = new FormData()
    //     formData.append('name', title.value)
    //     formData.append('difficulty', displayValue())
    //     formData.append('gifAddress', theFile)
    // }
    
    let bodyObj = {
        name: title.value,
        difficulty: displayValue(),
        gifAddress: gif.value
    }
    
    createTrick(bodyObj)

    title.value = ''
    for(let i = 0; i < rating.length; i++){
        rating[i].checked = false
    }
    gif.value = ''
}

function createTrick(body){
    axios.post('/tricks', body)
    .then(alert('You made a new trick!'))
    .catch((error) => {
        console.log(error)
        })
}

function getTrick(){
    trickContainer.innerHTML = ''
    
    axios.get('/tricks')
    .then((res) => {
         let rand = Math.floor(Math.random() * res.data.length)
        makeTrickCard(res.data[rand])
    })
    .catch((error) => {
        console.log(error)
    })
}

form.addEventListener('submit', submitTrick)

getTrick()