async function addCustomTab() {
    let submissionId = document.getElementsByClassName('_10nd10j')[0]?.id
    let exists = document.getElementsByClassName('va-custom-tab')
    if (submissionId && (!exists || exists.length === 0)) {
        submissionId = submissionId.split('~')[0]
        let shareLink =
            window.location.href.split('/').slice(0, 8).join('/') +
            '/review/' +
            submissionId
        let assignmentTabs = document.getElementById('assignmentTabs')
        let li = document.createElement('li')
        li.setAttribute('role', 'none')
        li.setAttribute('class', 'colored-tab va-custom-tab')
        let a = document.createElement('a')
        a.setAttribute('href', shareLink)
        a.setAttribute('target', '_blank')
        a.innerText = 'Review Link'
        li.appendChild(a)
        assignmentTabs.appendChild(li)
    }
}

function executeExtension() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                addCustomTab()
            }
        }
    })

    observer.observe(document, { childList: true, subtree: true })
}

executeExtension()
