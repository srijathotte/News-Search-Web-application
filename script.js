const apiKey='8b3e43742d1a4730909ff35cd783d441'
const blogContainer=document.getElementById("blog-container")
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')
 async function fetchRandomNews(){
    try{
      const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apiKey}`
        const responce=await fetch(apiUrl)
        const data=await responce.json();
        return data.articles;
    }
    catch(error){
   console.log("Error fetching randomnews",error);
    return[]
    }
}
searchButton.addEventListener("click",async ()=>{
  const query=searchField.value.trim()
  if(query!==""){
    try{
     const articles=await fetchNewsQuery(query)
     displayBlogs(articles)
    }catch(error){
      console.log("Error fetching news by query",error);
      
    }
  }
})

async function fetchNewsQuery(query){
  try{
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`
      const responce=await fetch(apiUrl)
      const data=await responce.json();
      return data.articles;
  }
  catch(error){
 console.log("Error fetching randomnews",error);
  return[]
  }
}
function displayBlogs(articles){
  blogContainer.innerHTML="";
  articles.forEach((article)=>{
    const blogCard=document.createElement('div')
    blogCard.classList.add("blog-card")
    const img=document.createElement("img")
    img.src=article.urlToImage
    img.alt=article.title
    const title=document.createElement("h2")
    // title.textContent=article.title
    const truncatedTitle=article.title.length>30?article.title.slice(0,30)+"....":article.title;
    title.textContent=truncatedTitle;
    const description=document.createElement("p")
    const truncatedDes=article.description.length>120?article.description.slice(0,120)+"....":article.description;
    description.textContent=truncatedDes;
  
    blogCard.appendChild(img)
    blogCard.appendChild(title)
    blogCard.appendChild(description)
    blogCard.addEventListener("click",()=>{
      window.open(article.url, "_blank");
    })
    blogContainer.appendChild(blogCard)
  })
}
(async ()=>{
  try{
   const articles=await fetchRandomNews()
   displayBlogs(articles);
  }catch(error){
    console.log("Error fetching random news",error);
  }
})();