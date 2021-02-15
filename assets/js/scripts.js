document.addEventListener("DOMContentLoaded", function() {
  getPostsViaAjax();
});

const getPostsViaAjax  = () => {

  const url = "https://vision.squidit.com.br/v1/feed/test"

  fetch(url)
    .then(resp => resp.json())
    // .then(json => console.log(json))
    .then(json => json.medias.forEach(element => {
      const linkImagem = element.imagens.thumbnail.url 
      replicaImagens(linkImagem)     
    }))
}

const replicaImagens = linkImagem => {

  const post = document.createElement("div")
  post.classList.add("post")

  const img = document.createElement("img")
  img.classList.add("post-img")
  img.src = linkImagem

  post.appendChild(img)

  const overlay = document.createElement("div")
  overlay.classList.add("overlay")

  const details = document.createElement("div")
  details.classList.add("details")
  details.innerHTML = `<span><i class="fas fa-heart"></i> 200</span><span><i class="fas fa-heart"></i> 200</span><span><i class="fas fa-heart"></i> 200</span>`

  overlay.appendChild(details)

  post.appendChild(overlay)

  const squidposts = document.querySelector("div[squid-posts]")
  squidposts.appendChild(post)

}