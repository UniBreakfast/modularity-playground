poll()


async function poll(id) {
  const options = id ? [{method: 'GET', headers: {'poll-id': id}}] : []
  const resp = await fetch('/updates', ...options)

  if (resp.ok) {
    console.log((await resp.json()).updates)
    if (!id) id = resp.headers.get('poll-id')
  } else {
    console.log(resp.statusText)
  }


  await sleep(1000)

  poll(id)
}


function sleep(dur) {
  return new Promise(resolve => setTimeout(resolve, dur))
}

function time() {
  const date = new Date
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return JSON.stringify(date).slice(12,20)
}
