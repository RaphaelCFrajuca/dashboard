

fetch('./team.json').then(handleTeamResponse);

function handleTeamResponse(response) {
    response.json().then(teamMembers => {
        teamMembers.forEach(teamMember => {
            const card = document.createElement('div');
            card.className = 'teamcard';

            const image = document.createElement('img');
            image.className = 'avatarteam';
            if (teamMember.photo) {
                image.src = `data:image/png;base64, ${teamMember.photo}`;
            }
            else {
                image.src = 'src/images/teamcardimg.png';
            }

            const name = createCardContent('nome', teamMember.name);
            const pronouns = createCardContent('pronomes', teamMember.pronouns);
            const role = createCardContent('cargo', teamMember.role);

            card.append(image);
            card.append(pronouns);
            card.append(name);
            card.append(role);

            document.querySelector(".team").append(card);
        });
    })
}

function createCardContent(className, value) {
    const text = document.createElement('p');
    text.className = className;
    text.innerHTML = value;

    return text;
}