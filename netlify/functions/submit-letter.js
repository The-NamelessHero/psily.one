const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { title, body } = JSON.parse(event.body);

  const res = await fetch('https://api.github.com/repos/psily/psily.github.io/issues', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({ title, body })
  });

  const result = await res.json();

  if (res.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, issueUrl: result.html_url })
    };
  } else {
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: result.message || 'Unknown error' })
    };
  }
};
