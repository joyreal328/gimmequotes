console.log(navigator.userAgent)
var sBrowser, sUsrAg = navigator.userAgent;

if (sUsrAg.indexOf("Firefox") > -1) {
    alert('Sorry, works only with Google Chrome');
} 

var isSafari = window.safari !== undefined;
if (isSafari) {
    alert('Sorry, works only with Google Chrome');
} 

const btn = document.querySelector('.img-svg');
const content = document.querySelector('.content');
const quotes = document.querySelector('.quotes');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//hard coded quotes
var oprah_greetings = [  
    " Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough. ",
    " Surround yourself with only people who are going to lift you higher. ",
    " The biggest adventure you can ever take is to live the life of your dreams ",
    " Think like a queen. A queen is not afraid to fail. Failure is another stepping stone to greatness. ",
    " Doing the best at this moment puts you in the best place for the next moment.",
    "Real integrity is doing the right thing, knowing that nobody's going to know whether you did it or not. ",
    " The more you praise and celebrate your life, the more there is in life to celebrate. ",
    " Turn your wounds into wisdom.",
    " Passion is energy. Feel the power that comes from focusing on what excites you.",
    "Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down."
]

//quotes from API
$.getJSON('https://api.adviceslip.com/advice',function(data) {
    console.log(data);
    var randomGreeting = data.slip.advice;
    random_greetings = [];
    random_greetings.push(randomGreeting);
    console.log('slip advice:' + " " + random_greetings);
})

fetch('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand')
            .then( data => data.json())
            .then ( data => {
            console.log(data);
            let random_number = Math.floor(Math.random()*10);
            let quote_design = data[random_number].content.rendered;
            console.log(removeTags(quote_design));
            design_greetings = [];
            design_greetings.push(removeTags(quote_design));
            console.log(design_greetings);

            function removeTags(str) {
                if ((str===null) || (str===''))
                    return false;
                else
                    str = str.toString();
                      
                return str.replace( /(<([^>]+)>)/ig, '');
            }


            
      })

//add the listener to the button
    btn.addEventListener('click', () => {
                        recognition.start();
                    });

    recognition.onstart = function () {
        console.log(event);
        console.log('voice is activated');
        content.innerHTML = 'Speak now...';
    }

    recognition.onsoundstart = function() {
        console.log('Some sound is being received');
        content.innerHTML = 'Listening...';

        $(document).ready(function() {
            $(".img-svg").addClass("animated pulse");
            $(".content").addClass("animated pulse");
        });
    
    }

    recognition.onsoundend = function() {
        console.log('Sound has stopped being received');
        //content.innerHTML = 'Sound has stopped being received';
        $(".img-svg").animate({
                            width: '50px',
                            height: '50px',
                        });

        $(".refresh-icon").animate({
                            width: '120px',
                            height: '120px',
                        });

    $(document).ready(function() {
        $(".refresh-icon").addClass("animated shake delay-3s");
        });        
        }

    recognition.onspeechend = function() {
        console.log('Speech has stopped being detected');
    }

    recognition.onresult = function(event) {
        console.log(event);
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        content.textContent = 'You said:' + " " + ' " ' + transcript +  ' " ';
        readOutLoud(transcript);
    }

    function readOutLoud(message){
        const speech = new SpeechSynthesisUtterance();
        speech.text = "Sorry...I don't know what you are talking about!";
        if( message.includes('Oprah')) {
            speech.text = oprah_greetings[Math.floor(Math.random()*oprah_greetings.length)];
        }

        if( message.includes('Bill Gates')) {
            speech.text = bill_greetings[Math.floor(Math.random()*bill_greetings.length)];
        }

        if( message.includes('random')) {
            speech.text = random_greetings
        }

        if( message.includes('design')) {
            speech.text = design_greetings[Math.floor(Math.random()*design_greetings.length)];
        }
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
        console.log(speech.text);
        quotes.innerHTML = '<div class="overlay-big overlay-big-mob">'+ '<h3 class="quotes-speech quotes-speech-mob">' + '"' + " " + speech.text +  '"' + '</h3>'+  '</div>' ;
        $(document).ready(function() {
        $(".quotes").addClass("animated slideInUp");
        });
    }
            