
const arrayPages = []

document.addEventListener("DOMContentLoaded", function() {

  getPostsViaAjax();

});

const getPostsViaAjax  = (newUrl = null) => {

  let url = "https://vision.squidit.com.br/v1/feed/test"

  if(newUrl){

    const encodeNewUrl = encodeURIComponent(newUrl) 
    url = `https://vision.squidit.com.br/v1/feed/test?nextUrl=${encodeNewUrl}`
  }

  fetchLoader(url)
    .then(resp => resp.json())
    .then(json => {

      const maxid = json.pagination.max_id

      if(!arrayPages.includes(maxid)){
        arrayPages.push(maxid)
        iteraPosts(json.medias, maxid)
        const nextUrl = json.pagination.next_url
        document.addEventListener('scroll', e => loadData(e, nextUrl)) 
      }

    })
    .then(setTimeout(hideLoader, 5000))
}

const iteraPosts = (medias) => {
  medias.forEach(element => {

    const imageLink = element.imagens.thumbnail.url 
    const user = element.usuario.username
    const upvotes = element.upvotes
    const comments = element.comentarios
    const postLink = element.link

    let createdAt = new Date(element.criadoEm)
    createdAt = dateFormat(createdAt)

    replicaImagens(imageLink, user, upvotes, comments, createdAt, postLink) 

  })
}

const loadData = (e, url) => {
  const windowHeight = window.screen.height
  const documentHeight = document.body.clientHeight
  const scrollTop =  window.pageYOffset || document.documentElement.scrollTop

  // console.log(`${url}`)

  if( documentHeight <= (scrollTop + windowHeight) ){
    getPostsViaAjax(url)
  }
}

const dateFormat = date => {
  const day = addZero(date.getDate()).toString()
  const month = addZero(date.getMonth() + 1).toString()
  const year = date.getFullYear()
  const hour = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

  return ` ${day}/${month}/${year} ${hour}`
}

const addZero = number => number <= 9 ? "0" + number : number;

const replicaImagens = (imageLink, user, upvotes, comments, createdAt, postLink) => {

  const post = document.createElement("div")
  post.classList.add("post")
  post.setAttribute('onclick', `openPost('${postLink}')`)

  const img = document.createElement("img")
  img.classList.add("post-img")
  img.src = imageLink

  post.appendChild(img)

  const overlay = document.createElement("div")
  overlay.classList.add("overlay")

  const details = document.createElement("div")
  details.classList.add("details")
  details.innerHTML = `<p><i class="fas fa-at"></i> ${user}</p>
                       <p><i class="fas fa-heart"></i> ${upvotes}</p>
                       <p><i class="fas fa-comment"></i> ${comments}</p> 
                       <p><i class="fas fa-calendar"></i> ${createdAt}</p>`

  overlay.appendChild(details)

  post.appendChild(overlay)

  const squidposts = document.querySelector("div[squid-posts]")
  squidposts.appendChild(post)
}

const openPost = (link) => window.open(link)

const fetchLoader = (url) => {
  const loading = document.getElementById("loading")
  loading.classList.remove("hidden")

  return fetch(url)
}

const hideLoader = () => {
  const loading = document.getElementById("loading")
  loading.classList.add("hidden")
}