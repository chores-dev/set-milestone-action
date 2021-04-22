const fs = require('fs');
const https = require('https');

console.log('\u001b[30;40m--~~~=:>[%s]>\u001b[0m', 'milestone');
console.log('\u001b[30;40m¸¸♬·¯·♩¸¸♪·¯·♫¸¸%s¸¸♬·¯·♩¸¸♪·¯·♫¸¸\u001b[0m', process.env.INPUT_MILESTONE);

const data = JSON.stringify({
    actor: process.env.GITHUB_ACTOR,
    repository: process.env.GITHUB_REPOSITORY,
    sha: process.env.GITHUB_SHA,
    milestone: process.env.INPUT_MILESTONE,
    workflow: {
        action: process.env.GITHUB_ACTION,
        jobId: process.env.GITHUB_JOB,
        runId: process.env.GITHUB_RUN_ID,
        runNumber: process.env.GITHUB_RUN_NUMBER,
    },
    event: {
        name: process.env.GITHUB_EVENT_NAME,
        payload: JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH)),
    },
});

const options = {
    hostname: 'github-actions.chores.dev',
    port: 443,
    path: '/milestone',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    },
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
});

req.on('error', error => {
    console.error(error)
});

req.write(data);
req.end();
