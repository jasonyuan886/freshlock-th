import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = 'Ov23liOhWk7DLu1KMZwe';
const CLIENT_SECRET = '64f8f56974bdf6a5b8a789c6c80b887955859822';
const ORIGIN = 'https://www.freshlocksealer.com';
const REDIRECT_URI = `${ORIGIN}/api/auth`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Step 1: No code → redirect to GitHub OAuth
  if (!code && !error) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', CLIENT_ID);
    githubAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    githubAuthUrl.searchParams.set('scope', 'repo,user');
    githubAuthUrl.searchParams.set('response_type', 'code');
    return NextResponse.redirect(githubAuthUrl.toString(), 302);
  }

  // Step 2: User denied
  if (error) {
    const errMsg = JSON.stringify({ error: error || 'access_denied', provider: 'github' });
    const msg = JSON.stringify(`authorization:github:error:${errMsg}`);
    return new NextResponse(
      `<!doctype html><html><body><script>
(function(){
  function receive(e){
    window.opener.postMessage(${msg}, e.origin);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  // Step 3: Exchange code for token
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      const errMsg = JSON.stringify({
        error: tokenData.error_description || tokenData.error || 'token_exchange_failed',
        provider: 'github'
      });
      const msg = JSON.stringify(`authorization:github:error:${errMsg}`);
      return new NextResponse(
        `<!doctype html><html><body><script>
(function(){
  function receive(e){
    window.opener.postMessage(${msg}, e.origin);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    const token = tokenData.access_token;
    const successData = JSON.stringify({ token: token, provider: 'github' });
    const msg = JSON.stringify(`authorization:github:success:${successData}`);

    return new NextResponse(
      `<!doctype html><html><body><script>
(function(){
  function receive(e){
    console.log("receiveMessage %o", e);
    window.opener.postMessage(${msg}, e.origin);
  }
  window.addEventListener("message", receive, false);
  console.log("Sending message: %o", "github");
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (e: any) {
    const errMsg = JSON.stringify({ error: 'server_error', provider: 'github' });
    const msg = JSON.stringify(`authorization:github:error:${errMsg}`);
    return new NextResponse(
      `<!doctype html><html><body><script>
(function(){
  function receive(e){
    window.opener.postMessage(${msg}, e.origin);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
