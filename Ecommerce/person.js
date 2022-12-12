const person ={
    name:'teka',
    age:100,
    job: 'Programmer',

    showInf(){
        console.log('==Personal Information')
        console.log(`Name ${this.name}`)
        console.log(`Age ${this.age}`)
        console.log(`Job ${this.job}`)

    }
}

export {person}