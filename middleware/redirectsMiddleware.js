export default function (ctx) {
  const statusCode = 301 // na razie tymczasowe o kodzie 302, ale produkcyjnie będziemy używać kodu 301
  const fullPath = ctx.route.fullPath
  if (['/blog'].includes(fullPath)) ctx.redirect(statusCode, fullPath + '/')
}
