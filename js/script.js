
var num_slides = 23;
const buzzwords_fname = "EN/Buzzwords.txt"
const onesylwords_fname = "EN/MonoSylNouns.txt"
var slide_deck_title
var slide_deck_index


function load_gen_json(fname) {
  var gen_json
  $.ajax(
    {
      url: "files/generative_expressions/" + fname,
      mimeType: "json",
      async: false,
      success: function (data) {
        gen_json = data;
      }
    });
  return gen_json
}

async function load_random_pic() {

  const response = await fetch('files/img/manifest.json');
  const img_manifest = await response.json();
  fname = get_random_item_from_array(img_manifest)

  const image = document.querySelector(".my-image");
  fetch("files/img/data/" + fname)
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      image.src = objectURL;
    });
}

function cap_first(str) {
  return str[0].toUpperCase() + str.substring(1)
}

function chart_slide() {
  chart_id = "slidechart" + slide_deck_index
  item = `<canvas id="${chart_id}" style="width: 100 %; max - width: 700px"></canvas>`
  x_data = [...Array(40)].map(e => ~~(Math.random() * 40))
  y_data = [...Array(40)].map(e => ~~(Math.random() * 40))
  const myChart = new Chart("chart_id", {
    type: "line",
    data: { "x": x_data, "y": y_data },
    options: {}
  });
  return item
}

function title_slide() {
  // theme_wl = get_random_item_from_array(wl_manifest)
  theme_wl = "EN/Foodstuffs.txt"
  bw = get_random_from_wl(buzzwords_fname)
  theme_word = get_random_from_wl(theme_wl)
  theme_word2 = get_random_from_wl(theme_wl)
  return `<h1>${theme_word}</h1><p>or: ${bw} for ${theme_word2} </p></section>`
}

function our_motto_slide() {
  bw = get_random_from_wl(buzzwords_fname)
  return `<h2 >Our motto:</h2> <h1 class=fragment>Be ${bw}</h1>`
}
function one_word_slide() {
  bw = get_random_from_wl(onesylwords_fname)
  console.log(load_random_pic())
  return `<h1 class=fragment>${bw}</h1>`

}
function why_slide() {
  bw = get_random_from_wl(buzzwords_fname)
  return `<h2 class>Why?</h2> <h2 class=fragment>One word:</h2> <h1 class=fragment>${bw}</h1>`
}
function equation_slide() {
  bw1 = get_random_from_wl(buzzwords_fname)
  bw2 = get_random_from_wl(buzzwords_fname)
  bw3 = get_random_from_wl(buzzwords_fname)
  return `<div class=equation><p class=fragment>${bw1}</p><p>+</p><p class=fragment>${bw2}</p><p>=</p><p class=fragment>${bw3}</p><div>`
}

function create_new_slide(slide) {
  $(".slides").append(`<section>${slide}</section>`)
}

$("body").keydown(function (e) {
  // right arrow
  deck = [our_motto_slide, why_slide, equation_slide, one_word_slide]
  if ((e.keyCode || e.which) == 39) {
    Nslides = $(".slides > section").length
    current_slide_index = Reveal.getIndices().h
    if (current_slide_index <= Nslides - 1 && current_slide_index >= Nslides - 2) {
      create_new_slide(deck[slide_deck_index % deck.length]())
      slide_deck_index += 1
    }
  }
});

function start_deck(start_reveal) {
  create_new_slide(title_slide())
  start_reveal()
}

function main() {
  load_wordlist_manifest().then((value) => {
    slide_deck_index = 0
    start_deck(function () {
      transition_style = get_random_item_from_array(["none", "fade", "slide", "convex", "concave", "zoom"])
      Reveal.initialize({ slideNumber: true, transition: transition_style })
    });
  });
};


async function load_some_manifest(out_object, dirname) {
  //~ LOAD MANIFEST 
  return await $.ajax(
    {
      url: dirname + "manifest.json",
      mimeType: "json",
      async: false,
      success: function (data) {
        out_object = data;
      }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
  main()
});


