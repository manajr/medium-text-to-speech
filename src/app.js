import axios from 'axios'

const form = document.getElementById('urlForm');
const input = document.getElementById('urlInput');
const button = document.getElementById('btnSpeak');
const buttonStop = document.getElementById('btnStop')
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
const synth = window.speechSynthesis;

let TEXT2SPEECH = {
    1: {
    h1: "My Software Engineer Roadmap"
    },
    2: {
    h1: "Intro"
    },
    3: {
    p: "Software world is always changing. There are new trends, coming in everyday. Old trends that have now better approaches. New problems to be solved. Old problems, never solved, that now have the right tech to be answered. Old tech that now brings the answers. New buzzwords. Old buzzwords. Languages, paradigms, styles, frameworks, architectures, patterns, methodologies, principles…."
    },
    4: {
    p: "Do you feel your brain already? I sure do! With all this knowledge that we, as Software Engineers, are to keep up with! Keep and update at all times! Making sure that we are really craftsman of the software!"
    },
    5: {
    p: "What if there was a plan, a roadmap, that we could consult at any point and see where we are and where to go? As professionals to have a systematic view on a step by step approach on how to evolve and what is worth tackling?"
    },
    6: {
    p: "This is the intention of this article — to share here, from my experience, on what is worth learning and take hold of. With a roadmap structure, step by step approach. Would also love to hear your insight on this and really start the discussion."
    },
    7: {
    p: "As a very dear friend once told me “Learn concepts and not languages”. And I very much agree with that! So my perspective is really to invest heavily into the concepts, because those will not go anywhere as the time goes by. Do you know what is functional programming? That is knowledge that will go nowhere over time. Then learn how to do that in a specific language."
    },
    8: {
    p: "So the proposed structure goes from more abstract concepts into the more tech linked ones."
    },
    9: {
    p: "With the safeguard, that more details is never enough! Note, that the first learning path that I saw with lots of details, that really caught my eye was this one https://github.com/kamranahmedse/developer-roadmap! Check it out! Great resource, where I definitely keep an eye on and take advantage of it for defining my own path as I share here."
    },
    10: {
    h1: "Path"
    },
    11: {
    p: "As a Software Engineers, we need to cover lots of areas of expertise."
    },
    12: {
    p: "Not only we need to master the technologies that we are developing with, but also the infrastructure where are solutions are running at. And last but not least, a given set of soft skills can really can make our life easier. So I organize the path into 3 sections:"
    },
    13: {
    h2: "Development Skills"
    },
    14: {
    p: "Find bellow the path defined for enhancing my development skills, that I try to keep updated and refreshed. Again this is organised, from more conceptual aspects like patters and methodologies, to more practical aspects such as specific programming languages and APIs implementations."
    },
    15: {
    p: "Boxes in yellow are the aspects that I am refreshing right now. For example, DDD I am reading the Blue Bible on it. For Design Patterns, I am going deeper into Microservices ones, so also reading a book on it. Since that is the architecture that I am currently going for."
    },
    16: {
    h2: "Infrastructure Skills"
    },
    17: {
    p: "In terms, of infrastructure, for me, it is important as a Software Engineer to understand the infrastructure, so that I can take advantage of it, and make an informed decision when implementing a given solutions."
    },
    18: {
    p: "For example, if a given software is being deployed into Microsoft Azure, it is important to know that if in my Java Class I create a new document, I will be consuming the 5GB of available file system space, and that maybe instead I should consider Azure Blob Storage as an option to solve that problem."
    },
    19: {
    p: "So, I leave here a bit, of what I see as overall topics that I keep under my radar."
    },
    20: {
    h2: "Soft Skills"
    },
    21: {
    p: "Much could be said about this topic, but overall this is a topic very dear to my heart. Because having knowledge is not all there is for being a successful Software Engineer, that brings value into the table."
    },
    22: {
    p: "It would be great if you are able to apply all your knowledge at every given situation. But then, it comes this day, with a Production environment issue with the Project Manager calling you every 5 minutes to check on it, and you already feeling a small drop of sweat in your neck with the stress building up. Wouldn’t it be great, at this point, for you to still be at your A game?"
    },
    23: {
    p: "Wouldn’t it be awesome, if you are able to transmite all that you have gathered as experience over the years, to your fellow colleagues, and keep a great collaborative environment, even if there was this situation with a co-worker that is nagging you a bit?"
    },
    24: {
    p: "And how about being in a meeting with the customer, and really be able to influence the decision of the most sceptical of the IT managers, towards what you believe really will bring the value to their company?"
    },
    25: {
    p: "So, this is where this proposal of steps in my roadmap have entered. As a way, not to forget that soft skills are as important."
    },
    26: {
    p: "So, I will definitely go deeper into this in a later article, but I see this in 3 sections:"
    },
    27: {
    p: "Me: tools for self regulation of emotions (stress, anger..), so that I can be in a state that suits me. For example, going into a meeting with a calm state. See what helps you. Might be as simple as thinking about your kid at home and the last time he gave you a big hug."
    },
    28: {
    p: "Team: communication is paramount, so being able to practice non violent communication for example, focused on the facts, and being open to a different point of view on the other side."
    },
    29: {
    p: "Project/Customer: Influence techniques, here are very useful. As for in a positive way to transmit a given view, but also actively listening to the other part. Here, the creation of Rapport, is really important."
    },
    30: {
    h1: "How"
    },
    31: {
    p: "There are several ways to learn for any given subject. But all depends on what is your way to learn and what works for you! Also some subjects might benefit from a more hands on approach, others from a more conceptual form! So in the next articles I will explore in more details the above areas and what resources would be a good help in its journey to learn, but for now here it is a list of possible approaches to learning."
    },
    32: {
    p: "Read a book"
    },
    33: {
    p: "There is in now way better for the most abstract concepts. Why? Because you will find in books authors with proofs given in the area,"
    },
    34: {
    p: "Do a course"
    },
    35: {
    p: "Sometimes there is no better way than to find an accredited professor with proofs given in a certain area and learn in a formal way. Back to school mode! There are great technical people out there launching updated courses on a great variety of areas! Worth checking and this is less time consuming then going for it yourself or even reading a book! As a transversal hint to all the presented resources is that keep a critical spirit to what is presented to you!"
    },
    36: {
    p: "Follow Someone"
    },
    37: {
    p: "There are also great resources that people, working in the field, having the same issues as you, put out there! Videos, articles, podcasts, tutorials! The amazing world of the internet! Find your subjects of interest, find your persons of interest and start to check out what they put out there! This might be one of the best ways to learn! Just make sure whomever you follow has a solid background, and you are all set to be up to date!"
    },
    38: {
    p: "Join an open source project"
    },
    39: {
    p: "Participate on an open source project is a great way to put your skills to practice, upscale them and also contribute into the community. Also you will have a showcase of what are your skills to the outside world!"
    },
    40: {
    p: "Some examples of good open source projects for beginners"
    },
    41: {
    p: "https://github.com/MunGell/awesome-for-beginners"
    },
    42: {
    p: "Develop your own project"
    },
    43: {
    p: "Just think about something that really interests you, or might came in hand. My last project was making a Pokémon deck API! What a fun time! Other alternative is of course do a quick search and many ideas will pop up!"
    },
    44: {
    p: "Do a certification"
    },
    45: {
    p: "Sometimes having an exam scheduled and 2 pages of topics you must master for it, is a good and structured way to go deeper into a given subject. It can be argued if a certification really gives you the tools to work on a given technology, but there are areas where it is a good way to start on it."
    },
    46: {
    p: "Find a mentor or be a mentor"
    },
    47: {
    p: "This for me is one of my favorite ways to keep up my continuous learning and improvement! Really making use of the work environment for knowledge share! Either being a mentor, that really makes you step up your game, or having someone that can guide you in your first steps! This can also work by just finding a colleague that is on the same path as you, and so instead of you and your head find the best resources now there are 2! Also it is so much more fun!"
    },
    48: {
    p: "This post contains affiliate links to amazon. If you use these links to buy something we may earn a commission. Thanks."
    }
}
speechSynthesis.cancel( )
let voices = [];


const getVoices = async () => {
   voices = await new Promise((resolve, reject) => {
        let id;
        id = setInterval(() => {
            if (synth.getVoices().length !== 0) {
                resolve(synth.getVoices());
                clearInterval(id);
            }
        }, 10);
    }) 

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        
        voiceSelect.appendChild(option);
        })
}

getVoices();

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voiceSelected = voiceSelect.selectedOptions[0].getAttribute('data-name')
    
    voices.forEach(voice => {
        if(voice.name === voiceSelected){
            utterance.voice = voice;
        }
    })
    
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    speechUtteranceChunker(utterance, {chunkLength: 120}, ()=>console.log('done'))
    //speechSynthesis.speak(utterance);
}

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = input.value;

    if(input.value === '' | input.value === null) {
        console.log('Falta dado')
    }
    if(input.value.length > 0) {
        const response = await axios.post('http://localhost:3001/', {data: url} )
        console.log(response.data)
        TEXT2SPEECH = response.data
    }
})

buttonStop.addEventListener('click', (e) => {
    e.preventDefault()
    
    synth.cancel();
})

button.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const agregatedText = cutTextTo200Char();
    speak(agregatedText[1])
})

//Need because de Web Speech API dont "accept" text longer than 200-300 characters
const cutTextTo200Char = (text, charNumber = 200) => {
    const arrayTEXT = Object.values(TEXT2SPEECH)
    const re = new RegExp(`^[\\s\\S]{${Math.floor(charNumber/2)},${charNumber}}[.!?,]{1}|^[\\s\\S]{${1},${charNumber}}$|^[\\s\\S]{${1},${charNumber}}`)
    
    const fullText = arrayTEXT.reduce((prev, current, index) => {
        const currentText = Object.values(current)[0]
        const actualIndex = prev.length - 1;
        //console.log(prev)
        
        if(actualIndex + 1 === 0){
            prev.push(currentText)
            return prev
        }
        else if(prev[actualIndex].length + currentText.length <= charNumber){
            prev[actualIndex] = prev[actualIndex].concat(`\n ${currentText}.`)
            return prev
        }
        else{
            prev.push(currentText)
            return prev
        }
        /*
        else if(currentText.length > 200 ){
            prev.push(currentText.slice(0, 200))
            saveText = currentText.slice(200)
            return prev
        }
        else if(saveText.length > 1){
            if(saveText.length + currentText.length  < 200){
                prev.push(saveText + currentText)
            }
            const sliceT = currentText.slice(0,200)
            prev.push(saveText + sliceT)
            saveText = currentText.slice(200)
            return prev
        }
        else if(currentText.length <= charNumber && prev[actualIndex]) {
            prev.push(currentText)
            return prev
        }
*/
    }, [])
return fullText;

}