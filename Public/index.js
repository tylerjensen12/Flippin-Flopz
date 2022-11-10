console.log('hello world')
const trickContainer = document.querySelector('ul')

function makeTrickCard(tricks){
    let trickCard = document.createElement('div')
    trickCard.innerHTML = `<h2>${tricks.name}</h2>
    <button class="next">Next Trick</button>
    <img src="/${tricks.gifAddress}">
    <video controls autoplay muted loop src="/${tricks.Address}"></video>`
    trickCard.classList.add('trick')


    trickContainer.appendChild(trickCard)

    // const trickElem = 
    // `<div class="card" id="trickName-${trickName}">
    //     <h2>${trickName}</h2>
    //     <button class="crashed">Crashed!</button>
    //     <button class="landed">Landed!</button>
    //     <img src="${link}">
    // </div>`
    // return trickElem
}

// function submitTrick(event){
//     let inputField = document.querySelector('#input')
//     const trick = document.createElement('li')
//     const trickName = document.createElement('span')

//     trickName.textContent = inputField.value
    
//     trick.appendChild(trickName)
// }

function getTrick(){
    axios.get('http://localhost:5454/tricks')
    .then((res) => {
        for(let i = 0; i < res.data.length; i++){
            makeTrickCard(res.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrick()