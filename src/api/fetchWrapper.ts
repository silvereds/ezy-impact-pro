const base_url = "http://www.impact-server.cogitbusinessfactory.com/api/v1";
interface ApiProps{
    url:string,
    onSuccess?:Function,
    onError?:Function,
    body?:any;
}
const get = async({url,onSuccess,onError}:ApiProps)=>{
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(base_url+url, requestOptions).then(res => res.json()).then((res)=>onSuccess?.(res)).catch((err)=>onError?.(err));
}

const del = async ({ url = '', onSuccess, onError }: ApiProps) => {
  const requestOptions = {
    method: 'DELETE'
  }
  return await fetch(base_url + url, requestOptions)
    .then((res) => res.json())
    .then((res) => onSuccess?.(res))
    .catch((err) => onError?.(err))
}

const put = async({url, body,onSuccess,onError}:ApiProps)=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return await fetch(base_url+url, requestOptions).then(res => res.json()).then((res)=>onSuccess?.(res)).catch((err)=>onError?.(err));;    
}
const post = async ({ url, body, onSuccess, onError }: ApiProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
  return await fetch(base_url + url, requestOptions)
    .then((res) => res.json())
    .then((res) => onSuccess?.(res))
    .catch((err) => onError?.(err))
}

const Api = {
    get,
    del,
    put,
    post
}
export default Api
