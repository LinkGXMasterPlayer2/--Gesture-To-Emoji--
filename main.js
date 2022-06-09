predition1 = "";
predition2 = "";

Webcam.set({

    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');


function takeSnapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_uri + '"/>';

    });

}
console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GF-jyGvIG/model.json",modalLoaded);

function modalLoaded(){

    console.log('model is loaded');

}

function speak(){

    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + predition1;
    speakData2 = "The second prediction is " + predition2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
    
}
function check(){

    img = document.getElementById("capture_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){

    if(error){

        console.error(error);
    }
    else{

        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        predition1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "👍🏽"){

            document.getElementById("update_emoji").innerHTML = "&#128512;";

    
        }
        if(results[0].label == "👌🏽"){

            document.getElementById("update_emoji").innerHTML = "&#128546;";

    
        }
        if(results[0].label == "✌🏽"){

            document.getElementById("update_emoji").innerHTML = "&#128545;";

    
        }
        if(results[1].label == "👍🏽"){

            document.getElementById("update_emoji2").innerHTML = "&#128512;";

    
        }
        if(results[1].label == "👌🏽"){

            document.getElementById("update_emoji2").innerHTML = "&#128546;";

    
        }
        if(results[1].label == "✌🏽"){

            document.getElementById("update_emoji2").innerHTML = "&#128545;";

    
        }
       
        
        
        
    }

}

