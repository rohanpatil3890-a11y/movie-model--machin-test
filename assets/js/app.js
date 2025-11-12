const cl = console.log;

const HideShowBtn = document.getElementById("HideShowBtn");
const backDrop = document.getElementById("backDrop");
const movieModel = document.getElementById("movieModel");
const closeBtn = document.querySelectorAll(".closeBtn");
const formId = document.getElementById("formId")
const movieTitleC = document.getElementById("movieTitle");
const movieImgC = document.getElementById("movieImg");
const movieDecC = document.getElementById("movieDec");
const movieRatingC = document.getElementById("movieRating")
const rowContainer = document.getElementById("rowContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let movieArr = [];



if(localStorage.getItem("movieArr")){
  movieArr = JSON.parse(localStorage.getItem("movieArr"));
}

const localFunction = (arr) =>{
  localStorage.setItem("movieArr", JSON.stringify(arr))
}


const uuid = () =>
  String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const onhideShow = () =>{
  backDrop.classList.toggle("active");
  movieModel.classList.toggle("active");
  formId.reset();
  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

}

const movieRating = (rating) => {
  if (rating > 4) {
    return "badge badge-success";
  } else if (rating > 3 && rating <= 4) {
    return "badge badge-warning";
  } else {
    return "badge badge-danger";
  }


}



const creatCard = (arr) =>{
  let result = "";
  arr.forEach(m => {
    result +=`
             <div class="col-md-3 col-sm-6 mb-4" id="${m.movieId}">
            <div class="card movie-card text-white">
                <div class="card-header">
                    <div class="row">
                        <div class="col-10">
                        <h2 class="m-0">${m.movieTitle}</h2>
                    </div>
                    
                    <div class="col-2">
                        <h4 class="m-0"><span class="badge ${movieRating(m.movieRating)}">${m.movieRating}</span></h4>
                    </div>
                    </div>
                </div>
                <div class="card=-body">
                    <figure>
                        <img src="${m.movieImg}" alt="${m.movieTitle}" title="${m.movieTitle}">
                    
                    <figcaption>
                        <h5>${m.movieTitle}</h5>
                    <p>
                    ${m.movieDec}
                       </p>
                    </figcaption>
                    </figure>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm nfx-sec-Btn" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm nfx-pri-Btn" onclick="onRemove(this)">Remove</button>
                </div>
            </div>
        </div>
    `
  })

  rowContainer.innerHTML = result;
}

creatCard(movieArr);

const creatNewCard = (obj) =>{
  let divS = document.createElement("div");
  divS.id = obj.movieId;
  divS.className = "col-md-3 col-sm-6 mb-4 "

  divS.innerHTML = `
            <div class="card movie-card text-white">
                <div class="card-header">
                    <div class="row">
                        <div class="col-10">
                        <h2 class="m-0">${obj.movieTitle}</h2>
                    </div>
                    
                    <div class="col-2">
                        <h4 class="m-0"><span class="badge ${movieRating(obj.movieRating)}">${obj.movieRating}</span></h4>
                    </div>
                    </div>
                </div>
                <div class="card=-body">
                    <figure>
                        <img src="${obj.movieImg}" alt="${obj.movieTitle}" title="${obj.movieTitle}">
                    
                    <figcaption>
                        <h5>${obj.movieTitle}</h5>
                    <p>
                    ${obj.movieDec}
                       </p>
                    </figcaption>
                    </figure>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm nfx-sec-Btn" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm nfx-pri-Btn" onclick="onRemove(this)">Remove</button>
                </div>
            </div>
  `;
   rowContainer.prepend(divS);
}


const onRemove = (ele) =>{

  

Swal.fire({
        title: "Do you want to delete",
        showCancelButton: true,
        confirmButtonText: "delete",
    }).then((result) => {


        if (result.isConfirmed) {

              let REMOVE_ID = ele.closest(".col-md-3").id;
  cl(REMOVE_ID)

  let getIndex = movieArr.findIndex(m => m.movieId === REMOVE_ID);

  movieArr.splice(getIndex,1);
  localFunction(movieArr);
  ele.closest(".col-md-3").remove();

            Swal.fire({
                title: "todo deleted successfully",
                icon: "success",
                draggable: true,
                timer: 1500
            });
        }


    });



}

const onEdit = (ele) =>{
  let EDIT_ID = ele.closest(".col-md-3").id;

  onhideShow();

  localStorage.setItem("EDIT_ID", EDIT_ID);

  let EDIT_OBJ = movieArr.find(m => m.movieId === EDIT_ID);

  movieTitleC.value = EDIT_OBJ.movieTitle;
  movieImgC.value = EDIT_OBJ.movieImg;
  movieDecC.value =EDIT_OBJ.movieDec;
  movieRatingC.value = EDIT_OBJ.movieRating;

  
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

}

const onupdateEvent = () =>{
  let UPDATE_ID = localStorage.getItem("EDIT_ID");

  let UPDATE_OBJ = {
    movieTitle : movieTitleC.value,
    movieImg : movieImgC.value,
    movieDec : movieDecC.value,
    movieRating : movieRatingC.value,
    movieId : UPDATE_ID
  }

  let getIndex = movieArr.findIndex(m => m.movieId === UPDATE_ID);
  movieArr[getIndex] = UPDATE_OBJ;

   localFunction(movieArr);

  let updateObjSet = document.getElementById(UPDATE_ID);

  updateObjSet.innerHTML = `
                        <div class="card movie-card text-white">
                <div class="card-header">
                    <div class="row">
                        <div class="col-10">
                        <h2 class="m-0">${UPDATE_OBJ.movieTitle}</h2>
                    </div>
                    
                    <div class="col-2">
                        <h4 class="m-0"><span class="badge ${movieRating(UPDATE_OBJ.movieRating)}">${UPDATE_OBJ.movieRating}</span></h4>
                    </div>
                    </div>
                </div>
                <div class="card=-body">
                    <figure>
                        <img src="${UPDATE_OBJ.movieImg}" alt="${UPDATE_OBJ.movieTitle}" title="${UPDATE_OBJ.movieTitle}">
                    
                    <figcaption>
                        <h5>${UPDATE_OBJ.movieTitle}</h5>
                    <p>
                    ${UPDATE_OBJ.movieDec}
                       </p>
                    </figcaption>
                    </figure>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm nfx-sec-Btn" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm nfx-pri-Btn" onclick="onRemove(this)">Remove</button>
                </div>
            </div>
  `;

  onhideShow();

    Swal.fire({
                title: "movie update successfully",
                icon: "success",
                draggable: true,
                timer: 1500
            });
}




const onsubmitEvnt = (eve) =>{
  eve.preventDefault();
  cl("click");

  let OBJ = {
    movieTitle : movieTitleC.value,
    movieImg : movieImgC.value,
    movieDec : movieDecC.value,
    movieRating : movieRatingC.value,
    movieId : uuid()
  }

  movieArr.unshift(OBJ);
  cl(movieArr);


  localFunction(movieArr);

  creatNewCard(OBJ);

  onhideShow();

    Swal.fire({
                title: "movie addedd successfully",
                icon: "success",
                draggable: true,
                timer: 1500
            });


}


HideShowBtn.addEventListener("click", onhideShow);
closeBtn.forEach(p =>{
  p.addEventListener("click", onhideShow)
})

formId.addEventListener("submit", onsubmitEvnt);
updateBtn.addEventListener("click", onupdateEvent);







































// const backDrop = document.getElementById("backDrop");
// const movieModel = document.getElementById("movieModel");
// const movieShowBtn = document.getElementById("movieShowBtn");
// const CloseBtn = document.querySelectorAll(".CloseBtn");
// const movieForm = document.getElementById("movieForm");
// const movieTitleC = document.getElementById("movieTitle");
// const movieImgC = document.getElementById("movieImg")
// const movieDecC = document.getElementById("movieDec");
// const movieRatingC = document.getElementById("movieRating");
// const rowContainer = document.getElementById("rowContainer");
// const submitBtn = document.getElementById("submitBtn");
// const updateBtn = document.getElementById("updateBtn");

// let movieArr = [
 
// {movieTitle: 'Demon Slayer: Kimetsu no Yaiba', movieImg: 'https://cdn.pixabay.com/photo/2024/01/15/11/36/batman-8510022_640.png', movieDec: 'asdfghjkl', movieRating: '5', movieId: 'fa04fe9e-2d49-4c43-bc83-f27190be16a6'}
// ];


// if(localStorage.getItem("movieArr")){
//   movieArr = JSON.parse(localStorage.getItem("movieArr"));
// }

// const localFunction = (arr) =>{
//   localStorage.setItem("movieArr", JSON.stringify(arr))
// }

// const uuid = () =>
//   String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, c => {
//     const r = (Math.random() * 16) | 0;
//     const v = c === "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });


// const hideShowModel = (eve) => {

//   movieModel.classList.toggle("active");
//   backDrop.classList.toggle("active");
//   movieForm.reset();
//   submitBtn.classList.remove("d-none");
//   updateBtn.classList.add("d-none");
// }

// const movieRating = (rating) => {
//   if (rating > 4) {
//     return "badge badge-success";
//   } else if (rating > 3 && rating <= 4) {
//     return "badge badge-warning";
//   } else {
//     return "badge badge-danger";
//   }


// }


// const creatCard = (arr) => {
//   let result = "";
//   arr.forEach(obj => {


//     result += `
//               <div class="col-md-3 col-sm-6 mb-4" id="${obj.movieId}">
//             <div class="card movie-card text-white">
//                 <div class="card-header">
//                     <div class="row">
//                         <div class="col-10">
//                             <h2 class="m-0">${obj.movieTitle}</h2>
//                         </div>
//                         <div class="col-2">
//                             <h4 class="m-0"><span class="badge ${movieRating(obj.movieRating)}">${obj.movieRating}</span></h4>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card-body p-0">
//                     <figure>
//                         <img src="${obj.movieImg}" alt="${obj.movieTitle}" title="${obj.movieTitle}">
//                         <figcaption>
//                             <h5>${obj.movieTitle}</h5>
//                             <p class="m-0">
//                             ${obj.movieDec}
//                                 </p>
//                         </figcaption>
//                     </figure>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between align-item-center">
//                     <button class="btn btn-sm nfx-sec-btn" onclick="onEdit(this)">Edit</button>
//                     <button class="btn btn-sm nfx-pri-btn" onclick="onRemove(this)">Remove</button>
//                 </div>
//             </div>
//         </div>
//     `
//   })

//   rowContainer.innerHTML = result;
// }

// creatCard(movieArr);

// const creatNewCard = (obj) => {
//   let DivS = document.createElement("div");
//   DivS.id = obj.movieId;
//   DivS.className = "col-md-3 col-sm-6 mb-4"
//   DivS.innerHTML = `
//                    <div class="card movie-card text-white">
//                 <div class="card-header">
//                     <div class="row">
//                         <div class="col-10">
//                             <h2 class="m-0">${obj.movieTitle}</h2>
//                         </div>
//                         <div class="col-2">
//                             <h4 class="m-0"><span class="badge ${movieRating(obj.movieRating)}">${obj.movieRating}</span></h4>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card-body p-0">
//                     <figure>
//                         <img src="${obj.movieImg}" alt="${obj.movieTitle}" title="${obj.movieTitle}">
//                         <figcaption>
//                             <h5>${obj.movieTitle}</h5>
//                             <p class="m-0">
//                             ${obj.movieDec}
//                                 </p>
//                         </figcaption>
//                     </figure>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between align-item-center">
//                     <button class="btn btn-sm nfx-sec-btn" onclick="onEdit(this)">Edit</button>
//                     <button class="btn btn-sm nfx-pri-btn" onclick="onRemove(this)">Remove</button>
//                 </div>
//             </div>
//   `;
//   rowContainer.prepend(DivS);
// }

// const onRemove = (ele) => {
//   let REMOVE_ID = ele.closest(".col-md-3").id;

//   let getIndex = movieArr.findIndex(movie => movie.movieId === REMOVE_ID);

//   movieArr.splice(getIndex, 1);
//   localFunction(movieArr);
//   ele.closest(".col-md-3").remove();
// }

// const onEdit = (ele) => {
//   let EDIT_ID = ele.closest(".col-md-3").id;

//   localStorage.setItem("EDIT_ID", EDIT_ID);

//   hideShowModel();

//   let EDIT_OBJ = movieArr.find(m => m.movieId === EDIT_ID);

//   movieTitleC.value = EDIT_OBJ.movieTitle;
//   movieImgC.value = EDIT_OBJ.movieImg;
//   movieDecC.value = EDIT_OBJ.movieDec;
//   movieRatingC.value = EDIT_OBJ.movieRating;

//   submitBtn.classList.add("d-none");
//   updateBtn.classList.remove("d-none");
// }

// const updateEventHand = () =>{

//   let UPDATE_ID = localStorage.getItem("EDIT_ID");

//   let UPDATE_OBJ = {
//     movieTitle : movieTitleC.value,
//     movieImg :  movieImgC.value,
//     movieDec : movieDecC.value,
//     movieRating : movieRatingC.value,
//     movieId : UPDATE_ID
//   }

//   let getIndex = movieArr.findIndex(m => m.movieId === UPDATE_ID);

//   movieArr[getIndex] = UPDATE_OBJ;
//    hideShowModel();
//   localFunction(movieArr);

//   let EditObj = document.getElementById(UPDATE_ID);

//   EditObj.innerHTML = `
//                 <div class="card movie-card text-white">
//                 <div class="card-header">
//                     <div class="row">
//                         <div class="col-10">
//                             <h2 class="m-0">${UPDATE_OBJ.movieTitle}</h2>
//                         </div>
//                         <div class="col-2">
//                             <h4 class="m-0"><span class="badge ${movieRating(UPDATE_OBJ.movieRating)}">${UPDATE_OBJ.movieRating}</span></h4>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card-body p-0">
//                     <figure>
//                         <img src="${UPDATE_OBJ.movieImg}" alt="${UPDATE_OBJ.movieTitle}" title="${UPDATE_OBJ.movieTitle}">
//                         <figcaption>
//                             <h5>${UPDATE_OBJ.movieTitle}</h5>
//                             <p class="m-0">
//                             ${UPDATE_OBJ.movieDec}
//                                 </p>
//                         </figcaption>
//                     </figure>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between align-item-center">
//                     <button class="btn btn-sm nfx-sec-btn" onclick="onEdit(this)">Edit</button>
//                     <button class="btn btn-sm nfx-pri-btn" onclick="onRemove(this)">Remove</button>
//                 </div>
//             </div>
//   `

//   movieForm.reset();

//     Swal.fire({
//         title: "Movie updated successfully!",
//         icon: "success",
//         timer: 1500,
//         draggable: true
//     });

// }

// const submitEventHand = (eve) => {
//   eve.preventDefault();
//   cl("clicked")

//   let OBJ = {
//     movieTitle: movieTitleC.value,
//     movieImg: movieImgC.value,
//     movieDec: movieDecC.value,
//     movieRating: movieRatingC.value,
//     movieId: uuid()
//   }

//   movieForm.reset();
//   movieArr.unshift(OBJ);
//   cl(movieArr);

//   creatNewCard(OBJ);
//   localFunction(movieArr);

//      Swal.fire({
//         title: "Movie Added successfully!",
//         icon: "success",
//         timer: 1500,
//         draggable: true
//     });
// }


// movieShowBtn.addEventListener("click", hideShowModel);
// CloseBtn.forEach(p => {
//   p.addEventListener("click", hideShowModel);
// })
// movieForm.addEventListener("submit", submitEventHand);
// updateBtn.addEventListener("click", updateEventHand);