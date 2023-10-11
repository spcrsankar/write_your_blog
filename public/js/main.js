import { getStudents,addStudent,updateStudent } from './firebase-config.js'


async function main() {
  const res = await updateStudent('0au8vWuV84TDg8SB9Vcl', {name: 'John Doe'})
  console.log(res)
  const students = await getStudents()
  console.log(students)
  // const student = {
  //   name: "John",
  //   age: 20
  // };
  // await addStudent(student)
}

main()
console.log('hello')