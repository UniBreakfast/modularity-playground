export async function testAuthority(authority) {

  const adminId = await authority.register('admin', 'strong')

  console.log(adminId ? 'admin registered' : 'register admin failed')


  const session = await authority.startSession('admin', 'strong')

  console.log(session ? 'admin session started' : 'admin session start failed')


  const {sessionId, token} = session

  const account = await authority.continueSession(sessionId, token)

  console.log(account ? 'admin session used' : 'admin session failed')

}
