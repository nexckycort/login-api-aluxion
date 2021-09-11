export const restorePasswordHtml = (url: string): string => /* html */ `<h1 style="
text-align: center;
font-family: Arial, Helvetica;
">Restore Password</h1>
<p style="font-family: Arial, Helvetica;">Hello, you have requested to reset your password, click on the following link to reset it, this link is temporary, so if it expires, request it again</p>

<a style="
display: block;
font-family: Arial, Helvetica;
padding: 1rem;
background-color: #00C897;
color: white;
text-transform: uppercase;
text-align: center;
text-decoration: none;
" href="${url}">Go to Reset Password</a>

<p style="font-family: Arial, Helvetica;">If you cannot access this link, visit : ${url}</p>

<p style="font-family: Arial, Helvetica;">If you did not request this email, you can ignore it</p>`

export const restorePasswordText = (url: string): string => `
Restore Password
Hello, you have requested to reset your password, click on the following link to reset it, this link is temporary, so if it expires, request it again
Reset password:
${url}
If you did not request this email, you can ignore it`
