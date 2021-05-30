let mogs   = document.querySelector(".mogs");
let calc   = document.querySelector(".calcMog");
let credit = document.querySelectorAll(".credit");
let sub_1  = document.querySelector(".subject-marks-1");
let sub_2  = document.querySelector(".subject-marks-2");
let sub_3  = document.querySelector(".subject-marks-3");
let sub_4  = document.querySelector(".subject-marks-4");

let creditNum = [];
for(let item of credit) {
   creditNum.push(item.value);
}

const credit_1 = parseInt(creditNum[0]);
const credit_2 = parseInt(creditNum[1]);
const credit_3 = parseInt(creditNum[2]);
const credit_4 = parseInt(creditNum[3]);

let subject_1 = [];
let subject_2 = [];
let subject_3 = [];
let subject_4 = [];

// mark
// calc.addEventListener("click", () => {
    // if (y.classList.contains("Քննություն1")) {
    //     let mark = y.querySelectorAll(".mark")
    //     console.log(mark)
    //     mark.forEach(markVal => {
    //         let elemInput = document.createElement("SECTION")
    //         elemInput.innerHTML = `<div class="journalMark"><input value=${markVal.value} /> </div> `
    //         mogs.append(elemInput)
    //         console.log(elemInput)
    //         exam1.push(markVal.value)
    //     })
    //     console.log(exam1)
    // } else {
    // console.log("քննություն2")
    // }


    // let marks1 = sub1.querySelectorAll(".mark");
        // console.log(mark);
        // mark.forEach(markVal => {
        //     let elemInput = document.createElement("SECTION")
        //     elemInput.innerHTML = `<div class="journalMark"><input value=${markVal.value} /> </div> `
        //     mogs.append(elemInput)
        //     console.log(elemInput)
        //     exam1.push(markVal.value)
        // })
        // console.log(exam1)

    // marks1.forEach(markValue => {
    //     subject1.push(markValue.value);
    // });

    // console.log('subject1: ', subject1);
// });


// mark
calc.addEventListener("click", () => {
    let marks_1 = sub_1.querySelectorAll(".mark");
    let marks_2 = sub_2.querySelectorAll(".mark");
    let marks_3 = sub_3.querySelectorAll(".mark");
    let marks_4 = sub_4.querySelectorAll(".mark");

    marks_1.forEach(markValue => {
        subject_1.push(markValue.value * credit_1);
    });

    marks_2.forEach(markValue => {
        subject_2.push(markValue.value * credit_2);
    });

    marks_3.forEach(markValue => {
        subject_3.push(markValue.value * credit_3);
    });

    marks_4.forEach(markValue => {
        subject_4.push(markValue.value * credit_4);
    });

    console.log('subject_1: ', subject_1);
    console.log('credit_1: ', credit_1);
    console.log('subject_2: ', subject_2);
    console.log('credit_2: ', credit_2);    
    console.log('subject_3: ', subject_3);
    console.log('credit_3: ', credit_3);
    console.log('subject_4: ', subject_4);
    console.log('credit_4: ', credit_4);

    let sum = [];
    let mog = [];
    let subjectsSum = [];

    for (let i = 0; i < subject_1.length; i++) {
        subjectsSum[i] = subject_1[i] + subject_2[i] + subject_3[i] + subject_4[i];
        let creditsSum = + credit_1 + credit_2 + credit_3 + credit_4;
        sum.push(subjectsSum[i]);
        let m = subjectsSum[i] / creditsSum;
        mog.push(m);
        console.log('subjectsSum: ', subjectsSum[i]);
        console.log('creditsSum: ', creditsSum);
        console.log('m: ', m);

        let elemInput = document.createElement("SECTION");
        elemInput.innerHTML = `<div class="journalMark"><input value=${m} /> </div> `;
        mogs.append(elemInput);
        console.log(elemInput);
    }

})

