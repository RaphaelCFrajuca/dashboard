import fetch from "node-fetch";
import fs from 'fs';

const myHeaders = {
    "Notion-Version": "2022-02-22",
    "Authorization": "Bearer secret_Wp10VaZPt18ujPzwVgnKQWa7bE2e0vsUTRXwuYj0Pvd",
    "Content-Type": "application/json"
};

var raw = JSON.stringify({
    "sorts": [
      {
        "property": "Name",
        "direction": "ascending"
      }
    ]
  });

const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body:  raw
};

const teamMembersRequest = await fetch("https://api.notion.com/v1/databases/f612e6f6-65d7-4f57-a2f7-2a3326275c33/query", requestOptions);
const teamMembersResponse = await teamMembersRequest.json();
const teamMembers = [];

for(const teamMember of teamMembersResponse.results) {
    if(!teamMember.properties.ativo.checkbox) continue;
    
    const hasPhoto = teamMember.properties.Foto.files.length > 0;
    const member = {
        name: teamMember.properties.Name.title[0].plain_text,
        pronouns: teamMember.properties.Pronomes.multi_select[0].name,
        role: teamMember.properties.Cargo.select?.name ?? '',
    }

    if (hasPhoto) {
        const photoResponse = await fetch(teamMember.properties.Foto.files[0].file.url);
        const photoBuffer = await photoResponse.buffer();
        const photoBase64 = photoBuffer.toString('base64');

        member.photo = photoBase64;
    }

    teamMembers.push(member);
}


fs.writeFile('../team.json', JSON.stringify(teamMembers), { flag: 'wx' }, function (err) {
    if (err) throw err;
    console.log("It's saved!");
});

