export const oktaConfig = {
    clientId:  '0oa9z0v1crCTNeL9X5d7',
    issuer: 'https://dev-70719039.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}