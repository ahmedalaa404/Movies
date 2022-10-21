// loading screen and doc ready
$(document).ready(
    function ()
     {
        $('.loading').fadeOut(1000,function(){ $('.loading').remove();});

     }
);

// plugins Jquery



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
        console.log(navs, navs.innerWidth())
        if(navbar.css('left')=='0px')
        {
          new WOW().init();
            navbar.animate({left:`-${navs.innerWidth()}`},1500);
            $(".nav-links p").removeClass('animate__fadeInUpBig');
            $(".nav-links p").css('animation-name','fadeOutDownBig');
        }
        else
        {
          new WOW().init();
          $(".nav-links p").css('animation-name','fadeInUpBig');
            navbar.animate({left:`0px`},500);
        }
    }
)
// end nav of aside 

// respons Data from Api 
let containerResponse;
async function responsData()
{
    let SendReq=await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=f2291e5d64d84082e4b2181b3587d77d");
     containerResponse = await SendReq.json();
console.log(containerResponse.results) ;
        await Display();
} 
responsData();




let Rows=$('#rowDisplay');
// show Data in Row
async function Display()
{
  
        containerRow ='';
        let modeTitle;
        let modeDate;
        for(let i=0 ; i<containerResponse.results.length;i++)
        {
            if(containerResponse.results[i].original_title!=undefined)
            {
              modeTitle=containerResponse.results[i].original_title;
            }
            else
            {
                modeTitle=containerResponse.results[i].name;
            }

            if(containerResponse.results[i].release_date!=undefined)
            {
              modeDate=containerResponse.results[i].release_date;
            }
            else
            {
                modeDate=containerResponse.results[i].first_air_date;                ;
            }

            containerRow +=`   
               <div class="overflow-hidden col-lg-4 col-md-6 col-sm-12 wow animate__zoomInDown" data-wow-delay="0s" data-wow-duration="1s">
            <div class="filem position-relative bg-info ">
              <img src="https://image.tmdb.org/t/p/w500/${containerResponse.results[i].poster_path}" alt="" class="w-100">
              <div class="overflow-hidden cover-image position-absolute h-100 w-100 top-100 d-flex justify-content-center align-items-center">
                <div class="text-center">
                  <h6 class="pt-sm-4 mb-0 py-lg-3">${modeTitle}</h6>
                  <p class="text-black p-1">overview :${containerResponse.results[i].overview}</p>
                  <p class="text-black  my-2"> Rate :${containerResponse.results[i].vote_average.toPrecision(2)}</p>
                  <p class="text-black  my-2"> Date : ${modeDate}</p>
                </div>
              </div>
            </div>
          </div>`
        }
        Rows.html(containerRow);
}