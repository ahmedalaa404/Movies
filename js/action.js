// loading screen and doc ready
$(document).ready(
    function ()
     {
        $('.loading').fadeOut(1000,function(){ $('.loading').remove();});

     }
);

// plugins Jquery

$(document).click(function (event) {
  event.preventDefault();
  // or use return false;
});

new WOW().init();


// start nav aside
let iconeOpen=$("i.iconeOpen");
let navs=$(".nav-site");
let navbar=$(".nav");
navbar.css('left',`-${navs.innerWidth()}px`)

iconeOpen.click(
    function()
    {
        iconeOpen.toggleClass('fa-xmark');
        if(navbar.css('left')=='0px')
        {

            navbar.animate({left:`-${navs.innerWidth()}`},1500);
            $(".nav-links p").removeClass('animate__fadeInUpBig');
            $(".nav-links p").css('animation-name','fadeOutDownBig');
        }
        else
        {
          $(".nav-links p").css('animation-name','fadeInUpBig');
            navbar.animate({left:`0px`},500);
        }
    }
)
// end nav of aside 
$('.nav-links p a[typeShow]').click(
  async function(e)
  {
    let goals=$(e.target)
    if(goals.attr('typeShow')=='trending')
    {
      responsData(`${goals.attr('typeShow')}/all/day`);
    }
    else
    {
          responsData(`movie/${goals.attr('typeShow')}`);
    }
  }
)


// respons Data from Api 
let containerResponse;
let saveType='movie/now_playing';
let dataRes;

async function responsData(type="movie/now_playing",query="")
{
  let SendReq=await fetch(`https://api.themoviedb.org/3/${type}?api_key=f2291e5d64d84082e4b2181b3587d77d&language=en-US${query}&page=1`);

  // https://api.themoviedb.org/3/search/movie?api_key=f2291e5d64d84082e4b2181b3587d77d&language=en-US&query=Halloween&page=1&include_adult=false


        // let SendReq=await fetch(`https://api.themoviedb.org/3/${type}?api_key=f2291e5d64d84082e4b2181b3587d77d&language=en-US&query=Halloween&page=1`);
        containerResponse = await SendReq.json();
        dataRes=await containerResponse.results;
        saveType=type;
        await Display(dataRes);
        // await num();
} 

responsData();









let Rows=$('#rowDisplay');
// show Data in Row
async function Display(value)
{
  
        containerRow ='';
        let modeTitle;
        let modeDate;
        for(let i=0 ; i<value.length;i++)
        {
            if(value[i].original_title!=undefined)
            {
              modeTitle=value[i].original_title;
            }
            else
            {
                modeTitle=value[i].name;
            }

            if(value[i].release_date!=undefined)
            {
              modeDate=value[i].release_date;
            }
            else
            {
                modeDate=value[i].first_air_date;                ;
            }

            containerRow+=`   
               <div class="overflow-hidden col-lg-4 col-md-6 col-sm-12 wow animate__zoomInDown" data-wow-delay="0s" data-wow-duration="1s">
            <div class="filem position-relative bg-info ">
              <img src="https://image.tmdb.org/t/p/w500/${value[i].poster_path}" alt="" class="w-100">
              <div class="overflow-hidden cover-image position-absolute h-100 w-100 top-100 d-flex justify-content-center align-items-center">
                <div class="text-center">
                  <h6 class="pt-sm-4 mb-0 py-lg-3">${modeTitle}</h6>
                  <p class="text-black p-1">overview :${value[i].overview}</p>
                  <p class="text-black  my-2"> Rate :${value[i].vote_average.toPrecision(2)}</p>
                  <p class="text-black  my-2"> Date : ${modeDate}</p>
                </div>
              </div>
            </div>
          </div>`
        }
        Rows.html(containerRow);
}



let serachPage= document.getElementById('searchPage');
serachPage.addEventListener('input',function()
{
  for(let i=0;i<dataRes.length;i++)
  {
    console.log("aa");
  }
})


// async function num()
// {
// return new Promise (function()
// {
//   console.log(dataRes.length)
// })
// }


