/*
const fetchApi = (url, repo) => {
  const GITHUB_USERNAME = 'foo'
  const GITHUB_TOKEN = 'ghp_xxx'
  const apiUrl = 'https://api.github.com/repos/' + url.split('/').slice(3).join('/')
  console.log(apiUrl)
  const headers = new Headers()
  headers.set('Authorization', 'Basic ' + btoa(GITHUB_USERNAME + ":" + GITHUB_TOKEN))
  fetch(url, { headers: headers })
    .then(res => res.json())
    .then((data) => {
      console.log(data.stargazers_count)
      repo.insertAdjacentHTML('afterend', ` <span>(${data.stargazers_count} $ {svgStar})</span>`)
    })
}
*/

const ghApi = (url) => {
  return fetch(`https://api.github.com${url}`).then(res => res.json())
}

const isGithubPullsPage= () => {
  if (window.location.href.startsWith('https://github.com/')) {
    return true
  }
  // TODO: naive af
  if (window.location.href.contains('/pulls')) {
    return true
  }
  return false
}

const enrichPulls = () => {
  if(!isGithubPullsPage()) {
    return
  }

  // does auth work?
  ghApi('/repos/ddnet/ddnet/pulls/10773').then((d) => console.log(d))
}

enrichPulls()

