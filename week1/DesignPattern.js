// 1. Module Pattern

function Students() {
    let totalStudent = []; // it cannot be modified directly

    // private method
    const getAllStudent = function() {
        return totalStudent.length;
    }

    return {
        // public method which we can use as a method for operation
        addStudent(name) {
            totalStudent.push(name); // this function will add the student with name parameter and will push it to the totalStudent
        },

        viewStudent() {
            console.log(`All students: ${totalStudent}`);
            console.log('total number of students:', getAllStudent());
        }
    }
}

const studentModule = Students();
studentModule.addStudent("Bishal");
studentModule.addStudent("Shivoo");
studentModule.viewStudent();


//2. Factory module -> it helps to create new object without repeating code

const User = (name, email) => {
    return {
        name, email,
        describe() {
            console.log(`Welcome to the Space ${name}`);
        }
    }
}

const user1 = User("Ram", "ram@gmail.com");
console.log(user1);
const user2 = User("Hari", "hari@gmail.com");
console.log(user2);

user1.describe();
user2.describe();

// 3. Singleton module - it ensures that only one instance of particular object is created.

const Singleton = (function () {
    let instance; // Private variable
  
    function createInstance() {
      return { message: "I am instance!" };
    }
  
    return {
      getInstance() {
        if (!instance) {
          instance = createInstance(); // Creating the instance only once
        }
        return instance;
      }
    };
  })();
  
  const obj1 = Singleton.getInstance();
  const obj2 = Singleton.getInstance();
  
  console.log(obj1.message);  // it should give the message from createInstance function
  console.log(obj1 === obj2); // it must return true
  