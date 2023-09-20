export const oktaConfig = {
    clientId:  '0oabes4xqz5x5yhTT5d7',
    issuer: 'https://dev-88243632.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}