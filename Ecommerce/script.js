'use strict';
// import { person } from "./person";
// const kelie = new person()
// kelie.showInf()
const bar = document.getElementById('bar')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')

bar.addEventListener('click',()=>{
    nav.classList.add('active')
})


close.addEventListener('click',()=>{
    nav.classList.remove('active')
})

//modal events
const modalDiv = document.querySelector('.modal')
const closeBtn = document.querySelector('.close-modal')
const modalBtn = document.querySelector('.btn-modal')
function openModal(){
modalDiv.classList.remove('hidden')
}

function closeModal (){
    modalDiv.classList.add('hidden')
}

     closeBtn.addEventListener('click',closeModal)
     modalBtn.addEventListener('click',openModal)

     document.addEventListener('keydown', function(e){
        if(e.key==='Escape'){
            if(!modalDiv.classList.contains('hidden')){closeModal();}
           
        }
    })
    //tabs
    const tabsContainer = document.querySelector('.tabs-wrap')
    const contentsEl = document.querySelectorAll('.tab-cont')
    const tabsEl = document.querySelectorAll('.opr-btn')
    tabsContainer.addEventListener('click',(e)=>{
        
        const clickedEl =e.target.closest('.opr-btn');
        if(!clickedEl) return
        const bgColor = getComputedStyle(clickedEl).backgroundColor

        tabsEl.forEach(tab=>{tab.classList.remove('btn-active')})
        clickedEl.classList.add('btn-active');
        contentsEl.forEach(c=>{c.classList.remove('tab-cont-active')})
       document.querySelector(`.tab-cont--${clickedEl.dataset.tab}`).classList.add('tab-cont-active')
       document.querySelector('.tab-cont-active').style.backgroundColor = bgColor
        e.stopPropagation()   
    })
    //fading out animation
    const handleMouseHover = function(e){
        // now this= 1|0.3(value set to it by "bind()")
        if(e.target.classList.contains('nav-link')){
            const el = e.target;
            const siblings = el.closest('.nav-links').querySelectorAll('.nav-link')
            const signup = el.closest('.nav-links').querySelector('.btn-modal')
            siblings.forEach(e=>{
                if(e!==el){
                    e.style.opacity = this
                }
            })
 signup.style.opacity = this
  }
    }
    // document.querySelector('.nav-links')
    // .addEventListener('mouseover',(e)=>{handleMouseHover(e,0.4)})
    //     document.querySelector('.nav-links')
    //     .addEventListener('mouseout',(e)=>{handleMouseHover(e,1)})
   
      // better passing 'argument' to handler
    document.querySelector('.nav-links')
    .addEventListener('mouseover',handleMouseHover.bind(0.3))
   document.querySelector('.nav-links')
    .addEventListener('mouseout',handleMouseHover.bind(1))
    // //stiky nav
    
    const navHeader = document.getElementById('header')
    const heroSec = document.getElementById('hero')
    const tabSection = document.getElementById('tab-section')
    const stikyStart =tabSection.getBoundingClientRect()
    // window.addEventListener('scroll',function(){
    //     if(window.scrollY>stikyStart.top){
    //         navHeader.classList.add('sticky')
    //     }
    //     else{
    //         navHeader.classList.remove('sticky')
    //     }
    // })

   //stiky nav :intersection observer
//    const callBack = function(entries,observer){
//      entries.forEach(entry=>{
//         console.log(entry)
//      })
//    }
//    const obsOptions={
//     root:null,
//     threshold:[0,0.2]
//    }
//     const observer = new IntersectionObserver(callBack,obsOptions)
//     observer.observe(tabSection)
const navHeight = navHeader.getBoundingClientRect().height
const callBack = function(entries){
   const [entry] =entries;
   if(!entry.isIntersecting){
    navHeader.classList.add('sticky')
   }
   else{
    navHeader.classList.remove('sticky')
   }
  }

   const headerObserver = new IntersectionObserver(callBack,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`
   })
   headerObserver.observe(heroSec)
// slider
const slidesEl = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.right');
const btnLeft = document.querySelector('.left');
const dotsContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slidesEl.length
const goToSlide = function(slide){
    slidesEl.forEach(function(el,i){
        el.style.transform =`translateX(${100*(i-slide)}%)`
        el.style.transition='1s ease'
    })
}

const createDots = function(){
    slidesEl.forEach(function(s,i){
dotsContainer.insertAdjacentHTML('beforeend',
`<button class="dots__dot" data-slide="${i}">&#9679;</button>`)
// dots.forEach(function(el,i){
//     i=500
//     // el.style.transform =`translateX(${100+i}%)`
//     el.style.display = "block"
    
// })
    })
    
}


const activeDot = function(s){
    document.querySelectorAll('.dots__dot').forEach(d=>{
    //    d.classList.remove('dots__do--active')
       d.style.color = 'white'
     })
    //  document.querySelector(`.dots__dot[data-slide="${s}"]`).classList.add('dots__dot--active')  
     document.querySelector(`.dots__dot[data-slide="${s}"]`).style.color = 'black' 
}




dotsContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
        // const slide = e.target.dataset.slide
        const {slide} = e.target.dataset
  
        goToSlide(slide)
        activeDot(slide)
    }
})
createDots()

const nextSlide = function(){
    if(curSlide === maxSlide-1){
        curSlide = 0
    }
else{
    curSlide++;
}
goToSlide(curSlide)
activeDot(curSlide)
}

const prevSlide = function(){
    if(curSlide === 0){
     curSlide =  maxSlide-1
    }
else{
    curSlide--;
}
goToSlide(curSlide)
activeDot(curSlide)
}
goToSlide(0)
activeDot(0)
// slidesEl.forEach(function(el,i){
//     el.style.transform =`translateX(${100*i}%)`
// })

btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)
document.addEventListener('keydown',(e)=>{
   if( e.key === 'ArrowRight') { nextSlide()}
   if( e.key === 'ArrowLeft') { prevSlide()}

})
// // scrolling
// document.querySelectorAll('.nav-link').forEach(function(el)
// {el.addEventListener('click',function(){
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
// })})
// better way
document.querySelector('.nav-links').addEventListener('click',function(e){
if(e.target.classList.contains('nav-link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
}
})
// scrolling
// const contactLiEl = document.querySelector('.contact-li')
// const footerEl = document.getElementById('footer-con')
// contactLiEl.addEventListener('click',()=>{
//     const footerCoards = footerEl.getBoundingClientRect()
//     console.log(footerCoards)
//     console.log('height/width of viewport',document.documentElement.clientHeight,
//     document.documentElement.clientWidth)
//     console.log('current scroll',window.pageXOffset,window.pageYOffset)
//   // scrolling
// //   window.scrollTo(footerCoards.left +window.pageXOffset,footerCoards.top + window.pageYOffset)

// //smooth scroll
// // window.scrollTo({
// //   left:  footerCoards.left +window.pageXOffset,
// //   top:  footerCoards.top + window.pageYOffset,
// //   behavior:'smooth'
// // })
// // modern way
// footerEl.scrollIntoView({behavior:'smooth'})
// })

// //melemamedy trah
// const logo = document.querySelector('.logo')
// // attribute
// console.log(logo.src)
// console.log(logo.getAttribute('src'))


// console.log(logo.alt)
// logo.alt = 'simple minimal logo'
// console.log(logo.alt)
// console.log(logo.class)
// console.log(logo.className)
// console.log(logo.designer)
// // console.log(logo.getAttribute(designer))
// console.log(logo.getAttribute("designer"))
// logo.setAttribute('company','bankist')

// //data attributes (attributes that start with data)
// console.log(logo.dataset.versionNumber) // follows camel case rule


// //  dont use this(logo.className= 'blabla')
// //  as it overwrites

// // OOP prctices only
// const person  = function(fName,lName){
// this.firstName = fName
// this.lastName = lName
// }
// person.prototype.calcAge = function(){
//     return 0;
// }
// const teka = new person('Teka','Hagos')
// console.log(teka)
// console.log(teka.__proto__)
// console.log(teka.__proto__==person.prototype)
// console.log(person.prototype.isPrototypeOf(teka))
// console.log(person.prototype.isPrototypeOf(person))

// const Car = function(make,spd){
//   this.make = make
//   this.spd = spd
// }

// Car.prototype.acc = function(){
//     this.spd+=10
//     console.log(this.spd)
// }

// Car.prototype.brake = function(){
//     this.spd-=5
//     console.log(this.spd)
// }

// const car1 = new Car('BMW',10)
// const car2 = new Car('Mercedes',40)
// car1.acc()
// car1.brake()
// car2.acc()
// car2.brake()
// //ES6 classes
//   //class expression
// // const PersonCl = class {}
//    //class declaration
//    class PersonCl {
//     constructor(make,spd){
//         this.make = make
//         this.spd = spd
//     }
//     set speedUs(s){
//   this.spd = s*1.6
//     }
//     get speedUs(){
//         return (this.spd/1.6)

//     }
//    }
//    const ford = new PersonCl('FORD',12)
//    console.log(ford.speedUs)
//    ford.speedUs = 20
//    console.log(ford.spd)
//    console.log(ford)
//    console.log(ford.speedUs)

// // arrays
// const arr = [2,4,6,4,8,9,2,3,2,5,8,2,5]
// console.log(arr.__proto__)
// console.log(arr.__proto__.__proto__)
// console.log(arr.__proto__== Array.prototype)
// //adding our own method to Array(dont do this as js may add method with the smae name in the future )
// Array.prototype.getUnique = function(){
//  //Set is a collection of unique values   
//     return [...new Set(this)]
// }
 
// console.log(arr.getUnique())

// // // dir vs log

// // const dirSample = document.querySelector('p')
// // console.log(dirSample)
// // console.dir(dirSample)

// // //that function are objects
// // console.log(x=>x+1)
// // console.dir(x=>x+1)

// //classes inheritance

// const Personn = function(fname,lname){
//     {
//         this.fname = fname
//         this.lname = lname
//     }

// }
// Personn.prototype.displayName = function(){
//     console.log(`Hi This is ${this.fname} ${this.lname}`)
//         }
// const Student = 
// function(fname,lname,grade){
//     Personn.call(this,fname,lname)
//     // this.fname = fname
//     // this.lname = lname
//     this.grade = grade
// }
// //linking prototypes
// Student.prototype = Object.create(Personn.prototype)

// const kelali  = new Student('Kelali','Hadis',10)
// console.log(kelali)
// Student.prototype.showGrade = function(){
//     console.log(this.grade)
// }
// kelali.showGrade()
// kelali.displayName()

// console.log(kelali.__proto__)
// console.log(kelali.__proto__.__proto__)
// console.dir(Student.prototype.constructor)
// Student.prototype.constructor = Student
// console.dir(Student.prototype.constructor)
// console.log(kelali.__proto__)
// console.log(kelali.__proto__.__proto__)

// //code chllenge on class inheritance
// console.log('///// From Inheritance Challenge ///// ')
// const CarH = function(mk,spd){
//     this.mk = mk
//     this.spd = spd
//   }
  
//   CarH.prototype.acc = function(){
//       this.spd+=10
//       console.log('acc carh',this.spd)
//   }
  
//   CarH.prototype.brake = function(){
//       this.spd-=5
//       console.log(this.spd)
//   }

//   const Ev = function(mk,spd,chrge){
//     CarH.call(this,mk,spd)
//     this.chrge = chrge
//   }
//   Ev.prototype = Object.create(CarH.prototype)
//   const Mekina  = new Ev('EV',20,12)


//   Ev.prototype.chargeBattery = function(chargeTo){
//     this.chrge = chargeTo
//     console.log(this.chrge)
//   }
//   Ev.prototype.acc = function(){
//   this.spd +=20
//   this.chrge-=0.01   
//   console.log('acc Ev',this.spd)
//   }
//  Mekina.chargeBattery(40)
//  Mekina.acc()
//  Mekina.brake()

// //  class inhertanece in Es6 classes
// console.log('///class inhertanece in Es6 classes///')
// class PersonnCl {
//     constructor(name,birthYear){
//         this.name = name
//         this.birthYear = birthYear
//     }
//     displayMyName(){
//         console.log(`Am called ${this.name}`)
//     }

//     static showStataic(){
//         console.log('This is static method')
//     }

//     calcMyAge(){
//         console.log(this.birthYear)
//         console.log(2022-this.birthYear)
//     }
// }


// class StudentCl extends PersonnCl{
//     constructor(name,birthYear,dept){
//   super(name,birthYear)
//         this.dept = dept
//     }

// displayMyName(name){
//     this.name = name;
//     console.log(this.name)
// }
// showDept(){
//     console.log(`Department: ${this.dept}`)
// }
// }
//  const stud = new StudentCl('Alex',1995,'Engineering')

//  stud.showDept()
//  stud.displayMyName('Teka')
//  stud.calcMyAge()
//  const person1 = new PersonnCl('Hayelom',1987)
//  //static r linked to the class but not to any obj
// //  stud.showStataic()
// //  person1.showStataic()
//  PersonnCl.showStataic()

// //inheritance in object .create
// console.log('===inheritance in object .create===')
// const PersonProto = {
//     clacAge(){
// console.log(2022-this.birthYear)
//     },
//     init(name,birthYear){
//         this.name = name
//         this.birthYear = birthYear
//     }
// }

// const StudentProto = Object.create(PersonProto)

// StudentProto.init = function(name,birthYear,depart){
// PersonProto.init.call(this,name,birthYear)
// this.depart = depart
// }

// StudentProto.showName = function(){
//     console.log(`Am called ${this.name}`)
// }
//  const abel = Object.create(StudentProto)
//  abel.init('Abel',185,'Computer Engineering')
//  abel.showName()
//  abel.clacAge()

// class Users{
//     #name = ''
//     #b;
//     constructor(a,b){
//         this.a = a
//         this.#b = b
//     }

//     getPrivate(){
//         this.#name = 'Alex Wang'
//         console.log( this.#name+' The',this.#b )
//     }
// }

// const user  =  new Users('First','Second')
// user.getPrivate()
// console.log(user.a)
// // console.log(user.#name)



// //spread operator sample exercise
// const numbers = [1, 2, 3, 4, 5, 6];

// const [one, two, ...rest] = numbers;
// console.log(one, two, ...rest)


// const myVehicle = {
//     brand: 'Ford',
//     model: 'Mustang',
//     color: 'red',
//     owner: 'Kelali'

//   }
  
//   const updateMyVehicle = {
//     type: 'car',
//     year: 2021, 
//     color: 'yellow',
//     owner: 'Teka'
//   }

//   const combinedObject ={...myVehicle,...updateMyVehicle}