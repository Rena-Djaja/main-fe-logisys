export const getQueryString = <T = Record<string, string>>(): T => {
  const result: Record<string, string> = {}
  if (typeof window !== 'undefined') {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      if (vars[i]) {
        const pair = vars[i].split('=')
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
      }
    }
  }
  return result as unknown as T
}
