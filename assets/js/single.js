var issueContainerE1 = document.querySelector("#issues-container");

var limitWarningE1 = document.querySelector("#limit-warning");


var getRepoIssues = function(repo) {
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerE1.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        var issueE1 = document.createElement("a");
        var titleE1 = document.createElement("span");
        titleE1.textContent = issues [i].title;
        issueE1.appendChild(titleE1);
        var typeE1 = document.createElement("span");
        if (issues[i].pull_request) {
            typeE1.textContent = "(Pull request)";
        }
        else {
            typeE1.textContent = "(Issue)";
        }
        issueE1.appendChild(typeE1);
        issueE1.classList = "list-item flex-row justify-space-between align-center";
        issueE1.setAttribute("href", issues[i].html_url);
        issueE1.setAttribute("target", "_blank");
        issueContainerE1.appendChild(issueE1);
    }
};

var displayWarning = function(repo) {
    var linkE1 = document.createElement("a");
    linkE1.textContent = "See More Issues on GitHub.com";
    linkE1.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkE1.setAttribute("target", "_blank");
    limitWarningE1.appendChild(linkE1);
    limitWarningE1.textContent = "To see more than 30 issues, visit ";
};




getRepoIssues("facebook/react");