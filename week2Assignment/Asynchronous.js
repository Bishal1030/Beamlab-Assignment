// Promises in javascript

const promise = new Promise((resolve,reject) => {

    const booleanValue = false

    if (booleanValue){
        resolve("Boolean value is true")
        
    } else{
        reject("something went wrong")
    }
})

promise.then((res) => {
    console.log(res)    
}).catch((err) => {
    console.log(err)
})

// Async Await

const fetchData = async() => {
    try {
        const response = await fetch("localhost://example.com")
        const data = await response.json()
        console.log(data)
        
    } catch (error) {
        console.log(error)
    }
}