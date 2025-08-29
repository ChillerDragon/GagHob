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

const annotatePr = (prId) => {
  ghApi(`/repos/ddnet/ddnet/pulls/${prId}`).then((data) => {
    // console.log(data.rebaseable)
    // console.log(data)

    if(data.rebaseable) {
      console.log(`pr ${prId} is rebaseable`)
    }
  })
}

const setPrIcon = (prDiv) => {
  // we can not use the ghIconDiv because github already patches that with ajax
  // never mind github nukes the entire thing it seems
  // maybe we just need a timeout instead
  const ghIconDiv = prDiv.querySelector('.commit-build-statuses')
  ghIconDiv.parentElement.insertAdjacentHTML('beforeend', '<div>GagHob: STATUS UNKNOWN</div>')
}

const listPrs = () => {
  const prDivs = document.querySelectorAll('[data-issue-and-pr-hovercards-enabled][aria-label="Issues"] > div > div')
  prDivs.forEach((prDiv) => {
    // const prId = prDiv.id.split('_')[1]
    setPrIcon(prDiv)
  })
}

const enrichPulls = () => {
  if(!isGithubPullsPage()) {
    return
  }

  // this is extremly ugly and depends on network speed
  // full on race condition!
  // there might be a way to listen for the hotwire event github uses to refresh the list
  setTimeout(() => {
    listPrs()
  }, 1000)

  // annotatePr(10773)
}

enrichPulls()

