// write your code here

const baseUrl = 'http://localhost:3000/'
const baseImages = baseUrl + 'images'
const baseComments = baseUrl + 'comments'
const cardTitle = document.getElementById('card-title')
const likeCount = document.getElementById('like-count')
const cardImage = document.getElementById('card-image')
const commentsList = document.getElementById('comments-list')
const likeButton = document.getElementById('like-button')
const commentForm = document.getElementById('comment-form')
const commentInput = document.getElementById('comment')
const btn = document.querySelector('.comment-button')
console.log(baseImages)
console.log(baseComments)

let currentLikes = 0

// 1. See the image received from the server, including its title, likes and
//    comments when the page loads.You will need to make a GET request to the
//    following endpoint to retrieve the image data, along with its associated
// comments:

// need function to get images+data from server
// invoke function on page load
// display page based on data

//fetch

const fetchFlat = () => {
    fetch(baseImages)
        .then(resp => resp.json())
        .then(res => {
            res.forEach(element => {
                updateCard(element)
            })
        })
    fetch(baseComments)
        .then(resp => resp.json())
        .then(res => {
            removeAllChildNodes(commentsList)
            res.forEach(element => {
                updateComments(element)
            })
        })
}


// update card
const updateCard = (obj) => {
    cardTitle.textContent = obj.title
    hideOnClick(cardTitle, cardImage)
    cardImage.src = obj.image
    enableNewDog(cardImage)
    likeCount.textContent = obj.likes
    currentLikes = obj.likes
};

// update comments
const updateComments = (obj) => {
    let li = document.createElement('li')
    if (typeof (obj) == 'object') {
        li.innerText = obj.content
    } else li.innerText = commentInput.value
    commentsList.append(li)
    allowClickRemove(li)
}

// clear comments

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// increment likes on btn click
likeButton.addEventListener('click', (e) => {
    currentLikes++
    likeCount.textContent = currentLikes
})

// form listener

commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let li = document.createElement('li')
    updateComments()
})

// Bonus 1
// remove comment handler

const allowClickRemove = (htmlEl) => {
    htmlEl.addEventListener('click', (e) => {
        e.target.remove()
    })
}

// hide on click //  bonus 2
const hideOnClick = (htmlEl, toHide) => {
    htmlEl.addEventListener('click', (e) => {
        if (toHide.style.display === "none") {
            toHide.style.display = "block";
        } else {
            toHide.style.display = "none";
        }
    })
}

// get new dog // bonus 3

const enableNewDog = (image) => {
    image.addEventListener('click', (e) => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(resp => resp.json())
            .then((result) => e.target.src = result.message)
    })
}

//invoke to render
fetchFlat()



