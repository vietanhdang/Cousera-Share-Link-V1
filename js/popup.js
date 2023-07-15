'use strict'

document.addEventListener('DOMContentLoaded', function () {
    var getShareLinkBtn = document.getElementById('getShareLinkBtn')
    var checkAllBtn = document.getElementById('checkAllReviewsBtn')
    getShareLinkBtn.addEventListener('click', function () {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                var tab = tabs[0]
                if (!tab.url.includes('submit')) {
                    alert('This is not a submission page!')
                    return
                }
                var customScript = `
                submissionId = document.getElementsByClassName("_10nd10j")[0].id;
                exists = document.getElementsByClassName('va-custom-tab');
                if (submissionId && (!exists || exists.length === 0)) {
                    submissionId = submissionId.split("~")[0];
                    let shareLink = window.location.href.split("/").slice(0, 8).join("/") + "/review/" + submissionId;
                    let assignmentTabs = document.getElementById("assignmentTabs");
                    let li = document.createElement("li");
                    li.setAttribute("role", "none");
                    li.setAttribute("class", "colored-tab va-custom-tab");
                    let a = document.createElement("a");
                    a.setAttribute("href", shareLink);
                    a.setAttribute("target", "_blank");
                    a.innerText = "Review Link";
                    li.appendChild(a);
                    assignmentTabs.appendChild(li);
                }
            `
                chrome.tabs.executeScript(tab.id, {
                    code: customScript,
                })
            }
        )
    })

    checkAllBtn.addEventListener('click', function () {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                var tab = tabs[0]
                // nếu không phải trang review thì không làm gì cả
                if (!tab.url.includes('review')) {
                    alert('This is not a review page!')
                    return
                }
                var customScript = `formParts = document.querySelectorAll('.rc-FormPart.body-1-text');
                formParts.forEach(formPart => {
                  radioInputs = formPart.querySelectorAll('input[type="radio"]');
                  if (radioInputs.length > 0) {
                    lastRadioInput = radioInputs[radioInputs.length - 1];
                    // lastRadioInput.checked = true;
                    lastRadioInput.nextElementSibling.click();
                  }
                });`
                // lấy ra các thẻ div có class .rc-FormPart.body-1-text
                chrome.tabs.executeScript(tab.id, {
                    code: customScript,
                })
            }
        )
    })
})
