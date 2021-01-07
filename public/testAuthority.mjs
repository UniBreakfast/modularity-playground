export async function testAuthority(authority) {

  const adminId = await authority.register('admin', 'strong')

  console.log(adminId ? 'admin registered' : 'register admin failed')


}
