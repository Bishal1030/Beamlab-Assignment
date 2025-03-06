//  1. Immutability -> once the variable is defined it cannot be changed instead you can create a new object
const person = [
    {name: "Bishal Shahi", Age: 21},
    {name: "Shivoo Singh", Age: 21},
    {name: "Aaryash kc", Age: 21}
]

const updatedPerson = {...person}

console.log(updatedPerson);


// 2. First class function -> we can assign a the function to a variable and we can call that function from another function

const findPerson =(index) =>{
    return person[index];
}

const getPerson = findPerson(0);

console.log(getPerson);


// 3. Pure function -> function which value remains same (does not change)

// pure function
const getTotalIndex = () => {
    const total = person.length;
    console.log(total)
}
getTotalIndex();

// impure function -> each time the value changes

const ImpureFunction = function() {
    let totalLength = 0;
    person.forEach((each) => {
        totalLength += Object.keys(each).length;
    });
    console.log(totalLength);
}

ImpureFunction()
