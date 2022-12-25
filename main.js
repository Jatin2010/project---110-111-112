
prediction1 = "";
prediction2 = "";

Webcam.set({
    width:346,
    height:296,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="taken_img" src="'+data_uri+'"/>';

    });
    }

    console.log("ml5 version:" ,ml5.version);
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9Wzy-1xoL/model.json",modelLoaded);

    function modelLoaded(){
        console.log("ml5 Model Loaded");
    }

    function speak(){
        synth = window.speechSynthesis;
        speak_data1 = "The first prediction is"+prediction1;
        speak_data2 = "The second prediction is"+prediction2;
        Uter_this = new SpeechSynthesisUtterance(speak_data1+speak_data2);
        Uter_this.rate=1.5;
        synth.speak(Uter_this);
    }

    function check(){
    img = document.getElementById("taken_img");
    classifier.classify(img,gotResult);
}

function gotResult(error , results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (prediction1 == "Good") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (prediction1 == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (prediction1 == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (prediction2 == "Good") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if (prediction2 == "Amazing") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if (prediction2 == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
    }
}
