import axios from 'axios'

export const httpRequest = (method, uri, headers, body) => {
    const url= 'http://localhost:3000/api/' + uri;
    if (method === 'DELETE') {
        return Promise.resolve(//renvoie une promise pour pouvoir utiliser then 
            axios.delete(url, { headers })
        )
    } else if (method === 'PUT') {
        return Promise.resolve(
            axios.put(url, body, { headers })
        )
    } else if (method === 'POST') {
        return Promise.resolve(
            axios.post(url, body, { headers })
        )
    } else if (method === 'GET') {
        return Promise.resolve(
            axios.get(url, body, { headers })
        )
    }
    
}